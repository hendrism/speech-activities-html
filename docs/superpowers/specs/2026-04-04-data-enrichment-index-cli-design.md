# Design: Data Enrichment, Index Refactor & Content CLI

**Date:** 2026-04-04
**Status:** Approved

## Overview

Three independent improvements to the speech therapy activity site:

1. **`scripts/populate-tags.py`** — populate `level`/`tags` on catalog array items across data/*.json
2. **index.html refactor** — dynamic load from `data/activity-index.json` via fetch()
3. **`scripts/add-content.py`** — interactive CLI to add new data items

---

## Task 1 — `scripts/populate-tags.py`

### Scope — Exact Arrays

Only the following arrays receive level/tags. All other arrays in all six files are left untouched.

| File | Array key |
|------|-----------|
| `stories.json` | `stories` |
| `social.json` | `scenarios`, `problemStories`, `reflectionStories` |
| `grammar.json` | `items` |
| `fluency.json` | `starters` |
| `vocabulary.json` | `wordDefinitions`, `contextClues` |
| `articulation.json` | `paragraphPassages`, `lBlendStories` |

All other top-level keys in these files (e.g., `stories.json`'s 25 per-activity sub-arrays, `articulation.json`'s `soundCategories`, `social.json`'s `conversationStarters`) are ignored.

### Skip Policy

**Skip if present:** If an item already has a non-null `level` value (any value, including non-conforming like `"Simple"` or integer `1`), leave both `level` and `tags` untouched. Only items where `level` is `null` or missing get updated. Same rule for `tags` — skip if non-empty array already present.

This means the script never overwrites existing data.

### Level Assignment (for items with null/missing level)

Check these signals in order, stop at the first match:

1. **Existing field on item** — `difficulty`, `length` → map to easy/medium/hard:
   - `"simple"`, `"Easier"`, `"short"`, `"Level 1"`, `"level1"` → `"easy"`
   - `"complex"`, `"Stretch"`, `"long"`, `"Level 3"`, `"level3"` → `"hard"`
   - `"moderate"`, `"medium"`, `"Level 2"`, `"level2"` → `"medium"`
2. **Title keywords** (case-insensitive):
   - `easy` signals: `"simple"`, `"beginning"`, `"elementary"`, `"basic"`, `"short"`, `"easy"`
   - `hard` signals: `"complex"`, `"advanced"`, `"high school"`, `"hs-"`, `"progressive"`, `"challenge"`
   - `medium` signals: `"middle school"`, `"intermediate"`
3. **sourceFile path**:
   - Path contains `"hs-"` or `"high-school"` → `"hard"`
   - Path contains `"elementary"` or `"simple"` → `"easy"`
4. **Default:** `"medium"`

### Tag Assignment (for items with null/missing/empty tags)

Build a tag list from the following sources, deduplicated, lowercase, hyphenated:

1. **Existing item fields** (use value if present):
   - `season` → e.g. `"fall"` becomes tag `"fall"`
   - `tag` → use as-is (lowercased, spaces → hyphens)
   - `focus` → lowercased, spaces → hyphens
   - `category` → lowercased

2. **Title keyword extraction** — map these keywords to tags:

   | Keyword (case-insensitive) | Tag |
   |---|---|
   | fall, autumn | `fall` |
   | winter | `winter` |
   | spring | `spring` |
   | thanksgiving | `thanksgiving` |
   | animal, animals | `animals` |
   | inference, infer | `inference` |
   | retell, retelling | `retelling` |
   | pronoun | `pronouns` |
   | compare, contrast | `compare-contrast` |
   | emotion | `emotions` |
   | conversation | `conversation` |
   | articulation | `articulation` |
   | summary, summarize | `summarizing` |
   | author | `author-purpose` |
   | vocabulary | `vocabulary` |
   | sentence | `sentence-building` |
   | fluency | `fluency` |
   | social | `social-skills` |
   | problem, solving | `problem-solving` |

3. **sourceFile basename** → strip `.html` extension, use as fallback tag if no other tags found (e.g. `author-purpose-msg` → `["author-purpose-msg"]`)

Minimum 1 tag per item. If all sources yield nothing, use the category name as the tag (e.g. `"fluency"`).

### JS Wrapper Regeneration

After updating a JSON file, regenerate the `.js` wrapper by writing the entire updated JSON content (all top-level keys preserved) into the wrapper format:

```js
window.ActivityData = window.ActivityData || {};
window.ActivityData.{category} = {
  ...full JSON object...
};
```

The JS wrapper must contain the entire file, not just the updated array.

### Output Summary

Print per file:
```
social.json: 18 items updated, 5 skipped (already tagged), 0 errors
  → data/social.js regenerated
```

---

## Task 2 — index.html Dynamic Loading

### What `activity-index.json` Contains (authoritative source)

```json
{
  "_meta": { "description": "...", "generatedAt": "..." },
  "activities": [
    {
      "id": "communication-breakdown-causes",
      "category": "social",
      "title": "Communication Breakdown Spotter",
      "sourceFile": "activities/social/communication-breakdown-causes.html",
      "type": "content-driven"
    }
  ]
}
```

`activity-index.json` is the authoritative catalog (121 entries). It is the single source of truth after this refactor.

### Fields Intentionally Dropped

`icon`, `description`, and `tags` from the current hardcoded inline array are **dropped**. This is a deliberate trade-off: the index becomes self-maintaining. Cards show title, category badge, and type badge only.

### Featured Section

The current featured section (3 large cards) is **removed**. The top of the main content area shows the category-filtered grid immediately. The section header "All Activities" / "Reading" etc. remains.

### Rendered Card Structure

```html
<a href="{sourceFile}" class="card">
  <span class="category-badge category-{category}">{category}</span>
  <h3 class="card-title">{title}</h3>
  <span class="type-badge">{type}</span>
</a>
```

### Category Filter

Sidebar nav items: All, Articulation, Fluency, Grammar, Reading, Social, Vocabulary (matching `category` field values). Clicking filters the grid. "All" count = total activities. Per-category counts rendered dynamically from the loaded JSON.

### Search

Existing search filters against `title` (case-insensitive substring match). Preserved as-is.

### Error / Offline State

If `fetch` fails (e.g. opened as `file://`), replace the grid with:

```html
<div class="error-state">
  <p>Activities require a local server to load.</p>
  <code>npx http-server</code> then open <code>http://localhost:8080</code>
</div>
```

No silent failure — the user gets a clear actionable message.

### Legacy Cleanup

The 9 stale entries in the current hardcoded list disappear automatically (they don't exist in `activity-index.json`). The 14 missing activities appear automatically.

---

## Task 3 — `scripts/add-content.py`

### Usage

```
python3 scripts/add-content.py
```

No arguments. Fully interactive. stdlib only: `json`, `pathlib`, `re`, `sys`.

### Flow

1. Prompt: category
2. Prompt: target array (show only catalog arrays for chosen category)
3. Prompt: required + optional fields for that array
4. Auto-generate `id`
5. Preview JSON, confirm (Y/n)
6. Write JSON + regenerate `.js` wrapper
7. Print confirmation

### Per-Array Field Prompts and ID Formats

| Category | Array | Required prompts | Optional prompts | ID format |
|---|---|---|---|---|
| vocabulary | wordDefinitions | word, imageUrl | category, categoryHint | `word-def-{NNN}` (NNN = zero-padded 3-digit, next after max existing) |
| vocabulary | contextClues | level, clueType, word, text | hint | `cc-{level}-{NNN}` |
| stories | stories | title, sourceFile | season | next integer (max existing + 1) |
| social | scenarios | title, sourceFile | — | `social-{sourceFile-slug}-001` (slug = basename without .html) |
| social | problemStories | title, text | — | `social-problem-story-{NNN}` |
| social | reflectionStories | title, topic | — | `sharing-{slug}` where slug = title lowercased, spaces → hyphens |
| grammar | items | title, sourceFile | focus | `grammar-{sourceFile-slug}-001` |
| fluency | starters | sourceFile, prompt | frames.word, frames.phrase, frames.sentence | `fluency-{sourceFile-slug}-001` |
| articulation | paragraphPassages | title, text, targetSound | — | `passage-{NNN}` |
| articulation | lBlendStories | title, text | — | `lblend-story-{NNN}` |

NNN = 3-digit zero-padded integer, next after the highest existing numeric suffix in that array.

### `sourceFile` Validation

- Must end in `.html`
- Must start with `activities/` or `activity-loader`
- Script checks if the file exists at `{repo_root}/{sourceFile}` — warns but does not block if missing (the file may not be created yet)

### `level` Validation

Must be exactly `"easy"`, `"medium"`, or `"hard"`. Re-prompt on invalid input.

### `tags` Input

Comma-separated string. Strip whitespace. Convert spaces within a tag to hyphens. Minimum 1 tag required.

### JS Wrapper Regeneration

Same as Task 1: write entire JSON content into `window.ActivityData.{category} = {...};` wrapper. Preserve all top-level keys.

### Confirmation Preview

Show the new item as pretty-printed JSON before writing:
```
New item to add to data/social.json → scenarios:
{
  "id": "social-my-new-activity-001",
  "title": "My New Activity",
  ...
}
Write? [Y/n]:
```

---

## Implementation Order

Tasks are independent. Suggested order: Task 1 → Task 3 → Task 2 (data first, then tools, then UI).
