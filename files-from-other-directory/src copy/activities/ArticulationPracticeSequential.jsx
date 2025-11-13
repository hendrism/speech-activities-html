import React, { useMemo, useState } from 'react';
import { articulationWordData, articulationSentenceTemplates } from '../data/articulationPracticeData';
import './ArticulationPracticeSequential.css';

const POS_LABELS = {
  noun: 'Noun',
  verb: 'Verb',
  adjective: 'Adjective'
};

const POS_EMOJI = {
  noun: '🔵',
  verb: '🟢',
  adjective: '🟣'
};

const getPosColorClass = (pos) => {
  switch (pos) {
    case 'noun':
      return 'noun';
    case 'verb':
      return 'verb';
    case 'adjective':
      return 'adjective';
    default:
      return 'neutral';
  }
};

const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const ArticulationPracticeSequential = () => {
  const [showSetup, setShowSetup] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBlends, setSelectedBlends] = useState([]);
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState('prompt');
  const [selectedWord, setSelectedWord] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);

  const categoryData = selectedCategory ? articulationWordData[selectedCategory] : null;

  const availableWords = useMemo(() => {
    if (!categoryData || selectedBlends.length === 0) return [];

    return selectedBlends.flatMap((blend) => {
      const words = categoryData.blends[blend] || [];
      return words.map((word, index) => ({
        ...word,
        id: `${blend}-${index}-${word.text}`
      }));
    });
  }, [categoryData, selectedBlends]);

  const wordsByPos = useMemo(() => {
    return availableWords.reduce(
      (acc, word) => {
        if (!acc[word.pos]) {
          acc[word.pos] = [];
        }
        acc[word.pos].push(word);
        return acc;
      },
      { noun: [], verb: [], adjective: [] }
    );
  }, [availableWords]);

  const currentSentence = deck[currentIndex] || null;
  const hasSession = deck.length > 0 && currentSentence;
  const currentWords = currentSentence ? wordsByPos[currentSentence.blank.pos] || [] : [];
  const buildSentence = (sentence, word) => {
    const start = sentence.template.trim();
    const inserted = word.text;
    const ending = sentence.ending.trim();
    return `${start} ${inserted} ${ending}`.replace(/\s+/g, ' ').trim();
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedBlends([]);
  };

  const handleBlendToggle = (blend) => {
    setSelectedBlends((prev) => {
      if (prev.includes(blend)) {
        return prev.filter((item) => item !== blend);
      }
      return [...prev, blend];
    });
  };

  const handleSelectAll = () => {
    if (!categoryData) return;
    const all = Object.keys(categoryData.blends);
    setSelectedBlends(all);
  };

  const handleClearAll = () => {
    setSelectedBlends([]);
  };

  const resetSession = () => {
    setShowSetup(true);
    setDeck([]);
    setCurrentIndex(0);
    setStage('prompt');
    setSelectedWord(null);
    setSessionHistory([]);
  };

  const startSession = () => {
    if (!categoryData || selectedBlends.length === 0) return;

    const eligibleSentences = articulationSentenceTemplates.filter(
      (sentence) => (wordsByPos[sentence.blank.pos] || []).length > 0
    );

    if (eligibleSentences.length === 0) {
      return;
    }

    const randomized = shuffleArray(eligibleSentences).slice(0, Math.max(20, eligibleSentences.length));

    setDeck(randomized);
    setCurrentIndex(0);
    setStage('prompt');
    setSelectedWord(null);
    setSessionHistory([]);
    setShowSetup(false);
  };

  const handleWordSelect = (word) => {
    if (!currentSentence) return;
    setSelectedWord(word);
    setStage('sentence');
  };

  const handleRechoose = () => {
    setSelectedWord(null);
    setStage('prompt');
  };

  const handleNextSentence = () => {
    if (!currentSentence || !selectedWord) return;
    const newHistory = [
      ...sessionHistory,
      {
        sentenceId: currentSentence.id,
        word: selectedWord,
        sentence: buildSentence(currentSentence, selectedWord)
      }
    ];
    setSessionHistory(newHistory);

    if (currentIndex === deck.length - 1) {
      setStage('complete');
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedWord(null);
    setStage('prompt');
  };

  const renderSetup = () => (
    <div className="aps-container">
      <header className="aps-header">
        <div>
          <h1>🗣️ Articulation Practice - Sequential Builder</h1>
          <p>Choose target blends to build a randomized practice deck with more than 20 sentences.</p>
        </div>
      </header>

      <main className="aps-main">
        <section className="aps-panel">
          <h2>Select Target Category</h2>
          <div className="aps-category-buttons">
            <button
              type="button"
              className={`aps-category-btn ${selectedCategory === 'sBlends' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('sBlends')}
            >
              S-Blends
            </button>
            <button
              type="button"
              className={`aps-category-btn ${selectedCategory === 'rBlends' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('rBlends')}
            >
              R-Blends
            </button>
            <button
              type="button"
              className={`aps-category-btn ${selectedCategory === 'lBlends' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('lBlends')}
            >
              L-Blends
            </button>
            <button
              type="button"
              className={`aps-category-btn ${selectedCategory === 'otherSounds' ? 'selected' : ''}`}
              onClick={() => handleCategorySelect('otherSounds')}
            >
              /k/, /g/, /sh/, /f/, /l/
            </button>
          </div>
        </section>

        {categoryData && (
          <section className="aps-panel">
            <div className="aps-panel-header">
              <h2>Select Specific Blends</h2>
              <div className="aps-panel-actions">
                <button type="button" className="aps-secondary-btn" onClick={handleSelectAll}>
                  Select All {categoryData.name}
                </button>
                <button type="button" className="aps-tertiary-btn" onClick={handleClearAll}>
                  Clear
                </button>
              </div>
            </div>
            <div className="aps-blend-list">
              {Object.keys(categoryData.blends).map((blend) => (
                <label key={blend} className="aps-blend-option">
                  <input
                    type="checkbox"
                    checked={selectedBlends.includes(blend)}
                    onChange={() => handleBlendToggle(blend)}
                  />
                  <span>{blend.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </section>
        )}

        {selectedBlends.length > 0 && (
          <section className="aps-panel">
            <h2>Available Words</h2>
            <div className="aps-word-summary">
              <div className={`aps-summary-chip noun`}>
                🔵 Nouns: {wordsByPos.noun.length}
              </div>
              <div className={`aps-summary-chip verb`}>
                🟢 Verbs: {wordsByPos.verb.length}
              </div>
              <div className={`aps-summary-chip adjective`}>
                🟣 Adjectives: {wordsByPos.adjective.length}
              </div>
            </div>
            <p className="aps-summary-note">
              We&apos;ll include sentences that match the available word types so every prompt has a valid option.
            </p>
          </section>
        )}

        <section className="aps-panel aps-start-panel">
          <button
            type="button"
            className="aps-primary-btn"
            onClick={startSession}
            disabled={selectedBlends.length === 0 || availableWords.length === 0}
          >
            Start Practice
          </button>
          {selectedBlends.length > 0 && availableWords.length === 0 && (
            <p className="aps-warning">Add blends that include nouns, verbs, or adjectives to continue.</p>
          )}
        </section>
      </main>
    </div>
  );

  const renderPractice = () => {
    if (!hasSession && stage !== 'complete') {
      return (
        <div className="aps-container">
          <main className="aps-main">
            <section className="aps-panel">
              <p>Please restart the activity to begin.</p>
              <button type="button" className="aps-primary-btn" onClick={resetSession}>
                Back to Setup
              </button>
            </section>
          </main>
        </div>
      );
    }

    if (stage === 'complete') {
      return (
        <div className="aps-container">
          <header className="aps-header">
            <div>
              <h1>🎉 Articulation Session Complete</h1>
              <p>Review the sentences you practiced or jump back to set up a new set.</p>
            </div>
          </header>
          <main className="aps-main">
            <section className="aps-panel">
              <h2>Practiced Sentences</h2>
              <ul className="aps-history-list">
                {sessionHistory.map((entry, index) => (
                  <li key={entry.sentenceId} className="aps-history-item">
                    <span className="aps-history-index">{index + 1}.</span>
                    <span>{entry.sentence}</span>
                    <span className={`aps-history-tag ${getPosColorClass(entry.word.pos)}`}>
                      {POS_EMOJI[entry.word.pos]} {entry.word.text}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
            <section className="aps-panel aps-start-panel">
              <button type="button" className="aps-primary-btn" onClick={resetSession}>
                Build a New Deck
              </button>
            </section>
          </main>
        </div>
      );
    }

    const totalSentences = deck.length;
    const progress = `${currentIndex + 1} / ${totalSentences}`;
    const sentencePos = currentSentence?.blank.pos;

    return (
      <div className="aps-container">
        <header className="aps-header">
          <div>
            <h1>🗣️ Articulation Practice - Sequential Builder</h1>
            <p>Match the highlighted word type, reveal the sentence, then practice it aloud before moving on.</p>
          </div>
          <div className="aps-progress-badge">{progress}</div>
        </header>

        <main className="aps-main">
          {stage === 'prompt' && (
            <>
              <section className="aps-panel">
                <div className="aps-blank-card">
                  <div className={`aps-blank ${getPosColorClass(sentencePos)}`}>
                    <span className="aps-blank-label">
                      {POS_EMOJI[sentencePos]} {POS_LABELS[sentencePos]}
                    </span>
                  </div>
                  <p className="aps-instruction">
                    Pick a {POS_LABELS[sentencePos]?.toLowerCase()} from the bank to reveal the sentence.
                  </p>
                </div>
              </section>

              <section className="aps-panel">
                <h2>Word Bank</h2>
                {currentWords.length === 0 ? (
                  <p className="aps-warning">No words available. Return to setup and include blends with this word type.</p>
                ) : (
                  <div className="aps-word-bank">
                    {currentWords.map((word) => (
                      <button
                        type="button"
                        key={word.id}
                        className={`aps-word-btn ${getPosColorClass(word.pos)}`}
                        onClick={() => handleWordSelect(word)}
                      >
                        {word.text}
                      </button>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {stage === 'sentence' && selectedWord && (
            <section className="aps-panel">
              <h2>Practice Sentence</h2>
              <div className="aps-sentence-card">
                <p>{buildSentence(currentSentence, selectedWord)}</p>
                <div className="aps-sentence-actions">
                  <button type="button" className="aps-tertiary-btn" onClick={handleRechoose}>
                    Pick a different word
                  </button>
                  <button type="button" className="aps-primary-btn" onClick={handleNextSentence}>
                    Next Sentence →
                  </button>
                </div>
              </div>
            </section>
          )}
        </main>

        <footer className="aps-footer">
          <button type="button" className="aps-secondary-btn" onClick={resetSession}>
            Restart Setup
          </button>
        </footer>
      </div>
    );
  };

  return showSetup ? renderSetup() : renderPractice();
};

export default ArticulationPracticeSequential;
