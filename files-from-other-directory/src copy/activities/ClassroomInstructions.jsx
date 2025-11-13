import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './ClassroomInstructions.css';

const ClassroomInstructions = () => {
  const iconManager = useIconManager();
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const scenarios = [
    {
      id: 1,
      category: 'Morning Routine',
      title: 'Getting Ready for Class',
      instruction: 'Take out your reading book, open to page 15, and put your pencil on your desk.',
      steps: ['Take out reading book', 'Open to page 15', 'Put pencil on desk'],
      materials: ['📚 Reading Book', '✏️ Pencil', '🪑 Desk'],
      facilitatorMode: 'Student can tell helper: "Please get my reading book, open it to page 15, and put a pencil on my desk."'
    },
    {
      id: 2,
      category: 'Morning Routine',
      title: 'Start of Day',
      instruction: 'Put your backpack in your cubby, hang up your coat, and sit at your desk.',
      steps: ['Put backpack in cubby', 'Hang up coat', 'Sit at desk'],
      materials: ['🎒 Backpack', '🧥 Coat', '📦 Cubby', '🪑 Desk'],
      facilitatorMode: 'Student can tell helper what to do with backpack and coat, then sit down.'
    },
    {
      id: 3,
      category: 'Academic Tasks',
      title: 'Math Assignment',
      instruction: 'Open your math notebook, write today\'s date at the top, and solve problems 1 through 5.',
      steps: ['Open math notebook', 'Write today\'s date', 'Solve problems 1-5'],
      materials: ['📓 Math Notebook', '✏️ Pencil', '📅 Date'],
      facilitatorMode: 'Student can tell helper: "Please get my math notebook and a pencil, then I need to write the date and do problems 1-5."'
    },
    {
      id: 4,
      category: 'Academic Tasks',
      title: 'Reading Assignment',
      instruction: 'Read the passage on page 42, highlight the main idea, and answer questions 1, 2, and 3.',
      steps: ['Read passage on page 42', 'Highlight main idea', 'Answer questions 1, 2, 3'],
      materials: ['📖 Reading Book', '🖍️ Highlighter', '✏️ Pencil'],
      facilitatorMode: 'Student can tell helper to open to page 42 and get highlighter and pencil ready.'
    },
    {
      id: 5,
      category: 'Technology',
      title: 'Chromebook Setup',
      instruction: 'Open your Chromebook, log into Google Classroom, and click on today\'s science assignment.',
      steps: ['Open Chromebook', 'Log into Google Classroom', 'Click science assignment'],
      materials: ['💻 Chromebook', '🌐 Google Classroom', '🔬 Science Assignment'],
      facilitatorMode: 'Student can tell helper: "Please open my Chromebook, go to Google Classroom, and find today\'s science assignment."'
    },
    {
      id: 6,
      category: 'Technology',
      title: 'Research Task',
      instruction: 'Go to the library website, search for books about animals, and pick one to check out.',
      steps: ['Go to library website', 'Search for animal books', 'Pick one book'],
      materials: ['💻 Computer', '📚 Library Website', '🐾 Animal Books'],
      facilitatorMode: 'Student can tell helper the steps to find an animal book on the library website.'
    },
    {
      id: 7,
      category: 'Class Transitions',
      title: 'Getting Ready for Lunch',
      instruction: 'Close your book, put it in your desk, and line up with your lunch box.',
      steps: ['Close book', 'Put in desk', 'Line up with lunch box'],
      materials: ['📕 Book', '🪑 Desk', '🍱 Lunch Box'],
      facilitatorMode: 'Student can tell helper what to do with the book, then get in line with lunch.'
    },
    {
      id: 8,
      category: 'Class Transitions',
      title: 'Preparing for Specials',
      instruction: 'Put away your work, get your water bottle, and walk quietly to the gym.',
      steps: ['Put away work', 'Get water bottle', 'Walk to gym'],
      materials: ['📝 Work', '💧 Water Bottle', '🏃 Gym'],
      facilitatorMode: 'Student can tell helper to put work away and get ready to go to gym with water.'
    },
    {
      id: 9,
      category: 'End of Day',
      title: 'Packing Up',
      instruction: 'Put your homework folder in your backpack, grab your coat from your cubby, and wait by the door.',
      steps: ['Put homework in backpack', 'Get coat from cubby', 'Wait by door'],
      materials: ['📁 Homework Folder', '🎒 Backpack', '🧥 Coat', '🚪 Door'],
      facilitatorMode: 'Student can tell helper: "Please put my homework folder in my backpack, get my coat, and I\'ll wait by the door."'
    },
    {
      id: 10,
      category: 'End of Day',
      title: 'Cleanup Time',
      instruction: 'Push in your chair, throw away any trash, and put your supplies in the bin.',
      steps: ['Push in chair', 'Throw away trash', 'Put supplies in bin'],
      materials: ['🪑 Chair', '🗑️ Trash', '🧰 Supply Bin'],
      facilitatorMode: 'Student can tell helper the cleanup steps before leaving.'
    },
    {
      id: 11,
      category: 'Academic Tasks',
      title: 'Writing Assignment',
      instruction: 'Get a pencil and paper, write your name at the top, and write three sentences about your weekend.',
      steps: ['Get pencil and paper', 'Write name at top', 'Write 3 sentences'],
      materials: ['✏️ Pencil', '📄 Paper', '✍️ Writing'],
      facilitatorMode: 'Student can tell helper what materials are needed and what to write.'
    },
    {
      id: 12,
      category: 'Academic Tasks',
      title: 'Science Experiment',
      instruction: 'Put on your safety goggles, get a beaker from the shelf, and pour water to the 100ml line.',
      steps: ['Put on safety goggles', 'Get beaker', 'Pour water to 100ml'],
      materials: ['🥽 Safety Goggles', '🧪 Beaker', '💧 Water'],
      facilitatorMode: 'Student can tell helper the safety and setup steps for the experiment.'
    }
  ];

  const categories = ['All', 'Morning Routine', 'Academic Tasks', 'Technology', 'Class Transitions', 'End of Day'];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [showFacilitator, setShowFacilitator] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState([]);

  const filteredScenarios = selectedCategory === 'All'
    ? scenarios
    : scenarios.filter(s => s.category === selectedCategory);

  const currentScenario = filteredScenarios[currentScenarioIndex];

  const handleNext = () => {
    if (!completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios([...completedScenarios, currentScenario.id]);
    }
    if (currentScenarioIndex < filteredScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setShowSteps(false);
      setShowFacilitator(false);
    }
  };

  const handlePrevious = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
      setShowSteps(false);
      setShowFacilitator(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentScenarioIndex(0);
    setShowSteps(false);
    setShowFacilitator(false);
  };

  const handleReset = () => {
    setCurrentScenarioIndex(0);
    setShowSteps(false);
    setShowFacilitator(false);
    setCompletedScenarios([]);
  };

  return (
    <div className="classroom-instructions">
      <div className="activity-header no-print">
        <div className="header-content">
          <h1>📋 Classroom Instructions Practice</h1>
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

        <div className="progress-info no-print">
          <p>Scenario {currentScenarioIndex + 1} of {filteredScenarios.length} | Completed: {completedScenarios.length}/{scenarios.length}</p>
        </div>

        {currentScenario && (
          <div className="scenario-card">
            <div className="scenario-header">
              <span className="category-badge">{currentScenario.category}</span>
              <h2>{currentScenario.title}</h2>
            </div>

            <div className="instruction-box">
              <h3>🗣️ Teacher Says:</h3>
              <p className="instruction-text">"{currentScenario.instruction}"</p>
            </div>

            <div className="materials-section">
              <h3>📦 Materials Needed:</h3>
              <div className="materials-list">
                {currentScenario.materials.map((material, idx) => (
                  <div key={idx} className="material-item">
                    {material}
                  </div>
                ))}
              </div>
            </div>

            <div className="support-buttons no-print">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="support-btn"
              >
                {showSteps ? '🔼 Hide' : '🔽 Show'} Step-by-Step Breakdown
              </button>
              <button
                onClick={() => setShowFacilitator(!showFacilitator)}
                className="support-btn facilitator-btn"
              >
                {showFacilitator ? '🔼 Hide' : '🔽 Show'} Facilitator Mode
              </button>
            </div>

            {showSteps && (
              <div className="steps-breakdown">
                <h3>Step-by-Step:</h3>
                <ol>
                  {currentScenario.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {showFacilitator && (
              <div className="facilitator-mode">
                <h3>👥 For Virtual Sessions with Facilitator:</h3>
                <p>{currentScenario.facilitatorMode}</p>
                <div className="facilitator-tip">
                  <strong>💡 Tip:</strong> Student practices by verbally telling the facilitator each step.
                  This builds expressive language and direction-giving skills.
                </div>
              </div>
            )}

            <div className="student-response-section">
              <h3>Student Response:</h3>
              <div className="response-options">
                <div className="response-option">
                  <strong>Independent:</strong> Student states all steps from memory
                </div>
                <div className="response-option">
                  <strong>With Visual:</strong> Student refers to materials list
                </div>
                <div className="response-option">
                  <strong>With Breakdown:</strong> Student uses step-by-step list
                </div>
              </div>
            </div>

            <div className="navigation-buttons no-print">
              <button
                onClick={handlePrevious}
                disabled={currentScenarioIndex === 0}
                className="nav-btn"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                className="nav-btn primary"
              >
                {currentScenarioIndex < filteredScenarios.length - 1 ? 'Next Scenario →' : 'Complete ✓'}
              </button>
            </div>
          </div>
        )}

        <div className="instructions-help">
          <h3>How to Use This Activity:</h3>
          <ul>
            <li><strong>Read the instruction</strong> to the student (or have them read it)</li>
            <li><strong>Student responds</strong> by stating what they would do in order</li>
            <li><strong>Use supports as needed:</strong> Show materials, reveal steps, or use facilitator mode</li>
            <li><strong>For virtual sessions:</strong> Facilitator mode lets student practice giving directions</li>
            <li><strong>Track progress</strong> through different categories and difficulty levels</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassroomInstructions;
