#!/usr/bin/env node
/**
 * extract-vocab-artic.js
 *
 * Extracts vocabulary data from js/language-data.js  → data/vocabulary.json
 * Merges articulation word lists from resources/word-lists/*.json → data/articulation.json
 *
 * Run: node scripts/extract-vocab-artic.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const BASE      = path.resolve(__dirname, '..');
const DATA_DIR  = path.join(BASE, 'data');

// ─── Shared bracket-matching extractor ───────────────────────────────────────

function matchBrackets(str, start) {
  const open  = str[start];
  const close = open === '[' ? ']' : '}';
  let depth = 0, inStr = false, strCh = '', i = start;

  while (i < str.length) {
    const ch = str[i];
    if (inStr) {
      if (ch === '\\') { i += 2; continue; }
      if (ch === strCh) inStr = false;
    } else {
      if (ch === '"' || ch === "'" || ch === '`') { inStr = true; strCh = ch; }
      else if (ch === open)  { depth++; }
      else if (ch === close) { depth--; if (depth === 0) return str.slice(start, i + 1); }
    }
    i++;
  }
  return null;
}

function extractWindowVar(code, name) {
  const needle = `window.${name} = `;
  const idx    = code.indexOf(needle);
  if (idx === -1) return null;
  const start  = idx + needle.length;
  const fc     = code[start];
  if (fc !== '[' && fc !== '{') return null;
  const raw = matchBrackets(code, start);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch (_) {
    try { return (new Function('return ' + raw))(); } catch (e) { return null; }
  }
}

// ─── 1. VOCABULARY — from js/language-data.js ────────────────────────────────

function extractVocabulary() {
  console.log('\n── VOCABULARY ──────────────────────────────────────────────');

  const code = fs.readFileSync(path.join(BASE, 'js', 'language-data.js'), 'utf8');

  // ── Word definitions ──────────────────────────────────────────────────────
  const rawDefs = extractWindowVar(code, 'wordDefinitions');
  console.log(`  wordDefinitions: ${rawDefs ? rawDefs.length : 'FAILED'} items`);

  const wordDefinitions = (rawDefs || []).map((item, i) => {
    // Restructure attributes from flat (attr1/attr2) to clean array
    const attributes = [];
    for (let n = 1; n <= 3; n++) {
      if (item[`attr${n}`]) {
        attributes.push({
          value:   item[`attr${n}`],
          hint:    item[`attr${n}Hint`]    || '',
          choices: item[`attr${n}Choices`] || [],
        });
      }
    }
    return {
      id:              `word-def-${String(i + 1).padStart(3, '0')}`,
      word:            item.word,
      item:            item.item,
      imageUrl:        item.imageUrl || '',
      category:        item.category,
      categoryHint:    item.categoryHint,
      categoryChoices: item.categoryChoices || [],
      attributes,
    };
  });

  // ── Context clues ─────────────────────────────────────────────────────────
  const rawEasy = extractWindowVar(code, 'contextCluesEasy');
  const rawMed  = extractWindowVar(code, 'contextCluesMedium');
  console.log(`  contextCluesEasy:   ${rawEasy ? rawEasy.length : 'FAILED'} items`);
  console.log(`  contextCluesMedium: ${rawMed  ? rawMed.length  : 'FAILED'} items`);

  function transformClue(item, level, i) {
    // Replace <span class='target-word'>WORD</span> with {WORD} placeholder
    const cleanText = (item.text || '')
      .replace(/<span[^>]*class=['"]target-word['"][^>]*>(.*?)<\/span>/gi, '{$1}')
      .replace(/<[^>]+>/g, '');   // strip any remaining HTML tags

    // choices can be string[] or {text,isCorrect}[] — normalise to {text,isCorrect}[]
    const choices = (item.choices || []).map((c, ci) => {
      if (typeof c === 'string') return { text: c, isCorrect: ci === 0 };
      return c;
    });

    return {
      id:        `cc-${level}-${String(i + 1).padStart(3, '0')}`,
      level,
      clueType:  item.type || 'Unknown',
      word:      item.word || '',
      text:      cleanText,
      hint:      item.hint || '',
      choices,
    };
  }

  const contextClues = [
    ...(rawEasy || []).map((item, i) => transformClue(item, 'easy',   i)),
    ...(rawMed  || []).map((item, i) => transformClue(item, 'medium', i)),
  ];

  // ── Write output ──────────────────────────────────────────────────────────
  const output = {
    _meta: {
      description:       'Vocabulary content: word definitions and context clues by level',
      version:           '1.0',
      extractedAt:       new Date().toISOString(),
      futureSQLiteTable: 'vocabulary_items',
      replaces:          ['js/language-data.js (window.wordDefinitions, window.contextCluesEasy, window.contextCluesMedium)'],
    },
    wordDefinitions,
    contextClues,
  };

  const outPath = path.join(DATA_DIR, 'vocabulary.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');
  console.log(`  → Wrote ${wordDefinitions.length} definitions + ${contextClues.length} context clues to data/vocabulary.json`);
}

// ─── 2. ARTICULATION — from resources/word-lists/*.json ──────────────────────

function extractArticulation() {
  console.log('\n── ARTICULATION ────────────────────────────────────────────');

  const WORD_LISTS_DIR = path.join(BASE, 'resources', 'word-lists');

  // Map each source JSON filename to a clean soundCategory structure
  const FILE_MAP = [
    { file: 'articulation-s-blends.json',   id: 's-blends',       name: 'S-Blends',           soundType: 'blend',   targetSound: 's', groupKey: 'blends'   },
    { file: 'articulation-r-blends.json',   id: 'r-blends',       name: 'R-Blends',           soundType: 'blend',   targetSound: 'r', groupKey: 'blends'   },
    { file: 'articulation-l-blends.json',   id: 'l-blends',       name: 'L-Blends',           soundType: 'blend',   targetSound: 'l', groupKey: 'blends'   },
    { file: 'articulation-other-sounds.json',id:'other-sounds',   name: 'Other Sounds',       soundType: 'single',  targetSound: null,groupKey: 'sounds'   },
    { file: 'articulation-initial-r.json',  id: 'initial-r',      name: 'Initial R',          soundType: 'single',  targetSound: 'r', groupKey: 'positions'},
    { file: 'l-all-positions.json',         id: 'l-all-positions',name: 'L Sound – All Positions', soundType:'single', targetSound:'l', groupKey:'positions'},
    { file: 's-all-positions.json',         id: 's-all-positions',name: 'S Sound – All Positions', soundType:'single', targetSound:'s', groupKey:'positions'},
    { file: 'sh-all-positions.json',        id: 'sh-all-positions',name:'SH Sound – All Positions',soundType:'single',targetSound:'sh',groupKey:'positions'},
    { file: 'vocalic-r-word-lists.json',    id: 'vocalic-r',      name: 'Vocalic R',          soundType: 'vocalic', targetSound: 'r', groupKey: 'types'    },
    { file: 'initial-r-words.json',         id: 'initial-r-words',name: 'Initial R Words',    soundType: 'single',  targetSound: 'r', groupKey: 'words'    },
  ];

  const soundCategories = [];
  const seenIds = new Set();

  for (const entry of FILE_MAP) {
    const filePath = path.join(WORD_LISTS_DIR, entry.file);
    if (!fs.existsSync(filePath)) {
      console.log(`  ─  ${entry.file.padEnd(40)} (not found, skipping)`);
      continue;
    }

    // Skip if we'd produce a duplicate category id
    if (seenIds.has(entry.id)) {
      console.log(`  ─  ${entry.file.padEnd(40)} (duplicate of ${entry.id}, skipping)`);
      continue;
    }
    seenIds.add(entry.id);

    let raw;
    try { raw = JSON.parse(fs.readFileSync(filePath, 'utf8')); }
    catch (e) { console.log(`  ✗  ${entry.file.padEnd(40)} PARSE ERROR: ${e.message}`); continue; }

    // Build normalised groups from whatever structure the source uses
    let groups = [];
    const src = raw.blends || raw.sounds || raw.positions || raw.types || raw;

    if (typeof src === 'object' && !Array.isArray(src)) {
      // keyed object: { sp: [...], st: [...] }  or  { initial: [...], medial: [...] }
      for (const [key, words] of Object.entries(src)) {
        if (!Array.isArray(words)) continue;
        const normalWords = words.map((w, wi) => ({
          id:  `${entry.id}-${key}-${String(wi + 1).padStart(3, '0')}`,
          text: w.text || w.word || w,
          pos:  w.pos  || w.partOfSpeech || '',
        }));
        const groupObj = { words: normalWords };
        // name the group field after what it is
        if (entry.soundType === 'blend')    groupObj.blend    = key;
        else if (entry.soundType === 'vocalic') groupObj.vocalicType = key;
        else                                 groupObj.position = key;
        groups.push(groupObj);
      }
    } else if (Array.isArray(src)) {
      // flat array of words
      const normalWords = src.map((w, wi) => ({
        id:  `${entry.id}-${String(wi + 1).padStart(3, '0')}`,
        text: w.text || w.word || w,
        pos:  w.pos  || '',
      }));
      groups = [{ position: 'all', words: normalWords }];
    }

    const itemCount = groups.reduce((sum, g) => sum + g.words.length, 0);
    soundCategories.push({
      id:          entry.id,
      name:        entry.name,
      soundType:   entry.soundType,
      targetSound: entry.targetSound,
      sourceFile:  `resources/word-lists/${entry.file}`,
      groups,
    });

    console.log(`  ✓  ${entry.file.padEnd(40)} ${itemCount} words in ${groups.length} group(s)`);
  }

  // ── Write output ──────────────────────────────────────────────────────────
  const output = {
    _meta: {
      description:       'All articulation word lists consolidated from resources/word-lists/',
      version:           '1.0',
      extractedAt:       new Date().toISOString(),
      futureSQLiteTable: 'articulation_words',
      replaces:          [
        'resources/word-lists/*.json (10 files)',
        'js/word-lists.js (inline articulationWordData)',
      ],
    },
    soundCategories,
  };

  const outPath = path.join(DATA_DIR, 'articulation.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

  const totalWords = soundCategories.reduce(
    (sum, cat) => sum + cat.groups.reduce((s, g) => s + g.words.length, 0), 0
  );
  console.log(`  → Wrote ${soundCategories.length} sound categories (${totalWords} total words) to data/articulation.json`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('╔══════════════════════════════════════════════╗');
console.log('║  Vocabulary + Articulation Extraction Tool   ║');
console.log('╚══════════════════════════════════════════════╝');

extractVocabulary();
extractArticulation();

console.log('\nDone.\n');
