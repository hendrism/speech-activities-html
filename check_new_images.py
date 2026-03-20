import json
import os

sort_dir = 'images/images-to-sort'
vocab_path = 'data/vocabulary-images.json'

if not os.path.exists(sort_dir):
    print(f"Directory {sort_dir} does not exist.")
    exit()

with open(vocab_path, 'r') as f:
    vocab = json.load(f)

# Existing files as just filenames
existing_files = {k.split('/')[-1]: k for k in vocab.keys()}

duplicates = []
new_items = []

for root, _, files in os.walk(sort_dir):
    for f in files:
        if f.startswith('.'):
            continue
        if not f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
            continue
            
        full_path = os.path.join(root, f)
        rel_path = os.path.relpath(full_path, sort_dir)
        
        if f in existing_files:
            duplicates.append((rel_path, existing_files[f]))
        else:
            # Check if name matches without extension
            name_no_ext = os.path.splitext(f)[0]
            match_found = False
            for ex, path_in_json in existing_files.items():
                if os.path.splitext(ex)[0] == name_no_ext:
                    duplicates.append((rel_path, path_in_json + f" (diff extension)"))
                    match_found = True
                    break
            
            if not match_found:
                new_items.append(rel_path)

print("Duplicates (Already in collection):")
for rel, path in sorted(duplicates):
    print(f" - [DROP] {rel} -> matches {path}")

print(f"\nNew Items (Not in collection) Count: {len(new_items)}")
for f in sorted(new_items):
    print(f" - [KEEP] {f}")
