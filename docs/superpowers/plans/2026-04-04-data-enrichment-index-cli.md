# Data Enrichment, Index Refactor & Content CLI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Populate level/tags on catalog data items, refactor index.html to load dynamically from activity-index.json, and build an interactive CLI for adding new content.

**Architecture:** Three independent Python/JS deliverables. Tasks 1 and 3 are Python scripts in `scripts/`. Task 2 is a pure in-place refactor of `index.html` — the hardcoded activity array (lines 425–1310) is replaced with a `fetch()` call that loads `data/activity-index.json` at runtime. Note: `populate-tags.py` processes 10 catalog arrays across 6 files.

**Tech Stack:** Python 3 stdlib (json, pathlib, re, sys), vanilla JS (fetch API), static JSON files.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `scripts/populate-tags.py` | **Create** | Batch-assign level/tags to catalog array items; regenerate .js wrappers |
| `scripts/add-content.py` | **Create** | Interactive CLI: prompt → validate → append to JSON → regenerate .js wrapper |
| `index.html` | **Modify** (lines 423–1508) | Replace hardcoded activity array + all rendering logic with fetch-based dynamic rendering |
| `data/*.json` / `data/*.js` | **Modified by scripts** | Updated in place by populate-tags.py and add-content.py |

---

## Task 1: `scripts/populate-tags.py` — Level/Tags Population

**Files:**
- Create: `scripts/populate-tags.py`

### Step 1.1: Scaffold the script and helper constants

- [ ] Create `scripts/populate-tags.py` with the catalog array map and level/tag keyword tables:

```python
#!/usr/bin/env python3
"""
Populate missing level/tags on catalog array items in data/*.json.
Never overwrites existing non-null level or non-empty tags.
Run: python3 scripts/populate-tags.py
"""
import json
import re
from pathlib import Path

REPO = Path(__file__).parent.parent
DATA = REPO / "data"

# Catalog arrays to process: {filename: [array_keys]}
CATALOG_ARRAYS = {
    "stories":      ["stories"],
    "social":       ["scenarios", "problemStories", "reflectionStories"],
    "grammar":      ["items"],
    "fluency":      ["starters"],
    "vocabulary":   ["wordDefinitions", "contextClues"],
    "articulation": ["paragraphPassages", "lBlendStories"],
}

# Level keyword signals
EASY_SIGNALS = {"simple", "beginning", "elementary", "basic", "short", "easy", "level 1", "level1", "easier"}
HARD_SIGNALS = {"complex", "advanced", "high school", "hs-", "progressive", "challenge", "level 3", "level3", "stretch", "long"}
MEDIUM_SIGNALS = {"middle school", "intermediate", "level 2", "level2", "moderate", "medium"}

# Title keyword → tag mapping (ordered: check each keyword against title)
TITLE_TAG_MAP = [
    (["fall", "autumn"],          "fall"),
    (["winter"],                  "winter"),
    (["spring"],                  "spring"),
    (["thanksgiving"],            "thanksgiving"),
    (["animal", "animals"],       "animals"),
    (["inference", "infer"],      "inference"),
    (["retell", "retelling"],     "retelling"),
    (["pronoun"],                 "pronouns"),
    (["compare", "contrast"],     "compare-contrast"),
    (["emotion"],                 "emotions"),
    (["conversation"],            "conversation"),
    (["articulation"],            "articulation"),
    (["summary", "summarize"],    "summarizing"),
    (["author"],                  "author-purpose"),
    (["vocabulary"],              "vocabulary"),
    (["sentence"],                "sentence-building"),
    (["fluency"],                 "fluency"),
    (["social"],                  "social-skills"),
    (["problem", "solving"],      "problem-solving"),
]
```

- [ ] Commit: `git add scripts/populate-tags.py && git commit -m "feat: scaffold populate-tags.py with constants"`

---

### Step 1.2: Implement `assign_level(item, category)`

- [ ] Add the level assignment function after the constants:

```python
def assign_level(item: dict, category: str) -> str:
    """Return 'easy'|'medium'|'hard' based on item fields. Never call if level already set."""
    text_fields = [
        str(item.get("difficulty", "") or ""),
        str(item.get("length", "") or ""),
    ]
    for text in text_fields:
        t = text.lower()
        if any(s in t for s in EASY_SIGNALS):
            return "easy"
        if any(s in t for s in HARD_SIGNALS):
            return "hard"
        if any(s in t for s in MEDIUM_SIGNALS):
            return "medium"

    title = str(item.get("title", "") or "").lower()
    for signal in EASY_SIGNALS:
        if signal in title:
            return "easy"
    for signal in HARD_SIGNALS:
        if signal in title:
            return "hard"
    for signal in MEDIUM_SIGNALS:
        if signal in title:
            return "medium"

    source = str(item.get("sourceFile", "") or "").lower()
    if "hs-" in source or "high-school" in source:
        return "hard"
    if "elementary" in source or "simple" in source:
        return "easy"

    return "medium"
```

- [ ] Quick smoke test — run in Python REPL to verify:
```python
# python3 -c "
import sys; sys.path.insert(0, 'scripts')
# copy assign_level + constants inline to test
item = {'title': 'Simple Fall Stories', 'sourceFile': 'activities/reading/fall-reading-simple.html'}
# Expected: 'easy' (title has 'simple')
print(assign_level(item, 'stories'))
# "
```

---

### Step 1.3: Implement `assign_tags(item, category)`

- [ ] Add the tag assignment function:

```python
def slugify(text: str) -> str:
    return re.sub(r"\s+", "-", text.strip().lower())

def assign_tags(item: dict, category: str) -> list:
    """Return a non-empty list of tag strings. Never call if tags already set."""
    tags = []

    for field in ("season", "tag", "focus", "category"):
        val = item.get(field)
        if val and isinstance(val, str):
            tags.append(slugify(val))

    title = str(item.get("title", "") or "").lower()
    for keywords, tag in TITLE_TAG_MAP:
        if any(kw in title for kw in keywords):
            if tag not in tags:
                tags.append(tag)

    if not tags:
        source = item.get("sourceFile", "") or ""
        basename = Path(source).stem  # e.g. 'author-purpose-msg'
        if basename:
            tags.append(basename)

    if not tags:
        tags.append(category)

    # Deduplicate, preserve order
    seen = set()
    result = []
    for t in tags:
        if t not in seen:
            seen.add(t)
            result.append(t)
    return result
```

---

### Step 1.4: Implement `regen_js_wrapper(category, data)`

- [ ] Add the .js wrapper regeneration function:

```python
def regen_js_wrapper(category: str, data: dict) -> None:
    """Write the entire JSON content into the .js wrapper file."""
    js_path = DATA / f"{category}.js"
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    js_content = (
        f"window.ActivityData = window.ActivityData || {{}};\n"
        f"window.ActivityData['{category}'] = {json_str};\n"
    )
    js_path.write_text(js_content, encoding="utf-8")
```

**Note:** Check the actual .js wrapper format before writing. Run:
```bash
head -3 data/social.js
```
The format should be `window.ActivityData = window.ActivityData || {}; window.ActivityData.social = {...};`
Adjust the template string to match exactly (dot notation vs bracket notation).

---

### Step 1.5: Implement `process_file(category)` and `main()`

- [ ] Add the main processing logic:

```python
def process_file(category: str) -> None:
    json_path = DATA / f"{category}.json"
    data = json.loads(json_path.read_text(encoding="utf-8"))
    array_keys = CATALOG_ARRAYS[category]
    updated = 0
    skipped = 0

    for key in array_keys:
        items = data.get(key, [])
        if not isinstance(items, list):
            continue
        for item in items:
            if not isinstance(item, dict):
                continue
            # Independent checks: level and tags are updated independently.
            # An item with level already set can still receive tags if tags is empty.
            has_level = item.get("level") is not None
            has_tags = bool(item.get("tags"))

            if has_level and has_tags:
                skipped += 1
                continue

            changed = False
            if not has_level:
                item["level"] = assign_level(item, category)
                changed = True
            if not has_tags:
                item["tags"] = assign_tags(item, category)
                changed = True
            if changed:
                updated += 1
            else:
                skipped += 1

    json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    regen_js_wrapper(category, data)
    print(f"{category}.json: {updated} items updated, {skipped} skipped (already tagged)")
    print(f"  → data/{category}.js regenerated")

def main():
    for category in CATALOG_ARRAYS:
        process_file(category)

if __name__ == "__main__":
    main()
```

---

### Step 1.6: Run the script and verify output

- [ ] Run the script:
```bash
python3 scripts/populate-tags.py
```
Expected output (approximate counts):
```
stories.json: N items updated, M skipped (already tagged)
  → data/stories.js regenerated
social.json: ...
...
```

- [ ] Spot-check the JSON — pick one item per file and verify level/tags look sensible:
```bash
python3 -c "
import json
for fname in ['stories', 'social', 'grammar', 'fluency', 'vocabulary', 'articulation']:
    with open(f'data/{fname}.json') as f:
        d = json.load(f)
    # Print first item from first catalog array
    arrays = {'stories': 'stories', 'social': 'scenarios', 'grammar': 'items',
              'fluency': 'starters', 'vocabulary': 'wordDefinitions', 'articulation': 'paragraphPassages'}
    arr = d.get(arrays[fname], [])
    if arr:
        item = arr[0]
        print(f'{fname}: level={item.get(\"level\")}, tags={item.get(\"tags\")}')
"
```

- [ ] Verify .js wrappers still parse correctly:
```bash
node -e "
['stories','social','grammar','fluency','vocabulary','articulation'].forEach(c => {
  require('./data/' + c + '.js');
  console.log(c + '.js OK, keys:', Object.keys(window.ActivityData[c] || {}).length);
});
" 2>/dev/null || python3 -c "
import subprocess, sys
# If node unavailable, just check file starts correctly
import pathlib
for c in ['stories','social','grammar','fluency','vocabulary','articulation']:
    txt = pathlib.Path(f'data/{c}.js').read_text()[:80]
    assert 'window.ActivityData' in txt, f'{c}.js broken!'
    print(f'{c}.js OK')
"
```

- [ ] Commit:
```bash
git add data/*.json data/*.js scripts/populate-tags.py
git commit -m "feat: populate level/tags on catalog array items via populate-tags.py"
```

---

## Task 2: index.html — Dynamic Activity Loading

**Files:**
- Modify: `index.html` (lines 423–1508 — the entire `<script>` block content)

The HTML structure above line 423 (CSS, sidebar, main content skeleton) is preserved. Only the `<script>` block content changes.

### Step 2.1: Read the current HTML structure before touching it

- [ ] Confirm the exact line numbers of what gets replaced:
```bash
grep -n "const activities\|</script>" index.html
```
Lines 425–1508 contain the `const activities = [...]` data and all JS functions. Line 423 is `<script>`. Line 1508 is `</script>`. The replacement targets only the content between these tags.

- [ ] Also confirm the HTML skeleton elements that JS writes into:
  - `#sidebarNav` — sidebar nav (populated by JS)
  - `#activitiesGrid` — card grid
  - `#featuredSection` — to be removed (per spec)
  - `#gridTitle` — section heading
  - `#searchInput` — search input (keep as-is)
  - `#pageTitle` — page title (keep as-is)

---

### Step 2.2: Remove the featured section from HTML

- [ ] In `index.html`, delete lines 410–415:
```html
        <div id="featuredSection">
            <h3 class="section-title">✨ Featured & New</h3>
            <div class="featured-row" id="featuredContainer">
                <!-- Populated by JS -->
            </div>
        </div>
```
Replace with nothing (delete entirely).

---

### Step 2.3: Write the new `<script>` block

- [ ] Replace everything between `<script>` and `</script>` (lines 424–1507) with:

```javascript
        // ── Constants ────────────────────────────────────────────────────────
        const CATEGORIES = ['articulation', 'fluency', 'grammar', 'reading', 'social', 'vocabulary'];
        const CATEGORY_LABELS = {
            articulation: 'Articulation',
            fluency:      'Fluency',
            grammar:      'Grammar',
            reading:      'Reading',
            social:       'Social',
            vocabulary:   'Vocabulary',
        };
        const CATEGORY_EMOJIS = {
            articulation: '🗣️',
            fluency:      '🌊',
            grammar:      '✏️',
            reading:      '📖',
            social:       '🤝',
            vocabulary:   '📚',
        };

        // ── State ─────────────────────────────────────────────────────────────
        let allActivities = [];
        let currentFilter = 'all';
        let searchQuery = '';

        // ── Render ────────────────────────────────────────────────────────────
        function renderSidebar() {
            const nav = document.getElementById('sidebarNav');
            const total = allActivities.length;
            nav.innerHTML = `
                <div class="nav-item active" data-id="all">
                    <span>🌟 All Activities</span>
                    <span class="count">${total}</span>
                </div>
                ${CATEGORIES.map(cat => {
                    const count = allActivities.filter(a => a.category === cat).length;
                    if (count === 0) return '';
                    return `<div class="nav-item" data-id="${cat}">
                        <span>${CATEGORY_EMOJIS[cat] || ''} ${CATEGORY_LABELS[cat] || cat}</span>
                        <span class="count">${count}</span>
                    </div>`;
                }).join('')}
            `;

            nav.querySelectorAll('.nav-item').forEach(item => {
                item.addEventListener('click', () => {
                    nav.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                    item.classList.add('active');
                    currentFilter = item.dataset.id;
                    document.getElementById('gridTitle').textContent =
                        currentFilter === 'all' ? 'All Activities' : CATEGORY_LABELS[currentFilter] || currentFilter;
                    renderGrid();
                });
            });
        }

        function renderGrid() {
            const container = document.getElementById('activitiesGrid');
            const searchLower = searchQuery.trim().toLowerCase();

            const filtered = allActivities.filter(item => {
                if (currentFilter !== 'all' && item.category !== currentFilter) return false;
                if (searchLower && !item.title.toLowerCase().includes(searchLower)) return false;
                return true;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🌵</div>
                        <h3>No activities found</h3>
                        <p>Try adjusting your search or category filter.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(item => `
                <a href="${item.sourceFile}" class="card">
                    <div class="card-header">
                        <div>
                            <span class="category-badge category-${item.category}">${CATEGORY_LABELS[item.category] || item.category}</span>
                            <h4 class="card-title">${item.title}</h4>
                        </div>
                    </div>
                    <div class="card-tags">
                        <span class="tag">${item.type === 'tool' ? 'Interactive Tool' : 'Activity'}</span>
                    </div>
                </a>
            `).join('');
        }

        function showError() {
            document.getElementById('activitiesGrid').innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1">
                    <div class="empty-state-icon">⚠️</div>
                    <h3>Activities require a local server</h3>
                    <p>Run: <code>npx http-server</code> then open <code>http://localhost:8080</code></p>
                </div>
            `;
        }

        // ── Bootstrap ─────────────────────────────────────────────────────────
        document.addEventListener('DOMContentLoaded', () => {
            fetch('data/activity-index.json')
                .then(r => {
                    if (!r.ok) throw new Error('fetch failed');
                    return r.json();
                })
                .then(data => {
                    allActivities = data.activities || [];
                    renderSidebar();
                    renderGrid();
                })
                .catch(() => showError());

            document.getElementById('searchInput').addEventListener('input', e => {
                searchQuery = e.target.value;
                document.getElementById('gridTitle').textContent =
                    searchQuery ? 'Search Results' :
                    (currentFilter === 'all' ? 'All Activities' : CATEGORY_LABELS[currentFilter] || currentFilter);
                renderGrid();
            });
        });
```

---

### Step 2.4: Add missing CSS for category-badge

- [ ] Check whether `.category-badge` styles exist in the current CSS:
```bash
grep -n "category-badge\|card-header\|card-title\|card-desc" index.html | head -20
```

- [ ] If `.category-badge` styles are absent, add them inside the `<style>` block (before `</style>`):
```css
        .category-badge {
            display: inline-block;
            padding: 2px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 6px;
            background: var(--border-color);
            color: var(--text-muted);
        }
        .category-badge.category-reading    { background: #dbeafe; color: #1d4ed8; }
        .category-badge.category-vocabulary  { background: #fef9c3; color: #854d0e; }
        .category-badge.category-social      { background: #fce7f3; color: #9d174d; }
        .category-badge.category-grammar     { background: #dcfce7; color: #166534; }
        .category-badge.category-articulation { background: #ede9fe; color: #5b21b6; }
        .category-badge.category-fluency     { background: #ffedd5; color: #9a3412; }
```

---

### Step 2.5: Manual QA

- [ ] Start the dev server:
```bash
npx http-server -p 8080 &
```

- [ ] Open `http://localhost:8080` in browser. Verify:
  - [ ] All 121 activities appear in "All Activities" view
  - [ ] Sidebar category counts are correct (social: 23, fluency: 8, grammar: 15, reading: 37, vocabulary: 28, articulation: 10)
  - [ ] Clicking "Reading" filters to reading activities only
  - [ ] Search "winter" returns activities with "winter" in title
  - [ ] Clicking a card opens the correct activity HTML
  - [ ] No browser console errors
  - [ ] Layout looks correct at ~768px width (resize browser)

- [ ] Test the error state by opening `index.html` directly as a file (not via server):
  - Open `file:///Users/Sean-Work/Desktop/speech-activities-html/index.html`
  - Expected: error message with `npx http-server` instruction visible

- [ ] Commit:
```bash
git add index.html
git commit -m "refactor: index.html dynamically loads from activity-index.json via fetch"
```

---

## Task 3: `scripts/add-content.py` — Interactive Content CLI

**Files:**
- Create: `scripts/add-content.py`

### Step 3.1: Scaffold helpers and per-array config

- [ ] Create `scripts/add-content.py`:

```python
#!/usr/bin/env python3
"""
Interactive CLI for adding new items to speech activity data files.
Writes JSON + regenerates .js wrapper.
Run: python3 scripts/add-content.py
"""
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).parent.parent
DATA = REPO / "data"

# ── Per-array config ───────────────────────────────────────────────────────────
# Each entry: required fields, optional fields, id_format (callable)
ARRAY_CONFIGS = {
    ("vocabulary", "wordDefinitions"): {
        "required": ["word", "imageUrl"],
        "optional": ["category", "categoryHint"],
        "id_fn": lambda items: _next_id_numbered("word-def", items, suffix_field="id", pattern=r"word-def-(\d+)"),
    },
    ("vocabulary", "contextClues"): {
        "required": ["level", "clueType", "word", "text"],
        "optional": ["hint"],
        "id_fn": lambda items: _next_id_level_numbered("cc", items, pattern=r"cc-[a-z]+-(\d+)"),
    },
    ("stories", "stories"): {
        "required": ["title", "sourceFile"],
        "optional": ["season"],
        "id_fn": lambda items: _next_int_id(items),
    },
    ("social", "scenarios"): {
        "required": ["title", "sourceFile"],
        "optional": [],
        "id_fn": lambda items: None,  # set from sourceFile slug after prompting
    },
    ("social", "problemStories"): {
        "required": ["title", "text"],
        "optional": [],
        "id_fn": lambda items: _next_id_numbered("social-problem-story", items, pattern=r"social-problem-story-(\d+)"),
    },
    ("social", "reflectionStories"): {
        "required": ["title", "topic"],
        "optional": [],
        "id_fn": lambda items: None,  # set from title slug after prompting
    },
    ("grammar", "items"): {
        "required": ["title", "sourceFile"],
        "optional": ["focus"],
        "id_fn": lambda items: None,  # set from sourceFile slug after prompting
    },
    ("fluency", "starters"): {
        "required": ["sourceFile", "prompt"],
        "optional": ["frames.word", "frames.phrase", "frames.sentence"],
        "id_fn": lambda items: None,  # set from sourceFile slug after prompting
    },
    ("articulation", "paragraphPassages"): {
        "required": ["title", "text", "targetSound"],
        "optional": [],
        "id_fn": lambda items: _next_id_numbered("passage", items, pattern=r"passage-(\d+)"),
    },
    ("articulation", "lBlendStories"): {
        "required": ["title", "text"],
        "optional": [],
        "id_fn": lambda items: _next_id_numbered("lblend-story", items, pattern=r"lblend-story-(\d+)"),
    },
}

CATEGORY_ARRAYS = {
    "vocabulary":   ["wordDefinitions", "contextClues"],
    "stories":      ["stories"],
    "social":       ["scenarios", "problemStories", "reflectionStories"],
    "grammar":      ["items"],
    "fluency":      ["starters"],
    "articulation": ["paragraphPassages", "lBlendStories"],
}
```

---

### Step 3.2: Implement ID generation helpers

- [ ] Add the ID generation helpers:

```python
# ── ID helpers ────────────────────────────────────────────────────────────────
def _next_id_numbered(prefix: str, items: list, suffix_field: str = "id", pattern: str = None) -> str:
    """Find max numeric suffix and return prefix + (max+1) zero-padded to 3 digits."""
    max_n = 0
    pat = re.compile(pattern or rf"{re.escape(prefix)}-(\d+)")
    for item in items:
        m = pat.search(str(item.get("id", "")))
        if m:
            max_n = max(max_n, int(m.group(1)))
    return f"{prefix}-{str(max_n + 1).zfill(3)}"

def _next_id_level_numbered(prefix: str, items: list, pattern: str) -> str:
    """For cc-{level}-NNN format — find max NNN across all levels. Returns None; caller injects level."""
    max_n = 0
    pat = re.compile(pattern)
    for item in items:
        m = pat.search(str(item.get("id", "")))
        if m:
            max_n = max(max_n, int(m.group(1)))
    return None  # caller injects level into id (see contextClues block in collect_fields)

def _next_int_id(items: list) -> int:
    """Return max integer id + 1 (for stories.stories which uses int ids).
    Handles mixed int/string IDs: extracts integers from both int IDs and 'story-N' string IDs."""
    max_n = 0
    for item in items:
        raw = item.get("id", 0)
        # Handle plain int IDs
        if isinstance(raw, int):
            max_n = max(max_n, raw)
            continue
        # Handle string IDs: extract trailing number if present (e.g. "story-6" → 6)
        m = re.search(r"(\d+)$", str(raw))
        if m:
            max_n = max(max_n, int(m.group(1)))
    return max_n + 1

def _next_id_slug_numbered(prefix_fn, items: list, pattern_fn) -> str:
    """For slug-based IDs (scenarios, grammar.items, fluency.starters):
    find the max suffix among items sharing the same sourceFile slug, default to 001.
    Use this AFTER the sourceFile has been collected from the user."""
    # Called from collect_fields after sourceFile is known — see below
    pass  # placeholder; actual logic inline in collect_fields

def _slug(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.strip().lower()).strip("-")
```

---

### Step 3.3: Implement prompt helpers

- [ ] Add input prompt helpers:

```python
# ── Input helpers ─────────────────────────────────────────────────────────────
def prompt(label: str, required: bool = True, default: str = "") -> str:
    suffix = "" if required else f" (optional, Enter to skip)"
    if default:
        suffix = f" [{default}]"
    while True:
        val = input(f"  {label}{suffix}: ").strip()
        if not val and default:
            return default
        if not val and not required:
            return ""
        if val:
            return val
        print("  ✗ Required field. Please enter a value.")

def prompt_level() -> str:
    while True:
        val = input("  level [easy/medium/hard]: ").strip().lower()
        if val in ("easy", "medium", "hard"):
            return val
        print("  ✗ Must be exactly: easy, medium, or hard")

def prompt_tags() -> list:
    while True:
        raw = input("  tags (comma-separated, min 1): ").strip()
        tags = [re.sub(r"\s+", "-", t.strip().lower()) for t in raw.split(",") if t.strip()]
        if tags:
            return tags
        print("  ✗ At least one tag required.")

def prompt_sourcefile() -> str:
    while True:
        val = input("  sourceFile (e.g. activities/reading/my-activity.html): ").strip()
        if not val.endswith(".html"):
            print("  ✗ Must end in .html")
            continue
        if not (val.startswith("activities/") or val.startswith("activity-loader")):
            print("  ✗ Must start with activities/ or activity-loader")
            continue
        full_path = REPO / val
        if not full_path.exists():
            print(f"  ⚠ Warning: {val} does not exist on disk yet (continuing anyway)")
        return val
```

---

### Step 3.4: Implement `collect_fields(category, array_key, items)` and `build_item()`

- [ ] Add the field collection and item builder:

```python
def collect_fields(category: str, array_key: str, items: list) -> dict:
    """Prompt for all fields for the given category/array and return a new item dict."""
    config = ARRAY_CONFIGS[(category, array_key)]
    required = config["required"]
    optional = config["optional"]
    id_fn = config["id_fn"]

    item = {}

    # Collect required fields
    for field in required:
        if field == "level":
            item["level"] = prompt_level()
        elif field == "sourceFile":
            item["sourceFile"] = prompt_sourcefile()
        elif field == "text" and array_key in ("paragraphPassages", "lBlendStories"):
            print("  text (multi-line, enter blank line to finish):")
            lines = []
            while True:
                line = input("    ")
                if line == "":
                    break
                lines.append(line)
            item["text"] = " ".join(lines)
        else:
            item[field] = prompt(field)

    # Collect optional fields
    for field in optional:
        if "." in field:
            parent, child = field.split(".", 1)
            val = prompt(field, required=False)
            if val:
                item.setdefault(parent, {})[child] = val
        else:
            val = prompt(field, required=False)
            if val:
                item[field] = val

    # Always collect tags
    item["tags"] = prompt_tags()

    # Auto-generate id
    if id_fn is not None:
        item["id"] = id_fn(items)
    else:
        # id derived from sourceFile or title slug
        if "sourceFile" in item:
            source_slug = _slug(Path(item["sourceFile"]).stem)
            # For slug-based IDs, find the max suffix among existing items with
            # the SAME slug prefix (not array-global max), so each sourceFile
            # starts its own -001, -002... sequence.
            if array_key == "scenarios":
                prefix = f"social-{source_slug}"
            elif array_key == "items":
                prefix = f"grammar-{source_slug}"
            elif array_key == "starters":
                prefix = f"fluency-{source_slug}"
            else:
                prefix = None

            if prefix:
                pat = re.compile(rf"{re.escape(prefix)}-(\d+)$")
                max_n = 0
                for existing in items:
                    m = pat.search(str(existing.get("id", "")))
                    if m:
                        max_n = max(max_n, int(m.group(1)))
                item["id"] = f"{prefix}-{str(max_n + 1).zfill(3)}"

        elif "title" in item and array_key == "reflectionStories":
            item["id"] = f"sharing-{_slug(item['title'])}"

    # For contextClues: inject level into id
    if array_key == "contextClues":
        lvl = item.get("level", "medium")
        pat = re.compile(r"cc-[a-z]+-(\d+)")
        max_n = 0
        for existing in items:
            m = pat.search(str(existing.get("id", "")))
            if m:
                max_n = max(max_n, int(m.group(1)))
        item["id"] = f"cc-{lvl}-{str(max_n + 1).zfill(3)}"

    return item
```

---

### Step 3.5: Implement `regen_js_wrapper()` and `main()`

- [ ] Add JS wrapper regeneration (same logic as populate-tags.py, duplicated for standalone script):

```python
def regen_js_wrapper(category: str, data: dict) -> None:
    js_path = DATA / f"{category}.js"
    # Match the exact format of existing .js wrappers
    # Check first: head -2 data/social.js to confirm dot vs bracket notation
    json_str = json.dumps(data, indent=2, ensure_ascii=False)
    js_content = (
        f"window.ActivityData = window.ActivityData || {{}};\n"
        f"window.ActivityData['{category}'] = {json_str};\n"
    )
    js_path.write_text(js_content, encoding="utf-8")

def main():
    print("\n🗣️  Speech Activity Content Adder\n")

    # Step 1: Choose category
    categories = list(CATEGORY_ARRAYS.keys())
    print("Categories:", " / ".join(categories))
    while True:
        cat = input("Category: ").strip().lower()
        if cat in categories:
            break
        print(f"  ✗ Choose from: {', '.join(categories)}")

    # Step 2: Choose array
    arrays = CATEGORY_ARRAYS[cat]
    if len(arrays) == 1:
        array_key = arrays[0]
        print(f"Array: {array_key}")
    else:
        print("Arrays:", " / ".join(arrays))
        while True:
            array_key = input("Array: ").strip()
            if array_key in arrays:
                break
            print(f"  ✗ Choose from: {', '.join(arrays)}")

    # Step 3: Load existing data
    json_path = DATA / f"{cat}.json"
    data = json.loads(json_path.read_text(encoding="utf-8"))
    items = data.get(array_key, [])
    print(f"\nAdding to {cat}.json → {array_key} ({len(items)} existing items)\n")

    # Step 4: Collect fields
    new_item = collect_fields(cat, array_key, items)

    # Step 5: Preview and confirm
    print(f"\nNew item to add to data/{cat}.json → {array_key}:")
    print(json.dumps(new_item, indent=2, ensure_ascii=False))
    confirm = input("\nWrite? [Y/n]: ").strip().lower()
    if confirm not in ("", "y", "yes"):
        print("Aborted.")
        sys.exit(0)

    # Step 6: Write
    items.append(new_item)
    data[array_key] = items
    json_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    regen_js_wrapper(cat, data)

    print(f"\n✓ Added to data/{cat}.json ({len(items) - 1} → {len(items)} items). Wrapper regenerated.")

if __name__ == "__main__":
    main()
```

---

### Step 3.6: Smoke test the CLI

- [ ] Run a test add for the simplest array (`articulation → lBlendStories`):
```bash
python3 scripts/add-content.py
# Enter: articulation → lBlendStories
# Enter sample title, text, tags
# Confirm with Y
```

- [ ] Verify the new item appears in `data/articulation.json`:
```bash
python3 -c "
import json
with open('data/articulation.json') as f:
    d = json.load(f)
print(d['lBlendStories'][-1])
"
```

- [ ] Verify the .js wrapper updated:
```bash
python3 -c "
import pathlib
txt = pathlib.Path('data/articulation.js').read_text()
assert 'window.ActivityData' in txt
print('articulation.js OK, size:', len(txt))
"
```

- [ ] Run a second test for `vocabulary → contextClues` (exercises the level-in-id logic):
```bash
python3 scripts/add-content.py
# Enter: vocabulary → contextClues
# Enter: level=easy, clueType=Definition, word=test, text=sample sentence, tags=vocabulary
```

- [ ] Verify generated id matches `cc-easy-NNN` format:
```bash
python3 -c "
import json
with open('data/vocabulary.json') as f:
    d = json.load(f)
print(d['contextClues'][-1]['id'])
"
```

- [ ] Remove the test items added during smoke test (restore original data files):
```bash
git checkout data/articulation.json data/articulation.js data/vocabulary.json data/vocabulary.js
```

- [ ] Commit the script:
```bash
git add scripts/add-content.py
git commit -m "feat: add interactive add-content.py CLI for appending to data catalog arrays"
```

---

## Verification Checklist

After all three tasks are complete:

- [ ] `python3 scripts/audit_activities.py --summary` still shows 119 COMPLIANT, 1 PARTIAL-EXPECTED
- [ ] `python3 -c "import json; [json.load(open(f'data/{c}.json')) for c in ['stories','social','grammar','fluency','vocabulary','articulation']]"` — all files parse without error
- [ ] `index.html` loads via `http://localhost:8080` and shows 121 activities
- [ ] Zero browser console errors on index.html
- [ ] `python3 scripts/add-content.py` runs to completion for at least one array without crashing

---

## Notes

- **JS wrapper format:** Before running either script, confirm exact notation used in existing wrappers:
  ```bash
  head -3 data/social.js
  ```
  If it uses `window.ActivityData.social = ...` (dot notation) rather than bracket notation, update `regen_js_wrapper()` accordingly.

- **stories.stories ids:** These are integers (1, 2, 3...), not strings. The `_next_int_id()` helper handles this correctly.

- **add-content.py does not update activity-index.json.** That file is auto-generated by `node scripts/build-index.js`. After adding a new activity HTML, run `node scripts/build-index.js` to refresh the index.
