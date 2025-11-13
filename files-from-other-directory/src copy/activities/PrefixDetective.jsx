import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './PrefixDetective.css';

const PrefixDetective = () => {
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [currentActivity, setCurrentActivity] = useState('learn');
  const [currentPrefixIndex, setCurrentPrefixIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });
  const [completedActivities, setCompletedActivities] = useState(new Set());
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const prefixData = {
    beginner: [
      {
        prefix: 'pre-',
        meaning: 'before',
        color: '#3b82f6',
        examples: [
          { word: 'preview', root: 'view', meaning: 'to see before' },
          { word: 'preheat', root: 'heat', meaning: 'to heat before' },
          { word: 'pretest', root: 'test', meaning: 'a test given before' }
        ],
        sentences: [
          { text: 'Mom will ___ the oven before baking cookies.', answer: 'preheat', choices: ['preheat', 'reheat', 'heat'] },
          { text: 'We got a ___ of the movie before it came out.', answer: 'preview', choices: ['preview', 'review', 'view'] },
          { text: 'The teacher gave us a ___ to see what we already know.', answer: 'pretest', choices: ['test', 'pretest', 'retest'] }
        ],
        identifyWords: [
          { sentence: 'I will preview the book before reading it.', targetWord: 'preview', prefix: 'pre-' },
          { sentence: 'Please preheat the oven to 350 degrees.', targetWord: 'preheat', prefix: 'pre-' },
          { sentence: 'The pretest showed what we already knew.', targetWord: 'pretest', prefix: 'pre-' }
        ]
      },
      {
        prefix: 'post-',
        meaning: 'after',
        color: '#10b981',
        examples: [
          { word: 'postgame', root: 'game', meaning: 'after the game' },
          { word: 'postwar', root: 'war', meaning: 'after the war' },
          { word: 'postpone', root: 'pone (put)', meaning: 'to put after/delay' }
        ],
        sentences: [
          { text: 'The ___ interview was very exciting.', answer: 'postgame', choices: ['pregame', 'postgame', 'game'] },
          { text: 'We had to ___ the picnic because of rain.', answer: 'postpone', choices: ['postpone', 'propose', 'suppose'] },
          { text: 'The ___ period was peaceful.', answer: 'postwar', choices: ['prewar', 'postwar', 'war'] }
        ],
        identifyWords: [
          { sentence: 'The postgame celebration was amazing!', targetWord: 'postgame', prefix: 'post-' },
          { sentence: 'We had to postpone the party until next week.', targetWord: 'postpone', prefix: 'post-' },
          { sentence: 'The postwar years brought peace and hope.', targetWord: 'postwar', prefix: 'post-' }
        ]
      },
      {
        prefix: 'inter-',
        meaning: 'between',
        color: '#8b5cf6',
        examples: [
          { word: 'interact', root: 'act', meaning: 'to act between people' },
          { word: 'interstate', root: 'state', meaning: 'between states' },
          { word: 'intermission', root: 'mission', meaning: 'break between acts' }
        ],
        sentences: [
          { text: 'We took a break during the ___ at the play.', answer: 'intermission', choices: ['intermission', 'mission', 'admission'] },
          { text: 'The ___ highway connects many states.', answer: 'interstate', choices: ['interstate', 'intrastate', 'state'] },
          { text: 'Students should ___ with their classmates.', answer: 'interact', choices: ['interact', 'contract', 'attract'] }
        ],
        identifyWords: [
          { sentence: 'Students interact with each other during group work.', targetWord: 'interact', prefix: 'inter-' },
          { sentence: 'We drove on the interstate highway for hours.', targetWord: 'interstate', prefix: 'inter-' },
          { sentence: 'The intermission gave us time to stretch our legs.', targetWord: 'intermission', prefix: 'inter-' }
        ]
      }
    ],
    advanced: [
      {
        prefix: 'pre-',
        meaning: 'before',
        color: '#3b82f6',
        examples: [
          { word: 'prehistoric', root: 'historic', meaning: 'before recorded history' },
          { word: 'prejudge', root: 'judge', meaning: 'to judge before knowing facts' },
          { word: 'prerequisite', root: 'requisite', meaning: 'required beforehand' }
        ],
        sentences: [
          { text: 'Dinosaurs lived in ___ times.', answer: 'prehistoric', choices: ['prehistoric', 'historic', 'futuristic'] },
          { text: 'Math is a ___ for taking calculus.', answer: 'prerequisite', choices: ['prerequisite', 'corequisite', 'requisite'] },
          { text: 'Don\'t ___ people before you know them.', answer: 'prejudge', choices: ['prejudge', 'judge', 'misjudge'] }
        ],
        identifyWords: [
          { sentence: 'Prehistoric animals were much larger than today\'s creatures.', targetWord: 'prehistoric', prefix: 'pre-' },
          { sentence: 'Biology is a prerequisite for taking advanced chemistry.', targetWord: 'prerequisite', prefix: 'pre-' },
          { sentence: 'It\'s wrong to prejudge someone based on appearances.', targetWord: 'prejudge', prefix: 'pre-' }
        ]
      },
      {
        prefix: 'post-',
        meaning: 'after',
        color: '#10b981',
        examples: [
          { word: 'postgraduate', root: 'graduate', meaning: 'after graduation' },
          { word: 'postscript', root: 'script', meaning: 'written after' },
          { word: 'posterior', root: 'terior', meaning: 'coming after' }
        ],
        sentences: [
          { text: 'She is pursuing ___ studies at the university.', answer: 'postgraduate', choices: ['undergraduate', 'postgraduate', 'graduate'] },
          { text: 'He added a ___ to his letter.', answer: 'postscript', choices: ['manuscript', 'postscript', 'transcript'] },
          { text: 'The ___ view shows the back side.', answer: 'posterior', choices: ['anterior', 'posterior', 'superior'] }
        ],
        identifyWords: [
          { sentence: 'She earned her postgraduate degree in engineering.', targetWord: 'postgraduate', prefix: 'post-' },
          { sentence: 'He added a postscript with additional information.', targetWord: 'postscript', prefix: 'post-' },
          { sentence: 'The posterior muscles are located at the back.', targetWord: 'posterior', prefix: 'post-' }
        ]
      },
      {
        prefix: 'inter-',
        meaning: 'between',
        color: '#8b5cf6',
        examples: [
          { word: 'international', root: 'national', meaning: 'between nations' },
          { word: 'interrupt', root: 'rupt', meaning: 'to break between' },
          { word: 'intermediate', root: 'mediate', meaning: 'in the middle level' }
        ],
        sentences: [
          { text: 'The ___ conference included many countries.', answer: 'international', choices: ['national', 'international', 'multinational'] },
          { text: 'Please don\'t ___ while I\'m speaking.', answer: 'interrupt', choices: ['interrupt', 'corrupt', 'erupt'] },
          { text: 'She is taking ___ Spanish this year.', answer: 'intermediate', choices: ['beginner', 'intermediate', 'advanced'] }
        ],
        identifyWords: [
          { sentence: 'The international summit brought together world leaders.', targetWord: 'international', prefix: 'inter-' },
          { sentence: 'Please don\'t interrupt me while I\'m concentrating.', targetWord: 'interrupt', prefix: 'inter-' },
          { sentence: 'The intermediate course is perfect for your skill level.', targetWord: 'intermediate', prefix: 'inter-' }
        ]
      }
    ]
  };

  const getCurrentPrefixes = () => prefixData[currentLevel];
  const getCurrentPrefix = () => getCurrentPrefixes()[currentPrefixIndex];

  const activities = [
    { id: 'learn', name: '🔍 Learn Prefixes', description: 'Discover what each prefix means' },
    { id: 'identify', name: '🎯 Identify Prefixes', description: 'Find prefixes in words' },
    { id: 'complete', name: '✏️ Complete Sentences', description: 'Choose the right prefixed word' },
    { id: 'build', name: '🔧 Build Words', description: 'Create words with prefixes' }
  ];

  const setLevel = (level) => {
    setCurrentLevel(level);
    setCurrentPrefixIndex(0);
    setCurrentActivity('learn');
    setSelectedAnswers({});
    setFeedback({ show: false, success: false, message: '' });
  };

  const nextPrefix = () => {
    const prefixes = getCurrentPrefixes();
    if (currentPrefixIndex < prefixes.length - 1) {
      setCurrentPrefixIndex(currentPrefixIndex + 1);
    }
  };

  const prevPrefix = () => {
    if (currentPrefixIndex > 0) {
      setCurrentPrefixIndex(currentPrefixIndex - 1);
    }
  };

  const selectAnswer = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const checkAnswers = () => {
    const prefix = getCurrentPrefix();
    let correct = 0;
    let total = 0;

    if (currentActivity === 'complete') {
      prefix.sentences.forEach((sentence, index) => {
        total++;
        const questionId = `${currentLevel}-${currentPrefixIndex}-complete-${index}`;
        if (selectedAnswers[questionId] === sentence.answer) {
          correct++;
        }
      });
    } else if (currentActivity === 'identify') {
      prefix.identifyWords.forEach((item, index) => {
        total++;
        const questionId = `${currentLevel}-${currentPrefixIndex}-identify-${index}`;
        if (selectedAnswers[questionId] === item.targetWord) {
          correct++;
        }
      });
    }

    const success = correct === total && total > 0;

    if (success) {
      setCompletedActivities(prev => new Set([...prev, `${currentLevel}-${currentPrefixIndex}-${currentActivity}`]));
      setFeedback({
        show: true,
        success: true,
        message: `🎉 Excellent detective work! You got ${correct} out of ${total} correct!`
      });
    } else {
      setFeedback({
        show: true,
        success: false,
        message: `Good try! You got ${correct} out of ${total} correct. Keep investigating!`
      });
    }
  };

  const resetActivity = () => {
    setSelectedAnswers({});
    setFeedback({ show: false, success: false, message: '' });
  };

  const renderWordBreakdown = (example) => (
    <div className="word-breakdown" key={example.word}>
      <div className="word-parts">
        <span className="prefix-part" style={{ backgroundColor: getCurrentPrefix().color }}>
          {getCurrentPrefix().prefix}
        </span>
        <span className="root-part">{example.root}</span>
        <span className="equals">=</span>
        <span className="full-word">{example.word}</span>
      </div>
      <div className="word-meaning">{example.meaning}</div>
    </div>
  );

  const renderLearnActivity = () => {
    const prefix = getCurrentPrefix();
    return (
      <div className="learn-activity">
        <div className="prefix-card">
          <div className="prefix-header" style={{ backgroundColor: prefix.color }}>
            <div className="prefix-symbol">{prefix.prefix}</div>
            <div className="prefix-meaning">means "{prefix.meaning}"</div>
          </div>

          <div className="examples-section">
            <h3>🔍 Word Detective Examples:</h3>
            {prefix.examples.map(renderWordBreakdown)}
          </div>

          <div className="navigation-buttons">
            <button onClick={prevPrefix} disabled={currentPrefixIndex === 0} className="nav-btn">
              ← Previous
            </button>
            <span className="prefix-counter">
              {currentPrefixIndex + 1} of {getCurrentPrefixes().length}
            </span>
            <button onClick={nextPrefix} disabled={currentPrefixIndex === getCurrentPrefixes().length - 1} className="nav-btn">
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderIdentifyActivity = () => {
    const prefix = getCurrentPrefix();
    return (
      <div className="identify-activity">
        <div className="activity-header">
          <h3>🔍 Find the {prefix.prefix} words in these sentences</h3>
          <p className="instructions">Click on the word that contains the prefix <strong>{prefix.prefix}</strong> (meaning "{prefix.meaning}")</p>
        </div>

        {prefix.identifyWords.map((item, index) => {
          const questionId = `${currentLevel}-${currentPrefixIndex}-identify-${index}`;
          const selected = selectedAnswers[questionId];
          const words = item.sentence.split(' ');

          return (
            <div key={index} className="identify-question">
              <div className="sentence-container">
                {words.map((word, wordIndex) => {
                  // Clean the word of punctuation for comparison
                  const cleanWord = word.replace(/[.,!?]/g, '');
                  const isTarget = cleanWord === item.targetWord;
                  const isSelected = selected === cleanWord;

                  return (
                    <button
                      key={wordIndex}
                      className={`word-btn ${isSelected ? 'selected' : ''} ${isTarget && selected === cleanWord ? 'correct' : ''}`}
                      onClick={() => selectAnswer(questionId, cleanWord)}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              {selected && (
                <div className="selection-feedback">
                  You selected: <strong>{selected}</strong>
                </div>
              )}
            </div>
          );
        })}

        <div className="action-buttons">
          <button onClick={checkAnswers} className="primary check-btn">
            ✓ Check My Detective Work
          </button>
          <button onClick={resetActivity} className="warning reset-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  };

  const renderCompleteActivity = () => {
    const prefix = getCurrentPrefix();
    return (
      <div className="complete-activity">
        <div className="activity-header">
          <h3>🎯 Complete the sentences with {prefix.prefix} words</h3>
        </div>

        {prefix.sentences.map((sentence, index) => {
          const questionId = `${currentLevel}-${currentPrefixIndex}-complete-${index}`;
          const selected = selectedAnswers[questionId];

          return (
            <div key={index} className="sentence-question">
              <div className="sentence-text">
                {sentence.text.split('___').map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && (
                      <span className="blank-space">
                        {selected || '___'}
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <div className="choices">
                {sentence.choices.map(choice => (
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
            ✓ Check My Detective Work
          </button>
          <button onClick={resetActivity} className="warning reset-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="prefix-detective">
      <header className="activity-header">
        <div className="header-content">
          <h1>🔍 Prefix Detective</h1>
          <div className="level-indicator">
            Level: {currentLevel} | Prefix: {getCurrentPrefix().prefix}
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
            🟢 Beginner Detective
          </button>
          <button
            className={`level-btn ${currentLevel === 'advanced' ? 'active' : ''}`}
            onClick={() => setLevel('advanced')}
          >
            🟣 Advanced Detective
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

        <div className="detective-container">
          {currentActivity === 'learn' && renderLearnActivity()}
          {currentActivity === 'identify' && renderIdentifyActivity()}
          {currentActivity === 'complete' && renderCompleteActivity()}

          {currentActivity === 'build' && (
            <div className="build-activity">
              <div className="coming-soon">
                🚧 Build Words Activity Coming Soon! 🚧
                <p>This activity will let you create new words with prefixes.</p>
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

export default PrefixDetective;