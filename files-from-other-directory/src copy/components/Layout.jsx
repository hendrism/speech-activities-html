import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🗣️</span>
            <h1>Speech Therapy Activities Hub</h1>
          </Link>

          {!isHomePage && (
            <nav className="nav-controls">
              <Link to="/activity-builder" className="nav-link builder-link">
                🛠️ Builder
              </Link>
              <Link to="/" className="nav-link home-link">
                🏠 Home
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <div className="footer-content">
          <p>Speech Therapy Activities Hub - Interactive learning activities for speech and language development</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;