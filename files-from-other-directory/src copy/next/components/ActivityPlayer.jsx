import React, { useEffect, useMemo, useState } from 'react';
import { ResponseKinds, SupportTiers } from '../schemas/activity';
import { useIconManager } from '../../hooks/useIconManager';
import IconManager from '../../components/IconManager';
import './ActivityPlayer.css';

const SUPPORT_ORDER = SupportTiers;
const UNASSIGNED_BUCKET = '_unassigned';

const storageKeyFor = (activityId) => `next-activity-session-${activityId}`;

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn('Failed to parse stored session; starting fresh.', error);
    return null;
  }
};

const getStoredSession = (activityId) => {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(storageKeyFor(activityId));
  if (!raw) return {};
  return safeParse(raw) || {};
};

const getDefaultResponseForTask = (task) => {
  switch (task.response?.type) {
    case ResponseKinds.SHORT_ANSWER:
      return '';
    case ResponseKinds.MULTIPLE_CHOICE:
      return '';
    case ResponseKinds.TRUE_FALSE:
      return '';
    case ResponseKinds.SEQUENCE: {
      const options = task.response?.options || [];
      return options.map((option) => option.id);
    }
    case ResponseKinds.SORT: {
      const categories = task.response?.categories || [];
      const items = task.response?.items || [];
      const response = {
        [UNASSIGNED_BUCKET]: items.map((item) => item.id),
      };
      categories.forEach((category) => {
        response[category.id] = [];
      });
      return response;
    }
    default:
      return undefined;
  }
};

const normalizeResponse = (task, stored) => {
  const defaultValue = getDefaultResponseForTask(task);

  switch (task.response?.type) {
    case ResponseKinds.SHORT_ANSWER:
      return typeof stored === 'string' ? stored : defaultValue;
    case ResponseKinds.MULTIPLE_CHOICE:
      return typeof stored === 'string' ? stored : defaultValue;
    case ResponseKinds.TRUE_FALSE: {
      if (stored === 'true' || stored === 'false') return stored;
      if (stored === true) return 'true';
      if (stored === false) return 'false';
      return defaultValue;
    }
    case ResponseKinds.SEQUENCE: {
      const options = task.response?.options || [];
      const allowedIds = options.map((option) => option.id);
      const storedIds = Array.isArray(stored)
        ? stored.filter((id) => allowedIds.includes(id))
        : [];
      const missing = allowedIds.filter((id) => !storedIds.includes(id));
      return [...storedIds, ...missing];
    }
    case ResponseKinds.SORT: {
      const categories = task.response?.categories || [];
      const items = task.response?.items || [];
      const itemIds = new Set(items.map((item) => item.id));
      const response = {
        [UNASSIGNED_BUCKET]: [],
      };
      categories.forEach((category) => {
        response[category.id] = [];
      });

      if (stored && typeof stored === 'object') {
        Object.entries(stored).forEach(([bucketId, bucketItems]) => {
          if (!Array.isArray(bucketItems)) return;
          const validItems = bucketItems.filter((id) => itemIds.has(id));

          if (bucketId === UNASSIGNED_BUCKET) {
            response[UNASSIGNED_BUCKET].push(...validItems);
            return;
          }

          if (response[bucketId]) {
            response[bucketId].push(...validItems);
          }
        });
      }

      const assigned = new Set(
        Object.keys(response)
          .filter((key) => key !== UNASSIGNED_BUCKET)
          .flatMap((categoryId) => response[categoryId])
      );

      items.forEach((item) => {
        if (!assigned.has(item.id) && !response[UNASSIGNED_BUCKET].includes(item.id)) {
          response[UNASSIGNED_BUCKET].push(item.id);
        }
      });

      return response;
    }
    default:
      return stored ?? defaultValue;
  }
};

const buildInitialResponses = (activity, stored = {}) => {
  const responses = {};

  activity?.sequences?.forEach((sequence) => {
    sequence.tasks.forEach((task) => {
      responses[task.id] = normalizeResponse(task, stored[task.id]);
    });
  });

  return responses;
};

const buildInitialSupportState = (activity, stored = {}) => {
  const supports = {};

  activity?.sequences?.forEach((sequence) => {
    sequence.tasks.forEach((task) => {
      if (!Array.isArray(task.supports) || task.supports.length === 0) return;
      const available = task.supports.map((support) => support.level);
      const storedLevel = stored[task.id];
      supports[task.id] = available.includes(storedLevel) ? storedLevel : available[0];
    });
  });

  return supports;
};

const evaluateShortAnswer = (task, userResponse) => {
  if (typeof userResponse !== 'string' || userResponse.trim().length === 0) {
    return { status: 'incomplete', message: 'Add a response before checking.' };
  }

  const answers = task.response?.correct;
  const haystack = Array.isArray(answers) ? answers : [answers];
  const normalizedUser = userResponse.trim().toLowerCase();
  const isCorrect = haystack.some((candidate) =>
    typeof candidate === 'string' && candidate.trim().toLowerCase() === normalizedUser
  );

  return isCorrect
    ? { status: 'correct', message: 'Great job! That matches the exemplar response.' }
    : { status: 'incorrect', message: 'Not quite—revisit the passage and try again.' };
};

const evaluateMultipleChoice = (task, userResponse) => {
  if (!userResponse) {
    return { status: 'incomplete', message: 'Select an option before checking.' };
  }

  const correctId = task.response?.correct;
  if (!correctId) {
    return { status: 'incorrect', message: 'This question is missing a correct answer.' };
  }

  return correctId === userResponse
    ? { status: 'correct', message: 'Nice work!' }
    : { status: 'incorrect', message: 'Try another choice. Use the supports if you need help.' };
};

const evaluateTrueFalse = (task, userResponse) => {
  if (!userResponse) {
    return { status: 'incomplete', message: 'Choose true or false to check your answer.' };
  }

  const correct = String(task.response?.correct).toLowerCase();
  const normalized = String(userResponse).toLowerCase();

  return correct === normalized
    ? { status: 'correct', message: 'Correct!' }
    : { status: 'incorrect', message: 'Let’s think about the sentence again.' };
};

const evaluateSequence = (task, userResponse) => {
  const options = task.response?.options || [];
  const expected = Array.isArray(task.response?.correct) && task.response?.correct.length > 0
    ? task.response.correct
    : options.map((option) => option.id);

  if (!Array.isArray(userResponse) || userResponse.length !== expected.length) {
    return { status: 'incomplete', message: 'Place every step in order before checking.' };
  }

  const isCorrect = expected.every((id, index) => userResponse[index] === id);

  return isCorrect
    ? { status: 'correct', message: 'Sequenced perfectly!' }
    : { status: 'incorrect', message: 'Something is out of order—adjust the steps.' };
};

const evaluateSort = (task, userResponse) => {
  const categories = task.response?.categories || [];
  const items = task.response?.items || [];
  const correctMap = task.response?.correct || {};

  if (!userResponse || typeof userResponse !== 'object') {
    return { status: 'incomplete', message: 'Sort each item into a category first.' };
  }

  const totalItems = items.length;
  let placedItems = 0;
  let allMatch = true;

  categories.forEach((category) => {
    const expectedItems = new Set(correctMap[category.id] || []);
    const actualItems = new Set(userResponse[category.id] || []);
    placedItems += actualItems.size;

    if (expectedItems.size !== actualItems.size) {
      allMatch = false;
      return;
    }

    expectedItems.forEach((id) => {
      if (!actualItems.has(id)) {
        allMatch = false;
      }
    });
  });

  const leftover = Array.isArray(userResponse[UNASSIGNED_BUCKET])
    ? userResponse[UNASSIGNED_BUCKET].length
    : 0;

  if (placedItems !== totalItems || leftover > 0) {
    return { status: 'incomplete', message: 'Be sure every item is assigned to a category.' };
  }

  return allMatch
    ? { status: 'correct', message: 'Excellent sorting!' }
    : { status: 'incorrect', message: 'A few items need to move—double-check each category.' };
};

const evaluateTaskResponse = (task, userResponse) => {
  switch (task.response?.type) {
    case ResponseKinds.SHORT_ANSWER:
      return evaluateShortAnswer(task, userResponse);
    case ResponseKinds.MULTIPLE_CHOICE:
      return evaluateMultipleChoice(task, userResponse);
    case ResponseKinds.TRUE_FALSE:
      return evaluateTrueFalse(task, userResponse);
    case ResponseKinds.SEQUENCE:
      return evaluateSequence(task, userResponse);
    case ResponseKinds.SORT:
      return evaluateSort(task, userResponse);
    default:
      return { status: 'incomplete', message: 'This task type is not supported yet.' };
  }
};

const ActivityPlayer = ({ activity }) => {
  const storedSession = useMemo(() => getStoredSession(activity.id), [activity.id]);
  const iconManager = useIconManager();

  const sequenceCount = activity.sequences?.length || 0;
  const initialSequenceIndex = typeof storedSession.sequenceIndex === 'number'
    ? Math.min(Math.max(storedSession.sequenceIndex, 0), Math.max(sequenceCount - 1, 0))
    : 0;

  const [sequenceIndex, setSequenceIndex] = useState(initialSequenceIndex);
  const [responses, setResponses] = useState(() =>
    buildInitialResponses(activity, storedSession.responses)
  );
  const [evaluations, setEvaluations] = useState(storedSession.evaluations || {});
  const [revealed, setRevealed] = useState(storedSession.revealed || {});
  const [supportState, setSupportState] = useState(() =>
    buildInitialSupportState(activity, storedSession.supportState)
  );
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [showTeacherTools, setShowTeacherTools] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const payload = {
      sequenceIndex,
      responses,
      evaluations,
      revealed,
      supportState,
    };
    window.localStorage.setItem(storageKeyFor(activity.id), JSON.stringify(payload));
  }, [activity.id, sequenceIndex, responses, evaluations, revealed, supportState]);

  const resetSession = () => {
    setSequenceIndex(0);
    setResponses(buildInitialResponses(activity));
    setEvaluations({});
    setRevealed({});
    setSupportState(buildInitialSupportState(activity));
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKeyFor(activity.id));
    }
  };

  const activeSequence = activity.sequences?.[sequenceIndex];

  const buildAssignmentKey = (sequenceId, taskId, choiceId) =>
    `${activity.id}::${sequenceId}::${taskId}::${choiceId}`;

  const getChoiceIcon = (sequenceId, task, choice) => {
    if (!choice) return null;
    if (choice.icon) return choice.icon;
    if (choice.iconId && iconManager.icons?.[choice.iconId]) {
      return iconManager.icons[choice.iconId];
    }
    if (!choice.id) return null;
    const assignmentKey = buildAssignmentKey(sequenceId, task.id, choice.id);
    const iconData = iconManager.getIconForAssignment(assignmentKey);
    return iconData;
  };

  const openIconPanelForChoice = (sequenceId, taskId, choiceId) => {
    if (!choiceId) return;
    const assignmentKey = buildAssignmentKey(sequenceId, taskId, choiceId);
    iconManager.setAssigningTo(assignmentKey);
    setIconPanelOpen(true);
  };

  const clearAssignedIcon = (sequenceId, taskId, choiceId) => {
    const assignmentKey = buildAssignmentKey(sequenceId, taskId, choiceId);
    iconManager.removeIconAssignment(assignmentKey);
  };

  const updateResponse = (taskId, value) => {
    setResponses((prev) => ({
      ...prev,
      [taskId]: value,
    }));
    setEvaluations((prev) => {
      if (!prev[taskId]) return prev;
      const next = { ...prev };
      delete next[taskId];
      return next;
    });
    setRevealed((prev) => {
      if (!prev[taskId]) return prev;
      const next = { ...prev };
      delete next[taskId];
      return next;
    });
  };

  const revealAnswer = (taskId) => {
    setRevealed((prev) => ({
      ...prev,
      [taskId]: true,
    }));
  };

  const setSupportLevel = (taskId, level) => {
    setSupportState((prev) => ({
      ...prev,
      [taskId]: level,
    }));
  };

  const checkTask = (task) => {
    const evaluation = evaluateTaskResponse(task, responses[task.id]);
    setEvaluations((prev) => ({
      ...prev,
      [task.id]: evaluation,
    }));
  };

  const resetTask = (task) => {
    updateResponse(task.id, getDefaultResponseForTask(task));
    setEvaluations((prev) => {
      if (!prev[task.id]) return prev;
      const next = { ...prev };
      delete next[task.id];
      return next;
    });
    setRevealed((prev) => {
      if (!prev[task.id]) return prev;
      const next = { ...prev };
      delete next[task.id];
      return next;
    });
  };

  const activeSupportForTask = (task) => {
    if (!Array.isArray(task.supports) || task.supports.length === 0) {
      return null;
    }
    return supportState[task.id] || task.supports[0]?.level || 'independent';
  };

  const renderChoiceIcon = (iconValue) => {
    if (!iconValue) return null;
    const isImage = typeof iconValue === 'string' && iconValue.startsWith('data:');
    if (isImage) {
      return <img src={iconValue} alt="" className="choice-chip__icon choice-chip__icon--image" />;
    }
    return <span className="choice-chip__icon choice-chip__icon--text">{iconValue}</span>;
  };

  const renderSupportControls = (task) => {
    if (!Array.isArray(task.supports) || task.supports.length === 0) {
      return null;
    }

    const activeLevel = activeSupportForTask(task);

    return (
      <div className="task-support">
        <span className="task-support__label">Support level:</span>
        <div className="task-support__controls">
          {SUPPORT_ORDER.filter((tier) => task.supports.some((support) => support.level === tier)).map((tier) => (
            <button
              key={tier}
              className={`support-chip ${activeLevel === tier ? 'support-chip--active' : ''}`}
              onClick={() => setSupportLevel(task.id, tier)}
              type="button"
            >
              {tier}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const supportDetails = (task) => {
    if (!Array.isArray(task.supports)) return null;
    const activeLevel = activeSupportForTask(task);
    const activeSupport = task.supports.find((support) => support.level === activeLevel);

    if (!activeSupport) return null;

    return (
      <div className="support-detail">
        {activeSupport.hint && (
          <div className="support-detail__hint">
            <span>Hint:</span> {activeSupport.hint}
          </div>
        )}
        {Array.isArray(activeSupport.strategyNotes) && activeSupport.strategyNotes.length > 0 && (
          <ul className="support-detail__strategies">
            {activeSupport.strategyNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        )}
        {Array.isArray(activeSupport.choices) && activeSupport.choices.length > 0 && (
          <div className="support-detail__choices">
            <span>Use these choices:</span>
            <ul>
              {activeSupport.choices.map((choice) => (
                <li key={choice.id || choice.text}>
                  {renderChoiceIcon(getChoiceIcon(activeSequence?.id || 'support', { id: `${task.id}-support` }, choice))}
                  {choice.text}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderEvaluation = (task) => {
    const evaluation = evaluations[task.id];
    if (!evaluation) return null;

    const className = {
      correct: 'evaluation--correct',
      incorrect: 'evaluation--incorrect',
      incomplete: 'evaluation--info',
    }[evaluation.status] || 'evaluation--info';

    return (
      <div className={`evaluation ${className}`}>
        {evaluation.message}
      </div>
    );
  };

  const renderShortAnswer = (task) => (
    <div className="response-block">
      <textarea
        className="response-input"
        value={responses[task.id] || ''}
        onChange={(event) => updateResponse(task.id, event.target.value)}
        placeholder="Type response"
        rows={3}
      />
    </div>
  );

  const renderTrueFalse = (task) => {
    const selected = String(responses[task.id] || '').toLowerCase();
    const evaluation = evaluations[task.id];

    return (
      <div className="response-block true-false">
        {['true', 'false'].map((value) => {
          const isSelected = selected === value;
          const isCorrect = evaluation?.status === 'correct' && task.response?.correct?.toString().toLowerCase() === value;
          const isIncorrect = evaluation?.status === 'incorrect' && isSelected;

          return (
            <button
              key={value}
              type="button"
              className={`choice-chip ${isSelected ? 'choice-chip--selected' : ''} ${isCorrect ? 'choice-chip--correct' : ''} ${isIncorrect ? 'choice-chip--incorrect' : ''}`}
              onClick={() => updateResponse(task.id, value)}
            >
              {value === 'true' ? '✅ True' : '❌ False'}
            </button>
          );
        })}
      </div>
    );
  };

  const renderMultipleChoice = (task, sequence) => {
    const options = task.response?.options || [];
    const selected = responses[task.id];
    const evaluation = evaluations[task.id];

    return (
      <div className="response-block">
        <div className="choice-grid">
          {options.map((option) => {
            const isSelected = selected === option.id;
            const isCorrectSelection = evaluation?.status === 'correct' && task.response?.correct === option.id;
            const isIncorrectSelection = evaluation?.status === 'incorrect' && isSelected;
            const choiceIcon = getChoiceIcon(sequence.id, task, option);

            return (
              <button
                key={option.id}
                type="button"
                className={`choice-chip ${isSelected ? 'choice-chip--selected' : ''} ${isCorrectSelection ? 'choice-chip--correct' : ''} ${isIncorrectSelection ? 'choice-chip--incorrect' : ''}`}
                onClick={() => updateResponse(task.id, option.id)}
              >
                {renderChoiceIcon(choiceIcon)}
                {option.text}
              </button>
            );
          })}
        </div>
        {showTeacherTools && (
          <div className="choice-tools">
            {options.map((option) => (
              <div key={`${option.id}-icon-tools`} className="choice-tool-row">
                <span className="choice-tool-text">{option.text}</span>
                <div className="choice-tool-actions">
                  <button
                    type="button"
                    onClick={() => openIconPanelForChoice(sequence.id, task.id, option.id)}
                  >
                    Assign icon
                  </button>
                  <button
                    type="button"
                    onClick={() => clearAssignedIcon(sequence.id, task.id, option.id)}
                  >
                    Clear
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSequence = (task) => {
    const options = task.response?.options || [];
    const optionLookup = Object.fromEntries(options.map((option) => [option.id, option]));
    const order = Array.isArray(responses[task.id]) ? responses[task.id] : options.map((option) => option.id);

    const moveItem = (fromIndex, toIndex) => {
      if (toIndex < 0 || toIndex >= order.length) return;
      const newOrder = [...order];
      const [moved] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, moved);
      updateResponse(task.id, newOrder);
    };

    const shuffleOrder = () => {
      const shuffled = [...order];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
      }
      updateResponse(task.id, shuffled);
    };

    return (
      <div className="sequence">
        <ol className="sequence-list">
          {order.map((optionId, index) => {
            const option = optionLookup[optionId];
            if (!option) return null;
            return (
              <li key={optionId} className="sequence-item">
                <div className="sequence-item__content">
                  <span className="sequence-item__index">{index + 1}</span>
                  <span>{option.text}</span>
                </div>
                <div className="sequence-item__actions">
                  <button type="button" onClick={() => moveItem(index, index - 1)} disabled={index === 0}>
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === order.length - 1}
                  >
                    ↓
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="sequence-toolbar">
          <button type="button" onClick={shuffleOrder}>Shuffle order</button>
          <button type="button" onClick={() => resetTask(task)}>Reset order</button>
        </div>
      </div>
    );
  };

  const renderSort = (task) => {
    const categories = task.response?.categories || [];
    const items = task.response?.items || [];
    const assignment = responses[task.id] || {};
    const itemLookup = Object.fromEntries(items.map((item) => [item.id, item]));
    const bucketOrder = [UNASSIGNED_BUCKET, ...categories.map((category) => category.id)];

    const moveItem = (itemId, targetBucket) => {
      const current = assignment || {};
      const next = {};

      bucketOrder.forEach((bucketId) => {
        const bucketItems = Array.isArray(current[bucketId]) ? current[bucketId] : [];
        next[bucketId] = bucketItems.filter((id) => id !== itemId);
      });

      if (!next[targetBucket]) {
        next[targetBucket] = [];
      }
      next[targetBucket] = [...next[targetBucket], itemId];

      updateResponse(task.id, next);
    };

    return (
      <div className="sort-board">
        {bucketOrder.map((bucketId) => {
          const title = bucketId === UNASSIGNED_BUCKET
            ? 'Word bank'
            : categories.find((category) => category.id === bucketId)?.title || 'Category';
          const description = bucketId === UNASSIGNED_BUCKET
            ? 'Drag items from here into the target categories.'
            : categories.find((category) => category.id === bucketId)?.description;
          const bucketItems = Array.isArray(assignment[bucketId]) ? assignment[bucketId] : [];

          return (
            <div
              key={bucketId}
              className={`sort-column ${bucketId === UNASSIGNED_BUCKET ? 'sort-column--bank' : ''}`}
            >
              <header>
                <h4>{title}</h4>
                {description && <p>{description}</p>}
              </header>
              <div className="sort-column__items">
                {bucketItems.length === 0 && (
                  <p className="sort-column__empty">No items here yet.</p>
                )}
                {bucketItems.map((itemId) => {
                  const item = itemLookup[itemId];
                  if (!item) return null;
                  return (
                    <div key={item.id} className="sort-item">
                      <span>{item.text}</span>
                      <div className="sort-item__actions">
                        <select
                          value={bucketId}
                          onChange={(event) => moveItem(item.id, event.target.value)}
                        >
                          {bucketOrder.map((targetId) => (
                            <option key={targetId} value={targetId}>
                              {targetId === UNASSIGNED_BUCKET
                                ? 'Word bank'
                                : categories.find((category) => category.id === targetId)?.title || targetId}
                            </option>
                          ))}
                        </select>
                        {bucketId !== UNASSIGNED_BUCKET && (
                          <button type="button" onClick={() => moveItem(item.id, UNASSIGNED_BUCKET)}>
                            Send back
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRevealContent = (task) => {
    switch (task.response?.type) {
      case ResponseKinds.SHORT_ANSWER: {
        const answers = task.response?.correct;
        if (Array.isArray(answers)) {
          return (
            <ul>
              {answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
          );
        }
        return <p>{answers}</p>;
      }
      case ResponseKinds.MULTIPLE_CHOICE: {
        const options = task.response?.options || [];
        const correctId = task.response?.correct;
        const correct = options.find((option) => option.id === correctId);
        return <p>{correct ? correct.text : 'Correct option not set.'}</p>;
      }
      case ResponseKinds.TRUE_FALSE: {
        const correct = String(task.response?.correct).toLowerCase() === 'true' ? 'True' : 'False';
        return <p>{correct}</p>;
      }
      case ResponseKinds.SEQUENCE: {
        const options = task.response?.options || [];
        const optionLookup = Object.fromEntries(options.map((option) => [option.id, option]));
        const order = Array.isArray(task.response?.correct) && task.response?.correct.length > 0
          ? task.response.correct
          : options.map((option) => option.id);
        return (
          <ol>
            {order.map((id) => (
              <li key={id}>{optionLookup[id]?.text || id}</li>
            ))}
          </ol>
        );
      }
      case ResponseKinds.SORT: {
        const categories = task.response?.categories || [];
        const items = task.response?.items || [];
        const itemLookup = Object.fromEntries(items.map((item) => [item.id, item]));
        const correctMap = task.response?.correct || {};
        return (
          <div className="sort-reveal">
            {categories.map((category) => (
              <div key={category.id} className="sort-reveal__category">
                <h5>{category.title}</h5>
                <ul>
                  {(correctMap[category.id] || []).map((itemId) => (
                    <li key={itemId}>{itemLookup[itemId]?.text || itemId}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      default:
        return <p>Reveal view not implemented for this task type.</p>;
    }
  };

  const renderResponse = (task, sequence) => {
    switch (task.response?.type) {
      case ResponseKinds.SHORT_ANSWER:
        return renderShortAnswer(task);
      case ResponseKinds.MULTIPLE_CHOICE:
        return renderMultipleChoice(task, sequence);
      case ResponseKinds.TRUE_FALSE:
        return renderTrueFalse(task);
      case ResponseKinds.SEQUENCE:
        return renderSequence(task);
      case ResponseKinds.SORT:
        return renderSort(task);
      default:
        return (
          <div className="response-block">
            <p className="response-placeholder">Renderer for "{task.response?.type}" not implemented yet.</p>
          </div>
        );
    }
  };

  const renderTaskControls = (task) => (
    <div className="response-actions">
      <button type="button" className="primary" onClick={() => checkTask(task)}>
        Check response
      </button>
      <button type="button" onClick={() => revealAnswer(task.id)}>
        Reveal answer
      </button>
      <button type="button" onClick={() => resetTask(task)}>
        Clear
      </button>
    </div>
  );

  const sequenceTabs = useMemo(() => (
    activity.sequences?.map((sequence, index) => (
      <button
        key={sequence.id}
        type="button"
        className={`sequence-tab ${index === sequenceIndex ? 'sequence-tab--active' : ''}`}
        onClick={() => setSequenceIndex(index)}
      >
        {sequence.title}
      </button>
    )) || []
  ), [activity.sequences, sequenceIndex]);

  if (!activeSequence) {
    return <p>No sequences defined for this activity yet.</p>;
  }

  return (
    <div className="activity-player">
      <div className="activity-player__header">
        <div>
          <h1>{activity.title}</h1>
          <p>{activity.description}</p>
        </div>
        <div className="activity-player__meta">
          <span>{activity.domain}</span>
          {activity.meta?.estimatedTime && <span>{activity.meta.estimatedTime}</span>}
          <button type="button" onClick={resetSession} className="meta-reset">
            Reset session
          </button>
          <button
            type="button"
            onClick={() => setShowTeacherTools((prev) => !prev)}
            className="meta-reset meta-reset--secondary"
          >
            {showTeacherTools ? 'Hide teacher tools' : 'Show teacher tools'}
          </button>
        </div>
      </div>

      <section className="activity-player__passages">
        {activity.passages.map((passage) => (
          <article key={passage.id} className="passage-card">
            <header>
              <h2>{passage.title}</h2>
              <div className="passage-card__metrics">
                {passage.metrics?.readingLevel && <span>{passage.metrics.readingLevel}</span>}
                {passage.metrics?.lexile && <span>Lexile {passage.metrics.lexile}</span>}
                {passage.metrics?.wordCount && <span>{passage.metrics.wordCount} words</span>}
              </div>
            </header>
            <p>{passage.content}</p>
          </article>
        ))}
      </section>

      <nav className="sequence-tabs">{sequenceTabs}</nav>

      <section className="sequence-body">
        {activeSequence.tasks.map((task) => (
          <article key={task.id} className="task-card">
            <header className="task-card__header">
              <h3>{task.prompt.value}</h3>
            </header>
            {renderSupportControls(task)}
            {supportDetails(task)}
            {renderResponse(task, activeSequence)}
            {renderTaskControls(task)}
            {renderEvaluation(task)}
            {revealed[task.id] && (
              <div className="response-answer">
                <span>Exemplar:</span>
                {renderRevealContent(task)}
              </div>
            )}
            {task.rubric?.evidence && (
              <footer className="task-card__rubric">
                <span>What we are listening for:</span>
                <p>{task.rubric.evidence}</p>
              </footer>
            )}
          </article>
        ))}
      </section>

      <IconManager
        isOpen={iconPanelOpen}
        onClose={() => {
          setIconPanelOpen(false);
          iconManager.setAssigningTo(null);
        }}
        icons={iconManager.icons}
        onUpload={iconManager.uploadIcon}
        onDelete={iconManager.deleteIcon}
        onClearAll={iconManager.clearAllIcons}
        onSelectIcon={(iconId) => {
          iconManager.setSelectedIcon(iconId);
          if (iconManager.assigningTo) {
            iconManager.assignIcon(iconManager.assigningTo, iconId);
            setIconPanelOpen(false);
            iconManager.setAssigningTo(null);
          }
        }}
        selectedIcon={iconManager.selectedIcon}
        assigningTo={iconManager.assigningTo}
      />
    </div>
  );
};

export default ActivityPlayer;
