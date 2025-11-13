import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ArticulationPractice.css';
import { articulationWordData, articulationSentenceTemplates } from '../data/articulationPracticeData';

const ArticulationPractice = () => {
  const [draggedWord, setDraggedWord] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showSetup, setShowSetup] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBlends, setSelectedBlends] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const iconManager = useIconManager();

  const allWordsData = articulationWordData;
  const sentenceTemplates = articulationSentenceTemplates;

  useEffect(() => {
    initializeActivity();
  }, []);

  const getSelectedWords = () => {
    if (!selectedCategory || selectedBlends.length === 0) return [];

    const categoryData = allWordsData[selectedCategory];
    let words = [];

    selectedBlends.forEach(blend => {
      if (categoryData.blends[blend]) {
        words = words.concat(categoryData.blends[blend]);
      }
    });

    // Add IDs to words
    return words.map((word, index) => ({ ...word, id: index + 1 }));
  };

  const initializeActivity = () => {
    const words = getSelectedWords();

    // Shuffle words
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);

    // Initialize sentences with empty blanks
    const initialSentences = sentenceTemplates.map(sent => ({
      ...sent,
      filledWord: null
    }));
    setSentences(initialSentences);
    setIsComplete(false);
  };

  const startActivity = () => {
    if (selectedBlends.length === 0) return;
    setShowSetup(false);
    initializeActivity();
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedBlends([]);
  };

  const handleBlendToggle = (blend) => {
    setSelectedBlends(prev => {
      if (prev.includes(blend)) {
        return prev.filter(b => b !== blend);
      } else {
        return [...prev, blend];
      }
    });
  };

  const handleSelectAllBlends = () => {
    if (!selectedCategory) return;
    const allBlends = Object.keys(allWordsData[selectedCategory].blends);
    setSelectedBlends(allBlends);
  };

  const handleDeselectAllBlends = () => {
    setSelectedBlends([]);
  };

  const handleDragStart = (e, word) => {
    setDraggedWord(word);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedWord(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, sentence) => {
    e.preventDefault();
    if (!sentence.filledWord) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, sentence) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    if (!draggedWord || sentence.filledWord) return;

    // Check if word matches required part of speech
    if (draggedWord.pos !== sentence.blank.pos) {
      // Show brief error feedback
      e.currentTarget.classList.add('wrong-pos');
      setTimeout(() => {
        e.currentTarget.classList.remove('wrong-pos');
      }, 500);
      return;
    }

    // Update sentence with word
    const updatedSentences = sentences.map(s =>
      s.id === sentence.id ? { ...s, filledWord: draggedWord } : s
    );
    setSentences(updatedSentences);

    // Remove word from available words
    setAvailableWords(availableWords.filter(w => w.id !== draggedWord.id));

    // Check if all sentences are filled
    const allFilled = updatedSentences.every(s => s.filledWord !== null);
    setIsComplete(allFilled);
  };

  const handleRemoveWord = (sentence) => {
    if (!sentence.filledWord) return;

    // Return word to bank
    setAvailableWords([...availableWords, sentence.filledWord].sort((a, b) => a.id - b.id));

    // Clear sentence
    const updatedSentences = sentences.map(s =>
      s.id === sentence.id ? { ...s, filledWord: null } : s
    );
    setSentences(updatedSentences);
    setIsComplete(false);
  };

  const resetActivity = () => {
    setShowSetup(true);
    setSelectedCategory(null);
    setSelectedBlends([]);
    setSentences([]);
    setAvailableWords([]);
    setIsComplete(false);
    setCurrentSentenceIndex(0);
    setCurrentPage(1);
  };

  const getCurrentPageSentences = () => {
    return sentences.filter(s => s.page === currentPage);
  };

  const handleNextSentence = () => {
    const pageSentences = getCurrentPageSentences();
    const currentIndexInPage = pageSentences.findIndex((_, idx) =>
      sentences.findIndex(s => s.page === currentPage) + idx === currentSentenceIndex
    );

    if (currentIndexInPage < pageSentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  const handlePrevSentence = () => {
    const firstIndexOfPage = sentences.findIndex(s => s.page === currentPage);
    if (currentSentenceIndex > firstIndexOfPage) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Set currentSentenceIndex to first sentence of the new page
    const firstIndexOfPage = sentences.findIndex(s => s.page === page);
    if (firstIndexOfPage !== -1) {
      setCurrentSentenceIndex(firstIndexOfPage);
    }
  };

  const isPageComplete = (page) => {
    const pageSentences = sentences.filter(s => s.page === page);
    return pageSentences.every(s => s.filledWord !== null);
  };

  const getPosColor = (pos) => {
    switch(pos) {
      case 'noun': return 'blue';
      case 'verb': return 'green';
      case 'adjective': return 'purple';
      default: return 'gray';
    }
  };

  if (showSetup) {
    return (
      <div className="articulation-practice">
        <header className="activity-header">
          <div className="header-content">
            <h1>🗣️ Articulation Practice - Setup</h1>
          </div>
        </header>

        <main className="main-content">
          <div className="setup-container">
            <h2>Select Target Sounds</h2>

            <div className="category-selection">
              <h3>Choose a category:</h3>
              <div className="category-buttons">
                <button
                  onClick={() => handleCategorySelect('sBlends')}
                  className={`category-btn ${selectedCategory === 'sBlends' ? 'selected' : ''}`}
                >
                  S-Blends
                </button>
                <button
                  onClick={() => handleCategorySelect('rBlends')}
                  className={`category-btn ${selectedCategory === 'rBlends' ? 'selected' : ''}`}
                >
                  R-Blends
                </button>
                <button
                  onClick={() => handleCategorySelect('lBlends')}
                  className={`category-btn ${selectedCategory === 'lBlends' ? 'selected' : ''}`}
                >
                  L-Blends
                </button>
                <button
                  onClick={() => handleCategorySelect('otherSounds')}
                  className={`category-btn ${selectedCategory === 'otherSounds' ? 'selected' : ''}`}
                >
                  /k/, /g/, /sh/, /f/
                </button>
              </div>
            </div>

            {selectedCategory && (
              <div className="blend-selection">
                <h3>Select specific blends:</h3>
                <div className="blend-controls">
                  <button onClick={handleSelectAllBlends} className="select-all-btn">
                    Select All {allWordsData[selectedCategory].name}
                  </button>
                  <button onClick={handleDeselectAllBlends} className="deselect-all-btn">
                    Deselect All
                  </button>
                </div>
                <div className="blend-checkboxes">
                  {Object.keys(allWordsData[selectedCategory].blends).map(blend => (
                    <label key={blend} className="blend-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedBlends.includes(blend)}
                        onChange={() => handleBlendToggle(blend)}
                      />
                      <span className="blend-label">/{blend}/</span>
                      <span className="blend-count">
                        ({allWordsData[selectedCategory].blends[blend].length} words)
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedBlends.length > 0 && (
              <div className="start-section">
                <p className="selection-summary">
                  Selected: {selectedBlends.map(b => `/${b}/`).join(', ')}
                  ({getSelectedWords().length} total words)
                </p>
                <button onClick={startActivity} className="start-btn">
                  Start Activity
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  const soundLabel = selectedCategory
    ? `${allWordsData[selectedCategory].name}: ${selectedBlends.map(b => `/${b}/`).join(', ')}`
    : 'Mixed Sounds';

  return (
    <div className="articulation-practice">
      <header className="activity-header">
        <div className="header-content">
          <h1>🗣️ Articulation Practice</h1>
          <div className="sound-badge">{soundLabel}</div>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
            <button onClick={resetActivity} className="warning">
              🔄 Reset Activity
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="activity-container">
          <div className="instructions">
            <p>📝 Drag words from the word bank into the sentences. Words must match the part of speech (noun, verb, or adjective).</p>
            <p><strong>After filling all sentences, read them out loud to practice your sounds!</strong></p>
          </div>

          <div className="content-layout">
            <div className="word-bank-section">
              <h3>Word Bank</h3>

              <div className="word-bank-group">
                <h4 className="pos-header noun">🔵 Nouns</h4>
                <div className="word-bank">
                  {availableWords.filter(w => w.pos === 'noun').map(word => (
                    <div
                      key={word.id}
                      className={`word-card ${word.pos}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, word)}
                      onDragEnd={handleDragEnd}
                    >
                      {word.text}
                    </div>
                  ))}
                  {availableWords.filter(w => w.pos === 'noun').length === 0 && (
                    <div className="empty-bank-message">All used!</div>
                  )}
                </div>
              </div>

              <div className="word-bank-group">
                <h4 className="pos-header verb">🟢 Verbs</h4>
                <div className="word-bank">
                  {availableWords.filter(w => w.pos === 'verb').map(word => (
                    <div
                      key={word.id}
                      className={`word-card ${word.pos}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, word)}
                      onDragEnd={handleDragEnd}
                    >
                      {word.text}
                    </div>
                  ))}
                  {availableWords.filter(w => w.pos === 'verb').length === 0 && (
                    <div className="empty-bank-message">All used!</div>
                  )}
                </div>
              </div>

              <div className="word-bank-group">
                <h4 className="pos-header adjective">🟣 Adjectives</h4>
                <div className="word-bank">
                  {availableWords.filter(w => w.pos === 'adjective').map(word => (
                    <div
                      key={word.id}
                      className={`word-card ${word.pos}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, word)}
                      onDragEnd={handleDragEnd}
                    >
                      {word.text}
                    </div>
                  ))}
                  {availableWords.filter(w => w.pos === 'adjective').length === 0 && (
                    <div className="empty-bank-message">All used!</div>
                  )}
                </div>
              </div>
            </div>

            <div className="sentences-section">
              <div className="pagination-controls">
                <button
                  onClick={() => handlePageChange(1)}
                  className={`page-btn ${currentPage === 1 ? 'active' : ''}`}
                >
                  Page 1 {isPageComplete(1) && '✓'}
                </button>
                <button
                  onClick={() => handlePageChange(2)}
                  className={`page-btn ${currentPage === 2 ? 'active' : ''}`}
                >
                  Page 2 {isPageComplete(2) && '✓'}
                </button>
              </div>

              <div className="sentence-controls">
                <h3>Fill in the Blanks ({currentSentenceIndex - sentences.findIndex(s => s.page === currentPage) + 1} / {getCurrentPageSentences().length})</h3>
                <div className="nav-buttons">
                  <button
                    onClick={handlePrevSentence}
                    disabled={currentSentenceIndex === sentences.findIndex(s => s.page === currentPage)}
                    className="nav-btn"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextSentence}
                    disabled={currentSentenceIndex === sentences.findIndex(s => s.page === currentPage) + getCurrentPageSentences().length - 1}
                    className="nav-btn"
                  >
                    Next →
                  </button>
                </div>
              </div>

              <div className="sentences-list">
                {getCurrentPageSentences().map((sentence, pageIndex) => {
                  const globalIndex = sentences.findIndex(s => s.id === sentence.id);
                  return (
                    <div
                      key={sentence.id}
                      className={`sentence-row ${globalIndex === currentSentenceIndex ? 'current-sentence' : ''} ${globalIndex !== currentSentenceIndex ? 'dimmed' : ''}`}
                    >
                      <span className="sentence-number">{pageIndex + 1}.</span>
                      <div className="sentence-content">
                        <span className="sentence-text">{sentence.template}</span>
                        <div
                          className={`sentence-blank ${sentence.blank.pos} ${sentence.filledWord ? 'filled' : ''}`}
                          onDragOver={handleDragOver}
                          onDragEnter={(e) => handleDragEnter(e, sentence)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, sentence)}
                          onClick={() => handleRemoveWord(sentence)}
                        >
                          {sentence.filledWord ? (
                            <span className="filled-word">{sentence.filledWord.text}</span>
                          ) : (
                            <span className="blank-label">{sentence.blank.pos}</span>
                          )}
                        </div>
                        <span className="sentence-text">{sentence.ending}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {isComplete && (
                <div className="completion-message">
                  <p>🎉 Great job! Now read all your sentences out loud to practice your sounds!</p>
                </div>
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

export default ArticulationPractice;
