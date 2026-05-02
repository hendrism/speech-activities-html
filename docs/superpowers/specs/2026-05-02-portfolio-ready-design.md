# Portfolio-Ready Repo Design

**Date:** 2026-05-02  
**Goal:** Make the speech-activities-html GitHub repo presentable for job applications

---

## Problem

The repo is public but looks unpolished to a visitor:
- README is written for personal use ("Ask Claude for help!"), severely outdated (says 60+ activities, actually 120), wrong architecture description, last updated Oct 2025
- ~25 scratch/dev files at root level mixed in with actual project files
- Session-internal docs (`SESSION_NOTES.md`, `SESSION_SUMMARY.md`, etc.) cluttering the root
- No live demo link

## Approach

**B — Clean + professional**: Rewrite README, clean root, enable GitHub Pages.

---

## Design

### 1. README Rewrite

Replace the current README entirely. New README is written for a hiring manager or technical colleague visiting for the first time.

**Sections:**
1. Header — project name + one-sentence description
2. Live demo link — prominent, near the top (`https://hendrism.github.io/speech-activities-html`)
3. What's in it — table: 6 categories, activity counts, examples
4. How to use — open `index.html` or `npx http-server` for local dev
5. Architecture — data layer, shared JS, activity template, static/no-build
6. Built with — honest description of AI-assisted workflow (instructional design, content structure, interaction logic)

**Remove entirely:** personal-use sections ("Ask Claude!", "I want to...", session notes links, "Working with Claude" section)

---

### 2. Root Cleanup

**Move to `scripts/`** (joining existing scripts there):
- `add_predictions.py`, `add_vocab.py`, `append_json.py`, `check_new_images.py`
- `fix_spring.py`, `generate_html.py`, `generate_v2.py`, `integrate_new_images.py`
- `migrate_images.sh`, `migrate_winter.sh`
- `parse.py`, `parse.js`, `parse_questions.py`, `parse_questions.js`
- `patch_bug_homes.py`, `rewrite_questions.py`, `scratch-grade3.py`
- `scratch.py`, `scratch2.py`, `scratch3.js`, `simplify.js`, `temp.js`
- `test_json.py`, `update_spring.py`, `update_vocab.py`

**Move to `docs/dev/`** (internal working docs, not portfolio-relevant):
- `SESSION_NOTES.md`, `SESSION_SUMMARY.md`, `REMOVE_ACTIVITIES.md`
- `FILE_COMPARISON.md`, `reading_activities_analysis.md`, `AGENTS.md`
- `diff.txt`, `earth-day-questions.csv`, `questions_dump.txt`
- `speech_text.txt`, `speech_therapy_stories_2-20.pdf`

**Stay at root:**
- `README.md`, `index.html`
- `ACTIVITY_GUIDE.md`, `IMAGE_GUIDE.md`, `QUICK_REFERENCE.md`
- `activity-loader.html`, `image-library.html`

---

### 3. GitHub Pages

- Enable via `gh` CLI: branch `main`, folder `/` root
- No code changes needed — site is already static HTML with `index.html` at root
- Live URL: `https://hendrism.github.io/speech-activities-html`
- README links to live demo

---

## Out of Scope

- Changes to `index.html` or any activity HTML
- Adding screenshots to README (the live demo link is sufficient)
- Any changes to `data/`, `js/`, `css/`, or `activities/`
