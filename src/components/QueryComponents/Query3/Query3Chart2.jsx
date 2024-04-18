import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Query3LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query3');
        const processedData = processData(response.data);
        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const processData = (rawData) => {
    // Group data by year and calculate mean growth rate
    const groupedData = rawData.reduce((acc, cur) => {
      if (!acc[cur.YEAR]) {
        acc[cur.YEAR] = { YEAR: cur.YEAR, sum: 0, count: 0 };
      }
      acc[cur.YEAR].sum += cur.GROWTH_RATE_PERCENTAGE;
      acc[cur.YEAR].count++;
      return acc;
    }, {});

    // Calculate mean growth rate for each year
    const processedData = Object.values(groupedData).map((entry) => ({
      YEAR: entry.YEAR,
      'Mean Growth Rate': entry.sum / entry.count,
    }));

    return processedData;
  };

  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 20,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="YEAR" label={{ value: 'Year', position: 'bottom' }} />
      <YAxis label={{ value: 'Mean Growth Rate', angle: -90, position: 'insideLeft' }} />
      <Tooltip />
      <Legend layout="vertical" align="right" verticalAlign="middle" />
      <Line type="monotone" dataKey="Mean Growth Rate" name="Mean Growth Rate" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Query3LineChart;
