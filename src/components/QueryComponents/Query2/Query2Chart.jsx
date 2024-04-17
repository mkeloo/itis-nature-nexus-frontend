import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

const Query2Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/query2');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result.map(item => ({
          year: item.YEAR,
          biodiversity_score: item.BIODIVERSITY_SCORE,
          precipitation_median: item.PRECIPITATION_MEDIAN,
          temperature_median: item.TEMPERATURE_MEDIAN
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Diversity Index Line Chart</h2>
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="biodiversity_score" stroke="#8884d8" />
      </LineChart>

      <h2>Climate Data Bar Chart</h2>
      <BarChart width={800} height={400} data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Bar dataKey="precipitation_median" fill="#82ca9d" />
        <Bar dataKey="temperature_median" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Query2Chart;
