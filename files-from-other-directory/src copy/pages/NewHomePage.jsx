import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { activityCategories, getActivitiesByCategory } from '../data/activities';
import { exportActivities, importActivities, backupActivities } from '../utils/activityStorage';
import './NewHomePage.css';

const NewHomePage = () => {
  const [customActivities, setCustomActivities] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load custom activities from localStorage
    const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');
    setCustomActivities(activities);
  }, []);

  const deleteCustomActivity = (activityId) => {
    const activities = customActivities.filter(activity => activity.id !== activityId);
    setCustomActivities(activities);
    localStorage.setItem('customActivities', JSON.stringify(activities));
  };

  const playCustomActivity = (activity) => {
    // Store the activity in sessionStorage for the player to access
    sessionStorage.setItem('currentActivity', JSON.stringify(activity));
    // Redirect to a custom activity player page
    window.location.href = `/play-custom-activity`;
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const result = await importActivities(file);
      const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');
      setCustomActivities(activities);

      alert(`Import successful!\n${result.imported} new activities imported\n${result.skipped} duplicates skipped\nTotal activities: ${result.total}`);
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    }

    // Reset file input
    event.target.value = '';
  };

  const refreshActivities = () => {
    const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');
    setCustomActivities(activities);
  };

  const CustomActivityCard = ({ activity }) => (
    <div className="custom-activity-card">
      <div className="custom-activity-header">
        <div className="custom-activity-icon">
          {activity.type === 'important-details' ? '🎯' :
           activity.type === 'sequence-ordering' ? '📋' :
           activity.type === 'vocabulary-matching' ? '🔤' :
           activity.type === 'categorization' ? '📊' : '📚'}
        </div>
        <div className="custom-activity-info">
          <h3>{activity.title || 'Untitled Activity'}</h3>
          <div className="custom-activity-meta">
            <span className="activity-type">
              {activity.type === 'important-details' ? 'Details Sorting' :
               activity.type === 'sequence-ordering' ? 'Sequence Ordering' :
               activity.type === 'vocabulary-matching' ? 'Vocabulary Matching' :
               activity.type === 'categorization' ? 'Categorization' : 'Reading Activity'}
            </span>
            <span className="creation-date">
              {new Date(activity.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="custom-activity-stats">
        {activity.type === 'important-details' ? (
          <>
            <span>{activity.stories?.length || 0} stories</span>
            <span>
              {activity.stories?.reduce((total, story) => total + (story.details?.length || 0), 0) || 0} details
            </span>
          </>
        ) : activity.type === 'sequence-ordering' ? (
          <>
            <span>{activity.stories?.length || 0} stories</span>
            <span>
              {activity.stories?.reduce((total, story) => total + (story.events?.length || 0), 0) || 0} events
            </span>
          </>
        ) : activity.type === 'vocabulary-matching' ? (
          <>
            <span>{activity.pairs?.length || 0} words</span>
            <span>
              {activity.pairs?.filter(pair => pair.example?.trim()).length || 0} example sentences
            </span>
          </>
        ) : activity.type === 'categorization' ? (
          <>
            <span>{activity.categories?.length || 0} categories</span>
            <span>{activity.items?.length || 0} cards</span>
          </>
        ) : (
          <>
            <span>1 story</span>
            <span>{activity.questions?.length || 0} questions</span>
          </>
        )}
      </div>

      <div className="custom-activity-actions">
        <button
          onClick={() => playCustomActivity(activity)}
          className="play-btn"
        >
          ▶️ Play
        </button>
        <button
          onClick={() => {
            // Store the activity in sessionStorage for editing
            sessionStorage.setItem('editActivity', JSON.stringify(activity));
            window.location.href = `/activity-builder`;
          }}
          className="edit-btn"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this activity?')) {
              deleteCustomActivity(activity.id);
            }
          }}
          className="delete-btn"
        >
          🗑️
        </button>
      </div>
    </div>
  );

  const BuiltInActivityCard = ({ activity }) => (
    <Link to={activity.path} className="builtin-activity-card">
      <div className="builtin-activity-icon" style={{ backgroundColor: getCategoryColor(activity.category) }}>
        {activity.icon}
      </div>
      <div className="builtin-activity-content">
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
        <div className="builtin-activity-meta">
          <span className="difficulty">{activity.difficulty}</span>
          <span className="time">{activity.estimatedTime}</span>
        </div>
      </div>
    </Link>
  );

  const getCategoryColor = (categoryId) => {
    const category = activityCategories.find(cat => cat.id === categoryId);
    return category ? category.color : '#64748b';
  };

  const getCategoryActivities = (categoryId) => getActivitiesByCategory(categoryId);

  return (
    <div className="new-home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Speech Therapy Activities Hub</h1>
          <p>Create custom activities or choose from our built-in collection</p>
          <div className="hero-actions">
            <Link to="/activity-builder" className="cta-button primary">
              🛠️ Create New Activity
            </Link>
            <button
              onClick={() => document.getElementById('built-in-activities').scrollIntoView({ behavior: 'smooth' })}
              className="cta-button secondary"
            >
              📚 Browse Built-in Activities
            </button>
            <Link to="/next" className="cta-button secondary">
              🚧 Explore Next-Gen Beta
            </Link>
          </div>
        </div>
      </div>

      {/* Custom Activities Section */}
      {customActivities.length > 0 && (
        <div className="section custom-activities-section">
          <div className="section-header">
            <h2>🎨 Your Custom Activities</h2>
            <div className="section-actions">
              <button onClick={exportActivities} className="export-btn" title="Export activities as file">
                📤 Export
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="import-btn" title="Import activities from file">
                📥 Import
              </button>
              <button onClick={backupActivities} className="backup-btn" title="Create full backup">
                💾 Backup
              </button>
              <Link to="/activity-builder" className="add-activity-btn">
                ➕ Create New
              </Link>
            </div>
          </div>

          <div className="custom-activities-grid">
            {customActivities.map(activity => (
              <CustomActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      )}

      {/* Quick Start - If no custom activities */}
      {customActivities.length === 0 && (
        <div className="section quick-start-section">
          <div className="quick-start-card">
            <div className="quick-start-icon">🚀</div>
            <h2>Get Started</h2>
            <p>Create your first custom activity or explore our built-in collection</p>
            <div className="quick-start-options">
              <Link to="/activity-builder" className="quick-option">
                <div className="option-icon">🛠️</div>
                <div className="option-content">
                  <h3>Create Activity</h3>
                  <p>Build custom sorting, matching, or reading activities</p>
                </div>
              </Link>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="quick-option"
              >
                <div className="option-icon">📥</div>
                <div className="option-content">
                  <h3>Import Activities</h3>
                  <p>Load activities from a file or backup</p>
                </div>
              </button>
              <button
                onClick={() => document.getElementById('built-in-activities').scrollIntoView({ behavior: 'smooth' })}
                className="quick-option"
              >
                <div className="option-icon">📚</div>
                <div className="option-content">
                  <h3>Try Built-in</h3>
                  <p>Explore ready-made activities by category</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Built-in Activities */}
      <div id="built-in-activities" className="section builtin-activities-section">
        <div className="section-header">
          <h2>📚 Built-in Activities</h2>
        </div>

        {activityCategories.map(category => (
          <div key={category.id} className="category-section">
            <div className="category-header">
              <div className="category-info">
                <span className="category-icon" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </span>
                <h3>{category.name}</h3>
              </div>
              <div className="category-count">
                {getCategoryActivities(category.id).length} activities
              </div>
            </div>

            <div className="category-activities">
              {getCategoryActivities(category.id).map(activity => (
                <BuiltInActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="footer-stats">
        <div className="stat">
          <span className="stat-number">{customActivities.length}</span>
          <span className="stat-label">Custom Activities</span>
        </div>
        <div className="stat">
          <span className="stat-number">
            {activityCategories.reduce((total, category) => total + getCategoryActivities(category.id).length, 0)}
          </span>
          <span className="stat-label">Built-in Activities</span>
        </div>
        <div className="stat">
          <span className="stat-number">{activityCategories.length}</span>
          <span className="stat-label">Categories</span>
        </div>
      </div>

      {/* Hidden file input for importing */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default NewHomePage;
