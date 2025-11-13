import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './AACRequestComment.css';

const AACRequestComment = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [showChoices, setShowChoices] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [randomizeOrder, setRandomizeOrder] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const scenarioData = [
    {
      id: 1,
      location: "Cafeteria",
      icon: "🍽️",
      situation: "You spilled your drink on the table, and it's starting to spread.",
      choices: [
        { text: "I need help.", isCorrect: true },
        { text: "I want pizza.", isCorrect: false },
        { text: "Can I go outside?", isCorrect: false }
      ]
    },
    {
      id: 2,
      location: "Classroom",
      icon: "📚",
      situation: "The teacher gave directions, but you don't understand what to do next.",
      choices: [
        { text: "Help me please.", isCorrect: true },
        { text: "I want a break.", isCorrect: false },
        { text: "Can I get water?", isCorrect: false }
      ]
    },
    {
      id: 3,
      location: "Playground",
      icon: "⛹️",
      situation: "A group of kids is playing basketball, and you'd like to join in.",
      choices: [
        { text: "Can I play?", isCorrect: true },
        { text: "I want a drink.", isCorrect: false },
        { text: "Can I go inside?", isCorrect: false }
      ]
    },
    {
      id: 4,
      location: "Library",
      icon: "📖",
      situation: "You find a book with pictures of animals that you really like.",
      choices: [
        { text: "I want this book.", isCorrect: true },
        { text: "Can I go now?", isCorrect: false },
        { text: "I need the bathroom.", isCorrect: false }
      ]
    },
    {
      id: 5,
      location: "Hallway",
      icon: "🚶",
      situation: "You see your friend walking toward you between classes.",
      choices: [
        { text: "Can we talk?", isCorrect: true },
        { text: "I want to go.", isCorrect: false },
        { text: "Can I get help?", isCorrect: false }
      ]
    },
    {
      id: 6,
      location: "Art Class",
      icon: "🎨",
      situation: "You need more glue to finish your project.",
      choices: [
        { text: "I need glue.", isCorrect: true },
        { text: "Can I leave?", isCorrect: false },
        { text: "I want water.", isCorrect: false }
      ]
    },
    {
      id: 7,
      location: "Morning Meeting",
      icon: "☀️",
      situation: "The teacher asks everyone how they feel today.",
      choices: [
        { text: "I want to share.", isCorrect: true },
        { text: "Can I get water?", isCorrect: false },
        { text: "I need to go.", isCorrect: false }
      ]
    },
    {
      id: 8,
      location: "Gym",
      icon: "🏃",
      situation: "The ball rolls far away, and you can't reach it.",
      choices: [
        { text: "Can you help?", isCorrect: true },
        { text: "I want to sit.", isCorrect: false },
        { text: "Can I go?", isCorrect: false }
      ]
    },
    {
      id: 9,
      location: "Cafeteria",
      icon: "🍽️",
      situation: "You got your lunch tray, but you don't have a fork or spoon.",
      choices: [
        { text: "I need a fork.", isCorrect: true },
        { text: "I want dessert.", isCorrect: false },
        { text: "Can I sit down?", isCorrect: false }
      ]
    },
    {
      id: 10,
      location: "Computer Lab",
      icon: "💻",
      situation: "Your computer screen froze and won't work.",
      choices: [
        { text: "I need help.", isCorrect: true },
        { text: "Can I use that one?", isCorrect: false },
        { text: "I want to play.", isCorrect: false }
      ]
    },
    {
      id: 11,
      location: "Assembly",
      icon: "🎭",
      situation: "A funny video plays, and everyone starts laughing.",
      choices: [
        { text: "Can I talk?", isCorrect: true },
        { text: "Can I go?", isCorrect: false },
        { text: "I need water.", isCorrect: false }
      ]
    },
    {
      id: 12,
      location: "Science Class",
      icon: "🔬",
      situation: "You have a question about the experiment but don't know how to start.",
      choices: [
        { text: "I have a question.", isCorrect: true },
        { text: "Can I get supplies?", isCorrect: false },
        { text: "I want to stop.", isCorrect: false }
      ]
    },
    {
      id: 13,
      location: "Dismissal",
      icon: "🚌",
      situation: "You're waiting for your bus, and it hasn't arrived yet.",
      choices: [
        { text: "Can I wait inside?", isCorrect: true },
        { text: "I want to go home.", isCorrect: false },
        { text: "Can I call someone?", isCorrect: false }
      ]
    },
    {
      id: 14,
      location: "Music Class",
      icon: "🎵",
      situation: "The teacher is passing out instruments, and you want a drum.",
      choices: [
        { text: "I want the drum.", isCorrect: true },
        { text: "Can I go?", isCorrect: false },
        { text: "I need help.", isCorrect: false }
      ]
    },
    {
      id: 15,
      location: "Field Trip",
      icon: "🦁",
      situation: "You are at the zoo, and you see an animal you really like.",
      choices: [
        { text: "Can I look closer?", isCorrect: true },
        { text: "I want to buy something.", isCorrect: false },
        { text: "Can I go back?", isCorrect: false }
      ]
    }
  ];

  useEffect(() => {
    initializeScenarios();
  }, [randomizeOrder]);

  const initializeScenarios = () => {
    let scenariosToUse = randomizeOrder
      ? [...scenarioData].sort(() => Math.random() - 0.5)
      : [...scenarioData];

    // Shuffle choices for each scenario
    scenariosToUse = scenariosToUse.map(s => ({
      ...s,
      choices: [...s.choices].sort(() => Math.random() - 0.5)
    }));

    setScenarios(scenariosToUse);
    setCurrentScenarioIndex(0);
    setShowChoices(false);
    setUserInput('');
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleNeedHelp = () => {
    setShowChoices(true);
  };

  const handleAnswerSelect = (choice, index) => {
    setSelectedAnswer(index);
    setIsCorrect(choice.isCorrect);
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setShowChoices(false);
      setUserInput('');
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handlePreviousScenario = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
      setShowChoices(false);
      setUserInput('');
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleReset = () => {
    initializeScenarios();
  };

  if (scenarios.length === 0) return null;

  const currentScenario = scenarios[currentScenarioIndex];
  const isComplete = currentScenarioIndex === scenarios.length - 1 && isCorrect === true;

  return (
    <div className="aac-request-comment">
      <header className="activity-header">
        <div className="header-content">
          <h1>💬 AAC Request & Comment</h1>
          <div className="progress-indicator">
            Scenario {currentScenarioIndex + 1} of {scenarios.length}
          </div>
          <div className="header-controls">
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
            <p>🎯 Read each scenario and think about what you could say. Try it on your own first, or click "I Need Help" to see choices.</p>
          </div>

          <div className="scenario-card">
            <div className="scenario-header">
              <span className="scenario-icon">{currentScenario.icon}</span>
              <h2>{currentScenario.location}</h2>
            </div>

            <div className="situation-box">
              <p>{currentScenario.situation}</p>
            </div>

            <div className="prompt-section">
              <h3>What could you say?</h3>

              {!showChoices && selectedAnswer === null && (
                <div className="independent-attempt">
                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type what you would say here..."
                    className="response-input"
                    rows="3"
                  />
                  <button onClick={handleNeedHelp} className="help-btn">
                    🙋 I Need Help
                  </button>
                </div>
              )}

              {showChoices && selectedAnswer === null && (
                <div className="choices-container">
                  {currentScenario.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(choice, index)}
                      className="choice-btn"
                    >
                      {choice.text}
                    </button>
                  ))}
                </div>
              )}

              {selectedAnswer !== null && (
                <div className="choices-container">
                  {currentScenario.choices.map((choice, index) => {
                    let buttonClass = 'choice-btn';
                    if (selectedAnswer === index) {
                      buttonClass += choice.isCorrect ? ' correct' : ' incorrect';
                    }
                    if (choice.isCorrect && selectedAnswer !== null) {
                      buttonClass += ' show-correct';
                    }

                    return (
                      <button
                        key={index}
                        className={buttonClass}
                        disabled
                      >
                        {choice.text}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedAnswer !== null && (
              <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? (
                  <p>✅ Great job! That's a complete and appropriate response for this situation.</p>
                ) : (
                  <p>💡 Try again! Look for the response that best fits this situation.</p>
                )}
              </div>
            )}
          </div>

          <div className="navigation-buttons">
            <button
              onClick={handlePreviousScenario}
              disabled={currentScenarioIndex === 0}
              className="nav-btn"
            >
              ← Previous
            </button>
            <button
              onClick={handleNextScenario}
              disabled={currentScenarioIndex === scenarios.length - 1}
              className="nav-btn primary"
            >
              Next →
            </button>
          </div>

          {isComplete && (
            <div className="completion-message">
              <p>🎉 Excellent work! You've completed all scenarios and practiced making complete requests and comments!</p>
              <button onClick={handleReset} className="primary">
                Practice Again
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

export default AACRequestComment;