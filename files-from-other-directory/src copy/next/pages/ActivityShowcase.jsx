import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ActivityPlayer from '../components/ActivityPlayer';
import { useActivity } from '../lib/useActivity';
import './ActivityShowcase.css';

const ActivityShowcase = () => {
  const { activityId } = useParams();
  const { activity } = useActivity(activityId);

  if (!activity) {
    return (
      <div className="activity-showcase">
        <h1>Activity not found</h1>
        <p>The requested activity blueprint was not located. It may not be registered yet.</p>
        <Link to="/next" className="back-link">← Back to Next-Gen hub</Link>
      </div>
    );
  }

  return (
    <div className="activity-showcase">
      <div className="activity-showcase__toolbar">
        <Link to="/next" className="back-link">← Back</Link>
        <Link to="/next/workbench" className="toolbar-link">Open Workbench</Link>
      </div>
      <ActivityPlayer activity={activity} />
    </div>
  );
};

export default ActivityShowcase;
