import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './SynonymPractice.css';

const SynonymPractice = () => {
  const [difficulty, setDifficulty] = useState('simple');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [randomizeOrder, setRandomizeOrder] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const synonymData = {
    simple: [
      {
        sentence: "The soup is hot.",
        targetWord: "hot",
        choices: [
          { text: "🌙 Night", isCorrect: false },
          { text: "🔥 Warm", isCorrect: true },
          { text: "❄️ Cold", isCorrect: false }
        ]
      },
      {
        sentence: "She is happy today.",
        targetWord: "happy",
        choices: [
          { text: "😀 Glad", isCorrect: true },
          { text: "🐶 Dog", isCorrect: false },
          { text: "😢 Sad", isCorrect: false }
        ]
      },
      {
        sentence: "He ran a big race.",
        targetWord: "big",
        choices: [
          { text: "🐁 Small", isCorrect: false },
          { text: "🚗 Car", isCorrect: false },
          { text: "🏠 Large", isCorrect: true }
        ]
      },
      {
        sentence: "The dog is fast.",
        targetWord: "fast",
        choices: [
          { text: "📚 Book", isCorrect: false },
          { text: "🐇 Quick", isCorrect: true },
          { text: "🐌 Slow", isCorrect: false }
        ]
      },
      {
        sentence: "The boy is mad.",
        targetWord: "mad",
        choices: [
          { text: "🍎 Apple", isCorrect: false },
          { text: "😡 Angry", isCorrect: true },
          { text: "😴 Sleepy", isCorrect: false }
        ]
      },
      {
        sentence: "The bed is soft.",
        targetWord: "soft",
        choices: [
          { text: "☁️ Fluffy", isCorrect: true },
          { text: "🐟 Fish", isCorrect: false },
          { text: "🪨 Hard", isCorrect: false }
        ]
      },
      {
        sentence: "The water is cold.",
        targetWord: "cold",
        choices: [
          { text: "❄️ Chilly", isCorrect: true },
          { text: "🚲 Bike", isCorrect: false },
          { text: "🔥 Hot", isCorrect: false }
        ]
      },
      {
        sentence: "She is smart in math.",
        targetWord: "smart",
        choices: [
          { text: "🎵 Music", isCorrect: false },
          { text: "🐢 Slow", isCorrect: false },
          { text: "🧠 Clever", isCorrect: true }
        ]
      },
      {
        sentence: "The toy is new.",
        targetWord: "new",
        choices: [
          { text: "🗑 Old", isCorrect: false },
          { text: "🎁 Fresh", isCorrect: true },
          { text: "🐸 Frog", isCorrect: false }
        ]
      },
      {
        sentence: "The rock is hard.",
        targetWord: "hard",
        choices: [
          { text: "☁️ Soft", isCorrect: false },
          { text: "🍦 Ice cream", isCorrect: false },
          { text: "🪨 Solid", isCorrect: true }
        ]
      }
    ],
    medium: [
      {
        sentence: "The shirt is tiny.",
        targetWord: "tiny",
        choices: [
          { text: "Huge", isCorrect: false },
          { text: "Green", isCorrect: false },
          { text: "Small", isCorrect: true }
        ]
      },
      {
        sentence: "She is silent in the library.",
        targetWord: "silent",
        choices: [
          { text: "Reading", isCorrect: false },
          { text: "Loud", isCorrect: false },
          { text: "Quiet", isCorrect: true }
        ]
      },
      {
        sentence: "The movie was funny.",
        targetWord: "funny",
        choices: [
          { text: "Scary", isCorrect: false },
          { text: "Hilarious", isCorrect: true },
          { text: "Boring", isCorrect: false }
        ]
      },
      {
        sentence: "He is strong from lifting weights.",
        targetWord: "strong",
        choices: [
          { text: "Powerful", isCorrect: true },
          { text: "Weak", isCorrect: false },
          { text: "Tired", isCorrect: false }
        ]
      },
      {
        sentence: "The game was hard for me.",
        targetWord: "hard",
        choices: [
          { text: "Long", isCorrect: false },
          { text: "Difficult", isCorrect: true },
          { text: "Easy", isCorrect: false }
        ]
      },
      {
        sentence: "The food was tasty.",
        targetWord: "tasty",
        choices: [
          { text: "Plain", isCorrect: false },
          { text: "Delicious", isCorrect: true },
          { text: "Gross", isCorrect: false }
        ]
      },
      {
        sentence: "The night was dark.",
        targetWord: "dark",
        choices: [
          { text: "Gloomy", isCorrect: true },
          { text: "Shiny", isCorrect: false },
          { text: "Bright", isCorrect: false }
        ]
      },
      {
        sentence: "She is brave during the storm.",
        targetWord: "brave",
        choices: [
          { text: "Courageous", isCorrect: true },
          { text: "Quiet", isCorrect: false },
          { text: "Scared", isCorrect: false }
        ]
      },
      {
        sentence: "The man was angry at the traffic.",
        targetWord: "angry",
        choices: [
          { text: "Relaxed", isCorrect: false },
          { text: "Mad", isCorrect: true },
          { text: "Happy", isCorrect: false }
        ]
      },
      {
        sentence: "The shoes are old.",
        targetWord: "old",
        choices: [
          { text: "Expensive", isCorrect: false },
          { text: "New", isCorrect: false },
          { text: "Worn", isCorrect: true }
        ]
      }
    ],
    regular: [
      {
        sentence: "The puzzle was very challenging.",
        targetWord: "challenging",
        choices: [
          { text: "Short", isCorrect: false },
          { text: "Hard", isCorrect: true },
          { text: "Simple", isCorrect: false }
        ]
      },
      {
        sentence: "She felt exhausted after running.",
        targetWord: "exhausted",
        choices: [
          { text: "Rested", isCorrect: false },
          { text: "Excited", isCorrect: false },
          { text: "Tired", isCorrect: true }
        ]
      },
      {
        sentence: "The story was hilarious.",
        targetWord: "hilarious",
        choices: [
          { text: "Sad", isCorrect: false },
          { text: "Serious", isCorrect: false },
          { text: "Funny", isCorrect: true }
        ]
      },
      {
        sentence: "The sky was bright with stars.",
        targetWord: "bright",
        choices: [
          { text: "Cloudy", isCorrect: false },
          { text: "Shiny", isCorrect: true },
          { text: "Dark", isCorrect: false }
        ]
      },
      {
        sentence: "He made a quick decision.",
        targetWord: "quick",
        choices: [
          { text: "Fast", isCorrect: true },
          { text: "Late", isCorrect: false },
          { text: "Slow", isCorrect: false }
        ]
      },
      {
        sentence: "The boy was fearless on the stage.",
        targetWord: "fearless",
        choices: [
          { text: "Nervous", isCorrect: false },
          { text: "Brave", isCorrect: true },
          { text: "Scared", isCorrect: false }
        ]
      },
      {
        sentence: "The math problem was simple.",
        targetWord: "simple",
        choices: [
          { text: "Confusing", isCorrect: false },
          { text: "Easy", isCorrect: true },
          { text: "Hard", isCorrect: false }
        ]
      },
      {
        sentence: "The lake was very silent at night.",
        targetWord: "silent",
        choices: [
          { text: "Quiet", isCorrect: true },
          { text: "Busy", isCorrect: false },
          { text: "Noisy", isCorrect: false }
        ]
      },
      {
        sentence: "The teacher gave a brief talk.",
        targetWord: "brief",
        choices: [
          { text: "Short", isCorrect: true },
          { text: "Loud", isCorrect: false },
          { text: "Long", isCorrect: false }
        ]
      },
      {
        sentence: "She wore a beautiful dress.",
        targetWord: "beautiful",
        choices: [
          { text: "Pretty", isCorrect: true },
          { text: "Ugly", isCorrect: false },
          { text: "Dirty", isCorrect: false }
        ]
      }
    ]
  };

  useEffect(() => {
    initializeQuestions();
  }, [difficulty, randomizeOrder]);

  const initializeQuestions = () => {
    const selectedQuestions = synonymData[difficulty];

    // Shuffle questions if randomize is enabled
    let questionsToUse = randomizeOrder
      ? [...selectedQuestions].sort(() => Math.random() - 0.5)
      : [...selectedQuestions];

    // Shuffle choices for each question
    questionsToUse = questionsToUse.map(q => ({
      ...q,
      choices: [...q.choices].sort(() => Math.random() - 0.5)
    }));

    setQuestions(questionsToUse);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswerSelect = (choice, index) => {
    setSelectedAnswer(index);
    setIsCorrect(choice.isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleReset = () => {
    initializeQuestions();
  };

  const highlightTargetWord = (sentence, targetWord) => {
    const regex = new RegExp(`\\b${targetWord}\\b`, 'gi');
    const parts = sentence.split(regex);
    const matches = sentence.match(regex);

    return parts.reduce((acc, part, i) => {
      acc.push(part);
      if (matches && matches[i]) {
        acc.push(<span key={i} className="target-word">{matches[i]}</span>);
      }
      return acc;
    }, []);
  };

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isComplete = currentQuestionIndex === questions.length - 1 && isCorrect === true;

  return (
    <div className="synonym-practice">
      <header className="activity-header">
        <div className="header-content">
          <h1>📖 Synonym Practice</h1>
          <div className="progress-indicator">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="header-controls">
            <div className="difficulty-toggle">
              <button
                onClick={() => setDifficulty('simple')}
                className={`difficulty-btn ${difficulty === 'simple' ? 'active' : ''}`}
              >
                Simple
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
              >
                Medium
              </button>
              <button
                onClick={() => setDifficulty('regular')}
                className={`difficulty-btn ${difficulty === 'regular' ? 'active' : ''}`}
              >
                Regular
              </button>
            </div>
            <button
              onClick={() => setRandomizeOrder(!randomizeOrder)}
              className={`icon-btn ${randomizeOrder ? 'active' : ''}`}
            >
              {randomizeOrder ? '🔀 Randomized' : '🔀 Randomize'}
            </button>
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
            <button onClick={handleReset} className="warning">
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="activity-container">
          <div className="instructions">
            <p>📝 Read the sentence. Look at the <strong>underlined word</strong>. Choose the word that means the same.</p>
          </div>

          <div className="question-card">
            <div className="sentence-display">
              {highlightTargetWord(currentQuestion.sentence, currentQuestion.targetWord)}
            </div>

            <div className="choices-container">
              {currentQuestion.choices.map((choice, index) => {
                let buttonClass = 'choice-btn';
                if (selectedAnswer === index) {
                  buttonClass += choice.isCorrect ? ' correct' : ' incorrect';
                }
                if (selectedAnswer !== null && choice.isCorrect) {
                  buttonClass += ' show-correct';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(choice, index)}
                    className={buttonClass}
                    disabled={selectedAnswer !== null && isCorrect}
                  >
                    {choice.text}
                  </button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? (
                  <p>✅ Correct! Great job!</p>
                ) : (
                  <p>Try again! Look for the word that means the same as <strong>{currentQuestion.targetWord}</strong>.</p>
                )}
              </div>
            )}
          </div>

          <div className="navigation-buttons">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="nav-btn"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
              className="nav-btn primary"
            >
              Next →
            </button>
          </div>

          {isComplete && (
            <div className="completion-message">
              <p>🎉 You've completed all the questions! Great work on learning synonyms!</p>
              <button onClick={handleReset} className="primary">
                Try Again
              </button>
            </div>
          )}
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

export default SynonymPractice;