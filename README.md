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
