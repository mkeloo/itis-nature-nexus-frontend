import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

const GrowthRateBarChart = ({ query }) => {
  const [chartData, setChartData] = useState([
    [
      'Scientific Name',
      'Growth Rate (%)',
      { role: 'tooltip', p: { html: true } },
    ],
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query3', {
          params: query,
        });
        const newData = [
          [
            'Scientific Name',
            'Growth Rate (%)',
            { role: 'tooltip', p: { html: true } },
          ],
          ...response.data.map((item) => [
            item.SCIENTIFICNAME,
            item.GROWTH_RATE_PERCENTAGE,
            `Species: ${item.SCIENTIFICNAME}<br/>Year: ${item.YEAR}<br/>Observation Count: ${item.OBSERVATION_COUNT}<br/>Growth Rate (%): ${item.GROWTH_RATE_PERCENTAGE}`,
          ]),
        ];
        setChartData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <Chart
        width={'100%'}
        height={'600px'}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: 'Year-over-Year Growth Rate in Species Observations',
          chartArea: { width: '50%' },
          hAxis: {
            title: 'Growth Rate (%)',
            minValue: 0,
          },
          vAxis: {
            title: 'Species',
          },
          legend: { position: 'none' },
          bar: { groupWidth: '75%' },
          tooltip: { isHtml: true },
        }}
      />
    </div>
  );
};

export default GrowthRateBarChart;
