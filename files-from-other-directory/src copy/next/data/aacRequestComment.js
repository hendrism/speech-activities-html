import { ActivityDomains, TaskKinds, ResponseKinds } from '../schemas/activity';

const baseStrategy = (
  location,
  focus = 'Encourage the student to think about what they need and form a complete request before offering support.'
) => [
  focus,
  `If needed, model selecting the "I need" or "Can I" starters on the AAC device for the ${location.toLowerCase()}.`,
];

const choiceSupport = (choices) => ({
  level: 'choices',
  choices,
});

const rubric = {
  evidence: 'Student produces a relevant, complete message that clearly communicates a request or comment for the situation.',
};

const scenarios = [
  {
    id: 'cafeteria-spill',
    location: 'Cafeteria',
    icon: '🍽️',
    situation: "You spilled your drink on the table, and it's starting to spread.",
    correct: ['I need help.', 'I need help', 'Please help me.', 'Can someone help me?'],
    choices: [
      { id: 'need-help', text: 'I need help.' },
      { id: 'want-pizza', text: 'I want pizza.' },
      { id: 'go-outside', text: 'Can I go outside?' },
    ],
  },
  {
    id: 'classroom-directions',
    location: 'Classroom',
    icon: '📚',
    situation: "The teacher gave directions, but you don't understand what to do next.",
    correct: ['Help me please.', 'I need help.', 'Can you help me?'],
    choices: [
      { id: 'need-help', text: 'Help me please.' },
      { id: 'want-break', text: 'I want a break.' },
      { id: 'get-water', text: 'Can I get water?' },
    ],
  },
  {
    id: 'playground-join',
    location: 'Playground',
    icon: '⛹️',
    situation: "A group of kids is playing basketball, and you'd like to join in.",
    correct: ['Can I play?', 'Can I play with you?', 'Can I play too?'],
    choices: [
      { id: 'can-play', text: 'Can I play?' },
      { id: 'want-drink', text: 'I want a drink.' },
      { id: 'go-inside', text: 'Can I go inside?' },
    ],
  },
  {
    id: 'library-book',
    location: 'Library',
    icon: '📖',
    situation: 'You find a book with pictures of animals that you really like.',
    correct: ['I want this book.', 'Can I have this book?', 'I want the animal book.'],
    choices: [
      { id: 'want-book', text: 'I want this book.' },
      { id: 'go-now', text: 'Can I go now?' },
      { id: 'need-bathroom', text: 'I need the bathroom.' },
    ],
  },
  {
    id: 'hallway-friend',
    location: 'Hallway',
    icon: '🚶',
    situation: 'You see your friend walking toward you between classes.',
    correct: ['Can we talk?', 'Can we talk for a minute?', 'Can we talk for a second?'],
    choices: [
      { id: 'talk', text: 'Can we talk?' },
      { id: 'want-go', text: 'I want to go.' },
      { id: 'need-help', text: 'Can I get help?' },
    ],
  },
  {
    id: 'art-class-supplies',
    location: 'Art Class',
    icon: '🎨',
    situation: 'You need more glue to finish your project.',
    correct: ['I need glue.', 'Can I have glue?', 'I need more glue.'],
    choices: [
      { id: 'need-glue', text: 'I need glue.' },
      { id: 'leave', text: 'Can I leave?' },
      { id: 'want-water', text: 'I want water.' },
    ],
  },
  {
    id: 'morning-meeting-share',
    location: 'Morning Meeting',
    icon: '☀️',
    situation: 'The teacher asks everyone how they feel today.',
    correct: ['I want to share.', 'I want to share how I feel.', "I'd like to share."],
    choices: [
      { id: 'want-share', text: 'I want to share.' },
      { id: 'get-water', text: 'Can I get water?' },
      { id: 'need-go', text: 'I need to go.' },
    ],
  },
  {
    id: 'gym-ball',
    location: 'Gym',
    icon: '🏃',
    situation: "The ball rolls far away, and you can't reach it.",
    correct: ['Can you help?', 'Can you help me?', 'Please help me get the ball.'],
    choices: [
      { id: 'need-help', text: 'Can you help?' },
      { id: 'want-sit', text: 'I want to sit.' },
      { id: 'can-go', text: 'Can I go?' },
    ],
  },
  {
    id: 'cafeteria-utensils',
    location: 'Cafeteria',
    icon: '🍽️',
    situation: "You got your lunch tray, but you don't have a fork or spoon.",
    correct: ['I need a fork.', 'Can I have a fork?', 'I need a spoon.'],
    choices: [
      { id: 'need-fork', text: 'I need a fork.' },
      { id: 'want-dessert', text: 'I want dessert.' },
      { id: 'sit-down', text: 'Can I sit down?' },
    ],
  },
  {
    id: 'computer-lab',
    location: 'Computer Lab',
    icon: '💻',
    situation: "Your computer screen froze and won't work.",
    correct: ['I need help.', 'My computer is frozen.', 'Can you fix this?'],
    choices: [
      { id: 'need-help', text: 'I need help.' },
      { id: 'use-that', text: 'Can I use that one?' },
      { id: 'want-play', text: 'I want to play.' },
    ],
  },
  {
    id: 'assembly-talk',
    location: 'Assembly',
    icon: '🎭',
    situation: 'A funny video plays, and everyone starts laughing.',
    correct: ['Can I talk?', 'Can I talk to you?', 'Can I say something?'],
    choices: [
      { id: 'talk', text: 'Can I talk?' },
      { id: 'can-go', text: 'Can I go?' },
      { id: 'need-water', text: 'I need water.' },
    ],
  },
  {
    id: 'science-question',
    location: 'Science Class',
    icon: '🔬',
    situation: "You have a question about the experiment but don't know how to start.",
    correct: ['I have a question.', 'Can I ask a question?', 'I need help with this.'],
    choices: [
      { id: 'have-question', text: 'I have a question.' },
      { id: 'need-supplies', text: 'Can I get supplies?' },
      { id: 'want-stop', text: 'I want to stop.' },
    ],
  },
  {
    id: 'dismissal-bus',
    location: 'Dismissal',
    icon: '🚌',
    situation: "You're waiting for your bus, and it hasn't arrived yet.",
    correct: ['Can I wait inside?', 'Can I wait inside please?', 'Can I go inside to wait?'],
    choices: [
      { id: 'wait-inside', text: 'Can I wait inside?' },
      { id: 'go-home', text: 'I want to go home.' },
      { id: 'call-someone', text: 'Can I call someone?' },
    ],
  },
  {
    id: 'music-class-drum',
    location: 'Music Class',
    icon: '🎵',
    situation: 'The teacher is passing out instruments, and you want a drum.',
    correct: ['I want the drum.', 'Can I have the drum?', 'Can I play the drum?'],
    choices: [
      { id: 'want-drum', text: 'I want the drum.' },
      { id: 'can-go', text: 'Can I go?' },
      { id: 'need-help', text: 'I need help.' },
    ],
  },
  {
    id: 'field-trip-zoo',
    location: 'Field Trip',
    icon: '🦁',
    situation: 'You are at the zoo, and you see an animal you really like.',
    correct: ['Can I look closer?', 'Can I see it up close?', 'I want to look closer.'],
    choices: [
      { id: 'look-closer', text: 'Can I look closer?' },
      { id: 'buy-something', text: 'I want to buy something.' },
      { id: 'go-back', text: 'Can I go back?' },
    ],
  },
];

const scenarioTasks = scenarios.map((scenario, index) => ({
  id: `aac-${scenario.id}`,
  kind: TaskKinds.PROMPT,
  prompt: {
    type: 'text',
    value: `${scenario.icon} ${scenario.location}: ${scenario.situation}`,
  },
  response: {
    type: ResponseKinds.SHORT_ANSWER,
    correct: scenario.correct,
  },
  supports: [
    {
      level: 'independent',
      strategyNotes: baseStrategy(
        scenario.location,
        'Have the student describe what they need or want in one clear, complete sentence.'
      ),
    },
    choiceSupport(scenario.choices),
  ],
  rubric,
  options: {
    recommendedOrder: index,
  },
}));

const aacRequestCommentActivity = {
  id: 'aac-request-comment',
  title: 'AAC Request & Comment Practice',
  domain: ActivityDomains.AAC,
  description: 'Practice building complete requests and comments for everyday school situations with scaffolded AAC supports.',
  tags: ['aac', 'requests', 'comments', 'social-language'],
  audience: {
    gradeBands: ['K-5'],
    modalities: ['in-person', 'aac-device'],
  },
  passages: [
    {
      id: 'aac-request-comment-routine',
      title: 'School Day Scenario Prompts',
      content:
        'Use the AAC device or speech output to respond to real classroom and campus situations. Start independently, then provide choices if the student needs support.',
    },
  ],
  sequences: [
    {
      id: 'aac-request-comment-scenarios',
      title: 'Everyday Requests & Comments',
      tasks: scenarioTasks,
    },
  ],
  meta: {
    icon: '💬',
    estimatedTime: '15 minutes',
  },
};

export default aacRequestCommentActivity;
