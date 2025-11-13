import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './CategoriesFunctions.css';

const CategoriesFunctions = () => {
  const iconManager = useIconManager();
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const items = [
    {
      id: 1,
      name: 'Scissors',
      emoji: '✂️',
      category: 'School Supplies',
      function: 'To cut paper and materials',
      description: 'A tool with two sharp blades used for cutting',
      attributes: ['Sharp', 'Metal or plastic', 'Has handles', 'Opens and closes'],
      whereFound: 'In a desk, pencil case, or classroom',
      whoUses: 'Students, teachers, artists, anyone doing crafts'
    },
    {
      id: 2,
      name: 'Backpack',
      emoji: '🎒',
      category: 'School Supplies',
      function: 'To carry books and supplies',
      description: 'A bag worn on your back to carry things',
      attributes: ['Has straps', 'Has compartments/pockets', 'Made of fabric', 'Can zip or buckle'],
      whereFound: 'At school, hanging in a cubby, on your back',
      whoUses: 'Students, hikers, travelers'
    },
    {
      id: 3,
      name: 'Eraser',
      emoji: '🧹',
      category: 'School Supplies',
      function: 'To remove pencil marks',
      description: 'A small rubber object that rubs away pencil writing',
      attributes: ['Soft', 'Usually pink or white', 'Small', 'Leaves eraser dust'],
      whereFound: 'On the end of a pencil, in a desk, in a pencil case',
      whoUses: 'Students, artists, anyone who writes with pencil'
    },
    {
      id: 4,
      name: 'Microwave',
      emoji: '📟',
      category: 'Kitchen Items',
      function: 'To heat up food quickly',
      description: 'An appliance that uses special waves to make food hot',
      attributes: ['Has a door', 'Has buttons', 'Makes beeping sounds', 'Spins food inside'],
      whereFound: 'In the kitchen, on a counter, in a break room',
      whoUses: 'Anyone who needs to heat food'
    },
    {
      id: 5,
      name: 'Refrigerator',
      emoji: '🧊',
      category: 'Kitchen Items',
      function: 'To keep food cold and fresh',
      description: 'A large appliance that keeps food cold to prevent spoiling',
      attributes: ['Cold inside', 'Large', 'Has shelves', 'Makes humming noise'],
      whereFound: 'In the kitchen',
      whoUses: 'Families, restaurants, anyone storing food'
    },
    {
      id: 6,
      name: 'Blender',
      emoji: '🌀',
      category: 'Kitchen Items',
      function: 'To mix and blend food into smooth drinks or mixtures',
      description: 'A kitchen tool with spinning blades that chops and mixes food',
      attributes: ['Has sharp blades', 'Makes loud noise', 'Has a lid', 'Plugs into wall'],
      whereFound: 'In the kitchen, on a counter, in a cabinet',
      whoUses: 'People making smoothies, soups, or mixed drinks'
    },
    {
      id: 7,
      name: 'Shovel',
      emoji: '🚧',
      category: 'Tools',
      function: 'To dig holes or move dirt and snow',
      description: 'A tool with a flat blade and long handle for digging',
      attributes: ['Long handle', 'Flat or curved blade', 'Made of metal and wood/plastic', 'Heavy'],
      whereFound: 'In a garage, shed, or garden',
      whoUses: 'Gardeners, construction workers, people clearing snow'
    },
    {
      id: 8,
      name: 'Hammer',
      emoji: '🔨',
      category: 'Tools',
      function: 'To pound nails into wood or walls',
      description: 'A tool with a heavy head used for hitting things',
      attributes: ['Heavy metal head', 'Wooden or plastic handle', 'Used for pounding', 'Makes loud banging'],
      whereFound: 'In a toolbox, garage, or workshop',
      whoUses: 'Builders, carpenters, anyone fixing things'
    },
    {
      id: 9,
      name: 'Flashlight',
      emoji: '🔦',
      category: 'Tools',
      function: 'To provide light in dark places',
      description: 'A portable device that creates a beam of light',
      attributes: ['Needs batteries', 'Has an on/off button', 'Makes light', 'Portable'],
      whereFound: 'In a drawer, emergency kit, camping gear',
      whoUses: 'Anyone who needs light in the dark'
    },
    {
      id: 10,
      name: 'Bus',
      emoji: '🚌',
      category: 'Transportation',
      function: 'To transport many people from place to place',
      description: 'A large vehicle that carries many passengers',
      attributes: ['Large', 'Yellow (for school) or other colors', 'Many seats', 'Has big doors'],
      whereFound: 'On roads, at bus stops, at school',
      whoUses: 'Students, commuters, travelers'
    },
    {
      id: 11,
      name: 'Bicycle',
      emoji: '🚲',
      category: 'Transportation',
      function: 'To ride from place to place using pedals',
      description: 'A vehicle with two wheels that you pedal to move',
      attributes: ['Two wheels', 'Pedals', 'Handlebars', 'Chain and gears'],
      whereFound: 'In a garage, bike rack, or on the road',
      whoUses: 'Kids, adults, anyone who rides for fun or transportation'
    },
    {
      id: 12,
      name: 'Airplane',
      emoji: '✈️',
      category: 'Transportation',
      function: 'To fly people and cargo through the air to far places',
      description: 'A large vehicle with wings that flies in the sky',
      attributes: ['Has wings', 'Very fast', 'Loud engines', 'Carries many people'],
      whereFound: 'At airports, in the sky',
      whoUses: 'Travelers, pilots, flight attendants'
    }
  ];

  const categories = ['All', 'School Supplies', 'Kitchen Items', 'Tools', 'Transportation'];

  const activityTypes = [
    { id: 'identify', name: 'Identify & Describe', icon: '🔍' },
    { id: 'category', name: 'Name Category', icon: '📦' },
    { id: 'function', name: 'Describe Function', icon: '⚙️' },
    { id: 'attributes', name: 'List Attributes', icon: '📋' },
    { id: 'compare', name: 'Compare Items', icon: '⚖️' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completedItems, setCompletedItems] = useState([]);

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const currentItem = filteredItems[currentItemIndex];

  const handleNext = () => {
    if (!completedItems.includes(currentItem.id)) {
      setCompletedItems([...completedItems, currentItem.id]);
    }
    if (currentItemIndex < filteredItems.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentItemIndex(0);
    setShowAnswer(false);
  };

  const handleReset = () => {
    setCurrentItemIndex(0);
    setShowAnswer(false);
    setCompletedItems([]);
  };

  const renderActivityContent = () => {
    if (!selectedActivityType) {
      return (
        <div className="activity-type-selection">
          <h2>Choose an Activity Type:</h2>
          <div className="activity-type-cards">
            {activityTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedActivityType(type.id)}
                className="activity-type-card"
              >
                <span className="activity-icon">{type.icon}</span>
                <span className="activity-name">{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="item-card">
        <div className="item-header">
          <div className="item-emoji">{currentItem.emoji}</div>
          <h2 className="item-name">{currentItem.name}</h2>
          <span className="category-tag">{currentItem.category}</span>
        </div>

        {selectedActivityType === 'identify' && (
          <div className="activity-content">
            <div className="prompt-box">
              <h3>🗣️ Student Task:</h3>
              <p>Look at this item and describe what it is and what it does.</p>
              <p className="sub-prompt">Try to include: What is it called? What does it do? Where do you find it?</p>
            </div>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="reveal-btn"
            >
              {showAnswer ? '🔼 Hide' : '🔽 Show'} Example Answer
            </button>

            {showAnswer && (
              <div className="answer-box">
                <p><strong>What it is:</strong> {currentItem.description}</p>
                <p><strong>What it does:</strong> {currentItem.function}</p>
                <p><strong>Where you find it:</strong> {currentItem.whereFound}</p>
                <p><strong>Who uses it:</strong> {currentItem.whoUses}</p>
              </div>
            )}
          </div>
        )}

        {selectedActivityType === 'category' && (
          <div className="activity-content">
            <div className="prompt-box">
              <h3>🗣️ Student Task:</h3>
              <p>What category does this item belong to? What are other items in the same category?</p>
            </div>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="reveal-btn"
            >
              {showAnswer ? '🔼 Hide' : '🔽 Show'} Example Answer
            </button>

            {showAnswer && (
              <div className="answer-box">
                <p><strong>Category:</strong> {currentItem.category}</p>
                <p><strong>Other items in this category:</strong></p>
                <ul>
                  {items
                    .filter(item => item.category === currentItem.category && item.id !== currentItem.id)
                    .map(item => <li key={item.id}>{item.name}</li>)
                  }
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedActivityType === 'function' && (
          <div className="activity-content">
            <div className="prompt-box">
              <h3>🗣️ Student Task:</h3>
              <p>Tell me what this item is used for. What is its job or purpose?</p>
              <p className="sub-prompt">Try to use complete sentences like: "A {currentItem.name.toLowerCase()} is used to..."</p>
            </div>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="reveal-btn"
            >
              {showAnswer ? '🔼 Hide' : '🔽 Show'} Example Answer
            </button>

            {showAnswer && (
              <div className="answer-box">
                <p><strong>Function:</strong> {currentItem.function}</p>
                <p><strong>Complete sentence:</strong></p>
                <p className="example-sentence">
                  "A {currentItem.name.toLowerCase()} is used {currentItem.function.toLowerCase()}."
                </p>
              </div>
            )}
          </div>
        )}

        {selectedActivityType === 'attributes' && (
          <div className="activity-content">
            <div className="prompt-box">
              <h3>🗣️ Student Task:</h3>
              <p>Describe this item. What does it look like? What are its features or characteristics?</p>
              <p className="sub-prompt">Think about: size, color, material, parts, etc.</p>
            </div>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="reveal-btn"
            >
              {showAnswer ? '🔼 Hide' : '🔽 Show'} Example Answer
            </button>

            {showAnswer && (
              <div className="answer-box">
                <p><strong>Attributes:</strong></p>
                <ul>
                  {currentItem.attributes.map((attr, idx) => (
                    <li key={idx}>{attr}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {selectedActivityType === 'compare' && (
          <div className="activity-content">
            <div className="prompt-box">
              <h3>🗣️ Student Task:</h3>
              <p>Compare this item to another item in the same category. How are they the same? How are they different?</p>
            </div>

            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="reveal-btn"
            >
              {showAnswer ? '🔼 Hide' : '🔽 Show'} Example Answer
            </button>

            {showAnswer && (
              <div className="answer-box">
                {items.filter(item => item.category === currentItem.category && item.id !== currentItem.id).length > 0 ? (
                  <>
                    <p><strong>Let's compare to:</strong> {items.find(item => item.category === currentItem.category && item.id !== currentItem.id)?.name}</p>
                    <p><strong>Same:</strong> Both are {currentItem.category.toLowerCase()}. Both are used at school/home. Both help us complete tasks.</p>
                    <p><strong>Different:</strong> A {currentItem.name.toLowerCase()} {currentItem.function.toLowerCase()}, but a {items.find(item => item.category === currentItem.category && item.id !== currentItem.id)?.name.toLowerCase()} {items.find(item => item.category === currentItem.category && item.id !== currentItem.id)?.function.toLowerCase()}.</p>
                  </>
                ) : (
                  <p>No other items in this category to compare.</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="navigation-buttons no-print">
          <button
            onClick={handlePrevious}
            disabled={currentItemIndex === 0}
            className="nav-btn"
          >
            ← Previous
          </button>
          <button
            onClick={() => {
              setSelectedActivityType(null);
              setShowAnswer(false);
            }}
            className="nav-btn change-activity"
          >
            Change Activity Type
          </button>
          <button
            onClick={handleNext}
            className="nav-btn primary"
          >
            {currentItemIndex < filteredItems.length - 1 ? 'Next Item →' : 'Complete ✓'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="categories-functions">
      <div className="activity-header no-print">
        <div className="header-content">
          <h1>📦 Categories & Functions</h1>
          <div className="header-controls">
            <button onClick={handleReset} className="control-btn">
              🔄 Reset Progress
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
        <div className="category-selector no-print">
          <h2>Choose a Category:</h2>
          <div className="category-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {selectedActivityType && (
          <div className="progress-info no-print">
            <p>Item {currentItemIndex + 1} of {filteredItems.length} | Completed: {completedItems.length}/{items.length}</p>
          </div>
        )}

        <div className="activity-container">
          {renderActivityContent()}
        </div>

        <div className="instructions-help">
          <h3>Activity Types Explained:</h3>
          <div className="help-grid">
            <div className="help-card">
              <strong>🔍 Identify & Describe:</strong>
              <p>Student names the item and describes what it is and what it does.</p>
            </div>
            <div className="help-card">
              <strong>📦 Name Category:</strong>
              <p>Student identifies what category the item belongs to and names other items in that category.</p>
            </div>
            <div className="help-card">
              <strong>⚙️ Describe Function:</strong>
              <p>Student explains what the item is used for using complete sentences.</p>
            </div>
            <div className="help-card">
              <strong>📋 List Attributes:</strong>
              <p>Student describes features and characteristics of the item (size, color, material, parts).</p>
            </div>
            <div className="help-card">
              <strong>⚖️ Compare Items:</strong>
              <p>Student compares two items in the same category, noting similarities and differences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesFunctions;
