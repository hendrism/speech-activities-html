import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './QuestionResponsePractice.css';

const QuestionResponsePractice = () => {
  const categories = {
    school: {
      name: "School",
      icon: "🏫",
      "yes-no": [
        { q: "Do you like your teacher this year?", starters: ["Yes, I", "No, I"], examples: ["Yes, I really like my teacher because she's kind.", "No, I wish my teacher explained things more clearly."] },
        { q: "Is math your favorite subject?", starters: ["Yes, math", "No, math"], examples: ["Yes, math is my favorite subject because I love solving problems.", "No, math is not my favorite subject."] },
        { q: "Do you eat lunch at school?", starters: ["Yes, I", "No, I"], examples: ["Yes, I eat lunch in the cafeteria with my friends.", "No, I bring my lunch from home every day."] },
        { q: "Are you in any after-school activities?", starters: ["Yes, I", "No, I"], examples: ["Yes, I participate in the art club after school.", "No, I go home right after school ends."] },
        { q: "Do you like doing homework?", starters: ["Yes, I", "No, I"], examples: ["Yes, I enjoy homework because it helps me learn.", "No, I find homework boring and hard."] },
        { q: "Is your school big?", starters: ["Yes, my school", "No, my school"], examples: ["Yes, my school has over 500 students.", "No, my school is pretty small with just a few classes."] }
      ],
      wh: [
        { q: "What is your favorite subject in school?", starters: ["My favorite subject", "I really enjoy"], examples: ["My favorite subject is art because I love being creative.", "I really enjoy science class because we do cool experiments."] },
        { q: "Who sits next to you in class?", starters: ["The person who", "My classmate"], examples: ["The person who sits next to me is Jake.", "My classmate Maria sits right beside my desk."] },
        { q: "What do you do during recess?", starters: ["During recess, I", "At recess, I"], examples: ["During recess, I play on the swings with my friends.", "At recess, I like to read books under the big tree."] },
        { q: "When do you usually do your homework?", starters: ["I usually do", "I complete my"], examples: ["I usually do my homework right after dinner.", "I complete my homework as soon as I get home."] },
        { q: "What supplies do you need for school?", starters: ["I need", "For school, I"], examples: ["I need pencils, notebooks, and folders for my classes.", "For school, I use a backpack to carry all my supplies."] },
        { q: "Where do you sit during lunch?", starters: ["I sit", "During lunch, I"], examples: ["I sit at the round table near the windows.", "During lunch, I sit with my friends at our usual spot."] }
      ]
    },
    home: {
      name: "Home & Family",
      icon: "🏡",
      "yes-no": [
        { q: "Do you have your own bedroom?", starters: ["Yes, I", "No, I"], examples: ["Yes, I have my own pink bedroom.", "No, I share a room with my little sister."] },
        { q: "Does your family eat dinner together?", starters: ["Yes, we", "No, we"], examples: ["Yes, we always eat dinner together at 6 PM.", "No, we usually eat at different times."] },
        { q: "Do you help with chores at home?", starters: ["Yes, I", "No, I"], examples: ["Yes, I help by setting the table and feeding our cat.", "No, I don't have regular chores yet."] },
        { q: "Do you like spending time with your siblings?", starters: ["Yes, I", "No, I"], examples: ["Yes, I love playing games with my brother.", "No, I sometimes prefer to have alone time."] }
      ],
      wh: [
        { q: "What chores do you do at home?", starters: ["At home, I", "My chores include"], examples: ["At home, I help by washing dishes and vacuuming.", "My chores include making my bed and taking out trash."] },
        { q: "Who cooks dinner in your family?", starters: ["In my family,", "Usually,"], examples: ["In my family, my mom cooks dinner most nights.", "Usually, my dad makes dinner on weekends."] },
        { q: "What is your favorite room in your house?", starters: ["My favorite room", "I really love"], examples: ["My favorite room is my bedroom because it's cozy.", "I really love our living room where we watch movies."] },
        { q: "When does your family watch TV together?", starters: ["We watch", "My family watches"], examples: ["We watch TV together after dinner every day.", "My family watches movies on Friday nights."] }
      ]
    },
    hobbies: {
      name: "Hobbies",
      icon: "🎨",
      "yes-no": [
        { q: "Do you like to draw or paint?", starters: ["Yes, I", "No, I"], examples: ["Yes, I love drawing animals and flowers.", "No, I prefer doing crafts with beads instead."] },
        { q: "Can you play any musical instruments?", starters: ["Yes, I", "No, I"], examples: ["Yes, I can play piano and I'm learning guitar.", "No, I don't play instruments but I love listening to music."] },
        { q: "Do you collect anything special?", starters: ["Yes, I", "No, I"], examples: ["Yes, I collect stickers and put them in a special book.", "No, I don't collect anything right now."] },
        { q: "Are you good at sports?", starters: ["Yes, I", "No, I"], examples: ["Yes, I'm really good at soccer and swimming.", "No, I'm not very athletic but I try my best."] }
      ],
      wh: [
        { q: "What do you like to do in your free time?", starters: ["In my free time,", "I like to"], examples: ["In my free time, I enjoy reading and playing video games.", "I like to spend time drawing and listening to music."] },
        { q: "What sport do you most enjoy playing?", starters: ["I most enjoy", "My favorite sport"], examples: ["I most enjoy playing basketball with my friends.", "My favorite sport is swimming because I love being in water."] },
        { q: "What kind of music do you like best?", starters: ["I like", "My favorite music"], examples: ["I like pop music and songs that I can sing along to.", "My favorite music is country because the stories are nice."] },
        { q: "When do you have time for your hobbies?", starters: ["I have time", "I do my hobbies"], examples: ["I have time for hobbies after school and on weekends.", "I do my hobbies before bedtime when I'm relaxed."] }
      ]
    },
    food: {
      name: "Food",
      icon: "🍕",
      "yes-no": [
        { q: "Do you like spicy food?", starters: ["Yes, I", "No, I"], examples: ["Yes, I love eating spicy tacos and hot sauce.", "No, I prefer mild foods because spice hurts my mouth."] },
        { q: "Are you a picky eater?", starters: ["Yes, I", "No, I"], examples: ["Yes, I only like a few different foods.", "No, I'm willing to try almost anything new."] },
        { q: "Do you know how to cook anything?", starters: ["Yes, I", "No, I"], examples: ["Yes, I can make scrambled eggs and grilled cheese.", "No, I don't know how to cook yet."] },
        { q: "Do you like vegetables?", starters: ["Yes, I", "No, I"], examples: ["Yes, I especially like carrots and broccoli.", "No, I think most vegetables taste yucky."] }
      ],
      wh: [
        { q: "What is your favorite food?", starters: ["My favorite food", "I really love"], examples: ["My favorite food is pizza because it has cheese and pepperoni.", "I really love spaghetti with meatballs and garlic bread."] },
        { q: "What do you usually eat for breakfast?", starters: ["For breakfast, I", "I usually eat"], examples: ["For breakfast, I usually have cereal and orange juice.", "I usually eat toast with peanut butter and a banana."] },
        { q: "What food do you absolutely hate?", starters: ["I absolutely hate", "The food I"], examples: ["I absolutely hate Brussels sprouts because they're bitter.", "The food I dislike most is liver because of the texture."] },
        { q: "What snack do you eat most often?", starters: ["I most often", "My go-to snack"], examples: ["I most often snack on apple slices with peanut butter.", "My go-to snack is popcorn while watching TV."] }
      ]
    },
    animals: {
      name: "Animals",
      icon: "🐱",
      "yes-no": [
        { q: "Are you afraid of any animals?", starters: ["Yes, I", "No, I"], examples: ["Yes, I am scared of spiders and snakes.", "No, I'm not afraid of any animals at all."] },
        { q: "Do you have a favorite wild animal?", starters: ["Yes, my", "No, I"], examples: ["Yes, my favorite wild animal is the dolphin.", "No, I don't have a specific favorite wild animal."] },
        { q: "Would you like to work with animals someday?", starters: ["Yes, I", "No, I"], examples: ["Yes, I would love to be a veterinarian or zookeeper.", "No, I prefer working with people instead of animals."] },
        { q: "Have you ever been to a zoo?", starters: ["Yes, I", "No, I"], examples: ["Yes, I went to the zoo last summer with my family.", "No, I have never visited a zoo before."] }
      ],
      wh: [
        { q: "What is your favorite animal?", starters: ["My favorite animal", "I really love"], examples: ["My favorite animal is a golden retriever dog.", "I really love pandas because they're cute and fluffy."] },
        { q: "What pet would you most like to have?", starters: ["I would most", "The pet I"], examples: ["I would most like to have a kitten to cuddle with.", "The pet I want most is a hamster in a big cage."] },
        { q: "What do you think is the scariest animal?", starters: ["I think the", "The scariest animal"], examples: ["I think the shark is the scariest because of its teeth.", "The scariest animal to me is a big spider."] },
        { q: "What animal do you think is most intelligent?", starters: ["I think", "The most intelligent"], examples: ["I think dolphins are the most intelligent sea animals.", "The most intelligent animal is probably a chimpanzee."] }
      ]
    }
  };

  const [selectedCategory, setSelectedCategory] = useState('school');
  const [questionType, setQuestionType] = useState('wh');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [response, setResponse] = useState('');
  const [showStarters, setShowStarters] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const generateQuestion = () => {
    const questions = categories[selectedCategory][questionType];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setResponse('');
    setShowStarters(false);
    setShowExamples(false);
    setQuestionsAnswered(prev => prev + 1);
  };

  const resetSession = () => {
    if (window.confirm('Start a new session? This will reset your progress.')) {
      setQuestionsAnswered(0);
      setResponse('');
      setCurrentQuestion(null);
      setShowStarters(false);
      setShowExamples(false);
    }
  };

  // Generate first question on mount
  React.useEffect(() => {
    generateQuestion();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Regenerate question when category or type changes
  React.useEffect(() => {
    if (currentQuestion) {
      generateQuestion();
    }
  }, [selectedCategory, questionType]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentQuestion) return null;

  return (
    <div className="question-response-practice">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>💬 Question & Response Practice</h1>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={resetSession}>
              🔄 Reset Session
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="settings-panel">
          <div className="settings-row">
            <div className="setting-group">
              <div className="setting-label">Category</div>
              <div className="category-buttons">
                {Object.keys(categories).map((key) => (
                  <button
                    key={key}
                    className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(key)}
                  >
                    {categories[key].icon} {categories[key].name}
                  </button>
                ))}
              </div>
            </div>
            <div className="setting-group">
              <div className="setting-label">Question Type</div>
              <div className="question-type-buttons">
                <button
                  className={`type-btn ${questionType === 'wh' ? 'active' : ''}`}
                  onClick={() => setQuestionType('wh')}
                >
                  Wh- Questions
                </button>
                <button
                  className={`type-btn ${questionType === 'yes-no' ? 'active' : ''}`}
                  onClick={() => setQuestionType('yes-no')}
                >
                  Yes/No Questions
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="practice-container">
          <div className="question-header">
            <div className="current-category">
              {categories[selectedCategory].icon} {categories[selectedCategory].name}
            </div>
            <div className="question-type-indicator">
              {questionType === 'yes-no' ? 'Yes/No Question' : 'Wh- Question'}
            </div>
          </div>

          <div className="question-display">
            <div className="question-icon">{questionType === 'yes-no' ? '?' : 'W'}</div>
            <p className="question-text">{currentQuestion.q}</p>
          </div>

          <div className="response-section">
            {showStarters && (
              <div className="sentence-starter show">
                <h4>Sentence Starters</h4>
                <div className="sentence-starters">
                  {currentQuestion.starters.map((starter, i) => (
                    <span key={i} className="starter-option">
                      {starter}...
                    </span>
                  ))}
                </div>
              </div>
            )}

            <textarea
              className={`response-input ${response.trim() ? 'has-content' : ''}`}
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your complete sentence response here..."
            />

            <div className="action-buttons">
              <button
                className="action-btn secondary"
                onClick={() => setShowStarters(!showStarters)}
              >
                💡 {showStarters ? 'Hide' : 'Show'} Sentence Starters
              </button>
              <button
                className="action-btn secondary"
                onClick={() => setShowExamples(!showExamples)}
              >
                📝 {showExamples ? 'Hide' : 'Show'} Example Responses
              </button>
              <button className="action-btn primary" onClick={generateQuestion}>
                ➡️ Next Question
              </button>
            </div>

            {showExamples && (
              <div className="feedback show">
                <h4>Example Complete Sentence Responses</h4>
                <div className="example-responses">
                  <ul className="example-list">
                    {currentQuestion.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="progress-info">
            <span>Questions Answered: {questionsAnswered}</span>
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

export default QuestionResponsePractice;
