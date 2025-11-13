const applePickingStory = {
  id: 'story-apple-picking-day',
  title: 'Apple Picking Day',
  summary: 'Liam and his mom visit an apple orchard on a crisp fall day and bring home apples for pie.',
  content: [
    'Liam and his mom drove to the apple orchard on a chilly Saturday morning.',
    'Rows of trees were heavy with shiny red apples, and the air smelled like cinnamon.',
    'Liam filled his basket carefully and noticed a sign that read, "**Please pick only the ripe apples at eye level.**"',
    'When they finished, the orchard owner invited them to sample warm apple cider before heading home to bake a pie.',
  ].join('\n\n'),
  lexile: 520,
  tags: ['season-fall', 'grade-2', 'goal-reading', 'theme-orchard'],
  tasks: [
    {
      id: 'retell-core',
      goal: 'retell',
      supportPath: 'text-hint-choices',
      tasks: [
        {
          id: 'retell-1',
          kind: 'retell',
          prompt: {
            type: 'text',
            value: 'Retell the beginning of the story. Where did Liam and his mom go, and why?',
          },
          response: {
            type: 'short-answer',
            correct: [
              'They went to an apple orchard to pick apples.',
              'They drove to the apple farm to pick apples.',
            ],
          },
          supports: [
            { level: 'independent' },
            {
              level: 'hint',
              hint: 'Look back at the first paragraph. What did they load in the car?',
            },
            {
              level: 'choices',
              choices: [
                { id: 'choice-a', text: 'They visited an apple orchard to pick apples.' },
                { id: 'choice-b', text: 'They went to the beach for a picnic.' },
                { id: 'choice-c', text: 'They drove to school for a meeting.' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'literal-check',
      goal: 'literal',
      supportPath: 'text-hint-choices',
      tasks: [
        {
          id: 'literal-1',
          kind: 'comprehension',
          prompt: {
            type: 'text',
            value: 'What did Liam notice on the sign in the orchard?',
          },
          response: {
            type: 'multiple-choice',
            correct: 'choice-a',
            options: [
              { id: 'choice-a', text: 'Please pick only the ripe apples at eye level.' },
              { id: 'choice-b', text: 'Do not taste the apples before you pay.' },
              { id: 'choice-c', text: 'Only adults are allowed to pick apples.' },
            ],
          },
          supports: [
            { level: 'independent' },
            {
              level: 'hint',
              hint: 'Check the sentence where Liam looked at a sign.',
            },
            {
              level: 'choices',
              choices: [
                { id: 'choice-a', text: 'Please pick only the ripe apples at eye level.' },
                { id: 'choice-b', text: 'Do not climb on the ladders.' },
                { id: 'choice-c', text: 'Please return your basket.' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'inference-check',
      goal: 'inference',
      supportPath: 'text-hint-choices',
      tasks: [
        {
          id: 'inference-1',
          kind: 'inference',
          prompt: {
            type: 'text',
            value: 'How did Liam probably feel while he was picking apples?',
          },
          response: {
            type: 'multiple-choice',
            correct: 'choice-a',
            options: [
              { id: 'choice-a', text: 'Excited and happy to be at the orchard.' },
              { id: 'choice-b', text: 'Bored and wishing he had stayed home.' },
              { id: 'choice-c', text: 'Worried about the cold weather.' },
            ],
          },
          supports: [
            { level: 'independent' },
            {
              level: 'hint',
              hint: 'What details in the story show how much he enjoyed the trip?',
            },
            {
              level: 'choices',
              choices: [
                { id: 'choice-a', text: 'Excited and happy to be at the orchard.' },
                { id: 'choice-b', text: 'Annoyed because the apples were heavy.' },
                { id: 'choice-c', text: 'Sleepy because the trip was at night.' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default applePickingStory;
