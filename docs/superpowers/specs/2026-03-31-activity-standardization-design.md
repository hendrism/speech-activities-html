# Activity Standardization Design

**Date:** 2026-03-31
**Status:** Approved
**Goal:** Migrate all 120 activities to a single consistent standard before the next activity creation session (~1 week).

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
4. All 120 activities migrated to the above standard
5. `CLAUDE.md` updated so the AI agent always starts from the template

---

## Section 1: Data Standard

### Rules (no exceptions)
- All content lives in `/data/{category}.json` — one file per category
- Activities load data exclusively via `data-loader.js`
- No inline `<script>` data blocks in HTML files
- No direct `window.ActivityData` access — always go through `data-loader.js`

### Data file inventory

| File | Category key | Contents | Status |
|------|-------------|----------|--------|
| `data/articulation.json` + `data/articulation.js` | `articulation` | Word lists and sentence templates | `articulation.js` wrapper missing — must be created on Day 1 before Articulation migration |
| `data/fluency.json` + `data/fluency.js` | `fluency` | Conversation starters and prompts | Complete |
| `data/grammar.json` + `data/grammar.js` | `grammar` | Grammar exercises and scenarios | Complete |
| `data/social.json` + `data/social.js` | `social` | Social skills scenarios | Complete |
| `data/vocabulary.json` + `data/vocabulary.js` | `vocabulary` | Definitions, context clues, word lists | Complete |
| `data/vocabulary-images.json` | n/a | Image mappings for vocabulary items | Used only by `activities/vocabulary/image-viewer.html` — keep as-is, no migration needed |
| `data/stories.json` | `stories` | Reading comprehension stories | Used by Reading activities — see Reading note below |

### Reading category data file
Reading activities currently have inline story arrays in each HTML file. The canonical data file is `data/stories.json` (already exists). During migration, inline story data is extracted to `data/stories.json` and loaded via `DataLoader.get('stories', ...)`. A `data/stories.js` wrapper must be created on Day 1 (same format as other wrappers) if it does not already exist.

### Creating the articulation.js wrapper (Day 1 blocker)
The `.js` wrapper file format is consistent across all categories. Example from `data/fluency.js`:
```javascript
window.ActivityData = window.ActivityData || {};
window.ActivityData.articulation = {
  // contents of articulation.json pasted here
};
```
Create `data/articulation.js` by wrapping `data/articulation.json` content in this pattern before beginning the Articulation migration on Day 2.

### Files to retire (after all activities migrate off them)
- `js/language-data.js` — superseded by `data/vocabulary.json`
- `js/word-lists.js` — superseded by `data/articulation.json`
- `resources/word-lists/*.json` (10 files) — superseded by `data/articulation.json`

### Schema rule
Every item in every data file retains `id`, `level`, and `tags` fields. This preserves the future SQLite migration path.

### New file: `/data/README.md`
A short reference doc listing what each data file contains and what legacy file it replaces. The AI agent reads this to know where to put new content.

---

## Section 2: Activity Template & Visual Design System

### The existing template: `/activities/template.html`
This file exists but uses an inline `ACTIVITY_DATA` array — it is a legacy template following the old pattern. It is the starting point for the new canonical template, but must be rewritten to conform to the standard.

### The new canonical template: `/activities/_template.html`
Rewrite `/activities/template.html` into a new file at `/activities/_template.html`. It must contain:
- `<head>` with shared CSS imported (`/css/styles.css`)
- One CSS variable for the activity's category accent color (e.g., `--accent: var(--color-reading)`)
- Correct script loading order: data file (`../../data/{category}.js`) first, then `../../js/data-loader.js`, then activity logic
- Placeholder comments for content, controls, and display sections
- Zero inline data or styles

The old `activities/template.html` is retired after `_template.html` is created.

### Visual design system
Extracted from what already works across the existing activities and centralized into `/css/styles.css`:
- Shared color palette — one accent color per category (reading, vocabulary, social, grammar, articulation, fluency) as CSS custom properties
- Shared typography scale (font sizes, weights, line heights)
- Shared spacing, card, and container styles that currently appear duplicated across dozens of activities
- Category classes on `<body>` (e.g., `<body class="category-reading">`) to apply the correct accent color

### Rule: no `<style>` blocks in activity HTML
Activities must have no inline `<style>` tag. All styling comes from `/css/styles.css`. Category-specific color is handled by the `<body>` class.

---

## Section 3: Migration Process

### Version control strategy
Before any migration begins, create a dedicated git branch (e.g., `standardization-migration`). Commit after completing each category's migration. This ensures any category can be rolled back independently if a problem is discovered later in the week.

### Step 1 — Audit all 120 activities
Before touching any files, classify every activity into one of three states:
- ✅ **Compliant** — uses data-loader, no inline data, no `<style>` block
- ⚠️ **Partial** — uses data-loader but has minor inline styles or small issues
- ❌ **Non-compliant** — inline data, no data-loader, self-contained CSS

Output: a checklist that makes progress visible and identifies where to focus. Update the activity counts in the week plan if the audit reveals a different number than expected.

### Step 2 — Migrate by category, smallest to largest
Confirmed activity counts:
1. Articulation — 10 activities
2. Fluency — 8 activities
3. Grammar — 15 activities
4. Vocabulary — 28 activities
5. Social — 23 activities
6. Reading — 36 activities

**Total: 120 activities**

Starting small validates the process before hitting the large categories.

### Step 3 — Per-activity migration checklist
Each activity migration involves exactly these steps:
1. Extract any inline data to `/data/{category}.json` (and the corresponding `.js` wrapper)
2. Replace data access with `data-loader.js`
3. Strip `<style>` block; add `<body class="category-{name}">`
4. Confirm shared CSS covers the styling (add to `/css/styles.css` if needed)
5. Open in browser and verify the activity renders and functions correctly

### Step 4 — Validation gate per category
Do not begin the next category until at least 3 randomly selected activities from the current category pass the smoke test below.

### Smoke test pass criteria
An activity passes the smoke test if ALL of the following are true:
1. Page loads without any JavaScript console errors
2. Content (cards, questions, word lists, etc.) renders visibly on screen
3. Interactive controls (buttons, inputs, navigation) respond correctly
4. The browser DevTools Elements panel shows no `<style>` block inside `<head>` or `<body>`
5. The browser DevTools Network panel shows the correct `/data/{category}.js` file loaded

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
| 1 | Run audit; create `data/articulation.js` and `data/stories.js` wrappers; finalize CSS design system; create `_template.html`; retire `activities/template.html`; write `/data/README.md`; update `CLAUDE.md`; commit |
| 2 | Migrate Articulation (10) + Fluency (8); validate both; commit |
| 3 | Migrate Grammar (15); validate; commit |
| 4 | Migrate Vocabulary (28); validate; commit |
| 5 | Migrate Social (23); validate; commit |
| 6 | Migrate Reading (36); validate; commit |
| 7 | Buffer — fix any issues, retire legacy files (`js/language-data.js`, `js/word-lists.js`, `resources/word-lists/*.json`), final smoke test across all categories, merge branch |

---

## Success Criteria

- All 120 activities load data via `data-loader.js` with no inline data blocks
- No activity HTML file contains a `<style>` block
- Legacy files (`js/language-data.js`, `js/word-lists.js`, `resources/word-lists/*.json`) are deleted
- `/activities/_template.html` exists and is the documented starting point; old `activities/template.html` is retired
- `/data/README.md` exists and accurately describes each data file
- `data/articulation.js` and `data/stories.js` wrappers exist
- `CLAUDE.md` includes the activity creation standard
- All activities pass the 5-point smoke test after migration
