const crispVocabularyEntry = {
  id: 'vocab-crisp',
  baseWord: 'crisp',
  partOfSpeech: 'adjective',
  definition: 'Cool, fresh, and pleasantly firm.',
  exampleSentence: 'The crisp autumn air made Liam pull his jacket tighter.',
  contrasts: {
    synonym: ['fresh', 'brisk'],
    antonym: ['muggy', 'stuffy'],
  },
  multipleMeanings: [
    {
      meaningId: 'texture',
      definition: 'Firm and easy to break or bite.',
      sentence: 'The apple slice was crisp and sweet.',
    },
    {
      meaningId: 'temperature',
      definition: 'Cool, dry, and invigorating.',
      sentence: 'We enjoyed a crisp morning walk through the park.',
    },
  ],
  categoryData: {
    category: 'weather',
    function: 'describes how something feels or tastes',
    attributes: ['cool', 'fresh', 'snappy'],
  },
  contextLinks: ['story-apple-picking-day'],
  tags: ['goal-vocabulary', 'season-fall', 'descriptor-textures'],
  tasks: [
    {
      id: 'context-clue-bundle',
      goal: 'context-clue',
      supportPath: 'text-hint-choices',
      tasks: [
        {
          id: 'context-clue-1',
          kind: 'vocabulary',
          prompt: {
            type: 'text',
            value: 'In the sentence, "The crisp autumn air made Liam pull his jacket tighter," what does crisp mean?',
          },
          response: {
            type: 'multiple-choice',
            correct: 'choice-a',
            options: [
              { id: 'choice-a', text: 'Cool and fresh' },
              { id: 'choice-b', text: 'Warm and humid' },
              { id: 'choice-c', text: 'Filled with pollen' },
            ],
          },
          supports: [
            { level: 'independent' },
            {
              level: 'hint',
              hint: 'Think about how someone would react to air that makes them pull on a jacket.',
            },
            {
              level: 'choices',
              choices: [
                { id: 'choice-a', text: 'Cool and fresh' },
                { id: 'choice-b', text: 'Hot and sticky' },
                { id: 'choice-c', text: 'Dusty and dirty' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'multiple-meaning-bundle',
      goal: 'multiple-meaning',
      supportPath: 'text-only',
      tasks: [
        {
          id: 'multiple-meaning-1',
          kind: 'vocabulary',
          prompt: {
            type: 'text',
            value: 'Write two sentences that show the different meanings of the word crisp.',
          },
          response: {
            type: 'short-answer',
            correct: [
              'The apple slice was crisp and sweet. The crisp autumn air made me shiver.',
            ],
          },
          supports: [{ level: 'independent' }],
        },
      ],
    },
    {
      id: 'describe-bundle',
      goal: 'describe-attributes',
      supportPath: 'text-only',
      tasks: [
        {
          id: 'describe-1',
          kind: 'prompt',
          prompt: {
            type: 'text',
            value: 'List two attributes that make something crisp.',
          },
          response: {
            type: 'short-answer',
            correct: ['Cool and fresh', 'Firm and crunchy'],
          },
        },
      ],
    },
  ],
};

export default crispVocabularyEntry;
