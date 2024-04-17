import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

// This component assumes your API returns data in the format you provided
const Query5Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/query5');

        // Process and group the data
        const processedData = data.reduce((acc, item) => {
          // Find the stateProvince in the accumulated data
          let stateEntry = acc.find(
            (entry) => entry.stateProvince === item.STATEPROVINCE
          );
          if (!stateEntry) {
            stateEntry = {
              stateProvince: item.STATEPROVINCE,
              threatened: 0,
              nonThreatened: 0,
            };
            acc.push(stateEntry);
          }

          // If the species is threatened, add to threatened, else add to nonThreatened
          if (item.THREATENEDPERCENTAGE > 0) {
            stateEntry.threatened += item.NUMBEROFSPECIES;
          } else {
            stateEntry.nonThreatened += item.NUMBEROFSPECIES;
          }

          return acc;
        }, []);

        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stateProvince" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="threatened"
          stackId="a"
          fill="#82ca9d"
          name="Threatened Species"
        />
        <Bar
          dataKey="nonThreatened"
          stackId="a"
          fill="#8884d8"
          name="Non-Threatened Species"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Query5Chart;
