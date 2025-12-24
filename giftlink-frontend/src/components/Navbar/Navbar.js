import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();  // To highlight active link

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">  {/* Dark theme looks better with our landing page */}
      <Link className="navbar-brand" to="/">GiftLink</Link>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">  {/* ml-auto pushes links to the right */}
          {/* Task 1: Add links to Home and Gifts */}
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link ${location.pathname.startsWith('/gifts') ? 'active' : ''}`} 
              to="/gifts"
            >
              Gifts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}