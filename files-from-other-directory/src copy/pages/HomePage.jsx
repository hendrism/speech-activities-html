import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { activityCategories, getActivitiesByCategory } from '../data/activities';
import './HomePage.css';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getFilteredActivities = () => {
    if (selectedCategory === 'all') {
      return activityCategories.reduce((acc, category) => {
        return [...acc, ...getActivitiesByCategory(category.id)];
      }, []);
    }
    return getActivitiesByCategory(selectedCategory);
  };

  const ActivityCard = ({ activity }) => (
    <Link to={activity.path} className="activity-card">
      <div className="activity-icon" style={{ backgroundColor: getCategoryColor(activity.category) }}>
        {activity.icon}
      </div>
      <div className="activity-content">
        <h3 className="activity-title">{activity.title}</h3>
        <p className="activity-description">{activity.description}</p>

        <div className="activity-meta">
          <span className="difficulty-badge">{activity.difficulty}</span>
          <span className="time-estimate">{activity.estimatedTime}</span>
        </div>

        <div className="activity-features">
          {activity.features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
      </div>
      <div className="activity-arrow">→</div>
    </Link>
  );

  const getCategoryColor = (categoryId) => {
    const category = activityCategories.find(cat => cat.id === categoryId);
    return category ? category.color : '#64748b';
  };

  const filteredActivities = getFilteredActivities();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Speech Therapy Activities Hub</h1>
          <p>Interactive learning activities designed to support speech and language development. Choose from reading comprehension, vocabulary building, grammar practice, and more!</p>
          <div className="hero-actions">
            <Link to="/activity-builder" className="builder-cta">
              🛠️ Create Custom Activity
            </Link>
          </div>
        </div>
      </div>

      <div className="activities-section">
        <div className="section-header">
          <h2>Choose an Activity</h2>
          <div className="category-filters">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Activities
            </button>
            {activityCategories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ borderColor: category.color, color: selectedCategory === category.id ? 'white' : category.color }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="activities-grid">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="no-activities">
            <p>No activities found in this category.</p>
          </div>
        )}
      </div>

      <div className="features-section">
        <div className="features-content">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h3>Visual Icon Support</h3>
              <p>Upload and assign custom icons to enhance learning with visual cues</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor completion and performance across all activities</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Offline Ready</h3>
              <p>All data saved locally - works without internet connection</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">♿</div>
              <h3>Accessible Design</h3>
              <p>Built with accessibility in mind for all learners</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;