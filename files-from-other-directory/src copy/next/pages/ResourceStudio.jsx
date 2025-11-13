import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  listResources,
  ResourceTypes,
  GoalKinds,
  buildActivityFromResource,
} from '../lib/resourceRegistry';
import { registerActivity } from '../lib/registry';
import './ResourceStudio.css';

const goalLabels = {
  retell: 'Retell & Story Structure',
  literal: 'Literal Comprehension',
  inference: 'Inferential Thinking',
  prediction: 'Predictions',
  'context-clue': 'Context Clues',
  synonym: 'Synonyms',
  antonym: 'Antonyms',
  'multiple-meaning': 'Multiple Meanings',
  'describe-category': 'Categories',
  'describe-function': 'Functions',
  'describe-attributes': 'Attributes',
  'compare-contrast': 'Compare & Contrast',
  'verb-tense': 'Verb Tense',
  pronoun: 'Pronouns',
  plural: 'Plurals',
  'articulation-word': 'Articulation – Word',
  'articulation-sentence': 'Articulation – Sentence',
  'articulation-conversation': 'Articulation – Conversation',
};

const sectionDefinitions = [
  { type: ResourceTypes.STORY, title: 'Story Bank', description: 'Reusable narrative passages with question bundles.' },
  { type: ResourceTypes.VOCAB, title: 'Vocabulary Bank', description: 'Vocabulary entries with context, multiple meanings, and describe tasks.' },
  { type: ResourceTypes.GRAMMAR, title: 'Grammar Patterns', description: 'Reusable grammar targets with transformation drills.' },
  { type: ResourceTypes.ARTICULATION, title: 'Articulation Decks', description: 'Sound-specific decks with leveled practice tasks.' },
];

const formatGoals = (goals = []) =>
  goals
    .map((goal) => goalLabels[goal] || goal)
    .filter(Boolean)
    .join(', ');

const ResourceCard = ({ resource, type, onPreview }) => {
  const availableGoals = (resource.tasks || []).map((bundle) => bundle.goal);

  return (
    <article className="resource-card">
      <header className="resource-card__header">
        <div>
          <h3>{resource.title || resource.baseWord || resource.sound}</h3>
          {resource.summary && <p className="resource-card__summary">{resource.summary}</p>}
        </div>
        <button
          type="button"
          className="resource-card__preview"
          onClick={() => onPreview(type, resource, availableGoals)}
        >
          Preview in Player
        </button>
      </header>

      <dl className="resource-card__meta">
        {resource.tags?.length ? (
          <div>
            <dt>Tags</dt>
            <dd>{resource.tags.join(', ')}</dd>
          </div>
        ) : null}

        {availableGoals.length ? (
          <div>
            <dt>Goals</dt>
            <dd>{formatGoals(availableGoals)}</dd>
          </div>
        ) : null}

        {type === ResourceTypes.VOCAB && resource.baseWord ? (
          <div>
            <dt>Definition</dt>
            <dd>{resource.definition}</dd>
          </div>
        ) : null}

        {type === ResourceTypes.ARTICULATION && resource.sound ? (
          <div>
            <dt>Levels</dt>
            <dd>{resource.levels.map((level) => `${level.level} (${level.cards.length})`).join(', ')}</dd>
          </div>
        ) : null}
      </dl>
    </article>
  );
};

const ResourceStudio = () => {
  const [status, setStatus] = useState(null);
  const [previewLink, setPreviewLink] = useState(null);

  const sections = useMemo(
    () =>
      sectionDefinitions.map((section) => ({
        ...section,
        resources: listResources(section.type),
      })),
    [],
  );

  const handlePreview = (resourceType, resource, goals) => {
    try {
      const activity = buildActivityFromResource({
        resourceType,
        resourceId: resource.id,
        goals,
      });

      try {
        registerActivity(activity);
      } catch (error) {
        if (!/already registered/i.test(error.message)) {
          throw error;
        }
      }

      setStatus({
        tone: 'success',
        message: `Registered activity "${activity.id}". Open the player via the link below.`,
      });
      setPreviewLink(`/next/activities/${activity.id}`);
    } catch (error) {
      setStatus({
        tone: 'error',
        message: error.message,
      });
      setPreviewLink(null);
    }
  };

  const availableGoalsHint = useMemo(() => GoalKinds.join(', '), []);

  return (
    <div className="resource-studio">
      <header className="resource-studio__hero">
        <h1>Resource Studio</h1>
        <p>
          Browse the reusable content bank. Each resource bundles task sets by goal so you can
          synthesize activities on demand. Supported goals include: {availableGoalsHint}.
        </p>
        <Link to="/next" className="resource-studio__back-link">
          ← Back to Next-Gen Hub
        </Link>
      </header>

      {status && (
        <div
          className={`resource-studio__status ${
            status.tone === 'error' ? 'resource-studio__status--error' : ''
          }`}
        >
          {status.message}
          {previewLink && (
            <span>
              {' '}
              <Link to={previewLink}>Launch player</Link>
            </span>
          )}
        </div>
      )}

      {sections.map((section) => (
        <section key={section.type} className="resource-studio__section">
          <header className="resource-studio__section-header">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </header>

          {section.resources.length === 0 ? (
            <p className="resource-studio__empty">No resources registered yet.</p>
          ) : (
            <div className="resource-studio__grid">
              {section.resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  type={section.type}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default ResourceStudio;
