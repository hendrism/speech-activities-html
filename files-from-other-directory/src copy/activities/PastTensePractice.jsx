import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './PastTensePractice.css';

const PastTensePractice = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [highContrast, setHighContrast] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const practiceQuestions = [
    { prompt: "Complete the Sentence", stem: "Yesterday, I _____ my lunch quickly.", choices: ["eat","ate","eating"], answer: 1 },
    { prompt: "Choose the Correct Past Tense", stem: "Last summer, she _____ to France.", choices: ["going","went","goes"], answer: 1 },
    { prompt: "Fill in the Past Tense", stem: "The athlete _____ the entire race.", choices: ["running","ran","run"], answer: 1 },
    { prompt: "Select the Right Word", stem: "The children _____ the test answers.", choices: ["knew","know","knowing"], answer: 0 },
    { prompt: "Past Tense Practice", stem: "Last week, he _____ asleep during the movie.", choices: ["falling","fell","fall"], answer: 1 },
    { prompt: "Complete the Sentence", stem: "The fish _____ deep in the ocean.", choices: ["swim","swimming","swam"], answer: 2 },
    { prompt: "Choose Wisely", stem: "My brother _____ the football far.", choices: ["throwing","threw","throw"], answer: 1 },
    { prompt: "Past Tense Challenge", stem: "The mouse _____ behind the couch.", choices: ["hide","hid","hiding"], answer: 1 },
    { prompt: "Fill in the Blank", stem: "They _____ their favorite song.", choices: ["singing","sang","sing"], answer: 1 },
    { prompt: "Select the Past Tense", stem: "Our dog _____ the stick quickly.", choices: ["catch","caught","catching"], answer: 1 },
    { prompt: "Past Tense Practice", stem: "The bell _____ at noon.", choices: ["ring","rang","ringing"], answer: 1 },
    { prompt: "Choose the Correct Form", stem: "She _____ her new shoes yesterday.", choices: ["wearing","wore","wear"], answer: 1 },
    { prompt: "Final Practice", stem: "The bird _____ high in the sky.", choices: ["flew","fly","flying"], answer: 0 }
  ];

  const totalSlides = practiceQuestions.length + 2; // +2 for intro slides

  const handleAnswer = (questionIndex, choiceIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: choiceIndex
    }));
    setShowFeedback(prev => ({
      ...prev,
      [questionIndex]: false
    }));
  };

  const checkOne = (questionIndex) => {
    setShowFeedback(prev => ({
      ...prev,
      [questionIndex]: true
    }));
  };

  const checkAll = () => {
    const allFeedback = {};
    practiceQuestions.forEach((_, index) => {
      allFeedback[index] = true;
    });
    setShowFeedback(allFeedback);

    // Calculate score
    const correct = practiceQuestions.filter((q, i) => answers[i] === q.answer).length;
    const total = practiceQuestions.length;
    alert(`Score: ${correct} / ${total} correct`);
  };

  const resetActivity = () => {
    setAnswers({});
    setShowFeedback({});
    setCurrentSlide(0);
  };

  const handlePrint = () => {
    window.print();
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  };

  const renderIntroSlide = () => (
    <div className="slide">
      <h2>Regular and Irregular Past Tense Verbs</h2>
      <p className="lead">Use these slides to review past tense and practice with multiple choice questions. Click Check all at any time to see your score.</p>
      <ul>
        <li>Slides 1-2 are quick notes</li>
        <li>Slides 3-{totalSlides} are practice items</li>
      </ul>
    </div>
  );

  const renderRulesSlide = () => (
    <div className="slide">
      <h2>Understanding Past Tense Verbs</h2>
      <div className="grid-2">
        <div className="rule-box">
          <h3>Regular past tense</h3>
          <p className="meta">Add -ed</p>
          <ul>
            <li>walk → walked</li>
            <li>play → played</li>
            <li>talk → talked</li>
          </ul>
        </div>
        <div className="rule-box">
          <h3>Irregular past tense</h3>
          <p className="meta">Changes form</p>
          <ul>
            <li>run → ran</li>
            <li>eat → ate</li>
            <li>swim → swam</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderQuestionSlide = (questionIndex) => {
    const question = practiceQuestions[questionIndex];
    const userAnswer = answers[questionIndex];
    const isCorrect = userAnswer === question.answer;
    const shouldShowFeedback = showFeedback[questionIndex];

    return (
      <div className="slide">
        <h2>{question.prompt}</h2>
        <p className="question-stem">{question.stem}</p>
        <div className="choices">
          {question.choices.map((choice, choiceIndex) => {
            const isSelected = userAnswer === choiceIndex;
            const isAnswer = choiceIndex === question.answer;
            const showAsCorrect = shouldShowFeedback && isAnswer;
            const showAsIncorrect = shouldShowFeedback && isSelected && !isCorrect;

            return (
              <label
                key={choiceIndex}
                className={`choice ${showAsCorrect ? 'correct marked' : ''} ${showAsIncorrect ? 'incorrect marked' : ''}`}
              >
                <input
                  type="radio"
                  name={`question_${questionIndex}`}
                  checked={isSelected}
                  onChange={() => handleAnswer(questionIndex, choiceIndex)}
                />
                {String.fromCharCode(97 + choiceIndex)}) {choice}
              </label>
            );
          })}
        </div>
        {shouldShowFeedback && (
          <div className="feedback show">
            {isCorrect ? '✅ Correct!' : `❌ Incorrect. The correct answer is ${String.fromCharCode(97 + question.answer)}) ${question.choices[question.answer]}`}
          </div>
        )}
        <div className="slide-actions">
          <button onClick={() => checkOne(questionIndex)} className="check-btn">
            Check
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`past-tense-practice ${highContrast ? 'hc' : ''}`}>
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>📝 Past Tense Practice</h1>
          <div className="pager">Slide {currentSlide + 1} of {totalSlides}</div>
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
            <button onClick={handlePrint} className="icon-btn">
              🖨️ Print
            </button>
            <label className="contrast-toggle">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
              />
              High contrast
            </label>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="slide-container">
          {currentSlide === 0 && renderIntroSlide()}
          {currentSlide === 1 && renderRulesSlide()}
          {currentSlide >= 2 && renderQuestionSlide(currentSlide - 2)}

          <div className="navigation">
            <button
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className="nav-btn"
            >
              ← Previous
            </button>
            <button
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === totalSlides - 1}
              className="nav-btn primary"
            >
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

export default PastTensePractice;
