#!/usr/bin/env python3
"""
populate-tags.py — Batch-assign level and tags to catalog array items
across 6 data JSON files, then regenerate the corresponding .js wrappers.

Usage:
    python3 scripts/populate-tags.py
"""

import json
import os
import re

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(REPO_ROOT, "data")

# Maps: category name → list of array keys to process
CATALOG_ARRAYS = {
    "stories":      ["stories"],
    "social":       ["scenarios", "problemStories", "reflectionStories"],
    "grammar":      ["items"],
    "fluency":      ["starters"],
    "vocabulary":   ["wordDefinitions", "contextClues"],
    "articulation": ["paragraphPassages", "lBlendStories"],
}

# Level signal sets (used against difficulty/length field values and title)
EASY_SIGNALS = {
    "simple", "easier", "short", "level 1", "level1",
    "beginning", "elementary", "basic", "easy",
}
HARD_SIGNALS = {
    "complex", "stretch", "long", "level 3", "level3",
    "advanced", "high school", "hs-", "progressive", "challenge",
}
MEDIUM_SIGNALS = {
    "moderate", "medium", "level 2", "level2",
    "middle school", "intermediate",
}

# Ordered list of (keywords_to_search, tag_to_assign)
# Each entry: first element is a list of substrings to match in title (any match → tag)
TITLE_TAG_MAP = [
    (["fall", "autumn"],            "fall"),
    (["winter"],                    "winter"),
    (["spring"],                    "spring"),
    (["thanksgiving"],              "thanksgiving"),
    (["animal", "animals"],         "animals"),
    (["inference", "infer"],        "inference"),
    (["retell", "retelling"],       "retelling"),
    (["pronoun"],                   "pronouns"),
    (["compare", "contrast"],       "compare-contrast"),
    (["emotion"],                   "emotions"),
    (["conversation"],              "conversation"),
    (["articulation"],              "articulation"),
    (["summary", "summarize"],      "summarizing"),
    (["author"],                    "author-purpose"),
    (["vocabulary"],                "vocabulary"),
    (["sentence"],                  "sentence-building"),
    (["fluency"],                   "fluency"),
    (["social"],                    "social-skills"),
    (["problem solving"],            "problem-solving"),
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(text: str) -> str:
    """Lowercase and convert spaces/underscores to hyphens; strip non-alnum except hyphens."""
    text = str(text).strip().lower()
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"[^a-z0-9\-]", "", text)
    text = re.sub(r"-+", "-", text).strip("-")
    return text


def _matches_any(value: str, signals: set) -> bool:
    """Return True if the lowercased value contains any signal string."""
    v = value.lower()
    return any(sig in v for sig in signals)


# ---------------------------------------------------------------------------
# Level assignment
# ---------------------------------------------------------------------------

def assign_level(item: dict, category: str) -> str:
    """
    Return "easy", "medium", or "hard" using the 4-step heuristic:
      1. difficulty / length field on the item
      2. title keywords
      3. sourceFile path
      4. default "medium"
    """
    # Step 1: existing difficulty / length fields
    for field in ("difficulty", "length"):
        val = item.get(field)
        if val:
            v = str(val).lower()
            if _matches_any(v, EASY_SIGNALS):
                return "easy"
            if _matches_any(v, HARD_SIGNALS):
                return "hard"
            if _matches_any(v, MEDIUM_SIGNALS):
                return "medium"

    # Step 2: title keywords
    title = str(item.get("title", "")).lower()
    if title:
        if _matches_any(title, EASY_SIGNALS):
            return "easy"
        if _matches_any(title, HARD_SIGNALS):
            return "hard"
        if _matches_any(title, MEDIUM_SIGNALS):
            return "medium"

    # Step 3: sourceFile path
    source = str(item.get("sourceFile", "")).lower()
    if source:
        if "hs-" in source or "high-school" in source:
            return "hard"
        if "elementary" in source or "simple" in source:
            return "easy"

    # Step 4: default
    return "medium"


# ---------------------------------------------------------------------------
# Tag assignment
# ---------------------------------------------------------------------------

def assign_tags(item: dict, category: str) -> list:
    """
    Build a deduplicated, lowercase, hyphenated tag list from 4 sources:
      1. Existing fields: season, tag, focus, category
      2. Title keyword → tag mapping
      3. Fallback: sourceFile basename without .html
      4. Last resort: category name
    Minimum 1 tag guaranteed.
    """
    tags = []

    # Source 1: existing item fields
    for field in ("season", "tag", "focus", "category"):
        val = item.get(field)
        if val and isinstance(val, str) and val.strip():
            tags.append(slugify(val))

    # Source 2: title keyword mapping
    title = str(item.get("title", "") or item.get("prompt", "") or "").lower()
    for keywords, tag in TITLE_TAG_MAP:
        if any(kw in title for kw in keywords):
            tags.append(tag)

    # Deduplicate while preserving order
    seen = set()
    unique_tags = []
    for t in tags:
        if t and t not in seen:
            seen.add(t)
            unique_tags.append(t)
    tags = unique_tags

    # Source 3: fallback — sourceFile basename without .html
    if not tags:
        source = item.get("sourceFile", "")
        if source:
            basename = os.path.basename(source)
            stem = re.sub(r"\.html?$", "", basename, flags=re.IGNORECASE)
            slug = slugify(stem)
            if slug:
                tags.append(slug)

    # Source 4: last resort — category name
    if not tags:
        tags.append(slugify(category))

    return tags


# ---------------------------------------------------------------------------
# JS wrapper regeneration
# ---------------------------------------------------------------------------

def regen_js_wrapper(category: str, data: dict) -> None:
    """Write the full JSON data into the dot-notation .js wrapper."""
    js_path = os.path.join(DATA_DIR, f"{category}.js")
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    content = (
        f"window.ActivityData = window.ActivityData || {{}};\n"
        f"window.ActivityData.{category} = {json_str};\n"
    )
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(content)


# ---------------------------------------------------------------------------
# Per-file processing
# ---------------------------------------------------------------------------

def process_file(category: str) -> None:
    """Process one JSON file: update level/tags on all target arrays, write JSON, regen JS."""
    json_path = os.path.join(DATA_DIR, f"{category}.json")
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    array_keys = CATALOG_ARRAYS[category]
    file_updated = 0
    file_skipped = 0
    file_errors = 0

    for key in array_keys:
        arr = data.get(key)
        if arr is None:
            print(f"  WARNING: key '{key}' not found in {category}.json")
            continue

        key_updated = 0
        key_skipped = 0

        for item in arr:
            try:
                has_level = item.get("level") is not None
                has_tags = bool(item.get("tags"))

                # Skip entire item only if BOTH are already present
                if has_level and has_tags:
                    key_skipped += 1
                    continue

                changed = False

                # Independently assign level if missing
                if not has_level:
                    item["level"] = assign_level(item, category)
                    changed = True

                # Independently assign tags if missing/empty
                if not has_tags:
                    item["tags"] = assign_tags(item, category)
                    changed = True

                if changed:
                    key_updated += 1

            except Exception as e:
                file_errors += 1
                print(f"  ERROR processing item {item.get('id', '?')}: {e}")

        file_updated += key_updated
        file_skipped += key_skipped

        # Per-array breakdown (only shown when multiple arrays in file)
        if len(array_keys) > 1:
            print(f"  {key}: {key_updated} updated, {key_skipped} skipped")

    # Write updated JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # Regenerate JS wrapper
    regen_js_wrapper(category, data)

    skip_label = "already tagged"
    print(
        f"{category}.json: {file_updated} items updated, "
        f"{file_skipped} skipped ({skip_label}), {file_errors} errors"
    )
    print(f"  → data/{category}.js regenerated")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print("populate-tags.py — assigning level/tags to catalog arrays\n")
    for category in CATALOG_ARRAYS:
        process_file(category)
    print("\nDone.")


if __name__ == "__main__":
    main()
