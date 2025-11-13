/**
 * Canonical resource schemas for the redesigned content bank.
 * The validators mirror the style used in activity.js so we can
 * synthesize ActivityDefinition objects from these resources with confidence.
 */

const ResourceTypes = Object.freeze({
  STORY: 'story',
  VOCAB: 'vocabulary',
  GRAMMAR: 'grammar',
  ARTICULATION: 'articulation',
});

const GoalKinds = Object.freeze([
  'retell',
  'literal',
  'inference',
  'prediction',
  'context-clue',
  'synonym',
  'antonym',
  'multiple-meaning',
  'describe-category',
  'describe-function',
  'describe-attributes',
  'compare-contrast',
  'verb-tense',
  'pronoun',
  'plural',
  'articulation-word',
  'articulation-sentence',
  'articulation-conversation',
]);

const SupportPaths = Object.freeze([
  'text-only',
  'text-hint-choices',
  'choices-only',
  'drag-feedback',
  'planner-flow',
]);

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const assertArray = (value) => Array.isArray(value) ? value : [];

const validators = {
  tag(tag) {
    const errors = [];
    if (!isNonEmptyString(tag?.id)) errors.push('Tag id is required.');
    if (!isNonEmptyString(tag?.label)) errors.push(`Tag ${tag?.id || '<unknown>'}: label is required.`);
    if (!isNonEmptyString(tag?.category)) errors.push(`Tag ${tag?.id || '<unknown>'}: category is required.`);
    if (tag?.description !== undefined && typeof tag.description !== 'string') {
      errors.push(`Tag ${tag?.id || '<unknown>'}: description must be a string when provided.`);
    }
    return { valid: errors.length === 0, errors };
  },

  taskBundle(bundle, context = 'task bundle') {
    const errors = [];
    if (!isNonEmptyString(bundle?.id)) errors.push(`${context}: id is required.`);
    if (!GoalKinds.includes(bundle?.goal)) {
      errors.push(`${context}: goal "${bundle?.goal}" is not supported.`);
    }
    if (bundle?.supportPath && !SupportPaths.includes(bundle.supportPath)) {
      errors.push(`${context}: supportPath "${bundle.supportPath}" is not supported.`);
    }
    if (!Array.isArray(bundle?.tasks) || bundle.tasks.length === 0) {
      errors.push(`${context}: tasks array is required.`);
    }
    return { valid: errors.length === 0, errors };
  },

  storyResource(resource) {
    const errors = [];
    const ref = resource?.id || '<unknown story>';
    if (!isNonEmptyString(resource?.id)) errors.push('StoryResource id is required.');
    if (!isNonEmptyString(resource?.title)) errors.push(`StoryResource ${ref}: title is required.`);
    if (!isNonEmptyString(resource?.content)) errors.push(`StoryResource ${ref}: content is required.`);
    if (resource?.summary !== undefined && typeof resource.summary !== 'string') {
      errors.push(`StoryResource ${ref}: summary must be a string when provided.`);
    }
    if (resource?.lexile !== undefined && typeof resource.lexile !== 'number') {
      errors.push(`StoryResource ${ref}: lexile must be a number when provided.`);
    }
    if (resource?.media && typeof resource.media !== 'object') {
      errors.push(`StoryResource ${ref}: media must be an object when provided.`);
    }

    const tags = assertArray(resource?.tags);
    tags.forEach((tagId, idx) => {
      if (!isNonEmptyString(tagId)) errors.push(`StoryResource ${ref}: tags[${idx}] must be a string.`);
    });

    if (!Array.isArray(resource?.tasks) || resource.tasks.length === 0) {
      errors.push(`StoryResource ${ref}: tasks array is required.`);
    } else {
      resource.tasks.forEach((bundle, index) => {
        const result = validators.taskBundle(bundle, `StoryResource ${ref}: task bundle ${index + 1}`);
        errors.push(...result.errors);
      });
    }

    return { valid: errors.length === 0, errors };
  },

  vocabularyEntry(entry) {
    const errors = [];
    const ref = entry?.id || '<unknown vocab>';
    if (!isNonEmptyString(entry?.id)) errors.push('VocabularyEntry id is required.');
    if (!isNonEmptyString(entry?.baseWord)) errors.push(`VocabularyEntry ${ref}: baseWord is required.`);
    if (!isNonEmptyString(entry?.definition)) errors.push(`VocabularyEntry ${ref}: definition is required.`);
    if (entry?.partOfSpeech && !isNonEmptyString(entry.partOfSpeech)) {
      errors.push(`VocabularyEntry ${ref}: partOfSpeech must be a non-empty string.`);
    }
    if (entry?.exampleSentence && !isNonEmptyString(entry.exampleSentence)) {
      errors.push(`VocabularyEntry ${ref}: exampleSentence must be a non-empty string.`);
    }

    const contrasts = entry?.contrasts;
    if (contrasts && typeof contrasts !== 'object') {
      errors.push(`VocabularyEntry ${ref}: contrasts must be an object when provided.`);
    } else if (contrasts) {
      ['synonym', 'antonym'].forEach((key) => {
        if (contrasts[key] !== undefined) {
          if (!Array.isArray(contrasts[key])) {
            errors.push(`VocabularyEntry ${ref}: contrasts.${key} must be an array.`);
          } else {
            contrasts[key].forEach((value, idx) => {
              if (!isNonEmptyString(value)) {
                errors.push(`VocabularyEntry ${ref}: contrasts.${key}[${idx}] must be a non-empty string.`);
              }
            });
          }
        }
      });
    }

    const multipleMeanings = assertArray(entry?.multipleMeanings);
    multipleMeanings.forEach((meaning, idx) => {
      if (!isNonEmptyString(meaning?.meaningId)) {
        errors.push(`VocabularyEntry ${ref}: multipleMeanings[${idx}].meaningId is required.`);
      }
      if (!isNonEmptyString(meaning?.definition)) {
        errors.push(`VocabularyEntry ${ref}: multipleMeanings[${idx}].definition is required.`);
      }
      if (meaning?.sentence && !isNonEmptyString(meaning.sentence)) {
        errors.push(`VocabularyEntry ${ref}: multipleMeanings[${idx}].sentence must be a non-empty string when provided.`);
      }
    });

    const categoryData = entry?.categoryData;
    if (categoryData) {
      if (typeof categoryData !== 'object') {
        errors.push(`VocabularyEntry ${ref}: categoryData must be an object.`);
      } else {
        if (categoryData.category && !isNonEmptyString(categoryData.category)) {
          errors.push(`VocabularyEntry ${ref}: categoryData.category must be a non-empty string.`);
        }
        if (categoryData.function && !isNonEmptyString(categoryData.function)) {
          errors.push(`VocabularyEntry ${ref}: categoryData.function must be a non-empty string.`);
        }
        assertArray(categoryData.attributes).forEach((attribute, idx) => {
          if (!isNonEmptyString(attribute)) {
            errors.push(`VocabularyEntry ${ref}: categoryData.attributes[${idx}] must be a non-empty string.`);
          }
        });
      }
    }

    assertArray(entry?.contextLinks).forEach((link, idx) => {
      if (!isNonEmptyString(link)) {
        errors.push(`VocabularyEntry ${ref}: contextLinks[${idx}] must be a non-empty string.`);
      }
    });

    assertArray(entry?.tags).forEach((tagId, idx) => {
      if (!isNonEmptyString(tagId)) {
        errors.push(`VocabularyEntry ${ref}: tags[${idx}] must be a string.`);
      }
    });

    if (!Array.isArray(entry?.tasks) || entry.tasks.length === 0) {
      errors.push(`VocabularyEntry ${ref}: tasks array is required.`);
    } else {
      entry.tasks.forEach((bundle, index) => {
        const result = validators.taskBundle(bundle, `VocabularyEntry ${ref}: task bundle ${index + 1}`);
        errors.push(...result.errors);
      });
    }

    return { valid: errors.length === 0, errors };
  },

  grammarPattern(pattern) {
    const errors = [];
    const ref = pattern?.id || '<unknown grammar>';
    if (!isNonEmptyString(pattern?.id)) errors.push('GrammarPattern id is required.');
    if (!isNonEmptyString(pattern?.title)) errors.push(`GrammarPattern ${ref}: title is required.`);
    if (!isNonEmptyString(pattern?.patternType)) errors.push(`GrammarPattern ${ref}: patternType is required.`);
    if (pattern?.description && !isNonEmptyString(pattern.description)) {
      errors.push(`GrammarPattern ${ref}: description must be a non-empty string when provided.`);
    }

    if (!Array.isArray(pattern?.examples) || pattern.examples.length === 0) {
      errors.push(`GrammarPattern ${ref}: examples array is required.`);
    } else {
      pattern.examples.forEach((example, idx) => {
        if (!isNonEmptyString(example?.base) || !isNonEmptyString(example?.target)) {
          errors.push(`GrammarPattern ${ref}: examples[${idx}] must include base and target strings.`);
        }
        if (example?.sentence && !isNonEmptyString(example.sentence)) {
          errors.push(`GrammarPattern ${ref}: examples[${idx}].sentence must be a non-empty string when provided.`);
        }
      });
    }

    assertArray(pattern?.transformations).forEach((transformation, idx) => {
      if (!isNonEmptyString(transformation?.from) || !isNonEmptyString(transformation?.to)) {
        errors.push(`GrammarPattern ${ref}: transformations[${idx}] must include from/to strings.`);
      }
      if (transformation?.rule && !isNonEmptyString(transformation.rule)) {
        errors.push(`GrammarPattern ${ref}: transformations[${idx}].rule must be a non-empty string when provided.`);
      }
    });

    assertArray(pattern?.tags).forEach((tagId, idx) => {
      if (!isNonEmptyString(tagId)) {
        errors.push(`GrammarPattern ${ref}: tags[${idx}] must be a string.`);
      }
    });

    if (!Array.isArray(pattern?.tasks) || pattern.tasks.length === 0) {
      errors.push(`GrammarPattern ${ref}: tasks array is required.`);
    } else {
      pattern.tasks.forEach((bundle, index) => {
        const result = validators.taskBundle(bundle, `GrammarPattern ${ref}: task bundle ${index + 1}`);
        errors.push(...result.errors);
      });
    }

    return { valid: errors.length === 0, errors };
  },

  articulationDeck(deck) {
    const errors = [];
    const ref = deck?.id || '<unknown articulation>';
    if (!isNonEmptyString(deck?.id)) errors.push('ArticulationDeck id is required.');
    if (!isNonEmptyString(deck?.sound)) errors.push(`ArticulationDeck ${ref}: sound is required.`);
    assertArray(deck?.tags).forEach((tagId, idx) => {
      if (!isNonEmptyString(tagId)) errors.push(`ArticulationDeck ${ref}: tags[${idx}] must be a string.`);
    });

    if (!Array.isArray(deck?.levels) || deck.levels.length === 0) {
      errors.push(`ArticulationDeck ${ref}: levels array is required.`);
    } else {
      deck.levels.forEach((level, idx) => {
        if (!['word', 'phrase', 'sentence', 'conversation'].includes(level?.level)) {
          errors.push(`ArticulationDeck ${ref}: levels[${idx}].level "${level?.level}" is invalid.`);
        }
        if (!Array.isArray(level?.cards) || level.cards.length === 0) {
          errors.push(`ArticulationDeck ${ref}: levels[${idx}].cards array is required.`);
        } else {
          level.cards.forEach((card, cardIdx) => {
            if (!isNonEmptyString(card?.id)) {
              errors.push(`ArticulationDeck ${ref}: levels[${idx}].cards[${cardIdx}].id is required.`);
            }
            if (!isNonEmptyString(card?.text)) {
              errors.push(`ArticulationDeck ${ref}: levels[${idx}].cards[${cardIdx}].text is required.`);
            }
            if (card?.syllables !== undefined && typeof card.syllables !== 'number') {
              errors.push(`ArticulationDeck ${ref}: levels[${idx}].cards[${cardIdx}].syllables must be a number when provided.`);
            }
            if (card?.imageId !== undefined && !isNonEmptyString(card.imageId)) {
              errors.push(`ArticulationDeck ${ref}: levels[${idx}].cards[${cardIdx}].imageId must be a non-empty string when provided.`);
            }
          });
        }
      });
    }

    assertArray(deck?.carryoverPrompts).forEach((prompt, idx) => {
      if (!isNonEmptyString(prompt)) {
        errors.push(`ArticulationDeck ${ref}: carryoverPrompts[${idx}] must be a non-empty string.`);
      }
    });

    if (!Array.isArray(deck?.tasks) || deck.tasks.length === 0) {
      errors.push(`ArticulationDeck ${ref}: tasks array is required.`);
    } else {
      deck.tasks.forEach((bundle, index) => {
        const result = validators.taskBundle(bundle, `ArticulationDeck ${ref}: task bundle ${index + 1}`);
        errors.push(...result.errors);
      });
    }

    return { valid: errors.length === 0, errors };
  },

  sessionPlan(plan) {
    const errors = [];
    const ref = plan?.id || '<unsaved session>';
    if (!isNonEmptyString(plan?.title)) errors.push('SessionPlan title is required.');
    if (plan?.id && !isNonEmptyString(plan.id)) errors.push('SessionPlan id must be a non-empty string when provided.');
    if (plan?.scheduledAt && !isNonEmptyString(plan.scheduledAt)) {
      errors.push(`SessionPlan ${ref}: scheduledAt must be an ISO string when provided.`);
    }
    if (plan?.durationMinutes !== undefined && typeof plan.durationMinutes !== 'number') {
      errors.push(`SessionPlan ${ref}: durationMinutes must be a number when provided.`);
    }
    if (plan?.notes !== undefined && typeof plan.notes !== 'string') {
      errors.push(`SessionPlan ${ref}: notes must be a string when provided.`);
    }

    assertArray(plan?.targets).forEach((tagId, idx) => {
      if (!isNonEmptyString(tagId)) {
        errors.push(`SessionPlan ${ref}: targets[${idx}] must be a string.`);
      }
    });

    if (!Array.isArray(plan?.participants)) {
      errors.push(`SessionPlan ${ref}: participants must be an array (can be empty).`);
    } else {
      plan.participants.forEach((participant, idx) => {
        if (!isNonEmptyString(participant?.id)) {
          errors.push(`SessionPlan ${ref}: participants[${idx}].id is required.`);
        }
        if (!isNonEmptyString(participant?.name)) {
          errors.push(`SessionPlan ${ref}: participants[${idx}].name is required.`);
        }
        if (participant?.notes && !isNonEmptyString(participant.notes)) {
          errors.push(`SessionPlan ${ref}: participants[${idx}].notes must be a string when provided.`);
        }
      });
    }

    if (!Array.isArray(plan?.steps) || plan.steps.length === 0) {
      errors.push(`SessionPlan ${ref}: steps array is required.`);
    } else {
      plan.steps.forEach((step, idx) => {
        if (!isNonEmptyString(step?.id)) {
          errors.push(`SessionPlan ${ref}: steps[${idx}].id is required.`);
        }
        if (!step?.resourceRef || typeof step.resourceRef !== 'object') {
          errors.push(`SessionPlan ${ref}: steps[${idx}].resourceRef object is required.`);
        } else {
          const { type, id } = step.resourceRef;
          if (!Object.values(ResourceTypes).includes(type)) {
            errors.push(`SessionPlan ${ref}: steps[${idx}].resourceRef.type "${type}" is invalid.`);
          }
          if (!isNonEmptyString(id)) {
            errors.push(`SessionPlan ${ref}: steps[${idx}].resourceRef.id is required.`);
          }
        }

        assertArray(step?.selectedGoals).forEach((goal, goalIdx) => {
          if (!GoalKinds.includes(goal)) {
            errors.push(`SessionPlan ${ref}: steps[${idx}].selectedGoals[${goalIdx}] goal "${goal}" is invalid.`);
          }
        });

        if (step?.timeEstimate !== undefined && typeof step.timeEstimate !== 'number') {
          errors.push(`SessionPlan ${ref}: steps[${idx}].timeEstimate must be a number when provided.`);
        }

        if (step?.mode && !['interactive', 'printable', 'homework'].includes(step.mode)) {
          errors.push(`SessionPlan ${ref}: steps[${idx}].mode "${step.mode}" is invalid.`);
        }

        if (step?.notes !== undefined && typeof step.notes !== 'string') {
          errors.push(`SessionPlan ${ref}: steps[${idx}].notes must be a string when provided.`);
        }
      });
    }

    return { valid: errors.length === 0, errors };
  },
};

/**
 * Run a validator and return the collected error messages.
 * @param {'tag'|'story'|'vocabulary'|'grammar'|'articulation'|'session'} type
 * @param {unknown} value
 */
export const validateResource = (type, value) => {
  switch (type) {
    case 'tag':
      return validators.tag(value);
    case 'story':
      return validators.storyResource(value);
    case 'vocabulary':
      return validators.vocabularyEntry(value);
    case 'grammar':
      return validators.grammarPattern(value);
    case 'articulation':
      return validators.articulationDeck(value);
    case 'session':
      return validators.sessionPlan(value);
    default:
      return { valid: false, errors: [`Unknown validator type "${type}".`] };
  }
};

export {
  ResourceTypes,
  GoalKinds,
  SupportPaths,
  validators as resourceValidators,
};
