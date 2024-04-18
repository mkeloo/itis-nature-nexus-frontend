// MainPage.js
import React, { useState } from 'react';
import TitleComponent from '../components/PageComponents/TitleComponent.jsx';
import SidebarComponent from '../components/PageComponents/SidebarComponent';
import ChartComponent from '../components/PageComponents/ChartComponent';
import DataTableComponent from '../components/PageComponents/DataTableComponent';

const MainPage = ({ queryTitle }) => {
  const [query, setQuery] = useState({
    // Default query parameters
  });
  const [displayQuery, setDisplayQuery] = useState('');

  const handleInputChange = (e) => {
    // Handle input change
  };

  const handleSubmit = (e) => {
    // Handle form submission
  };

  const tableData = [
    // Placeholder data
  ];

  return (
    <>
      <TitleComponent title={queryTitle} />
      <div className="flex flex-row min-h-screen bg-gray-100">
        <SidebarComponent
          query={query}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          displayQuery={displayQuery}
        />
        <div className="flex flex-col w-5/6 p-4 justify-center items-center">
          {/* <ChartComponent chartData=Pass chart data here /> */}
          <DataTableComponent tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
