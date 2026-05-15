#!/usr/bin/env python3
"""
scan-images.py — Scan the images/ folder and register new images in vocabulary-images.json.

Usage:
    python3 scripts/scan-images.py           # dry run — shows what would be added
    python3 scripts/scan-images.py --write   # actually update the JSON

Run this any time you drop new images into images/.
"""

import json
import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMAGES_DIR = os.path.join(REPO_ROOT, 'images')
VOCAB_PATH = os.path.join(REPO_ROOT, 'data', 'vocabulary-images.json')

IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp', '.gif'}

# Folders to skip entirely (utility/staging dirs, not real image collections)
SKIP_DIRS = {'images-to-sort', '.DS_Store'}


def infer_tags(rel_key: str) -> list[str]:
    """Infer tags from the folder structure of the image path."""
    parts = rel_key.split('/')
    tags = []

    # Every path segment except the filename is a potential tag
    for part in parts[:-1]:
        # Split hyphenated folder names into individual tags
        # e.g. "summer-images" -> "summer", "animal-homes" -> "animal", "homes"
        words = part.replace('-', ' ').replace('_', ' ').split()
        tags.extend(w for w in words if w not in ('images',))

    return sorted(set(tags))


def make_name(filename: str) -> str:
    """Convert a filename to a display name. beach-ball.png -> Beach Ball"""
    stem = os.path.splitext(filename)[0]
    return stem.replace('-', ' ').replace('_', ' ').title()


def scan(write: bool = False):
    with open(VOCAB_PATH, 'r') as f:
        vocab = json.load(f)

    existing_keys = set(vocab.keys())
    new_entries = {}

    for root, dirs, files in os.walk(IMAGES_DIR):
        # Prune skip dirs in-place so os.walk doesn't descend into them
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS and not d.startswith('.')]

        for filename in sorted(files):
            if filename.startswith('.'):
                continue
            ext = os.path.splitext(filename)[1].lower()
            if ext not in IMAGE_EXTENSIONS:
                continue

            full_path = os.path.join(root, filename)
            rel_key = os.path.relpath(full_path, IMAGES_DIR)

            if rel_key in existing_keys:
                continue

            new_entries[rel_key] = {
                'name': make_name(filename),
                'tags': infer_tags(rel_key),
            }

    if not new_entries:
        print("Nothing new — vocabulary-images.json is already up to date.")
        return

    print(f"Found {len(new_entries)} new image(s):\n")
    for key, entry in sorted(new_entries.items()):
        tag_str = ', '.join(entry['tags']) if entry['tags'] else '(no tags)'
        print(f"  + {key}")
        print(f"    name: {entry['name']}  |  tags: {tag_str}")

    if not write:
        print(f"\nDry run — run with --write to update vocabulary-images.json.")
        return

    vocab.update(new_entries)
    with open(VOCAB_PATH, 'w') as f:
        json.dump(vocab, f, indent=2)

    print(f"\nAdded {len(new_entries)} image(s) to vocabulary-images.json.")


if __name__ == '__main__':
    write_mode = '--write' in sys.argv
    scan(write=write_mode)
