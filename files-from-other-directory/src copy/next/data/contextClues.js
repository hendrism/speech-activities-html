import { ActivityDomains, TaskKinds, ResponseKinds } from '../schemas/activity';
import { contextCluesPassages } from '../../data/contextCluesData';

const levelTitles = {
  level1: 'Level 1 – Starter Cases',
  level2: 'Level 2 – Detective Cases',
  level3: 'Level 3 – Expert Cases',
};

const levelSummaries = {
  level1:
    'Entry-level context clue sentences with strong supports. Ideal warm-up for independent readers building vocabulary confidence.',
  level2:
    'Intermediate stories that require combining multiple clues in the sentence to unlock higher-tier vocabulary.',
  level3:
    'Advanced passages featuring nuanced language and multi-step reasoning for seasoned context-clue detectives.',
};

const normalizeAnswer = (item) => {
  const primary = item.answer?.trim();
  const correctChoice = item.choices?.[item.correct]?.trim();
  const variants = new Set();
  if (primary) variants.add(primary);
  if (correctChoice) variants.add(correctChoice);
  return Array.from(variants);
};

const buildTask = (levelKey, item, index) => {
  const taskId = `${levelKey}-word-${index}`;
  const choices = (item.choices || []).map((choice, choiceIndex) => ({
    id: `${taskId}-choice-${choiceIndex}`,
    text: choice,
  }));

  return {
    id: taskId,
    kind: TaskKinds.VOCABULARY,
    prompt: {
      type: 'text',
      value: `What does “${item.word}” mean in the sentence: ${item.passage}`,
    },
    response: {
      type: ResponseKinds.SHORT_ANSWER,
      correct: normalizeAnswer(item),
    },
    supports: [
      {
        level: 'independent',
        strategyNotes: [
          'Read the sentence aloud and underline the words that describe or explain the mystery word.',
          'Encourage the student to swap the mystery word with their guess to see if the sentence still makes sense.',
        ],
      },
      {
        level: 'hint',
        hint: item.clue1,
      },
      {
        level: 'choices',
        hint: item.clue2,
        choices,
      },
    ],
    rubric: {
      evidence: `Student anchors the meaning of “${item.word}” in text evidence (clue words and actions).`,
    },
  };
};

const buildSequence = (levelKey, entries, levelIndex) => ({
  id: `${levelKey}-sequence`,
  title: levelTitles[levelKey] || `Level ${levelIndex + 1}`,
  tasks: entries.map((item, index) => buildTask(levelKey, item, index)),
  options: {
    recommendedOrder: levelIndex,
  },
});

const contextCluesBlueprint = {
  id: 'context-clues-detective-legacy',
  title: 'Context Clues Detective (Legacy Migration)',
  domain: ActivityDomains.LANGUAGE,
  description:
    'Use tiered supports to infer the meaning of challenging vocabulary from richly scaffolded sentences—now powered by the data-driven engine.',
  tags: ['context clues', 'vocabulary', 'legacy'],
  audience: {
    gradeBands: ['3-6'],
    modalities: ['virtual', 'in-person'],
  },
  meta: {
    icon: '🕵️‍♀️',
    estimatedTime: '20 minutes',
  },
  passages: Object.keys(contextCluesPassages).map((levelKey) => ({
    id: `${levelKey}-overview`,
    title: levelTitles[levelKey] || levelKey,
    content: levelSummaries[levelKey] || 'Context clues practice passage set.',
  })),
  sequences: Object.entries(contextCluesPassages).map(([levelKey, entries], index) =>
    buildSequence(levelKey, entries, index)
  ),
};

export default contextCluesBlueprint;
