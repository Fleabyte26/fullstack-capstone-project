import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';

// Placeholder for Gift Details page (until it's built)
const GiftDetailsPlaceholder = () => {
  return (
    <div className="container my-5 text-center">
      <h2>Gift Details</h2>
      <p>This page will display individual gift details in a future lab.</p>
      <a href="/gifts" className="btn btn-primary mt-3">← Back to Gifts</a>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/gifts" element={<MainPage />} />
          <Route path="/gifts/:id" element={<GiftDetailsPlaceholder />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);