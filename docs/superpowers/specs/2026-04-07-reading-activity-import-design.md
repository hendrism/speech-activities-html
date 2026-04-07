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

Multi-paragraph story text is joined with `\n\n` (double newline) as the paragraph separator, consistent with how existing stories are stored in `data/stories.json`.

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
- Each story has `title`, `text`, and `questions` array (`imageUrl` is optional and its absence is not an error)
- Each question has `type`, `text`, `options` (array ≥ 2), and `answer` (valid index into `options`)

Additionally, after deriving the key from `_meta.title`, validate that it matches `^[a-z0-9][a-z0-9-]*[a-z0-9]$`. If it does not (e.g. a single-character title or a title consisting entirely of punctuation), show an inline error on the Import tab asking the user to adjust the activity title in their JSON before retrying. Do not call `/api/save` with an invalid key — the server will reject it with a 400.

If validation fails, show a specific error message inline. Do not jump to preview.

### Preview & Save flow
On success, the tab:
1. Populates the same internal state the existing Basics + Stories form would produce
2. Calls the existing `/api/preview` endpoint
3. Advances to Step 3 (Preview tab)

The existing Step 4 (Save) works without any modification. After the Import tab writes the derived key into the `activity-key` field, the user can navigate to Step 4 and manually edit the key before saving — the same as the normal flow. Key collision (server 409) is already handled by the existing Step 4 error display.

### Key derivation
The activity key is derived from `_meta.title` using the same transformation logic as the existing `updateKey()` handler in `admin-ui.html` (lowercase, strip apostrophes, replace non-alphanumeric with hyphens, collapse repeated hyphens). Because `updateKey()` is a DOM event handler rather than a reusable function, the implementation must extract this logic into a standalone `titleToKey(str)` helper and call it from both the existing handler and the new Import tab. The derived key must be written into `document.getElementById('activity-key')` so that the Step 4 Save button can read it; without this, the save step will fail with "Please enter an activity key."

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
| `AGENTS.md` | In the "Creating New Reading Activities" section, add a note before the `python3 scripts/admin.py` step: "If you already have formatted activity text, run `/import-reading-activity` in Claude Code to convert it to JSON first, then use the admin builder's Import tab to load and save it." |
