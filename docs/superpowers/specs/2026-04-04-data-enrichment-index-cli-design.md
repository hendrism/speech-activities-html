# Design: Data Enrichment, Index Refactor & Content CLI

**Date:** 2026-04-04
**Status:** Approved

## Overview

Three independent improvements to the speech therapy activity site:

1. **Populate level/tags** on catalog array items across all six data files
2. **Refactor index.html** to dynamically load from `data/activity-index.json`
3. **Build `scripts/add-content.py`** — interactive CLI for adding new data items

These tasks are independent and can be implemented in any order.

---

## Task 1 — Level/Tags Population Script

### Goal
Populate `level` and `tags` fields on catalog array items so the activity browser can filter by difficulty and topic. Items that already have these fields are left untouched.

### Script
`scripts/populate-tags.py`

### Catalog Arrays in Scope

| File | Arrays |
|------|--------|
| `stories.json` | `stories[]` |
| `social.json` | `scenarios[]`, `problemStories[]`, `reflectionStories[]` |
| `grammar.json` | `items[]` |
| `fluency.json` | `starters[]` |
| `vocabulary.json` | `wordDefinitions[]`, `contextClues[]` |
| `articulation.json` | `paragraphPassages[]`, `lBlendStories[]` |

**Out of scope:** per-activity sub-arrays in stories.json (e.g. `fall-reading-simple`), `soundCategories` nested word groups in articulation.json, `conversationStarters` string array, `directionStrategyDefaults`/`rememberAndDoHelpers` string arrays.

### Level Heuristic

Assign based on existing fields (`level`, `difficulty`, `length`) if present. Otherwise derive from title/text keywords:

- `easy` — keywords: "simple", "beginning", "elementary", "level 1", short text (< 80 words), student age context (K–3)
- `hard` — keywords: "complex", "middle school", "high school", "hs-", multi-clause, abstract reasoning
- `medium` — default when no signals found

### Tag Heuristic

Extract from:
1. Existing `season`, `tag`, `focus`, `category` fields on the item
2. Title keywords → seasonal (`fall`, `winter`, `spring`, `thanksgiving`), topic (`animals`, `inference`, `retelling`, `pronouns`, `compare-contrast`, `emotions`, `conversation`, `articulation`)
3. `sourceFile` path segment (e.g. `author-purpose` → `["author-purpose"]`)

Tags are lowercase, hyphenated strings. Minimum 1 tag per item.

### Output
- Writes updated JSON back to `data/{category}.json`
- Regenerates `data/{category}.js` wrapper using the same format as existing wrappers: `window.ActivityData = window.ActivityData || {}; window.ActivityData.{category} = { ... };`
- Prints a summary: items updated, items skipped (already tagged), per-file counts

### JS Wrapper Format (reference)
```js
window.ActivityData = window.ActivityData || {};
window.ActivityData.{category} = { ...full JSON content... };
```

---

## Task 2 — index.html Dynamic Activity Loading

### Goal
Replace the ~800-line hardcoded JS activity data object in index.html with a `fetch('data/activity-index.json')` call. The activity grid renders from the JSON catalog, making it self-maintaining.

### Changes to index.html

**Remove:**
- The entire hardcoded `const activityData = [...]` structure (~lines 500–1300)
- All per-card `icon`, `description`, and `tags` properties (not in activity-index.json schema)

**Add:**
- `fetch('data/activity-index.json')` on DOMContentLoaded
- Dynamic card rendering from the JSON

### Card Schema (from activity-index.json)
```json
{
  "id": "communication-breakdown-causes",
  "category": "social",
  "title": "Communication Breakdown Spotter",
  "sourceFile": "activities/social/communication-breakdown-causes.html",
  "type": "content-driven"
}
```

### Rendered Card
- Title from `title`
- Link to `sourceFile`
- Category badge from `category`
- `type` badge (content-driven / tool)
- No icons or descriptions (dropped)

### Category Filtering
Sidebar nav items correspond to `category` values: `articulation`, `fluency`, `grammar`, `reading`, `social`, `vocabulary`. Clicking a category filters the grid. "All" shows everything. The current sidebar nav structure is preserved.

### Activity Counts
Sidebar category counts update dynamically from the loaded JSON (currently hardcoded).

### Error State
If fetch fails (e.g. opened as `file://` without a server), display a message: "Start the dev server to view activities: `npx http-server`"

### Stale Data Cleanup
The 9 stale entries in the current hardcoded list disappear automatically. The 14 missing activities appear automatically.

---

## Task 3 — `scripts/add-content.py`

### Goal
Interactive CLI for adding new items to catalog arrays. Writes JSON + regenerates the `.js` wrapper in one step.

### Usage
```
python3 scripts/add-content.py
```

### Flow
1. Prompt: category (`vocabulary` / `stories` / `social` / `grammar` / `articulation` / `fluency`)
2. Prompt: target array (filtered to catalog arrays for the chosen category)
3. Prompt: required fields for that array (title, sourceFile, level, tags, plus array-specific fields)
4. Auto-generate `id` following existing convention: `{category}-{array-slug}-{NNN}` where NNN = next integer
5. Validate: level must be `easy`/`medium`/`hard`; tags must be non-empty; sourceFile must end in `.html`
6. Preview the new item as JSON, confirm with user (Y/n)
7. Write to `data/{category}.json` + regenerate `data/{category}.js`
8. Print: `✓ Added to data/{category}.json (N → N+1 items). Wrapper regenerated.`

### Array-Specific Prompts

| Category → Array | Extra fields prompted |
|---|---|
| stories → stories | season (optional), sourceFile |
| social → scenarios | sourceFile |
| social → problemStories | sourceFile |
| social → reflectionStories | topic |
| grammar → items | sourceFile, focus (optional) |
| fluency → starters | sourceFile, frames.word/phrase/sentence (optional) |
| vocabulary → wordDefinitions | word, imageUrl (optional), category (optional) |
| vocabulary → contextClues | clueType, word, text, hint |
| articulation → paragraphPassages | text, targetSound |
| articulation → lBlendStories | text |

### No External Dependencies
Uses only Python stdlib: `json`, `pathlib`, `re`, `sys`.

---

## Implementation Order

1. `scripts/populate-tags.py` (Task 1) — standalone, no dependencies
2. `index.html` refactor (Task 2) — standalone
3. `scripts/add-content.py` (Task 3) — standalone

All three can be implemented in parallel or in any order.
