import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Treemap, Tooltip, ResponsiveContainer } from 'recharts';

const processDataForTreemap = (rawData) => {
  const dataMap = new Map();

  rawData.forEach((item) => {
    const key = item.STATEPROVINCE;
    if (!dataMap.has(key)) {
      dataMap.set(key, {
        name: key,
        biodiversityIndexSum: 0,
        totalObservations: 0,
        speciesCount: 0,
        observationCountSum: 0,
        count: 0,
      });
    }
    const data = dataMap.get(key);
    data.biodiversityIndexSum += item.BIODIVERSITY_INDEX;
    data.totalObservations += item.TOTAL_OBSERVATIONS;
    data.speciesCount += item.SPECIES_COUNT;
    data.observationCountSum += item.OBSERVATION_COUNT;
    data.count += 1;
  });

  return Array.from(dataMap.values()).map((item) => ({
    name: item.name,
    biodiversityIndex: item.biodiversityIndexSum / item.count,
    totalObservations: item.totalObservations,
    speciesCount: item.speciesCount,
    observationCount: item.observationCountSum,
    size: item.biodiversityIndexSum / item.count, // size for the Treemap calculation
    fill: generateColor(item.biodiversityIndexSum / item.count), // Assign a dynamic color
  }));
};

const generateColor = (value) => {
  const hue = (value * 360) % 360; // Simple dynamic color based on biodiversity index
  return `hsl(${hue}, 70%, 60%)`;
};

const BiodiversityTreemap = ({ query }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/query4', {
        params: query,
      });

      const processedData = processDataForTreemap(response.data);
      setData(processedData);
    };

    fetchData();
  }, [query]); // Dependency on query to update the chart when query parameters change

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        data={data}
        dataKey="size"
        ratio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: '#fff',
          padding: '5px',
          border: '1px solid #ddd',
        }}
      >
        <p>{data.name}</p>
        <p>Biodiversity Index: {data.biodiversityIndex.toFixed(2)}</p>
        <p>Total Observations: {data.totalObservations}</p>
        <p>Species Count: {data.speciesCount}</p>
        <p>Observation Count: {data.observationCount}</p>
      </div>
    );
  }
  return null;
};

export default BiodiversityTreemap;
