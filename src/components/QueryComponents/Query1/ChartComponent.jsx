import React, { useState } from 'react';
import Query1Chart1 from '../Query1/Query1Chart1.jsx';
import Query1Chart2 from '../Query1/Query1Chart2.jsx';

function ChartComponent({ query }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderChart = () => {
    switch (currentPage) {
      case 1:
        return <Query1Chart1 query={query} />;
      case 2:
        return <Query1Chart2 query={query} />;
      default:
        return <div>No chart available</div>;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-full">{renderChart()} </div>
      </div>
      <div className="mt-4">
        {[1, 2].map((pageNumber) => (
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
