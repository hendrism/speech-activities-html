import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './StoryElementsWorksheet.css';

const StoryElementsWorksheet = () => {
  const [formData, setFormData] = useState({
    characters: '',
    setting: '',
    problem: '',
    solution: ''
  });
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData({
        characters: '',
        setting: '',
        problem: '',
        solution: ''
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="story-elements-worksheet">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>📖 Story Elements Worksheet</h1>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={handlePrint} className="print-btn">
              🖨️ Print
            </button>
            <button onClick={handleClear} className="clear-btn">
              🗑️ Clear Form
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="worksheet-container">
          <h1 className="print-title">📖 Story Elements Worksheet</h1>

          <div className="instructions no-print">
            <p>Use this worksheet to organize the key elements of a story. Fill in each section with details about the characters, setting, problem, and solution.</p>
          </div>

          <form className="story-form">
            <div className="form-group">
              <label htmlFor="characters">Character(s):</label>
              <input
                type="text"
                id="characters"
                value={formData.characters}
                onChange={(e) => handleChange('characters', e.target.value)}
                placeholder="Who is in your story?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="setting">Setting:</label>
              <input
                type="text"
                id="setting"
                value={formData.setting}
                onChange={(e) => handleChange('setting', e.target.value)}
                placeholder="Where and when does your story take place?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="problem">Problem:</label>
              <textarea
                id="problem"
                value={formData.problem}
                onChange={(e) => handleChange('problem', e.target.value)}
                placeholder="What challenge or conflict do the characters face?"
                rows="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="solution">Solution:</label>
              <textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => handleChange('solution', e.target.value)}
                placeholder="How is the problem solved?"
                rows="5"
              />
            </div>
          </form>

          <div className="tips-section no-print">
            <h3>💡 Tips for Story Elements</h3>
            <ul>
              <li><strong>Character(s):</strong> Include the main character(s) and important supporting characters</li>
              <li><strong>Setting:</strong> Describe both the place (where) and time (when) the story happens</li>
              <li><strong>Problem:</strong> What challenge, conflict, or goal does the main character face?</li>
              <li><strong>Solution:</strong> How does the character solve the problem or reach their goal?</li>
            </ul>
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

export default StoryElementsWorksheet;
