// ChartComponent.js
import React, { useState } from 'react';
import Query5Chart from '../QueryComponents/Query5/Query5Chart.jsx';
import Query5Chart2 from '../QueryComponents/Query5/Query5Chart2.jsx';
import Query5Chart3 from '../QueryComponents/Query5/Query5Chart3.jsx';
import Query5Chart4 from '../QueryComponents/Query5/Query5Chart4.jsx';
import Query5Chart5 from '../QueryComponents/Query5/Query5Chart5.jsx';

function ChartComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-full">
          {currentPage === 1 && <Query5Chart />}
          {currentPage === 2 && <Query5Chart2 />}
          {currentPage === 3 && <Query5Chart3 />}
          {currentPage === 4 && <Query5Chart4 />}
          {currentPage === 5 && <Query5Chart5 />}
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleClick(1)}
          className={`px-3 py-1 border rounded ${
            currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          1
        </button>
        <button
          onClick={() => handleClick(2)}
          className={`px-3 py-1 border rounded ${
            currentPage === 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          2
        </button>
        <button
          onClick={() => handleClick(3)}
          className={`px-3 py-1 border rounded ${
            currentPage === 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          3
        </button>
        <button
          onClick={() => handleClick(4)}
          className={`px-3 py-1 border rounded ${
            currentPage === 4 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          4
        </button>
        <button
          onClick={() => handleClick(5)}
          className={`px-3 py-1 border rounded ${
            currentPage === 5 ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          5
        </button>
      </div>
    </div>
  );
}

export default ChartComponent;
