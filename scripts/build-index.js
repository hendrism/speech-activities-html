#!/usr/bin/env node
/**
 * build-index.js
 *
 * Generates data/activity-index.json cataloguing every HTML activity file
 * with its category and type classification:
 *
 *   content-driven  — data was successfully extracted to a /data/*.json file
 *   json-loader     — activity loads from an external JSON (stories*.json)
 *   tool            — interactive engine; user generates the content at runtime
 *
 * Run: node scripts/build-index.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const DATA = path.join(BASE, 'data');

// ── Build set of source files that were successfully extracted ────────────────
const extractedFiles = new Set();

const DATA_KEYS = {
  'social.json':  'scenarios',
  'fluency.json': 'starters',
  'grammar.json': 'items',
  'stories.json': 'stories',
};

for (const [file, key] of Object.entries(DATA_KEYS)) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) continue;
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  (d[key] || []).forEach(item => {
    if (item.sourceFile) extractedFiles.add(item.sourceFile);
  });
}

// ── Walk activity folders ─────────────────────────────────────────────────────
const CATEGORIES = ['social', 'fluency', 'grammar', 'reading', 'vocabulary', 'articulation'];

const activities = [];

for (const cat of CATEGORIES) {
  const dir = path.join(BASE, 'activities', cat);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'))
    .sort();

  for (const file of files) {
    const relPath = `activities/${cat}/${file}`;
    const html    = fs.readFileSync(path.join(dir, file), 'utf8');

    // Classify type
    let type = 'tool';
    if (extractedFiles.has(relPath)) {
      type = 'content-driven';
    } else if (
      html.includes('stories_extracted.json') ||
      html.includes('stories_updated.json')
    ) {
      type = 'json-loader';
    }

    // Best-effort title extraction
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const h1Match    = html.match(/<h1[^>]*>([^<]*)<\/h1>/i);
    const title = (
      (titleMatch && titleMatch[1]) ||
      (h1Match    && h1Match[1])    ||
      file.replace('.html', '').replace(/-/g, ' ')
    ).trim();

    activities.push({
      id:         file.replace('.html', ''),
      category:   cat,
      title,
      sourceFile: relPath,
      type,
    });
  }
}

// ── Write output ──────────────────────────────────────────────────────────────
const output = {
  _meta: {
    description:  'Index of all HTML activity files with type classification',
    generatedAt:  new Date().toISOString(),
    types: {
      'content-driven': 'Data was extracted to /data/*.json — single source of truth',
      'json-loader':    'Activity loads from an external JSON file at runtime',
      'tool':           'Interactive engine — user generates content at runtime, nothing to extract',
    },
  },
  activities,
};

fs.writeFileSync(path.join(DATA, 'activity-index.json'), JSON.stringify(output, null, 2));

// ── Print summary ─────────────────────────────────────────────────────────────
const byType = {};
for (const a of activities) {
  byType[a.type] = (byType[a.type] || 0) + 1;
}

console.log(`\nActivity index written → data/activity-index.json`);
console.log(`Total: ${activities.length} activities\n`);
console.log('By type:');
for (const [type, count] of Object.entries(byType)) {
  console.log(`  ${type.padEnd(16)} ${count}`);
}

console.log('\nTool/engine files (nothing to extract — for future planning):');
const toolsByCat = {};
for (const a of activities.filter(a => a.type === 'tool')) {
  if (!toolsByCat[a.category]) toolsByCat[a.category] = [];
  toolsByCat[a.category].push(a.id);
}
for (const [cat, ids] of Object.entries(toolsByCat)) {
  console.log(`\n  [${cat}]`);
  ids.forEach(id => console.log(`    ${id}`));
}
