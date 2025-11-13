import { createActivityDefinition } from '../schemas/activity';

const registry = new Map();

export const registerActivity = (definition) => {
  const normalized = createActivityDefinition(definition);

  if (registry.has(normalized.id)) {
    throw new Error(`Activity with id "${normalized.id}" already registered`);
  }

  registry.set(normalized.id, normalized);
  return normalized;
};

export const registerActivities = (definitions = []) => {
  return definitions.map((definition) => registerActivity(definition));
};

export const getActivity = (id) => {
  return registry.get(id) || null;
};

export const listActivities = (predicate = () => true) => {
  return Array.from(registry.values()).filter(predicate);
};

export const clearRegistry = () => {
  registry.clear();
};
