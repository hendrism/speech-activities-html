import React, { useMemo, useState } from 'react';
import './StoryGrammarOrganizer.css';

const STORY_ELEMENTS = [
  {
    id: 'characters',
    icon: '👥',
    label: 'Characters',
    prompt: 'Who is in the story?',
    helper: 'List the people, animals, or living things in the story.'
  },
  {
    id: 'setting',
    icon: '📍',
    label: 'Setting',
    prompt: 'Where did the story take place?',
    helper: 'Describe the time and place where the story happens.'
  },
  {
    id: 'feelings',
    icon: '💗',
    label: 'Feelings',
    prompt: 'How did the character feel throughout the story?',
    helper: 'Explain how the characters felt about the events.'
  },
  {
    id: 'liftoff',
    icon: '🚀',
    label: 'Liftoff',
    prompt: 'How did the story start?',
    helper: 'Share the event that got the story started.'
  },
  {
    id: 'problem',
    icon: '⚠️',
    label: 'Problem',
    prompt: 'What went wrong?',
    helper: 'Describe what went wrong for the character.'
  },
  {
    id: 'plan',
    icon: '📝',
    label: 'Plan',
    prompt: 'What did the character think would fix the problem?',
    helper: 'Explain what the character planned to do.'
  },
  {
    id: 'action',
    icon: '🏃‍♂️',
    label: 'Action',
    prompt: 'What did the character do to try & solve the problem?',
    helper: 'List the actions the character took.'
  },
  {
    id: 'solution',
    icon: '✅',
    label: 'Solution',
    prompt: 'How was the problem fixed?',
    helper: 'Describe how the problem was solved.'
  },
  {
    id: 'wrapUp',
    icon: '🎬',
    label: 'Wrap-up',
    prompt: 'How did the story end?',
    helper: 'Explain how the story wrapped up or the lesson learned.'
  }
];

const StoryGrammarOrganizer = () => {
  const [selectedElements, setSelectedElements] = useState(() =>
    STORY_ELEMENTS.reduce((acc, element) => ({ ...acc, [element.id]: false }), {})
  );
  const [responses, setResponses] = useState(() =>
    STORY_ELEMENTS.reduce((acc, element) => ({ ...acc, [element.id]: '' }), {})
  );

  const selectedCount = useMemo(
    () => Object.values(selectedElements).filter(Boolean).length,
    [selectedElements]
  );

  const handleToggle = (id) => {
    setSelectedElements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = () => {
    setSelectedElements(STORY_ELEMENTS.reduce((acc, element) => ({ ...acc, [element.id]: true }), {}));
  };

  const handleSelectNone = () => {
    setSelectedElements(STORY_ELEMENTS.reduce((acc, element) => ({ ...acc, [element.id]: false }), {}));
  };

  const handleResponseChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleClearResponses = () => {
    if (window.confirm('Clear all text boxes? This cannot be undone.')) {
      setResponses(STORY_ELEMENTS.reduce((acc, element) => ({ ...acc, [element.id]: '' }), {}));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="story-grammar-organizer">
      <header className="sgo-header no-print">
        <div className="header-content">
          <h1>🧩 Story Grammar Graphic Organizer</h1>
          <div className="header-actions">
            <button className="secondary-btn" onClick={handleSelectAll}>
              ✓ Select All
            </button>
            <button className="secondary-btn" onClick={handleSelectNone}>
              ✕ Clear Selection
            </button>
            <button className="secondary-btn" onClick={handleClearResponses}>
              🧽 Clear Text
            </button>
            <button className="primary-btn" onClick={handlePrint}>
              🖨️ Print
            </button>
          </div>
        </div>
      </header>

      <main className="sgo-main">
        <section className="element-toolbar no-print">
          <div className="toolbar-header">
            <div>
              <h2>Select Story Elements</h2>
              <p className="picker-info">
                Choose the elements you want on your organizer. You currently have{' '}
                <strong>{selectedCount}</strong> selected.
              </p>
            </div>
          </div>

          <div className="element-chip-grid">
            {STORY_ELEMENTS.map((element) => {
              const isSelected = selectedElements[element.id];
              return (
                <button
                  key={element.id}
                  type="button"
                  className={`element-chip ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleToggle(element.id)}
                  title={element.helper}
                >
                  <span className="chip-icon">{element.icon}</span>
                  <span className="chip-label">{element.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="worksheet-preview">
          <div className="preview-header">
            <h2>Story Organizer</h2>
            <p>Fill in each box to capture the parts of your story.</p>
          </div>

          <div className="text-box-grid">
            {STORY_ELEMENTS.filter((element) => selectedElements[element.id]).map((element) => (
              <div key={element.id} className="text-box-card">
                <div className="text-box-header">
                  <span className="text-box-icon">{element.icon}</span>
                  <h3>{element.label}</h3>
                </div>
                <textarea
                  value={responses[element.id]}
                  onChange={(e) => handleResponseChange(element.id, e.target.value)}
                  placeholder={element.prompt}
                  rows={4}
                />
              </div>
            ))}

            {selectedCount === 0 && (
              <div className="empty-state">
                <p>Select elements on the left to build your story organizer.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StoryGrammarOrganizer;
