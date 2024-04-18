import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const Query1Chart = () => {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/query1?startYear=${startYear}&endYear=${endYear}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startYear, endYear]);

  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
  };

  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="startYear">Start Year:</label>
        <select id="startYear" value={startYear} onChange={handleStartYearChange}>
          <option value="">Select Start Year</option>
          {Array.from({ length: 2023 - 1950 }, (_, index) => {
            const year = 1950 + index;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="endYear">End Year:</label>
        <select id="endYear" value={endYear} onChange={handleEndYearChange}>
          <option value="">Select End Year</option>
          {Array.from({ length: 2023 - 1950 }, (_, index) => {
            const year = 1950 + index;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>
      <div>Total tuples: {data.length}</div>

      <h2>
        Bird Species Count, Precipitation, and Temperature Trends Over Time
      </h2>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="SPECIES_COUNT"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="PRECIPITATION" stroke="#82ca9d" />
        <Line type="monotone" dataKey="AVG_TEMPERATURE" stroke="#ffc658" />
      </LineChart>
    </div>
  );
};

export default Query1Chart;
