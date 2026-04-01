# Repository Guidelines

## Project Structure & Module Organization
All activities live as standalone HTML files in the repo root; keep related variants grouped by descriptive filenames (e.g., `context_clues_medium.html`). `index.html` is the navigation shell—update its activity listings whenever you add or retire files. Shared media belong in `images/<category>/`, and reusable text assets stay in `resources/`. Process docs (`ACTIVITY_GUIDE.md`, `QUICK_REFERENCE.md`, etc.) sit alongside this guide—consult them before large restructures.

## Build, Test, and Development Commands
This project is static, so “build” means verifying the HTML renders. Recommended loops:
- `open index.html` (macOS) or `start index.html` (Windows) for quick spot checks.
- `python3 -m http.server 4173` (run from repo root) to serve everything and preview via `http://localhost:4173/`.
- `npx serve . --listen 4173` if you prefer a Node dev server; stop it with `Ctrl+C`.
Always refresh after editing inline CSS/JS because caching is aggressive in some browsers.

## Coding Style & Naming Conventions
Match the existing four-space indentation in HTML, CSS, and embedded scripts. Use semantic sectioning (`<section>`, `<article>`) inside new activities, keep inline CSS scoped via class selectors, and favor descriptive kebab-case class names (`.search-box`). Filenames lean toward snake_case for multiword concepts—mirror the surrounding files when adding peers. Keep images optimized (≤200 KB) and reference them via relative paths such as `images/animals/sea_turtle.png`.

## Testing Guidelines
There is no automated test harness; rely on manual QA. For each new or updated activity: (1) open it directly and via `index.html`, (2) exercise every interactive control, ensuring keyboard focus states remain visible, (3) resize the viewport to tablet width (~768px) to confirm layout resilience, and (4) proofread text. When changing shared assets, spot-check at least two unrelated activities to confirm nothing regressed.

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
