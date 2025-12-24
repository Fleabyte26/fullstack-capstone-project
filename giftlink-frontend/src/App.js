import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="landing-container">
      <div className="content text-center">
        {/* Main heading */}
        <h1 className="display-4">Find the Perfect Gift for Everyone</h1>

        {/* Subheading */}
        <p className="lead my-4">
          GiftLink helps you discover thoughtful, personalized gifts based on age, category, condition, and interests.
        </p>

        {/* Inspirational quote */}
        <blockquote className="blockquote my-5">
          <p className="mb-0">"The best gifts come from the heart, but a little help never hurts."</p>
          <footer className="blockquote-footer text-light">GiftLink Team</footer>
        </blockquote>

        {/* Get Started button - uses React Router Link */}
        <Link to="/gifts" className="btn btn-primary btn-lg px-5 py-3">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default App;