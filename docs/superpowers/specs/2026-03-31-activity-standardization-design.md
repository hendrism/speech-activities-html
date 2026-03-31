# Activity Standardization Design

**Date:** 2026-03-31
**Status:** Approved
**Goal:** Migrate all 121 activities to a single consistent standard before the next activity creation session (~1 week).

---

## Problem

The project has been built over ~1 year with multiple iterations, resulting in:

- **Inconsistent data loading** — some activities use the new `data-loader.js` + `/data/*.json` pattern, others still have inline `<script>` data blocks
- **Inconsistent visual structure** — some activities use shared CSS, others have large inline `<style>` blocks with duplicated rules
- **AI agent inherits the mess** — when creating new activities, the AI agent references existing files and reproduces whatever pattern it finds, compounding the inconsistency over time
- **Legacy files still active** — `js/language-data.js`, `js/word-lists.js`, and `resources/word-lists/*.json` are still loaded by some activities despite their content being superseded by `/data/*.json`

---

## Architecture

```
/data/{category}.json       ← All content lives here (source of truth)
       ↓
/js/data-loader.js          ← One way to load data (no exceptions)
       ↓
/activities/{cat}/foo.html  ← Thin HTML shell + activity logic only
       ↑
/css/styles.css             ← All shared visual styles
```

Five deliverables:
1. A canonical activity template (`/activities/_template.html`)
2. A finalized data layer (all inline data extracted, legacy JS files retired)
3. A unified visual design system (CSS variables, no inline styles in activities)
4. All 121 activities migrated to the above standard
5. `CLAUDE.md` updated so the AI agent always starts from the template

---

## Section 1: Data Standard

### Rules (no exceptions)
- All content lives in `/data/{category}.json` — one file per category
- Activities load data exclusively via `data-loader.js`
- No inline `<script>` data blocks in HTML files
- No direct `window.ActivityData` access — always go through `data-loader.js`

### Files to retire (after all activities migrate off them)
- `js/language-data.js` — superseded by `data/vocabulary.json`
- `js/word-lists.js` — superseded by `data/articulation.json`
- `resources/word-lists/*.json` (10 files) — superseded by `data/articulation.json`

### Outstanding data work
- Audit which activities still have inline data and extract to the relevant `/data/{category}.json`
- Verify `data/vocabulary.json` fully covers `js/language-data.js` content (check `_meta` block)
- Add missing `data/articulation.js` wrapper (only `.json` exists currently)
- The dual `.json` / `.js` format is intentional and stays: `.json` is the source of truth, `.js` is the browser-loadable wrapper

### Schema rule
Every item in every data file retains `id`, `level`, and `tags` fields. This preserves the future SQLite migration path.

### New file: `/data/README.md`
A short reference doc listing what each data file contains and what legacy file it replaces. The AI agent reads this to know where to put new content.

---

## Section 2: Activity Template & Visual Design System

### The template file: `/activities/_template.html`
The single starting point for every new activity. Contains:
- `<head>` with shared CSS imported (`/css/styles.css`)
- One CSS variable for the activity's category accent color
- Correct script loading order: `data-loader.js` first, then activity logic
- Placeholder comments for content, controls, and display sections
- Zero inline data or styles

### Visual design system
Extracted from what already works across the existing activities and centralized into `/css/styles.css`:
- Shared color palette — one accent color per category (reading, vocabulary, social, grammar, articulation, fluency)
- Shared typography scale (font sizes, weights, line heights)
- Shared spacing, card, and container styles
- Category classes on `<body>` (e.g., `<body class="category-reading">`) to apply the correct accent color

### Rule: no `<style>` blocks in activity HTML
Activities must have no inline `<style>` tag. All styling comes from `/css/styles.css`. Category-specific color is handled by the `<body>` class.

---

## Section 3: Migration Process

### Step 1 — Audit all 121 activities
Before touching any files, classify every activity into one of three states:
- ✅ **Compliant** — uses data-loader, no inline data, no `<style>` block
- ⚠️ **Partial** — uses data-loader but has minor inline styles or small issues
- ❌ **Non-compliant** — inline data, no data-loader, self-contained CSS

Output: a checklist that makes progress visible and identifies where to focus.

### Step 2 — Migrate by category, smallest to largest
Order:
1. Articulation (10 activities)
2. Fluency (8 activities)
3. Grammar (15 activities)
4. Vocabulary (28 activities)
5. Social (23 activities)
6. Reading (36 activities)

Starting small validates the process before hitting the large categories.

### Step 3 — Per-activity migration checklist
Each activity migration involves exactly these steps:
1. Extract any inline data to `/data/{category}.json`
2. Replace data access with `data-loader.js`
3. Strip `<style>` block; add `<body class="category-{name}">`
4. Confirm shared CSS covers the styling (add to `/css/styles.css` if needed)
5. Open in browser and verify the activity renders and functions correctly

### Step 4 — Validation gate per category
Do not begin the next category until 3 randomly selected activities from the current category pass a visual smoke test.

---

## Section 4: AI Agent Guidance

### CLAUDE.md additions
A new section added to `CLAUDE.md` that tells the AI agent explicitly:

- **Always start from `/activities/_template.html`** — copy it, rename it, never start from scratch or copy an existing activity
- **All new content goes in `/data/{category}.json`** — use the `id`, `level`, `tags` schema; check `/data/README.md` to find the right file
- **Load data via `data-loader.js` only** — no inline data blocks, no direct `window` access
- **No `<style>` blocks in activity HTML** — all styling via `/css/styles.css` and `<body class="category-{name}">`
- Category accent color is automatic from the `<body>` class — no per-activity color overrides needed

### Why this works
After migration week, the AI agent references:
- `/activities/_template.html` — the correct structural starting point
- One compliant example from the relevant category — confirms the pattern in context
- `/data/README.md` — knows exactly where new content goes

This breaks the cycle of inheriting old patterns.

---

## Week Plan

| Day | Focus |
|-----|-------|
| 1 | Finalize CSS design system, create `_template.html`, write `/data/README.md`, update `CLAUDE.md`, run audit |
| 2 | Migrate Articulation (10) + Fluency (8), validate |
| 3 | Migrate Grammar (15), validate |
| 4 | Migrate Vocabulary (28), validate |
| 5 | Migrate Social (23), validate |
| 6 | Migrate Reading (36), validate |
| 7 | Buffer — fix any issues, retire legacy files, final check |

---

## Success Criteria

- All 121 activities load data via `data-loader.js` with no inline data blocks
- No activity HTML file contains a `<style>` block
- Legacy files (`js/language-data.js`, `js/word-lists.js`, `resources/word-lists/*.json`) are deleted
- `/activities/_template.html` exists and is the documented starting point
- `/data/README.md` exists and accurately describes each data file
- `CLAUDE.md` includes the activity creation standard
- All activities render correctly in the browser after migration
