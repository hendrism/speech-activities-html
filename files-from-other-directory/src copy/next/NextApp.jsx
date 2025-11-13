import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NextHomePage from './pages/NextHomePage';
import ActivityShowcase from './pages/ActivityShowcase';
import BlueprintWorkbench from './pages/BlueprintWorkbench';
import ResourceStudio from './pages/ResourceStudio';
import './data';
import './content';

const NextApp = () => {
  return (
    <Routes>
      <Route path="/" element={<NextHomePage />} />
      <Route path="/activities/:activityId" element={<ActivityShowcase />} />
      <Route path="/workbench" element={<BlueprintWorkbench />} />
      <Route path="/resources" element={<ResourceStudio />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default NextApp;
