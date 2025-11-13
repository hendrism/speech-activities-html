import React, { useState, useEffect } from 'react';
import ActivityWizard from '../components/ActivityWizard';
import ActivityBuilder from '../components/ActivityBuilder';
import ImportantDetailsBuilder from '../components/ImportantDetailsBuilder';
import SequenceOrderingBuilder from '../components/SequenceOrderingBuilder';
import VocabularyMatchingBuilder from '../components/VocabularyMatchingBuilder';
import CategorizationBuilder from '../components/CategorizationBuilder';
import DynamicActivity from '../components/DynamicActivity';
import CustomActivityPlayer from './CustomActivityPlayer';
import './ActivityBuilderPage.css';

const ActivityBuilderPage = () => {
  const [currentMode, setCurrentMode] = useState('wizard'); // 'wizard', 'builder', 'player'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activityToPlay, setActivityToPlay] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);

  useEffect(() => {
    // Check if we're editing an existing activity
    const editActivityData = sessionStorage.getItem('editActivity');
    if (editActivityData) {
      const activity = JSON.parse(editActivityData);
      setEditingActivity(activity);

      // Set the appropriate template based on activity type
      const template = {
        id: activity.type,
        name:
          activity.type === 'important-details' ? 'Important Details Sorting' :
          activity.type === 'sequence-ordering' ? 'Sequence Ordering' :
          activity.type === 'vocabulary-matching' ? 'Vocabulary Matching' :
          activity.type === 'categorization' ? 'Categorization Activity' :
          'Reading Comprehension'
      };
      setSelectedTemplate(template);
      setCurrentMode('builder');

      // Clear the session storage
      sessionStorage.removeItem('editActivity');
    }
  }, []);

  const handleSelectTemplate = (template) => {
    setEditingActivity(null);
    setSelectedTemplate(template);
    setCurrentMode('builder');
  };

  const handleBackToWizard = () => {
    setCurrentMode('wizard');
    setSelectedTemplate(null);
    setEditingActivity(null);
  };

  const handlePlayActivity = (activity) => {
    setActivityToPlay(activity);
    setCurrentMode('player');
  };

  const handleBackToBuilder = () => {
    setCurrentMode('builder');
    setActivityToPlay(null);
  };

  const renderBuilder = () => {
    if (!selectedTemplate) return null;

    switch (selectedTemplate.id) {
      case 'important-details':
        return (
          <ImportantDetailsBuilder
            onPreview={handlePlayActivity}
            onBack={handleBackToWizard}
            editingActivity={editingActivity}
          />
        );
      case 'sequence-ordering':
        return (
          <SequenceOrderingBuilder
            onPreview={handlePlayActivity}
            onBack={handleBackToWizard}
            editingActivity={editingActivity}
          />
        );
      case 'vocabulary-matching':
        return (
          <VocabularyMatchingBuilder
            onPreview={handlePlayActivity}
            onBack={handleBackToWizard}
            editingActivity={editingActivity}
          />
        );
      case 'categorization':
        return (
          <CategorizationBuilder
            onPreview={handlePlayActivity}
            onBack={handleBackToWizard}
            editingActivity={editingActivity}
          />
        );
      case 'reading-comprehension':
      case 'custom-mixed':
      default:
        return (
          <ActivityBuilder
            onPlayActivity={handlePlayActivity}
            template={selectedTemplate}
            onBack={handleBackToWizard}
            editingActivity={editingActivity}
          />
        );
    }
  };

  return (
    <div className="activity-builder-page">
      {currentMode === 'wizard' && (
        <ActivityWizard
          onSelectTemplate={handleSelectTemplate}
          onCancel={() => window.history.back()}
        />
      )}

      {currentMode === 'builder' && renderBuilder()}

      {currentMode === 'player' && activityToPlay && (
        (['important-details', 'sequence-ordering', 'vocabulary-matching', 'categorization'].includes(activityToPlay.type)) ? (
          <CustomActivityPlayer
            activityData={activityToPlay}
            onExit={handleBackToBuilder}
          />
        ) : (
          <DynamicActivity
            activityData={activityToPlay}
            onExit={handleBackToBuilder}
          />
        )
      )}
    </div>
  );
};

export default ActivityBuilderPage;
