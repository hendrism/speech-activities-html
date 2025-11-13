import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './NegationNavigator.css';

const NegationNavigator = () => {
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [currentActivity, setCurrentActivity] = useState('learn');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const scenarioData = {
    beginner: [
      {
        theme: 'Simple Actions',
        scenarios: [
          {
            positive: {
              sentence: 'The boy is eating.',
              image: '🍽️👦',
              description: 'Boy eating'
            },
            negative: {
              sentence: 'The boy is not eating.',
              image: '🚫🍽️👦',
              description: 'Boy not eating'
            },
            questions: [
              {
                question: 'Look at: 🍽️👦 - Is the boy eating?',
                answer: 'yes',
                choices: ['yes', 'no']
              },
              {
                question: 'Look at: 🚫🍽️👦 - Is the boy eating?',
                answer: 'no',
                choices: ['yes', 'no']
              }
            ]
          },
          {
            positive: {
              sentence: 'The cat is sleeping.',
              image: '😴🐱',
              description: 'Cat sleeping'
            },
            negative: {
              sentence: 'The cat is not sleeping.',
              image: '🐱👀',
              description: 'Cat awake'
            },
            questions: [
              {
                question: 'Look at: 😴🐱 - Is the cat sleeping?',
                answer: 'yes',
                choices: ['yes', 'no']
              },
              {
                question: 'Look at: 🐱👀 - Is the cat sleeping?',
                answer: 'no',
                choices: ['yes', 'no']
              }
            ]
          },
          {
            positive: {
              sentence: 'The light is on.',
              image: '💡✨',
              description: 'Light on'
            },
            negative: {
              sentence: 'The light is not on.',
              image: '💡❌',
              description: 'Light off'
            },
            questions: [
              {
                question: 'Look at: 💡✨ - Is the light on?',
                answer: 'yes',
                choices: ['yes', 'no']
              },
              {
                question: 'Look at: 💡❌ - Is the light on?',
                answer: 'no',
                choices: ['yes', 'no']
              }
            ]
          }
        ]
      },
      {
        theme: 'Weather & Nature',
        scenarios: [
          {
            positive: {
              sentence: 'It is sunny.',
              image: '☀️😊',
              description: 'Sunny day'
            },
            negative: {
              sentence: 'It is not sunny.',
              image: '☁️😔',
              description: 'Cloudy day'
            },
            questions: [
              {
                question: 'Look at: ☀️😊 - Is it sunny?',
                answer: 'yes',
                choices: ['yes', 'no']
              },
              {
                question: 'Look at: ☁️😔 - Is it sunny?',
                answer: 'no',
                choices: ['yes', 'no']
              }
            ]
          },
          {
            positive: {
              sentence: 'The flower is big.',
              image: '🌸🔍',
              description: 'Big flower'
            },
            negative: {
              sentence: 'The flower is not big.',
              image: '🌸👌',
              description: 'Small flower'
            },
            questions: [
              {
                question: 'Look at: 🌸🔍 - Is the flower big?',
                answer: 'yes',
                choices: ['yes', 'no']
              },
              {
                question: 'Look at: 🌸👌 - Is the flower big?',
                answer: 'no',
                choices: ['yes', 'no']
              }
            ]
          }
        ]
      }
    ],
    advanced: [
      {
        theme: 'Complex Actions',
        scenarios: [
          {
            positive: {
              sentence: 'She always remembers her homework.',
              image: '✅📚👧',
              description: 'A girl remembering homework'
            },
            negative: {
              sentence: 'She never remembers her homework.',
              image: '🚫📚👧',
              description: 'A girl forgetting homework'
            },
            questions: [
              {
                question: 'If someone never remembers their homework, how often do they forget?',
                answer: 'always',
                choices: ['sometimes', 'never', 'always']
              }
            ]
          },
          {
            positive: {
              sentence: 'The students were talking loudly.',
              image: '🗣️👥📢',
              description: 'Students talking loudly'
            },
            negative: {
              sentence: 'The students were not talking loudly.',
              image: '🚫🗣️👥',
              description: 'Students being quiet'
            },
            questions: [
              {
                question: 'If students are not talking loudly, they are being...',
                answer: 'quiet',
                choices: ['loud', 'quiet', 'rude']
              }
            ]
          }
        ]
      },
      {
        theme: 'Emotions & States',
        scenarios: [
          {
            positive: {
              sentence: 'The movie was interesting.',
              image: '🎬😊',
              description: 'An interesting movie'
            },
            negative: {
              sentence: 'The movie was not interesting.',
              image: '🚫🎬😴',
              description: 'A boring movie'
            },
            questions: [
              {
                question: 'If a movie is not interesting, it is probably...',
                answer: 'boring',
                choices: ['exciting', 'boring', 'funny']
              }
            ]
          }
        ]
      }
    ]
  };

  const negationWords = [
    { word: 'not', example: 'is not happy' },
    { word: 'no', example: 'no cookies left' },
    { word: 'never', example: 'never goes there' },
    { word: 'nobody', example: 'nobody came' },
    { word: 'nothing', example: 'nothing happened' },
    { word: 'nowhere', example: 'nowhere to go' }
  ];

  const getCurrentScenarios = () => scenarioData[currentLevel];
  const getCurrentScenario = () => {
    const themes = getCurrentScenarios();
    const allScenarios = themes.flatMap(theme => theme.scenarios);
    return allScenarios[currentScenarioIndex] || allScenarios[0];
  };

  const getTotalScenarios = () => {
    return getCurrentScenarios().reduce((total, theme) => total + theme.scenarios.length, 0);
  };

  const activities = [
    { id: 'learn', name: '🚦 Learn Negation', description: 'Understand what negation means' },
    { id: 'compare', name: '👀 Compare Sentences', description: 'See positive vs negative' },
    { id: 'comprehend', name: '🧠 Comprehension', description: 'Answer questions about negation' },
    { id: 'transform', name: '🔄 Transform Sentences', description: 'Add or remove negation' }
  ];

  const setLevel = (level) => {
    setCurrentLevel(level);
    setCurrentScenarioIndex(0);
    setCurrentActivity('learn');
    setSelectedAnswers({});
    setFeedback({ show: false, success: false, message: '' });
  };

  const nextScenario = () => {
    const totalScenarios = getTotalScenarios();
    if (currentScenarioIndex < totalScenarios - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    }
  };

  const prevScenario = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
    }
  };

  const selectAnswer = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const checkAnswers = () => {
    const scenario = getCurrentScenario();
    let correct = 0;
    let total = 0;

    if (currentActivity === 'comprehend') {
      scenario.questions.forEach((question, index) => {
        total++;
        const questionId = `${currentLevel}-${currentScenarioIndex}-${index}`;
        if (selectedAnswers[questionId] === question.answer) {
          correct++;
        }
      });
    }

    const success = correct === total && total > 0;

    if (success) {
      setCompletedActivities(prev => new Set([...prev, `${currentLevel}-${currentScenarioIndex}-${currentActivity}`]));
      setFeedback({
        show: true,
        success: true,
        message: `🎉 Excellent navigation! You got ${correct} out of ${total} correct!`
      });
    } else {
      setFeedback({
        show: true,
        success: false,
        message: `Good try! You got ${correct} out of ${total} correct. Keep practicing!`
      });
    }
  };

  const resetActivity = () => {
    setSelectedAnswers({});
    setFeedback({ show: false, success: false, message: '' });
  };

  const renderLearnActivity = () => (
    <div className="learn-activity">
      <div className="negation-intro">
        <h2>🚦 What is Negation?</h2>
        <p>Negation changes the meaning of a sentence to its opposite!</p>

        <div className="traffic-light-demo">
          <div className="light positive">
            <div className="light-circle green">✅</div>
            <div className="light-text">POSITIVE</div>
            <div className="example">"I am happy"</div>
          </div>

          <div className="arrow">➡️</div>

          <div className="light negative">
            <div className="light-circle red">🚫</div>
            <div className="light-text">NEGATIVE</div>
            <div className="example">"I am NOT happy"</div>
          </div>
        </div>

        <div className="negation-words-section">
          <h3>🔍 Negation Words to Look For:</h3>
          <div className="negation-words-grid">
            {negationWords.map((item, index) => (
              <div key={index} className="negation-word-card">
                <div className="negation-word">{item.word}</div>
                <div className="negation-example">{item.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompareActivity = () => {
    const scenario = getCurrentScenario();
    return (
      <div className="compare-activity">
        <h3>👀 Compare These Sentences</h3>

        <div className="sentence-comparison">
          <div className="sentence-card positive">
            <div className="card-header positive-header">
              <div className="icon">✅</div>
              <div className="label">POSITIVE</div>
            </div>
            <div className="sentence-visual">
              <div className="emoji">{scenario.positive.image}</div>
              <div className="description">{scenario.positive.description}</div>
            </div>
            <div className="sentence-text">{scenario.positive.sentence}</div>
          </div>

          <div className="vs-connector">
            <div className="vs-text">VS</div>
            <div className="arrow">⚡</div>
          </div>

          <div className="sentence-card negative">
            <div className="card-header negative-header">
              <div className="icon">🚫</div>
              <div className="label">NEGATIVE</div>
            </div>
            <div className="sentence-visual">
              <div className="emoji">{scenario.negative.image}</div>
              <div className="description">{scenario.negative.description}</div>
            </div>
            <div className="sentence-text">{scenario.negative.sentence}</div>
          </div>
        </div>

        <div className="navigation-controls">
          <button onClick={prevScenario} disabled={currentScenarioIndex === 0} className="nav-btn">
            ← Previous
          </button>
          <span className="scenario-counter">
            {currentScenarioIndex + 1} of {getTotalScenarios()}
          </span>
          <button onClick={nextScenario} disabled={currentScenarioIndex === getTotalScenarios() - 1} className="nav-btn">
            Next →
          </button>
        </div>
      </div>
    );
  };

  const renderComprehendActivity = () => {
    const scenario = getCurrentScenario();
    return (
      <div className="comprehend-activity">
        <h3>🧠 Answer Questions About Negation</h3>

        <div className="scenario-context">
          <div className="context-sentences">
            <div className="context-sentence positive">{scenario.positive.sentence}</div>
            <div className="context-sentence negative">{scenario.negative.sentence}</div>
          </div>
        </div>

        {scenario.questions.map((question, index) => {
          const questionId = `${currentLevel}-${currentScenarioIndex}-${index}`;
          const selected = selectedAnswers[questionId];

          return (
            <div key={index} className="question-card">
              <div className="question-text">{question.question}</div>

              <div className="answer-choices">
                {question.choices.map(choice => (
                  <button
                    key={choice}
                    className={`choice-btn ${selected === choice ? 'selected' : ''}`}
                    onClick={() => selectAnswer(questionId, choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <div className="action-buttons">
          <button onClick={checkAnswers} className="primary check-btn">
            ✓ Check My Understanding
          </button>
          <button onClick={resetActivity} className="warning reset-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="negation-navigator">
      <header className="activity-header">
        <div className="header-content">
          <h1>🚫➡️✅ Negation Navigator</h1>
          <div className="level-indicator">
            Level: {currentLevel} | Activity: {activities.find(a => a.id === currentActivity)?.name}
          </div>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
            <button onClick={resetActivity} className="warning">
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Level Selector */}
        <div className="level-selector">
          <button
            className={`level-btn ${currentLevel === 'beginner' ? 'active' : ''}`}
            onClick={() => setLevel('beginner')}
          >
            🟢 Beginner Navigator
          </button>
          <button
            className={`level-btn ${currentLevel === 'advanced' ? 'active' : ''}`}
            onClick={() => setLevel('advanced')}
          >
            🟣 Advanced Navigator
          </button>
        </div>

        {/* Activity Selector */}
        <div className="activity-selector">
          {activities.map(activity => (
            <button
              key={activity.id}
              className={`activity-btn ${currentActivity === activity.id ? 'active' : ''}`}
              onClick={() => setCurrentActivity(activity.id)}
            >
              <div className="activity-name">{activity.name}</div>
              <div className="activity-desc">{activity.description}</div>
            </button>
          ))}
        </div>

        <div className="navigator-container">
          {currentActivity === 'learn' && renderLearnActivity()}
          {currentActivity === 'compare' && renderCompareActivity()}
          {currentActivity === 'comprehend' && renderComprehendActivity()}

          {currentActivity === 'transform' && (
            <div className="transform-activity">
              <div className="coming-soon">
                🚧 Transform Activity Coming Soon! 🚧
                <p>This activity will let you add or remove negation from sentences.</p>
              </div>
            </div>
          )}

          {feedback.show && (
            <div className={`feedback ${feedback.success ? 'success' : 'error'} show`}>
              <p>{feedback.message}</p>
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

export default NegationNavigator;