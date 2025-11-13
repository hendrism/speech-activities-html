import { useState, useEffect } from 'react';

const ICONS_STORAGE_KEY = 'reading-app-icons';
const ASSIGNMENTS_STORAGE_KEY = 'reading-app-assignments';

export const useIconManager = () => {
  const [icons, setIcons] = useState({});
  const [assignments, setAssignments] = useState({});
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [assigningTo, setAssigningTo] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedIcons = localStorage.getItem(ICONS_STORAGE_KEY);
    const storedAssignments = localStorage.getItem(ASSIGNMENTS_STORAGE_KEY);
    
    if (storedIcons) {
      setIcons(JSON.parse(storedIcons));
    }
    
    if (storedAssignments) {
      setAssignments(JSON.parse(storedAssignments));
    }
  }, []);

  // Save icons to localStorage whenever icons change
  useEffect(() => {
    localStorage.setItem(ICONS_STORAGE_KEY, JSON.stringify(icons));
  }, [icons]);

  // Save assignments to localStorage whenever assignments change
  useEffect(() => {
    localStorage.setItem(ASSIGNMENTS_STORAGE_KEY, JSON.stringify(assignments));
  }, [assignments]);

  const generateIconId = () => {
    return 'icon_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const getAssignmentKey = (storyIndex, section, questionIndex, choiceIndex) => {
    return `${storyIndex}-${section}-${questionIndex}-${choiceIndex}`;
  };

  const uploadIcon = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      return Promise.reject(new Error('Please select a valid image file'));
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const iconId = generateIconId();
        const imageData = event.target.result;
        
        setIcons(prevIcons => ({
          ...prevIcons,
          [iconId]: imageData
        }));
        
        resolve(iconId);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  const deleteIcon = (iconId) => {
    if (!icons[iconId]) return;

    // Remove the icon
    setIcons(prevIcons => {
      const newIcons = { ...prevIcons };
      delete newIcons[iconId];
      return newIcons;
    });

    // Remove all assignments using this icon
    setAssignments(prevAssignments => {
      const newAssignments = { ...prevAssignments };
      Object.keys(newAssignments).forEach(key => {
        if (newAssignments[key] === iconId) {
          delete newAssignments[key];
        }
      });
      return newAssignments;
    });
  };

  const clearAllIcons = () => {
    setIcons({});
    setAssignments({});
  };

  const assignIcon = (assignmentKey, iconId) => {
    if (!iconId || !icons[iconId]) return;
    
    setAssignments(prevAssignments => ({
      ...prevAssignments,
      [assignmentKey]: iconId
    }));
  };

  const getIconForAssignment = (assignmentKey) => {
    const iconId = assignments[assignmentKey];
    return iconId && icons[iconId] ? icons[iconId] : null;
  };

  const removeIconAssignment = (assignmentKey) => {
    setAssignments(prevAssignments => {
      const newAssignments = { ...prevAssignments };
      delete newAssignments[assignmentKey];
      return newAssignments;
    });
  };

  return {
    icons,
    assignments,
    selectedIcon,
    assigningTo,
    setSelectedIcon,
    setAssigningTo,
    getAssignmentKey,
    uploadIcon,
    deleteIcon,
    clearAllIcons,
    assignIcon,
    getIconForAssignment,
    removeIconAssignment
  };
};
