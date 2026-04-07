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
- All reads and writes are wrapped in `try/catch`; if localStorage is unavailable, favorites silently degrade (star toggling still works in-memory for the session, but nothing is persisted)
- Read on page load into a `Set`; written on every star toggle

### State
Add `favorites` (a `Set`) to the existing JS state block alongside `allActivities`, `currentFilter`, `searchQuery`.

### Sidebar
- Add a `⭐ Favorites` nav item **below "🌟 All Activities" and above the first category** item
- Hidden (`display: none`) when `favorites.size === 0`
- Shows count badge like other nav items
- Clicking it sets `currentFilter = 'favorites'`, updates `gridTitle` to `"Favorites"`, and rerenders the grid
- The active highlight logic already applies via `data-id` matching — add `'favorites'` as a recognized value

### Card star button
- Positioned top-right of each card, `position: absolute`
- Renders as `☆` (unfilled) by default; `★` (filled, gold) when favorited
- Visible on card hover via CSS (`.card:hover .star-btn { opacity: 1 }`)
- Always visible (opacity 1) when activity is already favorited (`.star-btn.favorited { opacity: 1 }`)
- `e.preventDefault()` on the button click stops navigation; `e.stopPropagation()` stops the event from reaching the `<a>` tag
- Clicking toggles ID in the favorites Set, persists to localStorage (with try/catch), then calls both `renderSidebar()` and updates the clicked star's visual state in place (no full grid rerender needed)

### Grid filtering
- When `currentFilter === 'favorites'`, filter `allActivities` by `favorites.has(item.id)`
- Search (`searchQuery`) is **additive**: both the favorites filter and the search term apply simultaneously (i.e., show favorites that also match the search string)
- `gridTitle` is set to `"Favorites"` when `currentFilter === 'favorites'`; the existing search override ("Search Results") still takes precedence when `searchQuery` is non-empty
- If the favorites filter is active and the last favorite is removed: set `currentFilter = 'all'`, call `renderSidebar()` (to clear the active state on the Favorites nav item and restore active state to "All Activities"), then call `renderGrid()`

### CSS additions (inline in index.html `<style>` block)
- `.star-btn` — `position: absolute; top: 12px; right: 12px;` button, no background/border, font-size ~1.2rem, opacity 0, cursor pointer, transition opacity
- `.card:hover .star-btn` — `opacity: 1`
- `.star-btn.favorited` — gold color (`#f59e0b`), `opacity: 1`

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
