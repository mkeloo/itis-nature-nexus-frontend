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

// https://chat.openai.com/share/0e7629c2-00fd-47b1-b3c4-ebdfeaf778a0

const Query1Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query1');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
