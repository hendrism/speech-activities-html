#!/usr/bin/env python3
"""
add-content.py — Interactive CLI for adding new items to speech activity data catalog arrays.

Usage:
    python3 scripts/add-content.py
"""

import json
import pathlib
import re
import sys

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA_DIR = REPO_ROOT / "data"

CATALOG_ARRAYS = {
    "vocabulary":   ["wordDefinitions", "contextClues"],
    "stories":      ["stories"],
    "social":       ["scenarios", "problemStories", "reflectionStories"],
    "grammar":      ["items"],
    "fluency":      ["starters"],
    "articulation": ["paragraphPassages", "lBlendStories"],
}

CATEGORIES = list(CATALOG_ARRAYS.keys())
VALID_LEVELS = {"easy", "medium", "hard"}


# ---------------------------------------------------------------------------
# Input helpers
# ---------------------------------------------------------------------------

def prompt(label: str, required: bool = True, default: str = "") -> str:
    """Prompt for a single-line value. Re-prompts if required and blank."""
    while True:
        suffix = f" [{default}]" if default else (" (optional, press Enter to skip)" if not required else "")
        val = input(f"  {label}{suffix}: ").strip()
        if not val and default:
            return default
        if not val and not required:
            return ""
        if not val and required:
            print("    ! This field is required. Please enter a value.")
            continue
        return val


def prompt_level() -> str:
    """Prompt for level, re-prompting on invalid input."""
    while True:
        val = input("  level (easy/medium/hard): ").strip().lower()
        if val in VALID_LEVELS:
            return val
        print(f"    ! Invalid level '{val}'. Must be exactly: easy, medium, or hard.")


def prompt_tags() -> list:
    """Prompt for comma-separated tags. Re-prompts if empty. Returns list of tag strings."""
    while True:
        raw = input("  tags (comma-separated, required): ").strip()
        if not raw:
            print("    ! At least one tag is required.")
            continue
        tags = []
        for t in raw.split(","):
            t = t.strip()
            if t:
                # Convert internal spaces to hyphens
                t = re.sub(r"\s+", "-", t)
                tags.append(t)
        if not tags:
            print("    ! At least one tag is required.")
            continue
        return tags


def prompt_source_file() -> str:
    """Prompt for sourceFile with validation and disk-existence warning."""
    while True:
        val = input("  sourceFile (e.g. activities/category/name.html): ").strip()
        if not val:
            print("    ! This field is required.")
            continue
        if not val.endswith(".html"):
            print("    ! sourceFile must end in .html")
            continue
        if not (val.startswith("activities/") or val.startswith("activity-loader")):
            print("    ! sourceFile must start with 'activities/' or 'activity-loader'")
            continue
        # Warn if file doesn't exist on disk
        full_path = REPO_ROOT / val
        if not full_path.exists():
            print(f"    WARNING: File not found on disk: {full_path}")
            print("    (Continuing anyway — file may not exist yet.)")
        return val


def prompt_multiline(label: str) -> str:
    """Prompt for multi-line text. Blank line ends input. Returns joined string."""
    print(f"  {label} (enter lines of text; blank line to finish):")
    lines = []
    while True:
        line = input("    > ")
        if line == "":
            break
        lines.append(line)
    return " ".join(lines)


# ---------------------------------------------------------------------------
# ID generation
# ---------------------------------------------------------------------------

def _extract_suffix_num(id_val) -> int:
    """Extract the trailing integer from an id (int or string). Returns -1 if not found."""
    if isinstance(id_val, int):
        return id_val
    m = re.search(r"(\d+)$", str(id_val))
    if m:
        return int(m.group(1))
    return -1


def next_global_suffix(arr: list, prefix_filter=None) -> int:
    """
    Find max numeric suffix across all items (or items matching prefix_filter).
    Returns max + 1, minimum 1.
    """
    max_n = 0
    for item in arr:
        sid = item.get("id", "")
        if prefix_filter is not None:
            if not str(sid).startswith(prefix_filter):
                continue
        n = _extract_suffix_num(sid)
        if n > max_n:
            max_n = n
    return max_n + 1


def gen_id_word_def(arr: list) -> str:
    """word-def-{NNN} — next after max existing."""
    n = next_global_suffix(arr)
    return f"word-def-{n:03d}"


def gen_id_context_clues(arr: list, level: str) -> str:
    """cc-{level}-{NNN} — NNN = next after max across all levels."""
    n = next_global_suffix(arr)
    return f"cc-{level}-{n:03d}"


def gen_id_stories(arr: list) -> str:
    """Next story-{N} after max numeric value across all story IDs."""
    max_n = 0
    for item in arr:
        n = _extract_suffix_num(item.get("id", 0))
        if n > max_n:
            max_n = n
    return f"story-{max_n + 1}"


def _slug_from_source(source_file: str) -> str:
    """Get slug from sourceFile stem (filename without .html)."""
    return pathlib.Path(source_file).stem


def gen_id_per_slug(arr: list, prefix_base: str, source_file: str) -> str:
    """
    {prefix_base}-{slug}-{NNN} — NNN = next after max with same slug prefix.
    prefix_base: e.g. 'social', 'grammar', 'fluency'
    """
    slug = _slug_from_source(source_file)
    full_prefix = f"{prefix_base}-{slug}-"
    n = next_global_suffix(arr, prefix_filter=full_prefix)
    return f"{full_prefix}{n:03d}"


def gen_id_problem_story(arr: list) -> str:
    """social-problem-story-{NNN}"""
    prefix = "social-problem-story-"
    n = next_global_suffix(arr, prefix_filter=prefix)
    return f"{prefix}{n:03d}"


def gen_id_reflection_story(title: str) -> str:
    """sharing-{slug} where slug = title lowercased, spaces→hyphens."""
    slug = title.strip().lower()
    slug = re.sub(r"\s+", "-", slug)
    slug = re.sub(r"[^a-z0-9\-]", "", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return f"sharing-{slug}"


def gen_id_passage(arr: list) -> str:
    """passage-{NNN}"""
    prefix = "passage-"
    n = next_global_suffix(arr, prefix_filter=prefix)
    return f"{prefix}{n:03d}"


def gen_id_lblend_story(arr: list) -> str:
    """lblend-story-{NNN}"""
    prefix = "lblend-story-"
    n = next_global_suffix(arr, prefix_filter=prefix)
    return f"{prefix}{n:03d}"


# ---------------------------------------------------------------------------
# Field collection per array
# ---------------------------------------------------------------------------

def collect_word_definition(arr: list) -> dict:
    print("\n  -- Required fields --")
    word = prompt("word")
    image_url = prompt("imageUrl")

    print("\n  -- Optional fields --")
    category = prompt("category", required=False)
    category_hint = prompt("categoryHint", required=False)

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_word_def(arr)

    item = {"id": new_id, "word": word, "imageUrl": image_url}
    if category:
        item["category"] = category
    if category_hint:
        item["categoryHint"] = category_hint
    item["level"] = item_level
    item["tags"] = tags
    return item


def collect_context_clue(arr: list) -> dict:
    print("\n  -- Required fields --")
    level = prompt_level()
    clue_type = prompt("clueType")
    word = prompt("word")
    text = prompt("text")

    print("\n  -- Optional fields --")
    hint = prompt("hint", required=False)

    tags = prompt_tags()
    new_id = gen_id_context_clues(arr, level)

    item = {
        "id": new_id,
        "level": level,
        "clueType": clue_type,
        "word": word,
        "text": text,
    }
    if hint:
        item["hint"] = hint
    item["tags"] = tags
    return item


def collect_story(arr: list) -> dict:
    print("\n  -- Required fields --")
    title = prompt("title")
    source_file = prompt_source_file()

    print("  text (enter the story body, blank line to finish):")
    lines = []
    while True:
        line = input("    ")
        if not line:
            break
        lines.append(line)
    story_text = " ".join(lines)

    print("\n  -- Optional fields --")
    season = prompt("season", required=False)

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_stories(arr)

    item = {"id": new_id, "sourceFile": source_file, "title": title, "text": story_text}
    if season:
        item["season"] = season
    item["level"] = item_level
    item["tags"] = tags
    return item


def collect_scenario(arr: list) -> dict:
    print("\n  -- Required fields --")
    title = prompt("title")
    source_file = prompt_source_file()

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_per_slug(arr, "social", source_file)

    item = {"id": new_id, "sourceFile": source_file, "title": title, "level": item_level, "tags": tags}
    return item


def collect_problem_story(arr: list) -> dict:
    print("\n  -- Required fields --")
    title = prompt("title")
    text = prompt("text")

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_problem_story(arr)

    item = {"id": new_id, "title": title, "text": text, "level": item_level, "tags": tags}
    return item


def collect_reflection_story(arr: list) -> dict:
    print("\n  -- Required fields --")
    title = prompt("title")
    topic = prompt("topic")

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_reflection_story(title)

    item = {"id": new_id, "title": title, "topic": topic, "level": item_level, "tags": tags}
    return item


def collect_grammar_item(arr: list) -> dict:
    print("\n  -- Required fields --")
    title = prompt("title")
    source_file = prompt_source_file()

    print("\n  -- Optional fields --")
    focus = prompt("focus", required=False)

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_per_slug(arr, "grammar", source_file)

    item = {"id": new_id, "sourceFile": source_file, "title": title}
    if focus:
        item["focus"] = focus
    item["level"] = item_level
    item["tags"] = tags
    return item


def collect_fluency_starter(arr: list) -> dict:
    print("\n  -- Required fields --")
    source_file = prompt_source_file()
    prompt_text = prompt("prompt")

    print("\n  -- Optional frames fields --")
    frame_word = prompt("frames.word", required=False)
    frame_phrase = prompt("frames.phrase", required=False)
    frame_sentence = prompt("frames.sentence", required=False)

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_per_slug(arr, "fluency", source_file)

    item = {"id": new_id, "sourceFile": source_file, "prompt": prompt_text}

    frames = {}
    if frame_word:
        frames["word"] = frame_word
    if frame_phrase:
        frames["phrase"] = frame_phrase
    if frame_sentence:
        frames["sentence"] = frame_sentence
    if frames:
        item["frames"] = frames

    item["level"] = item_level
    item["tags"] = tags
    return item


def collect_paragraph_passage(arr: list) -> dict:
    print("\n  -- Required fields --")
    title = prompt("title")
    text = prompt_multiline("text")
    target_sound = prompt("targetSound")

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_passage(arr)

    item = {"id": new_id, "title": title, "text": text, "targetSound": target_sound, "level": item_level, "tags": tags}
    return item


def collect_lblend_story(arr: list) -> dict:
    print("\n  -- Required fields --")
    title = prompt("title")
    text = prompt_multiline("text")

    item_level = prompt_level()
    tags = prompt_tags()
    new_id = gen_id_lblend_story(arr)

    item = {"id": new_id, "title": title, "text": text, "level": item_level, "tags": tags}
    return item


# ---------------------------------------------------------------------------
# Dispatch table
# ---------------------------------------------------------------------------

COLLECTORS = {
    ("vocabulary", "wordDefinitions"):     collect_word_definition,
    ("vocabulary", "contextClues"):        collect_context_clue,
    ("stories",    "stories"):             collect_story,
    ("social",     "scenarios"):           collect_scenario,
    ("social",     "problemStories"):      collect_problem_story,
    ("social",     "reflectionStories"):   collect_reflection_story,
    ("grammar",    "items"):               collect_grammar_item,
    ("fluency",    "starters"):            collect_fluency_starter,
    ("articulation", "paragraphPassages"): collect_paragraph_passage,
    ("articulation", "lBlendStories"):     collect_lblend_story,
}


# ---------------------------------------------------------------------------
# JS wrapper regeneration (matches populate-tags.py exactly)
# ---------------------------------------------------------------------------

def regen_js_wrapper(category: str, data: dict) -> None:
    """Write the full JSON data into the dot-notation .js wrapper."""
    js_path = DATA_DIR / f"{category}.js"
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    content = (
        f"window.ActivityData = window.ActivityData || {{}};\n"
        f"window.ActivityData.{category} = {json_str};\n"
    )
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(content)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    print("add-content.py — add a new item to a data catalog array\n")

    # Step 1: Choose category
    print("Categories: " + ", ".join(CATEGORIES))
    while True:
        cat = input("Category: ").strip().lower()
        if cat in CATALOG_ARRAYS:
            break
        print(f"  ! Invalid category '{cat}'. Choose from: {', '.join(CATEGORIES)}")

    # Step 2: Choose array
    arrays = CATALOG_ARRAYS[cat]
    if len(arrays) == 1:
        arr_key = arrays[0]
        print(f"Array: {arr_key}")
    else:
        print(f"Arrays for {cat}: " + ", ".join(arrays))
        while True:
            arr_key = input("Array: ").strip()
            if arr_key in arrays:
                break
            print(f"  ! Invalid array '{arr_key}'. Choose from: {', '.join(arrays)}")

    # Load the JSON file
    json_path = DATA_DIR / f"{cat}.json"
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    arr = data.get(arr_key)
    if arr is None:
        print(f"ERROR: key '{arr_key}' not found in {cat}.json")
        sys.exit(1)

    # Step 3: Collect fields
    collector = COLLECTORS.get((cat, arr_key))
    if collector is None:
        print(f"ERROR: No collector defined for ({cat}, {arr_key})")
        sys.exit(1)

    print(f"\nEnter details for new {cat} → {arr_key} item:")
    new_item = collector(arr)

    # Step 4: Preview
    print(f"\nNew item to add to data/{cat}.json → {arr_key}:")
    print(json.dumps(new_item, indent=2, ensure_ascii=False))

    # Step 5: Confirm
    confirm = input("\nWrite? [Y/n]: ").strip().lower()
    if confirm not in ("", "y", "yes"):
        print("Aborted.")
        sys.exit(0)

    # Duplicate ID check
    existing_ids = {itm.get("id") for itm in arr}
    if new_item.get("id") in existing_ids:
        print(f"ERROR: ID '{new_item['id']}' already exists in {arr_key}. Aborting.")
        sys.exit(1)

    # Step 6: Write (atomic)
    original_count = len(arr)
    arr.append(new_item)

    tmp_path = json_path.with_suffix(".tmp")
    tmp_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    tmp_path.replace(json_path)

    # Step 7: Regenerate JS wrapper
    regen_js_wrapper(cat, data)

    new_count = len(arr)
    print(f"\nAdded to data/{cat}.json ({original_count} → {new_count} items). Wrapper regenerated.")


if __name__ == "__main__":
    main()
