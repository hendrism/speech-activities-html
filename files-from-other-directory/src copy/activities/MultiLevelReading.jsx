import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './MultiLevelReading.css';

const MultiLevelReading = () => {
  const stories = [
    {
      id: 'garden',
      title: 'The Garden',
      levels: {
        1: {
          text: 'Alex wanted to grow plants. Alex got seeds at the store. Alex planted the seeds in dirt. The plants grew big. Alex was happy.',
          questions: [
            { q: 'What did Alex want to grow?', a: 'Plants', choices: ['Plants', 'Trees', 'Flowers'] },
            { q: 'Where did Alex get the seeds?', a: 'At the store', choices: ['At the store', 'At home', 'At school'] },
            { q: 'What did Alex do with the seeds?', a: 'Planted them in dirt', choices: ['Planted them in dirt', 'Put them away', 'Gave them to a friend'] },
            { q: 'How did Alex feel at the end?', a: 'Happy', choices: ['Happy', 'Sad', 'Angry'] }
          ]
        },
        2: {
          text: 'Alex wanted to grow plants. Alex went with Dad to the store and bought a packet of seeds. At home, Alex dug a few small holes in the dirt and put the seeds inside. Each day, Alex gave the seeds water and watched the soil carefully. After some time, green sprouts popped up. Alex smiled when the plants started to grow taller.',
          questions: [
            { q: 'Who went to the store with Alex?', a: 'Dad', choices: ['Dad', 'Mom', 'A friend'] },
            { q: 'What did Alex do at home?', a: 'Dug holes and planted seeds', choices: ['Dug holes and planted seeds', 'Made lunch', 'Did homework'] },
            { q: 'What did Alex do every day?', a: 'Gave the seeds water', choices: ['Gave the seeds water', 'Played games', 'Watched TV'] },
            { q: 'What happened after some time?', a: 'Green sprouts popped up', choices: ['Green sprouts popped up', 'Nothing happened', 'The seeds died'] },
            { q: 'Why did Alex smile?', a: 'The plants started to grow', choices: ['The plants started to grow', 'Dad bought ice cream', 'School was over'] }
          ]
        },
        3: {
          text: 'Alex wanted to grow plants for a school project. The teacher said students could choose any science topic they wanted. Alex thought gardening would be fun and educational.\n\nAlex asked Mom and Dad to help buy supplies at the garden store. They bought tomato seeds, bean seeds, and a small shovel. Alex also picked out some plant food to help the vegetables grow better.\n\nAt home, Alex prepared a small garden area in the backyard. Alex watered the plants every morning before school. After several weeks, tiny green plants started to appear. Alex felt excited to see the first vegetables growing.\n\nBy the end of the school term, Alex had grown enough vegetables to share with the whole family. The teacher was impressed and gave Alex an excellent grade on the project.',
          questions: [
            { q: 'Why did Alex want to grow plants?', a: 'For a school project', choices: ['For a school project', 'To sell them', 'To give away'] },
            { q: 'What kinds of seeds did Alex buy?', a: 'Tomato seeds and bean seeds', choices: ['Tomato seeds and bean seeds', 'Flower seeds', 'Grass seeds'] },
            { q: 'What did Alex buy to help the vegetables?', a: 'Plant food', choices: ['Plant food', 'A hose', 'Gloves'] },
            { q: 'When did Alex water the plants?', a: 'Every morning before school', choices: ['Every morning before school', 'After dinner', 'On weekends'] },
            { q: 'How did the teacher feel about the project?', a: 'Impressed', choices: ['Impressed', 'Disappointed', 'Confused'] },
            { q: 'What grade did Alex get?', a: 'Excellent', choices: ['Excellent', 'Average', 'Poor'] }
          ]
        }
      }
    },
    {
      id: 'pet',
      title: 'The New Pet',
      levels: {
        1: {
          text: 'Maya wanted a pet. Maya went to the pet store. Maya saw a small dog. The dog was brown. Maya took the dog home.',
          questions: [
            { q: 'What did Maya want?', a: 'A pet', choices: ['A pet', 'A toy', 'A book'] },
            { q: 'Where did Maya go?', a: 'To the pet store', choices: ['To the pet store', 'To school', 'To the park'] },
            { q: 'What color was the dog?', a: 'Brown', choices: ['Brown', 'Black', 'White'] },
            { q: 'What did Maya do with the dog?', a: 'Took it home', choices: ['Took it home', 'Left it there', 'Gave it to a friend'] }
          ]
        },
        2: {
          text: 'Maya had wanted a pet for a long time. One Saturday, Mom and Maya visited the local pet store. Inside, Maya saw many different animals in cages. There were birds, rabbits, and dogs. Maya walked slowly past each cage and looked at all the animals carefully. Then Maya spotted a small brown puppy in the corner. The puppy wagged its tail and licked Maya\'s hand through the cage. Maya knew this was the right pet. Mom agreed, and they brought the puppy home that day.',
          questions: [
            { q: 'Who went to the pet store with Maya?', a: 'Mom', choices: ['Mom', 'Dad', 'A teacher'] },
            { q: 'What day did they visit the store?', a: 'Saturday', choices: ['Saturday', 'Monday', 'Friday'] },
            { q: 'What animals did Maya see?', a: 'Birds, rabbits, and dogs', choices: ['Birds, rabbits, and dogs', 'Only cats', 'Only fish'] },
            { q: 'Where was the puppy?', a: 'In the corner', choices: ['In the corner', 'By the door', 'In the window'] },
            { q: 'How did Maya know it was the right pet?', a: 'The puppy wagged its tail and licked Maya\'s hand', choices: ['The puppy wagged its tail and licked Maya\'s hand', 'It was the cheapest', 'Mom told her'] }
          ]
        },
        3: {
          text: 'Maya had been asking for a pet for over a year. Every birthday and holiday, Maya would remind the family about wanting a furry companion. Finally, Mom and Dad agreed that Maya was responsible enough to take care of a pet.\n\nOn Saturday morning, the whole family drove to the animal shelter. A friendly volunteer showed them different dogs that needed homes. Maya saw big dogs, small dogs, and medium-sized dogs. Each one seemed special in its own way.\n\nThen Maya noticed a quiet brown puppy sitting alone in the last kennel. The volunteer explained that the puppy had been at the shelter for three months because people usually wanted the more playful dogs. Maya knelt down and the puppy slowly walked over. It gently licked Maya\'s hand and looked up with big, trusting eyes.\n\n"This is the one," Maya said softly. The family filled out the adoption papers, and Maya promised to feed, walk, and train the new puppy every day. On the car ride home, Maya decided to name the puppy Lucky because they were both lucky to have found each other.',
          questions: [
            { q: 'How long had Maya been asking for a pet?', a: 'Over a year', choices: ['Over a year', 'One month', 'One week'] },
            { q: 'Where did the family go to find a pet?', a: 'The animal shelter', choices: ['The animal shelter', 'A pet store', 'A friend\'s house'] },
            { q: 'Why had the puppy been at the shelter for three months?', a: 'People usually wanted more playful dogs', choices: ['People usually wanted more playful dogs', 'It was too big', 'It was sick'] },
            { q: 'What did Maya promise to do?', a: 'Feed, walk, and train the puppy every day', choices: ['Feed, walk, and train the puppy every day', 'Give it toys', 'Take it to the park'] },
            { q: 'What did Maya name the puppy?', a: 'Lucky', choices: ['Lucky', 'Brownie', 'Spot'] },
            { q: 'Why did Maya choose that name?', a: 'They were both lucky to have found each other', choices: ['They were both lucky to have found each other', 'It was a common name', 'Mom suggested it'] }
          ]
        }
      }
    },
    {
      id: 'bike',
      title: 'Learning to Ride',
      levels: {
        1: {
          text: 'Sam wanted to ride a bike. Dad helped Sam. Sam sat on the bike. Dad held the bike. Sam rode the bike. Sam was proud.',
          questions: [
            { q: 'What did Sam want to do?', a: 'Ride a bike', choices: ['Ride a bike', 'Play games', 'Read a book'] },
            { q: 'Who helped Sam?', a: 'Dad', choices: ['Dad', 'Mom', 'A friend'] },
            { q: 'What did Dad do?', a: 'Held the bike', choices: ['Held the bike', 'Watched TV', 'Went inside'] },
            { q: 'How did Sam feel?', a: 'Proud', choices: ['Proud', 'Sad', 'Scared'] }
          ]
        },
        2: {
          text: 'Sam had never learned to ride a bike before. All of Sam\'s friends could ride bikes, but Sam always felt nervous about trying. One sunny afternoon, Dad brought out an old bike from the garage. Dad said it was time to learn. Sam felt butterflies in the stomach but agreed to try. Dad held the back of the bike steady while Sam climbed on. They practiced in the driveway for a long time. Sam wobbled and almost fell a few times, but Dad was always there to catch the bike. After many tries, Sam finally rode a few feet without Dad\'s help. Sam couldn\'t stop smiling.',
          questions: [
            { q: 'Why did Sam feel nervous?', a: 'Sam had never learned to ride a bike before', choices: ['Sam had never learned to ride a bike before', 'The bike was broken', 'It was raining'] },
            { q: 'When did they practice?', a: 'One sunny afternoon', choices: ['One sunny afternoon', 'At night', 'In the morning'] },
            { q: 'Where did they practice?', a: 'In the driveway', choices: ['In the driveway', 'At the park', 'On the street'] },
            { q: 'What happened when Sam wobbled?', a: 'Dad was there to catch the bike', choices: ['Dad was there to catch the bike', 'Sam fell down', 'They stopped trying'] },
            { q: 'How did Sam feel at the end?', a: 'Sam couldn\'t stop smiling', choices: ['Sam couldn\'t stop smiling', 'Angry', 'Tired'] }
          ]
        },
        3: {
          text: 'Sam had always watched other kids riding bikes around the neighborhood with envy. While friends zoomed past on two wheels, Sam stuck to walking or riding a scooter. The problem wasn\'t the bike itself—it was the fear of falling and getting hurt.\n\nOne Saturday, Dad noticed Sam watching the neighbor kids race down the street on their bikes. "You know, I think you\'re ready to learn," Dad said gently. Sam\'s heart started beating faster, but something about Dad\'s encouraging smile made it seem possible.\n\nThey started with training wheels, which helped Sam get comfortable with pedaling and steering. After a week, Dad suggested removing the training wheels. Sam felt scared but trusted Dad\'s judgment. They spent the whole afternoon in the driveway. Dad held the seat and ran alongside Sam, keeping the bike balanced. Sam fell twice, but Dad helped Sam get right back on.\n\nThen something magical happened. Sam was pedaling and suddenly realized Dad had let go. Sam was riding alone! It was only for about ten feet before getting wobbly, but it felt like flying. By the end of the weekend, Sam could ride all the way down the driveway without any help. That feeling of independence and accomplishment was worth every scared moment.',
          questions: [
            { q: 'Why didn\'t Sam ride a bike before?', a: 'Fear of falling and getting hurt', choices: ['Fear of falling and getting hurt', 'No bike available', 'Too busy with school'] },
            { q: 'What did they start with?', a: 'Training wheels', choices: ['Training wheels', 'A smaller bike', 'Just walking'] },
            { q: 'How long did they use training wheels?', a: 'A week', choices: ['A week', 'One day', 'A month'] },
            { q: 'How many times did Sam fall?', a: 'Twice', choices: ['Twice', 'Never', 'Ten times'] },
            { q: 'When did Sam realize Dad had let go?', a: 'While pedaling', choices: ['While pedaling', 'Before starting', 'After falling'] },
            { q: 'How far did Sam ride alone the first time?', a: 'About ten feet', choices: ['About ten feet', 'One mile', 'Around the block'] }
          ]
        }
      }
    }
  ];

  const [selectedLevel, setSelectedLevel] = useState(1);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const currentStory = stories[currentStoryIndex];
  const currentLevelData = currentStory.levels[selectedLevel];

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const checkAnswer = (questionIndex) => {
    const question = currentLevelData.questions[questionIndex];
    const isCorrect = answers[questionIndex] === question.a;
    setShowFeedback(prev => ({ ...prev, [questionIndex]: isCorrect }));
  };

  const resetActivity = () => {
    setAnswers({});
    setShowFeedback({});
  };

  const getLevelName = (level) => {
    switch(level) {
      case 1: return 'Level 1: Very Simple';
      case 2: return 'Level 2: Simple';
      case 3: return 'Level 3: Intermediate';
      default: return `Level ${level}`;
    }
  };

  return (
    <div className="multi-level-reading">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>📚 Multi-Level Reading Comprehension</h1>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={resetActivity}>
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="level-selector-section">
          <h2>Select Reading Level</h2>
          <div className="level-buttons">
            {[1, 2, 3].map(level => (
              <button
                key={level}
                className={`level-btn ${selectedLevel === level ? 'active' : ''} level-${level}`}
                onClick={() => {
                  setSelectedLevel(level);
                  resetActivity();
                }}
              >
                {getLevelName(level)}
              </button>
            ))}
          </div>
        </div>

        <div className="story-selector-section">
          <h2>Select Story</h2>
          <div className="story-buttons">
            {stories.map((story, idx) => (
              <button
                key={story.id}
                className={`story-btn ${currentStoryIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  setCurrentStoryIndex(idx);
                  resetActivity();
                }}
              >
                {story.title}
              </button>
            ))}
          </div>
        </div>

        <div className="activity-container">
          <h2 className="story-title">{currentStory.title}</h2>
          <div className="level-badge">
            {getLevelName(selectedLevel)}
          </div>

          <div className="story-text">
            {currentLevelData.text.split('\n\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="questions-section">
            <h3>Questions</h3>
            {currentLevelData.questions.map((question, qIdx) => (
              <div key={qIdx} className="question-card">
                <p className="question-text">{qIdx + 1}. {question.q}</p>

                <div className="choices">
                  {question.choices.map((choice, cIdx) => (
                    <button
                      key={cIdx}
                      className={`choice-btn ${answers[qIdx] === choice ? 'selected' : ''} ${
                        showFeedback[qIdx] !== undefined
                          ? choice === question.a
                            ? 'correct'
                            : answers[qIdx] === choice
                            ? 'incorrect'
                            : ''
                          : ''
                      }`}
                      onClick={() => handleAnswer(qIdx, choice)}
                      disabled={showFeedback[qIdx] !== undefined}
                    >
                      {choice}
                    </button>
                  ))}
                </div>

                <button
                  className="check-btn"
                  onClick={() => checkAnswer(qIdx)}
                  disabled={!answers[qIdx] || showFeedback[qIdx] !== undefined}
                >
                  Check Answer
                </button>

                {showFeedback[qIdx] !== undefined && (
                  <div className={`feedback ${showFeedback[qIdx] ? 'correct' : 'incorrect'}`}>
                    {showFeedback[qIdx] ? '✅ Correct!' : `❌ The correct answer is: ${question.a}`}
                  </div>
                )}
              </div>
            ))}
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

export default MultiLevelReading;
