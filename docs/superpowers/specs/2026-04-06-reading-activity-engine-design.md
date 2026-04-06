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
| Activity index | `activity-index.json` | Existing index, auto-updated on save |
| Admin server | `scripts/admin.py` | Local Python server for builder UI |
| Admin UI | Served by admin.py | Browser-based activity creation form |

### Existing files preserved

The 36 existing reading HTML files are **not touched**. They continue to work as-is. New activities use the shared template. Old activities can be migrated gradually at any time.

---

## Data Schema

Each reading activity is stored as a keyed entry in `data/stories.json`:

```json
"fall-reading-simple": {
  "_meta": {
    "title": "Fall Reading - Simple Comprehension",
    "displayMode": "tabs",
    "questionType": "comprehension",
    "level": "easy",
    "tags": ["fall", "comprehension", "reading"]
  },
  "stories": [
    {
      "id": 1,
      "title": "The Apple Tree",
      "text": "It was a crisp fall morning...",
      "imageUrl": "images/fall/apple-tree.jpg",
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
| `multiple-choice` | 4 options, correct answer highlighted on selection |
| `inference` | Same UI as open, framed as inference prompt |

Deferred: compare/contrast, drag-and-drop (require custom UI patterns, separate scope).

---

## Reading Template (`activities/reading/index.html`)

**URL format:** `activities/reading/index.html?activity=fall-reading-simple`

**Render logic:**
1. Read `?activity` param from URL
2. Load `DataLoader.get('stories', activityKey)` — same data-loader pattern used by all existing activities
3. Read `_meta` for display mode, title, level
4. Render stories per display mode
5. Render questions per story, per question type

**Visual:**
- Uses `body.category-reading` for background gradient (existing CSS class)
- Loads shared `/css/styles.css` and `/js/` utilities
- Header: activity title + level badge
- Story: title, optional image (if `imageUrl` present), story text
- Questions: below story text, rendered per type

---

## Admin Builder (`scripts/admin.py`)

**Launch:** `python3 scripts/admin.py`
Starts server on `http://localhost:8090`, opens browser automatically.

### Server endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/admin` | GET | Serve builder UI (single HTML page) |
| `/api/images` | GET | Return list of images grouped by subfolder |
| `/api/save` | POST | Write activity to stories.json, update activity-index.json, regenerate stories.js |

Uses Python stdlib only (`http.server`, `json`, `pathlib`, `os`). No dependencies to install.

### Builder UI — Step flow

**Step 1 — Activity basics**
- Title (text input)
- Level: easy / medium / hard (radio)
- Tags (comma-separated)
- Display mode: tabs / progressive / single (radio with short description)

**Step 2 — Stories**
- "Add Story" button to add stories one at a time
- Per story:
  - Title
  - Text (large textarea — paste full story)
  - Image (browse button opens image picker modal, images organized by `/images/` subfolder)
  - Questions (add as many as needed, toggle type per question)
    - Open-ended: just a question text field
    - Multiple choice: question + 4 option fields + correct answer selector

**Step 3 — Preview**
- Renders the activity exactly as `activities/reading/index.html` will display it
- Fully interactive: click tabs, answer questions, see images
- "Back to Edit" returns to Step 2

**Step 4 — Save**
- Auto-generates key from title (e.g., "Fall Reading Simple" → `fall-reading-simple`)
- Allows key to be confirmed or manually edited before saving
- On save: writes to `data/stories.json`, updates `activity-index.json`, regenerates `data/stories.js`
- Shows success message with link to open the new activity

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
- The activity renders correctly in `activities/reading/index.html?activity=<key>`
- The activity appears in the main index page after saving
- Existing 36 reading activities are unaffected
