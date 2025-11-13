import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import { stories, defaultStoryIndex } from '../data/stories';
import IconManager from '../components/IconManager';
import './ReadingStories.css';

function ReadingStories() {
  const [currentStory, setCurrentStory] = useState(defaultStoryIndex);
  const [currentActivity, setCurrentActivity] = useState('where-when');
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [completedStories, setCompletedStories] = useState(new Set());

  const iconManager = useIconManager();
  const story = stories[currentStory];

  const handleAnswerSelect = (section, questionIndex, choiceIndex) => {
    if (editMode) return;

    const key = `${currentStory}_${section}_${questionIndex}`;
    setAnswers(prev => ({
      ...prev,
      [key]: { selected: choiceIndex, answered: false }
    }));
  };

  const checkAnswer = (section, questionIndex) => {
    const key = `${currentStory}_${section}_${questionIndex}`;
    const question = section === 'where-when'
      ? story.whereWhenQuestions[questionIndex]
      : story.literalInferentialQuestions[questionIndex];

    const answer = answers[key];
    if (answer === undefined || answer.selected === undefined) {
      alert('Please pick an answer first!');
      return;
    }

    const isCorrect = answer.selected === question.correct;

    setAnswers(prev => ({
      ...prev,
      [key]: { ...prev[key], answered: true, correct: isCorrect }
    }));

    checkStoryCompletion();
  };

  const checkStoryCompletion = () => {
    const whereWhenCount = story.whereWhenQuestions.length;
    const literalInferentialCount = story.literalInferentialQuestions.length;
    let correctCount = 0;

    for (let i = 0; i < whereWhenCount; i++) {
      const key = `${currentStory}_where-when_${i}`;
      const answer = answers[key];
      if (answer?.answered && answer?.correct) {
        correctCount++;
      }
    }

    for (let i = 0; i < literalInferentialCount; i++) {
      const key = `${currentStory}_literal-inferential_${i}`;
      const answer = answers[key];
      if (answer?.answered && answer?.correct) {
        correctCount++;
      }
    }

    const totalQuestions = whereWhenCount + literalInferentialCount;
    if (correctCount === totalQuestions) {
      setCompletedStories(prev => new Set([...prev, currentStory]));
    }
  };

  const resetActivity = () => {
    setAnswers({});
    setCompletedStories(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentStory);
      return newSet;
    });
  };

  const openIconManager = () => {
    setIconPanelOpen(true);
  };

  const closeIconManager = () => {
    setIconPanelOpen(false);
    iconManager.setSelectedIcon(null);
    iconManager.setAssigningTo(null);
  };

  const handleIconAssignment = (assignmentKey) => {
    if (!editMode) return;

    iconManager.setAssigningTo(assignmentKey);
    setIconPanelOpen(true);
  };

  const renderChoiceOption = (choice, choiceIndex, section, questionIndex) => {
    const assignmentKey = iconManager.getAssignmentKey(currentStory, section, questionIndex, choiceIndex);
    const iconSrc = iconManager.getIconForAssignment(assignmentKey);
    const answerKey = `${currentStory}_${section}_${questionIndex}`;
    const answer = answers[answerKey];
    const isSelected = answer?.selected === choiceIndex;
    const isAnswered = answer?.answered;
    const question = section === 'where-when'
      ? story.whereWhenQuestions[questionIndex]
      : story.literalInferentialQuestions[questionIndex];
    const isCorrectAnswer = choiceIndex === question.correct;

    let className = 'choice-option';
    if (isSelected && !isAnswered) className += ' selected';
    if (isAnswered) {
      if (isCorrectAnswer) className += ' correct';
      else if (isSelected) className += ' incorrect';
    }

    return (
      <div
        key={choiceIndex}
        className={className}
        onClick={() => handleAnswerSelect(section, questionIndex, choiceIndex)}
      >
        <div
          className={`choice-icon ${iconSrc ? '' : 'empty'}`}
          onClick={(e) => {
            if (editMode) {
              e.stopPropagation();
              handleIconAssignment(assignmentKey);
            }
          }}
        >
          {iconSrc ? (
            <img src={iconSrc} alt="Choice icon" />
          ) : (
            editMode && <span className="empty-icon">📷</span>
          )}
        </div>
        <div className="choice-text">{choice.text}</div>
        {editMode && (
          <button
            className="icon-assign-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleIconAssignment(assignmentKey);
            }}
          >
            🎨
          </button>
        )}
      </div>
    );
  };

  const renderFeedback = (section, questionIndex) => {
    const answerKey = `${currentStory}_${section}_${questionIndex}`;
    const answer = answers[answerKey];

    if (!answer?.answered) return null;

    return (
      <div className={`feedback ${answer.correct ? 'success' : 'error'}`}>
        {answer.correct ? (
          <><strong>🎉 That's right!</strong> Great job finding the answer!</>
        ) : (
          <><strong>Not quite.</strong> Look for the answer in the story. The correct answer is shown in green.</>
        )}
      </div>
    );
  };

  return (
    <div className="reading-stories">
      <div className="activity-header">
        <div className="header-content">
          <div className="activity-info">
            <h1>📖 Reading Stories</h1>
            <div className="progress-info">
              Story {currentStory + 1} of {stories.length} • Completed: {completedStories.size}
            </div>
          </div>
          <div className="controls">
            <button onClick={openIconManager} className="btn-primary">
              🎨 Manage Icons
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={editMode ? 'btn-success' : 'btn-warning'}
            >
              {editMode ? '✓ Done Editing' : '✏️ Edit Icons'}
            </button>
            <button onClick={resetActivity} className="btn-warning">
              🔄 Reset
            </button>
          </div>
        </div>
      </div>

      <div className="activity-content">
        <div className="story-selector">
          {stories.map((_, index) => (
            <button
              key={index}
              className={`story-btn ${index === currentStory ? 'active' : ''} ${completedStories.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentStory(index)}
            >
              Story {index + 1}
            </button>
          ))}
        </div>

        <div className="story-container">
          <div className="story-header">
            <h2 className="story-title">{story.title}</h2>
          </div>

          <div className="activity-toggle">
            <button
              className={`toggle-btn ${currentActivity === 'where-when' ? 'active' : ''}`}
              onClick={() => setCurrentActivity('where-when')}
            >
              🌍 Where & When Questions
            </button>
            <button
              className={`toggle-btn ${currentActivity === 'literal-inferential' ? 'active' : ''}`}
              onClick={() => setCurrentActivity('literal-inferential')}
            >
              🤔 Reading Questions
            </button>
          </div>

          <div className="story-text">
            {story.text.split('. ').map((sentence, index) => (
              sentence.trim() && (
                <p key={index}>
                  {sentence.trim()}{sentence.endsWith('.') ? '' : '.'}
                </p>
              )
            ))}
          </div>

          <div className="questions-section">
            {currentActivity === 'where-when' && story.whereWhenQuestions.map((question, questionIndex) => (
              <div key={questionIndex} className={`question-item ${editMode ? 'edit-mode' : ''}`}>
                <div className="question-number where-when">Question {questionIndex + 1}</div>
                <div className="question-text">{question.question}</div>
                <div className="choices">
                  {question.choices.map((choice, choiceIndex) =>
                    renderChoiceOption(choice, choiceIndex, 'where-when', questionIndex)
                  )}
                </div>
                <button
                  className="check-button"
                  onClick={() => checkAnswer('where-when', questionIndex)}
                  disabled={answers[`${currentStory}_where-when_${questionIndex}`]?.answered}
                >
                  Check My Answer
                </button>
                {renderFeedback('where-when', questionIndex)}
              </div>
            ))}

            {currentActivity === 'literal-inferential' && story.literalInferentialQuestions.map((question, questionIndex) => (
              <div key={questionIndex} className={`question-item ${editMode ? 'edit-mode' : ''}`}>
                <div className="question-number literal-inferential">Question {questionIndex + 1}</div>
                <div className="question-text">{question.question}</div>
                <div className="choices">
                  {question.choices.map((choice, choiceIndex) =>
                    renderChoiceOption(choice, choiceIndex, 'literal-inferential', questionIndex)
                  )}
                </div>
                <button
                  className="check-button"
                  onClick={() => checkAnswer('literal-inferential', questionIndex)}
                  disabled={answers[`${currentStory}_literal-inferential_${questionIndex}`]?.answered}
                >
                  Check My Answer
                </button>
                {renderFeedback('literal-inferential', questionIndex)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <IconManager
        isOpen={iconPanelOpen}
        onClose={closeIconManager}
        icons={iconManager.icons}
        onUpload={iconManager.uploadIcon}
        onDelete={iconManager.deleteIcon}
        onClearAll={iconManager.clearAllIcons}
        onSelectIcon={(iconId) => {
          iconManager.setSelectedIcon(iconId);
          if (iconManager.assigningTo) {
            iconManager.assignIcon(iconManager.assigningTo, iconId);
            closeIconManager();
          }
        }}
        selectedIcon={iconManager.selectedIcon}
        assigningTo={iconManager.assigningTo}
      />
    </div>
  );
}

export default ReadingStories;