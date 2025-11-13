import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { validateActivityDefinition } from '../schemas/activity';
import { registerActivity } from '../lib/registry';
import BlueprintEditor from '../components/BlueprintEditor';
import './BlueprintWorkbench.css';

const createTemplate = () => ({
  id: `draft-${Date.now()}`,
  title: 'Untitled Activity',
  domain: 'reading',
  description: 'Describe the purpose and target skills for this activity.',
  tags: [],
  passages: [
    {
      id: 'passage-1',
      title: 'Passage Title',
      content: 'Add passage text here.',
    },
  ],
  sequences: [
    {
      id: 'sequence-1',
      title: 'Main Idea',
      tasks: [
        {
          id: 'task-1',
          kind: 'comprehension',
          prompt: { type: 'text', value: 'What is the main idea?' },
          response: { type: 'short-answer', correct: 'Provide an exemplar response here.' },
          supports: [
            { level: 'independent', strategyNotes: ['Notes about open-ended facilitation.'] },
            { level: 'hint', hint: 'Provide a scaffolded hint.' },
            {
              level: 'choices',
              choices: [
                { id: 'choice-a', text: 'Correct choice' },
                { id: 'choice-b', text: 'Foil choice' },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const BlueprintWorkbench = () => {
  const initialTemplate = useMemo(() => createTemplate(), []);
  const [mode, setMode] = useState('form');
  const [draftObject, setDraftObject] = useState(initialTemplate);
  const [jsonDraft, setJsonDraft] = useState(() => JSON.stringify(initialTemplate, null, 2));
  const [jsonDirty, setJsonDirty] = useState(false);
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    if (!jsonDirty) {
      setJsonDraft(JSON.stringify(draftObject, null, 2));
    }
  }, [draftObject, jsonDirty]);

  const syncJsonToDraft = () => {
    try {
      const parsed = JSON.parse(jsonDraft);
      setDraftObject(parsed);
      setJsonDirty(false);
      return parsed;
    } catch (error) {
      setValidation({ status: 'invalid', messages: [error.message] });
      throw error;
    }
  };

  const getDefinition = () => {
    if (mode === 'json' && jsonDirty) {
      return syncJsonToDraft();
    }
    return draftObject;
  };

  const handleValidate = () => {
    try {
      const definition = getDefinition();
      const result = validateActivityDefinition(definition);
      setValidation({ status: result.valid ? 'valid' : 'invalid', messages: result.errors });
    } catch (error) {
      if (error instanceof SyntaxError) return;
      setValidation({ status: 'invalid', messages: [error.message] });
    }
  };

  const handleRegister = () => {
    try {
      const definition = getDefinition();
      const result = validateActivityDefinition(definition);
      if (!result.valid) {
        setValidation({ status: 'invalid', messages: result.errors });
        return;
      }
      const normalized = registerActivity(definition);
      setValidation({
        status: 'registered',
        messages: [`Registered activity ${normalized.id}. Open /next/activities/${normalized.id} to preview.`],
      });
    } catch (error) {
      if (error instanceof SyntaxError) return;
      setValidation({ status: 'invalid', messages: [error.message] });
    }
  };

  const handleDraftChange = (nextDraft) => {
    setDraftObject(nextDraft);
    setJsonDirty(false);
  };

  return (
    <div className="workbench">
      <header className="workbench__header">
        <div>
          <h1>Blueprint Workbench</h1>
          <p>Edit an activity definition using the new schema. Validate or register to preview with the prototype player.</p>
        </div>
        <Link to="/next" className="back-link">← Back</Link>
      </header>

      <div className="workbench__mode-toggle">
        <button
          type="button"
          className={mode === 'form' ? 'mode-button active' : 'mode-button'}
          onClick={() => setMode('form')}
        >
          Form Editor
        </button>
        <button
          type="button"
          className={mode === 'json' ? 'mode-button active' : 'mode-button'}
          onClick={() => {
            if (!jsonDirty) {
              setJsonDraft(JSON.stringify(draftObject, null, 2));
            }
            setMode('json');
          }}
        >
          JSON Editor
        </button>
      </div>

      {mode === 'form' ? (
        <div className="workbench__form">
          <BlueprintEditor draft={draftObject} onChange={handleDraftChange} />
        </div>
      ) : (
        <div className="workbench__editor">
          <textarea
            value={jsonDraft}
            onChange={(event) => {
              setJsonDraft(event.target.value);
              setJsonDirty(true);
            }}
          />
        </div>
      )}

      <div className="workbench__actions">
        <button type="button" onClick={handleValidate}>Validate</button>
        <button type="button" onClick={handleRegister}>Validate & Register</button>
        {mode === 'json' && jsonDirty && (
          <button type="button" onClick={syncJsonToDraft} className="secondary">
            Apply JSON changes
          </button>
        )}
      </div>

      {validation && (
        <div className={`workbench__status workbench__status--${validation.status}`}>
          <h2>Status: {validation.status}</h2>
          <ul>
            {validation.messages?.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlueprintWorkbench;
