import React, { useState, useEffect, useMemo } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './CompareContrast.css';

const defaultActivities = [
  {
    topic: 'Cats vs Dogs',
    item1: 'Cats',
    item2: 'Dogs',
    items: [
      { text: 'Have fur', type: 'similarity' },
      { text: 'Are pets', type: 'similarity' },
      { text: 'Need food and water daily', type: 'similarity' },
      { text: 'Can be trained', type: 'similarity' },
      { text: 'Make purring and meowing sounds', type: 'item1' },
      { text: 'Use litter boxes indoors', type: 'item1' },
      { text: 'Are more independent', type: 'item1' },
      { text: 'Can climb trees easily', type: 'item1' },
      { text: 'Make barking and howling sounds', type: 'item2' },
      { text: 'Need daily walks outside', type: 'item2' },
      { text: 'Are more social with strangers', type: 'item2' },
      { text: 'Can be trained to fetch objects', type: 'item2' }
    ],
    easyItems: [
      { text: 'Have fur', type: 'similarity' },
      { text: 'Are pets', type: 'similarity' },
      { text: 'Say meow', type: 'item1' },
      { text: 'Use a litter box', type: 'item1' },
      { text: 'Say woof', type: 'item2' },
      { text: 'Go for walks', type: 'item2' }
    ]
  },
  {
    topic: 'Summer vs Winter',
    item1: 'Summer',
    item2: 'Winter',
    items: [
      { text: 'A season of the year', type: 'similarity' },
      { text: 'Last about 3 months', type: 'similarity' },
      { text: 'People wear different clothes in each', type: 'similarity' },
      { text: 'Have special holidays', type: 'similarity' },
      { text: 'Has hot temperatures', type: 'item1' },
      { text: 'Swimming is popular', type: 'item1' },
      { text: 'Has long daylight hours', type: 'item1' },
      { text: 'School is usually out', type: 'item1' },
      { text: 'Has cold temperatures', type: 'item2' },
      { text: 'Snow and ice are common', type: 'item2' },
      { text: 'Has short daylight hours', type: 'item2' },
      { text: 'Heating bills are higher', type: 'item2' }
    ],
    easyItems: [
      { text: 'Are seasons', type: 'similarity' },
      { text: 'Have holidays', type: 'similarity' },
      { text: 'Is hot', type: 'item1' },
      { text: 'Go swimming', type: 'item1' },
      { text: 'Is cold', type: 'item2' },
      { text: 'Has snow', type: 'item2' }
    ]
  },
  {
    topic: 'Books vs Movies',
    item1: 'Books',
    item2: 'Movies',
    items: [
      { text: 'Tell stories with characters', type: 'similarity' },
      { text: 'Can be entertaining', type: 'similarity' },
      { text: 'Can be fiction or non-fiction', type: 'similarity' },
      { text: 'Can make you feel emotions', type: 'similarity' },
      { text: 'Use only words and imagination', type: 'item1' },
      { text: 'Can take days or weeks to finish', type: 'item1' },
      { text: 'You can read at your own pace', type: 'item1' },
      { text: 'Are portable and lightweight', type: 'item1' },
      { text: 'Have visual effects and sounds', type: 'item2' },
      { text: 'Usually last 1-3 hours', type: 'item2' },
      { text: 'Have actors and directors', type: 'item2' },
      { text: 'Can be watched with others', type: 'item2' }
    ],
    easyItems: [
      { text: 'Tell stories', type: 'similarity' },
      { text: 'Can be fun', type: 'similarity' },
      { text: 'You read them', type: 'item1' },
      { text: 'Have pages', type: 'item1' },
      { text: 'You watch them', type: 'item2' },
      { text: 'Have actors', type: 'item2' }
    ]
  },
  {
    topic: 'City vs Country',
    item1: 'City',
    item2: 'Country',
    items: [
      { text: 'Have people and families', type: 'similarity' },
      { text: 'Need electricity and water', type: 'similarity' },
      { text: 'Have schools and stores', type: 'similarity' },
      { text: 'Have their own advantages', type: 'similarity' },
      { text: 'Has more traffic and noise', type: 'item1' },
      { text: 'Has taller buildings', type: 'item1' },
      { text: 'Has more job opportunities', type: 'item1' },
      { text: 'Has public transportation', type: 'item1' },
      { text: 'Has more nature and animals', type: 'item2' },
      { text: 'Has cleaner air and water', type: 'item2' },
      { text: 'Has more space between homes', type: 'item2' },
      { text: 'Has lower cost of living', type: 'item2' }
    ],
    easyItems: [
      { text: 'Have people', type: 'similarity' },
      { text: 'Have schools', type: 'similarity' },
      { text: 'Many tall buildings', type: 'item1' },
      { text: 'Lots of traffic', type: 'item1' },
      { text: 'Has farms', type: 'item2' },
      { text: 'Lots of nature', type: 'item2' }
    ]
  },
  {
    topic: 'Email vs Letters',
    item1: 'Email',
    item2: 'Letters',
    items: [
      { text: 'Send messages to people', type: 'similarity' },
      { text: 'Have sender and receiver', type: 'similarity' },
      { text: 'Can be personal or business', type: 'similarity' },
      { text: 'Communicate across distances', type: 'similarity' },
      { text: 'Is sent instantly', type: 'item1' },
      { text: 'Needs internet connection', type: 'item1' },
      { text: 'Can include file attachments', type: 'item1' },
      { text: 'Is stored digitally', type: 'item1' },
      { text: 'Takes days to arrive', type: 'item2' },
      { text: 'Uses paper and stamps', type: 'item2' },
      { text: 'Can be kept as physical object', type: 'item2' },
      { text: 'Has handwritten personal touch', type: 'item2' }
    ],
    easyItems: [
      { text: 'Send messages', type: 'similarity' },
      { text: 'Have words', type: 'similarity' },
      { text: 'Is fast', type: 'item1' },
      { text: 'Use a computer', type: 'item1' },
      { text: 'Is slow', type: 'item2' },
      { text: 'Use paper', type: 'item2' }
    ]
  },
  {
    topic: 'Pizza vs Hamburger',
    item1: 'Pizza',
    item2: 'Hamburger',
    items: [
      { text: 'Are popular foods', type: 'similarity' },
      { text: 'Can have cheese', type: 'similarity' },
      { text: 'Are served at restaurants', type: 'similarity' },
      { text: 'Can have different toppings', type: 'similarity' },
      { text: 'Has a flat dough crust', type: 'item1' },
      { text: 'Is cut into slices', type: 'item1' },
      { text: 'Often has tomato sauce', type: 'item1' },
      { text: 'Can be shared with many people', type: 'item1' },
      { text: 'Has a round bun', type: 'item2' },
      { text: 'Is eaten like a sandwich', type: 'item2' },
      { text: 'Has a beef patty', type: 'item2' },
      { text: 'Is usually for one person', type: 'item2' }
    ],
    easyItems: [
      { text: 'Are food', type: 'similarity' },
      { text: 'Can have cheese', type: 'similarity' },
      { text: 'Is round and flat', type: 'item1' },
      { text: 'Cut into slices', type: 'item1' },
      { text: 'Has a bun', type: 'item2' },
      { text: 'Has meat', type: 'item2' }
    ]
  },
  {
    topic: 'Ocean vs Lake',
    item1: 'Ocean',
    item2: 'Lake',
    items: [
      { text: 'Have water', type: 'similarity' },
      { text: 'Have fish and animals', type: 'similarity' },
      { text: 'Can be used for swimming', type: 'similarity' },
      { text: 'Have waves and movement', type: 'similarity' },
      { text: 'Has salt water', type: 'item1' },
      { text: 'Is very large and deep', type: 'item1' },
      { text: 'Connects to other oceans', type: 'item1' },
      { text: 'Has tides from the moon', type: 'item1' },
      { text: 'Has fresh water', type: 'item2' },
      { text: 'Is smaller and shallower', type: 'item2' },
      { text: 'Is surrounded by land', type: 'item2' },
      { text: 'Can freeze in winter', type: 'item2' }
    ],
    easyItems: [
      { text: 'Have water', type: 'similarity' },
      { text: 'Have fish', type: 'similarity' },
      { text: 'Very big', type: 'item1' },
      { text: 'Salty water', type: 'item1' },
      { text: 'Smaller', type: 'item2' },
      { text: 'Fresh water', type: 'item2' }
    ]
  },
  {
    topic: 'Teacher vs Doctor',
    item1: 'Teacher',
    item2: 'Doctor',
    items: [
      { text: 'Help people', type: 'similarity' },
      { text: 'Went to college', type: 'similarity' },
      { text: 'Important jobs', type: 'similarity' },
      { text: 'Work with different people each day', type: 'similarity' },
      { text: 'Works in a school', type: 'item1' },
      { text: 'Helps students learn', type: 'item1' },
      { text: 'Gives tests and homework', type: 'item1' },
      { text: 'Uses books and supplies', type: 'item1' },
      { text: 'Works in a hospital or office', type: 'item2' },
      { text: 'Helps sick people', type: 'item2' },
      { text: 'Uses medical tools', type: 'item2' },
      { text: 'Gives medicine', type: 'item2' }
    ],
    easyItems: [
      { text: 'Help people', type: 'similarity' },
      { text: 'Important jobs', type: 'similarity' },
      { text: 'Works at school', type: 'item1' },
      { text: 'Teaches kids', type: 'item1' },
      { text: 'Works at hospital', type: 'item2' },
      { text: 'Helps sick people', type: 'item2' }
    ]
  },
  {
    topic: 'Bicycle vs Car',
    item1: 'Bicycle',
    item2: 'Car',
    items: [
      { text: 'Transportation', type: 'similarity' },
      { text: 'Have wheels', type: 'similarity' },
      { text: 'Can go on roads', type: 'similarity' },
      { text: 'Need to follow traffic rules', type: 'similarity' },
      { text: 'Uses pedals for power', type: 'item1' },
      { text: 'Has two wheels', type: 'item1' },
      { text: 'Is good for exercise', type: 'item1' },
      { text: "Doesn't need fuel", type: 'item1' },
      { text: 'Uses an engine for power', type: 'item2' },
      { text: 'Has four wheels', type: 'item2' },
      { text: 'Can carry many people', type: 'item2' },
      { text: 'Needs gasoline or electricity', type: 'item2' }
    ],
    easyItems: [
      { text: 'Have wheels', type: 'similarity' },
      { text: 'Move people', type: 'similarity' },
      { text: 'Has pedals', type: 'item1' },
      { text: 'Two wheels', type: 'item1' },
      { text: 'Has an engine', type: 'item2' },
      { text: 'Four wheels', type: 'item2' }
    ]
  },
  {
    topic: 'Apple vs Orange',
    item1: 'Apple',
    item2: 'Orange',
    items: [
      { text: 'Fruits', type: 'similarity' },
      { text: 'Healthy snacks', type: 'similarity' },
      { text: 'Grow on trees', type: 'similarity' },
      { text: 'Have seeds inside', type: 'similarity' },
      { text: 'Can be red, green, or yellow', type: 'item1' },
      { text: 'Has smooth, thin skin', type: 'item1' },
      { text: 'You eat the skin', type: 'item1' },
      { text: 'Is crunchy', type: 'item1' },
      { text: 'Is orange colored', type: 'item2' },
      { text: 'Has bumpy, thick peel', type: 'item2' },
      { text: 'You peel it first', type: 'item2' },
      { text: 'Is juicy and soft', type: 'item2' }
    ],
    easyItems: [
      { text: 'Are fruits', type: 'similarity' },
      { text: 'Are healthy', type: 'similarity' },
      { text: 'Is crunchy', type: 'item1' },
      { text: 'Eat the skin', type: 'item1' },
      { text: 'Is juicy', type: 'item2' },
      { text: 'Peel it first', type: 'item2' }
    ]
  },
  {
    topic: 'Soccer vs Basketball',
    item1: 'Soccer',
    item2: 'Basketball',
    items: [
      { text: 'Team sports', type: 'similarity' },
      { text: 'Use a ball', type: 'similarity' },
      { text: 'Have goals to score', type: 'similarity' },
      { text: 'Need practice to improve', type: 'similarity' },
      { text: 'You kick the ball', type: 'item1' },
      { text: 'Play on a large grass field', type: 'item1' },
      { text: 'Has two big nets', type: 'item1' },
      { text: "Can't use your hands", type: 'item1' },
      { text: 'You bounce and throw the ball', type: 'item2' },
      { text: 'Play on a small indoor court', type: 'item2' },
      { text: 'Has two tall hoops', type: 'item2' },
      { text: "Can't kick the ball", type: 'item2' }
    ],
    easyItems: [
      { text: 'Are sports', type: 'similarity' },
      { text: 'Use a ball', type: 'similarity' },
      { text: 'Kick the ball', type: 'item1' },
      { text: 'Play on grass', type: 'item1' },
      { text: 'Throw the ball', type: 'item2' },
      { text: 'Play inside', type: 'item2' }
    ]
  }
];

const CompareContrast = ({
  customActivities,
  headerTitle = '⚖️ Compare & Contrast',
  instructions,
  showDifficultyToggle = true,
  defaultDifficulty = 'easy',
  activityCounterLabel = 'Activity'
}) => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [draggedElement, setDraggedElement] = useState(null);
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(defaultDifficulty);

  const iconManager = useIconManager();

  const activities = useMemo(() => {
    if (customActivities && customActivities.length > 0) {
      return customActivities;
    }
    return defaultActivities;
  }, [customActivities]);

  const initializeActivity = (activityIndex) => {
    if (!activities.length) return;

    const boundedIndex = Math.max(0, Math.min(activityIndex, activities.length - 1));
    setCurrentActivity(boundedIndex);
    setFeedback({ show: false, success: false, message: '' });

    setTimeout(() => {
      const activity = activities[boundedIndex];
      if (!activity) return;

      const itemBank = document.getElementById('itemBank');
      const similarityZone = document.getElementById('similarityZone');
      const item1Zone = document.getElementById('item1Zone');
      const item2Zone = document.getElementById('item2Zone');

      if (itemBank) itemBank.innerHTML = '';
      if (similarityZone) {
        similarityZone.innerHTML = '';
        const message = document.createElement('div');
        message.className = 'empty-zone-message';
        message.textContent = `Shared traits between ${activity.item1} and ${activity.item2}`;
        similarityZone.appendChild(message);
      }
      if (item1Zone) {
        item1Zone.innerHTML = '';
        const message = document.createElement('div');
        message.className = 'empty-zone-message';
        message.textContent = `Unique to ${activity.item1.toLowerCase()}`;
        item1Zone.appendChild(message);
      }
      if (item2Zone) {
        item2Zone.innerHTML = '';
        const message = document.createElement('div');
        message.className = 'empty-zone-message';
        message.textContent = `Unique to ${activity.item2.toLowerCase()}`;
        item2Zone.appendChild(message);
      }

      const itemsToUse = difficulty === 'easy' && activity.easyItems?.length
        ? activity.easyItems
        : activity.items || [];
      const shuffledItems = [...itemsToUse].sort(() => Math.random() - 0.5);

      shuffledItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'draggable-item';
        itemElement.draggable = true;
        itemElement.textContent = item.text;
        itemElement.dataset.type = item.type;
        itemElement.dataset.index = index.toString();

        itemElement.addEventListener('dragstart', handleDragStart);
        itemElement.addEventListener('dragend', handleDragEnd);

        if (itemBank) itemBank.appendChild(itemElement);
      });

      updateEmptyMessages();
    }, 50);
  };

  useEffect(() => {
    setCurrentActivity(0);
    setDifficulty(defaultDifficulty);
    setFeedback({ show: false, success: false, message: '' });
  }, [activities, defaultDifficulty]);

  useEffect(() => {
    initializeActivity(currentActivity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, currentActivity, difficulty]);

  const resetActivity = () => {
    initializeActivity(currentActivity);
  };

  const nextActivity = () => {
    if (currentActivity < activities.length - 1) {
      initializeActivity(currentActivity + 1);
    }
  };

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

    const dropZone = e.currentTarget;
    draggedElement.remove();
    dropZone.appendChild(draggedElement);
    draggedElement.classList.add('placed');
    draggedElement.classList.remove('incorrect');
    updateEmptyMessages();
  };

  const updateEmptyMessages = () => {
    ['similarityZone', 'item1Zone', 'item2Zone'].forEach(zoneId => {
      const zone = document.getElementById(zoneId);
      if (!zone) return;
      const message = zone.querySelector('.empty-zone-message');
      const items = zone.querySelectorAll('.draggable-item');
      if (message) message.style.display = items.length > 0 ? 'none' : 'block';
    });
  };

  const checkAnswers = () => {
    const similarityZone = document.getElementById('similarityZone');
    const item1Zone = document.getElementById('item1Zone');
    const item2Zone = document.getElementById('item2Zone');

    if (!similarityZone || !item1Zone || !item2Zone) return;

    const similarityItems = similarityZone.querySelectorAll('.draggable-item');
    const item1Items = item1Zone.querySelectorAll('.draggable-item');
    const item2Items = item2Zone.querySelectorAll('.draggable-item');

    let correct = 0;
    let total = 0;
    const feedbackMessages = [];

    similarityItems.forEach(item => {
      total++;
      if (item.dataset.type === 'similarity') {
        correct++;
        item.classList.remove('incorrect');
        item.classList.add('placed');
      } else {
        item.classList.add('incorrect');
        feedbackMessages.push(`"${item.textContent.substring(0, 30)}..." belongs in a different category.`);
      }
    });

    item1Items.forEach(item => {
      total++;
      if (item.dataset.type === 'item1') {
        correct++;
        item.classList.remove('incorrect');
        item.classList.add('placed');
      } else {
        item.classList.add('incorrect');
        if (item.dataset.type === 'similarity') {
          feedbackMessages.push(`"${item.textContent.substring(0, 30)}..." is shared by both topics, so it belongs in the similarities section.`);
        } else {
          feedbackMessages.push(`"${item.textContent.substring(0, 30)}..." belongs in the other differences column.`);
        }
      }
    });

    item2Items.forEach(item => {
      total++;
      if (item.dataset.type === 'item2') {
        correct++;
        item.classList.remove('incorrect');
        item.classList.add('placed');
      } else {
        item.classList.add('incorrect');
        if (item.dataset.type === 'similarity') {
          feedbackMessages.push(`"${item.textContent.substring(0, 30)}..." is shared by both topics, so it belongs in the similarities section.`);
        } else {
          feedbackMessages.push(`"${item.textContent.substring(0, 30)}..." belongs in the other differences column.`);
        }
      }
    });

    const bankItems = document.getElementById('itemBank')?.querySelectorAll('.draggable-item');
    if (bankItems && bankItems.length > 0) {
      setFeedback({
        show: true,
        success: false,
        message: `Please place all items in the comparison zones first! You have ${bankItems.length} items left to sort.`
      });
      return;
    }

    if (correct === total && total > 0) {
      setFeedback({
        show: true,
        success: true,
        message: `🎉 Excellent comparison work! You correctly sorted all ${total} items. You understand the similarities and differences between ${activities[currentActivity].item1} and ${activities[currentActivity].item2}!`
      });
    } else {
      setFeedback({
        show: true,
        success: false,
        message: `You got ${correct} out of ${total} correct. ${feedbackMessages.slice(0, 3).join(' ')} Keep thinking about what makes things similar or different!`
      });
    }
  };

  if (!activities.length) {
    return (
      <div className="compare-contrast">
        <p>No activities available.</p>
      </div>
    );
  }

  const activity = activities[currentActivity] || activities[0];
  const instructionText =
    instructions ||
    `📝 Drag each item to the correct category: similarities show what ${activity.item1} and ${activity.item2} share, and the difference sections highlight what is unique to each.`;

  return (
    <div className="compare-contrast">
      <header className="activity-header">
        <div className="header-content">
          <h1>{headerTitle}</h1>
          <div className="progress-indicator">
            {activityCounterLabel} {currentActivity + 1} of {activities.length}
          </div>
          <div className="header-controls">
            {showDifficultyToggle && (
              <div className="difficulty-toggle">
                <button
                  onClick={() => {
                    setDifficulty('easy');
                    initializeActivity(currentActivity);
                  }}
                  className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
                >
                  Easy
                </button>
                <button
                  onClick={() => {
                    setDifficulty('normal');
                    initializeActivity(currentActivity);
                  }}
                  className={`difficulty-btn ${difficulty === 'normal' ? 'active' : ''}`}
                >
                  Normal
                </button>
              </div>
            )}
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button onClick={() => setEditMode(!editMode)} className={`icon-btn ${editMode ? 'active' : ''}`}>
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
            <button onClick={resetActivity} className="warning">
              🔄 Reset Activity
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="activity-selector">
          {activities.map((act, index) => (
            <button
              key={act.topic}
              className={`activity-btn ${index === currentActivity ? 'active' : ''}`}
              onClick={() => initializeActivity(index)}
            >
              {act.topic}
            </button>
          ))}
        </div>

        <div className="activity-container">
          <div className="activity-header">
            <h2>Compare & Contrast</h2>
            <div className="comparison-topic">{activity.topic}</div>
            <div className="instructions">
              <p>{instructionText}</p>
            </div>
          </div>

          <div className="workspace">
            <div className="item-bank">
              <h3>📦 Items to Sort</h3>
              <div id="itemBank"></div>
            </div>

            <div className="comparison-zones">
              <div className="similarities-row">
                <div
                  className="drop-zone similarities-zone"
                  id="similarityZone"
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="zone-header similarities-header">
                    <div className="zone-title">🤝 Similarities</div>
                    <div className="zone-subtitle">
                      What {activity.item1} &amp; {activity.item2} share
                    </div>
                  </div>
                  <div className="empty-zone-message">
                    Shared traits between {activity.item1} and {activity.item2}
                  </div>
                </div>
              </div>

              <div className="differences-row">
                <div
                  className="drop-zone item1-zone"
                  id="item1Zone"
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="zone-header item1-header">
                    <div className="zone-title" id="item1Header">
                      📍 {activity.item1}
                    </div>
                    <div className="zone-subtitle">Unique differences</div>
                  </div>
                  <div className="empty-zone-message">
                    Unique to {activity.item1.toLowerCase()}
                  </div>
                </div>

                <div
                  className="drop-zone item2-zone"
                  id="item2Zone"
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="zone-header item2-header">
                    <div className="zone-title" id="item2Header">
                      📍 {activity.item2}
                    </div>
                    <div className="zone-subtitle">Unique differences</div>
                  </div>
                  <div className="empty-zone-message">
                    Unique to {activity.item2.toLowerCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={checkAnswers} className="primary check-btn">
              ✓ Check My Sorting
            </button>
            {currentActivity < activities.length - 1 && (
              <button onClick={nextActivity} className="success next-btn">
                Next Comparison →
              </button>
            )}
          </div>

          {feedback.show && (
            <div className={`feedback ${feedback.success ? 'success' : 'error'} show`}>
              <p>{feedback.message}</p>
            </div>
          )}
        </div>
      </main>

      <IconManager isOpen={iconPanelOpen} onClose={() => setIconPanelOpen(false)} iconManager={iconManager} />
    </div>
  );
};

export default CompareContrast;
