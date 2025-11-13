const sInitialDeck = {
  id: 'artic-s-initial',
  sound: 's (initial position)',
  tags: ['goal-articulation', 's-sound', 'grade-2'],
  levels: [
    {
      level: 'word',
      cards: [
        { id: 's-word-1', text: 'sun', syllables: 1 },
        { id: 's-word-2', text: 'soup', syllables: 1 },
        { id: 's-word-3', text: 'sail', syllables: 1 },
      ],
    },
    {
      level: 'sentence',
      cards: [
        { id: 's-sentence-1', text: 'Sam sold sour strawberries at the stand.', syllables: 8 },
        { id: 's-sentence-2', text: 'Sasha saw the sunrise over the sea.', syllables: 9 },
      ],
    },
  ],
  carryoverPrompts: [
    'Tell a short story that uses at least three words beginning with the /s/ sound.',
    'Describe something you did this week using /s/ words.',
  ],
  tasks: [
    {
      id: 'artic-word-bundle',
      goal: 'articulation-word',
      supportPath: 'text-only',
      tasks: [
        {
          id: 'artic-word-1',
          kind: 'prompt',
          prompt: {
            type: 'text',
            value: 'Practice saying each /s/ word five times: sun, soup, sail.',
          },
          response: {
            type: 'short-answer',
            correct: ['sun, soup, sail'],
          },
        },
      ],
    },
    {
      id: 'artic-sentence-bundle',
      goal: 'articulation-sentence',
      supportPath: 'text-only',
      tasks: [
        {
          id: 'artic-sentence-1',
          kind: 'prompt',
          prompt: {
            type: 'text',
            value: 'Read the sentence aloud, keeping the /s/ sound strong: "Sam sold sour strawberries at the stand."',
          },
          response: {
            type: 'short-answer',
            correct: ['Sam sold sour strawberries at the stand.'],
          },
        },
      ],
    },
    {
      id: 'artic-conversation-bundle',
      goal: 'articulation-conversation',
      supportPath: 'text-only',
      tasks: [
        {
          id: 'artic-conversation-1',
          kind: 'prompt',
          prompt: {
            type: 'text',
            value: 'Use three /s/ words to describe your favorite season.',
          },
          response: {
            type: 'short-answer',
            correct: ['summer sun smells'],
          },
        },
      ],
    },
  ],
};

export default sInitialDeck;
