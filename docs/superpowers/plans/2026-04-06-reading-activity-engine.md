# Reading Activity Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a shared reading activity template and a local browser-based activity builder so new reading activities can be created without touching HTML or JSON files directly.

**Architecture:** A single `activities/reading/index.html` renders any reading activity from a `{ _meta, stories }` config stored in `data/stories.json` under a keyed entry. A local Python server (`scripts/admin.py`) serves a browser-based builder UI and API endpoints for saving activities and browsing images.

**Tech Stack:** Vanilla HTML/CSS/JS (no framework), Python stdlib (`http.server`, `json`, `pathlib`, `os`, `webbrowser`), existing `DataLoader` / `utils.js` / `css/styles.css`.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `activities/reading/index.html` | Shared reading template — renders any activity via `?activity=<key>` |
| Create | `scripts/admin.py` | Local Python server: static files + 3 API endpoints |
| Create | `scripts/admin-ui.html` | Builder UI — self-contained single-page form (loaded by admin.py) |
| Modify | `data/stories.json` | Add seed test activity and `_preview` cleanup logic (done by server, not manually post-Task 1) |

---

## Task 1: Add Seed Test Activity to `data/stories.json`

Add two hand-crafted activity configs so the reading template has real data to render before the admin tool exists.

**Files:**
- Modify: `data/stories.json`
- Modify: `data/stories.js` (regenerate after editing JSON)

- [ ] **Step 1: Add seed configs to `data/stories.json`**

Open `data/stories.json` and add these two top-level keys alongside the existing ones (after `_meta`, before or after the global `stories` array — order doesn't matter):

```json
"_template-test-tabs": {
  "_meta": {
    "title": "Template Test — Tabs Mode",
    "displayMode": "tabs",
    "level": "easy",
    "tags": ["test"]
  },
  "stories": [
    {
      "id": 1,
      "title": "The Red House",
      "text": "There was a little red house at the end of a winding road. A girl named Maya lived there with her cat, Pepper. Every morning, Maya fed Pepper and then walked to school.",
      "questions": [
        { "type": "open", "text": "Where did Maya live?" },
        { "type": "multiple-choice", "text": "What was the cat's name?", "options": ["Mittens", "Pepper", "Shadow", "Luna"], "answer": 1 }
      ]
    },
    {
      "id": 2,
      "title": "The Blue Sky",
      "text": "On a clear day, the sky above the town was a deep, bright blue. Clouds floated slowly past like cotton balls. People stopped on the sidewalk just to look up.",
      "questions": [
        { "type": "inference", "text": "Why do you think people stopped to look up?" },
        { "type": "open", "text": "What does the sky look like on a clear day?" }
      ]
    }
  ]
},
"_template-test-progressive": {
  "_meta": {
    "title": "Template Test — Progressive Mode",
    "displayMode": "progressive",
    "level": "medium",
    "tags": ["test"]
  },
  "stories": [
    {
      "id": 1,
      "title": "The Old Bridge",
      "text": "The bridge had stood for over a hundred years. Its wooden planks creaked under every footstep. One morning, a boy named Sam crossed it holding a basket of bread for his grandmother.",
      "questions": [
        { "type": "open", "text": "How old was the bridge?" },
        { "type": "inference", "text": "Where was Sam going?" }
      ]
    },
    {
      "id": 2,
      "title": "The Market",
      "text": "Sam's grandmother lived near the market. She sold fresh flowers every Tuesday. When Sam arrived, she hugged him tight and opened the basket with a smile.",
      "questions": [
        { "type": "multiple-choice", "text": "What did grandmother sell?", "options": ["Bread", "Vegetables", "Flowers", "Fruit"], "answer": 2 }
      ]
    }
  ]
}
```

- [ ] **Step 2: Regenerate `data/stories.js`**

Run this to rebuild the JS wrapper from the updated JSON:

```bash
python3 -c "
import json, pathlib
data = json.loads(pathlib.Path('data/stories.json').read_text())
js = 'window.ActivityData = window.ActivityData || {};\nwindow.ActivityData.stories = ' + json.dumps(data, indent=2, ensure_ascii=False) + ';\n'
pathlib.Path('data/stories.js').write_text(js)
print('Regenerated data/stories.js')
"
```

Expected output: `Regenerated data/stories.js`

- [ ] **Step 3: Verify JSON is valid**

```bash
python3 -c "import json; json.load(open('data/stories.json')); print('JSON valid')"
```

Expected: `JSON valid` — if this fails, find the syntax error in the JSON you added.

- [ ] **Step 4: Commit**

```bash
git add data/stories.json data/stories.js
git commit -m "data: add seed test activity configs for reading template development"
```

---

## Task 2: Build the Reading Template

Create `activities/reading/index.html` — a single file that renders any reading activity. Follows the same standards as all other activities (no inline styles, no inline data, correct script load order per AGENTS.md).

**Files:**
- Create: `activities/reading/index.html`

- [ ] **Step 1: Create the template file**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reading Activity — Speech Therapy</title>
    <link rel="stylesheet" href="../../css/styles.css">
</head>
<body class="category-reading">

    <div class="activity-header">
        <h1 id="activity-title">Loading…</h1>
        <p id="activity-meta"></p>
    </div>

    <div class="container">
        <div class="nav-pills" id="nav-pills"></div>

        <div class="card" id="card"></div>

        <div class="flex-between mt-4">
            <button class="btn btn-secondary" id="prev-btn" onclick="prevStory()">← Previous</button>
            <button class="btn btn-primary"   id="next-btn" onclick="nextStory()">Next →</button>
        </div>
    </div>

    <script src="../../data/stories.js"></script>
    <script src="../../js/data-loader.js"></script>
    <script src="../../js/utils.js"></script>
    <script>
        // ── Load activity config ──────────────────────────────────────
        const params      = new URLSearchParams(window.location.search);
        const activityKey = params.get('activity');
        const config      = DataLoader.get('stories', activityKey);

        // Guard: config must be an object with _meta (not an old array-based key)
        if (!config || Array.isArray(config) || !config._meta) {
            document.getElementById('card').innerHTML = `
                <div class="text-center" style="padding: var(--space-8);">
                    <p style="font-size: var(--font-size-lg); margin-bottom: var(--space-4);">
                        ⚠️ This activity key is not compatible with the reading template.
                    </p>
                    <p class="text-muted">Old activities use their own HTML files.
                        Key received: <code>${activityKey}</code></p>
                </div>`;
            document.getElementById('activity-title').textContent = 'Activity Not Found';
            document.getElementById('prev-btn').style.display = 'none';
            document.getElementById('next-btn').style.display = 'none';
            throw new Error('Reading template: invalid config for key: ' + activityKey);
        }

        const { _meta, stories } = config;

        // ── Header ────────────────────────────────────────────────────
        document.title = _meta.title + ' — Speech Therapy';
        document.getElementById('activity-title').textContent = _meta.title;
        document.getElementById('activity-meta').textContent =
            (_meta.level || '') + (_meta.tags && _meta.tags.length ? ' · ' + _meta.tags.join(', ') : '');

        // ── State ─────────────────────────────────────────────────────
        let currentIndex = 0;

        // ── Question rendering ────────────────────────────────────────
        function renderQuestion(q, qi) {
            if (q.type === 'multiple-choice') {
                const opts = q.options.map((opt, oi) => `
                    <button class="btn btn-secondary"
                        style="width:100%; text-align:left; margin-bottom:var(--space-2);"
                        onclick="checkChoice(this, ${oi}, ${q.answer}, '${qi}')">
                        ${opt}
                    </button>`).join('');
                return `
                    <div class="question" style="margin-bottom:var(--space-6);" data-qi="${qi}">
                        <p style="font-weight:600; margin-bottom:var(--space-3);">${q.text}</p>
                        <div class="mc-options">${opts}</div>
                    </div>`;
            }
            const prefix = q.type === 'inference' ? '💭 ' : '';
            return `
                <div class="question" style="margin-bottom:var(--space-6);">
                    <p style="font-weight:600;">${prefix}${q.text}</p>
                </div>`;
        }

        function checkChoice(btn, selected, correct, qi) {
            const container = document.querySelector('[data-qi="' + qi + '"] .mc-options');
            if (!container) return;
            container.querySelectorAll('button').forEach((b, i) => {
                b.disabled = true;
                if (i === correct) b.style.background = '#22c55e';
                else if (i === selected && selected !== correct) b.style.background = '#ef4444';
            });
        }

        // ── Story rendering ───────────────────────────────────────────
        function renderStory(idx) {
            const story = stories[idx];
            const imgHtml = story.imageUrl
                ? `<img src="${story.imageUrl}" alt="${story.title}"
                       style="max-width:100%; border-radius:var(--radius-md); margin-bottom:var(--space-4);">`
                : '';
            const questionsHtml = (story.questions || [])
                .map((q, qi) => renderQuestion(q, idx + '-' + qi))
                .join('');
            document.getElementById('card').innerHTML = `
                <h2 style="margin-bottom:var(--space-4);">${story.title}</h2>
                ${imgHtml}
                <p style="font-size:var(--font-size-base); line-height:1.7; margin-bottom:var(--space-6);">${story.text}</p>
                <div class="questions">${questionsHtml}</div>`;
        }

        // ── Navigation ────────────────────────────────────────────────
        function prevStory() {
            if (currentIndex > 0) { currentIndex--; renderStory(currentIndex); syncNavButtons(); }
        }

        function nextStory() {
            if (currentIndex < stories.length - 1) { currentIndex++; renderStory(currentIndex); syncNavButtons(); }
        }

        function syncNavButtons() {
            document.getElementById('prev-btn').disabled = currentIndex === 0;
            const nextBtn = document.getElementById('next-btn');
            nextBtn.disabled = currentIndex === stories.length - 1;
            nextBtn.textContent = currentIndex === stories.length - 1 ? 'Done ✓' : 'Next →';
        }

        // ── Display mode init ─────────────────────────────────────────
        const displayMode = _meta.displayMode || 'tabs';

        if (displayMode === 'single') {
            renderStory(0);
            document.getElementById('prev-btn').style.display = 'none';
            document.getElementById('next-btn').style.display = 'none';

        } else if (displayMode === 'tabs') {
            renderNavPills('nav-pills', stories, (idx) => {
                currentIndex = idx;
                renderStory(idx);
            }, { labelFn: (item, i) => item.title || ('Story ' + (i + 1)) });
            document.getElementById('prev-btn').style.display = 'none';
            document.getElementById('next-btn').style.display = 'none';
            renderStory(0);

        } else if (displayMode === 'progressive') {
            document.getElementById('nav-pills').style.display = 'none';
            renderStory(0);
            syncNavButtons();
        }
    </script>
</body>
</html>
```

- [ ] **Step 2: Serve the site and verify tabs mode**

```bash
npx http-server -p 8080 --cors
```

Open: `http://localhost:8080/activities/reading/index.html?activity=_template-test-tabs`

Verify:
- Title shows "Template Test — Tabs Mode"
- Two story tabs appear ("The Red House", "The Blue Sky")
- Clicking a tab renders that story
- Multiple choice question highlights green on correct, red on wrong
- Inference question shows 💭 prefix
- No console errors (Cmd+Shift+I → Console tab)

- [ ] **Step 3: Verify progressive mode**

Open: `http://localhost:8080/activities/reading/index.html?activity=_template-test-progressive`

Verify:
- No tabs (nav-pills hidden)
- Previous/Next buttons appear
- Previous disabled on first story, Next shows "Done ✓" on last story
- Navigation works correctly
- No console errors

- [ ] **Step 4: Verify error guard**

Open: `http://localhost:8080/activities/reading/index.html?activity=fall-reading-simple`
(This is an old array-based key that exists in stories.json)

Verify: Error message renders — "This activity key is not compatible with the reading template." Console shows the thrown error.

- [ ] **Step 5: Run audit**

```bash
python3 scripts/audit_activities.py --category reading
```

Expected: `index.html` shows COMPLIANT. (Note: the audit checks for body class, no style block, data-loader usage — all satisfied by this template.)

- [ ] **Step 6: Commit**

```bash
git add activities/reading/index.html
git commit -m "feat: add shared reading activity template with tabs/progressive/single modes"
```

---

## Task 3: Build the Admin Server (`scripts/admin.py`)

A self-contained Python HTTP server with no external dependencies. Handles static file serving (so the preview iframe works), `_preview` key cleanup on startup, and three API endpoints.

**Files:**
- Create: `scripts/admin.py`

- [ ] **Step 1: Create `scripts/admin.py`**

```python
#!/usr/bin/env python3
"""
admin.py — Local activity builder server.

Usage:
    python3 scripts/admin.py

Opens http://localhost:8090/admin in your browser.
Ctrl+C to stop.
"""

import http.server
import json
import mimetypes
import os
import pathlib
import re
import sys
import urllib.parse
import webbrowser

REPO_ROOT  = pathlib.Path(__file__).resolve().parent.parent
DATA_DIR   = REPO_ROOT / "data"
IMAGES_DIR = REPO_ROOT / "images"
ADMIN_UI   = pathlib.Path(__file__).resolve().parent / "admin-ui.html"
PORT       = 8090


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_stories() -> dict:
    return json.loads((DATA_DIR / "stories.json").read_text(encoding="utf-8"))


def save_stories(data: dict) -> None:
    tmp = DATA_DIR / "stories.tmp"
    tmp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    tmp.replace(DATA_DIR / "stories.json")
    regen_stories_js(data)


def regen_stories_js(data: dict) -> None:
    js = (
        "window.ActivityData = window.ActivityData || {};\n"
        "window.ActivityData.stories = "
        + json.dumps(data, indent=2, ensure_ascii=False)
        + ";\n"
    )
    (DATA_DIR / "stories.js").write_text(js, encoding="utf-8")


def load_activity_index() -> dict:
    path = DATA_DIR / "activity-index.json"
    return json.loads(path.read_text(encoding="utf-8"))


def save_activity_index(data: dict) -> None:
    tmp = DATA_DIR / "activity-index.tmp"
    tmp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    tmp.replace(DATA_DIR / "activity-index.json")


def title_to_key(title: str) -> str:
    """Convert a title to a kebab-case key: lowercase, spaces→hyphens, strip non-[a-z0-9-]."""
    key = title.strip().lower()
    key = re.sub(r"['\u2019]", "", key)          # strip apostrophes
    key = re.sub(r"[^a-z0-9\s-]", "", key)       # strip special chars
    key = re.sub(r"[\s]+", "-", key)              # spaces → hyphens
    key = re.sub(r"-+", "-", key).strip("-")      # collapse & trim hyphens
    return key


def list_images() -> dict:
    """Return { subfolder: ["/images/subfolder/file.jpg", ...] } for all image files."""
    result = {}
    if not IMAGES_DIR.exists():
        return result
    for subfolder in sorted(IMAGES_DIR.iterdir()):
        if not subfolder.is_dir():
            continue
        files = sorted(
            "/" + str(f.relative_to(REPO_ROOT)).replace("\\", "/")
            for f in subfolder.iterdir()
            if f.suffix.lower() in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}
        )
        if files:
            result[subfolder.name] = files
    return result


def cleanup_preview() -> None:
    """Remove the _preview key from stories.json on startup."""
    data = load_stories()
    if "_preview" in data:
        del data["_preview"]
        save_stories(data)
        print("  Cleaned up stale _preview key from stories.json")


# ---------------------------------------------------------------------------
# Request handler
# ---------------------------------------------------------------------------

class AdminHandler(http.server.BaseHTTPRequestHandler):

    def log_message(self, fmt, *args):
        # Suppress noisy request logs; print only errors
        if args and str(args[1]) not in ("200", "304"):
            super().log_message(fmt, *args)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path   = parsed.path.rstrip("/") or "/"

        if path == "/admin":
            self._serve_file(ADMIN_UI, "text/html")
        elif path == "/api/images":
            self._json(list_images())
        else:
            self._serve_static(parsed.path)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path   = parsed.path

        length = int(self.headers.get("Content-Length", 0))
        body   = json.loads(self.rfile.read(length) or b"{}")

        if path == "/api/preview":
            self._handle_preview(body)
        elif path == "/api/save":
            self._handle_save(body)
        else:
            self._error(404, "Not found")

    # ── API handlers ──────────────────────────────────────────────────

    def _handle_preview(self, body: dict) -> None:
        """Write body as _preview key to stories.json."""
        data = load_stories()
        data["_preview"] = body
        save_stories(data)
        self._json({"ok": True})

    def _handle_save(self, body: dict) -> None:
        """Save a new activity. Expects { key, config } in body."""
        key    = body.get("key", "").strip()
        config = body.get("config")

        if not key or not config:
            self._error(400, "Missing key or config")
            return
        if not re.match(r"^[a-z0-9][a-z0-9-]*[a-z0-9]$", key):
            self._error(400, f"Invalid key format: {key!r}")
            return

        data = load_stories()
        if key in data:
            self._error(409, f"An activity with key '{key}' already exists. Please choose a different key.")
            return

        # Remove _preview if present, write the new activity
        data.pop("_preview", None)
        data[key] = config
        save_stories(data)

        # Append to activity-index.json
        index = load_activity_index()
        if "activities" not in index:
            index["activities"] = []
        title = config.get("_meta", {}).get("title", key)
        new_entry = {
            "id":         key,
            "category":   "reading",
            "title":      title,
            "sourceFile": f"activities/reading/index.html?activity={key}",
            "type":       "template-driven",
        }
        index["activities"].append(new_entry)
        # Ensure template-driven is in _meta.types if that field exists
        if "types" in index.get("_meta", {}):
            index["_meta"]["types"]["template-driven"] = "Shared template rendered from data config"
        save_activity_index(index)

        self._json({"ok": True, "key": key})

    # ── Static file serving ───────────────────────────────────────────

    def _serve_static(self, url_path: str) -> None:
        # Prevent path traversal
        safe = url_path.lstrip("/").replace("..", "")
        file_path = REPO_ROOT / safe
        if file_path.is_dir():
            file_path = file_path / "index.html"
        if not file_path.exists() or not file_path.is_file():
            self._error(404, f"Not found: {url_path}")
            return
        mime = mimetypes.guess_type(str(file_path))[0] or "application/octet-stream"
        self._serve_file(file_path, mime)

    def _serve_file(self, path: pathlib.Path, mime: str) -> None:
        data = path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", mime)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _json(self, payload) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _error(self, code: int, message: str) -> None:
        body = json.dumps({"error": message}).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print(f"\nadmin.py — Reading Activity Builder")
    print(f"  Repo root: {REPO_ROOT}")
    print(f"  Cleaning up stale preview data…")
    cleanup_preview()
    print(f"  Starting server on http://localhost:{PORT}")
    print(f"  Press Ctrl+C to stop.\n")

    server = http.server.HTTPServer(("localhost", PORT), AdminHandler)

    # Open browser after a brief delay so server is ready
    import threading
    threading.Timer(0.5, lambda: webbrowser.open(f"http://localhost:{PORT}/admin")).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Smoke test the server**

```bash
python3 scripts/admin.py &
sleep 1
curl -s http://localhost:8090/api/images | python3 -m json.tool | head -20
curl -s "http://localhost:8090/activities/reading/index.html?activity=_template-test-tabs" | head -5
kill %1
```

Expected: Images endpoint returns a JSON object of subfolder→file arrays. The static file endpoint returns the HTML of the reading template.

- [ ] **Step 3: Test preview endpoint**

```bash
python3 scripts/admin.py &
sleep 1

curl -s -X POST http://localhost:8090/api/preview \
  -H "Content-Type: application/json" \
  -d '{"_meta":{"title":"Preview Test","displayMode":"single","level":"easy","tags":[]},"stories":[{"id":1,"title":"Test","text":"Hello world.","questions":[]}]}' \
| python3 -m json.tool

python3 -c "import json; d=json.load(open('data/stories.json')); print('_preview key present:', '_preview' in d)"

kill %1
```

Expected: `{"ok": true}` and `_preview key present: True`.

- [ ] **Step 4: Test cleanup on restart**

First inject a stale `_preview` key, then start the server and verify it is removed:

```bash
python3 -c "
import json, pathlib
d = json.load(open('data/stories.json'))
d['_preview'] = {'_meta': {}, 'stories': []}
pathlib.Path('data/stories.json').write_text(json.dumps(d, indent=2) + '\n')
print('Injected _preview key')
"
python3 scripts/admin.py &
sleep 1
kill %1
python3 -c "import json; d=json.load(open('data/stories.json')); print('_preview cleaned:', '_preview' not in d)"
```

Expected: `Injected _preview key` then `_preview cleaned: True`

- [ ] **Step 5: Test save endpoint**

```bash
python3 scripts/admin.py &
sleep 1

curl -s -X POST http://localhost:8090/api/save \
  -H "Content-Type: application/json" \
  -d '{
    "key": "admin-test-activity",
    "config": {
      "_meta": {"title":"Admin Test Activity","displayMode":"tabs","level":"easy","tags":["test"]},
      "stories": [{"id":1,"title":"One","text":"A test story.","questions":[{"type":"open","text":"What happened?"}]}]
    }
  }' | python3 -m json.tool

python3 -c "import json; d=json.load(open('data/stories.json')); print('saved:', 'admin-test-activity' in d)"
python3 -c "import json; d=json.load(open('data/activity-index.json')); ids=[a['id'] for a in d['activities']]; print('indexed:', 'admin-test-activity' in ids)"

kill %1
```

Expected: `{"ok": true, "key": "admin-test-activity"}`, both `saved: True` and `indexed: True`.

- [ ] **Step 6: Test key collision**

```bash
python3 scripts/admin.py &
sleep 1

curl -s -X POST http://localhost:8090/api/save \
  -H "Content-Type: application/json" \
  -d '{"key":"admin-test-activity","config":{"_meta":{},"stories":[]}}' \
| python3 -m json.tool

kill %1
```

Expected: 409 response with `"error": "An activity with key 'admin-test-activity' already exists..."`

- [ ] **Step 7: Clean up test data**

```bash
python3 -c "
import json, pathlib
data = json.loads(pathlib.Path('data/stories.json').read_text())
data.pop('admin-test-activity', None)
pathlib.Path('data/stories.json').write_text(json.dumps(data, indent=2) + '\n')
print('Cleaned test key from stories.json')
"

python3 -c "
import json, pathlib
idx = json.loads(pathlib.Path('data/activity-index.json').read_text())
idx['activities'] = [a for a in idx['activities'] if a['id'] != 'admin-test-activity']
pathlib.Path('data/activity-index.json').write_text(json.dumps(idx, indent=2) + '\n')
print('Cleaned test key from activity-index.json')
"

# Regenerate stories.js
python3 -c "
import json, pathlib
data = json.loads(pathlib.Path('data/stories.json').read_text())
js = 'window.ActivityData = window.ActivityData || {};\nwindow.ActivityData.stories = ' + json.dumps(data, indent=2, ensure_ascii=False) + ';\n'
pathlib.Path('data/stories.js').write_text(js)
print('Regenerated stories.js')
"
```

- [ ] **Step 8: Commit**

```bash
git add scripts/admin.py
git commit -m "feat: add admin.py local builder server with preview, save, and image API"
```

---

## Task 4: Build the Admin Builder UI (`scripts/admin-ui.html`)

A self-contained single-page HTML form with four steps. No framework — plain HTML/CSS/JS. Fetches images from `/api/images`, posts to `/api/preview` and `/api/save`.

**Files:**
- Create: `scripts/admin-ui.html`

- [ ] **Step 1: Create `scripts/admin-ui.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Activity Builder</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #f0f4f8; color: #1e293b; }
  .header { background: #2563eb; color: white; padding: 16px 24px; font-size: 1.25rem; font-weight: 700; }
  .step-bar { display: flex; background: #1d4ed8; padding: 0 24px; }
  .step-tab { padding: 10px 20px; color: rgba(255,255,255,0.6); cursor: default; font-size: 0.875rem; border-bottom: 3px solid transparent; }
  .step-tab.active { color: white; border-bottom-color: white; }
  .content { max-width: 860px; margin: 24px auto; padding: 0 16px; }
  .card { background: white; border-radius: 12px; padding: 28px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
  .card h2 { font-size: 1.1rem; margin-bottom: 18px; color: #1e40af; }
  label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px; color: #374151; }
  input[type=text], textarea, select {
    width: 100%; padding: 9px 12px; border: 1px solid #d1d5db; border-radius: 8px;
    font-size: 0.95rem; font-family: inherit; margin-bottom: 16px;
  }
  textarea { resize: vertical; min-height: 120px; }
  input[type=text]:focus, textarea:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }
  .radio-group { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  .radio-option { flex: 1; min-width: 120px; }
  .radio-option input { display: none; }
  .radio-option label {
    display: block; text-align: center; padding: 10px; border: 2px solid #e5e7eb;
    border-radius: 8px; cursor: pointer; font-size: 0.875rem; font-weight: 500;
    transition: all 0.15s;
  }
  .radio-option input:checked + label { border-color: #2563eb; background: #eff6ff; color: #1d4ed8; }
  .btn { padding: 10px 20px; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: opacity 0.15s; }
  .btn:hover { opacity: 0.85; }
  .btn-primary { background: #2563eb; color: white; }
  .btn-secondary { background: #e5e7eb; color: #374151; }
  .btn-danger { background: #fef2f2; color: #dc2626; border: 1px solid #fca5a5; }
  .btn-sm { padding: 6px 12px; font-size: 0.8rem; }
  .btn-green { background: #16a34a; color: white; }
  .story-block { border: 1px solid #e5e7eb; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
  .story-block .story-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .story-header h3 { font-size: 1rem; color: #374151; }
  .question-block { background: #f8fafc; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
  .question-type-toggle { display: flex; gap: 8px; margin-bottom: 10px; }
  .type-btn { padding: 5px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer; font-size: 0.8rem; }
  .type-btn.active { background: #2563eb; color: white; border-color: #2563eb; }
  .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
  .correct-selector { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
  .correct-btn { padding: 4px 10px; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer; font-size: 0.8rem; }
  .correct-btn.selected { background: #16a34a; color: white; border-color: #16a34a; }
  .image-picker-btn { padding: 8px 14px; border: 1px dashed #2563eb; background: #eff6ff; color: #1d4ed8; border-radius: 8px; cursor: pointer; font-size: 0.875rem; margin-bottom: 12px; }
  .image-preview { max-height: 120px; border-radius: 8px; margin-bottom: 12px; display: none; }
  /* Modal */
  .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; overflow-y: auto; }
  .modal-overlay.open { display: block; }
  .modal { background: white; border-radius: 12px; margin: 40px auto; max-width: 700px; padding: 24px; }
  .modal h3 { margin-bottom: 16px; }
  .folder-section h4 { font-size: 0.875rem; color: #6b7280; margin: 12px 0 8px; text-transform: uppercase; letter-spacing: 0.05em; }
  .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
  .image-thumb { aspect-ratio: 1; object-fit: cover; border-radius: 6px; cursor: pointer; border: 3px solid transparent; transition: border-color 0.15s; }
  .image-thumb:hover { border-color: #2563eb; }
  /* Preview */
  #preview-frame { width: 100%; height: 600px; border: none; border-radius: 10px; }
  .actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
  .error-msg { color: #dc2626; font-size: 0.875rem; margin-top: 8px; }
  .success-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 20px; }
  .success-box h3 { color: #16a34a; margin-bottom: 10px; }
  .success-box a { color: #1d4ed8; }
  .hidden { display: none !important; }
  .key-field { font-family: monospace; background: #f8fafc; }
</style>
</head>
<body>

<div class="header">Reading Activity Builder</div>
<div class="step-bar">
  <div class="step-tab active" id="tab-1">1. Basics</div>
  <div class="step-tab" id="tab-2">2. Stories</div>
  <div class="step-tab" id="tab-3">3. Preview</div>
  <div class="step-tab" id="tab-4">4. Save</div>
</div>

<!-- ── Step 1: Activity Basics ──────────────────────────────── -->
<div class="content" id="step-1">
  <div class="card">
    <h2>Activity Details</h2>
    <label>Title</label>
    <input type="text" id="title" placeholder="e.g. Winter Reading — Inference" oninput="updateKey()">

    <label>Level</label>
    <div class="radio-group">
      <div class="radio-option"><input type="radio" name="level" id="l-easy" value="easy" checked><label for="l-easy">Easy</label></div>
      <div class="radio-option"><input type="radio" name="level" id="l-medium" value="medium"><label for="l-medium">Medium</label></div>
      <div class="radio-option"><input type="radio" name="level" id="l-hard" value="hard"><label for="l-hard">Hard</label></div>
    </div>

    <label>Tags (comma-separated)</label>
    <input type="text" id="tags" placeholder="e.g. winter, inference, reading">

    <label>Display Mode</label>
    <div class="radio-group">
      <div class="radio-option"><input type="radio" name="mode" id="m-tabs" value="tabs" checked><label for="m-tabs">Tabs<br><small style="font-weight:400;color:#6b7280">Click between stories</small></label></div>
      <div class="radio-option"><input type="radio" name="mode" id="m-prog" value="progressive"><label for="m-prog">Progressive<br><small style="font-weight:400;color:#6b7280">One at a time</small></label></div>
      <div class="radio-option"><input type="radio" name="mode" id="m-single" value="single"><label for="m-single">Single<br><small style="font-weight:400;color:#6b7280">One story only</small></label></div>
    </div>

    <div class="actions">
      <button class="btn btn-primary" onclick="goToStep(2)">Next: Add Stories →</button>
    </div>
  </div>
</div>

<!-- ── Step 2: Stories ───────────────────────────────────────── -->
<div class="content hidden" id="step-2">
  <div id="stories-container"></div>
  <button class="btn btn-secondary" onclick="addStory()">+ Add Story</button>
  <div class="actions" style="margin-top:16px;">
    <button class="btn btn-secondary" onclick="goToStep(1)">← Back</button>
    <button class="btn btn-primary" onclick="goToPreview()">Preview →</button>
  </div>
</div>

<!-- ── Step 3: Preview ───────────────────────────────────────── -->
<div class="content hidden" id="step-3">
  <div class="card">
    <h2>Preview</h2>
    <p style="color:#6b7280; margin-bottom:16px; font-size:0.875rem;">
      This is exactly how the activity will appear. Click tabs, answer questions.
    </p>
    <iframe id="preview-frame" src="about:blank"></iframe>
  </div>
  <div class="actions">
    <button class="btn btn-secondary" onclick="goToStep(2)">← Back to Edit</button>
    <button class="btn btn-primary" onclick="goToStep(4)">Save Activity →</button>
  </div>
</div>

<!-- ── Step 4: Save ──────────────────────────────────────────── -->
<div class="content hidden" id="step-4">
  <div class="card" id="save-form">
    <h2>Save Activity</h2>
    <label>Activity Key (auto-generated from title — you can edit it)</label>
    <input type="text" id="activity-key" class="key-field" placeholder="e.g. winter-reading-inference">
    <p style="font-size:0.8rem; color:#6b7280; margin-top:-12px; margin-bottom:16px;">
      Lowercase letters, numbers, and hyphens only. Must be unique.
    </p>
    <div id="save-error" class="error-msg hidden"></div>
    <div class="actions">
      <button class="btn btn-secondary" onclick="goToStep(3)">← Back to Preview</button>
      <button class="btn btn-green" onclick="saveActivity()">Save Activity</button>
    </div>
  </div>
  <div class="success-box hidden" id="save-success">
    <h3>Activity Saved!</h3>
    <p id="success-msg"></p>
    <div class="actions" style="margin-top:16px;">
      <a id="activity-link" href="#" target="_blank" class="btn btn-primary">Open Activity</a>
      <button class="btn btn-secondary" onclick="startOver()">Create Another</button>
    </div>
  </div>
</div>

<!-- ── Image Picker Modal ────────────────────────────────────── -->
<div class="modal-overlay" id="image-modal">
  <div class="modal">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <h3>Choose an Image</h3>
      <button class="btn btn-secondary btn-sm" onclick="closeImageModal()">✕ Close</button>
    </div>
    <div id="image-browser">Loading images…</div>
  </div>
</div>

<script>
// ── State ─────────────────────────────────────────────────────────
const stories = [];   // array of { title, text, imageUrl, questions[] }
let imageCallback = null;
let allImages = null;

// ── Step navigation ───────────────────────────────────────────────
function goToStep(n) {
  [1,2,3,4].forEach(i => {
    document.getElementById('step-' + i).classList.toggle('hidden', i !== n);
    document.getElementById('tab-' + i).classList.toggle('active', i === n);
  });
}

// ── Key generation ────────────────────────────────────────────────
function updateKey() {
  const title = document.getElementById('title').value;
  let key = title.toLowerCase()
    .replace(/['\u2019]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  document.getElementById('activity-key').value = key;
}

// ── Stories editor ────────────────────────────────────────────────
function addStory() {
  const idx = stories.length;
  stories.push({ title: '', text: '', imageUrl: '', questions: [] });
  renderStoryBlock(idx);
}

function renderStoryBlock(idx) {
  const container = document.getElementById('stories-container');
  const div = document.createElement('div');
  div.className = 'story-block';
  div.id = 'story-' + idx;
  div.innerHTML = `
    <div class="story-header">
      <h3>Story ${idx + 1}</h3>
      <button class="btn btn-danger btn-sm" onclick="removeStory(${idx})">Remove</button>
    </div>
    <label>Story Title</label>
    <input type="text" id="s${idx}-title" placeholder="e.g. The Old Bridge" oninput="stories[${idx}].title=this.value">
    <label>Story Text</label>
    <textarea id="s${idx}-text" placeholder="Paste the full story here…" oninput="stories[${idx}].text=this.value"></textarea>
    <label>Image (optional)</label>
    <img id="s${idx}-img-preview" class="image-preview">
    <button class="image-picker-btn" onclick="openImageModal(${idx})">📷 Browse Images</button>
    <input type="text" id="s${idx}-imageUrl" placeholder="Or paste image path e.g. /images/fall/apple.jpg"
      oninput="stories[${idx}].imageUrl=this.value; showPreview(${idx})">
    <label>Questions</label>
    <div id="s${idx}-questions"></div>
    <button class="btn btn-secondary btn-sm" onclick="addQuestion(${idx})">+ Add Question</button>
  `;
  container.appendChild(div);
}

function removeStory(idx) {
  stories.splice(idx, 1);
  document.getElementById('stories-container').innerHTML = '';
  stories.forEach((_, i) => renderStoryBlock(i));
  // Re-sync values
  stories.forEach((s, i) => {
    document.getElementById('s'+i+'-title').value = s.title;
    document.getElementById('s'+i+'-text').value = s.text;
    document.getElementById('s'+i+'-imageUrl').value = s.imageUrl;
    showPreview(i);
    s.questions.forEach((q, qi) => renderQuestionBlock(i, qi));
  });
}

function showPreview(storyIdx) {
  const url = stories[storyIdx].imageUrl;
  const img = document.getElementById('s' + storyIdx + '-img-preview');
  if (url) { img.src = url; img.style.display = 'block'; }
  else { img.style.display = 'none'; }
}

// ── Questions editor ──────────────────────────────────────────────
function addQuestion(storyIdx) {
  const qi = stories[storyIdx].questions.length;
  stories[storyIdx].questions.push({ type: 'open', text: '', options: ['','','',''], answer: 0 });
  renderQuestionBlock(storyIdx, qi);
}

function renderQuestionBlock(si, qi) {
  const container = document.getElementById('s' + si + '-questions');
  const q = stories[si].questions[qi];
  const div = document.createElement('div');
  div.className = 'question-block';
  div.id = 'q-' + si + '-' + qi;
  div.innerHTML = buildQuestionHtml(si, qi, q.type);
  container.appendChild(div);
}

function buildQuestionHtml(si, qi, type) {
  const types = ['open','inference','multiple-choice'];
  const typeBtns = types.map(t =>
    `<button class="type-btn ${type===t?'active':''}" onclick="setQuestionType(${si},${qi},'${t}')">${t}</button>`
  ).join('');

  let extraHtml = '';
  if (type === 'multiple-choice') {
    extraHtml = `
      <div class="options-grid">
        ${[0,1,2,3].map(oi => `<input type="text" placeholder="Option ${oi+1}"
          id="q-${si}-${qi}-opt${oi}" oninput="stories[${si}].questions[${qi}].options[${oi}]=this.value">`).join('')}
      </div>
      <div style="font-size:0.8rem; font-weight:600; margin:6px 0 4px;">Correct Answer:</div>
      <div class="correct-selector">
        ${[0,1,2,3].map(oi => `<button class="correct-btn ${stories[si].questions[qi].answer===oi?'selected':''}"
          id="correct-${si}-${qi}-${oi}"
          onclick="setCorrect(${si},${qi},${oi})">${oi+1}</button>`).join('')}
      </div>`;
  }

  return `
    <div class="question-type-toggle">${typeBtns}</div>
    <input type="text" placeholder="Question text…"
      id="q-${si}-${qi}-text" oninput="stories[${si}].questions[${qi}].text=this.value">
    ${extraHtml}
    <button class="btn btn-danger btn-sm" style="margin-top:6px;" onclick="removeQuestion(${si},${qi})">Remove</button>`;
}

function setQuestionType(si, qi, type) {
  stories[si].questions[qi].type = type;
  const block = document.getElementById('q-' + si + '-' + qi);
  const oldText = document.getElementById('q-' + si + '-' + qi + '-text')?.value || '';
  block.innerHTML = buildQuestionHtml(si, qi, type);
  const textInput = document.getElementById('q-' + si + '-' + qi + '-text');
  if (textInput) { textInput.value = oldText; stories[si].questions[qi].text = oldText; }
  // Restore MC options
  if (type === 'multiple-choice') {
    stories[si].questions[qi].options.forEach((opt, oi) => {
      const el = document.getElementById(`q-${si}-${qi}-opt${oi}`);
      if (el) el.value = opt;
    });
  }
}

function setCorrect(si, qi, answer) {
  stories[si].questions[qi].answer = answer;
  [0,1,2,3].forEach(oi => {
    const btn = document.getElementById(`correct-${si}-${qi}-${oi}`);
    if (btn) btn.classList.toggle('selected', oi === answer);
  });
}

function removeQuestion(si, qi) {
  stories[si].questions.splice(qi, 1);
  const container = document.getElementById('s' + si + '-questions');
  container.innerHTML = '';
  stories[si].questions.forEach((_, newQi) => renderQuestionBlock(si, newQi));
}

// ── Image picker ──────────────────────────────────────────────────
async function openImageModal(storyIdx) {
  imageCallback = (url) => {
    stories[storyIdx].imageUrl = url;
    document.getElementById('s' + storyIdx + '-imageUrl').value = url;
    showPreview(storyIdx);
    closeImageModal();
  };
  document.getElementById('image-modal').classList.add('open');
  if (allImages) return;  // Already loaded
  const res = await fetch('/api/images');
  allImages = await res.json();
  const browser = document.getElementById('image-browser');
  browser.innerHTML = Object.entries(allImages).map(([folder, files]) => `
    <div class="folder-section">
      <h4>${folder}</h4>
      <div class="image-grid">
        ${files.map(f => `<img src="${f}" class="image-thumb" onclick="imageCallback('${f}')" title="${f}">`).join('')}
      </div>
    </div>`).join('');
}

function closeImageModal() {
  document.getElementById('image-modal').classList.remove('open');
  imageCallback = null;
}

// ── Build config from form state ──────────────────────────────────
function buildConfig() {
  const level = document.querySelector('input[name=level]:checked')?.value || 'easy';
  const mode  = document.querySelector('input[name=mode]:checked')?.value || 'tabs';
  const tags  = document.getElementById('tags').value.split(',').map(t=>t.trim()).filter(Boolean);
  const title = document.getElementById('title').value.trim();

  return {
    _meta: { title, displayMode: mode, level, tags },
    stories: stories.map((s, i) => ({
      id: i + 1,
      title: s.title || ('Story ' + (i+1)),
      text: s.text,
      ...(s.imageUrl ? { imageUrl: s.imageUrl } : {}),
      questions: s.questions.map(q => {
        const out = { type: q.type, text: q.text };
        if (q.type === 'multiple-choice') {
          out.options = q.options.filter(Boolean).length >= 2
            ? q.options.filter(Boolean)
            : q.options;
          out.answer = q.answer;
        }
        return out;
      })
    }))
  };
}

// ── Preview ───────────────────────────────────────────────────────
async function goToPreview() {
  const config = buildConfig();
  await fetch('/api/preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });
  goToStep(3);
  document.getElementById('preview-frame').src =
    'http://localhost:8090/activities/reading/index.html?activity=_preview&t=' + Date.now();
}

// ── Save ──────────────────────────────────────────────────────────
async function saveActivity() {
  const key = document.getElementById('activity-key').value.trim();
  const errEl = document.getElementById('save-error');
  errEl.classList.add('hidden');

  if (!key) { errEl.textContent = 'Please enter an activity key.'; errEl.classList.remove('hidden'); return; }
  if (!/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(key)) {
    errEl.textContent = 'Key must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.';
    errEl.classList.remove('hidden');
    return;
  }

  const config = buildConfig();
  const res  = await fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key, config })
  });
  const data = await res.json();

  if (!res.ok) {
    errEl.textContent = data.error || 'Save failed.';
    errEl.classList.remove('hidden');
    return;
  }

  const url = `http://localhost:8090/activities/reading/index.html?activity=${key}`;
  document.getElementById('success-msg').innerHTML =
    `Activity "<strong>${config._meta.title}</strong>" saved as key <code>${key}</code>.`;
  document.getElementById('activity-link').href = url;
  document.getElementById('save-form').classList.add('hidden');
  document.getElementById('save-success').classList.remove('hidden');
}

function startOver() {
  stories.length = 0;
  document.getElementById('stories-container').innerHTML = '';
  document.getElementById('title').value = '';
  document.getElementById('tags').value = '';
  document.getElementById('activity-key').value = '';
  document.getElementById('save-form').classList.remove('hidden');
  document.getElementById('save-success').classList.add('hidden');
  goToStep(1);
}

// Init: start with one story
addStory();
</script>
</body>
</html>
```

- [ ] **Step 2: Verify the builder loads**

```bash
python3 scripts/admin.py
```

Browser should open to `http://localhost:8090/admin`. Verify:
- The 4-step tab bar appears (Basics, Stories, Preview, Save)
- Step 1 form is visible with Title, Level, Tags, Display Mode fields
- "Next: Add Stories" button is present

- [ ] **Step 3: Create a test activity end-to-end**

With the server running, manually create a new activity:
1. Step 1: Title = "Spring Reading Test", Level = Easy, Tags = "spring, test", Mode = Tabs
2. Step 2: Add 2 stories with text and at least one question each
3. Step 2: Click Preview
4. Step 3: Verify stories render correctly in the iframe, questions work
5. Step 4: Key auto-generates from title. Click Save.
6. Verify success message and "Open Activity" link works.

- [ ] **Step 4: Verify the activity was registered**

```bash
python3 -c "
import json
idx = json.load(open('data/activity-index.json'))
matches = [a for a in idx['activities'] if a.get('type') == 'template-driven']
print('Template-driven activities in index:', len(matches))
for m in matches: print(' -', m['id'], ':', m['title'])
"
```

Expected: At least 1 template-driven activity listed.

- [ ] **Step 5: Verify main index page shows the new activity**

Open `http://localhost:8090/index.html`. Verify the new activity appears in the activity list.

- [ ] **Step 6: Run audit on reading category**

```bash
python3 scripts/audit_activities.py --category reading
```

Expected: `index.html` shows COMPLIANT, all existing reading files still COMPLIANT.

- [ ] **Step 7: Clean up test data if desired**

If you want to remove the "Spring Reading Test" activity created during testing:

```bash
python3 -c "
import json, pathlib, re

key = 'spring-reading-test'  # adjust if you used a different title

data = json.loads(pathlib.Path('data/stories.json').read_text())
data.pop(key, None)
pathlib.Path('data/stories.json').write_text(json.dumps(data, indent=2) + '\n')

idx = json.loads(pathlib.Path('data/activity-index.json').read_text())
idx['activities'] = [a for a in idx['activities'] if a['id'] != key]
pathlib.Path('data/activity-index.json').write_text(json.dumps(idx, indent=2) + '\n')

js = 'window.ActivityData = window.ActivityData || {};\nwindow.ActivityData.stories = ' + json.dumps(data, indent=2, ensure_ascii=False) + ';\n'
pathlib.Path('data/stories.js').write_text(js)
print('Cleaned', key)
"
```

- [ ] **Step 8: Commit**

```bash
git add scripts/admin-ui.html
git commit -m "feat: add admin builder UI — 4-step reading activity creation form"
```

---

## Task 5: Final Cleanup and Documentation

Remove seed test data, update AGENTS.md with new admin workflow.

**Files:**
- Modify: `data/stories.json` (remove `_template-test-*` keys)
- Modify: `data/stories.js` (regenerate)
- Modify: `AGENTS.md`

- [ ] **Step 1: Remove seed test data**

```bash
python3 -c "
import json, pathlib

data = json.loads(pathlib.Path('data/stories.json').read_text())
removed = [k for k in list(data.keys()) if k.startswith('_template-test')]
for k in removed:
    del data[k]
    print('Removed:', k)
pathlib.Path('data/stories.json').write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')

js = 'window.ActivityData = window.ActivityData || {};\nwindow.ActivityData.stories = ' + json.dumps(data, indent=2, ensure_ascii=False) + ';\n'
pathlib.Path('data/stories.js').write_text(js)
print('Regenerated stories.js')
"
```

- [ ] **Step 2: Add admin workflow to AGENTS.md**

In `AGENTS.md`, under the "Activity Creation Standard" section, add after the existing content:

```markdown
## Creating New Reading Activities (Admin Builder)

The recommended way to create new reading activities is the browser-based builder:

```bash
python3 scripts/admin.py
```

This opens `http://localhost:8090/admin` and walks you through:
1. Activity title, level, tags, and display mode
2. Adding stories with text, images, and questions
3. Previewing the activity before saving
4. Saving — automatically writes to `data/stories.json` and `data/activity-index.json`

New activities render via the shared template at:
`activities/reading/index.html?activity=<your-key>`

The template supports three display modes (`tabs`, `progressive`, `single`) and three question types (`open`, `inference`, `multiple-choice`).
```

- [ ] **Step 3: Final verification**

```bash
python3 -c "import json; json.load(open('data/stories.json')); print('stories.json valid')"
python3 -c "import json; json.load(open('data/activity-index.json')); print('activity-index.json valid')"
python3 scripts/audit_activities.py --summary
```

Expected: Both JSON files valid. Audit shows no regressions (same COMPLIANT count as before, `index.html` in reading is COMPLIANT).

- [ ] **Step 4: Final commit**

```bash
git add data/stories.json data/stories.js data/activity-index.json AGENTS.md
git commit -m "feat: remove seed data, document admin builder workflow in AGENTS.md"
```
