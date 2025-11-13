import React from 'react';
import CompareContrast from './CompareContrast';
import { fallCompareContrastActivities } from '../data/fallCompareContrastData';

const FallCompareContrast = () => (
  <CompareContrast
    customActivities={fallCompareContrastActivities}
    headerTitle="🍁 Fall Compare & Contrast"
    showDifficultyToggle
    defaultDifficulty="easy"
    activityCounterLabel="Comparison"
  />
);

export default FallCompareContrast;
