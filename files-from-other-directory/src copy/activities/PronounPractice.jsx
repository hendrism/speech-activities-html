import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './PronounPractice.css';

const PronounPractice = () => {
  const iconManager = useIconManager();
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const exercises = [
    // Subject Pronouns
    {
      id: 1,
      type: 'subject',
      prompt: 'Sarah loves to read books.',
      question: 'Replace "Sarah" with the correct pronoun:',
      sentence: '___ loves to read books.',
      choices: ['She', 'He', 'They', 'It'],
      answer: 0,
      explanation: 'Use "She" for a girl or woman (Sarah).'
    },
    {
      id: 2,
      type: 'subject',
      prompt: 'My brother plays soccer every day.',
      question: 'Replace "My brother" with the correct pronoun:',
      sentence: '___ plays soccer every day.',
      choices: ['She', 'He', 'We', 'They'],
      answer: 1,
      explanation: 'Use "He" for a boy or man (my brother).'
    },
    {
      id: 3,
      type: 'subject',
      prompt: 'The students are working on their project.',
      question: 'Replace "The students" with the correct pronoun:',
      sentence: '___ are working on their project.',
      choices: ['He', 'She', 'They', 'It'],
      answer: 2,
      explanation: 'Use "They" for more than one person (students).'
    },
    {
      id: 4,
      type: 'subject',
      prompt: 'The dog is sleeping on the couch.',
      question: 'Replace "The dog" with the correct pronoun:',
      sentence: '___ is sleeping on the couch.',
      choices: ['He', 'She', 'They', 'It'],
      answer: 3,
      explanation: 'Use "It" for animals or things (the dog).'
    },
    // Object Pronouns
    {
      id: 5,
      type: 'object',
      prompt: 'Mom gave the toy to Maria.',
      question: 'Replace "Maria" with the correct pronoun:',
      sentence: 'Mom gave the toy to ___.',
      choices: ['she', 'her', 'he', 'him'],
      answer: 1,
      explanation: 'Use "her" when the pronoun comes after a verb or preposition (to her).'
    },
    {
      id: 6,
      type: 'object',
      prompt: 'The teacher called on Tom.',
      question: 'Replace "Tom" with the correct pronoun:',
      sentence: 'The teacher called on ___.',
      choices: ['he', 'him', 'she', 'her'],
      answer: 1,
      explanation: 'Use "him" when the pronoun comes after a verb or preposition (on him).'
    },
    {
      id: 7,
      type: 'object',
      prompt: 'Can you help my friends and me?',
      question: 'What pronoun can replace "my friends and me"?',
      sentence: 'Can you help ___?',
      choices: ['we', 'us', 'they', 'them'],
      answer: 1,
      explanation: 'Use "us" when the pronoun comes after a verb (help us).'
    },
    // Possessive Pronouns
    {
      id: 8,
      type: 'possessive',
      prompt: 'That book belongs to Jake.',
      question: 'Which pronoun shows ownership?',
      sentence: 'That book is ___.',
      choices: ['him', 'he', 'his', 'he\'s'],
      answer: 2,
      explanation: 'Use "his" to show something belongs to a boy or man.'
    },
    {
      id: 9,
      type: 'possessive',
      prompt: 'The backpack belongs to Emma.',
      question: 'Which pronoun shows ownership?',
      sentence: 'The backpack is ___.',
      choices: ['she', 'her', 'hers', 'she\'s'],
      answer: 2,
      explanation: 'Use "hers" to show something belongs to a girl or woman.'
    },
    {
      id: 10,
      type: 'possessive',
      prompt: 'This is the students\' classroom.',
      question: 'Which pronoun shows ownership?',
      sentence: 'This classroom is ___.',
      choices: ['they', 'them', 'their', 'theirs'],
      answer: 3,
      explanation: 'Use "theirs" to show something belongs to more than one person.'
    },
    // Reflexive Pronouns
    {
      id: 11,
      type: 'reflexive',
      prompt: 'I made breakfast by myself.',
      question: 'Which reflexive pronoun completes the sentence?',
      sentence: 'I made breakfast ___.',
      choices: ['myself', 'yourself', 'himself', 'themselves'],
      answer: 0,
      explanation: 'Use "myself" when "I" does something alone or to myself.'
    },
    {
      id: 12,
      type: 'reflexive',
      prompt: 'She taught herself to play guitar.',
      question: 'Which reflexive pronoun is correct?',
      sentence: 'She taught ___ to play guitar.',
      choices: ['himself', 'herself', 'themselves', 'itself'],
      answer: 1,
      explanation: 'Use "herself" when a girl or woman does something to herself.'
    },
    {
      id: 13,
      type: 'reflexive',
      prompt: 'The kids cleaned up by themselves.',
      question: 'Which reflexive pronoun is correct?',
      sentence: 'The kids cleaned up ___.',
      choices: ['myself', 'yourself', 'ourselves', 'themselves'],
      answer: 3,
      explanation: 'Use "themselves" when more than one person does something on their own.'
    },
    // Mixed Practice
    {
      id: 14,
      type: 'mixed',
      prompt: 'Lucy and I went to the store. Mom drove Lucy and me.',
      question: 'Choose the correct pronouns:',
      sentence: '___ went to the store. Mom drove ___.',
      choices: ['We...us', 'Us...we', 'We...we', 'Us...us'],
      answer: 0,
      explanation: 'Use "We" as the subject (doing the action) and "us" as the object (receiving the action).'
    },
    {
      id: 15,
      type: 'mixed',
      prompt: 'The cat licked its paws. The cat is grooming itself.',
      question: 'Choose the correct pronouns:',
      sentence: 'The cat licked ___ paws. ___ is grooming ___.',
      choices: ['its...It...itself', 'it\'s...It...himself', 'its...It...himself', 'it\'s...It...itself'],
      answer: 0,
      explanation: 'Use "its" (possessive), "It" (subject), and "itself" (reflexive) for animals.'
    }
  ];

  const pronounTypes = [
    { id: 'all', name: 'All Types', icon: '🔤' },
    { id: 'subject', name: 'Subject (I, you, he, she)', icon: '👤' },
    { id: 'object', name: 'Object (me, you, him, her)', icon: '🎯' },
    { id: 'possessive', name: 'Possessive (mine, yours, his, hers)', icon: '🏷️' },
    { id: 'reflexive', name: 'Reflexive (myself, yourself, himself)', icon: '🪞' },
    { id: 'mixed', name: 'Mixed Practice', icon: '🔀' }
  ];

  const [selectedType, setSelectedType] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);

  const filteredExercises = selectedType === 'all'
    ? exercises
    : exercises.filter(ex => ex.type === selectedType);

  const currentExercise = filteredExercises[currentIndex];

  const handleAnswerSelect = (choiceIndex) => {
    setSelectedAnswer(choiceIndex);
    setShowFeedback(true);

    if (choiceIndex === currentExercise.answer && !completedExercises.includes(currentExercise.id)) {
      setCompletedExercises([...completedExercises, currentExercise.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCompletedExercises([]);
  };

  return (
    <div className="pronoun-practice">
      <div className="activity-header no-print">
        <div className="header-content">
          <h1>👤 Pronoun Practice</h1>
          <div className="header-controls">
            <button onClick={handleReset} className="control-btn">
              🔄 Reset
            </button>
            <button onClick={() => window.print()} className="control-btn">
              🖨️ Print
            </button>
          </div>
        </div>
      </div>

      {iconPanelOpen && (
        <IconManager
          iconManager={iconManager}
          onClose={() => setIconPanelOpen(false)}
        />
      )}

      <div className="main-content">
        <div className="type-selector no-print">
          <h2>Choose Pronoun Type:</h2>
          <div className="type-buttons">
            {pronounTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                className={`type-btn ${selectedType === type.id ? 'active' : ''}`}
              >
                <span className="type-icon">{type.icon}</span>
                <span className="type-name">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="progress-info no-print">
          <p>Exercise {currentIndex + 1} of {filteredExercises.length} | Completed: {completedExercises.length}/{exercises.length}</p>
        </div>

        <div className="exercise-card">
          <div className="exercise-header">
            <span className="type-badge">{currentExercise.type}</span>
            <h2>Exercise {currentIndex + 1}</h2>
          </div>

          <div className="prompt-section">
            <h3>Original Sentence:</h3>
            <p className="original-sentence">{currentExercise.prompt}</p>
          </div>

          <div className="question-section">
            <h3>{currentExercise.question}</h3>
            <p className="practice-sentence">{currentExercise.sentence}</p>
          </div>

          <div className="choices-section">
            {currentExercise.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showFeedback}
                className={`choice-btn ${
                  selectedAnswer === idx
                    ? idx === currentExercise.answer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${showFeedback && idx === currentExercise.answer ? 'correct' : ''}`}
              >
                {choice}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`feedback ${selectedAnswer === currentExercise.answer ? 'correct' : 'incorrect'}`}>
              {selectedAnswer === currentExercise.answer ? (
                <>
                  <strong>✓ Correct!</strong>
                  <p>{currentExercise.explanation}</p>
                </>
              ) : (
                <>
                  <strong>✗ Not quite.</strong>
                  <p>The correct answer is: <strong>{currentExercise.choices[currentExercise.answer]}</strong></p>
                  <p>{currentExercise.explanation}</p>
                </>
              )}
            </div>
          )}

          <div className="navigation-buttons no-print">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="nav-btn"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredExercises.length - 1}
              className="nav-btn primary"
            >
              Next Exercise →
            </button>
          </div>
        </div>

        <div className="pronoun-guide">
          <h3>Pronoun Quick Guide:</h3>
          <div className="guide-grid">
            <div className="guide-card">
              <strong>👤 Subject Pronouns</strong>
              <p>Use before verbs (doing the action)</p>
              <p className="examples">I, you, he, she, it, we, they</p>
            </div>
            <div className="guide-card">
              <strong>🎯 Object Pronouns</strong>
              <p>Use after verbs or prepositions (receiving action)</p>
              <p className="examples">me, you, him, her, it, us, them</p>
            </div>
            <div className="guide-card">
              <strong>🏷️ Possessive Pronouns</strong>
              <p>Show ownership (belongs to someone)</p>
              <p className="examples">mine, yours, his, hers, its, ours, theirs</p>
            </div>
            <div className="guide-card">
              <strong>🪞 Reflexive Pronouns</strong>
              <p>Action done to/by oneself</p>
              <p className="examples">myself, yourself, himself, herself, itself, ourselves, themselves</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronounPractice;
