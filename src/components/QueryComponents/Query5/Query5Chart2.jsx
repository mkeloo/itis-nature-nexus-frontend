import React, { useEffect, useState } from 'react';
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import axios from 'axios';

const COLORS = [
  '#8884d8',
  '#83a6ed',
  '#8dd1e1',
  '#82ca9d',
  '#a4de6c',
  '#d0ed57',
  '#ffc658',
  '#ff7300',
];

// Function to process your fetched data into the required structure for the RadialBarChart
const processData = (rawData) => {
  const stateProvinceMap = new Map();

  rawData.forEach((item) => {
    if (!stateProvinceMap.has(item.STATEPROVINCE)) {
      stateProvinceMap.set(item.STATEPROVINCE, new Set());
    }
    stateProvinceMap.get(item.STATEPROVINCE).add(item.FAMILY);
  });

  const chartData = Array.from(
    stateProvinceMap,
    ([stateProvince, familySet]) => ({
      name: stateProvince,
      families: familySet.size,
    })
  );

  return chartData;
};

const RadialBarChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with your actual endpoint
    axios
      .get('http://localhost:3000/api/query5')
      .then((response) => {
        const processedData = processData(response.data);
        setData(processedData);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadialBarChart
        innerRadius="10%"
        outerRadius="80%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          clockWise={true}
          dataKey="families"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </RadialBar>
        <Legend
          iconSize={10}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default RadialBarChartComponent;
