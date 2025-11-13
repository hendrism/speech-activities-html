import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './DynamicActivity.css';

const DynamicActivity = ({ activityData, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [helpLevel, setHelpLevel] = useState({}); // Track help level per question
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState({});

  const iconManager = useIconManager();

  // Utility function to shuffle array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getCurrentQuestion = () => activityData.questions[currentQuestion];
  const getQuestionId = () => `dynamic-${currentQuestion}`;

  const getUserAnswer = () => userAnswers[getQuestionId()] || '';
  const getHelpLevel = () => helpLevel[getQuestionId()] || 0;

  const getShuffledChoices = () => {
    const questionId = getQuestionId();
    const question = getCurrentQuestion();

    if (!shuffledChoices[questionId] && question.choices?.some(c => c)) {
      // Initialize shuffled choices for this question if not already done
      const filtered = question.choices.filter(c => c);
      setShuffledChoices(prev => ({
        ...prev,
        [questionId]: shuffleArray(filtered)
      }));
      return filtered;
    }

    return shuffledChoices[questionId] || question.choices?.filter(c => c) || [];
  };

  const shuffleCurrentChoices = () => {
    const questionId = getQuestionId();
    const question = getCurrentQuestion();

    if (question.choices?.some(c => c)) {
      const filtered = question.choices.filter(c => c);
      setShuffledChoices(prev => ({
        ...prev,
        [questionId]: shuffleArray(filtered)
      }));
    }
  };

  const setUserAnswer = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [getQuestionId()]: answer
    }));
  };

  const showHelp = () => {
    const question = getCurrentQuestion();
    const currentLevel = getHelpLevel();

    // Determine max help level based on question configuration
    let maxLevel = 0;
    if (question.helpLevel === 'hint-first' && question.hint) maxLevel = 1;
    if ((question.helpLevel === 'hint-first' || question.helpLevel === 'choices-only') &&
        (question.choices?.some(c => c) || question.type === 'true-false')) maxLevel = 2;

    if (currentLevel < maxLevel) {
      setHelpLevel(prev => ({
        ...prev,
        [getQuestionId()]: currentLevel + 1
      }));
    }
  };

  const checkAnswer = () => {
    const question = getCurrentQuestion();
    const userAnswer = getUserAnswer();
    const isCorrect = userAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();

    setFeedback({
      show: true,
      success: isCorrect,
      message: isCorrect
        ? '🎉 Correct! Great job!'
        : `Not quite right. The answer is: ${question.answer}`
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < activityData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFeedback({ show: false, success: false, message: '' });
    } else {
      setFeedback({
        show: true,
        success: true,
        message: '🎉 Congratulations! You completed the activity!'
      });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setFeedback({ show: false, success: false, message: '' });
    }
  };

  const resetActivity = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setHelpLevel({});
    setFeedback({ show: false, success: false, message: '' });
  };

  const renderQuestionInput = () => {
    const question = getCurrentQuestion();
    const currentHelpLevel = getHelpLevel();
    const userAnswer = getUserAnswer();

    // Determine what to show based on question configuration and help level
    const showTextInput = question.helpLevel === 'text-only' ||
                         (question.helpLevel === 'hint-first' && currentHelpLevel < 2);
    const showChoices = question.helpLevel === 'choices-only' ||
                       (question.helpLevel === 'hint-first' && currentHelpLevel === 2);
    const showHint = question.hint && currentHelpLevel >= 1;

    return (
      <div className="question-input-section">
        {showHint && (
          <div className="hint-box">
            <div className="hint-label">💡 Hint:</div>
            <div className="hint-text">{question.hint}</div>
          </div>
        )}

        {showTextInput && (
          <div className="text-input-container">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="answer-textarea"
              rows={3}
            />
          </div>
        )}

        {showChoices && (
          <div className="choices-container">
            {question.type === 'true-false' ? (
              <div className="true-false-container">
                <button
                  className={`choice-btn ${userAnswer === 'true' ? 'selected' : ''}`}
                  onClick={() => setUserAnswer('true')}
                >
                  ✅ True
                </button>
                <button
                  className={`choice-btn ${userAnswer === 'false' ? 'selected' : ''}`}
                  onClick={() => setUserAnswer('false')}
                >
                  ❌ False
                </button>
              </div>
            ) : (
              <div className="multiple-choice-container">
                {getShuffledChoices().map((choice, index) => (
                  <button
                    key={index}
                    className={`choice-btn ${userAnswer === choice ? 'selected' : ''}`}
                    onClick={() => setUserAnswer(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Help Button */}
        {question.helpLevel === 'hint-first' && (
          <div className="help-button-container">
            {currentHelpLevel === 0 && question.hint && (
              <button onClick={showHelp} className="help-btn">
                💡 I need a hint
              </button>
            )}
            {currentHelpLevel === 1 && (question.choices?.some(c => c) || question.type === 'true-false') && (
              <button onClick={showHelp} className="help-btn">
                📝 Show me choices
              </button>
            )}
          </div>
        )}

        {/* Check Answer Button */}
        <div className="action-buttons">
          <button
            onClick={checkAnswer}
            className="check-btn primary"
            disabled={!userAnswer}
          >
            ✓ Check Answer
          </button>
        </div>
      </div>
    );
  };

  if (!activityData || !activityData.questions || activityData.questions.length === 0) {
    return (
      <div className="dynamic-activity">
        <div className="error-state">
          <h2>No Activity Data</h2>
          <p>Please create an activity first using the Activity Builder.</p>
          {onExit && (
            <button onClick={onExit} className="back-btn">
              ← Back to Builder
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dynamic-activity">
      <header className="activity-header">
        <div className="header-content">
          <h1>🎮 {activityData.title || 'Custom Activity'}</h1>
          <div className="progress-info">
            Question {currentQuestion + 1} of {activityData.questions.length}
          </div>
          <div className="header-controls">
            {onExit && (
              <button onClick={onExit} className="icon-btn">
                ← Builder
              </button>
            )}
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Icons
            </button>
            <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
            {getCurrentQuestion()?.choices?.some(c => c) && (
              <button onClick={shuffleCurrentChoices} className="icon-btn">
                🎲 Shuffle Choices
              </button>
            )}
            <button onClick={resetActivity} className="warning">
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Activity Content */}
        {activityData.content && (
          <div className="content-section">
            <div className="story-text">
              <p>{activityData.content}</p>
            </div>
          </div>
        )}

        {/* Question */}
        <div className="question-section">
          <div className="question-container">
            <div className="question-header">
              <h3>{getCurrentQuestion().question}</h3>
              <div className="question-meta">
                Question Type: {getCurrentQuestion().type.replace('-', ' ')}
              </div>
            </div>

            {renderQuestionInput()}

            {/* Navigation */}
            <div className="navigation-buttons">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="nav-btn"
              >
                ← Previous
              </button>
              <span className="question-counter">
                {currentQuestion + 1} / {activityData.questions.length}
              </span>
              <button
                onClick={nextQuestion}
                className="nav-btn primary"
                disabled={currentQuestion === activityData.questions.length - 1 && !feedback.success}
              >
                {currentQuestion === activityData.questions.length - 1 ? 'Finish' : 'Next →'}
              </button>
            </div>

            {/* Feedback */}
            {feedback.show && (
              <div className={`feedback ${feedback.success ? 'success' : 'error'} show`}>
                <p>{feedback.message}</p>
              </div>
            )}
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

export default DynamicActivity;