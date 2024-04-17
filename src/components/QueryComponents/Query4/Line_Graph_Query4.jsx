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
  ResponsiveContainer,
} from 'recharts';

const LineGraph = ({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="YEAR" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="SPECIES_COUNT"
        name="Species Count"
        stroke="#8884d8"
      />
      <Line
        type="monotone"
        dataKey="BIODIVERSITY_INDEX"
        name="Biodiversity Index"
        stroke="#82ca9d"
      />
    </LineChart>
  </ResponsiveContainer>
);

const Line_Graph_Query = () => {
  const [data, setData] = useState([]); // State to hold data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query4');
        // Assuming the response.data is an array of objects as shown in your JSON example
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <LineGraph data={data} />;
};

export default Line_Graph_Query;
