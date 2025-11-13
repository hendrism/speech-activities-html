import { ActivityDomains, TaskKinds, ResponseKinds } from '../schemas/activity';
import { stories as legacyStories } from '../../data/stories';

const mapStoryToSequence = (story, storyIndex) => {
  const whereWhenTasks = story.whereWhenQuestions.map((question, questionIndex) => {
    const options = question.choices.map((choice, choiceIndex) => ({
      id: `story-${storyIndex}-where-${questionIndex}-choice-${choiceIndex}`,
      text: choice.text,
    }));

    return {
      id: `story-${storyIndex}-where-${questionIndex}`,
      kind: TaskKinds.COMPREHENSION,
      prompt: {
        type: 'text',
        value: question.question,
      },
      response: {
        type: ResponseKinds.MULTIPLE_CHOICE,
        options,
        correct: options[question.correct]?.id,
      },
      supports: [
        {
          level: 'independent',
          strategyNotes: ['Have the student point to the sentence that answers the question.'],
        },
        {
          level: 'hint',
          hint: 'Look for words that tell you where or when the action happened.',
        },
        {
          level: 'choices',
          choices: options,
        },
      ],
    };
  });

  const literalInferentialTasks = story.literalInferentialQuestions.map((question, questionIndex) => {
    const options = question.choices.map((choice, choiceIndex) => ({
      id: `story-${storyIndex}-infer-${questionIndex}-choice-${choiceIndex}`,
      text: choice.text,
    }));

    return {
      id: `story-${storyIndex}-infer-${questionIndex}`,
      kind: TaskKinds.INFERENCE,
      prompt: {
        type: 'text',
        value: question.question,
      },
      response: {
        type: ResponseKinds.MULTIPLE_CHOICE,
        options,
        correct: options[question.correct]?.id,
      },
      supports: [
        {
          level: 'independent',
          strategyNotes: ['Ask the student to explain why they picked their answer.'],
        },
        {
          level: 'hint',
          hint: 'Think about how the characters felt and what they did.',
        },
        {
          level: 'choices',
          choices: options,
        },
      ],
    };
  });

  return {
    id: `story-${storyIndex}-sequence`,
    title: story.title,
    tasks: [...whereWhenTasks, ...literalInferentialTasks],
    options: {
      recommendedOrder: storyIndex,
    },
  };
};

export const readingStoriesBlueprint = {
  id: 'reading-stories-legacy-port',
  title: 'Reading Stories (Legacy Migration)',
  domain: ActivityDomains.READING,
  description:
    'Multiple short passages with literal where/when questions and inferential prompts, migrated from the legacy Reading Stories activity.',
  tags: ['where-when', 'literal', 'inferential', 'legacy'],
  audience: {
    gradeBands: ['K-2'],
    modalities: ['virtual', 'in-person'],
  },
  meta: {
    icon: '📖',
    estimatedTime: '15 minutes',
  },
  passages: legacyStories.map((story, index) => ({
    id: `story-${index}`,
    title: story.title,
    content: story.text,
    metrics: {
      readingLevel: 'K-2',
      wordCount: story.text.split(/\s+/).length,
    },
  })),
  sequences: legacyStories.map(mapStoryToSequence),
};

export default readingStoriesBlueprint;
