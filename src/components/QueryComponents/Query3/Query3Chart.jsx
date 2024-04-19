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

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  // You need to extract the selected year range from the query object
  const startYear = query.startYear;
  const endYear = query.endYear;

  // Custom Tooltip component to show details on hover
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>{`Bird Species: ${data.SCIENTIFICNAME}`}</p>
          <p>{`Year: ${data.YEAR}`}</p>
          <p>{`Growth Rate: ${data.GROWTH_RATE_PERCENTAGE.toFixed(2)}%`}</p>
          <p>{`Observation Count: ${data.OBSERVATION_COUNT}`}</p>
        </div>
      );
    }
    return null;
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
          // Set the domain dynamically based on the selected year range
          domain={[startYear, endYear]}
        >
          <Label value="Year" position="bottom" />
        </XAxis>
        <YAxis
          type="number"
          dataKey="GROWTH_RATE_PERCENTAGE"
          name="Growth Rate (%)"
          domain={['auto', 'auto']}
        >
          <Label value="Growth Rate (%)" position="left" angle={-90} />
        </YAxis>
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          content={<CustomTooltip />}
        />
        <Legend />
        <Scatter
          name="Bird Observations"
          data={data}
          fill="#8884d8"
          shape="circle"
          cx="20"
          cy="20"
        />
      </ScatterChart>
    </div>
  );
};

export default Query3Chart;
