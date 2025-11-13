import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './SequenceOrderingBuilder.css';

const SequenceOrderingBuilder = ({ onPreview, onBack, editingActivity }) => {
  const [activity, setActivity] = useState({
    title: '',
    stories: [{ id: 1, title: '', content: '', events: [] }],
    instructions: 'Read each story and sort the events into the correct order: Beginning, Middle, and End.'
  });

  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  useEffect(() => {
    // If we're editing an existing activity, load its data
    if (editingActivity) {
      setActivity({
        title: editingActivity.title || '',
        stories: editingActivity.stories || [{ id: 1, title: '', content: '', events: [] }],
        instructions: editingActivity.instructions || 'Read each story and sort the events into the correct order: Beginning, Middle, and End.'
      });
    }
  }, [editingActivity]);

  const addStory = () => {
    const newStory = {
      id: Date.now(),
      title: '',
      content: '',
      events: []
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

  const addEvent = (storyId) => {
    const newEvent = {
      id: Date.now(),
      text: '',
      sequence: 'beginning', // 'beginning', 'middle', or 'end'
      starter: '' // sentence starter for text input mode
    };

    setActivity(prev => ({
      ...prev,
      stories: prev.stories.map(story =>
        story.id === storyId
          ? { ...story, events: [...story.events, newEvent] }
          : story
      )
    }));
  };

  const updateEvent = (storyId, eventId, field, value) => {
    setActivity(prev => ({
      ...prev,
      stories: prev.stories.map(story =>
        story.id === storyId
          ? {
              ...story,
              events: story.events.map(event =>
                event.id === eventId ? { ...event, [field]: value } : event
              )
            }
          : story
      )
    }));
  };

  const deleteEvent = (storyId, eventId) => {
    setActivity(prev => ({
      ...prev,
      stories: prev.stories.map(story =>
        story.id === storyId
          ? { ...story, events: story.events.filter(event => event.id !== eventId) }
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
        type: 'sequence-ordering',
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
        type: 'sequence-ordering',
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
      type: 'sequence-ordering'
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

      <div className="events-section">
        <div className="events-header">
          <h4>📝 Story Events ({story.events.length}/6 recommended)</h4>
          <button
            onClick={() => addEvent(story.id)}
            className="add-event-btn"
          >
            ➕ Add Event
          </button>
        </div>

        {story.events.length === 0 && (
          <div className="empty-events">
            <p>No events added yet. Add 4-6 events for students to sequence.</p>
          </div>
        )}

        <div className="events-list">
          {story.events.map((event, eventIndex) => (
            <div key={event.id} className="event-builder">
              <div className="event-number">Event {eventIndex + 1}</div>

              <div className="event-content">
                <div className="form-group">
                  <label>Event Description:</label>
                  <textarea
                    value={event.text}
                    onChange={(e) => updateEvent(story.id, event.id, 'text', e.target.value)}
                    placeholder="Describe what happens in this event..."
                    rows={2}
                  />
                </div>

                <div className="form-group">
                  <label>Sentence Starter (for text input mode):</label>
                  <input
                    type="text"
                    value={event.starter}
                    onChange={(e) => updateEvent(story.id, event.id, 'starter', e.target.value)}
                    placeholder="e.g., 'In the beginning, ...' or 'First, ...'"
                  />
                </div>

                <div className="form-group">
                  <label>Correct Position:</label>
                  <div className="sequence-selector">
                    <button
                      className={`sequence-btn beginning ${event.sequence === 'beginning' ? 'selected' : ''}`}
                      onClick={() => updateEvent(story.id, event.id, 'sequence', 'beginning')}
                    >
                      🏁 Beginning
                    </button>
                    <button
                      className={`sequence-btn middle ${event.sequence === 'middle' ? 'selected' : ''}`}
                      onClick={() => updateEvent(story.id, event.id, 'sequence', 'middle')}
                    >
                      🏃 Middle
                    </button>
                    <button
                      className={`sequence-btn end ${event.sequence === 'end' ? 'selected' : ''}`}
                      onClick={() => updateEvent(story.id, event.id, 'sequence', 'end')}
                    >
                      🏁 End
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteEvent(story.id, event.id)}
                className="delete-event-btn"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {story.events.length > 0 && (
          <div className="events-summary">
            <div className="summary-item">
              Beginning: {story.events.filter(e => e.sequence === 'beginning').length}
            </div>
            <div className="summary-item">
              Middle: {story.events.filter(e => e.sequence === 'middle').length}
            </div>
            <div className="summary-item">
              End: {story.events.filter(e => e.sequence === 'end').length}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="sequence-ordering-builder">
      <header className="activity-header">
        <div className="header-content">
          <h1>📋 Sequence Ordering Activity Builder</h1>
          <div className="header-info">
            {editingActivity ? '✏️ Editing Activity' : 'Story Event Sequencing Activity'}
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
                {activity.stories.reduce((total, story) => total + story.events.length, 0)}
              </span>
              <span className="stat-label">Total Events</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {activity.stories.reduce((total, story) =>
                  total + story.events.filter(e => e.sequence === 'beginning').length, 0
                )}
              </span>
              <span className="stat-label">Beginning</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {activity.stories.reduce((total, story) =>
                  total + story.events.filter(e => e.sequence === 'middle').length, 0
                )}
              </span>
              <span className="stat-label">Middle</span>
            </div>
            <div className="stat">
              <span className="stat-number">
                {activity.stories.reduce((total, story) =>
                  total + story.events.filter(e => e.sequence === 'end').length, 0
                )}
              </span>
              <span className="stat-label">End</span>
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

export default SequenceOrderingBuilder;