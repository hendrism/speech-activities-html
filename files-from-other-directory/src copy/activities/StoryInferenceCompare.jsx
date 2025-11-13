import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './StoryInferenceCompare.css';

const StoryInferenceCompare = () => {
  const stories = [
    {
      title: "The Championship Tryouts",
      text: `Marcus had been dreaming about making the varsity basketball team all summer. He practiced every single day, working on his free throws until his arms hurt. His best friend Tyler was also trying out, but Tyler was naturally taller and seemed to make every shot without even trying.

On tryout day, Marcus arrived two hours early to practice. His palms were sweaty, and his stomach felt like it was full of butterflies. When Coach Williams called his name, Marcus took a deep breath and walked onto the court. He missed his first shot, then his second. Tyler stepped up after him and swished three shots in a row like it was nothing. After tryouts, Marcus sat in the parking lot staring at his phone, not wanting to go home and face his dad. Tyler came over and asked, "Hey man, you okay?" Marcus just shrugged and said, "Yeah, whatever. I'm fine."`,

      inference: [
        {
          character: "Marcus",
          question: "How does Marcus feel after the tryouts?",
          context: "Think about a time when you worked really hard for something and it didn't go the way you hoped it would.",
          choices: [
            "Disappointed and embarrassed",
            "Angry at Tyler",
            "Excited and confident",
            "Proud of his effort"
          ],
          correct: 0,
          evidence: ["missed his first shot, then his second", "sat in the parking lot staring at his phone", "didn't want to go home and face his dad"]
        },
        {
          character: "Tyler",
          question: "What is Tyler probably thinking when he sees Marcus upset?",
          context: "Think about how you would feel if your best friend was struggling with something you found easy.",
          choices: [
            "He wants to help Marcus feel better",
            "He's happy he did better than Marcus",
            "He's worried Marcus will be mad at him",
            "He thinks Marcus should quit basketball"
          ],
          correct: 0,
          evidence: ["Tyler came over", "Hey man, you okay?"]
        }
      ]
    },
    {
      title: "The Gaming Tournament",
      text: `Jake had been preparing for the Fortnite tournament for weeks. His strategy was all about playing it safe - staying hidden, avoiding fights, and making it to the final circle. His teammate Alex had a completely different approach. Alex loved to drop into crowded areas, take on multiple opponents, and go for high-action games.

"Dude, we need to be aggressive if we want to win this thing," Alex said during their practice session. The tournament was starting in an hour, and they still couldn't agree on a strategy. Jake felt his chest getting tight - they had trained so hard for this, and now they might mess it up because they couldn't work together. Alex was pacing around the room, cracking his knuckles loudly. "Fine, whatever. We'll play your boring way," Alex muttered, throwing his controller on the couch.`,

      inference: [
        {
          character: "Jake",
          question: "How is Jake feeling about the upcoming tournament?",
          context: "Think about a time when you and a friend couldn't agree on something important right before you had to do it together.",
          choices: [
            "Anxious and worried about their teamwork",
            "Excited and confident about winning",
            "Angry at Alex for disagreeing",
            "Ready to play solo instead"
          ],
          correct: 0,
          evidence: ["felt his chest getting tight", "they might mess it up because they couldn't work together"]
        },
        {
          character: "Alex",
          question: "What does Alex's behavior show about how he's feeling?",
          context: "Think about how people act when they feel like their ideas aren't being heard or valued.",
          choices: [
            "Frustrated and giving up on having input",
            "Happy to compromise with Jake",
            "Scared about the tournament",
            "Confident they'll win either way"
          ],
          correct: 0,
          evidence: ["pacing around the room", "cracking his knuckles loudly", "Fine, whatever", "throwing his controller on the couch"]
        }
      ]
    },
    {
      title: "The Project Choice",
      text: `Mr. Rodriguez announced that students could choose between two final projects for science class. Option A was building a working robot that required coding and engineering. Option B was creating a documentary about climate change with research, interviews, and video editing.

Ethan's eyes lit up when he heard about the robot project. He had been teaching himself to code Python all year and loved taking apart electronics at home. But when he looked around the room, he noticed that all the "smart kids" - the ones who always got A's - were already talking about forming groups for the robot project. Meanwhile, his friend Carlos was excited about the documentary. "Think about it, man. We could interview real scientists and film some cool locations. Plus, it actually matters for the world," Carlos said. Ethan nodded, but kept glancing at the robot group. His palms started to sweat as he realized he had to make a decision by tomorrow.`,

      inference: [
        {
          character: "Ethan",
          question: "What is Ethan's internal conflict about?",
          context: "Think about a time when you wanted to do something but worried about whether you belonged or were good enough.",
          choices: [
            "He wants to do the robot project but feels intimidated by the other students",
            "He can't decide if robots or documentaries are cooler",
            "He's worried about working with Carlos",
            "He thinks the teacher will be unfair"
          ],
          correct: 0,
          evidence: ["Ethan's eyes lit up when he heard about the robot project", "all the 'smart kids' were already talking about forming groups", "kept glancing at the robot group", "palms started to sweat"]
        },
        {
          character: "Carlos",
          question: "How does Carlos feel about the documentary project?",
          context: "Think about how someone sounds when they're genuinely excited about an idea and trying to get their friend interested too.",
          choices: [
            "Enthusiastic and passionate about making a difference",
            "Only interested because it seems easier than coding",
            "Worried that Ethan won't choose it",
            "Unsure about which project to pick"
          ],
          correct: 0,
          evidence: ["Carlos was excited about the documentary", "Think about it, man", "it's something that actually matters for the world"]
        }
      ]
    },
    {
      title: "The School Choice Decision",
      text: `Danny's family was moving across town, and his parents said he could choose between the public high school or a private school they could afford with financial aid. Lincoln Public High was huge with an amazing football program where he could probably blend in with the crowd. St. Mary's Private was smaller, more focused on academics, and had a reputation for tight-knit friendships but no football team.

At Lincoln, Danny could continue playing football, which he'd been doing since middle school. The coach had already called him twice, talking about scholarships and state championships. But when Danny visited, the hallways felt like a maze, and most students seemed to already have their friend groups locked down. St. Mary's felt more welcoming when he toured it. Students actually made eye contact and said hello, and teachers seemed to know every kid's name. Danny sat in his room that night, staring at both acceptance letters. His dad wanted him to go to Lincoln for the sports opportunities, but something in his gut was pulling him toward St. Mary's.`,

      inference: [
        {
          character: "Danny",
          question: "What is Danny's main struggle in making this decision?",
          context: "Think about a time when what you wanted didn't match what others expected of you or what seemed like the 'obvious' choice.",
          choices: [
            "He's torn between following his passion for football and his need for connection",
            "He can't decide which school has better teachers",
            "He's angry at his parents for moving",
            "He wants to stay at his current school"
          ],
          correct: 0,
          evidence: ["could continue playing football", "dad wanted him to go to Lincoln", "St. Mary's felt more welcoming", "something in his gut was pulling him toward St. Mary's"]
        },
        {
          character: "Danny's Dad",
          question: "Why does Danny's dad want him to go to Lincoln?",
          context: "Think about what parents often value and worry about when it comes to their children's future opportunities.",
          choices: [
            "He sees the football scholarships as important opportunities for Danny's future",
            "He doesn't like private schools in general",
            "He wants Danny to have a harder time in school",
            "He went to Lincoln himself"
          ],
          correct: 0,
          evidence: ["coach had already called him twice", "talking about scholarships and state championships", "dad wanted him to go to Lincoln for the sports opportunities"]
        }
      ]
    }
  ];

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [currentActivity, setCurrentActivity] = useState('story'); // 'story' or 'inference'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHelp, setShowHelp] = useState({});
  const [showChoices, setShowChoices] = useState({});
  const [feedback, setFeedback] = useState({});
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const currentStory = stories[currentStoryIndex];
  const currentQuestion = currentActivity === 'inference' ? currentStory.inference[currentQuestionIndex] : null;

  const handleAnswerSelect = (questionIdx, choiceIdx) => {
    setAnswers(prev => ({ ...prev, [questionIdx]: choiceIdx }));
  };

  const checkAnswer = (questionIdx) => {
    const question = currentStory.inference[questionIdx];
    const userAnswer = answers[questionIdx];
    setFeedback(prev => ({ ...prev, [questionIdx]: userAnswer === question.correct }));
  };

  const resetActivity = () => {
    setAnswers({});
    setShowHelp({});
    setShowChoices({});
    setFeedback({});
    setCurrentQuestionIndex(0);
    setCurrentActivity('story');
  };

  return (
    <div className="story-inference-compare">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>📖 Story Inference & Analysis</h1>
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
        <div className="story-selector">
          {stories.map((story, idx) => (
            <button
              key={idx}
              className={`story-btn ${currentStoryIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setCurrentStoryIndex(idx);
                resetActivity();
              }}
            >
              Story {idx + 1}: {story.title}
            </button>
          ))}
        </div>

        <div className="activity-container">
          <div className="story-header">
            <h2 className="story-title">{currentStory.title}</h2>
          </div>

          <div className="activity-toggle">
            <button
              className={`toggle-btn ${currentActivity === 'story' ? 'active' : ''}`}
              onClick={() => setCurrentActivity('story')}
            >
              📖 Read Story
            </button>
            <button
              className={`toggle-btn ${currentActivity === 'inference' ? 'active' : ''}`}
              onClick={() => setCurrentActivity('inference')}
            >
              🔍 Inference Questions
            </button>
          </div>

          {currentActivity === 'story' && (
            <div className="story-text">
              {currentStory.text.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          )}

          {currentActivity === 'inference' && (
            <div className="inference-activity">
              <div className="question-nav">
                {currentStory.inference.map((q, idx) => (
                  <button
                    key={idx}
                    className={`question-nav-btn ${currentQuestionIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentQuestionIndex(idx)}
                  >
                    Question {idx + 1}: {q.character}
                  </button>
                ))}
              </div>

              <div className="inference-question">
                <h3 className="question-title">Character: {currentQuestion.character}</h3>
                <p className="question-prompt">{currentQuestion.question}</p>

                <div className="context-box">
                  <strong>Context:</strong> {currentQuestion.context}
                </div>

                <div className="help-section">
                  <button
                    className="help-btn"
                    onClick={() => setShowHelp(prev => ({ ...prev, [currentQuestionIndex]: !prev[currentQuestionIndex] }))}
                  >
                    💡 {showHelp[currentQuestionIndex] ? 'Hide' : 'Show'} Text Evidence
                  </button>
                  <button
                    className="help-btn"
                    onClick={() => setShowChoices(prev => ({ ...prev, [currentQuestionIndex]: !prev[currentQuestionIndex] }))}
                  >
                    📝 {showChoices[currentQuestionIndex] ? 'Hide' : 'Show'} Multiple Choice
                  </button>
                </div>

                {showHelp[currentQuestionIndex] && (
                  <div className="help-box show">
                    <h4>Text Evidence</h4>
                    <ul>
                      {currentQuestion.evidence.map((ev, idx) => (
                        <li key={idx}>"{ev}"</li>
                      ))}
                    </ul>
                  </div>
                )}

                <textarea
                  className="inference-input"
                  placeholder="Type your answer here based on the story clues..."
                  rows="4"
                />

                {showChoices[currentQuestionIndex] && (
                  <div className="multiple-choice show">
                    <h4>Multiple Choice Options</h4>
                    {currentQuestion.choices.map((choice, idx) => {
                      const isSelected = answers[currentQuestionIndex] === idx;
                      const isCorrect = idx === currentQuestion.correct;
                      const showFeedback = feedback[currentQuestionIndex] !== undefined;

                      return (
                        <div
                          key={idx}
                          className={`choice-option ${isSelected ? 'selected' : ''} ${
                            showFeedback && isCorrect ? 'correct' : ''
                          } ${showFeedback && isSelected && !isCorrect ? 'incorrect' : ''}`}
                          onClick={() => handleAnswerSelect(currentQuestionIndex, idx)}
                        >
                          {String.fromCharCode(65 + idx)}) {choice}
                        </div>
                      );
                    })}
                    <button
                      className="check-btn"
                      onClick={() => checkAnswer(currentQuestionIndex)}
                    >
                      Check Answer
                    </button>
                  </div>
                )}

                {feedback[currentQuestionIndex] !== undefined && (
                  <div className={`feedback ${feedback[currentQuestionIndex] ? 'correct' : 'incorrect'}`}>
                    {feedback[currentQuestionIndex] ? '✅ Correct!' : '❌ Not quite. The correct answer is highlighted above.'}
                  </div>
                )}
              </div>
            </div>
          )}
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

export default StoryInferenceCompare;
