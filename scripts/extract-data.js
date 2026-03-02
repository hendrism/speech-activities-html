#!/usr/bin/env node
/**
 * extract-data.js
 *
 * Scans all HTML activity files, extracts inline JavaScript data arrays,
 * and consolidates them into /data/*.json files.
 *
 * Run: node scripts/extract-data.js
 * Options: node scripts/extract-data.js --dry-run  (preview without writing)
 *
 * Output files:
 *   data/social.json
 *   data/fluency.json
 *   data/grammar.json
 *   data/stories.json   (merged with existing prototype)
 *   data/vocabulary.json (merged with existing prototype)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BASE         = path.resolve(__dirname, '..');
const ACTIVITIES   = path.join(BASE, 'activities');
const DATA_DIR     = path.join(BASE, 'data');
const DRY_RUN      = process.argv.includes('--dry-run');

// ─── Utility helpers ─────────────────────────────────────────────────────────

function slugify(str) {
  return path.basename(str, '.html')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function padded(n) {
  return String(n).padStart(3, '0');
}

/**
 * Extract all <script> tag bodies that are NOT external src="..." imports.
 */
function extractInlineScripts(html) {
  const blocks = [];
  const re = /<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    blocks.push(m[1]);
  }
  return blocks.join('\n\n');
}

/**
 * Walk a bracket pair starting at `start` in `code` and return the
 * full string from `start` to the matching closing bracket.
 * Handles: [], {}, nested pairs, strings ("'`), and escape chars.
 */
function matchBrackets(code, start) {
  const open  = code[start];
  const close = open === '[' ? ']' : '}';
  let depth   = 0;
  let inStr   = false;
  let strCh   = '';
  let i       = start;

  while (i < code.length) {
    const ch = code[i];

    if (inStr) {
      if (ch === '\\') { i += 2; continue; }          // skip escaped char
      if (ch === strCh) inStr = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') {
        inStr = true; strCh = ch;
      } else if (ch === open)  { depth++; }
      else if (ch === close) {
        depth--;
        if (depth === 0) return code.slice(start, i + 1);
      }
    }
    i++;
  }
  return null; // unbalanced
}

/**
 * Find a named variable declaration in a script block and return its value,
 * evaluated as a JavaScript expression via new Function().
 *
 * Handles: const/let/var NAME = [...] or {...}
 * Returns null if not found or eval fails.
 */
function extractVar(code, varName) {
  // Match declaration: (const|let|var) NAME =
  const declRe = new RegExp(
    `(?:^|[\\n;])\\s*(?:const|let|var)\\s+${varName}\\s*=\\s*`,
    'gm'
  );
  const match = declRe.exec(code);
  if (!match) return null;

  const valueStart = match.index + match[0].length;
  const firstChar  = code[valueStart];

  if (firstChar !== '[' && firstChar !== '{') return null;

  const raw = matchBrackets(code, valueStart);
  if (!raw) return null;

  try {
    // First try fast JSON parse (works when data is already valid JSON)
    return JSON.parse(raw);
  } catch (_) {
    try {
      // Fall back to JS expression evaluation (handles unquoted keys, trailing commas, etc.)
      // eslint-disable-next-line no-new-func
      return (new Function('return ' + raw))();
    } catch (e) {
      return null; // unparseable
    }
  }
}

/**
 * Try a list of candidate variable names and return the first one found.
 * If the value is a plain object (not array), converts it to an array of
 * {key, ...value} entries so transforms can handle it uniformly.
 */
function findAnyVar(code, candidates) {
  for (const name of candidates) {
    const val = extractVar(code, name);
    if (!val) continue;

    if (Array.isArray(val) && val.length > 0) {
      return { name, value: val };
    }

    // Plain object (e.g. verbsData = { walk: {...}, play: {...} })
    if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length > 0) {
      const asArray = Object.entries(val).map(([key, entry]) =>
        typeof entry === 'object' ? { key, ...entry } : { key, value: entry }
      );
      return { name, value: asArray };
    }
  }
  return null;
}

/**
 * For activities that spread data across multiple level-named variables
 * (e.g. storiesLevel1, storiesLevel2, storiesLevel3), combine them all
 * into one array with a `level` field added.
 */
function findLeveledVars(code, baseName) {
  const combined = [];
  for (let lvl = 1; lvl <= 5; lvl++) {
    const val = extractVar(code, `${baseName}${lvl}`);
    if (!val || !Array.isArray(val) || val.length === 0) break;
    val.forEach(item => combined.push({ level: lvl, ...item }));
  }
  return combined.length > 0 ? { name: `${baseName}1…`, value: combined } : null;
}

// ─── Per-category transform functions ────────────────────────────────────────
//
// Philosophy: keep ALL original fields intact — don't drop data by remapping
// to a fixed schema. Just inject `id` and `sourceFile` as metadata.
// HTML activity files can continue using their own field names.
//
// Special case: reading stories get text[] → string normalisation so that
// both "text": "..." and "text": ["p1","p2"] work the same downstream.

function makeId(prefix, slug, i) {
  return `${prefix}-${slug}-${padded(i + 1)}`;
}

function transformSocial(items, slug) {
  return items.map((item, i) => ({
    id:         item.id || makeId('social', slug, i),
    sourceFile: `activities/social/${slug}.html`,
    ...item,
  }));
}

function transformFluency(items, slug) {
  return items.map((item, i) => ({
    id:         item.id || makeId('fluency', slug, i),
    sourceFile: `activities/fluency/${slug}.html`,
    ...item,
  }));
}

function transformGrammar(items, slug) {
  return items.map((item, i) => ({
    id:         item.id || makeId('grammar', slug, i),
    sourceFile: `activities/grammar/${slug}.html`,
    ...item,
  }));
}

/**
 * Reading: normalise story text from string|string[] → string.
 * Everything else passes through unchanged.
 */
function normaliseStoryText(item) {
  if (!item.versions) return item;
  const versions = {};
  for (const [level, ver] of Object.entries(item.versions)) {
    versions[level] = {
      ...ver,
      text: Array.isArray(ver.text) ? ver.text.join(' ') : (ver.text || ''),
    };
  }
  return { ...item, versions };
}

function transformStory(item, slug, idx) {
  const base = {
    id:         item.id || makeId('story', slug, idx),
    sourceFile: `activities/reading/${slug}.html`,
    season:     item.season || inferSeason(slug),
  };
  return normaliseStoryText({ ...base, ...item });
}

function inferSeason(slug) {
  if (/winter|snow|snowman/.test(slug))    return 'winter';
  if (/spring|flower/.test(slug))          return 'spring';
  if (/fall|autumn|thanksgiving/.test(slug)) return 'fall';
  if (/summer/.test(slug))                 return 'summer';
  return null;
}

// ─── Category configuration ───────────────────────────────────────────────────

const CATEGORIES = [
  {
    folder:     'social',
    outputFile: 'social.json',
    outputKey:  'scenarios',
    candidates: [
      'ACTIVITY_DATA', 'activityData', 'scenarios', 'items',
      'scenarioData', 'socialData', 'problems', 'questions',
      'activities', 'data',
    ],
    transform:  transformSocial,
    meta: {
      description: 'Social skills scenarios: helpful/hurtful, problem solving, conversation, perspectives',
      futureSQLiteTable: 'social_scenarios',
    },
  },
  {
    folder:     'fluency',
    outputFile: 'fluency.json',
    outputKey:  'starters',
    candidates: [
      'starters', 'STARTERS', 'topics', 'conversations',
      'questions', 'prompts', 'activities', 'activityData', 'data',
    ],
    transform:  transformFluency,
    meta: {
      description: 'Fluency conversation starters and therapy session prompts',
      futureSQLiteTable: 'fluency_starters',
    },
  },
  {
    folder:     'grammar',
    outputFile: 'grammar.json',
    outputKey:  'items',
    candidates: [
      'words', 'WORDS', 'wordData', 'items', 'sentences',
      'sentenceData', 'grammarData', 'verbsData', 'verbs',
      'stories', 'nouns', 'nounData', 'activityData', 'data',
    ],
    transform:  transformGrammar,
    meta: {
      description: 'Grammar exercises: sentence builders, plural nouns, tense, negation',
      futureSQLiteTable: 'grammar_items',
    },
  },
  {
    folder:     'reading',
    outputFile: 'stories.json',
    outputKey:  'stories',
    candidates: [
      'stories', 'STORIES', 'storyData', 'passages', 'texts',
      'readingData', 'items', 'activityData', 'data',
    ],
    leveledBase: 'storiesLevel',   // catches storiesLevel1, storiesLevel2, etc.
    // Reading files that load from JSON — skip inline extraction for these
    skipIfContains: ['stories_extracted.json', 'stories_updated.json'],
    transform: (items, slug) => items.map((item, i) => transformStory(item, slug, i)),
    meta: {
      description: 'Reading comprehension stories with literal, inferential, and prediction questions',
      futureSQLiteTable: 'stories + story_versions + questions + choices',
      note: 'stories_extracted.json is superseded by this file and should be deleted',
    },
  },
];

// ─── File processing ──────────────────────────────────────────────────────────

function processCategory(cat) {
  const folder = path.join(ACTIVITIES, cat.folder);
  const htmlFiles = fs.readdirSync(folder)
    .filter(f => f.endsWith('.html'))
    .sort();

  const allItems   = [];
  const report     = [];
  const skipped    = [];
  const failures   = [];

  for (const file of htmlFiles) {
    const slug    = slugify(file);
    const filePath = path.join(folder, file);
    const html    = fs.readFileSync(filePath, 'utf8');

    // Skip if file loads from an external JSON we already have
    if (cat.skipIfContains) {
      const shouldSkip = cat.skipIfContains.some(s => html.includes(s));
      if (shouldSkip) {
        skipped.push({ file, reason: 'loads from external JSON' });
        continue;
      }
    }

    const code = extractInlineScripts(html);

    // Try standard candidates first; fall back to leveled arrays (storiesLevel1, etc.)
    let found = findAnyVar(code, cat.candidates);
    if (!found && cat.leveledBase) {
      found = findLeveledVars(code, cat.leveledBase);
    }

    if (!found) {
      failures.push({ file, reason: 'no matching variable found' });
      continue;
    }

    const raw = Array.isArray(found.value) ? found.value : [found.value];
    const transformed = cat.transform(raw, slug);

    report.push({
      file,
      variable: found.name,
      itemCount: raw.length,
    });

    allItems.push(...transformed);
  }

  return { allItems, report, skipped, failures };
}

// ─── JSON output helpers ──────────────────────────────────────────────────────

function loadExistingOutput(outputFile) {
  const p = path.join(DATA_DIR, outputFile);
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (_) {
    return null;
  }
}

function buildOutput(cat, allItems) {
  const existing = loadExistingOutput(cat.outputFile);

  // Merge with any existing prototype content
  const existingItems = existing?.[cat.outputKey] ?? [];
  const existingIds   = new Set(existingItems.map(i => i.id));

  // Only add items whose id doesn't already exist (avoid duplicating prototype rows)
  const newItems = allItems.filter(i => !existingIds.has(i.id));
  const merged   = [...existingItems, ...newItems];

  return {
    _meta: {
      ...(existing?._meta ?? {}),
      ...cat.meta,
      version:           '1.0',
      extractedAt:       new Date().toISOString(),
      totalItems:        merged.length,
      extractedFromHTML: allItems.length,
    },
    [cat.outputKey]: merged,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   Speech Activities — Data Extraction Tool   ║');
  if (DRY_RUN) {
  console.log('║              *** DRY RUN ***                 ║');
  }
  console.log('╚══════════════════════════════════════════════╝\n');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const globalReport = [];

  for (const cat of CATEGORIES) {
    console.log(`\n── ${cat.folder.toUpperCase()} ──────────────────────────────────`);

    const { allItems, report, skipped, failures } = processCategory(cat);

    // Successes
    for (const r of report) {
      console.log(`  ✓  ${r.file.padEnd(55)} ${r.itemCount} items  (var: ${r.variable})`);
    }

    // Skipped
    for (const s of skipped) {
      console.log(`  ─  ${s.file.padEnd(55)} skipped (${s.reason})`);
    }

    // Failures
    for (const f of failures) {
      console.log(`  ✗  ${f.file.padEnd(55)} FAILED  (${f.reason})`);
    }

    const output = buildOutput(cat, allItems);
    const outPath = path.join(DATA_DIR, cat.outputFile);

    if (!DRY_RUN) {
      fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
      console.log(`\n  → Wrote ${output[cat.outputKey].length} total items to data/${cat.outputFile}`);
    } else {
      console.log(`\n  → Would write ${output[cat.outputKey].length} total items to data/${cat.outputFile}`);
    }

    globalReport.push({
      category: cat.folder,
      output:   cat.outputFile,
      extracted: allItems.length,
      skipped:  skipped.length,
      failed:   failures.length,
      failures: failures.map(f => f.file),
    });
  }

  // ─── Summary ───────────────────────────────────────────────────────────────
  console.log('\n\n╔══════════════════════════════════════════════╗');
  console.log('║                   SUMMARY                   ║');
  console.log('╚══════════════════════════════════════════════╝\n');
  console.log(`${'Category'.padEnd(12)} ${'Output File'.padEnd(22)} ${'Extracted'.padEnd(10)} ${'Skipped'.padEnd(8)} Failed`);
  console.log('─'.repeat(65));
  for (const r of globalReport) {
    console.log(
      `${r.category.padEnd(12)} ${r.output.padEnd(22)} ${String(r.extracted).padEnd(10)} ${String(r.skipped).padEnd(8)} ${r.failed}`
    );
  }

  if (globalReport.some(r => r.failed > 0)) {
    console.log('\nFailed files (no extractable data variable found):');
    for (const r of globalReport) {
      for (const f of r.failures) {
        console.log(`  [${r.category}] ${f}`);
      }
    }
    console.log('\nThese files may use a different pattern (e.g., data loaded from fetch(),');
    console.log('rendered server-side, or structured differently). Manual review needed.');
  }

  console.log('\nDone.\n');
}

main();
