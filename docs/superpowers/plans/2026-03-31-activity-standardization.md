# Activity Standardization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all 120 activities to a single consistent standard — data loaded via `data-loader.js`, no inline data or `<style>` blocks, and a canonical template so the AI agent always creates correct activities.

**Architecture:** All content lives in `/data/{category}.json`+`.js` files. Activities load data exclusively via `data-loader.js`. All visual styles come from `/css/styles.css` via a `<body class="category-{name}">` convention — no per-activity `<style>` blocks.

**Tech Stack:** Vanilla HTML/CSS/JS. No build step. Static file serving (`python3 -m http.server 4173` from repo root). Audit script in Python 3.

---

## File Map

**Create:**
- `scripts/audit_activities.py` — compliance audit tool; the "test harness" for this migration
- `data/articulation.js` — browser-loadable wrapper (missing; Day 1 blocker)
- `data/stories.js` — browser-loadable wrapper (missing; Day 1 blocker)
- `data/README.md` — data layer reference for the AI agent
- `activities/_template.html` — canonical activity template; replaces `activities/template.html`

**Modify:**
- `css/styles.css` — add category accent color variables and `body.category-*` rules
- `AGENTS.md` — add activity creation standard section
- `data/articulation.json` — append any inline articulation data found during migration
- `data/stories.json` — append any inline story data found during migration
- `data/vocabulary.json` — append any inline vocabulary data found during migration
- All 120 activity HTML files across 6 categories

**Delete (Task 12, end of week):**
- `activities/template.html` — superseded by `_template.html` (also deleted in Task 4 Step 3)
- `js/language-data.js` — superseded by `data/vocabulary.json`
- `js/word-lists.js` — superseded by `data/articulation.json`
- `resources/word-lists/*.json` (10 files) — superseded by `data/articulation.json`

---

## Task 1: Create git branch and write the audit script

**Files:**
- Create: `scripts/audit_activities.py`

The audit script is the test harness for this entire migration. Run it before and after each category to measure progress objectively.

- [ ] **Step 1: Create the git branch**

```bash
cd /path/to/speech-activities-html
git checkout -b standardization-migration
```

Expected: `Switched to a new branch 'standardization-migration'`

- [ ] **Step 2: Create the audit script**

Create `scripts/audit_activities.py`:

```python
#!/usr/bin/env python3
"""
Audit activity HTML files for compliance with the activity standard.

Compliance rules:
  1. No <style> block in the file
  2. References data-loader.js
  3. No inline data arrays (ACTIVITY_DATA, stories, scenarios, etc.)
  4. <body> has a category-* class

Usage:
  python3 scripts/audit_activities.py
  python3 scripts/audit_activities.py --category articulation
  python3 scripts/audit_activities.py --summary
"""

import os
import re
import sys
import argparse
from pathlib import Path

ROOT = Path(__file__).parent.parent
ACTIVITIES_DIR = ROOT / "activities"
CATEGORIES = ["articulation", "fluency", "grammar", "reading", "social", "vocabulary"]

# Files with known approved exceptions (will show as PARTIAL — expected)
KNOWN_EXCEPTIONS = {"activities/vocabulary/image-viewer.html"}

INLINE_DATA_PATTERNS = [
    r'const\s+ACTIVITY_DATA\s*=\s*\[',
    r'const\s+stories\s*=\s*\[',
    r'const\s+items\s*=\s*\[',
    r'const\s+scenarios\s*=\s*\[',
    r'const\s+questions\s*=\s*\[',
    r'const\s+wordList\s*=\s*\[',
    r'const\s+words\s*=\s*\[',
    r'window\.wordDefinitions\s*=',
    r'window\.contextClues',
]

def audit_file(path):
    """Return (status, [issues]) for a single HTML file."""
    try:
        content = path.read_text(encoding="utf-8")
    except Exception as e:
        return "❌ NON-COMPLIANT", [f"could not read file: {e}"]

    issues = []

    if re.search(r'<style[\s>]', content, re.IGNORECASE):
        issues.append("has <style> block")

    if "data-loader.js" not in content:
        issues.append("missing data-loader.js")

    for pattern in INLINE_DATA_PATTERNS:
        if re.search(pattern, content):
            issues.append(f"inline data pattern: {pattern}")
            break

    if not re.search(r'<body[^>]+class=["\'][^"\']*category-', content):
        issues.append("missing body category-* class")

    if not issues:
        return "✅ COMPLIANT", []
    elif len(issues) >= 2:
        return "❌ NON-COMPLIANT", issues
    else:
        return "⚠️  PARTIAL", issues


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--category", help="Audit one category only")
    parser.add_argument("--summary", action="store_true", help="Print counts only")
    args = parser.parse_args()

    categories = [args.category] if args.category else CATEGORIES
    results = {"✅ COMPLIANT": [], "⚠️  PARTIAL (expected)": [], "⚠️  PARTIAL": [], "❌ NON-COMPLIANT": []}

    for cat in categories:
        cat_dir = ACTIVITIES_DIR / cat
        if not cat_dir.exists():
            print(f"WARNING: {cat_dir} not found", file=sys.stderr)
            continue
        for f in sorted(cat_dir.glob("*.html")):
            status, issues = audit_file(f)
            rel = str(f.relative_to(ROOT))
            if status == "⚠️  PARTIAL" and rel in KNOWN_EXCEPTIONS:
                status = "⚠️  PARTIAL (expected)"
            results[status].append((rel, issues))

    if args.summary:
        total = sum(len(v) for v in results.values())
        print(f"Total:         {total}")
        print(f"Compliant:     {len(results['✅ COMPLIANT'])}")
        print(f"Partial:       {len(results['⚠️  PARTIAL'])}")
        print(f"Non-compliant: {len(results['❌ NON-COMPLIANT'])}")
        return

    for status, files in results.items():
        if not files:
            continue
        print(f"\n{status} ({len(files)} files)")
        for path, issues in files:
            print(f"  {path}")
            for issue in issues:
                print(f"    - {issue}")

    total = sum(len(v) for v in results.values())
    print(f"\n── Summary ──────────────────────────────")
    print(f"Total:         {total}")
    print(f"Compliant:     {len(results['✅ COMPLIANT'])}")
    print(f"Partial:       {len(results['⚠️  PARTIAL'])}")
    print(f"Non-compliant: {len(results['❌ NON-COMPLIANT'])}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 3: Run the audit to establish a baseline**

```bash
python3 scripts/audit_activities.py --summary
```

Expected: a count breakdown showing most activities as non-compliant. Save this output — it's your baseline.

```bash
python3 scripts/audit_activities.py > docs/audit-baseline.txt
```

- [ ] **Step 4: Commit**

```bash
git add scripts/audit_activities.py docs/audit-baseline.txt
git commit -m "chore: add activity compliance audit script and baseline report"
```

---

## Task 2: Create missing data wrappers (Day 1 blockers)

**Files:**
- Create: `data/articulation.js`
- Create: `data/stories.js`

Both wrappers are required before any category migration begins. Articulation migration (Task 5) fails without `articulation.js`. Reading migration (Task 10) fails without `stories.js`.

- [ ] **Step 1: Create `data/articulation.js`**

The format matches all other wrappers exactly. Read `data/articulation.json` to get the content, then wrap it:

```javascript
window.ActivityData = window.ActivityData || {};
window.ActivityData.articulation = /* paste full contents of data/articulation.json here */;
```

Exact structure:
```javascript
window.ActivityData = window.ActivityData || {};
window.ActivityData.articulation = {
  "_meta": { ... },  // from articulation.json
  // all keys from articulation.json
};
```

- [ ] **Step 2: Verify articulation.js is valid JavaScript**

```bash
node -e "
const fs = require('fs');
const code = fs.readFileSync('data/articulation.js', 'utf8');
const vm = require('vm');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const meta = ctx.window?.ActivityData?.articulation?._meta;
if (!meta) throw new Error('_meta not found');
console.log('OK:', meta.description);
"
```

Expected: prints `OK:` followed by the description string from articulation.json.

- [ ] **Step 3: Create `data/stories.js`**

Check if `data/stories.json` uses a top-level object or array:
```bash
python3 -c "import json; d=json.load(open('data/stories.json')); print(type(d).__name__, list(d.keys())[:5] if isinstance(d, dict) else '(array)')"
```

Then create the wrapper:
```javascript
window.ActivityData = window.ActivityData || {};
window.ActivityData.stories = /* paste full contents of data/stories.json here */;
```

- [ ] **Step 4: Commit**

```bash
git add data/articulation.js data/stories.js
git commit -m "feat: add missing articulation.js and stories.js data wrappers"
```

---

## Task 3: Add category accent colors to `css/styles.css`

**Files:**
- Modify: `css/styles.css`

The current `:root` block has general design tokens but no per-category colors. Activities override the background with inline styles. This task centralizes those overrides.

- [ ] **Step 1: Add category color variables to the `:root` block**

Find the closing `}` of the `:root` block (around line 83 in `css/styles.css`) and add before it:

```css
    /* Category accent colors */
    --color-articulation:      #f59e0b;
    --color-articulation-dark: #d97706;
    --color-fluency:           #10b981;
    --color-fluency-dark:      #059669;
    --color-grammar:           #3b82f6;
    --color-grammar-dark:      #2563eb;
    --color-reading:           #8b5cf6;
    --color-reading-dark:      #7c3aed;
    --color-social:            #ec4899;
    --color-social-dark:       #db2777;
    --color-vocabulary:        #06b6d4;
    --color-vocabulary-dark:   #0891b2;
```

- [ ] **Step 2: Add category body background rules**

After the `body { ... }` rule (around line 101), add:

```css
/* --------------------------------------------------------------------------
   Category backgrounds — applied via <body class="category-{name}">
   -------------------------------------------------------------------------- */
body.category-articulation { background: linear-gradient(135deg, var(--color-articulation), var(--color-articulation-dark)); }
body.category-fluency       { background: linear-gradient(135deg, var(--color-fluency),      var(--color-fluency-dark)); }
body.category-grammar       { background: linear-gradient(135deg, var(--color-grammar),      var(--color-grammar-dark)); }
body.category-reading       { background: linear-gradient(135deg, var(--color-reading),      var(--color-reading-dark)); }
body.category-social        { background: linear-gradient(135deg, var(--color-social),       var(--color-social-dark)); }
body.category-vocabulary    { background: linear-gradient(135deg, var(--color-vocabulary),   var(--color-vocabulary-dark)); }
```

- [ ] **Step 3: Verify visually**

Open any existing activity that currently has an inline gradient background. Temporarily add `class="category-reading"` to its `<body>` tag. Confirm the background changes to violet. Then remove your test edit.

- [ ] **Step 4: Commit**

```bash
git add css/styles.css
git commit -m "feat: add per-category accent color tokens and body background classes"
```

---

## Task 4: Create canonical template `activities/_template.html`

**Files:**
- Create: `activities/_template.html`
- Delete: `activities/template.html` (after `_template.html` is created)

The existing `activities/template.html` has the right HTML structure but still uses an inline `ACTIVITY_DATA` array and a `<style>` block — the old pattern. Rewrite it as `_template.html` following the new standard.

- [ ] **Step 1: Create `activities/_template.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--
    ============================================================
    CANONICAL ACTIVITY TEMPLATE — v2
    ============================================================
    HOW TO USE:
      1. Copy this file into the correct category folder:
           activities/articulation/
           activities/fluency/
           activities/grammar/
           activities/reading/
           activities/social/
           activities/vocabulary/
      2. Rename it (kebab-case, e.g. spring-vocabulary.html)
      3. Update <title> and <h1>
      4. Change {category} in the two script src paths below
         to the actual category name (articulation, fluency, etc.)
      5. Change the <body class> to match the category
      6. Add new content items to /data/{category}.json
      7. Replace renderCard() with your activity's HTML
      8. Replace checkAnswer() with your validation logic
      9. Delete these comments

    DATA RULES (no exceptions):
      - All content lives in /data/{category}.json
      - Load it via DataLoader — never write inline data arrays
      - No <style> blocks — use CSS variables from /css/styles.css
    ============================================================
    -->
    <title>Activity Title — Speech Therapy</title>

    <!-- Shared design system (colors, spacing, buttons, cards) -->
    <link rel="stylesheet" href="../../css/styles.css">
</head>

<!-- Change category-reading to match this activity's category -->
<body class="category-reading">

    <!-- ── Header ─────────────────────────────────────── -->
    <div class="activity-header">
        <h1>🎯 Activity Title</h1>
        <p>Brief one-line description of the activity</p>
    </div>

    <!-- ── Main card ──────────────────────────────────── -->
    <div class="container">
        <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
        </div>
        <div class="progress-label" id="progress-label"></div>

        <div class="nav-pills" id="nav-pills"></div>

        <div class="card" id="card">
            <!-- Dynamic content injected by renderCard() -->
        </div>

        <div class="feedback" id="feedback"></div>

        <div class="flex-between mt-4">
            <button class="btn btn-secondary" id="prev-btn" onclick="prevItem()">← Previous</button>
            <button class="btn btn-primary"   id="next-btn" onclick="nextItem()">Next →</button>
        </div>
    </div>

    <!-- ── Scripts ───────────────────────────────────────
         Load order matters:
           1. Data file populates window.ActivityData
           2. data-loader.js provides the DataLoader API
           3. utils.js provides UI helpers
           4. Your activity logic (inline <script> below)
    ─────────────────────────────────────────────────── -->
    <script src="../../data/{category}.js"></script>
    <script src="../../js/data-loader.js"></script>
    <script src="../../js/utils.js"></script>

    <script>
        // ── Load data ─────────────────────────────────────────────
        // Replace '{category}' and '{key}' with your actual values.
        // Example: DataLoader.get('vocabulary', 'words')
        // See /data/README.md for all available categories and keys.
        const items = DataLoader.get('{category}', '{key}');

        // ── State ─────────────────────────────────────────────────
        const state = {
            items:        shuffleArray(items),  // or [...items] for sequential
            currentIndex: 0,
            answered:     false,
        };

        // ── Render ────────────────────────────────────────────────
        function renderCard() {
            const item = state.items[state.currentIndex];
            const card = document.getElementById('card');
            state.answered = false;
            hideFeedback('feedback');

            updateProgress('progress-fill', state.currentIndex + 1, state.items.length, 'progress-label');
            setNavActive('nav-pills', state.currentIndex);

            // ── Card content — customise this section ──
            card.innerHTML = `
                <p style="font-size: var(--font-size-lg); margin-bottom: var(--space-4);">
                    ${item.prompt}
                </p>
                <div class="options-grid" id="options">
                    <!-- Render answer choices here -->
                </div>
            `;
        }

        // ── Answer checking ───────────────────────────────────────
        function checkAnswer(selected) {
            if (state.answered) return;
            state.answered = true;
            const isCorrect = selected === state.items[state.currentIndex].answer;
            showFeedback('feedback', isCorrect);
        }

        // ── Navigation ────────────────────────────────────────────
        function nextItem() {
            if (state.currentIndex < state.items.length - 1) {
                state.currentIndex++;
                renderCard();
            } else {
                document.getElementById('card').innerHTML = `
                    <div class="text-center">
                        <p style="font-size: var(--font-size-2xl);">🎉 All done!</p>
                        <p class="text-muted mt-4">Great work today.</p>
                        <button class="btn btn-primary mt-4" onclick="restart()">Start Over</button>
                    </div>`;
                hideFeedback('feedback');
            }
        }

        function prevItem() {
            if (state.currentIndex > 0) { state.currentIndex--; renderCard(); }
        }

        function restart() {
            state.items = shuffleArray(items);
            state.currentIndex = 0;
            renderCard();
        }

        // ── Init ──────────────────────────────────────────────────
        renderNavPills('nav-pills', state.items, (idx) => {
            state.currentIndex = idx;
            renderCard();
        }, { labelFn: (item, i) => `${i + 1}` });

        renderCard();
    </script>
</body>
</html>
```

- [ ] **Step 2: Verify the template loads cleanly**

Serve the repo: `python3 -m http.server 4173`

Open `http://localhost:4173/activities/_template.html` in a browser.

Expected: page loads with a violet gradient background (category-reading default). DataLoader will emit a `console.error` about `{category}` not being loaded — this is expected for the placeholder template and is not a failure.

- [ ] **Step 3: Delete the legacy template**

```bash
git rm activities/template.html
```

- [ ] **Step 4: Commit**

```bash
git add activities/_template.html
git commit -m "feat: add canonical _template.html, retire legacy template.html"
```

---

## Task 5: Write `data/README.md` and update `AGENTS.md`

**Files:**
- Create: `data/README.md`
- Modify: `AGENTS.md`

- [ ] **Step 1: Create `data/README.md`**

Write a markdown file with these sections:

**Title:** `# Data Layer Reference`

**Intro paragraph:** "All activity content lives here. Load it via `DataLoader` — never write inline data arrays in HTML files."

**Usage section** with a code example showing:
  - `DataLoader.get('vocabulary', 'words')` to get all vocabulary words
  - `DataLoader.filter('social', 'scenarios', s => s.level === 'easy')` to filter by level

**Files table** with columns: File, Category key, Primary array key(s), Replaces:
  - `articulation.json` / `articulation.js` | `articulation` | `words`, `sentences` | replaces `js/word-lists.js` and `resources/word-lists/*.json`
  - `fluency.json` / `fluency.js` | `fluency` | `starters` | replaces inline data in fluency HTML files
  - `grammar.json` / `grammar.js` | `grammar` | `exercises`, `scenarios` | replaces inline data in grammar HTML files
  - `social.json` / `social.js` | `social` | `scenarios` | replaces inline data in social HTML files
  - `vocabulary.json` / `vocabulary.js` | `vocabulary` | `words`, `contextClues` | replaces `js/language-data.js`
  - `stories.json` / `stories.js` | `stories` | `stories` | replaces inline story arrays in reading HTML files
  - `vocabulary-images.json` | n/a | n/a | used only by `image-viewer.html` — do not change
  - `activity-index.json` | n/a | n/a | auto-generated master catalog — do not edit

**Schema section:** "Every item in every data file has: `id` (unique string), `level` (`easy`/`medium`/`hard` where applicable), `tags` (array of strings for filtering)."

**Adding new content section** (numbered steps):
  1. Find the right file in the table above
  2. Add items to the JSON array following the existing schema
  3. Regenerate the `.js` wrapper: wrap the JSON content in `window.ActivityData = window.ActivityData || {}; window.ActivityData.{category} = { ... };`
  4. Never add new data files without updating this README

- [ ] **Step 2: Add activity creation standard to `AGENTS.md`**

Append this section to `AGENTS.md`:

```markdown

## Activity Creation Standard

**Always start from `/activities/_template.html`.** Copy it into the correct category folder and rename it. Never start from scratch or copy an existing activity file — existing files may be in various states of migration.

### Rules (no exceptions)

1. **No inline data** — all content goes in `/data/{category}.json`. Check `/data/README.md` for the right file and key names.
2. **No `<style>` blocks** — all styling via `/css/styles.css`. Use CSS variables from that file.
3. **Set `<body class="category-{name}">`** — this applies the correct background gradient automatically.
4. **Load data via `data-loader.js` only** — script load order before `</body>` must be:
   ```html
   <script src="../../data/{category}.js"></script>
   <script src="../../js/data-loader.js"></script>
   <script src="../../js/utils.js"></script>
   <!-- then your inline <script> activity logic -->
   ```
5. **Access data via DataLoader** — `DataLoader.get('{category}', '{key}')`, never `window.ActivityData` directly.

### Quick checklist before committing a new activity

- [ ] Copied from `_template.html`, not an existing activity
- [ ] `<body>` has `class="category-{name}"` (e.g. `category-vocabulary`)
- [ ] No `<style>` block anywhere in the file
- [ ] Data loads from `/data/{category}.js` via `DataLoader.get()`
- [ ] New content items added to the correct `/data/{category}.json`
- [ ] Page opens in browser with no console errors
- [ ] All interactive controls work
```

- [ ] **Step 3: Commit**

```bash
git add data/README.md AGENTS.md
git commit -m "docs: add data layer README and activity creation standard to AGENTS.md"
```

---

## Task 6: Migrate Articulation (10 activities)

**Files:**
- Modify: all `.html` files in `activities/articulation/`
- Modify: `data/articulation.json` + `data/articulation.js` (if inline data is found)

**Pre-migration:** Run the audit for this category first:
```bash
python3 scripts/audit_activities.py --category articulation
```
Review the output to know exactly what needs fixing in each file before starting.

**Per-activity migration pattern:**

For each HTML file in `activities/articulation/`:

1. **Extract inline data** — if the file has `const ACTIVITY_DATA = [...]` or `const words = [...]`, add those items to `data/articulation.json` following the existing schema (`id`, `level`, `tags` on each item), then regenerate `data/articulation.js` to include the new items.

2. **Replace data loading** — remove the inline data array. Add to the script block:
   ```javascript
   const items = DataLoader.get('articulation', '{appropriate-key}');
   ```
   Replace all references to `ACTIVITY_DATA` in the activity logic with `items`.

3. **Update script tags** — ensure the `<head>` / pre-`</body>` script block is:
   ```html
   <script src="../../data/articulation.js"></script>
   <script src="../../js/data-loader.js"></script>
   <script src="../../js/utils.js"></script>
   ```

4. **Strip `<style>` block** — delete the entire `<style>...</style>` element. If styles in it were truly unique to that activity's layout, move them to `css/styles.css` as a scoped rule (e.g., `.activity-articulation-make-sentence { ... }`). Most inline styles duplicate rules already in `styles.css` — check first.

5. **Add body class** — change `<body>` to `<body class="category-articulation">`.

- [ ] **Step 1: Migrate all 10 articulation activities** using the pattern above

- [ ] **Step 2: Run audit to verify**

```bash
python3 scripts/audit_activities.py --category articulation
```

Expected: all 10 files show `✅ COMPLIANT`.

- [ ] **Step 3: Smoke test — open 3 random articulation activities**

```bash
python3 -m http.server 4173
```

Open 3 random articulation activities in browser. Verify all 5 smoke test criteria:
1. No console errors
2. Content renders visibly
3. Interactive controls work
4. No `<style>` block in DevTools Elements
5. `articulation.js` appears in DevTools Network

- [ ] **Step 4: Commit**

```bash
git add activities/articulation/ data/articulation.json data/articulation.js
git commit -m "refactor: migrate articulation activities to standard data-loader pattern"
```

---

## Task 7: Migrate Fluency (8 activities)

**Files:**
- Modify: all `.html` files in `activities/fluency/`

**Pre-migration:**
```bash
python3 scripts/audit_activities.py --category fluency
```

Follow the same per-activity migration pattern as Task 6, substituting:
- Category key: `fluency`
- Data file: `data/fluency.js` (already exists)
- Body class: `category-fluency`
- DataLoader call: `DataLoader.get('fluency', 'starters')`

- [ ] **Step 1: Migrate all 8 fluency activities**

- [ ] **Step 2: Run audit**

```bash
python3 scripts/audit_activities.py --category fluency
```
Expected: all 8 files `✅ COMPLIANT`.

- [ ] **Step 3: Smoke test 3 random fluency activities**

- [ ] **Step 4: Commit**

```bash
git add activities/fluency/ data/fluency.json data/fluency.js
git commit -m "refactor: migrate fluency activities to standard data-loader pattern"
```

---

## Task 8: Migrate Grammar (15 activities)

**Files:**
- Modify: all `.html` files in `activities/grammar/`
- Modify: `data/grammar.json` + `data/grammar.js` (if inline data found)

**Pre-migration:**
```bash
python3 scripts/audit_activities.py --category grammar
```

Follow the same per-activity migration pattern as Task 6, substituting:
- Category key: `grammar`
- Data file: `data/grammar.js` (already exists)
- Body class: `category-grammar`
- DataLoader call: `DataLoader.get('grammar', '{key}')` — check `data/grammar.json` for available keys

- [ ] **Step 1: Migrate all 15 grammar activities**

- [ ] **Step 2: Run audit**

```bash
python3 scripts/audit_activities.py --category grammar
```
Expected: all 15 files `✅ COMPLIANT`.

- [ ] **Step 3: Smoke test 3 random grammar activities**

- [ ] **Step 4: Commit**

```bash
git add activities/grammar/ data/grammar.json data/grammar.js
git commit -m "refactor: migrate grammar activities to standard data-loader pattern"
```

---

## Task 9: Migrate Vocabulary (28 activities)

**Files:**
- Modify: all `.html` files in `activities/vocabulary/` **except** `image-viewer.html`
- Modify: `data/vocabulary.json` + `data/vocabulary.js` (if inline data found)

**Note:** `activities/vocabulary/image-viewer.html` loads `data/vocabulary-images.json` directly via `fetch()` — this is the one approved exception to the data-loader rule. Do not modify it.

**Pre-migration:**
```bash
python3 scripts/audit_activities.py --category vocabulary
```

Follow the same per-activity migration pattern as Task 6, substituting:
- Category key: `vocabulary`
- Data file: `data/vocabulary.js` (already exists)
- Body class: `category-vocabulary`
- DataLoader call: `DataLoader.get('vocabulary', 'words')` or `DataLoader.get('vocabulary', 'contextClues')` — check the data file for the right key

- [ ] **Step 1: Migrate all 27 vocabulary activities** (all except `image-viewer.html`)

- [ ] **Step 2: Run audit**

```bash
python3 scripts/audit_activities.py --category vocabulary
```

Expected: 27 files `✅ COMPLIANT`, `image-viewer.html` may show `⚠️ PARTIAL` (acceptable — it uses fetch, not DataLoader, by design).

- [ ] **Step 3: Smoke test 3 random vocabulary activities**

- [ ] **Step 4: Commit**

```bash
git add activities/vocabulary/ data/vocabulary.json data/vocabulary.js
git commit -m "refactor: migrate vocabulary activities to standard data-loader pattern"
```

---

## Task 10: Migrate Social (23 activities)

**Files:**
- Modify: all `.html` files in `activities/social/`

**Pre-migration:**
```bash
python3 scripts/audit_activities.py --category social
```

Follow the same per-activity migration pattern as Task 6, substituting:
- Category key: `social`
- Data file: `data/social.js` (already exists)
- Body class: `category-social`
- DataLoader call: `DataLoader.get('social', 'scenarios')`

- [ ] **Step 1: Migrate all 23 social activities**

- [ ] **Step 2: Run audit**

```bash
python3 scripts/audit_activities.py --category social
```
Expected: all 23 files `✅ COMPLIANT`.

- [ ] **Step 3: Smoke test 3 random social activities**

- [ ] **Step 4: Commit**

```bash
git add activities/social/ data/social.json data/social.js
git commit -m "refactor: migrate social activities to standard data-loader pattern"
```

---

## Task 11: Migrate Reading (36 activities)

**Files:**
- Modify: all `.html` files in `activities/reading/`
- Modify: `data/stories.json` + `data/stories.js` (inline story arrays extracted here)

Reading is the largest and most complex category — activities currently have inline `const stories = [...]` arrays. Each story needs to be appended to `data/stories.json` with the standard schema fields (`id`, `level`, `tags`).

**Pre-migration:**
```bash
python3 scripts/audit_activities.py --category reading
```

**Special steps for reading:**

When extracting inline story data, check `data/stories.json` first — many stories may already be there (the file has 4,000+ lines). Match by `title` or content to avoid duplicates before adding. Only add items not already present.

Follow the same per-activity migration pattern as Task 6, substituting:
- Category key: `stories`
- Data file: `data/stories.js` (created in Task 2)
- Body class: `category-reading`
- DataLoader call: `DataLoader.get('stories', 'stories')` or filter by source file

- [ ] **Step 1: Migrate all 36 reading activities**

- [ ] **Step 2: Run audit**

```bash
python3 scripts/audit_activities.py --category reading
```
Expected: all 36 files `✅ COMPLIANT`.

- [ ] **Step 3: Smoke test 3 random reading activities**

- [ ] **Step 4: Commit**

```bash
git add activities/reading/ data/stories.json data/stories.js
git commit -m "refactor: migrate reading activities to standard data-loader pattern"
```

---

## Task 12: Final audit, cleanup, and merge

**Files:**
- Delete: `activities/template.html` (if not already deleted in Task 4)
- Delete: `js/language-data.js`
- Delete: `js/word-lists.js`
- Delete: `resources/word-lists/*.json` (10 files)

- [ ] **Step 1: Run the full audit across all categories**

```bash
python3 scripts/audit_activities.py
```

Expected: all 120 activities `✅ COMPLIANT` (except `image-viewer.html` which may show `⚠️ PARTIAL` — this is acceptable).

If any files still show non-compliant, fix them before proceeding.

- [ ] **Step 2: Verify legacy files are no longer referenced**

```bash
grep -r "language-data.js" activities/ && echo "STILL REFERENCED" || echo "CLEAR"
grep -r "word-lists.js" activities/ && echo "STILL REFERENCED" || echo "CLEAR"
```

Expected: both print `CLEAR`.

- [ ] **Step 3: Delete legacy files**

```bash
git rm js/language-data.js
git rm js/word-lists.js
git rm resources/word-lists/*.json
```

- [ ] **Step 4: Final smoke test — one activity from each category**

Open one activity from each of the 6 categories in a browser. Verify all 5 smoke test criteria pass for each:
1. No console errors
2. Content renders visibly
3. Interactive controls work
4. No `<style>` block in DevTools Elements
5. Correct `/data/{category}.js` file in DevTools Network

- [ ] **Step 5: Commit cleanup**

```bash
git commit -m "chore: remove legacy data files superseded by /data/*.json"
```

- [ ] **Step 6: Merge the migration branch**

```bash
git checkout main
git merge standardization-migration
git branch -d standardization-migration
```

- [ ] **Step 7: Verify final state**

```bash
python3 scripts/audit_activities.py --summary
```

Expected output:
```
Total:         120
Compliant:     120  (or 119 with image-viewer.html as Partial)
Partial:       0    (or 1)
Non-compliant: 0
```

---

## Success Criteria Checklist

- [ ] `python3 scripts/audit_activities.py --summary` shows 0 non-compliant files
- [ ] No activity HTML file contains a `<style>` block (except image-viewer.html)
- [ ] `js/language-data.js`, `js/word-lists.js`, `resources/word-lists/*.json` are deleted
- [ ] `activities/_template.html` exists; `activities/template.html` is gone
- [ ] `data/articulation.js` and `data/stories.js` exist
- [ ] `data/README.md` exists and is accurate
- [ ] `AGENTS.md` contains the Activity Creation Standard section
- [ ] All 6 category smoke tests pass (one activity each, 5 criteria each)
