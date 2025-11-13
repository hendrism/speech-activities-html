import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { listActivities } from '../lib/registry';
import './ActivityCatalog.css';

const formatGradeBands = (bands = []) => {
  if (!bands.length) return 'All grades';
  return bands.join(', ');
};

const ActivityCatalog = () => {
  const activities = useMemo(() => listActivities(), []);

  return (
    <section className="activity-catalog">
      <header className="activity-catalog__header">
        <h2>Activity Blueprints</h2>
        <p>Definitions powered by the new schema. Each blueprint can drive multiple presentation styles and support levels.</p>
      </header>

      <div className="activity-catalog__grid">
        {activities.map((activity) => (
          <Link key={activity.id} to={`/next/activities/${activity.id}`} className="activity-card">
            <div className="activity-card__icon">{activity.meta?.icon || '📘'}</div>
            <div className="activity-card__body">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <dl className="activity-card__meta">
                <div>
                  <dt>Domain</dt>
                  <dd>{activity.domain}</dd>
                </div>
                <div>
                  <dt>Grade Bands</dt>
                  <dd>{formatGradeBands(activity.audience?.gradeBands)}</dd>
                </div>
                <div>
                  <dt>Sequences</dt>
                  <dd>{activity.sequences.length}</dd>
                </div>
              </dl>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ActivityCatalog;
