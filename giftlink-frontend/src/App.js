import React from 'react';
import './App.css'; // Keep if there's existing styles, or remove if not needed

function App() {
  return (
    <div className="container my-5">
      <div className="text-center content">
        <h1 className="display-4">Find the Perfect Gift for Everyone</h1>
        
        <p className="lead my-4">
          GiftLink helps you discover thoughtful, personalized gifts based on age, category, condition, and interests.
        </p>
        
        <blockquote className="blockquote my-5">
          <p className="mb-0">"The best gifts come from the heart, but a little help never hurts."</p>
          <footer className="blockquote-footer">GiftLink Team</footer>
        </blockquote>
        
        <a href="/gifts" className="btn btn-primary btn-lg px-5 py-3">
          Get Started
        </a>
      </div>
    </div>
  );
}

export default App;