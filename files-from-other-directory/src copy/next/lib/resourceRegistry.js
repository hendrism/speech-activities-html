import { createActivityDefinition, ActivityDomains } from '../schemas/activity';
import {
  ResourceTypes,
  GoalKinds,
  SupportPaths,
  validateResource,
} from '../schemas/resources';

const resourceStores = {
  [ResourceTypes.STORY]: new Map(),
  [ResourceTypes.VOCAB]: new Map(),
  [ResourceTypes.GRAMMAR]: new Map(),
  [ResourceTypes.ARTICULATION]: new Map(),
};

const domainDefaults = {
  [ResourceTypes.STORY]: ActivityDomains.READING,
  [ResourceTypes.VOCAB]: ActivityDomains.LANGUAGE,
  [ResourceTypes.GRAMMAR]: ActivityDomains.LANGUAGE,
  [ResourceTypes.ARTICULATION]: ActivityDomains.ARTICULATION,
};

const goalLabels = {
  retell: 'Retell & Story Structure',
  literal: 'Literal Comprehension',
  inference: 'Inferential Thinking',
  prediction: 'Predictions',
  'context-clue': 'Context Clue Practice',
  synonym: 'Synonyms',
  antonym: 'Antonyms',
  'multiple-meaning': 'Multiple Meaning Words',
  'describe-category': 'Categories',
  'describe-function': 'Functions',
  'describe-attributes': 'Attribute Descriptions',
  'compare-contrast': 'Compare & Contrast',
  'verb-tense': 'Verb Tense Practice',
  pronoun: 'Pronoun Practice',
  plural: 'Plural Practice',
  'articulation-word': 'Articulation – Word Level',
  'articulation-sentence': 'Articulation – Sentence Level',
  'articulation-conversation': 'Articulation – Conversation Level',
};

const unique = (values = []) => Array.from(new Set(values.filter(Boolean)));

const ensureStoreExists = (type) => {
  if (!resourceStores[type]) {
    throw new Error(`Unsupported resource type "${type}".`);
  }
  return resourceStores[type];
};

const formatGoalList = (goals = []) => goals.map((goal) => goalLabels[goal] || goal).join(', ');

const defaultDescriptionBuilders = {
  [ResourceTypes.STORY]: (resource, goals) => {
    const goalList = formatGoalList(goals);
    return resource.summary
      ? resource.summary
      : `Practice ${goalList || 'story comprehension'} with the passage "${resource.title}".`;
  },
  [ResourceTypes.VOCAB]: (resource, goals) => {
    const goalList = formatGoalList(goals);
    return `Vocabulary work for "${resource.baseWord}" covering ${goalList || 'multiple goal areas'}.`;
  },
  [ResourceTypes.GRAMMAR]: (resource, goals) => {
    const goalList = formatGoalList(goals);
    return resource.description
      ? resource.description
      : `Grammar practice for ${resource.title}${goalList ? ` focused on ${goalList}` : ''}.`;
  },
  [ResourceTypes.ARTICULATION]: (resource, goals) => {
    const goalList = formatGoalList(goals);
    return `Articulation practice targeting "${resource.sound}"${goalList ? ` (${goalList})` : ''}.`;
  },
};

const buildPassagesForResource = (type, resource) => {
  switch (type) {
    case ResourceTypes.STORY: {
      const metrics = {};
      if (typeof resource.lexile === 'number') metrics.lexile = resource.lexile;
      return [
        {
          id: `${resource.id}-passage`,
          title: resource.title,
          content: resource.content,
          metrics,
        },
      ];
    }
    case ResourceTypes.VOCAB: {
      const contentParts = [
        `**Word:** ${resource.baseWord}`,
        `**Definition:** ${resource.definition}`,
      ];
      if (resource.exampleSentence) {
        contentParts.push(`**Example:** ${resource.exampleSentence}`);
      }
      if (resource.multipleMeanings?.length) {
        const meanings = resource.multipleMeanings
          .map(
            (meaning) =>
              `- **${meaning.meaningId}:** ${meaning.definition}${meaning.sentence ? ` — _${meaning.sentence}_` : ''}`,
          )
          .join('\n');
        contentParts.push('**Meanings:**\n' + meanings);
      }
      if (resource.categoryData) {
        const attributes = resource.categoryData.attributes?.length
          ? resource.categoryData.attributes.join(', ')
          : null;
        contentParts.push(
          [
            resource.categoryData.category
              ? `**Category:** ${resource.categoryData.category}`
              : null,
            resource.categoryData.function
              ? `**Function:** ${resource.categoryData.function}`
              : null,
            attributes ? `**Attributes:** ${attributes}` : null,
          ]
            .filter(Boolean)
            .join('\n'),
        );
      }
      return [
        {
          id: `${resource.id}-vocab`,
          title: `${resource.baseWord} Vocabulary`,
          content: contentParts.filter(Boolean).join('\n\n'),
        },
      ];
    }
    case ResourceTypes.GRAMMAR: {
      const exampleList = resource.examples
        .map(
          (example) =>
            `- ${example.base} → ${example.target}${example.sentence ? ` (${example.sentence})` : ''}`,
        )
        .join('\n');
      const transformationList = resource.transformations?.length
        ? resource.transformations
            .map(
              (transform) =>
                `- ${transform.from} → ${transform.to}${transform.rule ? ` (${transform.rule})` : ''}`,
            )
            .join('\n')
        : null;
      const contentParts = [
        `**Pattern:** ${resource.title}`,
        resource.description ? `**Overview:** ${resource.description}` : null,
        '**Examples:**\n' + exampleList,
        transformationList ? '**Transformations:**\n' + transformationList : null,
      ];
      return [
        {
          id: `${resource.id}-grammar`,
          title: resource.title,
          content: contentParts.filter(Boolean).join('\n\n'),
        },
      ];
    }
    case ResourceTypes.ARTICULATION: {
      const levelSummaries = resource.levels
        .map((level) => `- ${level.level}: ${level.cards.length} cards`)
        .join('\n');
      const carryoverSection = resource.carryoverPrompts?.length
        ? '**Carryover Prompts:**\n' + resource.carryoverPrompts.map((prompt) => `- ${prompt}`).join('\n')
        : null;
      const contentParts = [
        `**Target Sound:** ${resource.sound}`,
        '**Deck Overview:**\n' + levelSummaries,
        carryoverSection,
      ];
      return [
        {
          id: `${resource.id}-artic`,
          title: `Articulation – ${resource.sound}`,
          content: contentParts.filter(Boolean).join('\n\n'),
        },
      ];
    }
    default:
      throw new Error(`Cannot build passages for unsupported resource type "${type}".`);
  }
};

const assertGoalsAvailable = (resource, goals) => {
  const availableGoals = new Set((resource.tasks || []).map((bundle) => bundle.goal));
  const missing = goals.filter((goal) => !availableGoals.has(goal));
  if (missing.length > 0) {
    throw new Error(
      `Resource "${resource.id}" is missing task bundles for goals: ${missing.join(', ')}`,
    );
  }
};

const selectBundles = (resource, goals) => {
  if (!Array.isArray(resource.tasks)) return [];
  if (!goals.length) return resource.tasks;
  const goalSet = new Set(goals);
  return resource.tasks.filter((bundle) => goalSet.has(bundle.goal));
};

const buildSequencesFromBundles = (resource, bundles) =>
  bundles.map((bundle, index) => ({
    id: `${resource.id}-${bundle.goal}-${index + 1}`,
    title: goalLabels[bundle.goal] || bundle.goal,
    tasks: bundle.tasks,
  }));

const ensureGoalList = (resource, goals) => {
  if (goals && goals.length) {
    const invalid = goals.filter((goal) => !GoalKinds.includes(goal));
    if (invalid.length) {
      throw new Error(`Unsupported goals requested: ${invalid.join(', ')}`);
    }
    assertGoalsAvailable(resource, goals);
    return unique(goals);
  }
  return unique((resource.tasks || []).map((bundle) => bundle.goal));
};

const resolveTags = (resourceTags = [], overrideTags = [], extraTags = []) =>
  unique([...resourceTags, ...overrideTags, ...extraTags]);

const registerResource = (type, resource) => {
  const { valid, errors } = validateResource(type, resource);
  if (!valid) {
    const message = [`Invalid ${type} resource: ${resource?.id || '<unknown>'}`, ...errors].join(
      '\n - ',
    );
    throw new Error(message);
  }
  const store = ensureStoreExists(type);
  store.set(resource.id, { ...resource });
  return resource;
};

const registerResources = (type, resources = []) => resources.map((resource) => registerResource(type, resource));

export const registerStory = (resource) => registerResource(ResourceTypes.STORY, resource);
export const registerStories = (resources) => registerResources(ResourceTypes.STORY, resources);

export const registerVocabularyEntry = (resource) =>
  registerResource(ResourceTypes.VOCAB, resource);
export const registerVocabularyEntries = (resources) =>
  registerResources(ResourceTypes.VOCAB, resources);

export const registerGrammarPattern = (resource) =>
  registerResource(ResourceTypes.GRAMMAR, resource);
export const registerGrammarPatterns = (resources) =>
  registerResources(ResourceTypes.GRAMMAR, resources);

export const registerArticulationDeck = (resource) =>
  registerResource(ResourceTypes.ARTICULATION, resource);
export const registerArticulationDecks = (resources) =>
  registerResources(ResourceTypes.ARTICULATION, resources);

export const getResource = (type, id) => {
  const store = ensureStoreExists(type);
  return store.get(id) || null;
};

export const listResources = (type, predicate = () => true) => {
  const store = ensureStoreExists(type);
  return Array.from(store.values()).filter(predicate);
};

export const clearResourceRegistry = (type = null) => {
  if (type) {
    ensureStoreExists(type).clear();
    return;
  }
  Object.values(ResourceTypes).forEach((resourceType) => {
    resourceStores[resourceType].clear();
  });
};

export const buildActivityFromResource = ({
  resourceType,
  resourceId,
  goals = [],
  overrides = {},
} = {}) => {
  if (!resourceType) {
    throw new Error('buildActivityFromResource requires resourceType.');
  }
  const resource = getResource(resourceType, resourceId);
  if (!resource) {
    throw new Error(`Resource not found: type="${resourceType}", id="${resourceId}"`);
  }

  const goalList = ensureGoalList(resource, goals);
  const bundles = selectBundles(resource, goalList);
  if (!bundles.length) {
    throw new Error(
      `Resource "${resourceId}" (type "${resourceType}") has no task bundles for the requested goals.`,
    );
  }

  const idSuffix = goalList.length ? goalList.join('-') : 'full';
  const activityId = overrides.id || `${resource.id}-${idSuffix}`;
  const title = overrides.title || resource.title;
  const domain = overrides.domain || domainDefaults[resourceType];
  const description =
    overrides.description ||
    defaultDescriptionBuilders[resourceType]?.(resource, goalList) ||
    `Auto-generated activity for ${resource.title}`;
  const tags = resolveTags(resource.tags, overrides.tags, overrides.extraTags);
  const passages = overrides.passages || buildPassagesForResource(resourceType, resource);
  const sequences =
    overrides.sequences || buildSequencesFromBundles(resource, bundles);

  const activityDefinition = {
    id: activityId,
    title,
    domain,
    description,
    tags,
    audience: overrides.audience || {},
    passages,
    sequences,
    meta: overrides.meta || {},
  };

  return createActivityDefinition(activityDefinition);
};

export const buildActivitiesForSessionPlan = (sessionPlan, { idPrefix } = {}) => {
  const { valid, errors } = validateResource('session', sessionPlan);
  if (!valid) {
    const message = [`Invalid session plan: ${sessionPlan?.id || '<unsaved>'}`, ...errors].join(
      '\n - ',
    );
    throw new Error(message);
  }

  const prefix =
    idPrefix || (sessionPlan.id ? `${sessionPlan.id}-step` : `session-${Date.now()}-step`);

  return sessionPlan.steps.map((step, index) => {
    const overrides = {
      id: `${prefix}-${index + 1}`,
      title: `${sessionPlan.title} – ${goalLabels[step.selectedGoals?.[0]] || 'Activity'}`,
      meta: {
        sessionStepId: step.id,
        mode: step.mode || 'interactive',
      },
    };

    return {
      stepId: step.id,
      activity: buildActivityFromResource({
        resourceType: step.resourceRef.type,
        resourceId: step.resourceRef.id,
        goals: step.selectedGoals,
        overrides,
      }),
    };
  });
};

export {
  ResourceTypes,
  GoalKinds,
  SupportPaths,
};
