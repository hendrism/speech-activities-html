# Data Layer Reference

All activity content lives here. Load it via `DataLoader` — never write inline data arrays in HTML files.

## Usage

```javascript
// In activity HTML (after loading the .js wrapper and data-loader.js):
const items = DataLoader.get('vocabulary', 'words');
const filtered = DataLoader.filter('social', 'scenarios', s => s.level === 'easy');
```

## Files

| File | Category key | Primary array key(s) | Replaces |
|------|-------------|---------------------|---------|
| `articulation.json` / `articulation.js` | `articulation` | `words`, `sentences` | `js/word-lists.js`, `resources/word-lists/*.json` |
| `fluency.json` / `fluency.js` | `fluency` | `starters` | inline data in fluency HTML files |
| `grammar.json` / `grammar.js` | `grammar` | `exercises`, `scenarios` | inline data in grammar HTML files |
| `social.json` / `social.js` | `social` | `scenarios` | inline data in social HTML files |
| `vocabulary.json` / `vocabulary.js` | `vocabulary` | `words`, `contextClues` | `js/language-data.js` |
| `stories.json` / `stories.js` | `stories` | `stories` | inline story arrays in reading HTML files |
| `vocabulary-images.json` | n/a | n/a | Used only by `activities/vocabulary/image-viewer.html` — do not change |
| `activity-index.json` | n/a | n/a | Auto-generated master catalog — do not edit manually |

## Schema

Every item in every data file has:
- `id` — unique string identifier
- `level` — `"easy"`, `"medium"`, or `"hard"` (where applicable)
- `tags` — array of strings for filtering

## Adding new content

1. Find the right file in the table above
2. Add your item(s) to the JSON array following the existing schema
3. Regenerate the `.js` wrapper — the `.js` file wraps the JSON content:
   `window.ActivityData = window.ActivityData || {}; window.ActivityData.{category} = { ... };`
4. Never add new data files without updating this README
