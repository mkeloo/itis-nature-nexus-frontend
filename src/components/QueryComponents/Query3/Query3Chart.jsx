import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from 'recharts';

const Query3Chart = ({ query }) => {
  const [data, setData] = useState([]);
  const [activePoint, setActivePoint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the query object directly to pass parameters to the API
        const response = await axios.get('http://localhost:3000/api/query3', {
          params: query,
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]); // Dependency on query to refetch data when query parameters change

  const handleMouseEnter = (point) => {
    setActivePoint(point);
  };

  const handleMouseLeave = () => {
    setActivePoint(null);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Bird Observations Growth Rate</h2>
      <ScatterChart
        width={800}
        height={600}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="YEAR"
          name="Year"
          domain={['dataMin', 'dataMax']}
        >
          <Label value="Year" position="bottom" />
        </XAxis>
        <YAxis
          type="number"
          dataKey="GROWTH_RATE_PERCENTAGE"
          name="Growth Rate (%)"
          domain={[-100, 100]}
        >
          <Label value="Growth Rate (%)" position="left" angle={-90} />
        </YAxis>
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          content={<CustomTooltip activePoint={activePoint} />}
        />
        <Legend />
        <Scatter
          name="Bird Observations"
          data={data}
          fill="#8884d8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </ScatterChart>
    </div>
  );
};

const CustomTooltip = ({ activePoint }) => {
  if (!activePoint) return null;

  const { payload } = activePoint;
  if (!payload || payload.length === 0) return null;

  const { SCIENTIFICNAME, YEAR, GROWTH_RATE_PERCENTAGE, OBSERVATION_COUNT } =
    payload[0].payload;

  return (
    <div className="custom-tooltip">
      <p>{`Bird Species: ${SCIENTIFICNAME}`}</p>
      <p>{`Year: ${YEAR}`}</p>
      <p>{`Growth Rate: ${GROWTH_RATE_PERCENTAGE.toFixed(2)}%`}</p>
      <p>{`Observation Count: ${OBSERVATION_COUNT}`}</p>
    </div>
  );
};

export default Query3Chart;
