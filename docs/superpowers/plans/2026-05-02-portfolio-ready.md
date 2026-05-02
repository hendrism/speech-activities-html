# Portfolio-Ready Repo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public GitHub repo presentable for job applications — clean root, professional README, live demo via GitHub Pages.

**Architecture:** Three independent changes: (1) move dev files out of root, (2) rewrite README, (3) enable GitHub Pages. No code changes to any activity HTML, JS, or CSS.

**Tech Stack:** Git, GitHub Pages (`gh` CLI), static HTML

**Spec:** `docs/superpowers/specs/2026-05-02-portfolio-ready-design.md`

---

### Task 1: Move root-level scripts into `scripts/`

**Files:**
- Move ~25 files from `/` to `scripts/`

- [ ] **Step 1: Move all dev scripts**

```bash
cd /Users/Sean-Work/Desktop/speech-activities-html
git mv add_predictions.py scripts/
git mv add_vocab.py scripts/
git mv append_json.py scripts/
git mv check_new_images.py scripts/
git mv fix_spring.py scripts/
git mv generate_html.py scripts/
git mv generate_v2.py scripts/
git mv integrate_new_images.py scripts/
git mv migrate_images.sh scripts/
git mv migrate_winter.sh scripts/
git mv parse.py scripts/
git mv parse.js scripts/
git mv parse_questions.py scripts/
git mv parse_questions.js scripts/
git mv patch_bug_homes.py scripts/
git mv rewrite_questions.py scripts/
git mv scratch-grade3.py scripts/
git mv scratch.py scripts/
git mv scratch2.py scripts/
git mv scratch3.js scripts/
git mv simplify.js scripts/
git mv temp.js scripts/
git mv test_json.py scripts/
git mv update_spring.py scripts/
git mv update_vocab.py scripts/
```

- [ ] **Step 2: Verify root is clean**

```bash
ls *.py *.js *.sh 2>/dev/null
```
Expected: `zsh: no matches found` (nothing left)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: move dev scripts to scripts/"
```

---

### Task 2: Move internal docs and data files into `docs/dev/`

**Files:**
- Create: `docs/dev/` (implicit via git mv)
- Move: session notes, internal analysis, raw data files

- [ ] **Step 1: Create docs/dev and move internal markdown docs**

```bash
mkdir -p docs/dev
git mv SESSION_NOTES.md docs/dev/
git mv SESSION_SUMMARY.md docs/dev/
git mv REMOVE_ACTIVITIES.md docs/dev/
git mv FILE_COMPARISON.md docs/dev/
git mv reading_activities_analysis.md docs/dev/
git mv AGENTS.md docs/dev/
```

- [ ] **Step 2: Move raw data/text files**

```bash
git mv diff.txt docs/dev/
git mv earth-day-questions.csv docs/dev/
git mv questions_dump.txt docs/dev/
git mv speech_text.txt docs/dev/
git mv speech_therapy_stories_2-20.pdf docs/dev/
```

- [ ] **Step 3: Verify root markdown files**

```bash
ls *.md
```
Expected output (only these five):
```
ACTIVITY_GUIDE.md  IMAGE_GUIDE.md  QUICK_REFERENCE.md  README.md
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: move internal docs and data files to docs/dev/"
```

---

### Task 3: Rewrite README.md

**Files:**
- Modify: `README.md` (full replacement)

- [ ] **Step 1: Replace README with professional visitor-facing version**

Replace the entire contents of `README.md` with:

```markdown
# Speech Therapy Activities Hub

A browser-based library of 120 interactive speech therapy activities for use in clinical sessions. Built for Speech-Language Pathologists to run on-screen with students — no installation, no login, works offline.

**[Live Demo →](https://hendrism.github.io/speech-activities-html)**

---

## What's in it

| Category | Activities | Examples |
|---|---|---|
| Reading & Comprehension | 36 | Multi-level stories, prediction, retelling |
| Vocabulary | 28 | Definitions, context clues, analogies |
| Social Communication | 23 | Scenarios, perspective-taking, conflict resolution |
| Grammar | 15 | Sentence structure, parts of speech |
| Articulation | 10 | Sound practice, minimal pairs |
| Fluency | 8 | Gentle onset, pacing exercises |

---

## How to use

Open `index.html` in any modern browser. No server required.

For local development with proper relative paths:
```bash
npx http-server
```
Then open `http://localhost:8080`.

---

## Architecture

- **Static HTML/CSS/JS** — no build step, no dependencies, works offline
- **Data layer** — all activity content lives in `/data/*.json` files, never inline in HTML
- **Shared JS** — `/js/data-loader.js`, `quiz-engine.js`, `activity-registry.js` used across all activities
- **120 activities** in `/activities/{category}/` — all follow the same standard template

---

## Built with

Developed using AI-assisted workflows (Claude, Codex) — directing activity objectives, interaction logic, and content structure across 6 therapy domains.
```

- [ ] **Step 2: Verify the file looks right**

```bash
cat README.md
```

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: rewrite README for portfolio presentation"
```

---

### Task 4: Enable GitHub Pages and push

**Files:** No file changes — GitHub settings only

- [ ] **Step 1: Push all commits to origin**

```bash
git push origin main
```

- [ ] **Step 2: Enable GitHub Pages via gh CLI**

```bash
gh api repos/hendrism/speech-activities-html/pages \
  --method POST \
  -f source[branch]=main \
  -f source[path]=/
```

Expected: JSON response with `"html_url": "https://hendrism.github.io/speech-activities-html"`

If that fails (Pages already configured), use:
```bash
gh api repos/hendrism/speech-activities-html/pages \
  --method PUT \
  -f source[branch]=main \
  -f source[path]=/
```

- [ ] **Step 3: Verify Pages is enabled**

```bash
gh api repos/hendrism/speech-activities-html/pages --jq '.html_url'
```

Expected: `https://hendrism.github.io/speech-activities-html`

- [ ] **Step 4: Check the live URL (allow 1-2 minutes for Pages to build)**

```bash
curl -s -o /dev/null -w "%{http_code}" https://hendrism.github.io/speech-activities-html/
```

Expected: `200`

---

## Done

At completion:
- Root contains only: `README.md`, `index.html`, `ACTIVITY_GUIDE.md`, `IMAGE_GUIDE.md`, `QUICK_REFERENCE.md`, `activity-loader.html`, `image-library.html`, and project directories
- README describes the project professionally and links to the live demo
- Live demo is accessible at `https://hendrism.github.io/speech-activities-html`
