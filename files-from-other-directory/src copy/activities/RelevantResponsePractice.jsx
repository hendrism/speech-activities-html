import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './RelevantResponsePractice.css';

const RelevantResponsePractice = () => {
  const questions = [
    { q: "How are you today?", ex: ["I feel good today.", "I am a little tired."] },
    { q: "What did you eat for lunch?", ex: ["I ate pizza.", "I had a turkey sandwich and milk."] },
    { q: "Who do you sit with at lunch?", ex: ["I sit with Alex.", "I sit with my friends at the back table."] },
    { q: "What did you do after school yesterday?", ex: ["I did my homework.", "I played outside with my neighbor."] },
    { q: "What do you like to do on weekends?", ex: ["I play video games.", "I visit my grandparents."] },
    { q: "Do you have any pets?", ex: ["Yes, I have a dog.", "No, I do not have a pet."] },
    { q: "What is your favorite class?", ex: ["Art is my favorite class.", "I like science the most."] },
    { q: "What is your favorite snack?", ex: ["I like chips.", "I usually eat an apple."] },
    { q: "Who is someone you like to talk to at school?", ex: ["I talk to my friend Mia.", "I like talking to my counselor."] },
    { q: "What do you like to watch on TV or YouTube?", ex: ["I watch Minecraft videos.", "I like cooking shows."] },
    { q: "Where do you like to sit on the bus?", ex: ["I sit near the front.", "I sit in the middle with my friend."] },
    { q: "What game do you like to play?", ex: ["I like chess.", "I like playing basketball."] },
    { q: "What do you do when you feel bored?", ex: ["I draw in my notebook.", "I listen to music."] },
    { q: "What makes you feel calm?", ex: ["Deep breathing helps me.", "Listening to quiet music helps."] },
    { q: "What is something that makes you laugh?", ex: ["Funny cat videos.", "My brother tells jokes."] },
    { q: "What is your favorite thing to do outside?", ex: ["I ride my bike.", "I like to walk at the park."] },
    { q: "What do you like to read?", ex: ["I read graphic novels.", "I like sports stories."] },
    { q: "What is your favorite school lunch?", ex: ["I like chicken nuggets.", "Taco day is my favorite."] },
    { q: "Who do you like to work with in class?", ex: ["I work well with Jay.", "I like to work with my table group."] },
    { q: "What helps you start your work?", ex: ["I look at the directions.", "I ask for help if I need it."] },
    { q: "What is something you want to learn this year?", ex: ["I want to learn coding.", "I want to get better at writing."] },
    { q: "Where do you like to go after school?", ex: ["I go home.", "Sometimes I go to the library."] },
    { q: "What do you like to draw?", ex: ["I draw cars.", "I like drawing animals."] },
    { q: "How do you help at home?", ex: ["I feed the dog.", "I take out the trash."] }
  ];

  const [order, setOrder] = useState([...Array(questions.length).keys()]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState('');
  const [counts, setCounts] = useState({ onTopic: 0, needsMore: 0, offTopic: 0, practiced: 0 });
  const [bigText, setBigText] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const currentQuestion = questions[order[currentIndex]];

  const shuffle = () => {
    const newOrder = [...order];
    for (let i = newOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
    }
    setOrder(newOrder);
    setCurrentIndex(0);
    setResponse('');
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % questions.length);
    setResponse('');
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + questions.length) % questions.length);
    setResponse('');
  };

  const goToRandom = () => {
    setCurrentIndex(Math.floor(Math.random() * questions.length));
    setResponse('');
  };

  const markResponse = (type) => {
    setCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1,
      practiced: prev.practiced + 1
    }));
  };

  const resetSession = () => {
    if (window.confirm('Start a new session? This will reset all counters.')) {
      setCounts({ onTopic: 0, needsMore: 0, offTopic: 0, practiced: 0 });
      setOrder([...Array(questions.length).keys()]);
      setCurrentIndex(0);
      setResponse('');
    }
  };

  const readAloud = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion.q);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relevant-response-practice">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>💬 Relevant Response Practice</h1>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={readAloud} title="Read question aloud">
              🔊 Read
            </button>
            <button onClick={shuffle} className="primary">
              🔀 Shuffle
            </button>
            <button onClick={resetSession}>
              🔄 New Session
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <aside className="sidebar panel">
          <h2>Jump to question</h2>
          <div className="nav-row">
            <select
              value={currentIndex}
              onChange={(e) => {
                setCurrentIndex(Number(e.target.value));
                setResponse('');
              }}
              aria-label="Select question"
            >
              {order.map((qIndex, i) => (
                <option key={i} value={i}>
                  {i + 1}. {questions[qIndex].q}
                </option>
              ))}
            </select>
            <button onClick={goToPrevious}>← Prev</button>
            <button onClick={goToNext} className="primary">Next →</button>
          </div>
          <div className="question-list">
            {order.map((qIndex, i) => (
              <button
                key={i}
                className={i === currentIndex ? 'active' : ''}
                onClick={() => {
                  setCurrentIndex(i);
                  setResponse('');
                }}
              >
                {i + 1}. {questions[qIndex].q}
              </button>
            ))}
          </div>
        </aside>

        <section className="panel main-panel">
          <div className="question-box">
            <div className="q-header">
              <div className="q-idx">Question {currentIndex + 1} of {questions.length}</div>
              <div className="q-actions">
                <button
                  onClick={() => setBigText(!bigText)}
                  title="Toggle big text"
                  className={bigText ? 'active' : ''}
                >
                  🔎 A+
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(currentQuestion.q)}
                  title="Copy question to clipboard"
                >
                  📋 Copy
                </button>
              </div>
            </div>

            <div className={`question ${bigText ? 'big-text' : ''}`}>
              {currentQuestion.q}
            </div>

            <div className="examples">
              <h3>Example relevant responses</h3>
              <ul>
                {currentQuestion.ex.map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>

            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type a relevant answer here..."
              aria-label="Type your response"
            />

            <div className="rubric">
              <button className="chip ok" onClick={() => markResponse('onTopic')}>
                ✅ On topic
              </button>
              <button className="chip warn" onClick={() => markResponse('needsMore')}>
                🟨 Needs more
              </button>
              <button className="chip err" onClick={() => markResponse('offTopic')}>
                ❌ Off topic
              </button>
            </div>

            <div className="nav-row">
              <button onClick={goToPrevious}>← Previous</button>
              <button onClick={goToRandom}>🎲 Random</button>
              <button onClick={goToNext} className="primary">Next →</button>
            </div>

            <div className="stats">
              <span>On topic: {counts.onTopic}</span>
              <span>Needs more: {counts.needsMore}</span>
              <span>Off topic: {counts.offTopic}</span>
              <span>Questions practiced: {counts.practiced}</span>
            </div>
          </div>
        </section>
      </main>

      <IconManager
        isOpen={iconPanelOpen}
        onClose={() => setIconPanelOpen(false)}
        iconManager={iconManager}
      />
    </div>
  );
};

export default RelevantResponsePractice;
