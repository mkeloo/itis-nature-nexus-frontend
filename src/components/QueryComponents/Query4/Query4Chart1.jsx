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

const processData = (rawData) => {
  const groupedData = {};
  rawData.forEach((item) => {
    const { STATEPROVINCE, YEAR, TOTAL_OBSERVATIONS } = item;
    groupedData[YEAR] = groupedData[YEAR] || {};
    groupedData[YEAR][STATEPROVINCE] =
      (groupedData[YEAR][STATEPROVINCE] || 0) + TOTAL_OBSERVATIONS;
  });

  return Object.entries(groupedData).map(([year, observations]) => ({
    year,
    ...observations,
  }));
};

const generateHue = (index) => (index * 137.508) % 360;

const TimeSeriesChart = ({ data, stateProvinces }) => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      {stateProvinces.map((province, index) => (
        <Line
          key={`${province}-${index}`}
          type="monotone"
          dataKey={province}
          stroke={`hsl(${generateHue(index)}, 70%, 50%)`}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

const TotalObservationsOverTime = ({ query }) => {
  const [data, setData] = useState([]);
  const [stateProvinces, setStateProvinces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query4', {
          params: query,
        });

        const processedData = processData(response.data);
        setData(processedData);

        const stateProvincesSet = new Set(
          processedData.flatMap((item) =>
            Object.keys(item).filter((key) => key !== 'year')
          )
        );

        setStateProvinces([...stateProvincesSet]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return <TimeSeriesChart data={data} stateProvinces={stateProvinces} />;
};

export default TotalObservationsOverTime;
