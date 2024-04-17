import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios'; // Import axios for making HTTP requests
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Defined component Geo_HeatMap_Query4
const Geo_HeatMap_Query4 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query4');
        // Process and map the data to fit the ScatterChart format
        const processedData = response.data.map((item) => ({
          STATEPROVINCE: item.STATEPROVINCE,
          YEAR: item.YEAR,
          OBSERVATION_COUNT: item.OBSERVATION_COUNT,
        }));
        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis type="category" dataKey="STATEPROVINCE" name="State Province" />
        <YAxis type="number" dataKey="YEAR" name="Year" />
        <ZAxis
          type="number"
          dataKey="OBSERVATION_COUNT"
          range={[4, 20]}
          name="Observation Count"
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Observation Count" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default Geo_HeatMap_Query4;
