const regularPastTensePattern = {
  id: 'grammar-regular-past-tense',
  title: 'Regular Past Tense Verbs',
  description: 'Add -ed to regular verbs to describe actions that already happened.',
  patternType: 'verb-tense',
  examples: [
    { base: 'walk', target: 'walked', sentence: 'We walked through the orchard.' },
    { base: 'pick', target: 'picked', sentence: 'Liam picked three apples.' },
    { base: 'visit', target: 'visited', sentence: 'They visited Grandma yesterday.' },
  ],
  transformations: [
    { from: 'play', to: 'played', rule: 'Add -ed to verbs ending in a vowel + y.' },
    { from: 'bake', to: 'baked', rule: 'Drop the silent e before adding -ed.' },
  ],
  tags: ['goal-grammar', 'verb-tense', 'grade-2'],
  tasks: [
    {
      id: 'verb-tense-conversion',
      goal: 'verb-tense',
      supportPath: 'text-hint-choices',
      tasks: [
        {
          id: 'verb-tense-1',
          kind: 'prompt',
          prompt: {
            type: 'text',
            value: 'Change the verb to the past tense: "They **jump** over the puddle."',
          },
          response: {
            type: 'short-answer',
            correct: ['jumped'],
          },
          supports: [
            { level: 'independent' },
            {
              level: 'hint',
              hint: 'Add -ed to verbs that already end with a consonant like jump.',
            },
            {
              level: 'choices',
              choices: [
                { id: 'choice-a', text: 'jumped' },
                { id: 'choice-b', text: 'jumping' },
                { id: 'choice-c', text: 'jumps' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'verb-tense-sentence',
      goal: 'verb-tense',
      supportPath: 'text-only',
      tasks: [
        {
          id: 'verb-tense-2',
          kind: 'prompt',
          prompt: {
            type: 'text',
            value: 'Write a sentence about the orchard using the past tense verb "baked."',
          },
          response: {
            type: 'short-answer',
            correct: ['We baked a warm apple pie after the trip.'],
          },
        },
      ],
    },
  ],
};

export default regularPastTensePattern;
