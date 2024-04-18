import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

const GrowthRateBarChart = () => {
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query3');
        const years = new Set(response.data.map((item) => item.YEAR));
        const uniqueYears = [...years].sort((a, b) => a - b); // Sort years in ascending order
        setAllData(response.data);
        setSelectedYear(uniqueYears[0]); // Default to the earliest year
        updateChartData(uniqueYears[0], response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const updateChartData = (year, data) => {
    const yearData = data.filter((item) => item.YEAR === year);
    const formattedData = [
      [
        'Scientific Name',
        'Growth Rate (%)',
        { role: 'tooltip', p: { html: true } },
      ],
    ];

    yearData.forEach((item) => {
      formattedData.push([
        item.SCIENTIFICNAME,
        item.GROWTH_RATE_PERCENTAGE,
        `<div style="padding:8px 8px;">
          <strong>Species:</strong> ${item.SCIENTIFICNAME}<br/>
          <strong>Year:</strong> ${item.YEAR}<br/>
          <strong>Observation Count:</strong> ${item.OBSERVATION_COUNT}<br/>
          <strong>Growth Rate (%):</strong> ${item.GROWTH_RATE_PERCENTAGE}
        </div>`,
      ]);
    });

    setChartData(formattedData);
  };

  const handleYearChange = (event) => {
    const year = Number(event.target.value);
    setSelectedYear(year);
    updateChartData(year, allData);
  };

  return (
    <div>
      <label>
        Select Year:
        <select value={selectedYear} onChange={handleYearChange}>
          {allData.length > 0 &&
            [...new Set(allData.map((item) => item.YEAR))]
              .sort((a, b) => a - b) // Ensure the years are sorted
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
        </select>
      </label>
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
          tooltip: { isHtml: true }, // Use HTML tooltips
        }}
      />
    </div>
  );
};

export default GrowthRateBarChart;
