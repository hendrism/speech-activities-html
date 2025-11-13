import React, { useState } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './SameDifferentWorksheet.css';

const SameDifferentWorksheet = () => {
  const [mode, setMode] = useState('emoji'); // 'emoji' or 'custom'
  const [iconPanelOpen, setIconPanelOpen] = useState(false);
  const iconManager = useIconManager();

  const defaultPairs = [
    { id: 1, item1: { emoji: '🐶', text: 'Dog' }, item2: { emoji: '🐱', text: 'Cat' } },
    { id: 2, item1: { emoji: '🥄', text: 'Spoon' }, item2: { emoji: '🍴', text: 'Fork' } },
    { id: 3, item1: { emoji: '👕', text: 'Shirt' }, item2: { emoji: '👖', text: 'Pants' } },
    { id: 4, item1: { emoji: '🚲', text: 'Bike' }, item2: { emoji: '🚗', text: 'Car' } },
    { id: 5, item1: { emoji: '🍎', text: 'Apple' }, item2: { emoji: '🍊', text: 'Orange' } },
    { id: 6, item1: { emoji: '📖', text: 'Book' }, item2: { emoji: '💻', text: 'Tablet' } },
    { id: 7, item1: { emoji: '☀️', text: 'Sun' }, item2: { emoji: '🌙', text: 'Moon' } },
    { id: 8, item1: { emoji: '🐕', text: 'Dog' }, item2: { emoji: '🐺', text: 'Wolf' } }
  ];

  const [pairs, setPairs] = useState(defaultPairs);
  const [responses, setResponses] = useState({});

  const handleResponseChange = (pairId, field, value) => {
    setResponses(prev => ({
      ...prev,
      [pairId]: {
        ...prev[pairId],
        [field]: value
      }
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleClear = () => {
    if (window.confirm('Clear all responses? This cannot be undone.')) {
      setResponses({});
    }
  };

  const addCustomPair = () => {
    const newPair = {
      id: Date.now(),
      item1: { emoji: '', text: '' },
      item2: { emoji: '', text: '' }
    };
    setPairs([...pairs, newPair]);
  };

  const updatePairItem = (pairId, itemKey, field, value) => {
    setPairs(prev => prev.map(pair =>
      pair.id === pairId
        ? { ...pair, [itemKey]: { ...pair[itemKey], [field]: value } }
        : pair
    ));
  };

  const removePair = (pairId) => {
    setPairs(prev => prev.filter(pair => pair.id !== pairId));
    setResponses(prev => {
      const updated = { ...prev };
      delete updated[pairId];
      return updated;
    });
  };

  return (
    <div className="same-different-worksheet">
      <header className="activity-header no-print">
        <div className="header-content">
          <h1>📋 Same & Different Worksheet</h1>
          <div className="header-controls">
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Manage Icons
            </button>
            <button
              onClick={() => setMode(mode === 'emoji' ? 'custom' : 'emoji')}
              className="mode-btn"
            >
              {mode === 'emoji' ? '✏️ Custom Mode' : '😊 Emoji Mode'}
            </button>
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
        <div className="worksheet-container">
          <div className="worksheet-header">
            <h2>Same and Different Worksheets</h2>
            <div className="directions">
              <h3>Directions</h3>
              <p>Look at the two items. Write or say <strong>one way they are the SAME</strong> and <strong>one way they are DIFFERENT</strong>.</p>
              <p>Use the sentence starters:</p>
              <ul>
                <li><strong>SAME:</strong> "They are both..."</li>
                <li><strong>DIFFERENT:</strong> "A (Item 1) ..." and "A (Item 2) ..."</li>
              </ul>
            </div>
          </div>

          {mode === 'custom' && (
            <div className="custom-controls no-print">
              <button onClick={addCustomPair} className="add-pair-btn">
                ➕ Add Custom Pair
              </button>
            </div>
          )}

          <table className="comparison-table">
            <thead>
              <tr>
                <th>Item 1</th>
                <th>Item 2</th>
                <th>SAME</th>
                <th>DIFFERENT</th>
                {mode === 'custom' && <th className="no-print">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {pairs.map(pair => (
                <tr key={pair.id}>
                  <td className="item-cell">
                    {mode === 'custom' ? (
                      <div className="custom-item-edit">
                        <input
                          type="text"
                          className="emoji-input"
                          placeholder="Emoji"
                          value={pair.item1.emoji}
                          onChange={(e) => updatePairItem(pair.id, 'item1', 'emoji', e.target.value)}
                        />
                        <input
                          type="text"
                          className="text-input"
                          placeholder="Name"
                          value={pair.item1.text}
                          onChange={(e) => updatePairItem(pair.id, 'item1', 'text', e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="item-display">
                        <span className="emoji">{pair.item1.emoji}</span>
                        <span className="text">{pair.item1.text}</span>
                      </div>
                    )}
                  </td>
                  <td className="item-cell">
                    {mode === 'custom' ? (
                      <div className="custom-item-edit">
                        <input
                          type="text"
                          className="emoji-input"
                          placeholder="Emoji"
                          value={pair.item2.emoji}
                          onChange={(e) => updatePairItem(pair.id, 'item2', 'emoji', e.target.value)}
                        />
                        <input
                          type="text"
                          className="text-input"
                          placeholder="Name"
                          value={pair.item2.text}
                          onChange={(e) => updatePairItem(pair.id, 'item2', 'text', e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="item-display">
                        <span className="emoji">{pair.item2.emoji}</span>
                        <span className="text">{pair.item2.text}</span>
                      </div>
                    )}
                  </td>
                  <td className="response-cell">
                    <span className="frame-label">They are both...</span>
                    <textarea
                      className="response-input"
                      value={responses[pair.id]?.same || ''}
                      onChange={(e) => handleResponseChange(pair.id, 'same', e.target.value)}
                    />
                  </td>
                  <td className="response-cell">
                    <div className="diff-block">
                      <span className="frame-label">A {pair.item1.text}...</span>
                      <textarea
                        className="response-input"
                        value={responses[pair.id]?.diff1 || ''}
                        onChange={(e) => handleResponseChange(pair.id, 'diff1', e.target.value)}
                      />
                    </div>
                    <div className="diff-block">
                      <span className="frame-label">A {pair.item2.text}...</span>
                      <textarea
                        className="response-input"
                        value={responses[pair.id]?.diff2 || ''}
                        onChange={(e) => handleResponseChange(pair.id, 'diff2', e.target.value)}
                      />
                    </div>
                  </td>
                  {mode === 'custom' && (
                    <td className="action-cell no-print">
                      <button onClick={() => removePair(pair.id)} className="remove-btn">
                        🗑️
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="instructions-footer no-print">
            <p>💡 <strong>Tip:</strong> Use Custom Mode to create your own comparison pairs, or stick with Emoji Mode for quick practice!</p>
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

export default SameDifferentWorksheet;
