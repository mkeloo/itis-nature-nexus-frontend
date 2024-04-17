import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const processData = (rawData) => {
  const familyMap = new Map();

  rawData.forEach((data) => {
    const { FAMILY, NUMBEROFSPECIES, THREATENEDSPECIES } = data;
    if (!familyMap.has(FAMILY)) {
      familyMap.set(FAMILY, { total: 0, threatened: 0 });
    }
    familyMap.get(FAMILY).total += NUMBEROFSPECIES;
    familyMap.get(FAMILY).threatened += THREATENEDSPECIES;
  });

  // Filter out families with no threatened species
  return Array.from(familyMap)
    .map(([family, counts]) => ({
      family: family,
      TotalSpecies: counts.total,
      ThreatenedSpecies: counts.threatened,
      NotThreatenedSpecies: counts.total - counts.threatened,
    }))
    .filter((familyData) => familyData.ThreatenedSpecies > 0);
};

const FamilySpeciesBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query5');
        setData(processData(response.data));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="family" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="ThreatenedSpecies" stackId="a" fill="#ff4d4d" />
        <Bar dataKey="NotThreatenedSpecies" stackId="a" fill="#8dd1e1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FamilySpeciesBarChart;
