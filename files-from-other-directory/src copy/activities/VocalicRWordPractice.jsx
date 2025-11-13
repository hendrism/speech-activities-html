import React, { useMemo, useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './VocalicRWordPractice.css';

const vocalicRGroups = [
  {
    id: 'ar',
    label: '/ar/',
    example: 'car',
    color: '#f97316',
    description: 'R-controlled vowel that sounds like the word "car"',
    sets: [
      {
        id: 'ar-initial',
        label: 'Initial /ar/',
        position: 'initial',
        positionLabel: 'Initial',
        description: 'Words beginning with the /ar/ sound',
        words: ['Archie', 'artifact', 'artichoke']
      },
      {
        id: 'ar-medial',
        label: 'Medial /ar/',
        position: 'medial',
        positionLabel: 'Medial',
        description: 'Words with /ar/ in the middle',
        words: ['farm', 'barn', 'stardom']
      },
      {
        id: 'ar-final',
        label: 'Final /ar/',
        position: 'final',
        positionLabel: 'Final',
        description: 'Words ending with /ar/',
        words: ['star', 'bar', 'car']
      }
    ]
  },
  {
    id: 'or',
    label: '/or/',
    example: 'corn',
    color: '#14b8a6',
    description: 'Rounded /or/ sound as in "corn"',
    sets: [
      {
        id: 'or-initial',
        label: 'Initial /or/',
        position: 'initial',
        positionLabel: 'Initial',
        description: 'Words beginning with the /or/ sound',
        words: ['orca', 'ornament', 'Orville']
      },
      {
        id: 'or-medial',
        label: 'Medial /or/',
        position: 'medial',
        positionLabel: 'Medial',
        description: 'Words with /or/ in the middle',
        words: ['born', 'torn', 'short']
      },
      {
        id: 'or-final',
        label: 'Final /or/',
        position: 'final',
        positionLabel: 'Final',
        description: 'Words ending with /or/',
        words: ['bore', 'core', 'adore']
      }
    ]
  },
  {
    id: 'er',
    label: '/er/',
    example: 'bird',
    color: '#6366f1',
    description: 'Retroflex or bunched /er/ sound',
    sets: [
      {
        id: 'er-initial',
        label: 'Initial /er/',
        position: 'initial',
        positionLabel: 'Initial',
        description: 'Words beginning with the /er/ sound',
        words: ['Ernie', 'earth']
      },
      {
        id: 'er-medial-stressed',
        label: 'Medial /er/ (stressed)',
        position: 'medial',
        positionLabel: 'Medial (stressed)',
        description: 'Stressed /er/ in the middle of a word',
        words: ['bird', 'turn', 'firm']
      },
      {
        id: 'er-medial-unstressed',
        label: 'Medial /er/ (unstressed)',
        position: 'medial',
        positionLabel: 'Medial (unstressed)',
        description: 'Unstressed vocalic /er/ syllables',
        words: ['butterfly', 'buttercup', 'wonderful']
      },
      {
        id: 'er-final',
        label: 'Final /er/',
        position: 'final',
        positionLabel: 'Final',
        description: 'Words ending with /er/',
        words: ['father', 'mother', 'sister']
      }
    ]
  },
  {
    id: 'ire',
    label: '/ire/',
    example: 'fire',
    color: '#facc15',
    description: '/ire/ diphthong with r-coloring',
    sets: [
      {
        id: 'ire-initial',
        label: 'Initial /ire/',
        position: 'initial',
        positionLabel: 'Initial',
        description: 'Words beginning with the /ire/ sound',
        words: ['Ireland', 'iron', 'Irondale']
      },
      {
        id: 'ire-medial',
        label: 'Medial /ire/',
        position: 'medial',
        positionLabel: 'Medial',
        description: 'Words with /ire/ in the middle',
        words: ['fireman', 'firehose', 'firehouse']
      },
      {
        id: 'ire-final',
        label: 'Final /ire/',
        position: 'final',
        positionLabel: 'Final',
        description: 'Words ending with /ire/',
        words: ['tire', 'fire', 'wire']
      }
    ]
  },
  {
    id: 'air',
    label: '/air/',
    example: 'chair',
    color: '#ec4899',
    description: 'R-controlled vowel pronounced like "chair"',
    sets: [
      {
        id: 'air-initial',
        label: 'Initial /air/',
        position: 'initial',
        positionLabel: 'Initial',
        description: 'Words beginning with the /air/ sound',
        words: ['airplane', 'airbag', 'airport']
      },
      {
        id: 'air-medial',
        label: 'Medial /air/',
        position: 'medial',
        positionLabel: 'Medial',
        description: 'Words with /air/ in the middle',
        words: ['fairy', 'haircut', 'staircase']
      },
      {
        id: 'air-final',
        label: 'Final /air/',
        position: 'final',
        positionLabel: 'Final',
        description: 'Words ending with /air/',
        words: ['fair', 'hair', 'care']
      }
    ]
  },
  {
    id: 'ear',
    label: '/ear/',
    example: 'ear',
    color: '#22d3ee',
    description: 'Fronted /ear/ sound as in "ear"',
    sets: [
      {
        id: 'ear-initial',
        label: 'Initial /ear/',
        position: 'initial',
        positionLabel: 'Initial',
        description: 'Words beginning with the /ear/ sound',
        words: ['earwax', 'Erie', 'earache']
      },
      {
        id: 'ear-medial',
        label: 'Medial /ear/',
        position: 'medial',
        positionLabel: 'Medial',
        description: 'Words with /ear/ in the middle',
        words: ['beard', 'tiered', 'yearly']
      },
      {
        id: 'ear-final',
        label: 'Final /ear/',
        position: 'final',
        positionLabel: 'Final',
        description: 'Words ending with /ear/',
        words: ['deer', 'hear', 'near']
      }
    ]
  }
];

const allSetIds = vocalicRGroups.flatMap(group => group.sets.map(set => set.id));

const setMetadata = vocalicRGroups.reduce((acc, group) => {
  group.sets.forEach(set => {
    acc[set.id] = {
      ...set,
      groupId: group.id,
      groupLabel: group.label,
      groupExample: group.example,
      groupColor: group.color,
      groupDescription: group.description
    };
  });
  return acc;
}, {});

const wordsBySet = vocalicRGroups.reduce((acc, group) => {
  group.sets.forEach(set => {
    acc[set.id] = set.words.map((word, index) => ({
      id: `${set.id}-${index}`,
      text: word,
      setId: set.id,
      setLabel: set.label,
      position: set.position,
      positionLabel: set.positionLabel,
      description: set.description,
      groupId: group.id,
      groupLabel: group.label,
      groupExample: group.example,
      color: group.color
    }));
  });
  return acc;
}, {});

const allVocalicRWords = Object.values(wordsBySet).flat();

const shuffleArray = (items) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const VocalicRWordPractice = () => {
  const iconManager = useIconManager();
  const [selectedSets, setSelectedSets] = useState(['ar-initial']);
  const [practiceQueue, setPracticeQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [practicedWords, setPracticedWords] = useState({});
  const [isPracticing, setIsPracticing] = useState(false);
  const [randomize, setRandomize] = useState(true);
  const [loopMode, setLoopMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [error, setError] = useState('');

  const selectedWordPool = useMemo(() => {
    return allVocalicRWords.filter(word => selectedSets.includes(word.setId));
  }, [selectedSets]);

  const currentWord = practiceQueue[currentIndex];
  const practicedCount = practiceQueue.filter(word => practicedWords[word.id]).length;
  const sessionComplete = practiceQueue.length > 0 && practicedCount === practiceQueue.length;

  const toggleSetSelection = (setId) => {
    setSelectedSets(prev => {
      if (prev.includes(setId)) {
        return prev.filter(id => id !== setId);
      }
      return [...prev, setId];
    });
  };

  const toggleGroupSelection = (groupId) => {
    const groupSetIds = vocalicRGroups.find(group => group.id === groupId)?.sets.map(set => set.id) || [];
    const hasAll = groupSetIds.every(setId => selectedSets.includes(setId));
    if (hasAll) {
      setSelectedSets(prev => prev.filter(setId => !groupSetIds.includes(setId)));
    } else {
      setSelectedSets(prev => Array.from(new Set([...prev, ...groupSetIds])));
    }
  };

  const selectAllSets = () => {
    setSelectedSets(allSetIds);
  };

  const clearAllSets = () => {
    setSelectedSets([]);
  };

  const startPractice = () => {
    if (selectedWordPool.length === 0) {
      setError('Please select at least one word set to begin practicing.');
      return;
    }

    setError('');
    const queue = randomize ? shuffleArray(selectedWordPool) : [...selectedWordPool];
    setPracticeQueue(queue);
    setCurrentIndex(0);
    setPracticedWords({});
    setIsPracticing(true);
  };

  const handleReturnToSetup = () => {
    setIsPracticing(false);
    setPracticeQueue([]);
    setCurrentIndex(0);
    setPracticedWords({});
  };

  const handleNext = () => {
    if (practiceQueue.length === 0) return;
    if (currentIndex === practiceQueue.length - 1) {
      if (loopMode) {
        setCurrentIndex(0);
      }
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (practiceQueue.length === 0) return;
    if (currentIndex === 0) {
      if (loopMode) {
        setCurrentIndex(practiceQueue.length - 1);
      }
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const handleMarkPracticed = (wordId) => {
    setPracticedWords(prev => ({
      ...prev,
      [wordId]: !prev[wordId]
    }));
  };

  const handleMarkAndAdvance = () => {
    if (!currentWord) return;

    setPracticedWords(prev => ({
      ...prev,
      [currentWord.id]: true
    }));

    if (practiceQueue.length === 0) return;
    if (currentIndex === practiceQueue.length - 1) {
      if (loopMode) {
        setCurrentIndex(0);
      }
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handleJumpToWord = (wordId) => {
    const index = practiceQueue.findIndex(word => word.id === wordId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const resetPracticeProgress = () => {
    setPracticedWords({});
    setCurrentIndex(0);
  };

  const activeSetIds = new Set(practiceQueue.map(word => word.setId));
  const totalWordsSelected = selectedWordPool.length;

  return (
    <div className="vocalic-r-practice">
      <header className="activity-header">
        <div className="header-content">
          <div>
            <h1>🗣️ Vocalic /r/ Word Practice</h1>
            <p className="header-subtitle">
              Customize your word lists and drill vocalic /r/ sounds at the word level.
            </p>
          </div>
          <div className="sound-summary">
            <span className="summary-count">{selectedSets.length} set{selectedSets.length === 1 ? '' : 's'} selected</span>
            <span className="summary-divider">•</span>
            <span className="summary-count">{totalWordsSelected} word{totalWordsSelected === 1 ? '' : 's'}</span>
          </div>
          <div className="header-controls">
            <button className="icon-btn" onClick={() => setIconPanelOpen(true)}>
              🎨 Manage Icons
            </button>
            {isPracticing ? (
              <button className="warning" onClick={handleReturnToSetup}>
                🔁 Back to Setup
              </button>
            ) : (
              <button className="primary" onClick={startPractice} disabled={totalWordsSelected === 0}>
                ▶️ Start Practice
              </button>
            )}
          </div>
        </div>
      </header>

      {!isPracticing && (
        <main className="main-content">
          <div className="activity-container">
            <section className="instructions">
              <p>
                ✅ Choose the vocalic /r/ positions you want to practice. You can mix and match sets,
                shuffle the order, and loop through your list as needed.
              </p>
            </section>

            {error && <div className="error-banner">{error}</div>}

            <div className="selection-toolbar">
              <div className="toolbar-buttons">
                <button className="toolbar-btn" onClick={selectAllSets}>
                  Select All
                </button>
                <button className="toolbar-btn" onClick={clearAllSets}>
                  Clear Selection
                </button>
              </div>
              <div className="toolbar-options">
                <label className="option-toggle">
                  <input
                    type="checkbox"
                    checked={randomize}
                    onChange={() => setRandomize(prev => !prev)}
                  />
                  <span>Shuffle words when starting</span>
                </label>
                <label className="option-toggle">
                  <input
                    type="checkbox"
                    checked={loopMode}
                    onChange={() => setLoopMode(prev => !prev)}
                  />
                  <span>Loop back to the beginning</span>
                </label>
              </div>
            </div>

            <div className="group-selection">
              {vocalicRGroups.map(group => {
                const groupSetIds = group.sets.map(set => set.id);
                const allSelected = groupSetIds.every(setId => selectedSets.includes(setId));

                return (
                  <div key={group.id} className="group-card">
                    <div className="group-header">
                      <div className="group-info">
                        <span className="group-chip" style={{ backgroundColor: group.color + '1a', color: group.color }}>
                          {group.label}
                        </span>
                        <h3>{group.label} – "{group.example}"</h3>
                        <p>{group.description}</p>
                      </div>
                      <button
                        className="group-toggle"
                        onClick={() => toggleGroupSelection(group.id)}
                      >
                        {allSelected ? 'Remove Group' : 'Add Group'}
                      </button>
                    </div>
                    <div className="set-grid">
                      {group.sets.map(set => {
                        const setId = set.id;
                        const selected = selectedSets.includes(setId);
                        const inputId = `set-${setId}`;

                        return (
                          <label
                            key={setId}
                            htmlFor={inputId}
                            className={`set-option ${selected ? 'selected' : ''}`}
                          >
                            <input
                              id={inputId}
                              type="checkbox"
                              checked={selected}
                              onChange={() => toggleSetSelection(setId)}
                            />
                            <span className="set-title">{set.label}</span>
                            <span className="set-detail">{set.description}</span>
                            <span className="set-count">{set.words.length} word{set.words.length === 1 ? '' : 's'}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="start-footer">
              <div className="selection-summary">
                <strong>{totalWordsSelected}</strong> word{totalWordsSelected === 1 ? '' : 's'} ready to practice.
              </div>
              <button
                className="primary start-btn"
                onClick={startPractice}
                disabled={totalWordsSelected === 0}
              >
                ▶️ Start Practice
              </button>
            </div>
          </div>
        </main>
      )}

      {isPracticing && (
        <main className="main-content practice-mode">
          <div className="practice-layout">
            <aside className="practice-sidebar">
              <div className="progress-card">
                <h3>Progress</h3>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: practiceQueue.length === 0 ? '0%' : `${Math.round((practicedCount / practiceQueue.length) * 100)}%`
                    }}
                  />
                </div>
                <p>
                  {practicedCount} / {practiceQueue.length} words practiced
                </p>
                {sessionComplete && (
                  <div className="completion-badge">
                    🎉 Great work! All words practiced.
                  </div>
                )}
              </div>

              <div className="word-checklist">
                <h3>Word List</h3>
                {vocalicRGroups.map(group => {
                  const groupSets = group.sets.filter(set => activeSetIds.has(set.id));
                  if (groupSets.length === 0) return null;

                  return (
                    <div key={group.id} className="checklist-group">
                      <div className="checklist-header" style={{ borderColor: group.color }}>
                        <span className="group-label">
                          {group.label} • "{group.example}"
                        </span>
                      </div>
                      {groupSets.map(set => (
                        <div key={set.id} className="checklist-set">
                          <div className="set-heading">
                            <span>{set.label}</span>
                            <span className="set-subheading">{set.positionLabel}</span>
                          </div>
                          <div className="word-pills">
                            {wordsBySet[set.id].map(word => {
                              if (!activeSetIds.has(word.setId)) {
                                return null;
                              }

                              const practiced = practicedWords[word.id];
                              const isActive = currentWord?.id === word.id;

                              return (
                                <button
                                  key={word.id}
                                  type="button"
                                  className={`word-pill ${practiced ? 'practiced' : ''} ${isActive ? 'active' : ''}`}
                                  onClick={() => handleJumpToWord(word.id)}
                                >
                                  {word.text}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div className="sidebar-actions">
                <button className="toolbar-btn" onClick={resetPracticeProgress}>
                  Reset Progress
                </button>
                <button className="toolbar-btn" onClick={handleReturnToSetup}>
                  Change Word Sets
                </button>
              </div>
            </aside>

            <section className="word-card-panel">
              {currentWord ? (
                <div className="word-card" style={{ borderColor: currentWord.color }}>
                  <div className="word-card-header">
                    <span className="word-chip" style={{ backgroundColor: currentWord.color + '1a', color: currentWord.color }}>
                      {setMetadata[currentWord.setId].groupLabel} • {setMetadata[currentWord.setId].positionLabel}
                    </span>
                    <span className="word-count">
                      Word {currentIndex + 1} of {practiceQueue.length}
                    </span>
                  </div>
                  <div className="word-display">
                    {currentWord.text}
                  </div>
                  <div className="word-details">
                    <p>
                      Practice the {setMetadata[currentWord.setId].position.toUpperCase()} {setMetadata[currentWord.setId].groupLabel} sound.
                    </p>
                    <p className="detail-note">{setMetadata[currentWord.setId].description}</p>
                  </div>
                  <div className="card-actions">
                    <button onClick={handlePrevious} className="nav-btn">
                      ← Previous
                    </button>
                    <button onClick={handleMarkAndAdvance} className="nav-btn primary">
                      ✓ Practice & Next
                    </button>
                    <button
                      onClick={() => handleMarkPracticed(currentWord.id)}
                      className={`nav-btn ${practicedWords[currentWord.id] ? 'secondary-active' : 'secondary'}`}
                    >
                      {practicedWords[currentWord.id] ? 'Undo Practice' : 'Mark Practiced'}
                    </button>
                    <button onClick={handleNext} className="nav-btn">
                      Next →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="word-card empty">
                  <p>Select word sets and start practicing to see your word cards here.</p>
                </div>
              )}

              <div className="practice-hints">
                <h3>Tips for Practice</h3>
                <ul>
                  <li>
                    Say the word three times: slow, normal, and in a carrier phrase (e.g., &quot;I can say{' '}
                    {currentWord ? currentWord.text : 'the word'}&quot;).
                  </li>
                  <li>Use the checklist to revisit any words that need extra practice.</li>
                  <li>Toggle loop mode if you want to cycle through words continuously.</li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      )}

      <IconManager
        isOpen={iconPanelOpen}
        onClose={() => setIconPanelOpen(false)}
        icons={iconManager.icons}
        onUpload={iconManager.uploadIcon}
        onDelete={iconManager.deleteIcon}
        onClearAll={iconManager.clearAllIcons}
        onSelectIcon={(iconId) => {
          iconManager.setSelectedIcon(iconId);
          if (iconManager.assigningTo) {
            iconManager.assignIcon(iconManager.assigningTo, iconId);
            iconManager.setAssigningTo(null);
            setIconPanelOpen(false);
          }
        }}
        selectedIcon={iconManager.selectedIcon}
        assigningTo={iconManager.assigningTo}
      />
    </div>
  );
};

export default VocalicRWordPractice;
