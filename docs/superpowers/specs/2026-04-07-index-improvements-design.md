# Index Page Improvements — Design Spec
**Date:** 2026-04-07

## Overview

Three improvements to `index.html` and `data/activity-index.json`:
1. Accurate display names for reading activities
2. Favorites (star/unstar, persistent, sidebar filter)
3. Activities open in a new tab

---

## 1. Reading Activity Name Fixes

**File:** `data/activity-index.json`

Update `title` fields for the following reading entries:

| ID | Old Title | New Title |
|---|---|---|
| `late-winter-early-spring-reading` | "Reading Comprehension Activity" | "Late Winter / Early Spring Reading" |
| `fall-reading-comprehension-infer` | "Fall Reading Stories" | "Fall Reading – Inference Focus" |
| `fall-reading-simple` | "Fall Reading Stories" | "Fall Reading – Simple Level" |
| `fall-stories-expanded-and-leveled` | "Fall Reading Stories" | "Fall Reading – Expanded & Leveled" |
| `simple-story-prompts-activity` | "Simple Story Prompts - Speech Therapy Activity" | "Simple Story Prompts" |
| `story-prompts-expanded` | "Story Prompts - Speech Therapy Activity" | "Story Prompts" |
| `hs-story-retelling` | "Story Retelling & Story Grammar Practice" | "Story Retelling & Grammar Practice" |
| `hs-story-retelling-final` | "Story Retelling & Story Grammar Practice" | "Story Retelling & Grammar Practice – Final" |

No other files change for this feature.

---

## 2. Favorites

**File:** `index.html` only. No server-side changes. No new files.

### Storage
- Key: `speechhub_favorites` in `localStorage`
- Value: JSON array of activity ID strings, e.g. `["late-winter-early-spring-reading", "fluency-winter"]`
- Read on page load; written on every star toggle

### State
Add `favorites` (a `Set`) to the existing JS state block alongside `allActivities`, `currentFilter`, `searchQuery`.

### Sidebar
- Add a `⭐ Favorites` nav item above the existing "🌟 All Activities" item
- Hidden (`display: none`) when `favorites.size === 0`
- Shows count badge like other nav items
- Clicking it sets `currentFilter = 'favorites'` and rerenders the grid

### Card star button
- Positioned top-right of each card, `position: absolute`
- Renders as `☆` (unfilled) by default; `★` (filled, gold) when favorited
- Visible on card hover via CSS (`.card:hover .star-btn { opacity: 1 }`)
- Always visible (opacity 1) when activity is already favorited
- `pointer-events` on the button stop click from propagating to the `<a>` tag (prevent navigation)
- Clicking toggles ID in the favorites Set, persists to localStorage, rerenders sidebar + star state

### Grid filtering
- When `currentFilter === 'favorites'`, filter `allActivities` by `favorites.has(item.id)`
- If favorites filter is active and all favorites are removed, auto-switch back to `'all'`

### CSS additions (inline in index.html `<style>` block)
- `.star-btn` — absolute positioned button, no background/border, cursor pointer
- `.card:hover .star-btn` — opacity 1
- `.star-btn.favorited` — gold color, opacity 1 always

---

## 3. Open in New Tab

**File:** `index.html`, `renderGrid()` function

Change the rendered anchor tag from:
```html
<a href="${item.sourceFile}" class="card">
```
to:
```html
<a href="${item.sourceFile}" class="card" target="_blank" rel="noopener noreferrer">
```

One-line change.

---

## Files Changed

| File | Change |
|---|---|
| `data/activity-index.json` | Update 8 reading activity titles |
| `index.html` | Add favorites state/logic/CSS, add `target="_blank"` to card links |

No new files. No changes to any activity HTML files, data JS/JSON files, or shared CSS.
