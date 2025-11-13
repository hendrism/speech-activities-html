import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ProblemSolutionStories.css';

const ProblemSolutionStories = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionType, setQuestionType] = useState('problem'); // 'problem' or 'literal'
  const [userAnswers, setUserAnswers] = useState({});
  const [helpLevel, setHelpLevel] = useState({}); // 0: text box, 1: clue, 2: choices
  const [feedback, setFeedback] = useState({ show: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const stories = [
    {
      title: "The Forgotten Homework",
      story: "Lila sat at her desk, looking worried. She had forgotten to do her math homework the night before. When the teacher asked for the assignments, Lila's stomach sank. She knew she would lose points. At lunch, she told her friend Maya what happened. Maya suggested that Lila talk to the teacher honestly. Lila explained to her teacher that she forgot and asked if she could stay after school to finish it. The teacher agreed but reminded her to write things down in her planner. Lila completed the homework that afternoon. She promised herself she would use her planner every day. The next week, she remembered all her assignments on time.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "Think about what Lila forgot to do the night before.",
          answer: "Lila forgot to do her math homework",
          choices: ["Lila forgot her lunch", "Lila forgot to do her math homework", "Lila forgot her backpack", "Lila forgot to study"]
        },
        {
          question: "What was the solution?",
          clue: "How did Lila fix the problem with her homework?",
          answer: "She talked to the teacher and stayed after school to finish it",
          choices: ["She copied from a friend", "She talked to the teacher and stayed after school to finish it", "She skipped class", "She pretended to be sick"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "Think about whether being honest with the teacher was the right thing to do.",
          answer: "Yes, because she was honest and took responsibility",
          choices: ["No, because she got in trouble", "Yes, because she was honest and took responsibility", "No, because it was too much work", "Yes, because she avoided punishment"]
        },
        {
          question: "What would you do differently?",
          clue: "What could help prevent forgetting homework in the future?",
          answer: "Use a planner or set reminders to remember homework",
          choices: ["Give up on homework", "Use a planner or set reminders to remember homework", "Ask friends to do it", "Wait until the last minute"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "Who forgot their homework?",
          clue: "Look for the main character's name in the story.",
          answer: "Lila",
          choices: ["Maya", "Lila", "The teacher", "A friend"]
        },
        {
          question: "What subject was the homework for?",
          clue: "What type of homework did Lila forget to do?",
          answer: "Math",
          choices: ["English", "Science", "Math", "History"]
        },
        {
          question: "When did Lila finish her work?",
          clue: "Think about what time of day she completed the homework.",
          answer: "After school that afternoon",
          choices: ["During lunch", "After school that afternoon", "The next morning", "During class"]
        },
        {
          question: "Why did the teacher agree to let her finish after school?",
          clue: "What did Lila do when she talked to the teacher?",
          answer: "Because Lila was honest and asked for help",
          choices: ["Because she was the teacher's favorite", "Because Lila was honest and asked for help", "Because Maya convinced the teacher", "Because it was her first time"]
        },
        {
          question: "How did Lila try to stop this from happening again?",
          clue: "What tool did the teacher remind Lila to use?",
          answer: "She promised to use her planner every day",
          choices: ["She set an alarm", "She asked Maya to remind her", "She promised to use her planner every day", "She quit doing homework"]
        }
      ]
    },
    {
      title: "The Broken Bike",
      story: "Jamal loved riding his bike to school. One morning, as he was pedaling, his chain slipped off. The bike wouldn't move, and he was almost late. He pushed the bike the rest of the way and parked it outside. After school, Jamal asked the school janitor if he had tools. The janitor helped him put the chain back on. Jamal watched carefully so he could learn. The janitor showed him how to keep the chain oiled. Jamal tried it himself and fixed the bike. From then on, he kept a small repair kit in his backpack. He felt proud that he knew how to fix his own bike.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "What happened to Jamal's bike while he was riding?",
          answer: "His bike chain slipped off",
          choices: ["His tire was flat", "His bike chain slipped off", "His handlebars broke", "His brakes stopped working"]
        },
        {
          question: "What was the solution?",
          clue: "Who helped Jamal and what did they do?",
          answer: "The janitor helped him put the chain back on and taught him bike maintenance",
          choices: ["He bought a new bike", "The janitor helped him put the chain back on and taught him bike maintenance", "He walked to school instead", "His parents fixed it"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "Think about what Jamal learned from this experience.",
          answer: "Yes, because he learned how to fix his bike himself",
          choices: ["No, because it took too long", "Yes, because he learned how to fix his bike himself", "No, because he should have bought a new bike", "Yes, because someone else did the work"]
        },
        {
          question: "What would you do differently?",
          clue: "What could Jamal have done to prevent or prepare for this problem?",
          answer: "Keep a repair kit and learn bike maintenance before the problem happens",
          choices: ["Never ride a bike again", "Keep a repair kit and learn bike maintenance before the problem happens", "Always have someone else fix it", "Only ride new bikes"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "What broke on Jamal's bike?",
          clue: "What part of the bike stopped working?",
          answer: "The chain",
          choices: ["The wheel", "The chain", "The seat", "The pedals"]
        },
        {
          question: "Who helped Jamal fix the bike?",
          clue: "Which school staff member had tools?",
          answer: "The school janitor",
          choices: ["His teacher", "The school janitor", "The principal", "Another student"]
        },
        {
          question: "Where was Jamal going when it broke?",
          clue: "Where did Jamal ride his bike every day?",
          answer: "To school",
          choices: ["To the store", "To school", "To a friend's house", "To the park"]
        },
        {
          question: "Why did Jamal bring a repair kit later?",
          clue: "What did he want to be ready for in the future?",
          answer: "So he could fix his bike if it broke again",
          choices: ["To help other people", "So he could fix his bike if it broke again", "Because the janitor told him to", "To look cool"]
        },
        {
          question: "How did Jamal feel at the end?",
          clue: "What emotion did Jamal have about learning to fix his bike?",
          answer: "Proud",
          choices: ["Angry", "Sad", "Proud", "Worried"]
        }
      ]
    },
    {
      title: "The Lost Dog",
      story: "Maria's small dog, Coco, slipped out of the backyard gate. Maria ran outside and called Coco's name, but the dog was gone. She felt scared and didn't know what to do. Maria asked her mom for help. Together, they made posters with Coco's picture. They hung them around the neighborhood. The next day, a neighbor called and said Coco was in their yard. Maria ran over and picked up her dog. She thanked her neighbor for keeping Coco safe. Maria's dad fixed the gate so it would latch tightly. Maria hugged Coco and promised to always check the gate before letting her outside.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "What happened to Maria's pet?",
          answer: "Her dog Coco escaped from the backyard",
          choices: ["Her dog was sick", "Her dog Coco escaped from the backyard", "Her dog was lost at the park", "Her dog wouldn't eat"]
        },
        {
          question: "What was the solution?",
          clue: "How did Maria and her mom try to find Coco?",
          answer: "They made posters with Coco's picture and hung them in the neighborhood",
          choices: ["They called the police", "They made posters with Coco's picture and hung them in the neighborhood", "They searched the park", "They waited at home"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "Did making posters help them find Coco?",
          answer: "Yes, because a neighbor saw the poster and called them",
          choices: ["No, because it took too long", "Yes, because a neighbor saw the poster and called them", "No, because posters don't work", "Yes, because it was free"]
        },
        {
          question: "What would you do differently?",
          clue: "What could prevent the dog from escaping again?",
          answer: "Check that the gate is secure before letting the dog outside",
          choices: ["Never let the dog outside", "Check that the gate is secure before letting the dog outside", "Get a different pet", "Move to a new house"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "What was Maria's dog's name?",
          clue: "Look for the dog's name in the story.",
          answer: "Coco",
          choices: ["Buddy", "Coco", "Max", "Bella"]
        },
        {
          question: "How did Maria try to find her dog?",
          clue: "What did Maria and her mom make together?",
          answer: "They made posters with Coco's picture",
          choices: ["They called animal control", "They made posters with Coco's picture", "They searched the streets", "They asked friends"]
        },
        {
          question: "Who found Coco?",
          clue: "Who called Maria about finding her dog?",
          answer: "A neighbor",
          choices: ["The police", "A neighbor", "Animal control", "Maria's friend"]
        },
        {
          question: "Why did Maria's dad fix the gate?",
          clue: "What was wrong with the gate that let Coco escape?",
          answer: "So it would latch tightly and Coco couldn't escape again",
          choices: ["Because it was old", "So it would latch tightly and Coco couldn't escape again", "Because it was broken", "To make it look better"]
        },
        {
          question: "How did Maria feel when she got Coco back?",
          clue: "What did Maria do when she was reunited with her dog?",
          answer: "Happy and relieved (she hugged Coco)",
          choices: ["Angry", "Worried", "Happy and relieved (she hugged Coco)", "Scared"]
        }
      ]
    },
    {
      title: "The Late Bus",
      story: "Dante missed his school bus because he overslept. He quickly ate breakfast and grabbed his backpack. His mom was busy and couldn't drive him. Dante worried he would miss first period. He decided to walk to school, even though it was far. On the way, he saw his neighbor, Mrs. Patel, driving her car. She asked why he was walking. Dante explained, and she offered him a ride. He got to school just before the bell. That night, Dante set two alarms so he wouldn't oversleep again. The next morning, he woke up on time and caught the bus.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "Why couldn't Dante get to school on time?",
          answer: "He overslept and missed the school bus",
          choices: ["The bus was late", "He overslept and missed the school bus", "His mom couldn't drive him", "He forgot his backpack"]
        },
        {
          question: "What was the solution?",
          clue: "How did Dante end up getting to school?",
          answer: "He walked to school and his neighbor Mrs. Patel gave him a ride",
          choices: ["His mom drove him later", "He walked to school and his neighbor Mrs. Patel gave him a ride", "He took a taxi", "He stayed home"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "Did Dante make it to school on time?",
          answer: "Yes, because he took action and got help when he needed it",
          choices: ["No, because he bothered his neighbor", "Yes, because he took action and got help when he needed it", "No, because he was almost late", "Yes, because he got a free ride"]
        },
        {
          question: "What would you do differently?",
          clue: "What did Dante do to prevent oversleeping again?",
          answer: "Set multiple alarms to wake up on time",
          choices: ["Ask for rides every day", "Set multiple alarms to wake up on time", "Sleep at school", "Never sleep again"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "Why did Dante miss the bus?",
          clue: "What happened that morning that made him late?",
          answer: "He overslept",
          choices: ["The bus was early", "He overslept", "He was sick", "He forgot his homework"]
        },
        {
          question: "Who gave Dante a ride?",
          clue: "Which neighbor helped Dante get to school?",
          answer: "Mrs. Patel",
          choices: ["Mrs. Smith", "Mrs. Patel", "Mr. Johnson", "His friend's mom"]
        },
        {
          question: "When did Dante arrive at school?",
          clue: "How close was it to the start of class when he got there?",
          answer: "Just before the bell",
          choices: ["An hour early", "Just before the bell", "After first period", "At lunchtime"]
        },
        {
          question: "How did Dante try to stop this from happening again?",
          clue: "What did Dante do that night to help him wake up?",
          answer: "He set two alarms",
          choices: ["He went to bed earlier", "He set two alarms", "He asked his mom to wake him", "He slept with the lights on"]
        },
        {
          question: "What might have happened if Mrs. Patel had not driven by?",
          clue: "Think about what would happen if Dante had to walk the whole way.",
          answer: "He would have been late for first period",
          choices: ["He would have gotten exercise", "He would have been late for first period", "He would have gone home", "Nothing different would happen"]
        }
      ]
    },
    {
      title: "The Group Project",
      story: "Sofia and her classmates were working on a science project. At first, everyone wanted to do different ideas. They argued and wasted time. Sofia suggested making a list of ideas and voting. The group agreed and wrote down their choices. After voting, they picked \"volcano model.\" Everyone got a job: one student gathered supplies, another painted, and Sofia wrote the report. The project turned out great. The teacher praised them for teamwork. Sofia realized that listening and voting helped solve the argument.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "What was happening when the group first started working together?",
          answer: "Everyone wanted different ideas and they were arguing",
          choices: ["They didn't have supplies", "Everyone wanted different ideas and they were arguing", "The teacher gave them a hard topic", "They ran out of time"]
        },
        {
          question: "What was the solution?",
          clue: "What did Sofia suggest to help the group decide?",
          answer: "Make a list of ideas and vote on them",
          choices: ["Let the teacher decide", "Make a list of ideas and vote on them", "Do all the projects", "Give up on the project"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "How did the project turn out and what did the teacher say?",
          answer: "Yes, because it helped them work together and the project was successful",
          choices: ["No, because voting takes too long", "Yes, because it helped them work together and the project was successful", "No, because not everyone got their way", "Yes, because Sofia got to be in charge"]
        },
        {
          question: "What would you do differently?",
          clue: "What could help prevent arguments in future group work?",
          answer: "Start by discussing how to make decisions as a group",
          choices: ["Work alone instead", "Start by discussing how to make decisions as a group", "Let one person choose everything", "Always do the easiest project"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "What subject was the project for?",
          clue: "What class were they working on the project for?",
          answer: "Science",
          choices: ["Math", "English", "Science", "Art"]
        },
        {
          question: "Who suggested making a list of ideas?",
          clue: "Which student came up with the voting solution?",
          answer: "Sofia",
          choices: ["The teacher", "Sofia", "A classmate", "Everyone together"]
        },
        {
          question: "What project did they choose?",
          clue: "What did the group vote to make?",
          answer: "Volcano model",
          choices: ["Solar system", "Volcano model", "Plant growth", "Weather station"]
        },
        {
          question: "Why did they vote on the ideas?",
          clue: "What problem was the voting supposed to solve?",
          answer: "To stop arguing and choose one idea fairly",
          choices: ["Because the teacher told them to", "To stop arguing and choose one idea fairly", "To waste time", "Because voting is fun"]
        },
        {
          question: "How did the teacher react to their project?",
          clue: "What did the teacher say about their work?",
          answer: "The teacher praised them for teamwork",
          choices: ["The teacher was disappointed", "The teacher praised them for teamwork", "The teacher didn't comment", "The teacher gave them extra work"]
        }
      ]
    },
    {
      title: "The Spilled Juice",
      story: "At lunch, Ethan accidentally spilled orange juice all over his friend Mia's paper. Mia frowned and looked upset. Ethan quickly grabbed napkins and started cleaning it up. He apologized to Mia for being clumsy. Mia forgave him but said she needed her paper for class. Ethan asked the teacher for a new sheet. Mia copied the work again, and Ethan helped by writing some of the answers for her. Mia smiled and said thank you. Ethan learned to be more careful with his drinks at the table.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "What accident happened at lunch?",
          answer: "Ethan spilled juice on Mia's important paper",
          choices: ["Ethan forgot his lunch", "Ethan spilled juice on Mia's important paper", "Mia lost her homework", "The table was dirty"]
        },
        {
          question: "What was the solution?",
          clue: "How did Ethan help fix what he had done?",
          answer: "He got a new paper and helped Mia rewrite her work",
          choices: ["He bought Mia a new drink", "He got a new paper and helped Mia rewrite her work", "He told the teacher it was an accident", "He cleaned the table"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "How did Mia feel at the end?",
          answer: "Yes, because Ethan took responsibility and helped make it right",
          choices: ["No, because accidents happen", "Yes, because Ethan took responsibility and helped make it right", "No, because it took too much time", "Yes, because Mia got help with her work"]
        },
        {
          question: "What would you do differently?",
          clue: "What did Ethan learn about being careful?",
          answer: "Be more careful with drinks around important papers",
          choices: ["Never drink juice again", "Be more careful with drinks around important papers", "Sit somewhere else", "Always bring extra napkins"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "What did Ethan spill?",
          clue: "What drink caused the problem?",
          answer: "Orange juice",
          choices: ["Water", "Milk", "Orange juice", "Soda"]
        },
        {
          question: "Who did he spill it on?",
          clue: "Whose paper got ruined?",
          answer: "His friend Mia",
          choices: ["The teacher", "His friend Mia", "Himself", "A stranger"]
        },
        {
          question: "What did Ethan use to clean it up?",
          clue: "What did Ethan grab to clean up the spill?",
          answer: "Napkins",
          choices: ["Paper towels", "Napkins", "His shirt", "A cloth"]
        },
        {
          question: "Why did Ethan ask for a new sheet?",
          clue: "What happened to Mia's original paper?",
          answer: "Because the juice ruined Mia's paper and she needed it for class",
          choices: ["Because he wanted to help", "Because the juice ruined Mia's paper and she needed it for class", "Because the teacher told him to", "Because Mia asked him to"]
        },
        {
          question: "How did Mia feel at the end?",
          clue: "What did Mia do when Ethan helped her?",
          answer: "Happy and grateful (she smiled and said thank you)",
          choices: ["Still angry", "Worried", "Happy and grateful (she smiled and said thank you)", "Confused"]
        }
      ]
    },
    {
      title: "The Stuck Locker",
      story: "Jordan's locker wouldn't open before class. He twisted the lock again and again, but nothing worked. He felt worried because his books were inside. Other students walked past, and he felt embarrassed. Finally, Jordan asked a teacher for help. The teacher called the custodian, who used special tools to open it. Jordan was able to grab his books and get to class. Later, the custodian showed him how to turn the lock more slowly. Jordan practiced and got better at opening it. He didn't feel nervous about his locker anymore.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "What was wrong with Jordan's locker?",
          answer: "His locker wouldn't open and his books were inside",
          choices: ["He forgot his combination", "His locker wouldn't open and his books were inside", "Someone stole from his locker", "His locker was broken"]
        },
        {
          question: "What was the solution?",
          clue: "Who helped Jordan and what did they do?",
          answer: "He asked a teacher for help, and the custodian opened it with tools",
          choices: ["He broke the lock", "He asked a teacher for help, and the custodian opened it with tools", "He went to class without books", "He called his parents"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "What did Jordan learn and how did he feel afterward?",
          answer: "Yes, because he got help and learned how to use the lock properly",
          choices: ["No, because he bothered adults", "Yes, because he got help and learned how to use the lock properly", "No, because it made him late", "Yes, because he didn't have to do it himself"]
        },
        {
          question: "What would you do differently?",
          clue: "What could Jordan have done to avoid this problem?",
          answer: "Practice opening the locker and learn the proper technique earlier",
          choices: ["Never use a locker", "Practice opening the locker and learn the proper technique earlier", "Always ask for help", "Carry all books all the time"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "What was stuck?",
          clue: "What wouldn't work for Jordan?",
          answer: "His locker",
          choices: ["The classroom door", "His locker", "A window", "His backpack"]
        },
        {
          question: "Who helped Jordan?",
          clue: "Which adults helped solve the problem?",
          answer: "A teacher and the custodian",
          choices: ["His friends", "A teacher and the custodian", "His parents", "Other students"]
        },
        {
          question: "Why did Jordan feel embarrassed?",
          clue: "What was happening while Jordan struggled with his locker?",
          answer: "Other students walked past and saw him having trouble",
          choices: ["He was late for class", "Other students walked past and saw him having trouble", "He couldn't remember his combination", "He was making noise"]
        },
        {
          question: "How did the custodian fix the problem?",
          clue: "What did the custodian use to open the locker?",
          answer: "He used special tools",
          choices: ["He broke the lock", "He used special tools", "He knew the combination", "He called the principal"]
        },
        {
          question: "What did Jordan learn from the experience?",
          clue: "What did the custodian teach Jordan?",
          answer: "How to turn the lock more slowly and properly",
          choices: ["How to break locks", "How to turn the lock more slowly and properly", "How to avoid using lockers", "How to ask for help"]
        }
      ]
    },
    {
      title: "The Rainy Day",
      story: "During recess, the sky grew dark and it began to rain. The kids wanted to play outside, but the playground was too wet. Everyone groaned when the teacher said they had to stay in. Some students sat quietly, looking bored. Then, one student suggested playing a game inside. The teacher brought out board games and cards. Soon, the kids were laughing and having fun together. By the end of recess, no one minded that it had rained. They realized they could still have fun even if plans changed.",
      problemSolutionQuestions: [
        {
          question: "What was the problem?",
          clue: "What prevented the kids from doing what they wanted at recess?",
          answer: "It rained and they couldn't play outside",
          choices: ["The playground was broken", "It rained and they couldn't play outside", "They forgot their games", "The teacher was absent"]
        },
        {
          question: "What was the solution?",
          clue: "How did the students end up having fun despite the rain?",
          answer: "A student suggested indoor games and the teacher provided them",
          choices: ["They went outside anyway", "A student suggested indoor games and the teacher provided them", "They watched a movie", "They did homework instead"]
        },
        {
          question: "Was that a good solution? Why or why not?",
          clue: "How did the students feel by the end of recess?",
          answer: "Yes, because everyone ended up having fun and learning to adapt",
          choices: ["No, because indoor games aren't as good", "Yes, because everyone ended up having fun and learning to adapt", "No, because they still wanted to go outside", "Yes, because it was easier for the teacher"]
        },
        {
          question: "What would you do differently?",
          clue: "What could help students be prepared for rainy days?",
          answer: "Always have backup indoor activities ready",
          choices: ["Cancel recess on rainy days", "Always have backup indoor activities ready", "Force everyone to go outside", "Let students do whatever they want"]
        }
      ],
      literalInferentialQuestions: [
        {
          question: "What happened during recess?",
          clue: "What weather event occurred?",
          answer: "It began to rain",
          choices: ["It got very hot", "It began to rain", "It started snowing", "It became windy"]
        },
        {
          question: "Why couldn't the kids play outside?",
          clue: "What made the playground unusable?",
          answer: "The playground was too wet from rain",
          choices: ["The playground was being repaired", "The playground was too wet from rain", "It was too cold outside", "The playground was closed"]
        },
        {
          question: "Who brought out the board games?",
          clue: "Which adult helped provide indoor activities?",
          answer: "The teacher",
          choices: ["A student", "The principal", "The teacher", "A parent"]
        },
        {
          question: "What did the students do instead?",
          clue: "How did the students spend their indoor recess?",
          answer: "They played board games and cards",
          choices: ["They read books", "They played board games and cards", "They took naps", "They did schoolwork"]
        },
        {
          question: "How did the students feel at the end of recess?",
          clue: "What was the students' attitude about the rain by the end?",
          answer: "Happy and didn't mind the rain anymore",
          choices: ["Still upset about the rain", "Bored and tired", "Happy and didn't mind the rain anymore", "Worried about tomorrow"]
        }
      ]
    }
  ];

  const getCurrentStory = () => stories[currentStory];
  const getCurrentQuestions = () => {
    const story = getCurrentStory();
    return questionType === 'problem' ? story.problemSolutionQuestions : story.literalInferentialQuestions;
  };
  const getCurrentQuestion = () => getCurrentQuestions()[currentQuestion];

  const getQuestionId = () => `${currentStory}-${questionType}-${currentQuestion}`;

  const getUserAnswer = () => userAnswers[getQuestionId()] || '';

  const getHelpLevel = () => helpLevel[getQuestionId()] || 0;

  const setUserAnswer = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [getQuestionId()]: answer
    }));
  };

  const showHelp = () => {
    const currentLevel = getHelpLevel();
    if (currentLevel < 2) {
      setHelpLevel(prev => ({
        ...prev,
        [getQuestionId()]: currentLevel + 1
      }));
    }
  };

  const nextQuestion = () => {
    const questions = getCurrentQuestions();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (questionType === 'problem') {
      setQuestionType('literal');
      setCurrentQuestion(0);
    } else {
      // Move to next story or show completion
      if (currentStory < stories.length - 1) {
        setCurrentStory(currentStory + 1);
        setCurrentQuestion(0);
        setQuestionType('problem');
      } else {
        setFeedback({ show: true, message: '🎉 Congratulations! You have completed all the Problem-Solution Stories!' });
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (questionType === 'literal') {
      setQuestionType('problem');
      const problemQuestions = getCurrentStory().problemSolutionQuestions;
      setCurrentQuestion(problemQuestions.length - 1);
    } else if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
      setQuestionType('literal');
      const prevStoryLiteralQuestions = stories[currentStory - 1].literalInferentialQuestions;
      setCurrentQuestion(prevStoryLiteralQuestions.length - 1);
    }
  };

  const selectStory = (storyIndex) => {
    setCurrentStory(storyIndex);
    setCurrentQuestion(0);
    setQuestionType('problem');
    setFeedback({ show: false, message: '' });
  };

  const resetActivity = () => {
    setUserAnswers({});
    setHelpLevel({});
    setCurrentStory(0);
    setCurrentQuestion(0);
    setQuestionType('problem');
    setFeedback({ show: false, message: '' });
  };

  const renderQuestion = () => {
    const question = getCurrentQuestion();
    const currentHelpLevel = getHelpLevel();
    const userAnswer = getUserAnswer();

    return (
      <div className="question-container">
        <div className="question-header">
          <h3>{question.question}</h3>
          <div className="question-info">
            {questionType === 'problem' ? '🎯 Problem/Solution' : '📚 Reading Comprehension'} •
            Question {currentQuestion + 1} of {getCurrentQuestions().length}
          </div>
        </div>

        <div className="answer-section">
          {currentHelpLevel === 0 && (
            <div className="text-input-mode">
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="answer-textarea"
                rows={4}
              />
            </div>
          )}

          {currentHelpLevel === 1 && (
            <div className="clue-mode">
              <div className="clue-box">
                <div className="clue-label">💡 Hint:</div>
                <div className="clue-text">{question.clue}</div>
              </div>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="answer-textarea"
                rows={4}
              />
            </div>
          )}

          {currentHelpLevel === 2 && (
            <div className="choices-mode">
              <div className="clue-box">
                <div className="clue-label">💡 Hint:</div>
                <div className="clue-text">{question.clue}</div>
              </div>
              <div className="choices-container">
                {question.choices.map((choice, index) => (
                  <button
                    key={index}
                    className={`choice-btn ${userAnswer === choice ? 'selected' : ''}`}
                    onClick={() => setUserAnswer(choice)}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="help-buttons">
            {currentHelpLevel < 2 && (
              <button onClick={showHelp} className="help-btn">
                {currentHelpLevel === 0 ? '💡 I need a hint' : '📝 Show me choices'}
              </button>
            )}
          </div>
        </div>

        <div className="navigation-buttons">
          <button onClick={prevQuestion} disabled={currentStory === 0 && currentQuestion === 0 && questionType === 'problem'} className="nav-btn">
            ← Previous
          </button>
          <button onClick={nextQuestion} className="nav-btn primary">
            {currentStory === stories.length - 1 && questionType === 'literal' && currentQuestion === getCurrentQuestions().length - 1 ? 'Finish' : 'Next →'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="problem-solution-stories">
      <header className="activity-header">
        <div className="header-content">
          <h1>📚 Problem-Solution Stories</h1>
          <div className="progress-info">
            Story {currentStory + 1} of {stories.length}: {getCurrentStory().title}
          </div>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
            <button onClick={resetActivity} className="warning">
              🔄 Reset
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Story Selector */}
        <div className="story-selector">
          {stories.map((story, index) => (
            <button
              key={index}
              className={`story-btn ${currentStory === index ? 'active' : ''}`}
              onClick={() => selectStory(index)}
            >
              <div className="story-number">{index + 1}</div>
              <div className="story-title">{story.title}</div>
            </button>
          ))}
        </div>

        {/* Story Content */}
        <div className="story-content">
          <div className="story-text">
            <h2>{getCurrentStory().title}</h2>
            <p>{getCurrentStory().story}</p>
          </div>

          {/* Question Type Selector */}
          <div className="question-type-selector">
            <button
              className={`type-btn ${questionType === 'problem' ? 'active' : ''}`}
              onClick={() => {
                setQuestionType('problem');
                setCurrentQuestion(0);
              }}
            >
              🎯 Problem/Solution Questions
            </button>
            <button
              className={`type-btn ${questionType === 'literal' ? 'active' : ''}`}
              onClick={() => {
                setQuestionType('literal');
                setCurrentQuestion(0);
              }}
            >
              📚 Reading Comprehension
            </button>
          </div>

          {/* Question */}
          {renderQuestion()}

          {feedback.show && (
            <div className="feedback success show">
              <p>{feedback.message}</p>
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

export default ProblemSolutionStories;