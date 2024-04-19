import React, { useState } from 'react';
import Query5Chart from '../Query5/Query5Chart.jsx';
import Query5Chart2 from '../Query5/Query5Chart2.jsx';
import Query5Chart3 from '../Query5/Query5Chart3.jsx';
import Query5Chart4 from '../Query5/Query5Chart4.jsx';
import Query5Chart5 from '../Query5/Query5Chart5.jsx';

function ChartComponent({ query }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        return <div>No chart available</div>;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-full">{renderChart()} </div>
      </div>
      <div className="mt-4">
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
