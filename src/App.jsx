import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TrendQueryExamplePage from './pages/TrendQueryExamplePage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/query1" element={<TrendQueryExamplePage />} />
      </Routes>
    </>
  );
}

export default App;
