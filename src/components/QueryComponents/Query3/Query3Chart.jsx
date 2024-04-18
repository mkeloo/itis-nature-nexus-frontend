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

const Query3Chart = () => {
  const [data, setData] = useState([]);
  const [startYear, setStartYear] = useState(2000);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [growthRateThreshold, setGrowthRateThreshold] = useState('0.00');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/query3?startYear=${startYear}&endYear=${endYear}&growthRateThreshold=${growthRateThreshold}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startYear, endYear, growthRateThreshold]);

  const handleStartYearChange = (e) => {
    setStartYear(parseInt(e.target.value));
  };

  const handleEndYearChange = (e) => {
    setEndYear(parseInt(e.target.value));
  };

  const handleGrowthRateThresholdChange = (e) => {
    setGrowthRateThreshold(parseFloat(e.target.value).toFixed(2));
  };

  return (
    <div>
      <div>
        <label htmlFor="startYear">Start Year:</label>
        <select id="startYear" value={startYear} onChange={handleStartYearChange}>
          {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, index) => {
            const year = 1950 + index;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="endYear">End Year:</label>
        <select id="endYear" value={endYear} onChange={handleEndYearChange}>
          {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, index) => {
            const year = 1950 + index;
            return <option key={year} value={year}>{year}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="growthRateThreshold">Growth Rate Threshold (e.g. 50% increase or decrease):</label>
        <select id="growthRateThreshold" value={growthRateThreshold} onChange={handleGrowthRateThresholdChange}>
          {Array.from({ length: 21 }, (_, index) => {
            const threshold = (index / 20).toFixed(2);
            return <option key={threshold} value={threshold}>{threshold}</option>;
          })}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>Bird Species Growth Rates Over Time</h2>
          <LineChart
            width={1200}
            height={600}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="YEAR" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="GROWTH_RATE_PERCENTAGE" stroke="#8884d8" name="Growth Rate Percentage" />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default Query3Chart;
