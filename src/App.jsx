import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TrendQueryExamplePage from './pages/TrendQueryExamplePage';

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/query-example" element={<TrendQueryExamplePage />} />
        <Route path="/climate-correlation" element={<Page1 />} />
        <Route path="/urbanization-impact" element={<Page2 />} />
        <Route path="/seasonal-trends" element={<Page3 />} />
        <Route path="/long-term-trends" element={<Page4 />} />
        <Route path="/conservation-impact" element={<Page5 />} />
      </Routes>
    </>
  );
}

export default App;
