import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './CompareContrastTemplate.css';

const CompareContrastTemplate = () => {
  const [topic1, setTopic1] = useState('');
  const [topic2, setTopic2] = useState('');
  const [similarities, setSimilarities] = useState(['', '', '']);
  const [differences1, setDifferences1] = useState(['', '', '']);
  const [differences2, setDifferences2] = useState(['', '', '']);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  const handleSimilarityChange = (index, value) => {
    const updated = [...similarities];
    updated[index] = value;
    setSimilarities(updated);
  };

  const handleDifference1Change = (index, value) => {
    const updated = [...differences1];
    updated[index] = value;
    setDifferences1(updated);
  };

  const handleDifference2Change = (index, value) => {
    const updated = [...differences2];
    updated[index] = value;
    setDifferences2(updated);
  };

  const addSimilarity = () => {
    setSimilarities([...similarities, '']);
  };

  const addDifference = () => {
    setDifferences1([...differences1, '']);
    setDifferences2([...differences2, '']);
  };

  const removeSimilarity = (index) => {
    setSimilarities(similarities.filter((_, i) => i !== index));
  };

  const removeDifference = (index) => {
    setDifferences1(differences1.filter((_, i) => i !== index));
    setDifferences2(differences2.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    if (window.confirm('Clear all content? This cannot be undone.')) {
      setTopic1('');
      setTopic2('');
      setSimilarities(['', '', '']);
      setDifferences1(['', '', '']);
      setDifferences2(['', '', '']);
    }
  };

  const loadTemplate = (templateType) => {
    switch(templateType) {
      case 'animals':
        setTopic1('Dogs');
        setTopic2('Cats');
        setSimilarities(['Both are pets', 'Both have fur', 'Both have four legs']);
        setDifferences1(['Dogs bark', 'Dogs like to play fetch', 'Dogs need walks']);
        setDifferences2(['Cats meow', 'Cats are independent', 'Cats use litter boxes']);
        break;
      case 'seasons':
        setTopic1('Summer');
        setTopic2('Winter');
        setSimilarities(['Both are seasons', 'Both last about 3 months', 'Both have holidays']);
        setDifferences1(['Summer is hot', 'People swim in summer', 'Days are longer']);
        setDifferences2(['Winter is cold', 'People ski in winter', 'Days are shorter']);
        break;
      case 'stories':
        setTopic1('Book');
        setTopic2('Movie');
        setSimilarities(['Both tell stories', 'Both can be fiction or nonfiction', 'Both entertain people']);
        setDifferences1(['Books use words', 'Reading takes longer', 'You imagine the scenes']);
        setDifferences2(['Movies use visuals and sound', 'Movies are usually 1-3 hours', 'You see the scenes']);
        break;
      default:
        break;
    }
  };

  return (
    <div className="compare-contrast-template">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>⚖️ Compare & Contrast Template Builder</h1>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <div className="template-dropdown">
              <select onChange={(e) => loadTemplate(e.target.value)} defaultValue="">
                <option value="" disabled>Load Example Template</option>
                <option value="animals">Dogs vs Cats</option>
                <option value="seasons">Summer vs Winter</option>
                <option value="stories">Book vs Movie</option>
              </select>
            </div>
            <button onClick={handleClear} className="warning">
              🗑️ Clear All
            </button>
            <button onClick={handlePrint} className="primary">
              🖨️ Print
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="template-container">
          <div className="template-header">
            <h2>Compare & Contrast Organizer</h2>
            <p className="template-subtitle">Create custom comparison worksheets for any two topics</p>
          </div>

          <div className="topics-section">
            <div className="topic-input-group">
              <label>Topic 1:</label>
              <input
                type="text"
                className="topic-input"
                value={topic1}
                onChange={(e) => setTopic1(e.target.value)}
                placeholder="Enter first topic..."
              />
            </div>
            <div className="vs-divider">VS</div>
            <div className="topic-input-group">
              <label>Topic 2:</label>
              <input
                type="text"
                className="topic-input"
                value={topic2}
                onChange={(e) => setTopic2(e.target.value)}
                placeholder="Enter second topic..."
              />
            </div>
          </div>

          <div className="comparison-grid">
            <div className="similarities-section">
              <h3 className="section-title similarities-title">
                🤝 Similarities
                <span className="subtitle">How are they alike?</span>
              </h3>
              <div className="items-list">
                {similarities.map((item, index) => (
                  <div key={index} className="item-row">
                    <span className="item-number">{index + 1}.</span>
                    <textarea
                      className="item-input"
                      value={item}
                      onChange={(e) => handleSimilarityChange(index, e.target.value)}
                      placeholder="Enter a similarity..."
                    />
                    {similarities.length > 1 && (
                      <button
                        onClick={() => removeSimilarity(index)}
                        className="remove-item-btn no-print"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addSimilarity} className="add-item-btn no-print">
                ➕ Add Similarity
              </button>
            </div>

            <div className="differences-section">
              <h3 className="section-title differences-title">
                🔀 Differences
                <span className="subtitle">How are they different?</span>
              </h3>
              <div className="differences-grid">
                <div className="diff-column">
                  <h4>{topic1 || 'Topic 1'}</h4>
                  <div className="items-list">
                    {differences1.map((item, index) => (
                      <div key={index} className="item-row">
                        <span className="item-number">{index + 1}.</span>
                        <textarea
                          className="item-input"
                          value={item}
                          onChange={(e) => handleDifference1Change(index, e.target.value)}
                          placeholder={`${topic1 || 'Topic 1'} is/has...`}
                        />
                        {differences1.length > 1 && (
                          <button
                            onClick={() => removeDifference(index)}
                            className="remove-item-btn no-print"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="diff-column">
                  <h4>{topic2 || 'Topic 2'}</h4>
                  <div className="items-list">
                    {differences2.map((item, index) => (
                      <div key={index} className="item-row">
                        <span className="item-number">{index + 1}.</span>
                        <textarea
                          className="item-input"
                          value={item}
                          onChange={(e) => handleDifference2Change(index, e.target.value)}
                          placeholder={`${topic2 || 'Topic 2'} is/has...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={addDifference} className="add-item-btn no-print">
                ➕ Add Difference
              </button>
            </div>
          </div>

          <div className="instructions-footer no-print">
            <p>💡 <strong>Tip:</strong> Fill in the topics and comparisons, then print for a custom worksheet! Load example templates for inspiration.</p>
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

export default CompareContrastTemplate;
