import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './VocabularyMatchingBuilder.css';

const createEmptyPair = () => ({
  id: Date.now() + Math.random(),
  word: '',
  definition: '',
  example: ''
});

const defaultInstructions = 'Match each vocabulary word with the correct definition. Read the example sentence if you need extra clues!';

const VocabularyMatchingBuilder = ({ onPreview, onBack, editingActivity }) => {
  const [activity, setActivity] = useState({
    title: '',
    instructions: defaultInstructions,
    pairs: [createEmptyPair()]
  });
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  useEffect(() => {
    if (editingActivity && editingActivity.type === 'vocabulary-matching') {
      setActivity({
        title: editingActivity.title || '',
        instructions: editingActivity.instructions || defaultInstructions,
        pairs: (editingActivity.pairs && editingActivity.pairs.length > 0)
          ? editingActivity.pairs
          : [createEmptyPair()]
      });
    }
  }, [editingActivity]);

  const addPair = () => {
    setActivity(prev => ({
      ...prev,
      pairs: [...prev.pairs, createEmptyPair()]
    }));
  };

  const updatePair = (pairId, field, value) => {
    setActivity(prev => ({
      ...prev,
      pairs: prev.pairs.map(pair =>
        pair.id === pairId ? { ...pair, [field]: value } : pair
      )
    }));
  };

  const deletePair = (pairId) => {
    setActivity(prev => {
      if (prev.pairs.length === 1) {
        return prev;
      }

      return {
        ...prev,
        pairs: prev.pairs.filter(pair => pair.id !== pairId)
      };
    });
  };

  const saveActivity = () => {
    const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');
    const cleanedPairs = activity.pairs.filter(pair =>
      pair.word.trim() !== '' || pair.definition.trim() !== ''
    );

    const activityPayload = {
      ...activity,
      pairs: cleanedPairs.length > 0 ? cleanedPairs : [createEmptyPair()]
    };

    if (editingActivity && editingActivity.id) {
      const updatedActivity = {
        ...editingActivity,
        ...activityPayload,
        type: 'vocabulary-matching',
        updatedAt: new Date().toISOString()
      };

      const updatedActivities = activities.map(act =>
        act.id === editingActivity.id ? updatedActivity : act
      );

      localStorage.setItem('customActivities', JSON.stringify(updatedActivities));
      alert('Activity updated successfully!');
    } else {
      const newActivity = {
        ...activityPayload,
        id: Date.now(),
        type: 'vocabulary-matching',
        createdAt: new Date().toISOString()
      };
      activities.push(newActivity);
      localStorage.setItem('customActivities', JSON.stringify(activities));
      alert('Vocabulary activity saved!');
    }
  };

  const handlePreview = () => {
    const cleanedPairs = activity.pairs.filter(pair =>
      pair.word.trim() !== '' || pair.definition.trim() !== ''
    );

    onPreview?.({
      ...activity,
      pairs: cleanedPairs.length > 0 ? cleanedPairs : [createEmptyPair()],
      type: 'vocabulary-matching'
    });
  };

  return (
    <div className="vocabulary-matching-builder">
      <header className="activity-header">
        <div className="header-content">
          <h1>🔤 Vocabulary Matching Builder</h1>
          <div className="header-info">
            {editingActivity?.type === 'vocabulary-matching' ? '✏️ Editing Vocabulary Activity' : 'Create a word-definition matching activity'}
          </div>
          <div className="header-controls">
            <button onClick={onBack} className="icon-btn">
              ← Back to Wizard
            </button>
            <button onClick={handlePreview} className="icon-btn success">
              👁️ Preview
            </button>
            <button onClick={saveActivity} className="icon-btn success">
              💾 {editingActivity?.type === 'vocabulary-matching' ? 'Update' : 'Save'}
            </button>
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Icons
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`icon-btn ${editMode ? 'active' : ''}`}
            >
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="activity-info">
          <h2>📝 Activity Information</h2>
          <div className="form-group">
            <label>Activity Title:</label>
            <input
              type="text"
              value={activity.title}
              onChange={(e) => setActivity(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter activity title..."
            />
          </div>

          <div className="form-group">
            <label>Instructions for Students:</label>
            <textarea
              value={activity.instructions}
              onChange={(e) => setActivity(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Explain how students should match the words and definitions..."
              rows={3}
            />
          </div>
        </div>

        <div className="pairs-section">
          <div className="section-header">
            <h2>📚 Vocabulary Pairs ({activity.pairs.length})</h2>
            <button onClick={addPair} className="add-pair-btn">
              ➕ Add Pair
            </button>
          </div>

          {activity.pairs.length === 0 ? (
            <div className="empty-state">
              <p>No vocabulary words yet. Add at least 4 words to create a game.</p>
            </div>
          ) : (
            <div className="pairs-list">
              {activity.pairs.map((pair, index) => (
                <div key={pair.id} className={`pair-card ${editMode ? 'edit-mode' : ''}`}>
                  <div className="pair-header">
                    <h3>Word {index + 1}</h3>
                    {activity.pairs.length > 1 && (
                      <button onClick={() => deletePair(pair.id)} className="delete-pair-btn">
                        🗑️ Remove
                      </button>
                    )}
                  </div>

                  <div className="pair-body">
                    <div className="form-group">
                      <label>Vocabulary Word</label>
                      <input
                        type="text"
                        value={pair.word}
                        onChange={(e) => updatePair(pair.id, 'word', e.target.value)}
                        placeholder="e.g., predict"
                      />
                    </div>

                    <div className="form-group">
                      <label>Definition</label>
                      <textarea
                        value={pair.definition}
                        onChange={(e) => updatePair(pair.id, 'definition', e.target.value)}
                        placeholder="Describe the meaning in student-friendly language..."
                        rows={3}
                      />
                    </div>

                    <div className="form-group">
                      <label>Example Sentence (optional)</label>
                      <input
                        type="text"
                        value={pair.example || ''}
                        onChange={(e) => updatePair(pair.id, 'example', e.target.value)}
                        placeholder="Use the word in a sentence for context..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="activity-summary">
          <h3>📊 Activity Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{activity.pairs.length}</span>
              <span className="stat-label">Vocabulary Words</span>
            </div>
            <div className="stat">
              <span className="stat-number">{activity.pairs.filter(pair => pair.example?.trim()).length}</span>
              <span className="stat-label">Example Sentences</span>
            </div>
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

export default VocabularyMatchingBuilder;
