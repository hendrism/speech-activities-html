import React, { useEffect, useMemo, useRef, useState } from 'react';
import { multipleMeaningSentenceData } from '../data/multipleMeaningSentenceData';
import './MultipleMeaningSentences.css';

const shuffleArray = (array) => {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
};

const MultipleMeaningSentences = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [sequence, setSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [helpStage, setHelpStage] = useState(0); // 0: none, 1: clue, 2: choices
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [clueHighlight, setClueHighlight] = useState(false);

  const cluePulseTimeout = useRef(null);

  const sentences = multipleMeaningSentenceData[difficulty] || [];

  useEffect(() => {
    const indices = sentences.map((_, index) => index);
    setSequence(shuffleArray(indices));
    setCurrentIndex(0);
    setHelpStage(0);
    setSelectedChoice(null);
    setFeedback(null);
    setClueHighlight(false);
  }, [difficulty, sentences]);

  const currentSentenceIndex = sequence[currentIndex] ?? 0;
  const currentSentence = sentences[currentSentenceIndex] || sentences[0];

  const wordTotals = useMemo(() => {
    const totals = {};
    sentences.forEach((item) => {
      totals[item.word] = (totals[item.word] || 0) + 1;
    });
    return totals;
  }, [sentences]);

  const navigationItems = useMemo(() => {
    const occurrenceTracker = {};
    return sequence.map((sentenceIndex, navIndex) => {
      const sentenceData = sentences[sentenceIndex];
      if (!sentenceData) return null;
      const { word } = sentenceData;
      occurrenceTracker[word] = (occurrenceTracker[word] || 0) + 1;
      const occurrence = occurrenceTracker[word];
      const total = wordTotals[word] || 1;

      return {
        navIndex,
        sentenceIndex,
        word,
        occurrence,
        total,
        isActive: navIndex === currentIndex
      };
    }).filter(Boolean);
  }, [sequence, sentences, currentIndex, wordTotals]);

  const shuffledChoices = useMemo(() => {
    if (!currentSentence) return [];
    const enriched = currentSentence.choices.map((choice, index) => ({
      text: choice,
      isCorrect: index === currentSentence.correctIndex
    }));
    return shuffleArray(enriched);
  }, [currentSentence]);

  const responseKey = `${difficulty}-${currentSentenceIndex}`;

  const highlightedSentenceParts = useMemo(() => {
    if (!currentSentence) return [];
    const { sentence, word } = currentSentence;
    const pattern = new RegExp(`(${word})`, 'gi');
    return sentence.split(pattern).filter((part) => part.length > 0);
  }, [currentSentence]);

  const handleResponseChange = (value) => {
    setResponses((prev) => ({ ...prev, [responseKey]: value }));
  };

  const triggerClueHighlight = () => {
    if (cluePulseTimeout.current) {
      clearTimeout(cluePulseTimeout.current);
    }
    setClueHighlight(true);
    cluePulseTimeout.current = setTimeout(() => setClueHighlight(false), 600);
  };

  const handleNeedHelp = () => {
    setHelpStage((prev) => {
      if (prev >= 1) {
        triggerClueHighlight();
        return prev;
      }
      triggerClueHighlight();
      return 1;
    });
    setSelectedChoice(null);
    setFeedback(null);
  };

  const handleMoreHelp = () => {
    setHelpStage(2);
    setSelectedChoice(null);
    setFeedback(null);
    triggerClueHighlight();
  };

  const handleChoiceSelect = (index) => {
    const choice = shuffledChoices[index];
    setSelectedChoice(index);
    if (choice.isCorrect) {
      setFeedback({
        success: true,
        message: 'Great thinking! You picked the correct meaning for this sentence.'
      });
    } else {
      setFeedback({
        success: false,
        message: 'That meaning doesn’t match this sentence. Try another choice!'
      });
    }
  };

  const goTo = (direction) => {
    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= sequence.length) return;
    setCurrentIndex(nextIndex);
    setHelpStage(0);
    setSelectedChoice(null);
    setFeedback(null);
    setClueHighlight(false);
  };

  const goToNavIndex = (navIndex) => {
    if (navIndex < 0 || navIndex >= sequence.length) return;
    setCurrentIndex(navIndex);
    setHelpStage(0);
    setSelectedChoice(null);
    setFeedback(null);
    setClueHighlight(false);
  };

  useEffect(() => () => {
    if (cluePulseTimeout.current) {
      clearTimeout(cluePulseTimeout.current);
    }
  }, []);

  if (!currentSentence) {
    return (
      <div className="multiple-meaning-sentences">
        <p>No sentence data available.</p>
      </div>
    );
  }

  return (
    <div className="multiple-meaning-sentences">
      <header className="mms-header">
        <div className="header-content">
          <h1>🔁 Multiple-Meaning Word Sentences</h1>
          <div className="progress-pill">
            Sentence {currentIndex + 1} of {sequence.length}
          </div>
          <div className="header-controls">
            <div className="difficulty-toggle">
              <button
                type="button"
                className={difficulty === 'easy' ? 'active' : ''}
                onClick={() => setDifficulty('easy')}
              >
                Easy
              </button>
              <button
                type="button"
                className={difficulty === 'medium' ? 'active' : ''}
                onClick={() => setDifficulty('medium')}
              >
                Medium
              </button>
            </div>
            <button
              type="button"
              className="secondary-btn"
              onClick={() => {
                const indices = sentences.map((_, index) => index);
                setSequence(shuffleArray(indices));
                setCurrentIndex(0);
                setHelpStage(0);
                setSelectedChoice(null);
                setFeedback(null);
                setClueHighlight(false);
              }}
            >
              🔀 Shuffle Again
            </button>
          </div>
        </div>
      </header>

      <main className="mms-main">
        <div className="sentence-nav">
          {navigationItems.map((item) => (
            <button
              type="button"
              key={`${item.word}-${item.navIndex}`}
              className={`sentence-nav-chip ${item.isActive ? 'active' : ''}`}
              onClick={() => goToNavIndex(item.navIndex)}
            >
              <span className="nav-word">{item.word}</span>
              {item.total > 1 && (
                <span className="nav-pos">
                  {item.occurrence}/{item.total}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="sentence-card">
          <div className="sentence-header">
            <span className="word-chip">{currentSentence.word}</span>
            <p className="sentence-text">
              {highlightedSentenceParts.map((part, index) => {
                const isMatch = part.toLowerCase() === currentSentence.word.toLowerCase();
                return isMatch ? (
                  <span key={`${part}-${index}`} className="highlighted-word">
                    {part}
                  </span>
                ) : (
                  <span key={`${part}-${index}`}>{part}</span>
                );
              })}
            </p>
          </div>

          <textarea
            className="response-box"
            placeholder={currentSentence.prompt}
            value={responses[responseKey] || ''}
            onChange={(e) => handleResponseChange(e.target.value)}
            rows={4}
          />

          <div className="help-buttons">
            <button
              type="button"
              className="help-btn"
              onClick={handleNeedHelp}
            >
              🙋 I need help
            </button>
            <button
              type="button"
              className="help-btn"
              onClick={handleMoreHelp}
            >
              💡 I need more help
            </button>
          </div>

          {helpStage >= 1 && (
            <div className={`clue-box ${clueHighlight ? 'pulse' : ''}`}>
              <strong>Clue:</strong> {currentSentence.clue}
            </div>
          )}

          {helpStage >= 2 && (
            <div className="choices-box">
              <h3>Choose the best meaning:</h3>
              <div className="choices-grid">
                {shuffledChoices.map((choice, index) => (
                  <button
                    type="button"
                    key={choice.text}
                    className={`choice-pill ${
                      selectedChoice === index
                        ? choice.isCorrect
                          ? 'correct'
                          : 'incorrect'
                        : ''
                    }`}
                    onClick={() => handleChoiceSelect(index)}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {feedback && (
            <div className={`feedback ${feedback.success ? 'success' : 'error'}`}>
              {feedback.message}
            </div>
          )}

          <div className="navigation-row">
            <button type="button" className="nav-btn" onClick={() => goTo(-1)} disabled={currentIndex === 0}>
              ← Previous
            </button>
            <button
              type="button"
              className="nav-btn primary"
              onClick={() => goTo(1)}
              disabled={currentIndex === sequence.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MultipleMeaningSentences;
