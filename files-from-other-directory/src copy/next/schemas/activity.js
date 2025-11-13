const ActivityDomains = Object.freeze({
  READING: 'reading',
  LANGUAGE: 'language',
  SPEECH: 'speech',
  AAC: 'aac',
  ARTICULATION: 'articulation',
});

const TaskKinds = Object.freeze({
  PROMPT: 'prompt',
  COMPREHENSION: 'comprehension',
  RETELL: 'retell',
  INFERENCE: 'inference',
  VOCABULARY: 'vocabulary',
  SEQUENCING: 'sequencing',
  SORTING: 'sorting',
});

const ResponseKinds = Object.freeze({
  SHORT_ANSWER: 'short-answer',
  MULTIPLE_CHOICE: 'multiple-choice',
  TRUE_FALSE: 'true-false',
  SEQUENCE: 'sequence',
  SORT: 'sort',
});

const SupportTiers = Object.freeze(['independent', 'hint', 'choices']);

/**
 * @typedef {Object} SupportConfig
 * @property {'independent'|'hint'|'choices'} level
 * @property {string=} hint
 * @property {Array<{ id: string, text: string, icon?: string }>=} choices
 * @property {Array<string>=} strategyNotes
 */

/**
 * @typedef {Object} TaskBlock
 * @property {string} id
 * @property {string} kind
 * @property {{ type: string, value: string }} prompt
 * @property {{ type: string, correct: any, options?: Array<{ id: string, text: string, icon?: string }> }} response
 * @property {Array<SupportConfig>=} supports
 * @property {{ evidence?: string, rationale?: string }=} rubric
 */

/**
 * @typedef {Object} ActivitySequence
 * @property {string} id
 * @property {string} title
 * @property {Array<TaskBlock>} tasks
 * @property {{ recommendedOrder?: number }} options
 */

/**
 * @typedef {Object} Passage
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {{ lexile?: number, readingLevel?: string, wordCount?: number }=} metrics
 */

/**
 * @typedef {Object} ActivityDefinition
 * @property {string} id
 * @property {string} title
 * @property {string} domain
 * @property {string} description
 * @property {Array<string>} tags
 * @property {{ gradeBands?: Array<string>, modalities?: Array<string> }} audience
 * @property {Array<Passage>} passages
 * @property {Array<ActivitySequence>} sequences
 * @property {{ icon?: string, estimatedTime?: string }=} meta
 */

const requiredRootKeys = ['id', 'title', 'domain', 'description', 'passages', 'sequences'];

const requiredTaskKeys = ['id', 'kind', 'prompt', 'response'];

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isEnumValue = (candidate, enumObj) => Object.values(enumObj).includes(candidate);

const isPlainObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const validateChoice = (choice, context, errors) => {
  if (!isPlainObject(choice)) {
    errors.push(`${context}: choice must be an object`);
    return;
  }

  if ('id' in choice && !isNonEmptyString(choice.id)) {
    errors.push(`${context}: choice id must be a non-empty string when provided`);
  }

  if (!isNonEmptyString(choice.text)) {
    errors.push(`${context}: choice text is required`);
  }

  if ('icon' in choice && choice.icon !== undefined && !isNonEmptyString(choice.icon)) {
    errors.push(`${context}: choice icon must be a string when provided`);
  }

  if ('iconId' in choice && choice.iconId !== undefined && !isNonEmptyString(choice.iconId)) {
    errors.push(`${context}: choice iconId must be a non-empty string when provided`);
  }
};

const validateSupport = (support, taskId, errors) => {
  if (!support || typeof support !== 'object') {
    errors.push(`Task ${taskId}: support config must be an object`);
    return;
  }
  if (!SupportTiers.includes(support.level)) {
    errors.push(`Task ${taskId}: unsupported support level "${support.level}"`);
  }
  if (support.level === 'choices' && !Array.isArray(support.choices)) {
    errors.push(`Task ${taskId}: choices level requires a choices array`);
  }

  if (Array.isArray(support.choices)) {
    support.choices.forEach((choice, index) =>
      validateChoice(choice, `Task ${taskId}: support choice ${index + 1}`, errors)
    );
  }
};

const validateTask = (task, sequenceId, errors) => {
  requiredTaskKeys.forEach((key) => {
    if (!(key in task)) {
      errors.push(`Sequence ${sequenceId}: task missing required key "${key}"`);
    }
  });

  if (task.id && !isNonEmptyString(task.id)) {
    errors.push(`Sequence ${sequenceId}: task id must be a non-empty string`);
  }

  if (task.kind && !isEnumValue(task.kind, TaskKinds)) {
    errors.push(`Task ${task.id}: invalid kind "${task.kind}"`);
  }

  if (!task.prompt || typeof task.prompt !== 'object') {
    errors.push(`Task ${task.id}: prompt must be an object`);
  } else if (!isNonEmptyString(task.prompt.type) || !isNonEmptyString(task.prompt.value)) {
    errors.push(`Task ${task.id}: prompt requires type and value strings`);
  }

  if (!task.response || typeof task.response !== 'object') {
    errors.push(`Task ${task.id}: response must be an object`);
  } else if (!isNonEmptyString(task.response.type)) {
    errors.push(`Task ${task.id}: response type must be a string`);
  }

  if (Array.isArray(task.response?.options)) {
    task.response.options.forEach((choice, index) =>
      validateChoice(choice, `Task ${task.id}: response choice ${index + 1}`, errors)
    );
  }

  if (Array.isArray(task.supports)) {
    task.supports.forEach((support) => validateSupport(support, task.id, errors));
  }
};

const validateSequence = (sequence, errors) => {
  if (!sequence || typeof sequence !== 'object') {
    errors.push('Sequences must be objects');
    return;
  }

  if (!isNonEmptyString(sequence.id)) {
    errors.push('Sequence id must be a non-empty string');
  }

  if (!isNonEmptyString(sequence.title)) {
    errors.push(`Sequence ${sequence.id || '<unknown>'}: title is required`);
  }

  if (!Array.isArray(sequence.tasks) || sequence.tasks.length === 0) {
    errors.push(`Sequence ${sequence.id || '<unknown>'}: must include at least one task`);
  } else {
    sequence.tasks.forEach((task) => validateTask(task, sequence.id, errors));
  }
};

const validatePassage = (passage, errors) => {
  if (!passage || typeof passage !== 'object') {
    errors.push('Passages must be objects');
    return;
  }

  if (!isNonEmptyString(passage.id)) {
    errors.push('Passage id must be a non-empty string');
  }

  if (!isNonEmptyString(passage.title)) {
    errors.push(`Passage ${passage.id || '<unknown>'}: title is required`);
  }

  if (!isNonEmptyString(passage.content)) {
    errors.push(`Passage ${passage.id || '<unknown>'}: content is required`);
  }
};

export const validateActivityDefinition = (definition) => {
  const errors = [];

  if (!definition || typeof definition !== 'object') {
    return { valid: false, errors: ['Activity definition must be an object'] };
  }

  requiredRootKeys.forEach((key) => {
    if (!(key in definition)) {
      errors.push(`Missing required activity key "${key}"`);
    }
  });

  if (definition.id && !isNonEmptyString(definition.id)) {
    errors.push('Activity id must be a non-empty string');
  }

  if (definition.domain && !isEnumValue(definition.domain, ActivityDomains)) {
    errors.push(`Activity ${definition.id || '<unknown>'}: invalid domain "${definition.domain}"`);
  }

  if (!Array.isArray(definition.passages) || definition.passages.length === 0) {
    errors.push(`Activity ${definition.id || '<unknown>'}: must include at least one passage`);
  } else {
    definition.passages.forEach((passage) => validatePassage(passage, errors));
  }

  if (!Array.isArray(definition.sequences) || definition.sequences.length === 0) {
    errors.push(`Activity ${definition.id || '<unknown>'}: must include at least one sequence`);
  } else {
    definition.sequences.forEach((sequence) => validateSequence(sequence, errors));
  }

  return { valid: errors.length === 0, errors };
};

export const normalizeActivityDefinition = (definition) => {
  const base = {
    tags: [],
    audience: {},
    meta: {},
    ...definition,
  };

  base.passages = base.passages.map((passage) => ({
    metrics: {},
    ...passage,
  }));

  base.sequences = base.sequences.map((sequence, index) => ({
    options: { recommendedOrder: index },
    ...sequence,
  }));

  return base;
};

export const createActivityDefinition = (definition) => {
  const normalized = normalizeActivityDefinition(definition);
  const { valid, errors } = validateActivityDefinition(normalized);

  if (!valid) {
    const message = [`Invalid activity definition: ${normalized.id || '<unknown>'}`, ...errors].join('\n - ');
    throw new Error(message);
  }

  return normalized;
};

export { ActivityDomains, TaskKinds, ResponseKinds, SupportTiers };
