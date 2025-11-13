import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './SocialCuesFeelings.css';

const SocialCuesFeelings = () => {
  const iconManager = useIconManager();
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const scenarios = [
    {
      id: 1,
      situation: 'Maya walks into class with her head down, shoulders slumped. She sits quietly at her desk and doesn\'t look at anyone.',
      question: 'How do you think Maya is feeling?',
      choices: ['Happy and excited', 'Sad or upset', 'Angry', 'Surprised'],
      answer: 1,
      explanation: 'Maya\'s body language shows she might be sad. Head down and not looking at others are clues.',
      cues: ['Head down', 'Shoulders slumped', 'Not making eye contact', 'Quiet'],
      whatToDo: 'You could ask "Are you okay?" or give her some space if she seems like she needs it.'
    },
    {
      id: 2,
      situation: 'During group work, Jamal keeps looking at the clock, tapping his pencil, and sighing loudly.',
      question: 'How is Jamal probably feeling?',
      choices: ['Bored or impatient', 'Excited', 'Confused', 'Scared'],
      answer: 0,
      explanation: 'Looking at the clock and tapping often means someone is bored or waiting for something.',
      cues: ['Looking at clock', 'Tapping pencil', 'Sighing', 'Restless movements'],
      whatToDo: 'Try to make the activity more interesting or ask if he wants to do a different part of the project.'
    },
    {
      id: 3,
      situation: 'Emma is presenting her project. Her voice is shaking, her hands are trembling, and she keeps looking down at her notes.',
      question: 'What is Emma most likely feeling?',
      choices: ['Confident', 'Nervous or anxious', 'Bored', 'Angry'],
      answer: 1,
      explanation: 'Shaking voice and trembling hands are signs of nervousness when speaking in front of others.',
      cues: ['Shaking voice', 'Trembling hands', 'Looking down frequently', 'Avoiding eye contact'],
      whatToDo: 'Give her encouraging smiles and nods. Be a supportive audience.'
    },
    {
      id: 4,
      situation: 'During lunch, Carlos is talking very fast and loud. He keeps interrupting others and seems to have a lot of energy.',
      question: 'How is Carlos feeling?',
      choices: ['Tired and sleepy', 'Excited or energetic', 'Sad', 'Confused'],
      answer: 1,
      explanation: 'Talking fast and loud with lots of energy shows excitement or enthusiasm.',
      cues: ['Talking fast', 'Speaking loudly', 'High energy', 'Interrupting (may not realize)'],
      whatToDo: 'It\'s okay to be excited! But you could gently remind him to let others talk too.'
    },
    {
      id: 5,
      situation: 'When the teacher asks Lila a question, she looks down, plays with her hair, and speaks very quietly. You can barely hear her answer.',
      question: 'What might Lila be feeling?',
      choices: ['Shy or unsure', 'Proud', 'Angry', 'Excited'],
      answer: 0,
      explanation: 'Looking down and speaking quietly can mean someone feels shy or uncertain.',
      cues: ['Looking down', 'Playing with hair', 'Quiet voice', 'Nervous fidgeting'],
      whatToDo: 'Be patient and encouraging. Don\'t pressure her to speak louder right away.'
    },
    {
      id: 6,
      situation: 'Alex just got back his test. He slams his backpack down, crosses his arms tightly, and frowns.',
      question: 'How is Alex feeling?',
      choices: ['Happy', 'Frustrated or angry', 'Sleepy', 'Confused'],
      answer: 1,
      explanation: 'Slamming things, crossing arms, and frowning are signs of anger or frustration.',
      cues: ['Slamming objects', 'Crossed arms', 'Frowning', 'Tense body language'],
      whatToDo: 'Give him some space first, then maybe ask if he wants to talk about it later.'
    },
    {
      id: 7,
      situation: 'During the fire drill, Sam holds his ears, closes his eyes tightly, and moves away from the group.',
      question: 'What is Sam experiencing?',
      choices: ['Joy', 'Being silly', 'Overwhelmed or anxious', 'Angry'],
      answer: 2,
      explanation: 'Covering ears and moving away means the noise and situation are overwhelming.',
      cues: ['Covering ears', 'Eyes closed', 'Moving away', 'Seeking quieter space'],
      whatToDo: 'Be understanding. Some people are sensitive to loud noises. Stay calm and supportive.'
    },
    {
      id: 8,
      situation: 'Mia just won the class spelling bee. She\'s smiling widely, jumping up and down, and high-fiving her friends.',
      question: 'How is Mia feeling?',
      choices: ['Sad', 'Nervous', 'Happy and proud', 'Scared'],
      answer: 2,
      explanation: 'Smiling, jumping, and high-fiving are clear signs of happiness and excitement.',
      cues: ['Big smile', 'Jumping', 'High-fiving', 'Energetic movements'],
      whatToDo: 'Celebrate with her! Congratulate her on doing well.'
    },
    {
      id: 9,
      situation: 'Tyler is working on math. He keeps erasing his work, putting his head in his hands, and saying "I don\'t get this."',
      question: 'What is Tyler feeling?',
      choices: ['Confident', 'Confused and frustrated', 'Bored', 'Excited'],
      answer: 1,
      explanation: 'Erasing repeatedly and saying he doesn\'t understand shows he\'s confused and frustrated.',
      cues: ['Repeated erasing', 'Head in hands', 'Verbal statements of confusion', 'Visible frustration'],
      whatToDo: 'Offer to help or suggest he ask the teacher for clarification.'
    },
    {
      id: 10,
      situation: 'During reading time, Aisha keeps yawning, rubbing her eyes, and resting her head on her desk.',
      question: 'How is Aisha feeling?',
      choices: ['Energetic', 'Tired or sleepy', 'Angry', 'Nervous'],
      answer: 1,
      explanation: 'Yawning, rubbing eyes, and resting head are clear signs of being tired.',
      cues: ['Yawning', 'Rubbing eyes', 'Resting head', 'Low energy'],
      whatToDo: 'She might need a break or some water. Maybe she didn\'t sleep well last night.'
    },
    {
      id: 11,
      situation: 'When the teacher announces a surprise field trip, Jordan\'s eyes get wide, his mouth opens, and he gasps.',
      question: 'What is Jordan feeling?',
      choices: ['Sad', 'Surprised and excited', 'Angry', 'Bored'],
      answer: 1,
      explanation: 'Wide eyes, open mouth, and gasping are signs of surprise and excitement.',
      cues: ['Wide eyes', 'Open mouth', 'Gasping', 'Sudden reaction'],
      whatToDo: 'Share in the excitement! Talk about what you\'re looking forward to.'
    },
    {
      id: 12,
      situation: 'During a game at recess, Sophie\'s face turns red, her jaw is clenched, and she says "That is not fair!" in a loud voice.',
      question: 'How is Sophie feeling?',
      choices: ['Happy', 'Calm', 'Angry or upset', 'Sleepy'],
      answer: 2,
      explanation: 'Red face, clenched jaw, and saying something is not fair shows anger or upset feelings.',
      cues: ['Red face', 'Clenched jaw', 'Raised voice', 'Words showing unfairness'],
      whatToDo: 'Listen to why she is upset. Help problem-solve or get an adult if needed.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showCues, setShowCues] = useState(false);
  const [showWhatToDo, setShowWhatToDo] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState([]);

  const currentScenario = scenarios[currentIndex];

  const handleAnswerSelect = (choiceIndex) => {
    setSelectedAnswer(choiceIndex);
    setShowFeedback(true);

    if (choiceIndex === currentScenario.answer && !completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios([...completedScenarios, currentScenario.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowCues(false);
      setShowWhatToDo(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowCues(false);
      setShowWhatToDo(false);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowCues(false);
    setShowWhatToDo(false);
    setCompletedScenarios([]);
  };

  return (
    <div className="social-cues-feelings">
      <div className="activity-header no-print">
        <div className="header-content">
          <h1>😊 Social Cues & Feelings</h1>
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
        <div className="progress-info no-print">
          <p>Scenario {currentIndex + 1} of {scenarios.length} | Completed: {completedScenarios.length}/{scenarios.length}</p>
        </div>

        <div className="scenario-card">
          <div className="scenario-header">
            <h2>Scenario {currentIndex + 1}</h2>
          </div>

          <div className="situation-box">
            <h3>📖 Read the Situation:</h3>
            <p className="situation-text">{currentScenario.situation}</p>
          </div>

          <div className="question-box">
            <h3>{currentScenario.question}</h3>
          </div>

          <div className="choices-section">
            {currentScenario.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={showFeedback}
                className={`choice-btn ${
                  selectedAnswer === idx
                    ? idx === currentScenario.answer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${showFeedback && idx === currentScenario.answer ? 'correct' : ''}`}
              >
                {choice}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`feedback ${selectedAnswer === currentScenario.answer ? 'correct' : 'incorrect'}`}>
              {selectedAnswer === currentScenario.answer ? (
                <>
                  <strong>✓ That's right!</strong>
                  <p>{currentScenario.explanation}</p>
                </>
              ) : (
                <>
                  <strong>Not quite.</strong>
                  <p>The answer is: <strong>{currentScenario.choices[currentScenario.answer]}</strong></p>
                  <p>{currentScenario.explanation}</p>
                </>
              )}
            </div>
          )}

          <div className="support-buttons no-print">
            <button
              onClick={() => setShowCues(!showCues)}
              className="support-btn"
            >
              {showCues ? '🔼 Hide' : '🔽 Show'} Social Cues
            </button>
            <button
              onClick={() => setShowWhatToDo(!showWhatToDo)}
              className="support-btn"
            >
              {showWhatToDo ? '🔼 Hide' : '🔽 Show'} What Should I Do?
            </button>
          </div>

          {showCues && (
            <div className="cues-box">
              <h3>🔍 Social Cues to Notice:</h3>
              <ul>
                {currentScenario.cues.map((cue, idx) => (
                  <li key={idx}>{cue}</li>
                ))}
              </ul>
            </div>
          )}

          {showWhatToDo && (
            <div className="action-box">
              <h3>💡 What Should You Do?</h3>
              <p>{currentScenario.whatToDo}</p>
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
              disabled={currentIndex === scenarios.length - 1}
              className="nav-btn primary"
            >
              Next Scenario →
            </button>
          </div>
        </div>

        <div className="tips-section">
          <h3>Tips for Reading Social Cues:</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <strong>👀 Watch Body Language</strong>
              <p>Look at posture, gestures, and movements</p>
            </div>
            <div className="tip-card">
              <strong>👁️ Notice Facial Expressions</strong>
              <p>Eyes, mouth, and eyebrows show emotions</p>
            </div>
            <div className="tip-card">
              <strong>🎤 Listen to Tone of Voice</strong>
              <p>How someone says something matters too</p>
            </div>
            <div className="tip-card">
              <strong>🔊 Pay Attention to Actions</strong>
              <p>What someone does can show how they feel</p>
            </div>
            <div className="tip-card">
              <strong>❓ Ask Questions</strong>
              <p>It's okay to ask "Are you okay?" if unsure</p>
            </div>
            <div className="tip-card">
              <strong>🤝 Be Kind and Patient</strong>
              <p>Everyone shows feelings differently</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialCuesFeelings;
