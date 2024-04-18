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
    <div>
      <button onClick={() => handleClick(1)}>1</button>
      <button onClick={() => handleClick(2)}>2</button>
      <button onClick={() => handleClick(3)}>3</button>
      <button onClick={() => handleClick(4)}>4</button>
      <button onClick={() => handleClick(5)}>5</button>

      {currentPage === 1 && <Query5Chart />}
      {currentPage === 2 && <Query5Chart2 />}
      {currentPage === 3 && <Query5Chart3 />}
      {currentPage === 4 && <Query5Chart4 />}
      {currentPage === 5 && <Query5Chart5 />}
    </div>
  );
}

export default ChartComponent;
