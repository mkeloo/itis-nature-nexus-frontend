import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Query3Chart from '../components/QueryComponents/Query3/Query3Chart';
import Query3Chart2 from '../components/QueryComponents/Query3/Query3Chart2';

const Page3 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query3');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the tuple count
  const tupleCount = data.length;

  return (
    <div className="container">
      <h1 className="page-title">Bird Observation Trends</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="tuple-count">Tuple count: {tupleCount}</p>
          <div className="chart-container">
            <Query3Chart data={data} />
          </div>
          <div className="chart-container">
            <Query3Chart2 data={data} />
          </div>
        </>
      )}
      <style jsx>{`
        .container {
          margin: 20px;
        }
        .page-title {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .tuple-count {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .chart-container {
          margin-bottom: 40px;
        }
      `}</style>
    </div>
  );
};

export default Page3;
