import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import { wordsData } from '../data/multipleMeaningWords';
import IconManager from '../components/IconManager';
import './MultipleMeaningWords.css';

const MultipleMeaningWords = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState(new Set());
  const [sentences, setSentences] = useState([]);
  const [matches, setMatches] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const iconManager = useIconManager();
  const currentWord = wordsData[currentWordIndex];

  useEffect(() => {
    shuffleSentences();
  }, [currentWordIndex]);

  const shuffleSentences = () => {
    const shuffled = [...currentWord.sentences].sort(() => Math.random() - 0.5);
    setSentences(shuffled);
    setMatches({});
  };

  const handleSentenceDrop = (sentenceIndex, definitionIndex) => {
    const sentence = sentences[sentenceIndex];
    const isCorrect = sentence.meaning === definitionIndex + 1;

    setMatches(prev => ({
      ...prev,
      [sentenceIndex]: {
        definitionIndex,
        correct: isCorrect,
        attempted: true
      }
    }));

    checkCompletion();
  };

  const checkCompletion = () => {
    setTimeout(() => {
      const allMatched = sentences.every((_, index) => matches[index]?.attempted);
      const allCorrect = sentences.every((_, index) => matches[index]?.correct);

      if (allMatched && allCorrect) {
        setCompletedWords(prev => new Set([...prev, currentWordIndex]));
        setShowCelebration(true);
      }
    }, 100);
  };

  const resetCurrentWord = () => {
    shuffleSentences();
    setCompletedWords(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentWordIndex);
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

  const getSentenceAssignmentKey = (sentenceIndex) => {
    return `multiple-meanings-${currentWordIndex}-sentence-${sentenceIndex}`;
  };

  const getDefinitionAssignmentKey = (definitionIndex) => {
    return `multiple-meanings-${currentWordIndex}-definition-${definitionIndex}`;
  };

  const getSentenceIcon = (sentenceIndex) => {
    const key = getSentenceAssignmentKey(sentenceIndex);
    return iconManager.getIconForAssignment(key);
  };

  const getDefinitionIcon = (definitionIndex) => {
    const key = getDefinitionAssignmentKey(definitionIndex);
    return iconManager.getIconForAssignment(key);
  };

  const renderSentence = (sentence, index) => {
    const match = matches[index];
    const iconSrc = getSentenceIcon(index);

    let className = 'sentence-item draggable';
    if (match?.attempted) {
      className += match.correct ? ' correct' : ' incorrect';
    }

    return (
      <div
        key={index}
        className={className}
        draggable="true"
        onDragStart={(e) => e.dataTransfer.setData('sentenceIndex', index)}
      >
        <div
          className={`sentence-icon ${iconSrc ? '' : 'empty'}`}
          onClick={(e) => {
            if (editMode) {
              e.stopPropagation();
              handleIconAssignment(getSentenceAssignmentKey(index));
            }
          }}
        >
          {iconSrc ? (
            <img src={iconSrc} alt="Sentence icon" />
          ) : (
            editMode && <span className="empty-icon">📷</span>
          )}
        </div>
        <div className="sentence-text">{sentence.text}</div>
        {editMode && (
          <button
            className="icon-assign-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleIconAssignment(getSentenceAssignmentKey(index));
            }}
          >
            🎨
          </button>
        )}
        {match?.attempted && (
          <div className={`feedback-icon ${match.correct ? 'correct' : 'incorrect'}`}>
            {match.correct ? '✓' : '✗'}
          </div>
        )}
      </div>
    );
  };

  const renderDefinition = (definition, index) => {
    const iconSrc = getDefinitionIcon(index);
    const matchedSentences = Object.entries(matches)
      .filter(([, match]) => match.definitionIndex === index)
      .map(([sentenceIndex]) => parseInt(sentenceIndex));

    return (
      <div
        key={index}
        className="definition-slot"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const sentenceIndex = parseInt(e.dataTransfer.getData('sentenceIndex'));
          handleSentenceDrop(sentenceIndex, index);
        }}
      >
        <div className="definition-header">
          <div
            className={`definition-icon ${iconSrc ? '' : 'empty'}`}
            onClick={(e) => {
              if (editMode) {
                e.stopPropagation();
                handleIconAssignment(getDefinitionAssignmentKey(index));
              }
            }}
          >
            {iconSrc ? (
              <img src={iconSrc} alt="Definition icon" />
            ) : (
              editMode && <span className="empty-icon">📷</span>
            )}
          </div>
          <div className="definition-text">
            <strong>Meaning {index + 1}:</strong> {definition}
          </div>
          {editMode && (
            <button
              className="icon-assign-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleIconAssignment(getDefinitionAssignmentKey(index));
              }}
            >
              🎨
            </button>
          )}
        </div>

        <div className="drop-zone">
          {matchedSentences.length === 0 ? (
            <div className="drop-placeholder">
              Drop sentences here that match this meaning
            </div>
          ) : (
            <div className="matched-sentences">
              {matchedSentences.map(sentenceIndex => (
                <div
                  key={sentenceIndex}
                  className={`matched-sentence ${matches[sentenceIndex]?.correct ? 'correct' : 'incorrect'}`}
                >
                  {sentences[sentenceIndex].text}
                  <span className={`result-icon ${matches[sentenceIndex]?.correct ? 'correct' : 'incorrect'}`}>
                    {matches[sentenceIndex]?.correct ? '✓' : '✗'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="multiple-meaning-words">
      <div className="activity-header">
        <div className="header-content">
          <div className="activity-info">
            <h1>🎯 Multiple-Meaning Words</h1>
            <div className="progress-info">
              Word {currentWordIndex + 1} of {wordsData.length} • Completed: {completedWords.size}
            </div>
          </div>
          <div className="controls">
            <button onClick={() => setIconPanelOpen(true)} className="btn-primary">
              🎨 Manage Icons
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={editMode ? 'btn-success' : 'btn-warning'}
            >
              {editMode ? '✓ Done Editing' : '✏️ Edit Icons'}
            </button>
            <button onClick={shuffleSentences} className="btn-primary">
              🎲 Shuffle Sentences
            </button>
            <button onClick={resetCurrentWord} className="btn-warning">
              🔄 Reset Word
            </button>
          </div>
        </div>
      </div>

      <div className="activity-content">
        <div className="word-selector">
          {wordsData.map((word, index) => (
            <button
              key={index}
              className={`word-btn ${index === currentWordIndex ? 'active' : ''} ${completedWords.has(index) ? 'completed' : ''}`}
              onClick={() => setCurrentWordIndex(index)}
            >
              {word.word}
            </button>
          ))}
        </div>

        <div className="activity-container">
          <div className="word-header">
            <div className="current-word">{currentWord.word}</div>
            <div className="word-explanation">
              This word has multiple meanings. Read each sentence and drag it to the correct definition.
            </div>
          </div>

          <div className="matching-area">
            <div className="sentences-bank">
              <h3>📝 Sentences to Sort</h3>
              <div className="sentences-list">
                {sentences.map((sentence, index) => renderSentence(sentence, index))}
              </div>
            </div>

            <div className="arrow-connector">
              <div className="arrow">→</div>
            </div>

            <div className="definitions-side">
              <h3>🎯 Definitions</h3>
              <div className="definitions-list">
                {currentWord.definitions.map((definition, index) => renderDefinition(definition, index))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showCelebration && (
        <div className="celebration-overlay" onClick={() => setShowCelebration(false)}>
          <div className="celebration-content" onClick={(e) => e.stopPropagation()}>
            <h3>🎉 Great Job!</h3>
            <p>You matched all the meanings correctly!</p>
            <button
              className="btn-primary"
              onClick={() => setShowCelebration(false)}
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}

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
};

export default MultipleMeaningWords;