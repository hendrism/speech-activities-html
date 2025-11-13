import React, { useMemo, useState } from 'react';
import './KeyEventDetailPractice.css';

const stories = [
  {
    title: "The Trophy Accident",
    paragraphs: [
      "On Monday, Rosa volunteered to help her teacher set up the classroom trophy case.",
      "While lifting a heavy box, the top trophy slipped from her hands and shattered on the floor.",
      "Rosa gasped and quickly told Ms. Grant what happened, and they reported the accident to the principal.",
      "They swept up the glass together so no one would get hurt.",
      "Ms. Grant thanked Rosa for being honest and promised they would order a replacement trophy.",
      "The next day, the class designed a \"Temporary Trophy\" sign to fill the empty shelf."
    ],
    statements: [
      { text: "Rosa dropped the top trophy and it shattered on the floor.", type: 'event' },
      { text: "Rosa and Ms. Grant reported the broken trophy to the principal.", type: 'event' },
      { text: "They swept up the glass together to keep the area safe.", type: 'detail' },
      { text: "Ms. Grant thanked Rosa and said they would order a replacement.", type: 'detail' },
      { text: "The class made a 'Temporary Trophy' sign for the empty shelf.", type: 'detail' }
    ]
  },
  {
    title: "Riding With Mrs. Lopez",
    paragraphs: [
      "Jayden overslept on Wednesday and missed the school bus as it pulled away.",
      "He ran outside, but the bus was already halfway down the block.",
      "Neighbor Mrs. Lopez spotted him and offered to drive him to school.",
      "During the ride, Jayden called the office to let them know he would arrive a few minutes late.",
      "That evening he wrote Mrs. Lopez a thank-you note for saving the day.",
      "The next morning Jayden set two alarms so he would wake up on time."
    ],
    statements: [
      { text: "Jayden missed the school bus on Wednesday morning.", type: 'event' },
      { text: "Mrs. Lopez drove Jayden to school when she saw he was late.", type: 'event' },
      { text: "Jayden called the school office to say he would be a few minutes late.", type: 'detail' },
      { text: "He wrote Mrs. Lopez a thank-you note that evening.", type: 'detail' },
      { text: "Jayden set two alarms for the next morning.", type: 'detail' }
    ]
  },
  {
    title: "The Cafeteria Scoop",
    paragraphs: [
      "Talia writes for the school newspaper and needed a story for the next issue.",
      "She learned that the cafeteria would start a monthly \"Try-It Tuesday\" to feature foods from different countries.",
      "Talia interviewed the head chef after school and took careful notes.",
      "She also asked students which international foods they were most excited to taste.",
      "That night, Talia wrote a short article and emailed it to her editor before bedtime.",
      "The article ran on the front page of the newspaper the following week."
    ],
    statements: [
      { text: "Talia discovered the cafeteria was launching a monthly \"Try-It Tuesday\" program.", type: 'event' },
      { text: "She wrote the article and submitted it to her editor that night.", type: 'event' },
      { text: "Talia interviewed the head chef and took notes about the new menu.", type: 'detail' },
      { text: "She asked students what foods they hoped to try first.", type: 'detail' },
      { text: "The article appeared on the front page the next week.", type: 'detail' }
    ]
  },
  {
    title: "Robot Repair Rush",
    paragraphs: [
      "Brothers Colin and Amir built a small robot for the community STEM fair.",
      "Minutes before judging, the robot's left wheel stopped spinning.",
      "Colin held the robot steady while Amir quickly replaced a loose wire.",
      "They tested the robot twice to make sure it could still follow the taped maze.",
      "During their presentation, the robot successfully completed the course.",
      "The judges awarded them the \"Quick Problem Solver\" ribbon."
    ],
    statements: [
      { text: "The robot's wheel stopped working right before judging began.", type: 'event' },
      { text: "Amir fixed the loose wire so the robot could run the maze.", type: 'event' },
      { text: "Colin held the robot steady while Amir repaired it.", type: 'detail' },
      { text: "They retested the robot twice before their presentation.", type: 'detail' },
      { text: "They earned the \"Quick Problem Solver\" ribbon from the judges.", type: 'detail' }
    ]
  }
];

const choiceLabels = {
  event: 'Key Event',
  detail: 'Supporting Detail'
};

const KeyEventDetailPractice = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [selections, setSelections] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const currentStory = useMemo(() => stories[currentStoryIndex], [currentStoryIndex]);

  const totalStatements = currentStory.statements.length;
  const answeredCount = Object.keys(selections).length;

  const handleSelect = (statementIndex, choice) => {
    setSelections(prev => {
      const nextSelections = { ...prev };
      if (nextSelections[statementIndex] === choice) {
        delete nextSelections[statementIndex];
      } else {
        nextSelections[statementIndex] = choice;
      }
      return nextSelections;
    });
    setError('');
    setShowResults(false);
  };

  const resetStory = () => {
    setSelections({});
    setFeedback({});
    setShowResults(false);
    setError('');
  };

  const handleCheckAnswers = () => {
    const allAnswered = currentStory.statements.every((_, idx) => selections[idx]);
    if (!allAnswered) {
      setError('Label every statement as either a Key Event or a Supporting Detail before checking.');
      return;
    }

    const newFeedback = {};
    let correctCount = 0;

    currentStory.statements.forEach((statement, index) => {
      const userChoice = selections[index];
      const isCorrect = userChoice === statement.type;
      newFeedback[index] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setFeedback({
      isCorrect: newFeedback,
      score: correctCount,
      total: totalStatements
    });
    setShowResults(true);
    setError('');
  };

  const goToStory = (index) => {
    if (index === currentStoryIndex) return;
    setCurrentStoryIndex(index);
    setSelections({});
    setFeedback({});
    setShowResults(false);
    setError('');
  };

  return (
    <div className="key-event-practice">
      <header className="activity-header">
        <div className="header-content">
          <div>
            <h1>📰 Key Events & Supporting Details</h1>
            <p className="header-subtitle">
              Read each short story, then decide which statements describe the big events and which ones share extra details.
            </p>
          </div>
          <div className="progress-chip">
            Story {currentStoryIndex + 1} of {stories.length}
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="definition-cards">
          <div className="definition-card event">
            <h3>Key Event</h3>
            <p>The major happening that moves the story forward or changes what the characters do next.</p>
          </div>
          <div className="definition-card detail">
            <h3>Supporting Detail</h3>
            <p>Extra information that explains how the event happened, what someone said, or what happened after.</p>
          </div>
        </section>

        <div className="activity-layout">
          <article className="story-card">
            <header>
              <h2>{currentStory.title}</h2>
            </header>
            <div className="story-text">
              {currentStory.paragraphs.map((sentence, idx) => (
                <p key={idx}>{sentence}</p>
              ))}
            </div>
          </article>

          <section className="classification-panel">
            <h3>Classify Each Statement</h3>
            <p className="panel-instructions">
              Click one of the buttons to label each statement. Keep the main events separate from the helpful details.
            </p>

            {error && <div className="error-banner">{error}</div>}

            <div className="statement-list">
              {currentStory.statements.map((statement, index) => {
                const currentSelection = selections[index];
                const isAnswered = Boolean(currentSelection);
                const isCorrect = showResults ? feedback.isCorrect?.[index] : null;

                return (
                  <div
                    key={statement.text}
                    className={`statement-card ${showResults ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  >
                    <div className="statement-text">{statement.text}</div>
                    <div className="choice-buttons">
                      {(['event', 'detail']).map(choice => (
                        <button
                          key={choice}
                          type="button"
                          className={`choice-btn ${currentSelection === choice ? 'selected' : ''}`}
                          onClick={() => handleSelect(index, choice)}
                          aria-pressed={currentSelection === choice}
                        >
                          {choiceLabels[choice]}
                        </button>
                      ))}
                    </div>
                    {showResults && (
                      <div className={`feedback-chip ${isCorrect ? 'correct' : 'incorrect'}`}>
                        {isCorrect ? '✅ Correct' : `❌ It is a ${choiceLabels[statement.type]}`}
                      </div>
                    )}
                    {!showResults && isAnswered && (
                      <div className="selection-note">
                        Selected: {choiceLabels[currentSelection]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="panel-actions">
              <button className="secondary-btn" onClick={resetStory}>
                Reset Labels
              </button>
              <button className="primary-btn" onClick={handleCheckAnswers}>
                Check Answers
              </button>
            </div>

            <div className="panel-status">
              <span>{answeredCount} / {totalStatements} statements labeled</span>
              {showResults && (
                <span className="score-display">
                  Score: {feedback.score} / {feedback.total}
                </span>
              )}
            </div>
          </section>
        </div>

        <nav className="story-navigation">
          <button
            type="button"
            className="nav-btn"
            onClick={() => goToStory(currentStoryIndex - 1)}
            disabled={currentStoryIndex === 0}
          >
            ← Previous Story
          </button>
          <div className="story-dots">
            {stories.map((story, index) => (
              <button
                key={story.title}
                type="button"
                className={`dot ${currentStoryIndex === index ? 'active' : ''}`}
                onClick={() => goToStory(index)}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            className="nav-btn"
            onClick={() => goToStory(currentStoryIndex + 1)}
            disabled={currentStoryIndex === stories.length - 1}
          >
            Next Story →
          </button>
        </nav>
      </main>
    </div>
  );
};

export default KeyEventDetailPractice;
