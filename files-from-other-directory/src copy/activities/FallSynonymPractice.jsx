import React, { useMemo, useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './SynonymPractice.css';

const fallSynonymQuestions = [
  {
    sentence: 'The apple was crisp when I took a bite.',
    targetWord: 'crisp',
    clue: 'Think about the word you use when an apple is crunchy and fresh.',
    choices: [
      { text: 'fresh', isCorrect: true },
      { text: 'loud', isCorrect: false },
      { text: 'heavy', isCorrect: false }
    ]
  },
  {
    sentence: 'The farmer will harvest the corn soon.',
    targetWord: 'harvest',
    clue: 'What do farmers do when crops are ready to be picked?',
    choices: [
      { text: 'gather', isCorrect: true },
      { text: 'drop', isCorrect: false },
      { text: 'hide', isCorrect: false }
    ]
  },
  {
    sentence: 'The weather is chilly today.',
    targetWord: 'chilly',
    clue: 'Which word means the air feels a little cold?',
    choices: [
      { text: 'cold', isCorrect: true },
      { text: 'hot', isCorrect: false },
      { text: 'dark', isCorrect: false }
    ]
  },
  {
    sentence: 'We gathered the leaves into a big pile.',
    targetWord: 'gathered',
    clue: 'What is another word for picking things up together?',
    choices: [
      { text: 'collect', isCorrect: true },
      { text: 'kick', isCorrect: false },
      { text: 'spill', isCorrect: false }
    ]
  },
  {
    sentence: 'The blanket is soft and cozy.',
    targetWord: 'cozy',
    clue: 'Which word tells about feeling warm and comfortable?',
    choices: [
      { text: 'comfortable', isCorrect: true },
      { text: 'hard', isCorrect: false },
      { text: 'loud', isCorrect: false }
    ]
  },
  {
    sentence: 'A soft breeze moved the leaves.',
    targetWord: 'breeze',
    clue: 'What do you call a gentle wind that moves leaves?',
    choices: [
      { text: 'wind', isCorrect: true },
      { text: 'light', isCorrect: false },
      { text: 'bug', isCorrect: false }
    ]
  },
  {
    sentence: 'We are thankful for our family.',
    targetWord: 'thankful',
    clue: 'What word means feeling glad and full of thanks?',
    choices: [
      { text: 'glad', isCorrect: true },
      { text: 'sleepy', isCorrect: false },
      { text: 'mad', isCorrect: false }
    ]
  },
  {
    sentence: 'We had a big feast for Thanksgiving.',
    targetWord: 'feast',
    clue: 'What do you call a very big meal with lots of food?',
    choices: [
      { text: 'meal', isCorrect: true },
      { text: 'game', isCorrect: false },
      { text: 'nap', isCorrect: false }
    ]
  },
  {
    sentence: 'We bake cookies in the oven.',
    targetWord: 'bake',
    clue: 'Which word also means to cook something in an oven?',
    choices: [
      { text: 'cook', isCorrect: true },
      { text: 'wash', isCorrect: false },
      { text: 'break', isCorrect: false }
    ]
  },
  {
    sentence: 'We celebrate birthdays with cake.',
    targetWord: 'celebrate',
    clue: 'What word matches having a party and cheering together?',
    choices: [
      { text: 'party', isCorrect: true },
      { text: 'rest', isCorrect: false },
      { text: 'whisper', isCorrect: false }
    ]
  },
  {
    sentence: 'Fall is my favorite season.',
    targetWord: 'season',
    clue: 'What is another word for a time of year, like fall or summer?',
    choices: [
      { text: 'time', isCorrect: true },
      { text: 'sound', isCorrect: false },
      { text: 'animal', isCorrect: false }
    ]
  },
  {
    sentence: 'The pie had a sweet scent.',
    targetWord: 'scent',
    clue: 'Which word means the smell of something?',
    choices: [
      { text: 'smell', isCorrect: true },
      { text: 'taste', isCorrect: false },
      { text: 'noise', isCorrect: false }
    ]
  }
];

const FallSynonymPractice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [disabledChoices, setDisabledChoices] = useState(new Set());
  const [feedback, setFeedback] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  const iconManager = useIconManager();

  const question = fallSynonymQuestions[currentQuestion];
  const totalQuestions = fallSynonymQuestions.length;

  const renderSentence = useMemo(() => {
    const pattern = new RegExp(`(${question.targetWord})`, 'i');
    const parts = question.sentence.split(pattern);
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <span key={`${part}-${index}`} className="target-word">
          {part}
        </span>
      ) : (
        <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
      )
    );
  }, [question.sentence, question.targetWord]);

  const handleChoiceSelect = (index) => {
    if (feedback?.success) return;
    if (disabledChoices.has(index)) return;

    const choice = question.choices[index];
    setSelectedChoice(index);

    if (choice.isCorrect) {
      setFeedback({
        success: true,
        message: `🎉 Great job! "${choice.text}" means almost the same thing as "${question.targetWord}".`
      });
      setDisabledChoices(new Set([0, 1, 2]));
      setCompletedQuestions((prev) => {
        const updated = new Set(prev);
        updated.add(currentQuestion);
        return updated;
      });
    } else {
      setFeedback({
        success: false,
        message: `Not quite. "${choice.text}" does not mean the same as "${question.targetWord}". Try another choice!`
      });
      setDisabledChoices((prev) => {
        const updated = new Set(prev);
        updated.add(index);
        return updated;
      });
    }
  };

  const loadQuestion = (index) => {
    setCurrentQuestion(index);
    setSelectedChoice(null);
    setDisabledChoices(new Set());
    setFeedback(null);
    setShowHelp(false);
  };

  const goToNextQuestion = () => {
    const nextIndex = currentQuestion + 1;
    if (nextIndex < totalQuestions) {
      loadQuestion(nextIndex);
    } else {
      resetActivity();
    }
  };

  const resetActivity = () => {
    setCurrentQuestion(0);
    setSelectedChoice(null);
    setDisabledChoices(new Set());
    setFeedback(null);
    setShowHelp(false);
    setCompletedQuestions(new Set());
  };

  return (
    <div className="synonym-practice">
      <header className="activity-header">
        <div className="header-content">
          <h1>🍁 Fall Word Practice – Choose the Word with a Similar Meaning</h1>
          <div className="progress-indicator">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={resetActivity} className="warning">
              🔄 Start Over
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="activity-container">
          <div className="instructions">
            <p>
              Read the sentence, look at the highlighted word, and pick the choice that has the same meaning.
              Tap <strong>I need help</strong> if you want a hint!
            </p>
          </div>

          <div className="word-nav">
            {fallSynonymQuestions.map((item, index) => {
              const isActive = index === currentQuestion;
              const isCompleted = completedQuestions.has(index);
              const className = [
                'word-nav-btn',
                isActive ? 'active' : '',
                isCompleted ? 'completed' : ''
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={item.targetWord}
                  className={className}
                  onClick={() => loadQuestion(index)}
                >
                  {item.targetWord}
                </button>
              );
            })}
          </div>

         <div className="question-card">
            <div className="sentence-display">{renderSentence}</div>

            <div className="help-row">
              <span className="question-progress">
                💡 Looking for the synonym of "{question.targetWord}"
              </span>
              <button
                className="help-btn"
                onClick={() => setShowHelp(true)}
                disabled={showHelp}
              >
                🙋 I need help
              </button>
            </div>

            {showHelp && (
              <div className="help-text">
                {question.clue}
              </div>
            )}

            <div className="choices-container">
              {question.choices.map((choice, index) => {
                const isDisabled = disabledChoices.has(index);
                const isSelected = selectedChoice === index;
                const classNames = [
                  'choice-btn',
                  isSelected && choice.isCorrect ? 'correct' : '',
                  isSelected && !choice.isCorrect ? 'incorrect' : '',
                  choice.isCorrect && feedback?.success ? 'show-correct' : ''
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={choice.text}
                    className={classNames}
                    onClick={() => handleChoiceSelect(index)}
                    disabled={isDisabled && !choice.isCorrect}
                  >
                    {choice.text}
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className={`feedback ${feedback.success ? 'correct' : 'incorrect'}`}>
                <p>{feedback.message}</p>
              </div>
            )}

            <div className="action-buttons">
              {feedback?.success ? (
                <button className="primary" onClick={goToNextQuestion}>
                  {currentQuestion + 1 < totalQuestions ? 'Next Sentence →' : 'Play Again 🔁'}
                </button>
              ) : (
                <button className="secondary" onClick={resetActivity}>
                  Reset Activity
                </button>
              )}
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

export default FallSynonymPractice;
