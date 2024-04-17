import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const Query2Chart = () => {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [numTuples, setNumTuples] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (startYear && endYear) {
          const response = await fetch(`http://localhost:3000/api/query2?startYear=${startYear}&endYear=${endYear}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          console.log('called query2', result);
          setData(result);
          setNumTuples(result.length);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [startYear, endYear]); // Trigger useEffect whenever startYear or endYear changes

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
          <option value="1950">1950</option>
          <option value="2000">2000</option>
        </select>
      </div>
      <div>
        <label htmlFor="endYear">End Year:</label>
        <select id="endYear" value={endYear} onChange={handleEndYearChange}>
          <option value="">Select End Year</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div>Total tuples: {numTuples}</div>
      
      {/* Biodiversity Index Over Time */}
      <h2>Biodiversity Index Over Time</h2>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="BIODIVERSITY_SCORE" stroke="#8884d8" name="Biodiversity Score" />
      </LineChart>
      
      {/* Precipitation Median Over Time */}
      <h2>Precipitation Median Over Time</h2>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="PRECIPITATION_MEDIAN" stroke="#82ca9d" name="Precipitation Median" />
      </LineChart>
      
      {/* Temperature Median Over Time */}
      <h2>Temperature Median Over Time</h2>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TEMPERATURE_MEDIAN" stroke="#ffc658" name="Temperature Median" />
      </LineChart>
    </div>
  );
};

export default Query2Chart;
