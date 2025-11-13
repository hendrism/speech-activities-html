import { ActivityDomains, TaskKinds, ResponseKinds } from '../schemas/activity';

export const sampleActivities = [
  {
    id: 'reading-alex-garden-main-idea',
    title: "Alex's Garden Project",
    domain: ActivityDomains.READING,
    description: 'Students read a grade-level passage about a science project and respond to main idea, detail, and inference prompts with adjustable support tiers.',
    tags: ['main-idea', 'details', 'inference'],
    audience: {
      gradeBands: ['3-5'],
      modalities: ['virtual', 'in-person'],
    },
    passages: [
      {
        id: 'alex-garden-passage',
        title: "Alex's Garden Project",
        content: `Alex had always been interested in growing things, but had never tried gardening before. When their science teacher assigned a project about plant growth, Alex decided this was the perfect opportunity to start a small garden in the backyard. They spent the weekend researching which vegetables would grow best in their area and what supplies they would need.

The next week, Alex convinced their parents to take them to the garden center. They carefully selected tomato plants, bean seeds, and lettuce seeds. Alex also picked out a small shovel, watering can, and some fertilizer. Back at home, they measured out a 4-foot by 6-foot plot and began preparing the soil, removing weeds and rocks.

Over the next two months, Alex watered their garden every morning before school and checked on the plants each afternoon. When the first tiny tomatoes appeared, Alex felt incredibly proud. By the end of the school term, they had grown enough vegetables to share with their family and had earned an A+ on their science project. The experience taught Alex that with planning, patience, and daily care, they could successfully grow their own food.`,
        metrics: {
          readingLevel: 'Grade 4',
          wordCount: 292,
        },
      },
    ],
    sequences: [
      {
        id: 'main-idea-sequence',
        title: 'Main Idea & Details',
        tasks: [
          {
            id: 'main-idea-q',
            kind: TaskKinds.COMPREHENSION,
            prompt: {
              type: 'text',
              value: 'What is the main idea of the passage?',
            },
            response: {
              type: ResponseKinds.SHORT_ANSWER,
              correct: 'Alex successfully completed a science project by starting and maintaining a backyard garden.',
            },
            supports: [
              {
                level: 'independent',
                strategyNotes: ['Invite the student to retell each paragraph in their own words.'],
              },
              {
                level: 'hint',
                hint: 'Focus on the overall lesson Alex learned from taking care of the plants.',
              },
              {
                level: 'choices',
                choices: [
                  { id: 'choice-a', text: 'Alex learned that careful planning and daily care helped the garden succeed.' },
                  { id: 'choice-b', text: 'Alex convinced their parents to take them to the garden center.' },
                  { id: 'choice-c', text: 'Alex enjoyed shopping for gardening tools.' },
                ],
              },
            ],
            rubric: {
              evidence: 'Student identifies the overall success of the garden project and its connection to the science assignment.',
            },
          },
          {
            id: 'detail-q',
            kind: TaskKinds.COMPREHENSION,
            prompt: {
              type: 'text',
              value: 'List two supporting details that explain how Alex cared for the garden.',
            },
            response: {
              type: ResponseKinds.SHORT_ANSWER,
              correct: [
                'Alex watered the garden every morning before school and checked the plants each afternoon.',
                'Alex removed weeds and rocks while preparing the soil.',
                'Alex researched which vegetables would grow best and gathered supplies.',
              ],
            },
            supports: [
              {
                level: 'independent',
                strategyNotes: ['Prompt the student to scan the passage for action verbs related to caring for plants.'],
              },
              {
                level: 'hint',
                hint: 'Look for sentences that describe what Alex did each day or how they prepared the garden.',
              },
              {
                level: 'choices',
                choices: [
                  { id: 'detail-a', text: 'Alex watered the garden every morning.' },
                  { id: 'detail-b', text: 'Alex bought fertilizer and gardening tools.' },
                  { id: 'detail-c', text: 'Alex watched gardening videos online.' },
                  { id: 'detail-d', text: 'Alex shared vegetables with their family.' },
                ],
              },
            ],
          },
        ],
        options: {
          recommendedOrder: 0,
        },
      },
      {
        id: 'inference-sequence',
        title: 'Inference & Vocabulary',
        tasks: [
          {
            id: 'inference-q',
            kind: TaskKinds.INFERENCE,
            prompt: {
              type: 'text',
              value: 'How did Alex likely feel when the first tomatoes appeared? Use clues from the passage.',
            },
            response: {
              type: ResponseKinds.SHORT_ANSWER,
              correct: 'Alex likely felt proud or excited because the passage says they felt incredibly proud when tomatoes appeared.',
            },
            supports: [
              {
                level: 'independent',
                strategyNotes: ['Encourage the student to quote or paraphrase the sentence that names Alex’s feelings.'],
              },
              {
                level: 'hint',
                hint: 'Find the sentence that describes Alex’s reaction to seeing the first tomatoes.',
              },
              {
                level: 'choices',
                choices: [
                  { id: 'inf-a', text: 'Proud – the passage says Alex felt incredibly proud.' },
                  { id: 'inf-b', text: 'Bored – Alex wished the project would end sooner.' },
                  { id: 'inf-c', text: 'Angry – Alex wanted a different project.' },
                ],
              },
            ],
          },
          {
            id: 'vocab-convinced',
            kind: TaskKinds.VOCABULARY,
            prompt: {
              type: 'text',
              value: "What does the word 'convinced' mean in the sentence: 'Alex convinced their parents to take them to the garden center'?",
            },
            response: {
              type: ResponseKinds.MULTIPLE_CHOICE,
              options: [
                { id: 'conv-a', text: 'persuaded or talked someone into doing something' },
                { id: 'conv-b', text: 'forced someone to do something against their will' },
                { id: 'conv-c', text: 'asked politely one time' },
              ],
              correct: 'conv-a',
            },
            supports: [
              {
                level: 'independent',
                strategyNotes: ['Ask the student to restate the sentence replacing “convinced” with a different word.'],
              },
              {
                level: 'hint',
                hint: 'Think about how Alex got their parents to agree to go to the garden center.',
              },
            ],
          },
        ],
        options: {
          recommendedOrder: 1,
        },
      },
      {
        id: 'skills-check-sequence',
        title: 'Skill Checks & Sorting',
        tasks: [
          {
            id: 'true-false-garden',
            kind: TaskKinds.COMPREHENSION,
            prompt: {
              type: 'text',
              value: 'True or False: Alex researched which vegetables would grow best before planting.',
            },
            response: {
              type: ResponseKinds.TRUE_FALSE,
              correct: 'true',
            },
            supports: [
              {
                level: 'independent',
                strategyNotes: ['Invite the student to re-read the first paragraph for planning steps.'],
              },
              {
                level: 'hint',
                hint: 'Look for sentences that describe what Alex did before buying the plants.',
              },
            ],
          },
          {
            id: 'sequence-garden-care',
            kind: TaskKinds.SEQUENCING,
            prompt: {
              type: 'text',
              value: 'Put the steps Alex followed in the order they happened.',
            },
            response: {
              type: ResponseKinds.SEQUENCE,
              options: [
                { id: 'research', text: 'Alex researched which vegetables would grow best.' },
                { id: 'shop', text: 'Alex purchased plants, seeds, and tools at the garden center.' },
                { id: 'prepare', text: 'Alex prepared the soil by removing weeds and rocks.' },
                { id: 'care', text: 'Alex watered and checked on the plants each day.' },
              ],
              correct: ['research', 'shop', 'prepare', 'care'],
            },
            supports: [
              {
                level: 'independent',
                strategyNotes: ['Encourage the student to talk through the story chronologically.'],
              },
              {
                level: 'hint',
                hint: 'Find clue words like "first", "next", and phrases that show time order.',
              },
              {
                level: 'choices',
                choices: [
                  { id: 'order-a', text: 'Research → Shop → Prepare → Care' },
                  { id: 'order-b', text: 'Care → Prepare → Shop → Research' },
                  { id: 'order-c', text: 'Shop → Care → Prepare → Research' },
                ],
              },
            ],
          },
          {
            id: 'sort-garden-tasks',
            kind: TaskKinds.SORTING,
            prompt: {
              type: 'text',
              value: 'Sort each action into the planning phase or the daily care phase.',
            },
            response: {
              type: ResponseKinds.SORT,
              categories: [
                { id: 'planning', title: 'Planning', description: 'Steps Alex took before planting.' },
                { id: 'daily-care', title: 'Daily Care', description: 'Habits Alex kept doing to help the plants grow.' },
              ],
              items: [
                { id: 'check-plants', text: 'Checking the plants each afternoon' },
                { id: 'remove-weeds', text: 'Removing weeds and rocks from the soil' },
                { id: 'research-veg', text: 'Researching which vegetables grew well locally' },
                { id: 'buy-tools', text: 'Buying a shovel, watering can, and fertilizer' },
                { id: 'water-daily', text: 'Watering the garden every morning before school' },
              ],
              correct: {
                planning: ['research-veg', 'buy-tools', 'remove-weeds'],
                'daily-care': ['check-plants', 'water-daily'],
              },
            },
            supports: [
              {
                level: 'independent',
                strategyNotes: ['Ask which actions happen one time vs. every day.'],
              },
              {
                level: 'hint',
                hint: 'Planning actions happened before the plants were in the ground.',
              },
            ],
          },
        ],
        options: {
          recommendedOrder: 2,
        },
      },
    ],
    meta: {
      icon: '🌱',
      estimatedTime: '15 minutes',
    },
  },
];

export default sampleActivities;
