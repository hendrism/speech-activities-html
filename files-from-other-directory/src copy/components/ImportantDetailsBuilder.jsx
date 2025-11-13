import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ImportantDetailsBuilder.css';

const ImportantDetailsBuilder = ({ onPreview, onBack, editingActivity }) => {
  const [activity, setActivity] = useState({
    title: '',
    stories: [{ id: 1, title: '', content: '', details: [] }],
    instructions: 'Read each story and sort the details into "Important" and "Not Important" categories.'
  });

  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  useEffect(() => {
    // If we're editing an existing activity, load its data
    if (editingActivity) {
      setActivity({
        title: editingActivity.title || '',
        stories: editingActivity.stories || [{ id: 1, title: '', content: '', details: [] }],
        instructions: editingActivity.instructions || 'Read each story and sort the details into "Important" and "Not Important" categories.'
      });
    }
  }, [editingActivity]);

  const addStory = () => {
    const newStory = {
      id: Date.now(),
      title: '',
      content: '',
      details: []
    };
    setActivity(prev => ({
      ...prev,
      stories: [...prev.stories, newStory]
    }));
  };

  const updateStory = (storyId, field, value) => {
    setActivity(prev => ({
      ...prev,
      stories: prev.stories.map(story =>
        story.id === storyId ? { ...story, [field]: value } : story
      )
    }));
  };

  const deleteStory = (storyId) => {
    if (activity.stories.length > 1) {
      setActivity(prev => ({
        ...prev,
        stories: prev.stories.filter(story => story.id !== storyId)
      }));
    }
  };

  const addDetail = (storyId) => {
    const newDetail = {
      id: Date.now(),
      text: '',
      category: 'important' // 'important' or 'not-important'
    };

    setActivity(prev => ({
      ...prev,
      stories: prev.stories.map(story =>
        story.id === storyId
          ? { ...story, details: [...story.details, newDetail] }
          : story
      )
    }));
  };

  const updateDetail = (storyId, detailId, field, value) => {
    setActivity(prev => ({
      ...prev,
      stories: prev.stories.map(story =>
        story.id === storyId
          ? {
              ...story,
              details: story.details.map(detail =>
                detail.id === detailId ? { ...detail, [field]: value } : detail
              )
            }
          : story
      )
    }));
  };

  const deleteDetail = (storyId, detailId) => {
    setActivity(prev => ({
      ...prev,
      stories: prev.stories.map(story =>
        story.id === storyId
          ? { ...story, details: story.details.filter(detail => detail.id !== detailId) }
          : story
      )
    }));
  };

  const saveActivity = () => {
    const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');

    if (editingActivity && editingActivity.id) {
      // Update existing activity
      const updatedActivity = {
        ...editingActivity,
        ...activity,
        type: 'important-details',
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
        type: 'important-details',
        createdAt: new Date().toISOString()
      };
      activities.push(newActivity);
      localStorage.setItem('customActivities', JSON.stringify(activities));
      alert('Activity saved!');
    }
  };

  const handlePreview = () => {
    onPreview({
      ...activity,
      type: 'important-details'
    });
  };

  const renderStoryBuilder = (story, storyIndex) => (
    <div key={story.id} className="story-builder">
      <div className="story-header">
        <h3>📖 Story {storyIndex + 1}</h3>
        {activity.stories.length > 1 && (
          <button
            onClick={() => deleteStory(story.id)}
            className="delete-story-btn"
          >
            🗑️ Delete Story
          </button>
        )}
      </div>

      <div className="form-group">
        <label>Story Title:</label>
        <input
          type="text"
          value={story.title}
          onChange={(e) => updateStory(story.id, 'title', e.target.value)}
          placeholder="Enter story title..."
        />
      </div>

      <div className="form-group">
        <label>Story Content:</label>
        <textarea
          value={story.content}
          onChange={(e) => updateStory(story.id, 'content', e.target.value)}
          placeholder="Enter the story text here..."
          rows={6}
        />
      </div>

      <div className="details-section">
        <div className="details-header">
          <h4>📝 Details to Sort ({story.details.length}/6 recommended)</h4>
          <button
            onClick={() => addDetail(story.id)}
            className="add-detail-btn"
          >
            ➕ Add Detail
          </button>
        </div>

        {story.details.length === 0 && (
          <div className="empty-details">
            <p>No details added yet. Add 6 details for students to sort.</p>
          </div>
        )}

        <div className="details-list">
          {story.details.map((detail, detailIndex) => (
            <div key={detail.id} className="detail-builder">
              <div className="detail-number">Detail {detailIndex + 1}</div>

              <div className="detail-content">
                <div className="form-group">
                  <label>Detail Text:</label>
                  <textarea
                    value={detail.text}
                    onChange={(e) => updateDetail(story.id, detail.id, 'text', e.target.value)}
                    placeholder="Enter the detail here..."
                    rows={2}
                  />
                </div>

                <div className="form-group">
                  <label>Correct Category:</label>
                  <div className="category-selector">
                    <button
                      className={`category-btn important ${detail.category === 'important' ? 'selected' : ''}`}
                      onClick={() => updateDetail(story.id, detail.id, 'category', 'important')}
                    >
                      ⭐ Important
                    </button>
                    <button
                      className={`category-btn not-important ${detail.category === 'not-important' ? 'selected' : ''}`}
                      onClick={() => updateDetail(story.id, detail.id, 'category', 'not-important')}
                    >
                      ➖ Not Important
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteDetail(story.id, detail.id)}
                className="delete-detail-btn"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {story.details.length > 0 && (
          <div className="details-summary">
            <div className="summary-item">
              Important: {story.details.filter(d => d.category === 'important').length}
            </div>
            <div className="summary-item">
              Not Important: {story.details.filter(d => d.category === 'not-important').length}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="important-details-builder">
      <header className="activity-header">
        <div className="header-content">
          <h1>🎯 Important Details Activity Builder</h1>
          <div className="header-info">
            {editingActivity ? '✏️ Editing Activity' : 'Drag & Drop Sorting Activity'}
          </div>
          <div className="header-controls">
            <button onClick={onBack} className="icon-btn">
              ← Back to Wizard
            </button>
            <button onClick={handlePreview} className="icon-btn success">
              👁️ Preview
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
        {/* Activity Information */}
        <div className="activity-info">
          <h2>📋 Activity Settings</h2>

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
              placeholder="Enter instructions..."
              rows={3}
            />
          </div>
        </div>

        {/* Stories */}
        <div className="stories-section">
          <div className="section-header">
            <h2>📚 Stories ({activity.stories.length})</h2>
            <button onClick={addStory} className="add-story-btn">
              ➕ Add Story
            </button>
          </div>

          {activity.stories.map((story, index) => renderStoryBuilder(story, index))}
        </div>

        {/* Activity Summary */}
        <div className="activity-summary">
          <h3>📊 Activity Summary</h3>
          <div className="summary-stats">
            <div className="stat">
              <span className="stat-number">{activity.stories.length}</span>
              <span className="stat-label">Stories</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {activity.stories.reduce((total, story) => total + story.details.length, 0)}
              </span>
              <span className="stat-label">Total Details</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {activity.stories.reduce((total, story) =>
                  total + story.details.filter(d => d.category === 'important').length, 0
                )}
              </span>
              <span className="stat-label">Important</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {activity.stories.reduce((total, story) =>
                  total + story.details.filter(d => d.category === 'not-important').length, 0
                )}
              </span>
              <span className="stat-label">Not Important</span>
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

export default ImportantDetailsBuilder;