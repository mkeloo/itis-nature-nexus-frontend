import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios'; // Import axios for making HTTP requests
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

// A utility function to process the raw data from the API
const processData = (rawData) => {
  const groupedData = {};

  rawData.forEach((item) => {
    const { STATEPROVINCE, YEAR, TOTAL_OBSERVATIONS } = item;

    groupedData[YEAR] = groupedData[YEAR] || {};
    groupedData[YEAR][STATEPROVINCE] =
      (groupedData[YEAR][STATEPROVINCE] || 0) + TOTAL_OBSERVATIONS;
  });

  // Convert grouped data into array format suitable for recharts
  return Object.entries(groupedData).map(([year, observations]) => ({
    year,
    ...observations,
  }));
};

const generateHue = (index) => {
  // This function generates a hue value in the HSL color space to get a unique color for each line.
  // The constant 137.508 is used to get visually distinct colors for a sequence of lines.
  // It's derived from the golden angle in degrees, which is approximately 137.508 degrees.
  return (index * 137.508) % 360;
};

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
        // Ensure that the key is unique and defined
        <Line
          key={`${province}-${index}`} // Construct a key that is guaranteed to be unique
          type="monotone"
          dataKey={province}
          name={province}
          stroke={`hsl(${generateHue(index)}, 70%, 50%)`}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

const TotalObservationsOverTime = () => {
  const [data, setData] = useState([]);
  const [stateProvinces, setStateProvinces] = useState([]);

  const fetchData = async (startYear, endYear, stateProvince, orderBy) => {
    try {
      const response = await axios.get('http://localhost:3000/api/query4', {
        params: {
          startYear: startYear,
          endYear: endYear,
          stateProvince: stateProvince,
          orderBy: orderBy,
        },
      });

      //   console.log('API Response:', response.data); // Log the raw API response

      const processedData = processData(response.data);
      //   console.log('Processed Data:', processedData); // Log the processed data

      setData(processedData);

      // This might not be extracting correctly if `STATEPROVINCE` is not a direct key on the items of processedData
      const stateProvincesSet = new Set(
        processedData.flatMap((item) =>
          Object.keys(item).filter((key) => key !== 'year')
        )
      );
      // console.log('State Provinces Set:', stateProvincesSet); // Log the stateProvinces set

      setStateProvinces([...stateProvincesSet]);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Define the query parameters as needed
    const startYear = 2010; // Example start year
    const endYear = new Date().getFullYear(); // Example end year
    const stateProvince = ''; // Empty string will not filter by stateProvince
    const orderBy = 'year ASC'; // Example orderBy parameter

    fetchData(startYear, endYear, stateProvince, orderBy);
  }, []);

  return <TimeSeriesChart data={data} stateProvinces={stateProvinces} />;
};

export default TotalObservationsOverTime;
