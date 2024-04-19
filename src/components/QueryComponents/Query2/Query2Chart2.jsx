// BiodiversityPrecipitationRatioChart.jsx

import React, { useEffect, useState } from 'react';
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

const BiodiversityPrecipitationRatioChart = ({ query }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query2', {
          params: query,
        });
        // Process data to include a new property for the ratio
        const processedData = response.data.map((item) => ({
          ...item,
          BIODIVERSITY_TO_PRECIPITATION_RATIO:
            item.BIODIVERSITY_SCORE / item.PRECIPITATION_MEDIAN,
        }));
        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <LineChart width={1100} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="YEAR" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="BIODIVERSITY_TO_PRECIPITATION_RATIO"
        stroke="#ff7300"
        name="Biodiversity/Precipitation Ratio"
      />
    </LineChart>
  );
};

export default BiodiversityPrecipitationRatioChart;
