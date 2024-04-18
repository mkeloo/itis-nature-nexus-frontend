import React, { useState } from 'react';
import Query5Chart from '../QueryComponents/Query5/Query5Chart.jsx';
import Query5Chart2 from '../QueryComponents/Query5/Query5Chart2.jsx';
import Query5Chart3 from '../QueryComponents/Query5/Query5Chart3.jsx';
import Query5Chart4 from '../QueryComponents/Query5/Query5Chart4.jsx';
import Query5Chart5 from '../QueryComponents/Query5/Query5Chart5.jsx';

function ChartComponent({ query }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render the appropriate chart based on the current page
  const renderChart = () => {
    switch (currentPage) {
      case 1:
        return <Query5Chart4 query={query} />;
      case 2:
        return <Query5Chart5 query={query} />;
      case 3:
        return <Query5Chart query={query} />;
      case 4:
        return <Query5Chart2 query={query} />;
      case 5:
        return <Query5Chart3 query={query} />;
      default:
        return <div>No chart available</div>; // Default case if no page matches
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-full">
          {renderChart()}{' '}
          {/* Call renderChart to display the appropriate chart */}
        </div>
      </div>
      <div className="mt-4">
        {/* Buttons for page switching */}
        {[1, 2, 3, 4, 5].map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            className={`px-3 py-1 border rounded ${
              currentPage === pageNumber
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ChartComponent;
