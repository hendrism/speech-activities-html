export const stories = [
  {
    title: "At the Park",
    text: `Tom went to the park on Saturday morning. He brought his red ball with him. Tom played on the swings and slides. He met his friend Sam at the playground. They had fun together until lunch time. Tom went home happy.`,
    whereWhenQuestions: [
      {
        question: "Where did Tom go?",
        choices: [
          { text: "To the park" },
          { text: "To school" },
          { text: "To the store" }
        ],
        correct: 0
      },
      {
        question: "When did Tom go to the park?",
        choices: [
          { text: "Sunday morning" },
          { text: "Saturday morning" },
          { text: "Friday afternoon" }
        ],
        correct: 1
      },
      {
        question: "When did Tom go home?",
        choices: [
          { text: "At dinner time" },
          { text: "At lunch time" },
          { text: "At night" }
        ],
        correct: 1
      }
    ],
    literalInferentialQuestions: [
      {
        question: "How did Tom feel when he went home?",
        choices: [
          { text: "Happy" },
          { text: "Sad" },
          { text: "Tired" }
        ],
        correct: 0
      },
      {
        question: "What can you tell about Tom and Sam?",
        choices: [
          { text: "They don't like each other" },
          { text: "They are friends" },
          { text: "They just met" }
        ],
        correct: 1
      }
    ]
  },
  {
    title: "Baking Cookies",
    text: `Mom and Sarah decided to bake chocolate chip cookies on Sunday afternoon. They mixed flour, sugar, and eggs in a big bowl. Sarah added the chocolate chips while Mom heated the oven. They put the cookies in the oven for 12 minutes. The whole kitchen smelled wonderful. When the cookies were done, they were golden brown and delicious.`,
    whereWhenQuestions: [
      {
        question: "Where did Mom and Sarah bake cookies?",
        choices: [
          { text: "In the kitchen" },
          { text: "In the backyard" },
          { text: "At the store" }
        ],
        correct: 0
      },
      {
        question: "When did they bake cookies?",
        choices: [
          { text: "Saturday morning" },
          { text: "Sunday afternoon" },
          { text: "Friday evening" }
        ],
        correct: 1
      },
      {
        question: "How long were the cookies in the oven?",
        choices: [
          { text: "10 minutes" },
          { text: "15 minutes" },
          { text: "12 minutes" }
        ],
        correct: 2
      }
    ],
    literalInferentialQuestions: [
      {
        question: "How did the kitchen smell?",
        choices: [
          { text: "Wonderful" },
          { text: "Bad" },
          { text: "Like flowers" }
        ],
        correct: 0
      },
      {
        question: "What can you tell about the finished cookies?",
        choices: [
          { text: "They were burnt" },
          { text: "They were raw" },
          { text: "They turned out well" }
        ],
        correct: 2
      }
    ]
  },
  {
    title: "The Lost Kitten",
    text: `Emily found a small gray kitten hiding under her porch on Thursday morning. The kitten was scared and hungry. Emily gave it some milk and tuna fish. She made a soft bed for the kitten in her garage. Emily put up "Found Kitten" signs around the neighborhood. Three days later, Mrs. Johnson called. The kitten belonged to her granddaughter. Emily was sad to say goodbye, but happy the kitten was going home.`,
    whereWhenQuestions: [
      {
        question: "Where did Emily find the kitten?",
        choices: [
          { text: "Under her porch" },
          { text: "In her garage" },
          { text: "In her bedroom" }
        ],
        correct: 0
      },
      {
        question: "When did Emily find the kitten?",
        choices: [
          { text: "Wednesday evening" },
          { text: "Thursday morning" },
          { text: "Friday afternoon" }
        ],
        correct: 1
      },
      {
        question: "Where did Emily put the kitten's bed?",
        choices: [
          { text: "Under the porch" },
          { text: "In the garage" },
          { text: "In the kitchen" }
        ],
        correct: 1
      }
    ],
    literalInferentialQuestions: [
      {
        question: "How did the kitten feel at first?",
        choices: [
          { text: "Happy and playful" },
          { text: "Scared and hungry" },
          { text: "Sleepy and calm" }
        ],
        correct: 1
      },
      {
        question: "What kind of person is Emily?",
        choices: [
          { text: "Mean and selfish" },
          { text: "Kind and caring" },
          { text: "Lazy and unhelpful" }
        ],
        correct: 1
      }
    ]
  }
];

export const defaultStoryIndex = 0;
