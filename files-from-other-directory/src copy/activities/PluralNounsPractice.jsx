import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './PluralNounsPractice.css';

const PluralNounsPractice = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState({});
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const nounData = [
    { singular: "mouse", plural: "mice", type: "Irregular", sentence: "I saw one [noun] in the kitchen." },
    { singular: "child", plural: "children", type: "Irregular", sentence: "The [noun] played in the park." },
    { singular: "foot", plural: "feet", type: "Irregular", sentence: "My [noun] hurt after the long walk." },
    { singular: "goose", plural: "geese", type: "Irregular", sentence: "A [noun] swam in the pond." },
    { singular: "tooth", plural: "teeth", type: "Irregular", sentence: "I lost a [noun] today." },
    { singular: "sheep", plural: "sheep", type: "Irregular", sentence: "The farmer has one [noun]." },
    { singular: "man", plural: "men", type: "Irregular", sentence: "The [noun] walked to work." },
    { singular: "woman", plural: "women", type: "Irregular", sentence: "The [noun] smiled at me." },
    { singular: "person", plural: "people", type: "Irregular", sentence: "One [noun] stood in line." },
    { singular: "deer", plural: "deer", type: "Irregular", sentence: "A [noun] ran through the forest." },
    { singular: "fish", plural: "fish", type: "Irregular", sentence: "The [noun] swam in the lake." },
    { singular: "ox", plural: "oxen", type: "Irregular", sentence: "The [noun] pulled the cart." },
    { singular: "cat", plural: "cats", type: "Regular", sentence: "The [noun] slept on my bed." },
    { singular: "dog", plural: "dogs", type: "Regular", sentence: "My [noun] loves to play fetch." },
    { singular: "book", plural: "books", type: "Regular", sentence: "I read a good [noun] yesterday." },
    { singular: "box", plural: "boxes", type: "Regular", sentence: "The [noun] was very heavy." },
    { singular: "bus", plural: "buses", type: "Regular", sentence: "The yellow [noun] arrived late." },
    { singular: "dish", plural: "dishes", type: "Regular", sentence: "Mom washed every [noun]." },
    { singular: "car", plural: "cars", type: "Regular", sentence: "The [noun] drove down the street." },
    { singular: "tree", plural: "trees", type: "Regular", sentence: "The [noun] grew very tall." },
    { singular: "house", plural: "houses", type: "Regular", sentence: "The [noun] had a red door." },
    { singular: "glass", plural: "glasses", type: "Regular", sentence: "The [noun] broke on the floor." },
    { singular: "watch", plural: "watches", type: "Regular", sentence: "My [noun] shows the correct time." },
    { singular: "baby", plural: "babies", type: "Regular", sentence: "The [noun] cried loudly." },
    { singular: "city", plural: "cities", type: "Regular", sentence: "The [noun] has many buildings." }
  ];

  const filteredNouns = selectedType === 'all'
    ? nounData
    : nounData.filter(n => n.type === selectedType);

  const currentNoun = filteredNouns[currentIndex];

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [currentNoun.singular]: value }));
    setChecked(prev => ({ ...prev, [currentNoun.singular]: false }));
  };

  const checkAnswer = () => {
    setChecked(prev => ({ ...prev, [currentNoun.singular]: true }));
  };

  const nextNoun = () => {
    if (currentIndex < filteredNouns.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevNoun = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const checkAll = () => {
    const allChecked = {};
    filteredNouns.forEach(noun => {
      allChecked[noun.singular] = true;
    });
    setChecked(allChecked);

    const correct = filteredNouns.filter(n =>
      answers[n.singular]?.toLowerCase().trim() === n.plural.toLowerCase()
    ).length;
    alert(`Score: ${correct} / ${filteredNouns.length} correct`);
  };

  const resetActivity = () => {
    setAnswers({});
    setChecked({});
    setCurrentIndex(0);
  };

  const userAnswer = answers[currentNoun?.singular] || '';
  const isChecked = checked[currentNoun?.singular];
  const isCorrect = userAnswer.toLowerCase().trim() === currentNoun?.plural.toLowerCase();

  const renderSentence = (sentence, singular, showPlural = false) => {
    const noun = showPlural ? (
      <span className="blank-input">{userAnswer || '_____'}</span>
    ) : (
      <span className="singular-noun">{singular}</span>
    );

    return sentence.replace('[noun]', '___NOUN___').split('___NOUN___').map((part, i) => (
      <React.Fragment key={i}>
        {part}
        {i === 0 && noun}
      </React.Fragment>
    ));
  };

  if (!currentNoun) {
    return <div>No nouns available for selected type</div>;
  }

  return (
    <div className="plural-nouns-practice">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>🔢 Plural Nouns Practice</h1>
          <div className="progress-info">
            {currentIndex + 1} / {filteredNouns.length}
          </div>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={checkAll} className="primary">
              Check All
            </button>
            <button onClick={resetActivity} className="warning">
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="noun-selector">
          <button
            onClick={() => { setSelectedType('all'); setCurrentIndex(0); }}
            className={`noun-btn ${selectedType === 'all' ? 'active' : ''}`}
          >
            All Nouns
          </button>
          <button
            onClick={() => { setSelectedType('Regular'); setCurrentIndex(0); }}
            className={`noun-btn ${selectedType === 'Regular' ? 'active' : ''}`}
          >
            Regular
          </button>
          <button
            onClick={() => { setSelectedType('Irregular'); setCurrentIndex(0); }}
            className={`noun-btn ${selectedType === 'Irregular' ? 'active' : ''}`}
          >
            Irregular
          </button>
        </div>

        <div className="practice-container">
          <div className="noun-header">
            <h2 className="noun-title">Fill in the Blank</h2>
            <span className="noun-type">{currentNoun.type} Plural</span>
          </div>

          <div className="sentence-pair">
            <div className="sentence-container">
              <span className="sentence-label">Singular</span>
              <p className="sentence-text">
                {renderSentence(currentNoun.sentence, currentNoun.singular, false)}
              </p>
            </div>

            <div className="sentence-container">
              <span className="sentence-label">Plural</span>
              <p className="sentence-text">
                {currentNoun.sentence.replace('[noun]', '').split('one ').map((part, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && 'many '}
                    {part}
                  </React.Fragment>
                ))}
                <input
                  type="text"
                  className={`blank-input ${isChecked ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  value={userAnswer}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Type plural..."
                />
              </p>
            </div>
          </div>

          {isChecked && (
            <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect
                ? `✅ Correct! ${currentNoun.singular} → ${currentNoun.plural}`
                : `❌ Try again. The correct answer is: ${currentNoun.plural}`
              }
            </div>
          )}

          <div className="support-section">
            <button onClick={checkAnswer} className="hint-btn">
              Check Answer
            </button>
          </div>

          <div className="navigation">
            <button onClick={prevNoun} disabled={currentIndex === 0} className="nav-btn">
              ← Previous
            </button>
            <button onClick={nextNoun} disabled={currentIndex === filteredNouns.length - 1} className="nav-btn primary">
              Next →
            </button>
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

export default PluralNounsPractice;
