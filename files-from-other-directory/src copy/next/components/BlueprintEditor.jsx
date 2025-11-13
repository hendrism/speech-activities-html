import React, { useState } from 'react';
import { useIconManager } from '../../hooks/useIconManager';
import IconManager from '../../components/IconManager';
import {
  ActivityDomains,
  TaskKinds,
  ResponseKinds,
  SupportTiers,
} from '../schemas/activity';
import './BlueprintEditor.css';

const clone = (value) => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const domainOptions = Object.values(ActivityDomains);
const taskKindOptions = Object.values(TaskKinds);
const responseTypeOptions = Object.values(ResponseKinds);

const ensureArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const defaultResponseForType = (type) => {
  switch (type) {
    case ResponseKinds.MULTIPLE_CHOICE:
      return {
        type,
        options: [
          { id: 'choice-a', text: 'Option A' },
          { id: 'choice-b', text: 'Option B' },
        ],
        correct: 'choice-a',
      };
    case ResponseKinds.TRUE_FALSE:
      return {
        type,
        correct: 'true',
      };
    case ResponseKinds.SEQUENCE:
      return {
        type,
        options: [
          { id: 'step-1', text: 'First step' },
          { id: 'step-2', text: 'Second step' },
          { id: 'step-3', text: 'Third step' },
        ],
        correct: ['step-1', 'step-2', 'step-3'],
      };
    case ResponseKinds.SORT:
      return {
        type,
        categories: [
          { id: 'category-a', title: 'Category A', description: '' },
          { id: 'category-b', title: 'Category B', description: '' },
        ],
        items: [
          { id: 'item-1', text: 'Item 1' },
          { id: 'item-2', text: 'Item 2' },
        ],
        correct: {
          'category-a': ['item-1'],
          'category-b': ['item-2'],
        },
      };
    case ResponseKinds.SHORT_ANSWER:
    default:
      return {
        type: ResponseKinds.SHORT_ANSWER,
        correct: 'Sample answer',
      };
  }
};

const defaultTask = () => ({
  id: `task-${Date.now()}`,
  kind: TaskKinds.COMPREHENSION,
  prompt: { type: 'text', value: 'Prompt text' },
  response: defaultResponseForType(ResponseKinds.SHORT_ANSWER),
  supports: [],
});

const BlueprintEditor = ({ draft, onChange }) => {
  const iconManager = useIconManager();
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [iconTarget, setIconTarget] = useState(null);
  const updateDraft = (mutator) => {
    const next = clone(draft);
    mutator(next);
    onChange(next);
  };

  const updateActivityField = (field, value) => {
    updateDraft((next) => {
      next[field] = value;
    });
  };

  const updateAudienceField = (field, value) => {
    updateDraft((next) => {
      next.audience = next.audience || {};
      next.audience[field] = value;
    });
  };

  const addTag = (tag) => {
    if (!tag) return;
    const cleaned = tag.trim();
    if (!cleaned) return;
    updateDraft((next) => {
      const tags = new Set(next.tags || []);
      tags.add(cleaned);
      next.tags = Array.from(tags);
    });
  };

  const removeTag = (tag) => {
    updateDraft((next) => {
      next.tags = (next.tags || []).filter((entry) => entry !== tag);
    });
  };

  const addGradeBand = (band) => {
    if (!band) return;
    const cleaned = band.trim();
    if (!cleaned) return;
    updateDraft((next) => {
      next.audience = next.audience || {};
      const gradeBands = new Set(next.audience.gradeBands || []);
      gradeBands.add(cleaned);
      next.audience.gradeBands = Array.from(gradeBands);
    });
  };

  const removeGradeBand = (band) => {
    updateDraft((next) => {
      if (!next.audience) return;
      next.audience.gradeBands = (next.audience.gradeBands || []).filter((entry) => entry !== band);
    });
  };

  const addPassage = () => {
    updateDraft((next) => {
      next.passages = next.passages || [];
      next.passages.push({
        id: `passage-${Date.now()}`,
        title: 'New Passage',
        content: 'Add passage text here.',
        metrics: {},
      });
    });
  };

  const updatePassage = (index, field, value) => {
    updateDraft((next) => {
      if (!next.passages?.[index]) return;
      if (field === 'metrics') {
        next.passages[index].metrics = {
          ...next.passages[index].metrics,
          ...value,
        };
      } else {
        next.passages[index][field] = value;
      }
    });
  };

  const removePassage = (index) => {
    updateDraft((next) => {
      next.passages.splice(index, 1);
    });
  };

  const addSequence = () => {
    updateDraft((next) => {
      next.sequences = next.sequences || [];
      next.sequences.push({
        id: `sequence-${Date.now()}`,
        title: 'New Sequence',
        tasks: [defaultTask()],
        options: { recommendedOrder: next.sequences.length },
      });
    });
  };

  const updateSequenceField = (index, field, value) => {
    updateDraft((next) => {
      if (!next.sequences?.[index]) return;
      next.sequences[index][field] = value;
    });
  };

  const removeSequence = (index) => {
    updateDraft((next) => {
      next.sequences.splice(index, 1);
    });
  };

  const addTask = (sequenceIndex) => {
    updateDraft((next) => {
      next.sequences[sequenceIndex].tasks.push(defaultTask());
    });
  };

  const updateTask = (sequenceIndex, taskIndex, mutator) => {
    updateDraft((next) => {
      const task = next.sequences?.[sequenceIndex]?.tasks?.[taskIndex];
      if (!task) return;
      mutator(task);
    });
  };

  const resolveChoiceFromDraft = (target) => {
    const sequence = draft.sequences?.[target.sequenceIndex];
    if (!sequence) return null;
    const task = sequence.tasks?.[target.taskIndex];
    if (!task) return null;

    if (target.scope === 'response') {
      return task.response?.options?.[target.choiceIndex] || null;
    }

    const support = task.supports?.[target.supportIndex];
    return support?.choices?.[target.choiceIndex] || null;
  };

  const openIconPicker = (target) => {
    const currentChoice = resolveChoiceFromDraft(target);
    iconManager.setSelectedIcon(currentChoice?.iconId || null);
    iconManager.setAssigningTo('blueprint-target');
    setIconTarget(target);
    setIconPanelOpen(true);
  };

  const closeIconPicker = () => {
    setIconPanelOpen(false);
    setIconTarget(null);
    iconManager.setAssigningTo(null);
    iconManager.setSelectedIcon(null);
  };

  const applyIconToTarget = (iconId) => {
    if (!iconTarget) return;
    updateTask(iconTarget.sequenceIndex, iconTarget.taskIndex, (task) => {
      const assignIcon = (choice) => {
        if (!choice) return;
        if (iconId) {
          choice.iconId = iconId;
          choice.icon = '';
        } else {
          choice.iconId = '';
        }
      };

      if (iconTarget.scope === 'response') {
        const option = task.response?.options?.[iconTarget.choiceIndex];
        assignIcon(option);
      } else if (iconTarget.scope === 'support') {
        const support = task.supports?.[iconTarget.supportIndex];
        if (!support) return;
        const choice = support.choices?.[iconTarget.choiceIndex];
        assignIcon(choice);
      }
    });
  };

  const handleIconSelect = (iconId) => {
    applyIconToTarget(iconId);
    closeIconPicker();
  };

  const removeTask = (sequenceIndex, taskIndex) => {
    updateDraft((next) => {
      next.sequences[sequenceIndex].tasks.splice(taskIndex, 1);
    });
  };

  const addSupport = (sequenceIndex, taskIndex) => {
    updateTask(sequenceIndex, taskIndex, (task) => {
      task.supports = task.supports || [];
      task.supports.push({
        level: SupportTiers[0],
        strategyNotes: [],
      });
    });
  };

  const updateSupport = (sequenceIndex, taskIndex, supportIndex, mutator) => {
    updateTask(sequenceIndex, taskIndex, (task) => {
      if (!task.supports?.[supportIndex]) return;
      mutator(task.supports[supportIndex]);
    });
  };

  const removeSupport = (sequenceIndex, taskIndex, supportIndex) => {
    updateTask(sequenceIndex, taskIndex, (task) => {
      task.supports.splice(supportIndex, 1);
    });
  };

  const [newTag, setNewTag] = useState('');
  const [newGradeBand, setNewGradeBand] = useState('');

  const renderTags = () => (
    <div className="chip-list">
      {(draft.tags || []).map((tag) => (
        <span key={tag} className="chip">
          {tag}
          <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
            ×
          </button>
        </span>
      ))}
    </div>
  );

  const renderGradeBands = () => (
    <div className="chip-list">
      {(draft.audience?.gradeBands || []).map((band) => (
        <span key={band} className="chip">
          {band}
          <button type="button" onClick={() => removeGradeBand(band)} aria-label={`Remove ${band}`}>
            ×
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <div className="blueprint-editor">
      <section className="editor-card">
        <header>
          <h2>Activity Overview</h2>
          <p>Core information used across all sequences and passages.</p>
        </header>
        <div className="editor-grid">
          <label>
            <span>Title</span>
            <input
              type="text"
              value={draft.title || ''}
              onChange={(event) => updateActivityField('title', event.target.value)}
            />
          </label>
          <label>
            <span>Domain</span>
            <select
              value={draft.domain || ''}
              onChange={(event) => updateActivityField('domain', event.target.value)}
            >
              {domainOptions.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </label>
          <label className="editor-grid__full">
            <span>Description</span>
            <textarea
              rows={3}
              value={draft.description || ''}
              onChange={(event) => updateActivityField('description', event.target.value)}
            />
          </label>
        </div>

        <div className="editor-subsection">
          <h3>Tags</h3>
          {renderTags()}
          <div className="inline-form">
            <input
              type="text"
              placeholder="Add tag"
              value={newTag}
              onChange={(event) => setNewTag(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addTag(newTag);
                  setNewTag('');
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                addTag(newTag);
                setNewTag('');
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="editor-subsection">
          <h3>Grade Bands</h3>
          {renderGradeBands()}
          <div className="inline-form">
            <input
              type="text"
              placeholder="e.g. 3-5"
              value={newGradeBand}
              onChange={(event) => setNewGradeBand(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addGradeBand(newGradeBand);
                  setNewGradeBand('');
                }
              }}
            />
            <button
              type="button"
              onClick={() => {
                addGradeBand(newGradeBand);
                setNewGradeBand('');
              }}
            >
              Add
            </button>
          </div>
        </div>
      </section>

      <section className="editor-card">
        <header>
          <h2>Passages</h2>
          <p>Stories or informational text available to every sequence in this activity.</p>
        </header>
        <div className="passage-list">
          {(draft.passages || []).map((passage, index) => (
            <article key={passage.id} className="passage-editor">
              <div className="passage-editor__header">
                <h3>{passage.title}</h3>
                <div>
                  <button type="button" onClick={() => removePassage(index)}>
                    Delete
                  </button>
                </div>
              </div>
              <label>
                <span>Passage ID</span>
                <input
                  type="text"
                  value={passage.id || ''}
                  onChange={(event) => updatePassage(index, 'id', event.target.value)}
                />
              </label>
              <label>
                <span>Title</span>
                <input
                  type="text"
                  value={passage.title || ''}
                  onChange={(event) => updatePassage(index, 'title', event.target.value)}
                />
              </label>
              <label>
                <span>Content</span>
                <textarea
                  rows={8}
                  value={passage.content || ''}
                  onChange={(event) => updatePassage(index, 'content', event.target.value)}
                />
              </label>
              <div className="metrics-grid">
                <label>
                  <span>Reading Level</span>
                  <input
                    type="text"
                    value={passage.metrics?.readingLevel || ''}
                    onChange={(event) =>
                      updatePassage(index, 'metrics', { readingLevel: event.target.value })
                    }
                  />
                </label>
                <label>
                  <span>Lexile</span>
                  <input
                    type="number"
                    value={passage.metrics?.lexile || ''}
                    onChange={(event) =>
                      updatePassage(index, 'metrics', {
                        lexile: event.target.value ? Number(event.target.value) : undefined,
                      })
                    }
                  />
                </label>
                <label>
                  <span>Word Count</span>
                  <input
                    type="number"
                    value={passage.metrics?.wordCount || ''}
                    onChange={(event) =>
                      updatePassage(index, 'metrics', {
                        wordCount: event.target.value ? Number(event.target.value) : undefined,
                      })
                    }
                  />
                </label>
              </div>
            </article>
          ))}
        </div>
        <button type="button" onClick={addPassage} className="add-button">
          + Add Passage
        </button>
      </section>

      <section className="editor-card">
        <header>
          <h2>Sequences & Tasks</h2>
          <p>Blocks of tasks applied to the passages above. Each sequence appears as a tab in the player.</p>
        </header>

        <div className="sequence-list">
          {(draft.sequences || []).map((sequence, sequenceIndex) => (
            <article key={sequence.id} className="sequence-editor">
              <div className="sequence-editor__header">
                <div>
                  <h3>{sequence.title}</h3>
                  <span className="sequence-id">{sequence.id}</span>
                </div>
                <div className="sequence-actions">
                  <button type="button" onClick={() => removeSequence(sequenceIndex)}>
                    Delete sequence
                  </button>
                </div>
              </div>

              <label>
                <span>Sequence ID</span>
                <input
                  type="text"
                  value={sequence.id || ''}
                  onChange={(event) => updateSequenceField(sequenceIndex, 'id', event.target.value)}
                />
              </label>

              <label>
                <span>Sequence Title</span>
                <input
                  type="text"
                  value={sequence.title || ''}
                  onChange={(event) => updateSequenceField(sequenceIndex, 'title', event.target.value)}
                />
              </label>

              <div className="task-list">
                {sequence.tasks.map((task, taskIndex) => (
                  <TaskEditor
                    key={task.id}
                    sequenceIndex={sequenceIndex}
                    taskIndex={taskIndex}
                    task={task}
                    updateTask={updateTask}
                    removeTask={removeTask}
                    addSupport={addSupport}
                    updateSupport={updateSupport}
                    removeSupport={removeSupport}
                    iconManager={iconManager}
                    requestIconPicker={openIconPicker}
                  />
                ))}
              </div>

              <button type="button" onClick={() => addTask(sequenceIndex)} className="add-button">
                + Add Task
              </button>
            </article>
          ))}
        </div>

      <button type="button" onClick={addSequence} className="add-button">
        + Add Sequence
      </button>
    </section>

      <IconManager
        isOpen={iconPanelOpen}
        onClose={closeIconPicker}
        icons={iconManager.icons}
        onUpload={iconManager.uploadIcon}
        onDelete={iconManager.deleteIcon}
        onClearAll={iconManager.clearAllIcons}
        onSelectIcon={(iconId) => {
          iconManager.setSelectedIcon(iconId);
          handleIconSelect(iconId);
        }}
        selectedIcon={iconManager.selectedIcon}
        assigningTo={iconManager.assigningTo}
      />
    </div>
  );
};

const TaskEditor = ({
  sequenceIndex,
  taskIndex,
  task,
  updateTask,
  removeTask,
  addSupport,
  updateSupport,
  removeSupport,
  iconManager,
  requestIconPicker,
}) => {
  const setTaskField = (field, value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current[field] = value;
    });
  };

  const setPromptValue = (value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.prompt = current.prompt || { type: 'text', value: '' };
      current.prompt.value = value;
    });
  };

  const setResponseType = (type) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.response = defaultResponseForType(type);
    });
  };

  const setShortAnswerCorrect = (value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const lines = value
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      current.response.correct = lines.length > 1 ? lines : lines[0] || '';
    });
  };

  const addChoiceOption = () => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.response.options = current.response.options || [];
      const newId = `choice-${current.response.options.length + 1}`;
      current.response.options.push({ id: newId, text: `Choice ${current.response.options.length + 1}` });
      if (!current.response.correct) {
        current.response.correct = newId;
      }
    });
  };

  const updateChoiceOption = (optionIndex, field, value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      if (!current.response.options?.[optionIndex]) return;
      current.response.options[optionIndex][field] = value;
    });
  };

  const removeChoiceOption = (optionIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      if (!current.response.options) return;
      const removed = current.response.options.splice(optionIndex, 1);
      if (removed[0]?.id === current.response.correct) {
        current.response.correct = current.response.options[0]?.id || '';
      }
    });
  };

  const iconOptions = Object.entries(iconManager?.icons || {});

  const resolveChoiceDisplay = (choice) => {
    if (!choice) return null;
    if (choice.icon && choice.icon.trim()) return choice.icon;
    if (choice.iconId && iconManager?.icons?.[choice.iconId]) {
      return iconManager.icons[choice.iconId];
    }
    return null;
  };

  const renderIconPreview = (choice) => {
    const resolved = resolveChoiceDisplay(choice);
    if (!resolved) {
      return <span className="icon-preview__placeholder">No icon</span>;
    }
    if (typeof resolved === 'string' && resolved.startsWith('data:')) {
      return <img src={resolved} alt="" className="icon-preview__image" />;
    }
    return <span className="icon-preview__emoji">{resolved}</span>;
  };

  const setResponseIconId = (choiceIndex, iconId) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const choice = current.response?.options?.[choiceIndex];
      if (!choice) return;
      choice.iconId = iconId;
      if (iconId) {
        choice.icon = '';
      }
    });
  };

  const clearResponseIcon = (choiceIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const choice = current.response?.options?.[choiceIndex];
      if (!choice) return;
      choice.iconId = '';
      if (!choice.icon) {
        choice.icon = '';
      }
    });
  };

  const copyResponseIconToAll = (choiceIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const source = current.response?.options?.[choiceIndex];
      if (!source) return;
      current.response.options.forEach((option, idx) => {
        if (!option || idx === choiceIndex) return;
        option.icon = source.icon;
        option.iconId = source.iconId;
      });
    });
  };

  const openResponseIconPicker = (choiceIndex) => {
    requestIconPicker({
      scope: 'response',
      sequenceIndex,
      taskIndex,
      choiceIndex,
    });
  };

  const setSupportIconId = (supportIndex, choiceIndex, iconId) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const support = current.supports?.[supportIndex];
      if (!support || !support.choices?.[choiceIndex]) return;
      support.choices[choiceIndex].iconId = iconId;
      if (iconId) {
        support.choices[choiceIndex].icon = '';
      }
    });
  };

  const clearSupportIcon = (supportIndex, choiceIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const support = current.supports?.[supportIndex];
      if (!support || !support.choices?.[choiceIndex]) return;
      support.choices[choiceIndex].iconId = '';
      if (!support.choices[choiceIndex].icon) {
        support.choices[choiceIndex].icon = '';
      }
    });
  };

  const copySupportIconToAll = (supportIndex, choiceIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const support = current.supports?.[supportIndex];
      if (!support || !support.choices?.[choiceIndex]) return;
      const source = support.choices[choiceIndex];
      support.choices.forEach((choice, idx) => {
        if (!choice || idx === choiceIndex) return;
        choice.icon = source.icon;
        choice.iconId = source.iconId;
      });
    });
  };

  const openSupportIconPicker = (supportIndex, choiceIndex) => {
    requestIconPicker({
      scope: 'support',
      sequenceIndex,
      taskIndex,
      supportIndex,
      choiceIndex,
    });
  };

  const moveChoiceOption = (optionIndex, direction) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const options = current.response.options || [];
      const newIndex = optionIndex + direction;
      if (newIndex < 0 || newIndex >= options.length) return;
      const temp = options[optionIndex];
      options[optionIndex] = options[newIndex];
      options[newIndex] = temp;
    });
  };

  const setTrueFalseCorrect = (value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.response.correct = value;
    });
  };

  const addSequenceStep = () => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.response.options = current.response.options || [];
      const newIndex = current.response.options.length + 1;
      const newId = `step-${newIndex}`;
      current.response.options.push({ id: newId, text: `Step ${newIndex}` });
      current.response.correct = current.response.options.map((option) => option.id);
    });
  };

  const updateSequenceStep = (stepIndex, field, value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      if (!current.response.options?.[stepIndex]) return;
      current.response.options[stepIndex][field] = value;
      current.response.correct = current.response.options.map((option) => option.id);
    });
  };

  const moveSequenceStep = (stepIndex, direction) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const options = current.response.options || [];
      const newIndex = stepIndex + direction;
      if (newIndex < 0 || newIndex >= options.length) return;
      const temp = options[stepIndex];
      options[stepIndex] = options[newIndex];
      options[newIndex] = temp;
      current.response.correct = options.map((option) => option.id);
    });
  };

  const removeSequenceStep = (stepIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      if (!current.response.options) return;
      current.response.options.splice(stepIndex, 1);
      current.response.correct = current.response.options.map((option) => option.id);
    });
  };

  const addSortCategory = () => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.response.categories = current.response.categories || [];
      const newId = `category-${current.response.categories.length + 1}`;
      current.response.categories.push({ id: newId, title: `Category ${current.response.categories.length + 1}`, description: '' });
      current.response.correct = current.response.correct || {};
      current.response.correct[newId] = [];
    });
  };

  const updateSortCategory = (categoryIndex, field, value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      if (!current.response.categories?.[categoryIndex]) return;
      if (field === 'id') {
        const previousId = current.response.categories[categoryIndex].id;
        current.response.categories[categoryIndex][field] = value;
        if (previousId && value && previousId !== value && current.response.correct?.[previousId]) {
          current.response.correct[value] = current.response.correct[previousId];
          delete current.response.correct[previousId];
        }
      } else {
        current.response.categories[categoryIndex][field] = value;
      }
    });
  };

  const removeSortCategory = (categoryIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      if (!current.response.categories) return;
      const [removed] = current.response.categories.splice(categoryIndex, 1);
      if (!removed) return;
      if (current.response.correct) {
        delete current.response.correct[removed.id];
      }
    });
  };

  const addSortItem = () => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.response.items = current.response.items || [];
      const newId = `item-${current.response.items.length + 1}`;
      current.response.items.push({ id: newId, text: `Item ${current.response.items.length + 1}` });
    });
  };

  const updateSortItem = (itemIndex, field, value) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      if (!current.response.items?.[itemIndex]) return;
      current.response.items[itemIndex][field] = value;
    });
  };

  const removeSortItem = (itemIndex) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      const item = current.response.items?.[itemIndex];
      if (!item) return;
      current.response.items.splice(itemIndex, 1);
      if (current.response.correct) {
        Object.keys(current.response.correct).forEach((bucket) => {
          current.response.correct[bucket] = current.response.correct[bucket].filter((id) => id !== item.id);
        });
      }
    });
  };

  const setSortAssignment = (itemId, categoryId) => {
    updateTask(sequenceIndex, taskIndex, (current) => {
      current.response.correct = current.response.correct || {};
      Object.keys(current.response.correct).forEach((bucket) => {
        current.response.correct[bucket] = current.response.correct[bucket].filter((id) => id !== itemId);
      });
      if (categoryId) {
        current.response.correct[categoryId] = current.response.correct[categoryId] || [];
        current.response.correct[categoryId].push(itemId);
      }
    });
  };

  const renderResponseFields = () => {
    switch (task.response?.type) {
      case ResponseKinds.MULTIPLE_CHOICE:
        return (
          <div className="response-section">
            <h4>Answer Choices</h4>
            <div className="choice-editor-list">
              {(task.response.options || []).map((option, index) => (
                <div key={option.id || index} className="choice-editor">
                  <div className="choice-editor__inputs">
                    <input
                      type="text"
                      value={option.id || ''}
                      onChange={(event) => updateChoiceOption(index, 'id', event.target.value)}
                      placeholder="Choice ID"
                    />
                    <input
                      type="text"
                      value={option.text || ''}
                      onChange={(event) => updateChoiceOption(index, 'text', event.target.value)}
                      placeholder="Choice text"
                    />
                  </div>
                  <div className="choice-editor__icons">
                    <div className="choice-icon-inputs">
                      <input
                        type="text"
                        value={option.icon || ''}
                        onChange={(event) => updateChoiceOption(index, 'icon', event.target.value)}
                        placeholder="Inline icon (emoji/text)"
                      />
                      <input
                        type="text"
                        value={option.iconId || ''}
                        onChange={(event) => updateChoiceOption(index, 'iconId', event.target.value)}
                        placeholder="Icon library ID"
                      />
                      {iconOptions.length > 0 && (
                        <select
                          value={option.iconId || ''}
                          onChange={(event) => setResponseIconId(index, event.target.value)}
                        >
                          <option value="">Select saved icon…</option>
                          {iconOptions.map(([iconId]) => (
                            <option key={iconId} value={iconId}>
                              {iconId}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                    <div className="choice-icon-preview">
                      {renderIconPreview(option)}
                    </div>
                    <div className="choice-icon-actions">
                      <button type="button" onClick={() => openResponseIconPicker(index)}>
                        Pick from library
                      </button>
                      <button type="button" onClick={() => copyResponseIconToAll(index)}>
                        Copy to all
                      </button>
                      <button type="button" onClick={() => clearResponseIcon(index)}>
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="choice-editor__actions">
                    <label>
                      <input
                        type="radio"
                        checked={task.response.correct === option.id}
                        onChange={() => updateTask(sequenceIndex, taskIndex, (current) => {
                          current.response.correct = option.id;
                        })}
                      />
                      Correct
                    </label>
                    <div className="choice-editor__buttons">
                      <button type="button" onClick={() => moveChoiceOption(index, -1)} disabled={index === 0}>
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveChoiceOption(index, 1)}
                        disabled={index === task.response.options.length - 1}
                      >
                        ↓
                      </button>
                      <button type="button" onClick={() => removeChoiceOption(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addChoiceOption} className="add-button-inline">
              + Add Choice
            </button>
          </div>
        );
      case ResponseKinds.TRUE_FALSE:
        return (
          <div className="response-section">
            <h4>Correct answer</h4>
            <div className="inline-radio">
              <label>
                <input
                  type="radio"
                  name={`tf-${task.id}`}
                  checked={task.response.correct === 'true'}
                  onChange={() => setTrueFalseCorrect('true')}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name={`tf-${task.id}`}
                  checked={task.response.correct === 'false'}
                  onChange={() => setTrueFalseCorrect('false')}
                />
                False
              </label>
            </div>
          </div>
        );
      case ResponseKinds.SEQUENCE:
        return (
          <div className="response-section">
            <h4>Sequence steps</h4>
            <div className="sequence-editor-grid">
              {(task.response.options || []).map((step, index) => (
                <div key={step.id || index} className="sequence-step">
                  <div className="sequence-step__inputs">
                    <input
                      type="text"
                      value={step.id || ''}
                      onChange={(event) => updateSequenceStep(index, 'id', event.target.value)}
                      placeholder="Step ID"
                    />
                    <textarea
                      rows={2}
                      value={step.text || ''}
                      onChange={(event) => updateSequenceStep(index, 'text', event.target.value)}
                      placeholder="Step description"
                    />
                  </div>
                  <div className="sequence-step__actions">
                    <button type="button" onClick={() => moveSequenceStep(index, -1)} disabled={index === 0}>
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSequenceStep(index, 1)}
                      disabled={index === task.response.options.length - 1}
                    >
                      ↓
                    </button>
                    <button type="button" onClick={() => removeSequenceStep(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addSequenceStep} className="add-button-inline">
              + Add Step
            </button>
          </div>
        );
      case ResponseKinds.SORT: {
        const categories = task.response.categories || [];
        const items = task.response.items || [];
        const correctMap = task.response.correct || {};
        const itemAssignments = {};
        categories.forEach((category) => {
          (correctMap[category.id] || []).forEach((itemId) => {
            itemAssignments[itemId] = category.id;
          });
        });

        return (
          <div className="response-section">
            <h4>Categories</h4>
            <div className="category-grid">
              {categories.map((category, index) => (
                <div key={category.id || index} className="category-card">
                  <label>
                    <span>ID</span>
                    <input
                      type="text"
                      value={category.id || ''}
                      onChange={(event) => updateSortCategory(index, 'id', event.target.value)}
                    />
                  </label>
                  <label>
                    <span>Title</span>
                    <input
                      type="text"
                      value={category.title || ''}
                      onChange={(event) => updateSortCategory(index, 'title', event.target.value)}
                    />
                  </label>
                  <label>
                    <span>Description</span>
                    <textarea
                      rows={2}
                      value={category.description || ''}
                      onChange={(event) => updateSortCategory(index, 'description', event.target.value)}
                    />
                  </label>
                  <button type="button" onClick={() => removeSortCategory(index)}>
                    Delete category
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addSortCategory} className="add-button-inline">
              + Add Category
            </button>

            <h4>Items</h4>
            <div className="item-grid">
              {items.map((item, index) => (
                <div key={item.id || index} className="item-card">
                  <label>
                    <span>ID</span>
                    <input
                      type="text"
                      value={item.id || ''}
                      onChange={(event) => updateSortItem(index, 'id', event.target.value)}
                    />
                  </label>
                  <label>
                    <span>Text</span>
                    <input
                      type="text"
                      value={item.text || ''}
                      onChange={(event) => updateSortItem(index, 'text', event.target.value)}
                    />
                  </label>
                  <label>
                    <span>Assign to</span>
                    <select
                      value={itemAssignments[item.id] || ''}
                      onChange={(event) => setSortAssignment(item.id, event.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button type="button" onClick={() => removeSortItem(index)}>
                    Delete item
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addSortItem} className="add-button-inline">
              + Add Item
            </button>
          </div>
        );
      }
      case ResponseKinds.SHORT_ANSWER:
      default:
        return (
          <div className="response-section">
            <h4>Expected answers</h4>
            <textarea
              rows={3}
              value={ensureArray(task.response?.correct).join('\n')}
              onChange={(event) => setShortAnswerCorrect(event.target.value)}
              placeholder="Each line becomes an accepted response"
            />
          </div>
        );
    }
  };

  return (
    <article className="task-editor">
      <div className="task-editor__header">
        <div>
          <h4>{task.prompt?.value?.slice(0, 60) || 'Task'}</h4>
          <span className="task-id">{task.id}</span>
        </div>
        <button type="button" onClick={() => removeTask(sequenceIndex, taskIndex)}>
          Delete task
        </button>
      </div>

      <div className="task-editor__grid">
        <label>
          <span>Task ID</span>
          <input
            type="text"
            value={task.id || ''}
            onChange={(event) => setTaskField('id', event.target.value)}
          />
        </label>
        <label>
          <span>Task Kind</span>
          <select
            value={task.kind || TaskKinds.COMPREHENSION}
            onChange={(event) => setTaskField('kind', event.target.value)}
          >
            {taskKindOptions.map((kind) => (
              <option key={kind} value={kind}>
                {kind}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Prompt</span>
          <textarea
            rows={3}
            value={task.prompt?.value || ''}
            onChange={(event) => setPromptValue(event.target.value)}
          />
        </label>
        <label>
          <span>Response Type</span>
          <select
            value={task.response?.type || ResponseKinds.SHORT_ANSWER}
            onChange={(event) => setResponseType(event.target.value)}
          >
            {responseTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      {renderResponseFields()}

      <SupportEditor
        sequenceIndex={sequenceIndex}
        taskIndex={taskIndex}
        supports={task.supports || []}
        addSupport={addSupport}
        updateSupport={updateSupport}
        removeSupport={removeSupport}
        iconOptions={iconOptions}
        renderIconPreview={renderIconPreview}
        openSupportIconPicker={openSupportIconPicker}
        setSupportIconId={setSupportIconId}
        clearSupportIcon={clearSupportIcon}
        copySupportIconToAll={copySupportIconToAll}
      />
    </article>
  );
};

const SupportEditor = ({
  sequenceIndex,
  taskIndex,
  supports,
  addSupport,
  updateSupport,
  removeSupport,
  iconOptions,
  renderIconPreview,
  openSupportIconPicker,
  setSupportIconId,
  clearSupportIcon,
  copySupportIconToAll,
}) => {
  return (
    <div className="support-editor">
      <div className="support-editor__header">
        <h4>Support Tiers</h4>
        <button type="button" onClick={() => addSupport(sequenceIndex, taskIndex)}>
          + Add support level
        </button>
      </div>

      {supports.length === 0 && <p className="support-empty">No supports configured yet.</p>}

      <div className="support-list">
        {supports.map((support, index) => (
          <div key={`${support.level}-${index}`} className="support-card">
            <div className="support-card__header">
              <label>
                <span>Level</span>
                <select
                  value={support.level}
                  onChange={(event) =>
                    updateSupport(sequenceIndex, taskIndex, index, (current) => {
                      current.level = event.target.value;
                    })
                  }
                >
                  {SupportTiers.map((tier) => (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={() => removeSupport(sequenceIndex, taskIndex, index)}>
                Delete
              </button>
            </div>

            <label>
              <span>Hint</span>
              <textarea
                rows={2}
                value={support.hint || ''}
                onChange={(event) =>
                  updateSupport(sequenceIndex, taskIndex, index, (current) => {
                    current.hint = event.target.value;
                  })
                }
              />
            </label>

            <label>
              <span>Strategy Notes (one per line)</span>
              <textarea
                rows={2}
                value={(support.strategyNotes || []).join('\n')}
                onChange={(event) =>
                  updateSupport(sequenceIndex, taskIndex, index, (current) => {
                    current.strategyNotes = event.target.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean);
                  })
                }
              />
            </label>

            {support.level === 'choices' && (
              <ChoicesSupportEditor
                sequenceIndex={sequenceIndex}
                taskIndex={taskIndex}
                supportIndex={index}
                support={support}
                updateSupport={updateSupport}
                iconOptions={iconOptions}
                renderIconPreview={renderIconPreview}
                openSupportIconPicker={openSupportIconPicker}
                setSupportIconId={setSupportIconId}
                clearSupportIcon={clearSupportIcon}
                copySupportIconToAll={copySupportIconToAll}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChoicesSupportEditor = ({
  sequenceIndex,
  taskIndex,
  supportIndex,
  support,
  updateSupport,
}) => {
  const addChoice = () => {
    updateSupport(sequenceIndex, taskIndex, supportIndex, (current) => {
      current.choices = current.choices || [];
      current.choices.push({ id: `choice-${current.choices.length + 1}`, text: 'Support choice' });
    });
  };

  const updateChoice = (choiceIndex, field, value) => {
    updateSupport(sequenceIndex, taskIndex, supportIndex, (current) => {
      if (!current.choices?.[choiceIndex]) return;
      current.choices[choiceIndex][field] = value;
    });
  };

  const removeChoice = (choiceIndex) => {
    updateSupport(sequenceIndex, taskIndex, supportIndex, (current) => {
      current.choices.splice(choiceIndex, 1);
    });
  };

  return (
    <div className="support-choices">
      <h5>Choices presented at this level</h5>
      <div className="support-choice-list">
        {(support.choices || []).map((choice, index) => (
          <div key={choice.id || index} className="support-choice">
            <div className="support-choice__inputs">
              <input
                type="text"
                value={choice.id || ''}
                onChange={(event) => updateChoice(index, 'id', event.target.value)}
                placeholder="Choice ID"
              />
              <input
                type="text"
                value={choice.text || ''}
                onChange={(event) => updateChoice(index, 'text', event.target.value)}
                placeholder="Choice text"
              />
              <input
                type="text"
                value={choice.icon || ''}
                onChange={(event) => updateChoice(index, 'icon', event.target.value)}
                placeholder="Inline icon"
              />
              <input
                type="text"
                value={choice.iconId || ''}
                onChange={(event) => updateChoice(index, 'iconId', event.target.value)}
                placeholder="Icon ID"
              />
              {(iconOptions || []).length > 0 && (
                <select
                  value={choice.iconId || ''}
                  onChange={(event) => setSupportIconId(supportIndex, index, event.target.value)}
                >
                  <option value="">Select saved icon…</option>
                  {(iconOptions || []).map(([iconId]) => (
                    <option key={iconId} value={iconId}>
                      {iconId}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="support-choice__preview">
              {renderIconPreview(choice)}
            </div>
            <div className="support-choice__actions">
              <button type="button" onClick={() => openSupportIconPicker(supportIndex, index)}>
                Pick from library
              </button>
              <button type="button" onClick={() => copySupportIconToAll(supportIndex, index)}>
                Copy to all
              </button>
              <button type="button" onClick={() => clearSupportIcon(supportIndex, index)}>
                Clear
              </button>
              <button type="button" onClick={() => removeChoice(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={addChoice} className="add-button-inline">
        + Add Support Choice
      </button>
    </div>
  );
};

export default BlueprintEditor;
