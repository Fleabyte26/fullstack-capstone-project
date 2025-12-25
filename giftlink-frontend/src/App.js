import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage'; // ✅ NEW

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home */}
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<MainPage />} />

        {/* Auth Routes */}
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/register" element={<RegisterPage />} />

        {/* Search Page */}
        <Route path="/app/search" element={<SearchPage />} />

        {/* Product Details Page */}
        <Route path="/app/product/:productId" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
