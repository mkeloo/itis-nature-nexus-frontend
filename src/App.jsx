import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TrendQueryExamplePage from './pages/TrendQueryExamplePage';

import ClimateBirdCorrelationPage1 from './pages/ClimateBirdCorrelationPage1';
import UrbanizationImpactPage2 from './pages/UrbanizationImpactPage2';
import SeasonalEndangeredAnalysisPage3 from './pages/SeasonalEndangeredAnalysisPage3';
import LongTermTrendsPage4 from './pages/LongTermTrendsPage4';
import ConservationImpactPage5 from './pages/ConservationImpactPage5';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/query-example" element={<TrendQueryExamplePage />} />
        <Route
          path="/climate-correlation"
          element={<ClimateBirdCorrelationPage1 />}
        />
        <Route
          path="/urbanization-impact"
          element={<UrbanizationImpactPage2 />}
        />
        <Route
          path="/seasonal-trends"
          element={<SeasonalEndangeredAnalysisPage3 />}
        />
        <Route path="/long-term-trends" element={<LongTermTrendsPage4 />} />
        <Route
          path="/conservation-impact"
          element={<ConservationImpactPage5 />}
        />
      </Routes>
    </>
  );
}

export default App;
