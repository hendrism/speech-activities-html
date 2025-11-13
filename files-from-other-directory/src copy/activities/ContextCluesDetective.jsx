import React, { useState, useMemo, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ContextCluesDetective.css';
import { contextCluesPassages } from '../data/contextCluesData';

const fillerWords = new Set([
  'a', 'an', 'the', 'very', 'really', 'quite', 'so', 'too', 'more', 'most', 'much',
  'many', 'and', 'or', 'just', 'kind', 'of', 'sort', 'sorts', 'kindof', 'sortof',
  'kind-of', 'sort-of', 'to', 'be', 'being', 'been', 'that', 'this', 'means', 'mean',
  'something', 'thing', 'someone', 'somebody', 'some', 'into', 'with', 'without'
]);

const sanitizeText = (text = '') =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const stemWord = (word) => {
  if (word.length <= 3) return word;
  if (word.endsWith('ing')) return word.slice(0, -3);
  if (word.endsWith('ed')) return word.slice(0, -2);
  if (word.endsWith('es')) return word.slice(0, -2);
  if (word.endsWith('s')) return word.slice(0, -1);
  return word;
};

const addVariantsFromPhrase = (phrase, variantSet) => {
  const sanitized = sanitizeText(phrase);
  if (!sanitized) return;

  variantSet.add(sanitized);

  const splitParts = sanitized
    .split(/\bor\b|\band\b|,/)
    .map(part => sanitizeText(part))
    .filter(Boolean);

  const partsToProcess = splitParts.length > 0 ? splitParts : [sanitized];

  partsToProcess.forEach(part => {
    if (!part) return;
    variantSet.add(part);

    const importantWords = part
      .split(' ')
      .map(word => word.trim())
      .filter(word => word && !fillerWords.has(word));

    if (importantWords.length) {
      const condensed = importantWords.join(' ');
      if (condensed) variantSet.add(condensed);
      importantWords.forEach(word => {
        variantSet.add(word);
        const stemmed = stemWord(word);
        if (stemmed && stemmed !== word) {
          variantSet.add(stemmed);
        }
      });
    }
  });

  const importantWords = sanitized
    .split(' ')
    .map(word => word.trim())
    .filter(word => word && !fillerWords.has(word));

  if (importantWords.length) {
    const condensed = importantWords.join(' ');
    if (condensed) variantSet.add(condensed);
    importantWords.forEach(word => {
      variantSet.add(word);
      const stemmed = stemWord(word);
      if (stemmed && stemmed !== word) {
        variantSet.add(stemmed);
      }
    });
  }
};

const buildAnswerVariants = (answer, extraAnswers = []) => {
  const variants = new Set();
  addVariantsFromPhrase(answer, variants);
  extraAnswers.forEach(extra => addVariantsFromPhrase(extra, variants));
  return Array.from(variants).filter(Boolean);
};

const defaultLevelInfo = {
  1: {
    label: '🟢 Level 1',
    description: 'Beginner Detective\nClear context clues'
  },
  2: {
    label: '🟣 Level 2',
    description: 'Expert Detective\nChallenging vocabulary'
  }
};

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ContextCluesDetective = ({
  customPassages,
  headerTitle = '🔍 Context Clues Detective',
  introText = 'Use context clues to discover the meanings of mystery words!',
  badgeLabel = '🔍 WORD DETECTIVE',
  caseLabelPrefix = '🔍 CASE #',
  levelInfo = defaultLevelInfo
}) => {
  const passageData = useMemo(
    () => customPassages || contextCluesPassages,
    [customPassages]
  );

  const availableLevels = useMemo(() => {
    const levels = Object.keys(passageData)
      .filter((key) => key.startsWith('level') && Array.isArray(passageData[key]) && passageData[key].length > 0)
      .map((key) => Number(key.replace('level', '')))
      .sort((a, b) => a - b);
    return levels.length > 0 ? levels : [1];
  }, [passageData]);

  const initialLevel = availableLevels[0] || 1;

  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [currentPassage, setCurrentPassage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showClue1, setShowClue1] = useState(false);
  const [showClue2, setShowClue2] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });
  const [completedPassages, setCompletedPassages] = useState(new Set());
  const [showSetup, setShowSetup] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  useEffect(() => {
    setCurrentLevel(initialLevel);
    setCurrentPassage(0);
    setSelectedAnswer('');
    setSelectedChoice(null);
    setShowClue1(false);
    setShowClue2(false);
    setShowChoices(false);
    setFeedback({ show: false, success: false, message: '' });
    setCompletedPassages(new Set());
    setShowSetup(true);
  }, [initialLevel, passageData]);

  const resetPassageState = () => {
    setSelectedAnswer('');
    setSelectedChoice(null);
    setShowClue1(false);
    setShowClue2(false);
    setShowChoices(false);
    setFeedback({ show: false, success: false, message: '' });
  };

  const getLevelKey = (level) => `level${level}`;

  const getCurrentPassages = () => {
    const levelKey = availableLevels.includes(currentLevel) ? getLevelKey(currentLevel) : getLevelKey(initialLevel);
    return passageData[levelKey] || [];
  };

  const selectLevel = (level) => {
    if (!availableLevels.includes(level)) return;
    setCurrentLevel(level);
    setCurrentPassage(0);
    setCompletedPassages(new Set());
    resetPassageState();
    setShowSetup(false);
  };

  const selectPassage = (index) => {
    const passages = getCurrentPassages();
    if (index < 0 || index >= passages.length) return;
    setCurrentPassage(index);
    resetPassageState();
  };

  const resetActivity = () => {
    resetPassageState();
    setCompletedPassages(new Set());
    setCurrentPassage(0);
  };

  const showClue = (clueNumber, hasChoices) => {
    if (clueNumber === 1) {
      setShowClue1(true);
    } else if (clueNumber === 2) {
      setShowClue2(true);
      if (hasChoices) {
        setShowChoices(true);
      }
    }
  };

  const selectChoice = (index) => {
    setSelectedChoice(index);
  };

  const renderTargetWord = (sentence, word) => {
    if (!sentence || !word) return sentence;
    const pattern = new RegExp(`(${escapeRegExp(word)})`, 'gi');
    const parts = sentence.split(pattern);

    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <span key={`target-${index}`} className="target-word">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const checkAnswer = () => {
    const passages = getCurrentPassages();
    const safeIndex = Math.max(0, Math.min(currentPassage, passages.length - 1));
    const passage = passages[safeIndex];
    if (!passage) return;

    const userAnswer = sanitizeText(selectedAnswer);
    const answerVariants = buildAnswerVariants(passage.answer, passage.acceptableAnswers || []);
    const hasChoices = Array.isArray(passage.choices) && passage.choices.length > 0;

    if (!userAnswer && selectedChoice === null) {
      setFeedback({
        show: true,
        success: false,
        message: 'Please write your answer or select from the choices first!'
      });
      return;
    }

    if (userAnswer) {
      const textMatch = answerVariants.some((variant) => userAnswer.includes(variant));

      if (textMatch) {
        setCompletedPassages((prev) => new Set([...prev, safeIndex]));
        setFeedback({
          show: true,
          success: true,
          message: `🎉 Great detective work! Your answer: "${selectedAnswer}" | Sample answer: "${passage.answer}" | You used the context clues perfectly!`
        });
        return;
      }

      setFeedback({
        show: true,
        success: false,
        message: `Good try! Your answer: "${selectedAnswer}" | The context clues point to: "${passage.answer}" | Try looking for the clue words in the sentence.`
      });
      return;
    }

    if (selectedChoice !== null && hasChoices) {
      const isCorrect = selectedChoice === passage.correct;

      if (isCorrect) {
        setCompletedPassages((prev) => new Set([...prev, safeIndex]));
        setFeedback({
          show: true,
          success: true,
          message: '🎉 Excellent detective work! You found the correct meaning using context clues!'
        });
      } else {
        setFeedback({
          show: true,
          success: false,
          message: `Not quite right. The correct answer is: "${passage.choices[passage.correct]}". Look for the context clues that give away the meaning!`
        });
      }
    }
  };

  const passages = getCurrentPassages();
  if (!passages.length) {
    return (
      <div className="context-clues-detective">
        <header className="activity-header">
          <div className="header-content">
            <h1>{headerTitle}</h1>
          </div>
        </header>
        <main className="main-content">
          <p>No passages available for this activity.</p>
        </main>
      </div>
    );
  }

  const safePassageIndex = Math.max(0, Math.min(currentPassage, passages.length - 1));
  const passage = passages[safePassageIndex];
  const hasChoices = Array.isArray(passage.choices) && passage.choices.length > 0;
  const levelLabel = levelInfo[currentLevel]?.label || `Level ${currentLevel}`;
  const levelDescription = levelInfo[currentLevel]?.description || 'Context clues practice';
  const levelDescriptionLines = levelDescription.split('\n');
  const completedCount = completedPassages.size;

  if (showSetup) {
    return (
      <div className="context-clues-detective">
        <header className="activity-header">
          <div className="header-content">
            <h1>{headerTitle}</h1>
            <div className="header-controls">
              <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
                🎨 Manage Icons
              </button>
              <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
                {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          <div className="setup-panel">
            <div className="detective-header">
              <div className="detective-badge">{badgeLabel}</div>
              <h2>Choose Your Detective Level!</h2>
              <p>{introText}</p>
            </div>

            <div className="level-selector">
              {availableLevels.map((level) => {
                const info = levelInfo[level] || {};
                const labelText = info.label || `Level ${level}`;
                const descriptionText = info.description || 'Context clues practice';
                const [line1, line2] = descriptionText.split('\n');

                return (
                  <button
                    key={level}
                    className={`level-btn level${level}`}
                    onClick={() => selectLevel(level)}
                  >
                    <div>{labelText}</div>
                    <div className="level-desc">
                      {line1}
                      {line2 && <br />}
                      {line2}
                    </div>
                  </button>
                );
              })}
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
  }

  return (
    <div className="context-clues-detective">
      <header className="activity-header">
        <div className="header-content">
          <h1>{headerTitle}</h1>
          <div className="level-info">
            {levelLabel} - {completedCount}/{passages.length} solved
          </div>
          <div className="header-controls">
            <button onClick={() => setShowSetup(true)} className="warning">
              📋 Change Level
            </button>
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
        <div className="passage-selector">
          {passages.map((_, index) => (
            <button
              key={index}
              className={`passage-btn ${index === safePassageIndex ? 'active' : ''} ${
                completedPassages.has(index) ? 'completed' : ''
              }`}
              onClick={() => selectPassage(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="detective-container">
          <div className="detective-header">
          <div className="detective-badge">
            {caseLabelPrefix}
            {safePassageIndex + 1}
          </div>
          <div className="mystery-word">{passage.word}</div>
          <p>
            {levelDescriptionLines.map((line, index) => (
              <React.Fragment key={`${line}-${index}`}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        </div>

          <div className="passage-text">
            {renderTargetWord(passage.passage, passage.word)}
          </div>

          <div className="detective-question">
            <div className="question-text">
              🕵️ Detective, what does "{passage.word}" mean?
            </div>
            <input
              type="text"
              className="answer-input"
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Write your detective conclusion here..."
            />
          </div>

          <div className="detective-tools">
            <button className="warning" onClick={() => showClue(1, hasChoices)}>
              🔍 Clue #1
            </button>
            <button
              className="warning"
              onClick={() => showClue(2, hasChoices)}
              disabled={!showClue1}
            >
              🔍 Clue #2
            </button>
            <button className="primary" onClick={checkAnswer}>
              ✓ Solve Case
            </button>
          </div>

          {showClue1 && (
            <div className="clue-box show">
              <h4>🔍 Detective Clue #1:</h4>
              <p>{passage.clue1}</p>
            </div>
          )}

          {showClue2 && (
            <div className="clue-box show">
              <h4>🔍 Detective Clue #2:</h4>
              <p>{passage.clue2}</p>
            </div>
          )}

          {showChoices && hasChoices && (
            <div className="multiple-choice show">
              <h4>🎯 Detective Options - Choose the best meaning:</h4>
              {passage.choices.map((choice, index) => (
                <div
                  key={index}
                  className={`choice-option ${selectedChoice === index ? 'selected' : ''}`}
                  onClick={() => selectChoice(index)}
                >
                  {choice}
                </div>
              ))}
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

export default ContextCluesDetective;
