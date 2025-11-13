import React from 'react';
import ContextCluesDetective from './ContextCluesDetective';
import { fallContextCluesPassages } from '../data/fallContextCluesData';

const fallLevelInfo = {
  1: {
    label: '🍁 Level 1',
    description: 'Early Fall Words\nFriendly context clues'
  },
  2: {
    label: '🍂 Level 2',
    description: 'Challenging Autumn Vocabulary\nUse every clue'
  }
};

const FallContextClues = () => (
  <ContextCluesDetective
    customPassages={fallContextCluesPassages}
    headerTitle="🍂 Fall Context Clues Detective"
    introText="Use cozy autumn context clues to uncover the meaning of each bold fall word."
    badgeLabel="🍂 FALL WORD DETECTIVE"
    caseLabelPrefix="🍂 Case #"
    levelInfo={fallLevelInfo}
  />
);

export default FallContextClues;
