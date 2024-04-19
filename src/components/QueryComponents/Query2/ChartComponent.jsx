// ChartComponent.js
import React, { useState } from 'react';
import Query2Chart1 from '../Query2/Query2Chart1';
import Query2Chart2 from '../Query2/Query2Chart2';
import Query2Chart3 from '../Query2/Query2Chart3';

function ChartComponent({ query }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderChart = () => {
    switch (currentPage) {
      case 1:
        return <Query2Chart1 query={query} />;
      case 2:
        return <Query2Chart2 query={query} />;
      case 3:
        return <Query2Chart3 query={query} />;
      default:
        return <div>No chart available</div>;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-full">{renderChart()}</div>
      </div>
      <div className="mt-4">
        {[1, 2, 3].map((pageNumber) => (
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
