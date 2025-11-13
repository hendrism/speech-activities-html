import React from 'react';
import { Link } from 'react-router-dom';
import ActivityCatalog from '../components/ActivityCatalog';
import './NextHomePage.css';

const NextHomePage = () => {
  return (
    <div className="next-home">
      <header className="next-home__hero">
        <h1>Next-Gen Speech Therapy Hub</h1>
        <p>
          This space hosts the redesign that unifies passages, activities, scaffolds, and clinician tools under a single data-driven architecture.
        </p>
      </header>

      <section className="next-home__grid">
        <article className="next-home__card">
          <h2>Composable Activities</h2>
          <p>
            Activities will be defined with reusable building blocks (passages, prompts, response widgets, supports) so one story can power multiple goals and levels.
          </p>
        </article>
        <article className="next-home__card">
          <h2>Adaptive Supports</h2>
          <p>
            Every task exposes scaffold tiers—independent, hint, choices—so you can tune support instantly during a session.
          </p>
        </article>
        <article className="next-home__card">
          <h2>Clinician Workflow</h2>
          <p>
            Designed for live screen-sharing: quick controls, large tap targets, and a streamlined builder for rapid customization.
          </p>
        </article>
        <article className="next-home__card">
          <h2>Resource Studio</h2>
          <p>
            Explore the shared content bank—stories, vocabulary, grammar, and articulation decks—then spin up preview activities on demand.
          </p>
          <Link to="/next/resources" className="next-home__cta">
            Open Resource Studio →
          </Link>
        </article>
      </section>

      <ActivityCatalog />

      <footer className="next-home__footer">
        <p>
          This route is under active development. The legacy activities remain available from the main home page while the redesign takes shape.
        </p>
      </footer>
    </div>
  );
};

export default NextHomePage;
