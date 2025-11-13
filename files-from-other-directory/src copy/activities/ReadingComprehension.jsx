import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ReadingComprehension.css';

const ReadingComprehension = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentActivity, setCurrentActivity] = useState('main-idea');
  const [draggedElement, setDraggedElement] = useState(null);
  const [mainIdeaFeedback, setMainIdeaFeedback] = useState({ show: false, success: false, message: '' });
  const [vocabFeedback, setVocabFeedback] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const stories = [
    {
      title: "Alex's Garden Project",
      text: `Alex had always been interested in growing things, but had never tried gardening before. When their science teacher assigned a project about plant growth, Alex decided this was the perfect opportunity to start a small garden in the backyard. They spent the weekend researching which vegetables would grow best in their area and what supplies they would need.

The next week, Alex convinced their parents to take them to the garden center. They carefully selected tomato plants, bean seeds, and lettuce seeds. Alex also picked out a small shovel, watering can, and some fertilizer. Back at home, they measured out a 4-foot by 6-foot plot and began preparing the soil, removing weeds and rocks.

Over the next two months, Alex watered their garden every morning before school and checked on the plants each afternoon. When the first tiny tomatoes appeared, Alex felt incredibly proud. By the end of the school term, they had grown enough vegetables to share with their family and had earned an A+ on their science project. The experience taught Alex that with planning, patience, and daily care, they could successfully grow their own food.`,
      mainIdea: "Alex successfully completed a science project by starting and maintaining their first garden.",
      details: [
        "Alex researched which vegetables would grow best in their area",
        "They selected tomato plants, bean seeds, and lettuce seeds at the garden center",
        "Alex watered the garden every morning and checked on plants each afternoon",
        "They earned an A+ on their science project and shared vegetables with family"
      ],
      foils: [
        "Alex's teacher gave the class a very difficult science assignment",
        "The garden center had the best prices in town for gardening supplies"
      ],
      vocabulary: [
        {
          word: "convinced",
          sentence: "The next week, Alex convinced their parents to take them to the garden center.",
          question: "What does 'convinced' mean in this sentence?",
          hint1: "Think about what Alex had to do to get their parents to agree.",
          hint2: "This word means Alex had to give their parents good reasons or arguments.",
          choices: [
            "persuaded or talked someone into doing something",
            "forced someone to do something against their will",
            "asked politely one time"
          ],
          correct: 0
        },
        {
          word: "fertilizer",
          sentence: "Alex also picked out a small shovel, watering can, and some fertilizer.",
          question: "What is 'fertilizer' in this context?",
          hint1: "Look at what else Alex bought - tools and supplies for gardening.",
          hint2: "This is something that helps plants grow better and stronger.",
          choices: [
            "a substance that provides nutrients to help plants grow",
            "a type of decorative container for plants",
            "a tool used to dig holes in the ground"
          ],
          correct: 0
        },
        {
          word: "plot",
          sentence: "Back at home, they measured out a 4-foot by 6-foot plot and began preparing the soil.",
          question: "What does 'plot' mean here?",
          hint1: "Alex measured out something that was 4 feet by 6 feet.",
          hint2: "This is a specific area of land that Alex marked out for their garden.",
          choices: [
            "a small area of ground designated for a specific purpose",
            "a secret plan to do something",
            "the main story line of a book or movie"
          ],
          correct: 0
        }
      ]
    },
    {
      title: "The School Talent Show Challenge",
      text: `Maya had been playing piano for three years, but she had never performed in front of a large audience. When the announcements mentioned tryouts for the school talent show, Maya felt both excited and nervous. She had been working on a beautiful classical piece called "Für Elise" by Beethoven, and she thought it might be perfect for the talent show.

Maya decided to audition, but she knew she needed to practice more to feel confident. For the next three weeks, she practiced the piece every day after school for at least an hour. She also asked her piano teacher for extra help with the difficult parts. Her teacher suggested she practice performing in front of small groups first, so Maya played for her family, then for her best friend, and finally for her piano class.

On the day of auditions, Maya felt prepared but still nervous. When her turn came, she walked confidently to the piano, took a deep breath, and began to play. The music flowed beautifully, and she only made one small mistake that most people probably didn't notice. The judges smiled and nodded throughout her performance. A week later, Maya was thrilled to see her name on the list of selected performers. The talent show was still a month away, but Maya felt ready for the challenge.`,
      mainIdea: "Maya prepared thoroughly for the school talent show audition and successfully earned a spot as a performer.",
      details: [
        "Maya had been playing piano for three years but never performed for a large audience",
        "She practiced 'Für Elise' every day after school for at least an hour for three weeks",
        "Her piano teacher suggested practicing in front of small groups first",
        "Maya was selected to perform in the talent show after her successful audition"
      ],
      foils: [
        "The school talent show was the most popular event of the year",
        "Beethoven composed many famous classical pieces for piano students"
      ],
      vocabulary: [
        {
          word: "audition",
          sentence: "Maya decided to audition, but she knew she needed to practice more to feel confident.",
          question: "What does 'audition' mean?",
          hint1: "Maya had to do this to try to get into the talent show.",
          hint2: "This is when someone performs to show their skills and try to be selected.",
          choices: [
            "perform to try out for a role or position in a show",
            "practice a musical piece in private",
            "watch other people perform their talents"
          ],
          correct: 0
        },
        {
          word: "classical",
          sentence: "She had been working on a beautiful classical piece called 'Für Elise' by Beethoven.",
          question: "What type of music is 'classical'?",
          hint1: "The piece was written by Beethoven, a famous composer from long ago.",
          hint2: "This type of music is often performed by orchestras and has been around for centuries.",
          choices: [
            "traditional, formal music often written by famous composers from the past",
            "modern music with electronic instruments and beats",
            "folk music passed down through families and communities"
          ],
          correct: 0
        },
        {
          word: "confidently",
          sentence: "When her turn came, she walked confidently to the piano, took a deep breath, and began to play.",
          question: "How did Maya walk 'confidently'?",
          hint1: "Think about how someone walks when they feel sure of themselves.",
          hint2: "This describes walking in a way that shows you believe in yourself and feel prepared.",
          choices: [
            "in a self-assured way that shows belief in one's abilities",
            "very slowly and carefully to avoid making mistakes",
            "quickly and nervously because of being scared"
          ],
          correct: 0
        }
      ]
    },
    {
      title: "The Mystery of the Missing Lunch",
      text: `Every day at Lincoln Middle School, students stored their lunch boxes in the classroom cubbies before going to morning classes. But this week, something strange was happening. Several students reported that items from their lunches were disappearing. First, Emma's homemade cookies vanished. Then Jake's apple was gone. By Thursday, five different students had lost parts of their lunches, and everyone was getting frustrated and suspicious of each other.

Ms. Rodriguez, the homeroom teacher, decided to investigate. She asked the students to describe exactly what was missing and when they noticed it. She also checked the classroom during different times of the day to look for clues. On Friday morning, Ms. Rodriguez arrived at school extra early and quietly watched the classroom from the hallway. That's when she spotted the real culprit - a clever gray squirrel that had found a way into the classroom through a loose window screen.

The squirrel had been sneaking in each morning, opening lunch boxes with its tiny paws, and taking the most appealing snacks back to its nest outside. Ms. Rodriguez fixed the window screen and explained the mystery to her relieved students. Everyone laughed about the situation, and Jake even suggested they should leave some nuts outside for their "classroom visitor." The missing lunch mystery was finally solved, and the students learned that sometimes the simplest explanation is the right one.`,
      mainIdea: "A teacher solved the mystery of missing lunch items by discovering a squirrel was sneaking into the classroom to steal food.",
      details: [
        "Several students reported that items from their lunches were disappearing during the week",
        "Ms. Rodriguez investigated by asking questions and watching the classroom at different times",
        "She discovered a gray squirrel entering through a loose window screen",
        "The squirrel was taking snacks from lunch boxes and bringing them to its nest outside"
      ],
      foils: [
        "Lincoln Middle School had problems with its cafeteria food being low quality",
        "Students at the school were not allowed to bring homemade food items"
      ],
      vocabulary: [
        {
          word: "suspicious",
          sentence: "By Thursday, five different students had lost parts of their lunches, and everyone was getting frustrated and suspicious of each other.",
          question: "What does 'suspicious' mean in this context?",
          hint1: "The students were starting to think someone was taking their food on purpose.",
          hint2: "This word describes the feeling when you think someone might be doing something wrong.",
          choices: [
            "having doubts about someone and thinking they might be doing something wrong",
            "feeling very angry and wanting to start an argument",
            "being confused and not understanding what is happening"
          ],
          correct: 0
        },
        {
          word: "investigate",
          sentence: "Ms. Rodriguez, the homeroom teacher, decided to investigate.",
          question: "What does 'investigate' mean?",
          hint1: "Ms. Rodriguez wanted to find out what was really happening to the lunches.",
          hint2: "This means to carefully examine and search for information to solve a problem.",
          choices: [
            "to examine carefully and search for information to solve a mystery or problem",
            "to punish students who have broken classroom rules",
            "to ask parents to provide different types of lunch foods"
          ],
          correct: 0
        },
        {
          word: "culprit",
          sentence: "That's when she spotted the real culprit - a clever gray squirrel that had found a way into the classroom.",
          question: "Who or what is the 'culprit'?",
          hint1: "This is whoever or whatever was actually causing the problem.",
          hint2: "The culprit is the one responsible for taking the lunch items.",
          choices: [
            "the person or thing responsible for causing a problem or crime",
            "an innocent bystander who happened to see what occurred",
            "a witness who can provide information about what happened"
          ],
          correct: 0
        }
      ]
    },
    {
      title: "Building the Perfect Model Bridge",
      text: `In Mr. Chen's engineering class, students were challenged to build a model bridge using only popsicle sticks, glue, and string. The bridge had to span a 12-inch gap and hold as much weight as possible without breaking. Sarah and her partner Tom spent their first day researching different types of bridge designs online and in the school library. They discovered that truss bridges, with their triangular support structures, were often the strongest for their weight.

For the next week, Sarah and Tom worked carefully during each class period. They cut popsicle sticks to precise lengths and glued them together to form triangular trusses. The most challenging part was making sure all the joints were perfectly aligned and securely glued. Tom was naturally good with detailed work, while Sarah excelled at planning and measuring. They made several mistakes along the way and had to rebuild sections, but they learned from each error and made their bridge stronger.

On testing day, students placed their bridges across two desks and slowly added weights until the bridges collapsed. Many bridges broke under just a few pounds, but Sarah and Tom's bridge held an impressive 15 pounds before finally giving way. Their careful research, precise construction, and teamwork had paid off. Mr. Chen praised their bridge as an excellent example of engineering principles in action, and Sarah felt proud of what they had accomplished together.`,
      mainIdea: "Sarah and Tom successfully built a strong model bridge by researching designs, working carefully together, and learning from their mistakes.",
      details: [
        "They researched different bridge designs and chose truss bridges with triangular supports",
        "They worked carefully for a week, cutting sticks to precise lengths and gluing triangular trusses",
        "Tom was good with detailed work while Sarah excelled at planning and measuring",
        "Their bridge held 15 pounds, much more than most other bridges in the class"
      ],
      foils: [
        "Mr. Chen's engineering class was the most difficult class at the school",
        "Popsicle sticks are the cheapest building material available for student projects"
      ],
      vocabulary: [
        {
          word: "span",
          sentence: "The bridge had to span a 12-inch gap and hold as much weight as possible without breaking.",
          question: "What does 'span' mean in this sentence?",
          hint1: "The bridge needed to go from one side to the other side of something.",
          hint2: "This means to extend across or bridge a distance or gap.",
          choices: [
            "extend across or bridge a distance between two points",
            "measure the exact length of something using a ruler",
            "break apart or collapse under too much pressure"
          ],
          correct: 0
        },
        {
          word: "precise",
          sentence: "They cut popsicle sticks to precise lengths and glued them together to form triangular trusses.",
          question: "What does 'precise' mean?",
          hint1: "Sarah and Tom were very careful about making exact measurements.",
          hint2: "This word means exact and accurate, with no mistakes in measurement.",
          choices: [
            "exact and accurate, with careful attention to correct measurements",
            "approximately correct but not exactly perfect",
            "quick and efficient, done as fast as possible"
          ],
          correct: 0
        },
        {
          word: "principles",
          sentence: "Mr. Chen praised their bridge as an excellent example of engineering principles in action.",
          question: "What are 'principles' in this context?",
          hint1: "These are the basic rules and ideas that engineers use when building things.",
          hint2: "Principles are fundamental concepts or rules that guide how something should be done.",
          choices: [
            "basic rules, concepts, or guidelines that form the foundation of a subject",
            "expensive tools and equipment needed for construction projects",
            "specific measurements that must be followed exactly in all projects"
          ],
          correct: 0
        }
      ]
    },
    {
      title: "The Community Service Project",
      text: `When Jamal's social studies teacher announced that each student needed to complete 20 hours of community service, Jamal wasn't sure where to start. He had never done volunteer work before and felt overwhelmed by all the options. His teacher provided a list of local organizations that welcomed student volunteers, including the animal shelter, food bank, library, and senior center. After thinking about his interests, Jamal decided he wanted to work somewhere he could make a direct difference in people's lives.

Jamal chose to volunteer at the Riverside Senior Center, where he would spend time with elderly residents who didn't get many visitors. On his first day, he was nervous about talking to people he didn't know, especially older adults. However, the activity coordinator, Mrs. Patterson, was very welcoming and introduced him to several residents. Jamal discovered that many of them had fascinating stories about their lives and careers. He began visiting twice a week, playing board games, helping with simple crafts, and mostly just listening to their experiences.

By the end of his 20 hours, Jamal had formed genuine friendships with several residents, particularly Mr. Willis, a retired teacher who shared Jamal's love of basketball. Jamal realized that while he had come to fulfill a school requirement, he had gained something much more valuable - the understanding that helping others also enriches your own life. He decided to continue volunteering at the senior center even after completing his required hours, and he encouraged his friends to find their own community service opportunities.`,
      mainIdea: "Jamal completed his community service requirement by volunteering at a senior center and discovered that helping others was personally rewarding.",
      details: [
        "Jamal chose to volunteer at the Riverside Senior Center to work directly with people",
        "He spent time playing games, helping with crafts, and listening to residents' stories",
        "He formed genuine friendships, especially with Mr. Willis, a retired teacher",
        "Jamal decided to continue volunteering even after completing his required 20 hours"
      ],
      foils: [
        "The social studies teacher gave students a very challenging assignment about community problems",
        "Most students preferred to volunteer at the animal shelter because it was more fun"
      ],
      vocabulary: [
        {
          word: "overwhelmed",
          sentence: "He had never done volunteer work before and felt overwhelmed by all the options.",
          question: "What does 'overwhelmed' mean?",
          hint1: "Jamal had too many choices and didn't know how to decide.",
          hint2: "This feeling happens when there's too much to handle or think about at once.",
          choices: [
            "feeling like there's too much to handle or deal with at once",
            "feeling very excited and eager to get started on something",
            "feeling bored because there aren't enough interesting choices"
          ],
          correct: 0
        },
        {
          word: "genuine",
          sentence: "By the end of his 20 hours, Jamal had formed genuine friendships with several residents.",
          question: "What does 'genuine' mean in this context?",
          hint1: "These friendships were real and sincere, not fake or pretend.",
          hint2: "This word describes something that is authentic and truly felt.",
          choices: [
            "real, sincere, and authentic",
            "temporary and likely to end soon",
            "polite but not very deep or meaningful"
          ],
          correct: 0
        },
        {
          word: "enriches",
          sentence: "He realized that while he had come to fulfill a school requirement, he had gained something much more valuable - the understanding that helping others also enriches your own life.",
          question: "What does 'enriches' mean?",
          hint1: "Helping others made Jamal's life better and more meaningful in some way.",
          hint2: "This means to make something better, fuller, or more valuable.",
          choices: [
            "makes something better, more meaningful, or more valuable",
            "makes something more difficult and complicated",
            "makes something cost more money than before"
          ],
          correct: 0
        }
      ]
    }
  ];

  const loadStory = (index) => {
    setCurrentStory(index);
    resetMainIdeaActivity();
    setVocabFeedback({});
  };

  const resetMainIdeaActivity = () => {
    setMainIdeaFeedback({ show: false, success: false, message: '' });
    // Reset drag and drop state
    const choicesBank = document.getElementById('choicesBank');
    const mainIdeaZone = document.getElementById('mainIdeaZone');
    const detailsZone = document.getElementById('detailsZone');

    if (choicesBank && mainIdeaZone && detailsZone) {
      // Move all items back to bank
      const allChoices = document.querySelectorAll('.draggable-choice');
      allChoices.forEach(choice => {
        choice.classList.remove('placed', 'incorrect');
        choicesBank.appendChild(choice);
      });

      // Reset zones
      mainIdeaZone.innerHTML = '<div class="empty-zone-message">Drag the main idea here<br/>(What is this story mostly about?)</div>';
      detailsZone.innerHTML = '<div class="empty-zone-message">Drag 3 supporting details here<br/>(What specific facts support the main idea?)</div>';
    }
  };

  const resetActivity = () => {
    if (currentActivity === 'main-idea') {
      resetMainIdeaActivity();
    } else {
      setVocabFeedback({});
    }
  };

  const showActivity = (activityType) => {
    setCurrentActivity(activityType);
    if (activityType === 'main-idea') {
      setVocabFeedback({});
    }
  };

  const checkMainIdea = () => {
    const mainIdeaZone = document.getElementById('mainIdeaZone');
    const detailsZone = document.getElementById('detailsZone');

    if (!mainIdeaZone || !detailsZone) return;

    const mainIdeaItems = mainIdeaZone.querySelectorAll('.draggable-choice');
    const detailItems = detailsZone.querySelectorAll('.draggable-choice');

    let correct = 0;
    let total = 0;
    let feedback = [];

    // Check main idea
    if (mainIdeaItems.length === 0) {
      feedback.push("You need to put one statement in the Main Idea box.");
    } else if (mainIdeaItems.length > 1) {
      feedback.push("The Main Idea box should only have one statement.");
    } else {
      total++;
      const item = mainIdeaItems[0];
      if (item.dataset.type === 'main-idea') {
        correct++;
        item.classList.remove('incorrect');
        item.classList.add('placed');
      } else {
        item.classList.add('incorrect');
        feedback.push("The statement in the Main Idea box is not the main idea of the story.");
      }
    }

    // Check details
    if (detailItems.length < 3) {
      feedback.push(`You need to put 3 supporting details in the Details box. You have ${detailItems.length}.`);
    } else {
      detailItems.forEach(item => {
        total++;
        if (item.dataset.type === 'detail') {
          correct++;
          item.classList.remove('incorrect');
          item.classList.add('placed');
        } else {
          item.classList.add('incorrect');
          if (item.dataset.type === 'main-idea') {
            feedback.push("The main idea belongs in the Main Idea box, not the Details box.");
          } else {
            feedback.push(`"${item.textContent.substring(0, 30)}..." is not a supporting detail from the story.`);
          }
        }
      });
    }

    if (correct === 4 && total === 4) {
      setMainIdeaFeedback({
        show: true,
        success: true,
        message: `🎉 Excellent work! You correctly identified the main idea and all 3 supporting details! You have great reading comprehension skills.`
      });
    } else {
      setMainIdeaFeedback({
        show: true,
        success: false,
        message: `Score: ${correct} out of 4 correct. ${feedback.join(' ')} Remember: The main idea is what the story is mostly about. Supporting details are specific facts that help explain or support the main idea.`
      });
    }
  };

  const showHint = (vocabIndex, hintNumber) => {
    const hintBox = document.getElementById(`hint${hintNumber}_${vocabIndex}`);
    if (hintBox) {
      hintBox.classList.add('show');
    }

    if (hintNumber === 1) {
      const hint2Btn = document.getElementById(`hint2Btn_${vocabIndex}`);
      if (hint2Btn) hint2Btn.style.display = 'inline-block';
    } else if (hintNumber === 2) {
      const choices = document.getElementById(`choices_${vocabIndex}`);
      if (choices) choices.classList.add('show');
    }
  };

  const checkVocabAnswer = (vocabIndex) => {
    const input = document.getElementById(`vocab_${vocabIndex}`);
    if (!input) return;

    const story = stories[currentStory];
    const vocabItem = story.vocabulary[vocabIndex];
    const correctAnswer = vocabItem.choices[vocabItem.correct];

    if (input.value.trim() === '') {
      setVocabFeedback({
        ...vocabFeedback,
        [vocabIndex]: { success: false, message: 'Please type your answer first!' }
      });
      return;
    }

    setVocabFeedback({
      ...vocabFeedback,
      [vocabIndex]: {
        success: true,
        message: `Your answer: "${input.value}" | Sample correct answer: "${correctAnswer}" | Great job thinking about the context! Discuss your answer with your teacher to see how close you were.`
      }
    });
  };

  const checkMultipleChoice = (vocabIndex) => {
    const selected = document.querySelector(`[data-vocab="${vocabIndex}"].selected`);
    if (!selected) {
      setVocabFeedback({
        ...vocabFeedback,
        [vocabIndex]: { success: false, message: 'Please select an answer first!' }
      });
      return;
    }

    const story = stories[currentStory];
    const vocabItem = story.vocabulary[vocabIndex];
    const choiceIndex = parseInt(selected.dataset.choice);
    const isCorrect = choiceIndex === vocabItem.correct;

    // Update choice styling
    document.querySelectorAll(`[data-vocab="${vocabIndex}"]`).forEach(option => {
      const optionIndex = parseInt(option.dataset.choice);
      option.classList.remove('correct', 'incorrect', 'selected');
      if (optionIndex === vocabItem.correct) {
        option.classList.add('correct');
      } else if (optionIndex === choiceIndex && !isCorrect) {
        option.classList.add('incorrect');
      }
    });

    setVocabFeedback({
      ...vocabFeedback,
      [vocabIndex]: {
        success: isCorrect,
        message: isCorrect
          ? '🎉 Correct! You used the context clues well to figure out the meaning.'
          : 'Not quite. The correct answer is highlighted in green. Look at the context clues in the sentence to see why that answer makes the most sense.'
      }
    });
  };

  const handleChoiceClick = (vocabIndex, choiceIndex) => {
    document.querySelectorAll(`[data-vocab="${vocabIndex}"]`).forEach(opt => opt.classList.remove('selected'));
    document.querySelector(`[data-vocab="${vocabIndex}"][data-choice="${choiceIndex}"]`)?.classList.add('selected');
  };

  // Drag and drop handlers
  const handleDragStart = (e) => {
    setDraggedElement(e.target);
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedElement(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      e.currentTarget.classList.remove('drag-over');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    if (!draggedElement) return;

    const zoneContent = e.currentTarget.querySelector('.zone-content');
    const zoneType = e.currentTarget.dataset.zone;

    // Check limits
    if (zoneType === 'details') {
      const currentItems = zoneContent.querySelectorAll('.draggable-choice');
      if (currentItems.length >= 3) {
        alert('The Details zone can only hold 3 items. Remove one first if you want to add a different one.');
        return;
      }
    }

    if (zoneType === 'main-idea') {
      const currentItems = zoneContent.querySelectorAll('.draggable-choice');
      if (currentItems.length >= 1) {
        alert('The Main Idea zone can only hold 1 item. Remove it first if you want to add a different one.');
        return;
      }
    }

    draggedElement.remove();
    zoneContent.appendChild(draggedElement);
    draggedElement.classList.add('placed');
    draggedElement.classList.remove('incorrect');
    updateEmptyMessages();
  };

  const updateEmptyMessages = () => {
    ['mainIdeaZone', 'detailsZone'].forEach(zoneId => {
      const zone = document.getElementById(zoneId);
      if (!zone) return;
      const message = zone.querySelector('.empty-zone-message');
      const items = zone.querySelectorAll('.draggable-choice');
      if (message) message.style.display = items.length > 0 ? 'none' : 'block';
    });
  };

  useEffect(() => {
    // Initialize main idea activity when story changes
    if (currentActivity === 'main-idea') {
      setTimeout(() => {
        const story = stories[currentStory];
        const choicesBank = document.getElementById('choicesBank');

        if (choicesBank) {
          choicesBank.innerHTML = '';

          // Create all choices and shuffle
          const allChoices = [
            { text: story.mainIdea, type: 'main-idea' },
            ...story.details.map(detail => ({ text: detail, type: 'detail' })),
            ...story.foils.map(foil => ({ text: foil, type: 'foil' }))
          ].sort(() => Math.random() - 0.5);

          allChoices.forEach((choice, index) => {
            const element = document.createElement('div');
            element.className = 'draggable-choice';
            element.draggable = true;
            element.textContent = choice.text;
            element.dataset.type = choice.type;
            element.dataset.index = index;

            element.addEventListener('dragstart', handleDragStart);
            element.addEventListener('dragend', handleDragEnd);

            choicesBank.appendChild(element);
          });
        }
      }, 100);
    }
  }, [currentStory, currentActivity]);

  const story = stories[currentStory];

  return (
    <div className="reading-comprehension">
      {/* Header */}
      <header className="activity-header">
        <div className="header-content">
          <h1>📚 Reading Comprehension Practice</h1>
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
          {stories.map((_, index) => (
            <button
              key={index}
              className={`story-btn ${index === currentStory ? 'active' : ''}`}
              onClick={() => loadStory(index)}
            >
              Story {index + 1}
            </button>
          ))}
        </div>

        <div className="activity-container">
          <div className="story-header">
            <h2 className="story-title">{story.title}</h2>
          </div>

          {/* Activity Toggle */}
          <div className="activity-toggle">
            <button
              className={`toggle-btn ${currentActivity === 'main-idea' ? 'active' : ''}`}
              onClick={() => showActivity('main-idea')}
            >
              📝 Main Idea & Details
            </button>
            <button
              className={`toggle-btn ${currentActivity === 'vocabulary' ? 'active' : ''}`}
              onClick={() => showActivity('vocabulary')}
            >
              📖 Vocabulary
            </button>
          </div>

          {/* Story Text */}
          <div className="story-text">
            {story.text.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          {/* Main Idea Activity */}
          {currentActivity === 'main-idea' && (
            <div className="activity-section active">
              <div className="main-idea-activity">
                <div className="choices-bank">
                  <h3>📝 Drag the Statements</h3>
                  <div id="choicesBank"></div>
                </div>

                <div className="drop-zones">
                  <div
                    className="drop-zone main-idea-zone"
                    data-zone="main-idea"
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <h3>🎯 Main Idea</h3>
                    <div className="zone-content" id="mainIdeaZone">
                      <div className="empty-zone-message">
                        Drag the main idea here<br/>(What is this story mostly about?)
                      </div>
                    </div>
                  </div>

                  <div
                    className="drop-zone details-zone"
                    data-zone="details"
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <h3>📋 Supporting Details</h3>
                    <div className="zone-content" id="detailsZone">
                      <div className="empty-zone-message">
                        Drag 3 supporting details here<br/>(What specific facts support the main idea?)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button onClick={checkMainIdea} className="primary check-btn">
                ✓ Check My Work
              </button>

              {mainIdeaFeedback.show && (
                <div className={`feedback ${mainIdeaFeedback.success ? 'success' : 'error'}`}>
                  <p>{mainIdeaFeedback.message}</p>
                </div>
              )}
            </div>
          )}

          {/* Vocabulary Activity */}
          {currentActivity === 'vocabulary' && (
            <div className="activity-section active">
              <div className="vocab-activity">
                {story.vocabulary.map((vocabItem, index) => (
                  <div key={index} className="vocab-word">
                    <div className="vocab-word-title">Word {index + 1}: "{vocabItem.word}"</div>

                    <div className="vocab-sentence">
                      {vocabItem.sentence.split(vocabItem.word).map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span className="vocab-target">{vocabItem.word}</span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="vocab-question">{vocabItem.question}</div>

                    <textarea
                      className="vocab-input"
                      id={`vocab_${index}`}
                      placeholder="Type what you think this word means..."
                    />

                    <div className="vocab-help-section">
                      <button className="warning" onClick={() => showHint(index, 1)}>
                        💡 I need help
                      </button>
                      <button
                        className="warning"
                        onClick={() => showHint(index, 2)}
                        style={{ display: 'none' }}
                        id={`hint2Btn_${index}`}
                      >
                        💡 More help
                      </button>
                      <button className="primary" onClick={() => checkVocabAnswer(index)}>
                        ✓ Check Answer
                      </button>
                    </div>

                    <div className="hint-box" id={`hint1_${index}`}>
                      <h4>💡 Hint 1:</h4>
                      <p>{vocabItem.hint1}</p>
                    </div>

                    <div className="hint-box" id={`hint2_${index}`}>
                      <h4>💡 Hint 2:</h4>
                      <p>{vocabItem.hint2}</p>
                    </div>

                    <div className="multiple-choice" id={`choices_${index}`}>
                      <h4>Choose the best definition:</h4>
                      {vocabItem.choices.map((choice, choiceIndex) => (
                        <div
                          key={choiceIndex}
                          className="choice-option"
                          data-vocab={index}
                          data-choice={choiceIndex}
                          onClick={() => handleChoiceClick(index, choiceIndex)}
                        >
                          {choice}
                        </div>
                      ))}
                      <button
                        className="primary"
                        onClick={() => checkMultipleChoice(index)}
                        style={{ marginTop: '10px' }}
                      >
                        Check Selected Answer
                      </button>
                    </div>

                    {vocabFeedback[index] && (
                      <div className={`feedback ${vocabFeedback[index].success ? 'success' : 'error'}`}>
                        <strong>{vocabFeedback[index].message}</strong>
                      </div>
                    )}
                  </div>
                ))}
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

export default ReadingComprehension;