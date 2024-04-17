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
    data.observationCountSum += item.OBSERVATION_COUNT; // Sum up the observation counts
    data.count += 1;
  });

  return Array.from(dataMap.values()).map((item, index, array) => ({
    name: item.name,
    biodiversityIndex: item.biodiversityIndexSum / item.count,
    totalObservations: item.totalObservations,
    speciesCount: item.speciesCount,
    observationCount: item.observationCountSum,
    size: item.biodiversityIndexSum / item.count,
    fill: generateColor(index, array.length), // Assign a color based on the index
  }));
};

// Function to generate a color for each state province
const generateColor = (index, total) => {
  const hue = (index / total) * 360;
  return `hsl(${hue}, 70%, 60%)`;
};

const BiodiversityTreemap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/query4', {
        params: {
          startYear: 2010,
          endYear: new Date().getFullYear(),
        },
      });

      // Process the API response data for a treemap chart
      const processedData = processDataForTreemap(response.data);
      setData(processedData);
    };

    fetchData();
  }, []);
  // Process the data and assign a color to each state province
  const coloredData = data.map((entry, index) => ({
    ...entry,
    fill: generateColor(index, data.length),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <Treemap
        data={coloredData}
        dataKey="size"
        aspectRatio={4 / 3}
        stroke="#fff"
      >
        <Tooltip cursor={false} content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

// Custom tooltip component for treemap
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
