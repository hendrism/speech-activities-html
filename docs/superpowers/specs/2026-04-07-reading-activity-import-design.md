# Reading Activity Import — Design Spec
**Date:** 2026-04-07
**Status:** Approved

## Problem

Creating new reading activities currently requires manually filling in a 4-step form in the admin builder (title → stories → preview → save). When content already exists as formatted text (stories, questions, answers), re-entering it manually is slow and error-prone.

## Solution

Two-part feature:

1. **Claude skill `/import-reading-activity`** — converts pasted raw text into a valid reading activity JSON config
2. **Admin builder "Import JSON" tab** — accepts the JSON output from the skill, previews it, and saves it using the existing save flow

---

## Part 1: Claude Skill

### File location
`~/.claude/plugins/anthropic-skills/skills/import-reading-activity.md`
(alongside existing skills like `slp-activities`, `soap-note-formatter`, etc.)

### Behavior
When invoked (`/import-reading-activity`):
1. Prompts the user to paste their raw activity text
2. Parses the text and outputs a complete JSON config matching the reading activity schema
3. Reminds the user to copy the JSON and paste it into the admin builder Import tab

### Output schema
The skill outputs a JSON object in the exact format expected by `data/stories.json` activity configs:

```json
{
  "_meta": {
    "title": "Activity Title",
    "displayMode": "tabs",
    "level": "easy",
    "tags": ["tag1", "tag2"]
  },
  "stories": [
    {
      "id": 1,
      "title": "Story Title",
      "text": "Story text here.",
      "imageUrl": "/images/path/to/image.png",
      "questions": [
        {
          "type": "multiple-choice",
          "text": "Question text?",
          "options": ["Option A", "Option B", "Option C"],
          "answer": 0
        }
      ]
    }
  ]
}
```

### Input format the skill accepts
The skill is flexible (Claude handles variations), but the canonical format is:

```
1. Story Title

Text
Story paragraph one.
Story paragraph two.
/images/optional/image/path.png

Literal

Question text?
Hint: Optional hint (noted but not stored — schema doesn't support hints yet).
	• A. Option one ✅
	• B. Option two
	• C. Option three

Inferential

Another question?
	• A. Wrong ✅
	• B. Also wrong
	• C. Also wrong

2. Second Story Title
...
```

### Field inference rules
| Input | Output |
|---|---|
| First story title (if no explicit activity title) | Used as `_meta.title` |
| `Literal` / `Inferential` / `Challenge` headers | Ignored — just organizational |
| `Hint: ...` lines | Noted, not included (schema doesn't support yet) |
| Line starting with `/` or containing image extension | `imageUrl` on the story |
| `✅` marker on an option | Sets `answer` to that option's index |
| No explicit level/tags | Defaults to `level: "easy"`, `tags: []` |
| No explicit displayMode | Defaults to `"tabs"` |

### Clarification behavior
If the skill cannot confidently determine the activity title, level, or tags from the text, it asks the user before outputting JSON.

---

## Part 2: Admin Builder "Import JSON" Tab

### Files changed
- `scripts/admin-ui.html` — add new "Import" tab
- `scripts/admin.py` — no changes needed

### Tab placement
New tab inserted **before** the existing "1. Basics" tab:

```
[ Import ] [ 1. Basics ] [ 2. Stories ] [ 3. Preview ] [ 4. Save ]
```

When the user uses the Import flow, tabs 1 and 2 are bypassed entirely.

### Tab contents
- **Textarea** — large, labeled "Paste JSON from Claude"
- **"Load & Preview" button** — validates JSON and jumps to Step 3
- **Inline error display** — shown below the button on validation failure

### Validation (client-side)
Before jumping to preview, the Import tab checks:
- Valid JSON (parseable)
- Has `_meta.title` (non-empty string)
- Has `stories` array with at least one story
- Each story has `title`, `text`, and `questions` array
- Each question has `type`, `text`, `options` (array ≥ 2), and `answer` (valid index)

If validation fails, show a specific error message inline. Do not jump to preview.

### Preview & Save flow
On success, the tab:
1. Populates the same internal state the existing Basics + Stories form would produce
2. Calls the existing `/api/preview` endpoint
3. Advances to Step 3 (Preview tab)

The existing Step 4 (Save) works without any modification.

### Key derivation
Activity key is auto-derived from `_meta.title` using the existing `titleToKey()` function already in `admin-ui.html`.

---

## What's explicitly out of scope
- Hints in questions (`Hint: ...`) — schema doesn't support them yet; add when the activity renderer is updated
- Non-reading categories (vocabulary, social, grammar) — separate effort
- Editing imported JSON before preview — user edits in Claude chat, re-pastes if needed
- Drag-and-drop or file upload — paste-only for simplicity

---

## Files touched
| File | Change |
|---|---|
| `~/.claude/plugins/anthropic-skills/skills/import-reading-activity.md` | New skill |
| `scripts/admin-ui.html` | Add Import tab + JS validation + state wiring |
| `scripts/admin.py` | No changes |
| `AGENTS.md` | Add note about `/import-reading-activity` skill to the "Creating New Reading Activities" section |
