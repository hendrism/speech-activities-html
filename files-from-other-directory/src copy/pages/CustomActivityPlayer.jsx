import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './CustomActivityPlayer.css';

const shuffleArray = (array = []) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CustomActivityPlayer = ({ activityData = null, onExit = null } = {}) => {
  const [activity, setActivity] = useState(null);
  const [currentStory, setCurrentStory] = useState(0);
  const [userSortings, setUserSortings] = useState({});
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });
  const [draggedItem, setDraggedItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [shuffledDetails, setShuffledDetails] = useState({});
  const [vocabMatches, setVocabMatches] = useState({});
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [selectedDefinitionId, setSelectedDefinitionId] = useState(null);
  const [shuffledDefinitions, setShuffledDefinitions] = useState([]);
  const [categoryAssignments, setCategoryAssignments] = useState({});
  const [uncategorizedItems, setUncategorizedItems] = useState([]);

  const iconManager = useIconManager();

  const initializeActivity = useCallback((activityToLoad) => {
    if (!activityToLoad) {
      setActivity(null);
      setCurrentStory(0);
      setUserSortings({});
      setShuffledDetails({});
      setFeedback({ show: false, success: false, message: '' });
      setDraggedItem(null);
      setEditMode(false);
      setIconPanelOpen(false);
      setVocabMatches({});
      setSelectedWordId(null);
      setSelectedDefinitionId(null);
      setShuffledDefinitions([]);
      setCategoryAssignments({});
      setUncategorizedItems([]);
      return;
    }

    setActivity(activityToLoad);
    setCurrentStory(0);
    setFeedback({ show: false, success: false, message: '' });
    setDraggedItem(null);
    setEditMode(false);
    setIconPanelOpen(false);
    setVocabMatches({});
    setSelectedWordId(null);
    setSelectedDefinitionId(null);
    setCategoryAssignments({});
    setUncategorizedItems([]);

    if (activityToLoad.type === 'important-details') {
      const initialSortings = {};
      const initialShuffled = {};
      activityToLoad.stories?.forEach((story, index) => {
        initialSortings[index] = {
          important: [],
          'not-important': []
        };
        initialShuffled[index] = shuffleArray(story.details || []);
      });
      setUserSortings(initialSortings);
      setShuffledDetails(initialShuffled);
    } else if (activityToLoad.type === 'sequence-ordering') {
      const initialSortings = {};
      const initialShuffled = {};
      activityToLoad.stories?.forEach((story, index) => {
        initialSortings[index] = {
          beginning: [],
          middle: [],
          end: []
        };
        initialShuffled[index] = shuffleArray(story.events || []);
      });
      setUserSortings(initialSortings);
      setShuffledDetails(initialShuffled);
      setShuffledDefinitions([]);
      setCategoryAssignments({});
      setUncategorizedItems([]);
    } else if (activityToLoad.type === 'vocabulary-matching') {
      setUserSortings({});
      setShuffledDetails({});
      const definitions = shuffleArray(activityToLoad.pairs || []);
      setShuffledDefinitions(definitions);
      setCategoryAssignments({});
      setUncategorizedItems([]);
    } else if (activityToLoad.type === 'categorization') {
      setUserSortings({});
      setShuffledDetails({});
      setShuffledDefinitions([]);
      const assignments = {};
      (activityToLoad.categories || []).forEach(category => {
        assignments[category.id] = [];
      });
      setCategoryAssignments(assignments);
      setUncategorizedItems(shuffleArray(activityToLoad.items || []));
    } else {
      setUserSortings({});
      setShuffledDetails({});
      setShuffledDefinitions([]);
      setCategoryAssignments({});
      setUncategorizedItems([]);
    }
  }, []);

  useEffect(() => {
    if (activityData) {
      initializeActivity(activityData);
      return;
    }

    const storedActivity = sessionStorage.getItem('currentActivity');
    if (storedActivity) {
      try {
        const parsedActivity = JSON.parse(storedActivity);
        initializeActivity(parsedActivity);
      } catch (error) {
        console.error('Failed to load activity from sessionStorage', error);
        initializeActivity(null);
      }
    } else {
      initializeActivity(null);
    }
  }, [activityData, initializeActivity]);

  const handleDragStart = (e, detail) => {
    setDraggedItem(detail);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, category) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (activity?.type === 'categorization') {
      setCategoryAssignments(prev => {
        const updated = Object.fromEntries(
          Object.entries(prev).map(([catId, items]) => [
            catId,
            items.filter(item => item.id !== draggedItem.id)
          ])
        );

        if (category !== 'uncategorized') {
          updated[category] = [...(updated[category] || []), draggedItem];
        }

        return updated;
      });

      setUncategorizedItems(prev => {
        const filtered = prev.filter(item => item.id !== draggedItem.id);
        if (category === 'uncategorized') {
          return [...filtered, draggedItem];
        }
        return filtered;
      });

      setFeedback({ show: false, success: false, message: '' });
      setDraggedItem(null);
      return;
    }

    setUserSortings(prev => {
      const newSortings = { ...prev };
      const fallbackSortings = activity.type === 'important-details'
        ? { important: [], 'not-important': [] }
        : { beginning: [], middle: [], end: [] };
      const currentStorySortings = { ...(newSortings[currentStory] || fallbackSortings) };

      // Remove item from all categories first
      Object.keys(currentStorySortings).forEach(cat => {
        currentStorySortings[cat] = currentStorySortings[cat].filter(
          item => item.id !== draggedItem.id
        );
      });

      // Add item to new category
      if (!currentStorySortings[category]) {
        currentStorySortings[category] = [];
      }
      currentStorySortings[category] = [...currentStorySortings[category], draggedItem];
      newSortings[currentStory] = currentStorySortings;

      return newSortings;
    });

    setDraggedItem(null);
  };

  const handleSelectWord = (pairId) => {
    if (activity?.type !== 'vocabulary-matching') return;
    if (vocabMatches[pairId]) return;

    const usedDefinitions = new Set(Object.values(vocabMatches));
    if (usedDefinitions.has(pairId)) return;

    setSelectedWordId(pairId);

    if (selectedDefinitionId !== null) {
      evaluateVocabularyMatch(pairId, selectedDefinitionId);
    }
  };

  const handleSelectDefinition = (pairId) => {
    if (activity?.type !== 'vocabulary-matching') return;

    const usedDefinitions = new Set(Object.values(vocabMatches));
    if (usedDefinitions.has(pairId)) return;

    setSelectedDefinitionId(pairId);

    if (selectedWordId !== null) {
      evaluateVocabularyMatch(selectedWordId, pairId);
    }
  };

  const evaluateVocabularyMatch = (wordId, definitionId) => {
    if (wordId === definitionId) {
      setVocabMatches(prev => ({
        ...prev,
        [wordId]: definitionId
      }));

      const totalPairs = activity?.pairs?.length || 0;
      const completedPairs = Object.keys(vocabMatches).length + 1;

      setFeedback({
        show: true,
        success: true,
        message: completedPairs === totalPairs && totalPairs > 0
          ? '🎉 Great job! All matches are complete!'
          : '✅ Nice match! Keep going.'
      });

      setSelectedWordId(null);
      setSelectedDefinitionId(null);
    } else {
      setFeedback({
        show: true,
        success: false,
        message: 'Not quite. Try picking a different definition for that word.'
      });
      setSelectedDefinitionId(null);
    }
  };

  const checkAnswers = () => {
    if (!activity) return;

    const currentStoryData = activity.stories?.[currentStory];
    const userSorting = userSortings[currentStory] || {};

    let correct = 0;
    let total = 0;

    if (activity.type === 'important-details') {
      if (!currentStoryData) return;
      total = currentStoryData.details.length;

      // Check each detail
      currentStoryData.details.forEach(detail => {
        const userCategory = (userSorting.important || []).find(item => item.id === detail.id) ? 'important' :
                            (userSorting['not-important'] || []).find(item => item.id === detail.id) ? 'not-important' : null;

        if (userCategory === detail.category) {
          correct++;
        }
      });

      const success = correct === total && total > 0;

      setFeedback({
        show: true,
        success,
        message: success
          ? `🎉 Perfect! You sorted all ${correct} details correctly!`
          : `Good try! You got ${correct} out of ${total} correct. Review the story and try again.`
      });
    } else if (activity.type === 'sequence-ordering') {
      if (!currentStoryData) return;
      total = currentStoryData.events.length;

      // Check each event
      currentStoryData.events.forEach(event => {
        const userCategory = (userSorting.beginning || []).find(item => item.id === event.id) ? 'beginning' :
                            (userSorting.middle || []).find(item => item.id === event.id) ? 'middle' :
                            (userSorting.end || []).find(item => item.id === event.id) ? 'end' : null;

        if (userCategory === event.sequence) {
          correct++;
        }
      });

      const success = correct === total && total > 0;

      setFeedback({
        show: true,
        success,
        message: success
          ? `🎉 Perfect! You sequenced all ${correct} events correctly!`
          : `Good try! You got ${correct} out of ${total} correct. Review the story and try again.`
      });
    } else if (activity.type === 'vocabulary-matching') {
      const pairs = activity.pairs || [];
      total = pairs.length;
      correct = pairs.filter(pair => vocabMatches[pair.id] === pair.id).length;

      const success = correct === total && total > 0;

      setFeedback({
        show: true,
        success,
        message: success
          ? `🎉 Awesome! You matched all ${correct} words correctly!`
          : `You have ${correct} of ${total} matches correct. Keep trying!`
      });
    } else if (activity.type === 'categorization') {
      const items = activity.items || [];
      const assignments = categoryAssignments || {};
      total = items.length;

      const assignmentLookup = {};
      Object.entries(assignments).forEach(([catId, placedItems]) => {
        placedItems.forEach(item => {
          assignmentLookup[item.id] = catId;
        });
      });

      correct = items.filter(item => assignmentLookup[item.id] === item.categoryId).length;

      const success = correct === total && total > 0;

      setFeedback({
        show: true,
        success,
        message: success
          ? `🎉 Excellent! You sorted all ${correct} cards correctly!`
          : `You have ${correct} of ${total} cards in the right category. Keep sorting!`
      });
    }
  };

  const shuffleCurrentStoryDetails = () => {
    if (activity && activity.stories && activity.stories[currentStory]) {
      if (activity.type === 'important-details') {
        setShuffledDetails(prev => ({
          ...prev,
          [currentStory]: shuffleArray(activity.stories[currentStory].details || [])
        }));
      } else if (activity.type === 'sequence-ordering') {
        setShuffledDetails(prev => ({
          ...prev,
          [currentStory]: shuffleArray(activity.stories[currentStory].events || [])
        }));
      }
      setFeedback({ show: false, success: false, message: '' });
    }
  };

  const shuffleVocabularyDefinitions = () => {
    if (activity?.type === 'vocabulary-matching') {
      setShuffledDefinitions(shuffleArray(activity.pairs || []));
      setFeedback({ show: false, success: false, message: '' });
      setSelectedWordId(null);
      setSelectedDefinitionId(null);
    }
  };

  const resetCategorization = (shouldShuffle = true) => {
    if (activity?.type !== 'categorization') return;

    const assignments = {};
    (activity.categories || []).forEach(category => {
      assignments[category.id] = [];
    });

    setCategoryAssignments(assignments);
    setUncategorizedItems(
      shouldShuffle ? shuffleArray(activity.items || []) : [...(activity.items || [])]
    );
    setDraggedItem(null);
    setFeedback({ show: false, success: false, message: '' });
  };

  const resetCurrentStory = () => {
    if (activity.type === 'important-details') {
      setUserSortings(prev => ({
        ...prev,
        [currentStory]: {
          important: [],
          'not-important': []
        }
      }));
    } else if (activity.type === 'sequence-ordering') {
      setUserSortings(prev => ({
        ...prev,
        [currentStory]: {
          beginning: [],
          middle: [],
          end: []
        }
      }));
    }
    // Also shuffle when resetting
    shuffleCurrentStoryDetails();
    setFeedback({ show: false, success: false, message: '' });
  };

  const resetVocabularyMatches = () => {
    if (activity.type === 'vocabulary-matching') {
      setVocabMatches({});
      setSelectedWordId(null);
      setSelectedDefinitionId(null);
      shuffleVocabularyDefinitions();
    }
  };

  const nextStory = () => {
    if (currentStory < activity.stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setFeedback({ show: false, success: false, message: '' });
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
      setFeedback({ show: false, success: false, message: '' });
    }
  };

  if (!activity) {
    return (
      <div className="custom-activity-player">
        <div className="error-state">
          <h2>No Activity Found</h2>
          <p>No activity data found. Please return to the previous page and try again.</p>
          {onExit ? (
            <button onClick={onExit} className="back-btn">
              ← Back
            </button>
          ) : (
            <Link to="/" className="back-btn">
              ← Back to Home
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (activity.type === 'vocabulary-matching') {
    const totalPairs = activity.pairs?.length || 0;
    const completedPairs = Object.keys(vocabMatches).length;
    const definitionsPool = (shuffledDefinitions.length > 0 ? shuffledDefinitions : activity.pairs) || [];
    const usedDefinitions = new Set(Object.values(vocabMatches));

    return (
      <div className="custom-activity-player vocabulary-mode">
        <header className="activity-header">
          <div className="header-content">
            <h1>🔤 {activity.title || 'Vocabulary Matching'}</h1>
            <div className="progress-info">
              Matches complete: {completedPairs} / {totalPairs}
            </div>
            <div className="header-controls">
              {onExit ? (
                <button onClick={onExit} className="icon-btn">
                  ← Back
                </button>
              ) : (
                <Link to="/" className="icon-btn">
                  ← Home
                </Link>
              )}
              <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
                🎨 Icons
              </button>
              <button onClick={shuffleVocabularyDefinitions} className="icon-btn">
                🎲 Shuffle
              </button>
              <button onClick={resetVocabularyMatches} className="warning">
                🔄 Reset
              </button>
            </div>
          </div>
        </header>

        <main className="main-content vocabulary-content">
          <div className="instructions-section">
            <p>{activity.instructions}</p>
          </div>

          <div className="matching-board">
            <div className="words-column">
              <h3>Vocabulary Words</h3>
              <div className="words-list">
                {activity.pairs?.map(pair => {
                  const isMatched = Boolean(vocabMatches[pair.id]);
                  const isSelected = selectedWordId === pair.id;
                  return (
                    <button
                      key={pair.id}
                      className={`word-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectWord(pair.id)}
                      disabled={isMatched}
                    >
                      <span className="word-text">{pair.word || 'Untitled word'}</span>
                      {pair.example && (
                        <span className="word-example">{pair.example}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="definitions-column">
              <h3>Definitions</h3>
              <div className="definitions-list">
                {definitionsPool.map(pair => {
                  const isMatched = usedDefinitions.has(pair.id);
                  const isSelected = selectedDefinitionId === pair.id;
                  return (
                    <button
                      key={`definition-${pair.id}`}
                      className={`definition-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectDefinition(pair.id)}
                      disabled={isMatched}
                    >
                      <span className="definition-text">{pair.definition || 'No definition yet'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button
              onClick={checkAnswers}
              className="check-btn primary"
              disabled={totalPairs === 0 || completedPairs !== totalPairs}
            >
              ✓ Check My Matches
            </button>
          </div>

          {feedback.show && (
            <div className={`feedback ${feedback.success ? 'success' : 'error'} show`}>
              <p>{feedback.message}</p>
            </div>
          )}
        </main>

        <IconManager
          isOpen={iconPanelOpen}
          onClose={() => setIconPanelOpen(false)}
          iconManager={iconManager}
        />
      </div>
    );
  }

  if (activity.type === 'categorization') {
    const categories = activity.categories || [];
    const assignments = categories.reduce((acc, category) => {
      acc[category.id] = categoryAssignments[category.id] || [];
      return acc;
    }, {});

    const assignedIds = new Set();
    Object.values(assignments).forEach(items => {
      items.forEach(item => assignedIds.add(item.id));
    });

    const uncategorizedState = uncategorizedItems.filter(item => !assignedIds.has(item.id));
    const missingItems = (activity.items || []).filter(item =>
      !assignedIds.has(item.id) && !uncategorizedState.some(existing => existing.id === item.id)
    );
    const unsortedItems = [...uncategorizedState, ...missingItems];

    const totalCards = activity.items?.length || 0;
    const placedCards = totalCards - unsortedItems.length;

    return (
      <div className="custom-activity-player categorization-mode">
        <header className="activity-header">
          <div className="header-content">
            <h1>📊 {activity.title || 'Categorization Activity'}</h1>
            <div className="progress-info">
              Cards sorted: {placedCards} / {totalCards}
            </div>
            <div className="header-controls">
              {onExit ? (
                <button onClick={onExit} className="icon-btn">
                  ← Back
                </button>
              ) : (
                <Link to="/" className="icon-btn">
                  ← Home
                </Link>
              )}
              <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
                🎨 Icons
              </button>
              <button
                onClick={() => resetCategorization(true)}
                className="icon-btn"
                disabled={totalCards === 0}
              >
                🎲 Shuffle
              </button>
              <button
                onClick={() => resetCategorization(false)}
                className="warning"
                disabled={totalCards === 0}
              >
                🔄 Reset
              </button>
            </div>
          </div>
        </header>

        <main className="main-content categorization-content">
          <div className="instructions-section">
            <p>{activity.instructions}</p>
          </div>

          <div className="categorization-board">
            <div
              className="uncategorized-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'uncategorized')}
            >
              <div className="column-header">
                <h3>📝 Cards to Sort</h3>
                <span className="column-subtitle">Drag each card into the matching category</span>
              </div>

              <div className="uncategorized-list">
                {unsortedItems.length === 0 ? (
                  <p className="empty-placeholder">All cards are sorted — great job!</p>
                ) : (
                  unsortedItems.map(item => (
                    <div
                      key={item.id}
                      className="categorization-item"
                      draggable
                      onDragStart={(e) => handleDragStart(e, item)}
                    >
                      <div className="item-text">{item.text}</div>
                      {item.hint && <div className="item-hint">💡 {item.hint}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="category-columns">
              {categories.map(category => (
                <div
                  key={category.id}
                  className="category-drop"
                  style={{ '--category-color': category.color || '#eef2ff' }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, category.id)}
                >
                  <div className="column-header">
                    <h3>{category.name || 'Untitled Category'}</h3>
                    <span className="column-subtitle">{assignments[category.id]?.length || 0} cards</span>
                  </div>

                  <div className="category-list">
                    {(assignments[category.id] || []).length === 0 ? (
                      <p className="empty-placeholder">Drop cards here</p>
                    ) : (
                      assignments[category.id].map(item => (
                        <div
                          key={item.id}
                          className="categorization-item placed"
                          draggable
                          onDragStart={(e) => handleDragStart(e, item)}
                        >
                          <div className="item-text">{item.text}</div>
                          {item.hint && <div className="item-hint">💡 {item.hint}</div>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button
              onClick={checkAnswers}
              className="check-btn primary"
              disabled={unsortedItems.length > 0 || totalCards === 0}
            >
              ✓ Check My Sorting
            </button>
          </div>

          {feedback.show && (
            <div className={`feedback ${feedback.success ? 'success' : 'error'} show`}>
              <p>{feedback.message}</p>
            </div>
          )}
        </main>

        <IconManager
          isOpen={iconPanelOpen}
          onClose={() => setIconPanelOpen(false)}
          iconManager={iconManager}
        />
      </div>
    );
  }

  if (activity.type === 'important-details') {
    const currentStoryData = activity.stories[currentStory];
    const userSorting = userSortings[currentStory] || { important: [], 'not-important': [] };

    // Get details that haven't been sorted yet (using shuffled order)
    const currentShuffledDetails = shuffledDetails[currentStory] || currentStoryData.details;
    const unsortedDetails = currentShuffledDetails.filter(detail =>
      !userSorting.important.find(item => item.id === detail.id) &&
      !userSorting['not-important'].find(item => item.id === detail.id)
    );

    return (
      <div className="custom-activity-player">
        <header className="activity-header">
          <div className="header-content">
            <h1>🎯 {activity.title}</h1>
            <div className="progress-info">
              Story {currentStory + 1} of {activity.stories.length}: {currentStoryData.title}
            </div>
            <div className="header-controls">
              {onExit ? (
                <button onClick={onExit} className="icon-btn">
                  ← Back
                </button>
              ) : (
                <Link to="/" className="icon-btn">
                  ← Home
                </Link>
              )}
              <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
                🎨 Icons
              </button>
              <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
                {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
              </button>
              <button onClick={shuffleCurrentStoryDetails} className="icon-btn">
                🎲 Shuffle
              </button>
              <button onClick={resetCurrentStory} className="warning">
                🔄 Reset Story
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          {/* Instructions */}
          <div className="instructions-section">
            <p>{activity.instructions}</p>
          </div>

          {/* Story Content */}
          <div className="story-content">
            <h2>{currentStoryData.title}</h2>
            <div className="story-text">
              <p>{currentStoryData.content}</p>
            </div>
          </div>

          {/* Sorting Interface */}
          <div className="sorting-interface">
            <h3>Sort the Details</h3>

            {/* Unsorted Details */}
            {unsortedDetails.length > 0 && (
              <div className="unsorted-section">
                <h4>📝 Details to Sort</h4>
                <div className="details-pool">
                  {unsortedDetails.map(detail => (
                    <div
                      key={detail.id}
                      className="detail-item draggable"
                      draggable
                      onDragStart={(e) => handleDragStart(e, detail)}
                    >
                      {detail.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sorting Categories */}
            <div className="sorting-categories">
              <div
                className="sort-category important"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'important')}
              >
                <h4>⭐ Important Details</h4>
                <div className="category-content">
                  {userSorting.important.length === 0 ? (
                    <p className="drop-hint">Drag important details here</p>
                  ) : (
                    userSorting.important.map(detail => (
                      <div
                        key={detail.id}
                        className="detail-item sorted draggable"
                        draggable
                        onDragStart={(e) => handleDragStart(e, detail)}
                      >
                        {detail.text}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div
                className="sort-category not-important"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'not-important')}
              >
                <h4>➖ Not Important Details</h4>
                <div className="category-content">
                  {userSorting['not-important'].length === 0 ? (
                    <p className="drop-hint">Drag not important details here</p>
                  ) : (
                    userSorting['not-important'].map(detail => (
                      <div
                        key={detail.id}
                        className="detail-item sorted draggable"
                        draggable
                        onDragStart={(e) => handleDragStart(e, detail)}
                      >
                        {detail.text}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={checkAnswers}
                className="check-btn primary"
                disabled={unsortedDetails.length > 0}
              >
                ✓ Check My Sorting
              </button>
            </div>

            {/* Navigation */}
            <div className="navigation-buttons">
              <button onClick={prevStory} disabled={currentStory === 0} className="nav-btn">
                ← Previous Story
              </button>
              <span className="story-counter">
                {currentStory + 1} / {activity.stories.length}
              </span>
              <button onClick={nextStory} disabled={currentStory === activity.stories.length - 1} className="nav-btn primary">
                Next Story →
              </button>
            </div>

            {/* Feedback */}
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
  }

  if (activity.type === 'sequence-ordering') {
    const currentStoryData = activity.stories[currentStory];
    const userSorting = userSortings[currentStory] || { beginning: [], middle: [], end: [] };

    // Get events that haven't been sorted yet (using shuffled order)
    const currentShuffledEvents = shuffledDetails[currentStory] || currentStoryData.events;
    const unsortedEvents = currentShuffledEvents.filter(event =>
      !userSorting.beginning.find(item => item.id === event.id) &&
      !userSorting.middle.find(item => item.id === event.id) &&
      !userSorting.end.find(item => item.id === event.id)
    );

    return (
      <div className="custom-activity-player">
        <header className="activity-header">
          <div className="header-content">
            <h1>📋 {activity.title}</h1>
            <div className="progress-info">
              Story {currentStory + 1} of {activity.stories.length}: {currentStoryData.title}
            </div>
            <div className="header-controls">
              {onExit ? (
                <button onClick={onExit} className="icon-btn">
                  ← Back
                </button>
              ) : (
                <Link to="/" className="icon-btn">
                  ← Home
                </Link>
              )}
              <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
                🎨 Icons
              </button>
              <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
                {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
              </button>
              <button onClick={shuffleCurrentStoryDetails} className="icon-btn">
                🎲 Shuffle
              </button>
              <button onClick={resetCurrentStory} className="warning">
                🔄 Reset Story
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          {/* Instructions */}
          <div className="instructions-section">
            <p>{activity.instructions}</p>
          </div>

          {/* Story Content */}
          <div className="story-content">
            <h2>{currentStoryData.title}</h2>
            <div className="story-text">
              <p>{currentStoryData.content}</p>
            </div>
          </div>

          {/* Sequence Ordering Interface */}
          <div className="sequence-interface">
            <h3>Sort the Story Events</h3>

            {/* Unsorted Events */}
            {unsortedEvents.length > 0 && (
              <div className="unsorted-section">
                <h4>📝 Events to Sort</h4>
                <div className="events-pool">
                  {unsortedEvents.map(event => (
                    <div
                      key={event.id}
                      className="event-item draggable"
                      draggable
                      onDragStart={(e) => handleDragStart(e, event)}
                    >
                      {event.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sequence Categories */}
            <div className="sequence-categories">
              <div
                className="sequence-category beginning"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'beginning')}
              >
                <h4>🏁 Beginning</h4>
                <div className="category-content">
                  {userSorting.beginning.length === 0 ? (
                    <p className="drop-hint">Drag beginning events here</p>
                  ) : (
                    userSorting.beginning.map(event => (
                      <div
                        key={event.id}
                        className="event-item sorted draggable"
                        draggable
                        onDragStart={(e) => handleDragStart(e, event)}
                      >
                        {event.text}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div
                className="sequence-category middle"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'middle')}
              >
                <h4>🏃 Middle</h4>
                <div className="category-content">
                  {userSorting.middle.length === 0 ? (
                    <p className="drop-hint">Drag middle events here</p>
                  ) : (
                    userSorting.middle.map(event => (
                      <div
                        key={event.id}
                        className="event-item sorted draggable"
                        draggable
                        onDragStart={(e) => handleDragStart(e, event)}
                      >
                        {event.text}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div
                className="sequence-category end"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'end')}
              >
                <h4>🏁 End</h4>
                <div className="category-content">
                  {userSorting.end.length === 0 ? (
                    <p className="drop-hint">Drag ending events here</p>
                  ) : (
                    userSorting.end.map(event => (
                      <div
                        key={event.id}
                        className="event-item sorted draggable"
                        draggable
                        onDragStart={(e) => handleDragStart(e, event)}
                      >
                        {event.text}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button
                onClick={checkAnswers}
                className="check-btn primary"
                disabled={unsortedEvents.length > 0}
              >
                ✓ Check My Sequence
              </button>
            </div>

            {/* Navigation */}
            <div className="navigation-buttons">
              <button onClick={prevStory} disabled={currentStory === 0} className="nav-btn">
                ← Previous Story
              </button>
              <span className="story-counter">
                {currentStory + 1} / {activity.stories.length}
              </span>
              <button onClick={nextStory} disabled={currentStory === activity.stories.length - 1} className="nav-btn primary">
                Next Story →
              </button>
            </div>

            {/* Feedback */}
            {feedback.show && (
              <div className={`feedback ${feedback.success ? 'success' : 'error'}`}>
                {feedback.message}
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
  }

  // For other activity types, show a message
  return (
    <div className="custom-activity-player">
      <div className="unsupported-type">
        <h2>Activity Type Not Yet Supported</h2>
        <p>This activity type ({activity.type}) doesn't have a player interface yet.</p>
        {onExit ? (
          <button onClick={onExit} className="back-btn">
            ← Back
          </button>
        ) : (
          <Link to="/" className="back-btn">
            ← Back to Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default CustomActivityPlayer;
