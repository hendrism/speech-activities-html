import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './StoryRetellingWorksheet.css';

const StoryRetellingWorksheet = () => {
  const [responses, setResponses] = useState({
    first: '',
    next: '',
    then: '',
    afterThat: '',
    finally: ''
  });
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const handleResponseChange = (sectionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [sectionId]: value
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    if (window.confirm('Clear all responses? This cannot be undone.')) {
      setResponses({
        first: '',
        next: '',
        then: '',
        afterThat: '',
        finally: ''
      });
    }
  };

  const sections = [
    { id: 'first', label: 'First,', prompt: 'What happened at the beginning of the story?' },
    { id: 'next', label: 'Next,', prompt: 'What happened next?' },
    { id: 'then', label: 'Then,', prompt: 'What happened after that?' },
    { id: 'afterThat', label: 'After that,', prompt: 'What happened later in the story?' },
    { id: 'finally', label: 'Finally,', prompt: 'How did the story end?' }
  ];

  return (
    <div className="story-retelling-worksheet">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>📖 Story Retelling Worksheet</h1>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={handleClear} className="warning">
              🗑️ Clear All
            </button>
            <button onClick={handlePrint} className="primary">
              🖨️ Print
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="worksheet-container">
          <div className="worksheet-header">
            <h2 className="worksheet-title">Story Retelling Worksheet</h2>
            <p className="worksheet-subtitle">Use the sentence starters to retell your story in order!</p>
          </div>

          {sections.map((section) => (
            <div key={section.id} className="story-section">
              <div className="sentence-starter">{section.label}</div>
              <textarea
                className="writing-area"
                value={responses[section.id]}
                onChange={(e) => handleResponseChange(section.id, e.target.value)}
                placeholder={section.prompt}
              />
            </div>
          ))}

          <div className="instructions-footer no-print">
            <p>💡 <strong>Tip:</strong> Fill out this worksheet on screen or print it blank to write by hand!</p>
          </div>
        </div>
      </main>

      <IconManager
        isOpen={iconPanelOpen}
        onClose={() => setIconPanelOpen(false)}
        iconManager={iconManager}
      />
    </div>
  );
};

export default StoryRetellingWorksheet;
