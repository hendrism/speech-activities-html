# Reading Activity Engine — Design Spec
**Date:** 2026-04-06
**Status:** Approved
**Scope:** Phase 1 — Reading/Stories category only

---

## Problem

The project has 36 separate reading activity HTML files that are mostly identical in structure but differ only in content. Creating a new reading activity currently requires:
- Copying and modifying an HTML file
- Manually editing JSON data files
- Using `add-content.py` which only appends to the global `stories` catalog, not per-activity arrays

There is no guided, content-first workflow for creating new activities.

---

## Goal

Replace the 36-file-per-activity pattern with:
1. **One shared reading template** that renders any activity from data
2. **A browser-based activity builder** that lets you create a new reading activity by entering content — no HTML editing required

---

## Architecture

### Components

| Component | Path | Role |
|---|---|---|
| Reading template | `activities/reading/index.html` | Single HTML file rendering all reading activities |
| Data store | `data/stories.json` | Per-activity configs (existing file, extended) |
| JS wrapper | `data/stories.js` | Auto-regenerated from stories.json |
| Activity index | `data/activity-index.json` | Existing index, auto-updated on save |
| Admin server | `scripts/admin.py` | Local Python server for builder UI and static file serving |
| Admin UI | Served by admin.py at `/admin` | Browser-based activity creation form |

### Existing files preserved

The 36 existing reading HTML files are **not touched**. They continue to work as-is. New activities use the shared template. Old activities can be migrated gradually at any time.

---

## Data Schema

### `data/stories.json` top-level shape

The file already contains a mix of top-level keys that coexist without conflict:
- `_meta` — file metadata object
- `stories` — global story catalog (flat array, untouched)
- Per-activity keys (e.g., `"fall-reading-comprehension-infer"`) — existing activities, each an array of story objects

New template-backed activities add a new kind of per-activity key: an **object** with `_meta` and `stories` sub-keys. `DataLoader.get('stories', key)` already supports arbitrary key lookup and returns whatever is stored at that key — existing array-based keys return arrays (used by old activity HTML files), new object-based keys return the activity config object (used by the reading template).

### New activity config shape

```json
"fall-reading-simple": {
  "_meta": {
    "title": "Fall Reading - Simple Comprehension",
    "displayMode": "tabs",
    "level": "easy",
    "tags": ["fall", "comprehension", "reading"]
  },
  "stories": [
    {
      "id": 1,
      "title": "The Apple Tree",
      "text": "It was a crisp fall morning...",
      "imageUrl": "/images/fall/apple-tree.jpg",
      "questions": [
        {
          "type": "open",
          "text": "What did the child do with the apples?"
        },
        {
          "type": "multiple-choice",
          "text": "Why was the morning described as crisp?",
          "options": ["It was cold", "It was hot", "It was rainy", "It was windy"],
          "answer": 0
        }
      ]
    }
  ]
}
```

**`imageUrl`** — always root-relative (e.g., `/images/fall/apple-tree.jpg`). This ensures correct resolution regardless of which HTML file loads the data.

### Display modes (Phase 1)

| Mode | Behavior |
|---|---|
| `tabs` | All stories visible, click between them |
| `progressive` | One story revealed at a time, Next/Back buttons |
| `single` | One story, no navigation |

### Question types (Phase 1)

| Type | UI |
|---|---|
| `open` | Question text shown, oral/written response during session |
| `multiple-choice` | 2–4 options (not hardcoded), correct answer highlighted on selection |
| `inference` | Same UI as open, framed as inference prompt |

Example `inference` question object:
```json
{ "type": "inference", "text": "Why do you think the boy hesitated before opening the door?" }
```

Deferred: compare/contrast, drag-and-drop (require custom UI patterns, separate scope).

---

## Reading Template (`activities/reading/index.html`)

**URL format:** Always accessed via explicit query string — `activities/reading/index.html?activity=fall-reading-simple`. Bare directory navigation (`activities/reading/`) is not a supported URL and will show a directory listing, which is fine (no special handling needed).

**Render logic:**
1. Read `?activity` param from URL
2. Call `DataLoader.get('stories', activityKey)` — returns the `{ _meta, stories }` object
3. Guard: if the result is an array or has no `_meta` key, render an error message: "This activity key is not compatible with the reading template. Old activities use their own HTML files." — stops rendering.
4. Read `_meta` for display mode, title, level
5. Render stories per display mode
6. Render questions per story, per question type

**Visual:**
- Uses `body.category-reading` for background gradient (existing CSS class)
- Loads shared `/css/styles.css` and `/js/` utilities — same as all other activities
- Header: activity title + level badge
- Story: title, optional image (only rendered if `imageUrl` is present), story text
- Questions: below story text, rendered per type

---

## Admin Builder (`scripts/admin.py`)

**Launch:** `python3 scripts/admin.py`

Starts a local server on port 8090 that serves **both** the admin UI and the full repo as static files (so the preview iframe can load the reading template without a separate dev server). Opens `http://localhost:8090/admin` in the browser automatically.

### Server endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/admin` | GET | Serve builder UI (single self-contained HTML page) |
| `/api/images` | GET | Return JSON: `{ "fall": ["/images/fall/apple.jpg", ...], "winter": [...], ... }` — images grouped by subfolder |
| `/api/save` | POST | Validate, write activity to `data/stories.json`, append to `data/activity-index.json`, regenerate `data/stories.js` |
| `/*` | GET | Serve static repo files (enables preview iframe) |

Uses Python stdlib only (`http.server`, `json`, `pathlib`, `os`, `webbrowser`). No pip installs required.

### `_preview` key cleanup

The preview flow writes a `_preview` key to `stories.json`. If the server is killed or the browser tab is closed mid-preview, this key persists as a stale artifact. The admin server removes the `_preview` key from `stories.json` (and regenerates `stories.js`) on every startup before serving any requests.

### Key collision handling

On save, if the generated or user-edited key already exists in `stories.json`, the server returns an error and the UI shows a clear message: "An activity with this key already exists. Please choose a different key." It does not overwrite.

### Key generation rules

Activity keys are derived from the title by: lowercasing, replacing spaces with hyphens, stripping all characters that are not `[a-z0-9-]`, and collapsing consecutive hyphens. Example: "It's Fall! (Grade 1)" → `its-fall-grade-1`. The UI shows the generated key and allows manual editing before save.

### Builder UI — Step flow

**Step 1 — Activity basics**
- Title (text input)
- Level: easy / medium / hard (radio)
- Tags (comma-separated)
- Display mode: tabs / progressive / single (radio with short description of each)

**Step 2 — Stories**
- "Add Story" button adds stories one at a time
- Per story:
  - Title
  - Text (large textarea — paste full story)
  - Image (browse button opens modal; images listed by `/images/` subfolder; clicking one sets `imageUrl` to root-relative path)
  - Questions (add as many as needed; per question, toggle between open-ended and multiple choice)
    - Open-ended: question text field only
    - Multiple choice: question text + 2–4 option fields + correct answer selector (radio)

**Step 3 — Preview**
- An `<iframe>` loads `http://localhost:8090/activities/reading/index.html?activity=_preview`
- Before loading, the admin server writes the in-progress config to `stories.json` under the key `_preview` and regenerates `stories.js`
- The iframe renders the actual reading template with real data — fully interactive
- "Back to Edit" removes the `_preview` key and returns to Step 2

**Step 4 — Save**
- Auto-generates key from title (e.g., "Fall Reading Simple" → `fall-reading-simple`)
- User can confirm or edit the key before saving
- On save: removes `_preview` key if present, writes final config under confirmed key, appends entry to `data/activity-index.json` (and updates `_meta.types` to include `"template-driven"` if not already present), regenerates `data/stories.js`
- Shows success message with a direct link to open the new activity

### `data/activity-index.json` entry format for new template-backed activities

```json
{
  "id": "fall-reading-simple",
  "category": "reading",
  "title": "Fall Reading - Simple Comprehension",
  "sourceFile": "activities/reading/index.html?activity=fall-reading-simple",
  "type": "template-driven"
}
```

`sourceFile` includes the query string so the main index page can link directly to the activity without needing to know about the `?activity=` convention.

---

## Out of Scope (Phase 1)

- Migration of existing 36 reading HTML files (backward compatible, not required)
- Other categories (vocabulary, social, grammar, fluency, articulation)
- Compare/contrast and drag-and-drop question types
- Audio/video content
- Data logging or student progress tracking
- Cloud storage or database

---

## Success Criteria

- A new reading activity with 10 stories and questions can be created entirely through the builder UI without touching any code or JSON files directly
- The activity renders correctly at `http://localhost:8090/activities/reading/index.html?activity=<key>`
- The activity appears in the main index page immediately after saving, since the index page reads `data/activity-index.json` dynamically with no build step required
- Attempting to save with a duplicate key shows an error — no silent overwrites
- Existing 36 reading activities are unaffected
