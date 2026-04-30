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
import threading
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
    tmp = DATA_DIR / "stories.tmp.js"
    tmp.write_text(js, encoding="utf-8")
    tmp.replace(DATA_DIR / "stories.js")


def load_activity_index() -> dict:
    path = DATA_DIR / "activity-index.json"
    return json.loads(path.read_text(encoding="utf-8"))


def save_activity_index(data: dict) -> None:
    tmp = DATA_DIR / "activity-index.tmp"
    tmp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    tmp.replace(DATA_DIR / "activity-index.json")


def load_vocabulary() -> dict:
    return json.loads((DATA_DIR / "vocabulary-images.json").read_text(encoding="utf-8"))


def save_vocabulary(data: dict) -> None:
    tmp = DATA_DIR / "vocabulary-images.tmp"
    tmp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    tmp.replace(DATA_DIR / "vocabulary-images.json")


def title_to_key(title: str) -> str:
    """Convert a title to a kebab-case key."""
    key = title.strip().lower()
    key = re.sub(r"['\u2019]", "", key)
    key = re.sub(r"[^a-z0-9\s-]", "", key)
    key = re.sub(r"[\s]+", "-", key)
    key = re.sub(r"-+", "-", key).strip("-")
    return key


def list_images() -> dict:
    """Return { subfolder: ["/images/subfolder/file.jpg", ...] }"""
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

        try:
            length = int(self.headers.get("Content-Length", 0))
            body   = json.loads(self.rfile.read(length) or b"{}")
            if not isinstance(body, dict):
                raise ValueError("Request body must be a JSON object")
        except (ValueError, json.JSONDecodeError) as e:
            self._error(400, f"Invalid request body: {e}")
            return

        if path == "/api/preview":
            self._handle_preview(body)
        elif path == "/api/save":
            self._handle_save(body)
        elif path == "/api/vocabulary/tags":
            self._handle_update_tags(body)
        elif path == "/api/vocabulary/tags/bulk":
            self._handle_bulk_update_tags(body)
        elif path == "/api/open-in-finder":
            self._handle_open_in_finder(body)
        else:
            self._error(404, "Not found")

    # ── API handlers ──────────────────────────────────────────────────

    def _handle_preview(self, body: dict) -> None:
        data = load_stories()
        data["_preview"] = body
        save_stories(data)
        self._json({"ok": True})

    def _handle_save(self, body: dict) -> None:
        key    = body.get("key", "").strip()
        config = body.get("config")

        if not key or not config or not isinstance(config, dict):
            self._error(400, "Missing key or config")
            return
        if not re.match(r"^[a-z0-9][a-z0-9-]*[a-z0-9]$", key):
            self._error(400, f"Invalid key format: {key!r}")
            return

        data = load_stories()
        if key in data:
            self._error(409, f"An activity with key '{key}' already exists. Please choose a different key.")
            return

        data.pop("_preview", None)
        data[key] = config
        save_stories(data)

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
        if "types" in index.get("_meta", {}):
            index["_meta"]["types"]["template-driven"] = "Shared template rendered from data config"
        save_activity_index(index)

        self._json({"ok": True, "key": key})

    def _handle_update_tags(self, body: dict) -> None:
        key = body.get("key")
        tags = body.get("tags")
        if not key or not isinstance(tags, list):
            self._error(400, "Missing key or tags")
            return
        
        data = load_vocabulary()
        if key not in data:
            # Auto-create entry for new images
            name = key.split("/")[-1].rsplit(".", 1)[0].replace("-", " ").replace("_", " ").title()
            data[key] = {"name": name, "tags": []}
        
        data[key]["tags"] = sorted(list(set(tags)))
        save_vocabulary(data)
        self._json({"ok": True, "tags": data[key]["tags"]})

    def _handle_bulk_update_tags(self, body: dict) -> None:
        keys = body.get("keys")
        tags_to_add = body.get("tags_to_add")
        if not isinstance(keys, list) or not isinstance(tags_to_add, list):
            self._error(400, "Missing keys or tags_to_add lists")
            return
            
        data = load_vocabulary()
        updated_any = False
        
        for key in keys:
            if key not in data:
                name = key.split("/")[-1].rsplit(".", 1)[0].replace("-", " ").replace("_", " ").title()
                data[key] = {"name": name, "tags": []}
            
            current_tags = set(data[key].get("tags", []))
            before_len = len(current_tags)
            for new_tag in tags_to_add:
                current_tags.add(new_tag)
            
            if len(current_tags) > before_len:
                data[key]["tags"] = sorted(list(current_tags))
                updated_any = True
                
        if updated_any:
            save_vocabulary(data)
            
        self._json({"ok": True})

    def _handle_open_in_finder(self, body: dict) -> None:
        key = body.get("key")
        if not key:
            self._error(400, "Missing key")
            return
        
        path = (IMAGES_DIR / key).resolve()
        if not path.is_relative_to(IMAGES_DIR.resolve()) or not path.exists():
            self._error(404, "File not found")
            return
            
        import subprocess
        subprocess.run(['open', '-R', str(path)])
        self._json({"ok": True})

    # ── Static file serving ───────────────────────────────────────────

    def _serve_static(self, url_path: str) -> None:
        safe = url_path.lstrip("/").replace("..", "")
        file_path = (REPO_ROOT / safe).resolve()
        if not file_path.is_relative_to(REPO_ROOT.resolve()):
            self._error(403, "Forbidden")
            return
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

    threading.Timer(0.5, lambda: webbrowser.open(f"http://localhost:{PORT}/admin")).start()

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
