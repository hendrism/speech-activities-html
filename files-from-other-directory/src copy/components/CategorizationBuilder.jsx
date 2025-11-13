import React, { useState, useEffect } from 'react';
import { useIconManager } from '../hooks/useIconManager';
import IconManager from '../components/IconManager';
import './CategorizationBuilder.css';

const randomPastel = () => {
  const hues = [210, 260, 320, 30, 140, 190];
  const hue = hues[Math.floor(Math.random() * hues.length)];
  return `hsl(${hue}, 70%, 85%)`;
};

const createCategory = () => ({
  id: Date.now() + Math.random(),
  name: 'New Category',
  color: randomPastel()
});

const createItem = (categoryId = null) => ({
  id: Date.now() + Math.random(),
  text: '',
  categoryId,
  hint: ''
});

const defaultInstructions = 'Sort each card into the correct category. Use the hints if you get stuck!';

const CategorizationBuilder = ({ onPreview, onBack, editingActivity }) => {
  const [activity, setActivity] = useState({
    title: '',
    instructions: defaultInstructions,
    categories: [createCategory(), createCategory()],
    items: []
  });
  const [editMode, setEditMode] = useState(false);
  const [iconPanelOpen, setIconPanelOpen] = useState(false);

  const iconManager = useIconManager();

  useEffect(() => {
    if (editingActivity && editingActivity.type === 'categorization') {
      setActivity({
        title: editingActivity.title || '',
        instructions: editingActivity.instructions || defaultInstructions,
        categories: editingActivity.categories?.length
          ? editingActivity.categories
          : [createCategory(), createCategory()],
        items: editingActivity.items?.length
          ? editingActivity.items
          : []
      });
    }
  }, [editingActivity]);

  useEffect(() => {
    setActivity(prev => {
      if ((editingActivity && editingActivity.type === 'categorization') || prev.items.length > 0) {
        return prev;
      }

      const firstCategoryId = prev.categories[0]?.id || null;
      return {
        ...prev,
        items: [createItem(firstCategoryId), createItem(firstCategoryId)]
      };
    });
  }, [editingActivity]);

  const addCategory = () => {
    setActivity(prev => {
      const newCategory = createCategory();
      const items = prev.items.length ? prev.items : [createItem(prev.categories[0]?.id)];
      return {
        ...prev,
        categories: [...prev.categories, newCategory],
        items
      };
    });
  };

  const updateCategory = (id, field, value) => {
    setActivity(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === id ? { ...category, [field]: value } : category
      )
    }));
  };

  const deleteCategory = (id) => {
    setActivity(prev => {
      if (prev.categories.length <= 2) {
        return prev;
      }

      const remaining = prev.categories.filter(category => category.id !== id);
      const fallbackCategoryId = remaining[0]?.id;

      return {
        ...prev,
        categories: remaining,
        items: prev.items.map(item =>
          item.categoryId === id ? { ...item, categoryId: fallbackCategoryId } : item
        )
      };
    });
  };

  const addItem = () => {
    setActivity(prev => {
      const firstCategoryId = prev.categories[0]?.id || null;
      return {
        ...prev,
        items: [...prev.items, createItem(firstCategoryId)]
      };
    });
  };

  const updateItem = (itemId, field, value) => {
    setActivity(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    }));
  };

  const deleteItem = (itemId) => {
    setActivity(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const withMinimumCategories = (categories) => {
    if (categories.length >= 2) return categories;
    return [...categories, createCategory()];
  };

  const saveActivity = () => {
    const activities = JSON.parse(localStorage.getItem('customActivities') || '[]');

    const trimmedCategories = withMinimumCategories(
      activity.categories
        .filter(category => category.name.trim() !== '')
        .map(category => ({
          ...category,
          name: category.name.trim()
        }))
    );

    const fallbackCategoryId = trimmedCategories[0]?.id;

    const cleanedItems = activity.items
      .filter(item => item.text.trim() !== '')
      .map(item => ({
        ...item,
        text: item.text.trim(),
        hint: item.hint?.trim() || '',
        categoryId: trimmedCategories.find(cat => cat.id === item.categoryId)?.id || fallbackCategoryId
      }));

    const payload = {
      title: activity.title.trim() || 'Categorization Activity',
      instructions: activity.instructions.trim() || defaultInstructions,
      categories: trimmedCategories,
      items: cleanedItems,
      type: 'categorization'
    };

    if (editingActivity && editingActivity.id) {
      const updatedActivity = {
        ...editingActivity,
        ...payload,
        updatedAt: new Date().toISOString()
      };

      const updatedActivities = activities.map(act =>
        act.id === editingActivity.id ? updatedActivity : act
      );

      localStorage.setItem('customActivities', JSON.stringify(updatedActivities));
      alert('Categorization activity updated successfully!');
    } else {
      const newActivity = {
        ...payload,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      activities.push(newActivity);
      localStorage.setItem('customActivities', JSON.stringify(activities));
      alert('Categorization activity saved!');
    }
  };

  const handlePreview = () => {
    const trimmedCategories = withMinimumCategories(
      activity.categories
        .filter(category => category.name.trim() !== '')
        .map(category => ({
          ...category,
          name: category.name.trim()
        }))
    );

    const fallbackCategoryId = trimmedCategories[0]?.id;

    const cleanedItems = activity.items
      .filter(item => item.text.trim() !== '')
      .map(item => ({
        ...item,
        text: item.text.trim(),
        hint: item.hint?.trim() || '',
        categoryId: trimmedCategories.find(cat => cat.id === item.categoryId)?.id || fallbackCategoryId
      }));

    onPreview?.({
      title: activity.title.trim() || 'Categorization Activity',
      instructions: activity.instructions.trim() || defaultInstructions,
      categories: trimmedCategories,
      items: cleanedItems,
      type: 'categorization'
    });
  };

  return (
    <div className="categorization-builder">
      <header className="activity-header">
        <div className="header-content">
          <h1>📊 Categorization Activity Builder</h1>
          <div className="header-info">
            {editingActivity?.type === 'categorization'
              ? '✏️ Editing Categorization Activity'
              : 'Create a sorting activity with multiple categories'}
          </div>
          <div className="header-controls">
            <button onClick={onBack} className="icon-btn">
              ← Back to Wizard
            </button>
            <button onClick={handlePreview} className="icon-btn success">
              👁️ Preview
            </button>
            <button onClick={saveActivity} className="icon-btn success">
              💾 {editingActivity?.type === 'categorization' ? 'Update' : 'Save'}
            </button>
            <button onClick={() => setIconPanelOpen(true)} className="icon-btn">
              🎨 Icons
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`icon-btn ${editMode ? 'active' : ''}`}
            >
              {editMode ? '✅ Exit Edit' : '✏️ Edit Mode'}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="activity-info">
          <h2>📝 Activity Information</h2>
          <div className="form-group">
            <label>Activity Title:</label>
            <input
              type="text"
              value={activity.title}
              onChange={(e) => setActivity(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter activity title..."
            />
          </div>

          <div className="form-group">
            <label>Instructions for Students:</label>
            <textarea
              value={activity.instructions}
              onChange={(e) => setActivity(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Explain how students should sort the cards into categories..."
              rows={3}
            />
          </div>
        </div>

        <div className="categories-panel">
          <div className="section-header">
            <h2>🗂️ Categories ({activity.categories.length})</h2>
            <button onClick={addCategory} className="add-category-btn">
              ➕ Add Category
            </button>
          </div>

          <div className="categories-list">
            {activity.categories.map((category, index) => (
              <div key={category.id} className={`category-card ${editMode ? 'edit-mode' : ''}`}>
                <div className="category-header">
                  <h3>Category {index + 1}</h3>
                  {activity.categories.length > 2 && (
                    <button onClick={() => deleteCategory(category.id)} className="delete-category-btn">
                      🗑️ Remove
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label>Category Name</label>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                    placeholder="e.g., Mammals"
                  />
                </div>

                <div className="form-group">
                  <label>Card Highlight Color</label>
                  <input
                    type="color"
                    value={category.color || '#eef2ff'}
                    onChange={(e) => updateCategory(category.id, 'color', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="items-section">
          <div className="section-header">
            <h2>🃏 Sorting Cards ({activity.items.length})</h2>
            <button onClick={addItem} className="add-item-btn">
              ➕ Add Card
            </button>
          </div>

          {activity.items.length === 0 ? (
            <div className="empty-state">
              <p>No cards yet. Add at least 6 cards to build engagement.</p>
            </div>
          ) : (
            <div className="items-list">
              {activity.items.map((item, index) => (
                <div key={item.id} className={`item-card ${editMode ? 'edit-mode' : ''}`}>
                  <div className="item-header">
                    <h3>Card {index + 1}</h3>
                    <button onClick={() => deleteItem(item.id)} className="delete-item-btn">
                      🗑️ Remove
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Card Text</label>
                    <textarea
                      value={item.text}
                      onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                      placeholder="e.g., Dolphin"
                      rows={2}
                    />
                  </div>

                  <div className="form-group">
                    <label>Correct Category</label>
                    <select
                      value={String(item.categoryId ?? activity.categories[0]?.id ?? '')}
                      onChange={(e) => {
                        const selected = Number(e.target.value);
                        const fallback = activity.categories[0]?.id || null;
                        updateItem(
                          item.id,
                          'categoryId',
                          Number.isNaN(selected) ? fallback : selected
                        );
                      }}
                    >
                      {activity.categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name || 'Untitled Category'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Hint (optional)</label>
                    <input
                      type="text"
                      value={item.hint || ''}
                      onChange={(e) => updateItem(item.id, 'hint', e.target.value)}
                      placeholder="Provide a clue students can access in play mode"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="activity-summary">
          <h3>📊 Activity Summary</h3>
          <div className="summary-grid">
            <div className="summary-card">
              <span className="summary-number">{activity.categories.length}</span>
              <span className="summary-label">Categories</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">{activity.items.length}</span>
              <span className="summary-label">Cards</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">
                {activity.items.filter(item => item.hint?.trim()).length}
              </span>
              <span className="summary-label">Hints</span>
            </div>
          </div>
        </div>

        <div className="builder-tips">
          <h4>✨ Builder Tips</h4>
          <ul>
            <li>Aim for at least two categories and six or more cards for variety.</li>
            <li>Use hints to scaffold students who need extra support.</li>
            <li>Colors help visually differentiate categories during play.</li>
          </ul>
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

export default CategorizationBuilder;
