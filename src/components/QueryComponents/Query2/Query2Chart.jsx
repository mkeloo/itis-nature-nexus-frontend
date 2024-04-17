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
          const dataWithRatio = result.map(entry => ({
            ...entry,
            BIODIVERSITY_TO_PRECIPITATION_RATIO: entry.BIODIVERSITY_SCORE / entry.PRECIPITATION_MEDIAN
          }));
          setData(dataWithRatio);
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
      <div>Total tuples: {numTuples}</div>
      
      <h2>Biodiversity Index and Temperature Median Over Time</h2>
      <LineChart width={1000} height={600} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="BIODIVERSITY_SCORE" stroke="#8884d8" name="Biodiversity Score" />
        <Line type="monotone" dataKey="TEMPERATURE_MEDIAN" stroke="#ffc658" name="Temperature Median" />
      </LineChart>

      <h2>Biodiversity Index to Precipitation Median Ratio Over Time</h2>
      <LineChart width={1000} height={600} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="YEAR" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="BIODIVERSITY_TO_PRECIPITATION_RATIO" stroke="#ff0000" name="Biodiversity/Precipitation Ratio" />
      </LineChart>
    </div>
  );
};

export default Query2Chart;
