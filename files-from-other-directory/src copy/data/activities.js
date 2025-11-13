export const activityCategories = [
  {
    id: 'reading',
    name: 'Reading Comprehension',
    icon: '📚',
    color: '#8b5cf6'
  },
  {
    id: 'language',
    name: 'Language Skills',
    icon: '🗣️',
    color: '#10b981'
  },
  {
    id: 'words',
    name: 'Word Activities',
    icon: '🔤',
    color: '#f59e0b'
  },
  {
    id: 'grammar',
    name: 'Grammar & Tenses',
    icon: '📝',
    color: '#ef4444'
  },
  {
    id: 'articulation',
    name: 'Articulation Practice',
    icon: '🗣️',
    color: '#ec4899'
  },
  {
    id: 'worksheets',
    name: 'Worksheets & Graphic Organizers',
    icon: '📋',
    color: '#06b6d4'
  }
];

export const activities = [
  {
    id: 'reading-stories',
    title: 'Reading Stories',
    description: 'Where/when questions and reading comprehension with visual icons',
    category: 'reading',
    icon: '📖',
    difficulty: 'Beginner',
    path: '/activities/reading-stories',
    features: ['Icon Support', 'Progress Tracking', 'Multiple Stories'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension Practice',
    description: 'Main idea identification, supporting details, and vocabulary in context',
    category: 'reading',
    icon: '📚',
    difficulty: 'Intermediate',
    path: '/activities/reading-comprehension',
    features: ['Main Ideas', 'Supporting Details', 'Vocabulary Practice'],
    estimatedTime: '20-25 minutes'
  },
  {
    id: 'key-events-details',
    title: 'Key Events vs Details',
    description: 'Read short stories and decide which statements are key events and which are supporting details',
    category: 'reading',
    icon: '📰',
    difficulty: 'Beginner',
    path: '/activities/key-events-details',
    features: ['Short Stories', 'Event vs Detail Classification', 'Instant Feedback'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'multi-level-reading',
    title: 'Multi-Level Reading Comprehension',
    description: 'Reading comprehension with 3 difficulty levels - choose the right level for your student',
    category: 'reading',
    icon: '📖',
    difficulty: 'All Levels',
    path: '/activities/multi-level-reading',
    features: ['3 Reading Levels', 'Multiple Stories', 'Comprehension Questions', 'Instant Feedback'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'context-clues',
    title: 'Context Clues Detective',
    description: 'Discover word meanings using context clues in sentences',
    category: 'language',
    icon: '🔍',
    difficulty: 'Intermediate',
    path: '/activities/context-clues',
    features: ['Detective Theme', 'Word Discovery', 'Context Analysis'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'fall-context-clues',
    title: 'Fall Context Clues Detective',
    description: 'Solve cozy autumn mysteries by using context clues to unlock vocabulary',
    category: 'language',
    icon: '🍂',
    difficulty: 'Intermediate',
    path: '/activities/fall-context-clues',
    features: ['Autumn Vocabulary', 'Two Difficulty Levels', 'Text or Multiple Choice'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'multiple-meanings',
    title: 'Multiple-Meaning Words',
    description: 'Match words with their different meanings in various contexts',
    category: 'words',
    icon: '🎯',
    difficulty: 'Intermediate',
    path: '/activities/multiple-meanings',
    features: ['Word Matching', 'Context Examples', 'Visual Learning'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'multiple-meaning-sentences',
    title: 'Multiple-Meaning Sentences',
    description: 'Read sentences with multiple meaning words and explain the meaning with scaffolded hints',
    category: 'words',
    icon: '🔁',
    difficulty: 'Beginner',
    path: '/activities/multiple-meaning-sentences',
    features: ['Sentence-Level Practice', 'Hint Buttons', 'Easy & Medium Sets'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'compare-contrast',
    title: 'Compare & Contrast',
    description: 'Interactive drag-and-drop activities to compare and contrast concepts',
    category: 'language',
    icon: '⚖️',
    difficulty: 'Intermediate',
    path: '/activities/compare-contrast',
    features: ['Drag & Drop', 'Visual Comparison', 'Critical Thinking'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'fall-compare-contrast',
    title: 'Fall Compare & Contrast',
    description: 'Compare apple orchards, hayrides, cozy drinks, and more autumn favorites',
    category: 'language',
    icon: '🍁',
    difficulty: 'Intermediate',
    path: '/activities/fall-compare-contrast',
    features: ['Fall Themes', 'Drag & Drop Sorting', 'Two Difficulty Modes'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'prefix-detective',
    title: 'Prefix Detective',
    description: 'Identify and use common prefixes (pre-, post-, inter-) in sentences',
    category: 'words',
    icon: '🔍',
    difficulty: 'Intermediate',
    path: '/activities/prefix-detective',
    features: ['Prefix Learning', 'Word Building', 'Detective Theme'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'negation-navigator',
    title: 'Negation Navigator',
    description: 'Demonstrate comprehension of negation in sentences with visual supports',
    category: 'language',
    icon: '🚫➡️✅',
    difficulty: 'Beginner',
    path: '/activities/negation-navigator',
    features: ['Visual Supports', 'Sentence Comparison', 'Comprehension Practice'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'problem-solution-stories',
    title: 'Problem-Solution Stories',
    description: 'Analyze problems and solutions in stories with progressive help system',
    category: 'reading',
    icon: '📚',
    difficulty: 'Intermediate',
    path: '/activities/problem-solution-stories',
    features: ['Progressive Help', 'Story Analysis', 'Critical Thinking'],
    estimatedTime: '20-30 minutes'
  },
  {
    id: 'articulation-practice',
    title: 'Articulation Practice',
    description: 'Practice speech sounds with sentence fill-in activities using targeted word lists',
    category: 'articulation',
    icon: '🗣️',
    difficulty: 'Beginner',
    path: '/activities/articulation-practice',
    features: ['S-Blends', 'Drag & Drop', 'Grammar-Aware', 'Reading Practice'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'articulation-practice-sequential',
    title: 'Articulation Practice (Sequential)',
    description: 'Reveal blank-first articulation sentences with word-type specific banks and random order practice',
    category: 'articulation',
    icon: '🗣️',
    difficulty: 'Intermediate',
    path: '/activities/articulation-practice-sequential',
    features: ['Blank Reveal', 'Word-Type Filtering', 'Randomized Deck'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'vocalic-r-word-practice',
    title: 'Vocalic /r/ Word Practice',
    description: 'Flashcard-style practice for vocalic /r/ word lists organized by position and stress',
    category: 'articulation',
    icon: '🎯',
    difficulty: 'Beginner',
    path: '/activities/vocalic-r-word-practice',
    features: ['Word-Level Drill', 'Shuffle Mode', 'Progress Tracking', 'Customizable Word Sets'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'synonym-practice',
    title: 'Synonym Practice',
    description: 'Learn synonyms by matching words with the same meaning across three difficulty levels',
    category: 'words',
    icon: '📖',
    difficulty: 'Beginner',
    path: '/activities/synonym-practice',
    features: ['3 Difficulty Levels', 'Multiple Attempts', 'Randomization', 'Visual Feedback'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'fall-synonym-practice',
    title: 'Fall Synonym Practice',
    description: 'Match fall-themed words with their synonyms using hints and visual supports',
    category: 'words',
    icon: '🍁',
    difficulty: 'Beginner',
    path: '/activities/fall-synonym-practice',
    features: ['Fall Vocabulary', 'Hint Button', 'Multiple Choice Support'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'aac-request-comment',
    title: 'AAC Request & Comment',
    description: 'Practice making complete requests and comments in real-world school scenarios',
    category: 'language',
    icon: '💬',
    difficulty: 'Beginner',
    path: '/activities/aac-request-comment',
    features: ['Progressive Help', 'Real Scenarios', 'Independent Practice', 'Multiple Choice Support'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'story-elements-worksheet',
    title: 'Story Elements Worksheet',
    description: 'Graphic organizer for identifying character, setting, problem, and solution in stories',
    category: 'worksheets',
    icon: '📖',
    difficulty: 'Beginner',
    path: '/activities/story-elements-worksheet',
    features: ['Print-Friendly', 'Story Structure', 'Graphic Organizer', 'Fillable or Printable'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'story-retelling-worksheet',
    title: 'Story Retelling Worksheet',
    description: 'Narrative sequencing practice with sentence starters (First, Next, Then, After that, Finally)',
    category: 'worksheets',
    icon: '📖',
    difficulty: 'Beginner',
    path: '/activities/story-retelling-worksheet',
    features: ['Print-Friendly', 'Sentence Starters', 'Narrative Sequencing', 'Fillable or Printable'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'story-grammar-organizer',
    title: 'Story Grammar Organizer',
    description: 'Build a custom graphic organizer by choosing story grammar parts with emoji headers',
    category: 'worksheets',
    icon: '🧩',
    difficulty: 'Beginner',
    path: '/activities/story-grammar-organizer',
    features: ['Selectable Elements', 'Emoji Headers', 'Print-Friendly'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'same-different-worksheet',
    title: 'Same & Different Worksheet',
    description: 'Comparison worksheets with structured sentence frames - emoji or custom mode',
    category: 'worksheets',
    icon: '⚖️',
    difficulty: 'Beginner',
    path: '/activities/same-different-worksheet',
    features: ['Print-Friendly', 'Sentence Frames', 'Custom Topics', 'Emoji Mode'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'compare-contrast-template',
    title: 'Compare & Contrast Template Builder',
    description: 'Create custom comparison organizers for any two topics with example templates',
    category: 'worksheets',
    icon: '🎨',
    difficulty: 'Intermediate',
    path: '/activities/compare-contrast-template',
    features: ['Customizable', 'Example Templates', 'Print-Friendly', 'Similarities & Differences'],
    estimatedTime: '15-25 minutes'
  },
  {
    id: 'past-tense-practice',
    title: 'Past Tense Practice',
    description: 'Interactive practice with regular and irregular past tense verbs - 13 questions with instant feedback',
    category: 'grammar',
    icon: '⏮️',
    difficulty: 'Beginner',
    path: '/activities/past-tense-practice',
    features: ['Regular & Irregular Verbs', 'Multiple Choice', 'Instant Feedback', 'High Contrast Mode'],
    estimatedTime: '10-15 minutes'
  },
  {
    id: 'plural-nouns-practice',
    title: 'Plural Nouns Practice',
    description: 'Fill-in-the-blank practice with regular and irregular plural nouns',
    category: 'grammar',
    icon: '🔢',
    difficulty: 'Beginner',
    path: '/activities/plural-nouns-practice',
    features: ['Regular & Irregular Plurals', 'Fill-in-the-Blank', 'Filter by Type', 'Instant Feedback'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'short-stories-predictions',
    title: 'Short Stories & Predictions',
    description: 'Read short stories and make predictions about what happens next',
    category: 'reading',
    icon: '🔮',
    difficulty: 'Intermediate',
    path: '/activities/short-stories-predictions',
    features: ['Prediction Practice', 'Independent Thinking Mode', 'Optional Multiple Choice', 'Story Analysis'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'relevant-response-practice',
    title: 'Relevant Response Practice',
    description: 'Practice responding to social questions with relevant, on-topic answers',
    category: 'language',
    icon: '💬',
    difficulty: 'Beginner',
    path: '/activities/relevant-response-practice',
    features: ['24 Questions', 'Example Responses', 'Progress Tracking', 'Shuffle Questions'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'question-response-practice',
    title: 'Question & Response Practice',
    description: 'Practice forming complete sentence responses to Yes/No and Wh- questions',
    category: 'language',
    icon: '💬',
    difficulty: 'Beginner',
    path: '/activities/question-response-practice',
    features: ['5 Categories', 'Sentence Starters', 'Example Responses', 'Yes/No & Wh- Questions'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'story-inference-compare',
    title: 'Story Inference & Analysis',
    description: 'Read stories and practice making inferences about characters\' thoughts and feelings',
    category: 'reading',
    icon: '🔍',
    difficulty: 'Advanced',
    path: '/activities/story-inference-compare',
    features: ['Character Analysis', 'Text Evidence', 'Inference Questions', 'Optional Multiple Choice'],
    estimatedTime: '20-30 minutes'
  },
  {
    id: 'classroom-instructions',
    title: 'Classroom Instructions Practice',
    description: 'Practice following multi-step directions in real school scenarios',
    category: 'language',
    icon: '📋',
    difficulty: 'Beginner',
    path: '/activities/classroom-instructions',
    features: ['Real School Scenarios', 'Step-by-Step Support', 'Facilitator Mode', '6 Categories'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'categories-functions',
    title: 'Categories & Functions',
    description: 'Identify and describe objects, their categories, and their functions',
    category: 'language',
    icon: '📦',
    difficulty: 'Beginner',
    path: '/activities/categories-functions',
    features: ['5 Activity Types', '12 Items', '4 Categories', 'Example Answers'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'pronoun-practice',
    title: 'Pronoun Practice',
    description: 'Practice using subject, object, possessive, and reflexive pronouns correctly',
    category: 'grammar',
    icon: '👤',
    difficulty: 'Beginner',
    path: '/activities/pronoun-practice',
    features: ['4 Pronoun Types', '15 Exercises', 'Instant Feedback', 'Quick Reference Guide'],
    estimatedTime: '15-20 minutes'
  },
  {
    id: 'figurative-language',
    title: 'Figurative Language',
    description: 'Learn and identify similes, metaphors, idioms, hyperbole, and personification',
    category: 'words',
    icon: '📚',
    difficulty: 'Intermediate',
    path: '/activities/figurative-language',
    features: ['5 Types', '15 Examples', 'Literal vs Figurative', 'Visual Comparisons'],
    estimatedTime: '20-25 minutes'
  },
  {
    id: 'social-cues-feelings',
    title: 'Social Cues & Feelings',
    description: 'Practice identifying emotions and social cues in real-world scenarios',
    category: 'language',
    icon: '😊',
    difficulty: 'Intermediate',
    path: '/activities/social-cues-feelings',
    features: ['12 Scenarios', 'Body Language', 'Social Tips', 'Action Suggestions'],
    estimatedTime: '15-20 minutes'
  },
];

export const getActivitiesByCategory = (categoryId) => {
  return activities.filter(activity => activity.category === categoryId);
};

export const getActivityById = (activityId) => {
  return activities.find(activity => activity.id === activityId);
};

export const getCategoryById = (categoryId) => {
  return activityCategories.find(category => category.id === categoryId);
};
