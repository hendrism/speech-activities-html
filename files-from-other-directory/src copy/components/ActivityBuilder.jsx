import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ActivityBuilder.css';

const ActivityBuilder = ({ template, onBack, editingActivity }) => {
  const [activity, setActivity] = useState({
    title: '',
    content: '',
    questions: []
  });

  const [currentMode, setCurrentMode] = useState('build'); // 'build' or 'preview'
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  useEffect(() => {
    // If we're editing an existing activity, load its data
    if (editingActivity) {
      setActivity({
        title: editingActivity.title || '',
        content: editingActivity.content || '',
        questions: editingActivity.questions || []
      });
    }
  }, [editingActivity]);

  const questionTypes = [
    { id: 'multiple-choice', name: 'Multiple Choice', icon: '🎯' },
    { id: 'text-input', name: 'Text Input', icon: '✏️' },
    { id: 'true-false', name: 'True/False', icon: '✓❌' },
    { id: 'drag-drop', name: 'Drag & Drop', icon: '🔄' }
  ];

  const helpLevels = [
    { id: 'text-only', name: 'Text Box Only', description: 'Start with text input' },
    { id: 'hint-first', name: 'Hint → Choices', description: 'Text box → hint → multiple choice' },
    { id: 'choices-only', name: 'Choices Only', description: 'Start with multiple choice' }
  ];

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      type: 'multiple-choice',
      question: '',
      hint: '',
      answer: '',
      choices: ['', '', '', ''],
      helpLevel: 'hint-first'
    };

    setActivity(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (questionId, field, value) => {
    setActivity(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const updateChoice = (questionId, choiceIndex, value) => {
    setActivity(prev => ({
      ...prev,
      questions: prev.questions.map(q =>
        q.id === questionId
          ? {
              ...q,
              choices: q.choices.map((choice, index) =>
                index === choiceIndex ? value : choice
              )
            }
          : q
      )
    }));
  };

  const deleteQuestion = (questionId) => {
    setActivity(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const saveActivity = () => {
    const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');

    if (editingActivity && editingActivity.id) {
      // Update existing activity
      const updatedActivity = {
        ...editingActivity,
        ...activity,
        type: 'reading-comprehension',
        updatedAt: new Date().toISOString()
      };

      const updatedActivities = activities.map(act =>
        act.id === editingActivity.id ? updatedActivity : act
      );

      localStorage.setItem('customActivities', JSON.stringify(updatedActivities));
      alert('Activity updated successfully!');
    } else {
      // Create new activity
      const newActivity = {
        ...activity,
        id: Date.now(),
        type: 'reading-comprehension',
        createdAt: new Date().toISOString()
      };
      activities.push(newActivity);
      localStorage.setItem('customActivities', JSON.stringify(activities));
      alert('Activity saved!');
    }
  };

  const loadActivity = () => {
    const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');
    if (activities.length > 0) {
      // For prototype, just load the first one
      setActivity(activities[0]);
      alert('Activity loaded!');
    } else {
      alert('No saved activities found');
    }
  };

  const renderQuestionBuilder = (question) => (
    <div key={question.id} className="question-builder">
      <div className="question-header">
        <h4>Question {activity.questions.indexOf(question) + 1}</h4>
        <button
          onClick={() => deleteQuestion(question.id)}
          className="delete-btn"
        >
          🗑️ Delete
        </button>
      </div>

      <div className="form-group">
        <label>Question Type:</label>
        <select
          value={question.type}
          onChange={(e) => updateQuestion(question.id, 'type', e.target.value)}
        >
          {questionTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.icon} {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Question Text:</label>
        <textarea
          value={question.question}
          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
          placeholder="Enter your question here..."
          rows={2}
        />
      </div>

      <div className="form-group">
        <label>Hint/Clue:</label>
        <textarea
          value={question.hint}
          onChange={(e) => updateQuestion(question.id, 'hint', e.target.value)}
          placeholder="Enter a helpful hint for this question..."
          rows={2}
        />
      </div>

      <div className="form-group">
        <label>Help System:</label>
        <select
          value={question.helpLevel}
          onChange={(e) => updateQuestion(question.id, 'helpLevel', e.target.value)}
        >
          {helpLevels.map(level => (
            <option key={level.id} value={level.id}>
              {level.name} - {level.description}
            </option>
          ))}
        </select>
      </div>

      {(question.type === 'multiple-choice' || question.helpLevel === 'hint-first') && (
        <div className="form-group">
          <label>Answer Choices:</label>
          <div className="choices-builder">
            {question.choices.map((choice, index) => (
              <div key={index} className="choice-input">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => updateChoice(question.id, index, e.target.value)}
                  placeholder={`Choice ${index + 1}`}
                />
                <input
                  type="radio"
                  name={`correct-${question.id}`}
                  checked={question.answer === choice}
                  onChange={() => updateQuestion(question.id, 'answer', choice)}
                />
                <label>Correct</label>
              </div>
            ))}
          </div>
        </div>
      )}

      {question.type === 'text-input' && (
        <div className="form-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            value={question.answer}
            onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
            placeholder="Enter the correct answer"
          />
        </div>
      )}

      {question.type === 'true-false' && (
        <div className="form-group">
          <label>Correct Answer:</label>
          <select
            value={question.answer}
            onChange={(e) => updateQuestion(question.id, 'answer', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      )}
    </div>
  );

  const renderPreview = () => (
    <div className="activity-preview">
      <h2>{activity.title || 'Untitled Activity'}</h2>

      {activity.content && (
        <div className="content-preview">
          <div className="story-text">
            <p>{activity.content}</p>
          </div>
        </div>
      )}

      <div className="questions-preview">
        {activity.questions.map((question, index) => (
          <div key={question.id} className="question-preview">
            <h4>Question {index + 1}</h4>
            <p className="question-text">{question.question}</p>

            {question.hint && (
              <div className="hint-preview">
                <strong>💡 Hint:</strong> {question.hint}
              </div>
            )}

            <div className="help-level-info">
              <strong>Help System:</strong> {helpLevels.find(h => h.id === question.helpLevel)?.name}
            </div>

            {question.type === 'multiple-choice' && question.choices.some(c => c) && (
              <div className="choices-preview">
                {question.choices.filter(c => c).map((choice, idx) => (
                  <div key={idx} className={`choice-preview ${choice === question.answer ? 'correct' : ''}`}>
                    {choice} {choice === question.answer ? '✓' : ''}
                  </div>
                ))}
              </div>
            )}

            {question.type === 'text-input' && (
              <div className="answer-preview">
                <strong>Expected Answer:</strong> {question.answer}
              </div>
            )}

            {question.type === 'true-false' && (
              <div className="answer-preview">
                <strong>Correct Answer:</strong> {question.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="activity-builder">
      <header className="activity-header">
        <div className="header-content">
          <h1>🛠️ Activity Builder</h1>
          <div className="header-info">
            {editingActivity ? '✏️ Editing Activity' : 'Create Reading Comprehension Activity'}
          </div>
          <div className="mode-selector">
            <button
              className={`mode-btn ${currentMode === 'build' ? 'active' : ''}`}
              onClick={() => setCurrentMode('build')}
            >
              🛠️ Build
            </button>
            <button
              className={`mode-btn ${currentMode === 'preview' ? 'active' : ''}`}
              onClick={() => setCurrentMode('preview')}
            >
              👁️ Preview
            </button>
          </div>
          <div className="header-controls">
            {onBack && (
              <button onClick={onBack} className="icon-btn">
                ← Back to Wizard
              </button>
            )}
            <button onClick={loadActivity} className="icon-btn">
              📂 Load
            </button>
            <button onClick={saveActivity} className="icon-btn success">
              💾 {editingActivity ? 'Update' : 'Save'}
            </button>
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Icons
            </button>
            <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {currentMode === 'build' ? (
          <div className="builder-content">
            {/* Activity Info */}
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
                <label>Content (Story, Reading Passage, etc.):</label>
                <textarea
                  value={activity.content}
                  onChange={(e) => setActivity(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter the main content for your activity..."
                  rows={8}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="questions-section">
              <div className="section-header">
                <h2>❓ Questions</h2>
                <button onClick={addQuestion} className="add-btn">
                  ➕ Add Question
                </button>
              </div>

              {activity.questions.length === 0 && (
                <div className="empty-state">
                  <p>No questions yet. Click "Add Question" to get started!</p>
                </div>
              )}

              {activity.questions.map(renderQuestionBuilder)}
            </div>
          </div>
        ) : (
          renderPreview()
        )}
      </main>

      <IconManager
        isOpen={iconPanelOpen}
        onClose={() => setIconPanelOpen(false)}
        iconManager={iconManager}
      />
    </div>
  );
};

export default ActivityBuilder;