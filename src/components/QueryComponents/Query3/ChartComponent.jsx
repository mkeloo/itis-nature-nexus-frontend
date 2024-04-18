import React, { useState } from 'react';
import Query3Chart from '../Query3/Query3Chart';
import Query3Chart2 from '../Query3/Query3Chart2';
import Query3Chart5 from '../Query3/Query3Chart5';

function ChartComponent({ query }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderChart = () => {
    switch (currentPage) {
      case 1:
        return <Query3Chart query={query} />;
      case 2:
        return <Query3Chart2 query={query} />;
      case 3:
        return <Query3Chart5 query={query} />;
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
        {/* Buttons for page switching */}
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
