import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ShortStoriesPredictions.css';

const ShortStoriesPredictions = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [predictions, setPredictions] = useState({});
  const [answers, setAnswers] = useState({});
  const [showChoices, setShowChoices] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const stories = [
    {
      title: "Story 1",
      text: "Maya stared at the dark clouds rolling over the soccer field as warm-up time ran out. She had left her rain jacket in the car because the morning was sunny, and now a stiff wind pushed the team flags flat against their poles. The referee glanced at the sky and called captains to midfield.",
      question: "What is most likely to happen next?",
      choices: [
        "The referee delays or stops the game due to incoming rain.",
        "The coach cancels the rest of the season immediately.",
        "The sun returns and the temperature jumps to 95°F.",
        "Maya leaves the field to take a nap on the bench."
      ],
      answer: 0
    },
    {
      title: "Story 2",
      text: "After two weeks of tinkering, Luis finally tightened the last bolt on his skateboard. He placed the old, cracked wheel next to a brand-new set he had just installed. With a helmet buckled and elbow pads on, he rolled the board a few inches and listened carefully.",
      question: "What will Luis most likely do next?",
      choices: [
        "Hide the skateboard under his bed and forget about it.",
        "Test the board in the driveway to see if it rides smoothly.",
        "Sell the board without trying it once.",
        "Remove the new wheels to put the old ones back on."
      ],
      answer: 1
    },
    {
      title: "Story 3",
      text: "Sarah's phone buzzed for the third time during dinner. She glanced at the screen and saw it was her best friend Emma calling again. Sarah's mom gave her a stern look and pointed to the 'no phones at dinner' sign on the wall. Sarah silenced her phone and set it face-down on the counter, but she kept glancing over at it nervously.",
      question: "What will Sarah probably do after dinner?",
      choices: [
        "Call Emma back to find out what was urgent.",
        "Turn off her phone for the rest of the night.",
        "Ignore Emma's calls permanently.",
        "Tell her mom Emma is being annoying."
      ],
      answer: 0
    },
    {
      title: "Story 4",
      text: "The library was about to close in five minutes, and James still had three chapters left in his book. The librarian was turning off lights in different sections and gently reminding people about the closing time. James loved the book and was at the most exciting part where the mystery was about to be solved.",
      question: "What will James most likely do?",
      choices: [
        "Check out the book to finish reading it at home.",
        "Rip out the last chapters to take with him.",
        "Start reading a completely different book.",
        "Ask the librarian to stay open another two hours."
      ],
      answer: 0
    },
    {
      title: "Story 5",
      text: "Tyler had been saving his allowance for six months to buy a new video game that cost $60. This morning, his little sister accidentally broke his favorite mug - the one his grandmother gave him. His sister looked terrified and started crying, saying she'd use her birthday money to replace it. Tyler took a deep breath and looked at his savings jar on the shelf.",
      question: "What will Tyler probably do?",
      choices: [
        "Tell his sister it's okay and that accidents happen.",
        "Take all of his sister's birthday money immediately.",
        "Never speak to his sister again.",
        "Break something of his sister's to get even."
      ],
      answer: 0
    },
    {
      title: "Story 6",
      text: "The science fair was tomorrow, and Mia's volcano project was finally finished. She had spent weeks perfecting the baking soda and vinegar mixture for the eruption. As she carried it to the car, her dad suggested wrapping it in bubble wrap and putting it in a box. Mia thought that was too much trouble since they only lived ten minutes from school.",
      question: "What is most likely to happen?",
      choices: [
        "The project might get damaged during the car ride.",
        "The volcano will win first place automatically.",
        "Mia's dad will build a new project overnight.",
        "The science fair will be cancelled tomorrow."
      ],
      answer: 0
    },
    {
      title: "Story 7",
      text: "Coach Rivera blew the whistle and announced the teams for Friday's championship game. Alex heard every name called except his own. He'd been practicing every day after school and thought he'd improved enough to make the starting lineup. Alex grabbed his gym bag and started walking toward the parking lot while his teammates headed to the locker room.",
      question: "How is Alex feeling?",
      choices: [
        "Disappointed and hurt about not making the team.",
        "Excited because he wanted a day off anyway.",
        "Angry at his teammates for making the team.",
        "Happy that coach noticed his hard work."
      ],
      answer: 0
    },
    {
      title: "Story 8",
      text: "The smell of fresh cookies filled the kitchen. Emma's batch had exactly twelve minutes left in the oven, but her favorite show was starting in the living room. She had already burned cookies twice this month by forgetting about them. Emma looked at the timer on her phone, then at the TV in the other room.",
      question: "What should Emma do?",
      choices: [
        "Set a loud timer and stay in the kitchen to be safe.",
        "Go watch TV and hope she remembers the cookies.",
        "Take the cookies out early so they don't burn.",
        "Turn off the oven and throw the cookies away."
      ],
      answer: 0
    }
  ];

  const totalSlides = stories.length + 2;

  const handlePredictionChange = (index, value) => {
    setPredictions(prev => ({ ...prev, [index]: value }));
  };

  const handleAnswerSelect = (storyIndex, choiceIndex) => {
    setAnswers(prev => ({ ...prev, [storyIndex]: choiceIndex }));
  };

  const toggleChoices = (index) => {
    setShowChoices(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const checkAnswer = (index) => {
    setShowFeedback(prev => ({ ...prev, [index]: true }));
  };

  const checkAll = () => {
    const allFeedback = {};
    stories.forEach((_, index) => {
      allFeedback[index] = true;
    });
    setShowFeedback(allFeedback);

    const correct = stories.filter((s, i) => answers[i] === s.answer).length;
    alert(`Score: ${correct} / ${stories.length} correct`);
  };

  const resetActivity = () => {
    setPredictions({});
    setAnswers({});
    setShowChoices({});
    setShowFeedback({});
    setCurrentSlide(0);
  };

  const renderIntroSlide = () => (
    <div className="slide">
      <h2>Predicting from a Short Story</h2>
      <p className="lead">Read each short paragraph. Make a prediction about what will likely happen next or what a character will probably do. By default, choices are hidden so you can think independently first. You can reveal the 4 choices for any story and check your answer.</p>
      <ul className="meta">
        <li>Use the text box to type your prediction.</li>
        <li>Click "Show choices for this story" if you want multiple-choice support.</li>
        <li>Click "Check" to get feedback when choices are visible.</li>
      </ul>
    </div>
  );

  const renderTipsSlide = () => (
    <div className="slide">
      <h2>Prediction Tips</h2>
      <div className="story-box">
        Look for clues: goals, problems, and cause-and-effect. Ask: "Given what I know, what is the most reasonable next step?"
      </div>
      <p className="meta">You can keep predictions short. One sentence is fine.</p>
    </div>
  );

  const renderStorySlide = (storyIndex) => {
    const story = stories[storyIndex];
    const userAnswer = answers[storyIndex];
    const shouldShowFeedback = showFeedback[storyIndex];
    const isCorrect = userAnswer === story.answer;

    return (
      <div className="slide">
        <h2>{story.title}</h2>
        <div className="story-box">{story.text}</div>
        <p className="question-text">{story.question}</p>

        <div className="prediction-section">
          <label>Your Prediction:</label>
          <textarea
            className="prediction-input"
            value={predictions[storyIndex] || ''}
            onChange={(e) => handlePredictionChange(storyIndex, e.target.value)}
            placeholder="Type your prediction here..."
          />
        </div>

        <div className="choices-toggle">
          <button onClick={() => toggleChoices(storyIndex)} className="toggle-btn">
            {showChoices[storyIndex] ? 'Hide' : 'Show'} choices for this story
          </button>
        </div>

        {showChoices[storyIndex] && (
          <>
            <div className="choices">
              {story.choices.map((choice, choiceIndex) => {
                const isSelected = userAnswer === choiceIndex;
                const isAnswer = choiceIndex === story.answer;
                const showAsCorrect = shouldShowFeedback && isAnswer;
                const showAsIncorrect = shouldShowFeedback && isSelected && !isCorrect;

                return (
                  <label
                    key={choiceIndex}
                    className={`choice ${showAsCorrect ? 'correct marked' : ''} ${showAsIncorrect ? 'incorrect marked' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`story_${storyIndex}`}
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(storyIndex, choiceIndex)}
                    />
                    {String.fromCharCode(97 + choiceIndex)}) {choice}
                  </label>
                );
              })}
            </div>
            <button onClick={() => checkAnswer(storyIndex)} className="check-btn">
              Check
            </button>
          </>
        )}

        {shouldShowFeedback && showChoices[storyIndex] && (
          <div className="feedback show">
            {isCorrect ? '✅ Correct!' : `❌ The most likely answer is ${String.fromCharCode(97 + story.answer)}) ${story.choices[story.answer]}`}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="short-stories-predictions">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>📖 Short Stories & Predictions</h1>
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
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="slide-container">
          {currentSlide === 0 && renderIntroSlide()}
          {currentSlide === 1 && renderTipsSlide()}
          {currentSlide >= 2 && renderStorySlide(currentSlide - 2)}

          <div className="navigation">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="nav-btn"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(totalSlides - 1, currentSlide + 1))}
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

export default ShortStoriesPredictions;
