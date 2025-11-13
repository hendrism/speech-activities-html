import React, { useState } from 'react';
import './ActivityWizard.css';

const ActivityWizard = ({ onSelectTemplate, onCancel }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const activityTemplates = [
    {
      id: 'reading-comprehension',
      name: 'Reading Comprehension',
      icon: '📚',
      description: 'Stories with multiple choice, text input, and true/false questions',
      color: '#8b5cf6',
      features: ['Multiple stories', 'Various question types', 'Progressive help system'],
      questionTypes: ['Multiple Choice', 'Text Input', 'True/False']
    },
    {
      id: 'important-details',
      name: 'Important Details Sorting',
      icon: '🎯',
      description: 'Students sort details into "Important" and "Not Important" categories',
      color: '#10b981',
      features: ['Drag & drop sorting', 'Multiple stories', 'Detail categorization'],
      questionTypes: ['Drag & Drop Sorting']
    },
    {
      id: 'sequence-ordering',
      name: 'Sequence Ordering',
      icon: '📋',
      description: 'Students sort story events into beginning, middle, and end',
      color: '#f59e0b',
      features: ['Story sequence ordering', 'Progressive help system', 'Text input → Drag & drop'],
      questionTypes: ['Text Input', 'Drag & Drop Sorting']
    },
    {
      id: 'vocabulary-matching',
      name: 'Vocabulary Matching',
      icon: '🔤',
      description: 'Match vocabulary words to their definitions and example sentences',
      color: '#ef4444',
      features: ['Word-definition matching', 'Optional example sentences', 'Shuffle + reset controls'],
      questionTypes: ['Matching', 'Multiple Choice (planned)']
    },
    {
      id: 'categorization',
      name: 'Categorization Activity',
      icon: '📊',
      description: 'Sort items into different categories or groups',
      color: '#3b82f6',
      features: ['Multiple categories', 'Flexible grouping', 'Visual feedback'],
      questionTypes: ['Drag & Drop Categorization']
    },
    {
      id: 'custom-mixed',
      name: 'Custom Mixed Activity',
      icon: '🛠️',
      description: 'Build your own activity with any combination of question types',
      color: '#6b7280',
      features: ['Full flexibility', 'Mix any question types', 'Custom structure'],
      questionTypes: ['All Types Available']
    }
  ];

  const handleCreateActivity = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
    }
  };

  return (
    <div className="activity-wizard">
      <div className="wizard-content">
        <div className="wizard-header">
          <h2>🪄 Activity Creation Wizard</h2>
          <p>Choose the type of activity you want to create:</p>
        </div>

        <div className="templates-grid">
          {activityTemplates.map(template => (
            <div
              key={template.id}
              className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
              onClick={() => setSelectedTemplate(template)}
              style={{ '--template-color': template.color }}
            >
              <div className="template-icon">{template.icon}</div>
              <h3 className="template-name">{template.name}</h3>
              <p className="template-description">{template.description}</p>

              <div className="template-features">
                <h4>Features:</h4>
                <ul>
                  {template.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="template-question-types">
                <h4>Question Types:</h4>
                <div className="question-types-list">
                  {template.questionTypes.map((type, index) => (
                    <span key={index} className="question-type-tag">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTemplate && (
          <div className="selection-preview">
            <div className="selected-template">
              <h3>Selected: {selectedTemplate.icon} {selectedTemplate.name}</h3>
              <p>{selectedTemplate.description}</p>
            </div>
          </div>
        )}

        <div className="wizard-actions">
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button
            onClick={handleCreateActivity}
            className="create-btn primary"
            disabled={!selectedTemplate}
          >
            Create Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityWizard;
