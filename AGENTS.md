# Repository Guidelines

## Project Structure & Module Organization
Activities live in `/activities/{category}/` (articulation, fluency, grammar, reading, social, vocabulary).
`index.html` is the navigation shell — update it whenever you add or retire activities.
All content data lives in `/data/` — never inline in HTML files.
Shared CSS: `/css/styles.css`. Shared JS: `/js/data-loader.js`, `/js/utils.js`, `/js/quiz-engine.js`.
Images in `/images/<category>/`. See `/data/README.md` for the full data layer reference.

## Build, Test, and Development Commands
This project is static — no build step.
- `npx http-server` (from repo root) — serves at `http://localhost:8080/`
- `python3 -m http.server 4173` — alternative, serves at `http://localhost:4173/`
- `python3 scripts/audit_activities.py --summary` — compliance audit across all 120 activities
- `python3 scripts/audit_activities.py --category {name}` — audit one category
Always hard-refresh (`Cmd+Shift+R`) after edits since http-server caches aggressively.

## Coding Style & Naming Conventions
Four-space indentation in HTML and embedded scripts. Kebab-case filenames and class names.
Keep images optimized (≤200 KB) and reference via relative paths (`images/animals/sea_turtle.png`).

## Testing Guidelines
No automated test harness — rely on manual QA + the audit script. For each new or updated activity:
(1) Run `audit_activities.py --category {name}` and confirm COMPLIANT.
(2) Open in browser, exercise every interactive control.
(3) Check browser console for errors — zero errors is the bar.
(4) Resize to ~768px tablet width to confirm layout resilience.

## Commit & Pull Request Guidelines
Use imperative, scope-first commit summaries (`activity: add multi-level reading set`). Bundle related HTML, image, and documentation updates together so reviewers can test in one pass. Pull requests should include: a short change narrative, testing notes (“manually opened in Chrome + Safari”), any linked Session/Quick Reference updates, and screenshots or GIFs for UI changes. Keep branches rebased so index conflicts stay manageable.

## Security & Asset Handling
These activities often run offline in schools, so avoid external CDNs or fonts—embed everything locally. Never commit student data or proprietary word lists; anonymize examples before saving to `resources/`. When importing third-party art, document the license in `IMAGE_GUIDE.md` and drop assets into the correct `images/` subfolder with credit metadata inside that guide.

## Activity Creation Standard

**Always start from `/activities/_template.html`.** Copy it into the correct category folder and rename it. Never start from scratch or copy an existing activity file — existing files may be in various states of migration.

### Rules (no exceptions)

1. **No inline data** — all content goes in `/data/{category}.json`. Check `/data/README.md` for the right file and key names.
2. **No `<style>` blocks** — all styling via `/css/styles.css`. Use CSS variables from that file.
3. **Set `<body class="category-{name}">`** — this applies the correct background gradient automatically.
4. **Load data via `data-loader.js` only** — script load order before `</body>` must be:

   ```html
   <script src="../../data/{category}.js"></script>
   <script src="../../js/data-loader.js"></script>
   <script src="../../js/utils.js"></script>
   <!-- then your inline <script> activity logic -->
   ```

5. **Access data via DataLoader** — `DataLoader.get('{category}', '{key}')`, never `window.ActivityData` directly.

### Quick checklist before committing a new activity

- [ ] Copied from `_template.html`, not an existing activity
- [ ] `<body>` has `class="category-{name}"` (e.g. `category-vocabulary`)
- [ ] No `<style>` block anywhere in the file
- [ ] Data loads from `/data/{category}.js` via `DataLoader.get()`
- [ ] New content items added to the correct `/data/{category}.json`
- [ ] Page opens in browser with no console errors
- [ ] All interactive controls work
