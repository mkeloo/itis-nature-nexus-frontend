import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

const ClimateBirdsComboChart = ({ query }) => {
  const [displayData, setDisplayData] = useState([]);
  const [yearRanges, setYearRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          stateProvince: query.stateProvince,
          startYear: query.startYear,
          endYear: query.endYear,
        });

        const response = await axios.get(
          `http://localhost:3000/api/query1?${params}`
        );
        const sortedData = response.data.sort((a, b) => a.YEAR - b.YEAR);
        calculateYearRanges(sortedData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [query]);

  const calculateYearRanges = (data) => {
    const years = data.map((item) => item.YEAR);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const ranges = [];

    for (let year = minYear; year < maxYear; year += 5) {
      ranges.push(`${year}-${year + 4}`);
    }

    setYearRanges(ranges);
    setSelectedRange(ranges[0]);
    updateChartData(ranges[0], data);
  };

  const updateChartData = (range, data) => {
    const [startYear, endYear] = range.split('-').map(Number);
    const filteredData = data.filter(
      (item) => item.YEAR >= startYear && item.YEAR <= endYear
    );

    // Aggregate data by year
    const aggregatedData = filteredData.reduce((acc, item) => {
      const year = item.YEAR;
      if (!acc[year]) {
        acc[year] = { ...item, count: 1 };
      } else {
        acc[year].AVG_TEMPERATURE += item.AVG_TEMPERATURE;
        acc[year].PRECIPITATION += item.PRECIPITATION;
        acc[year].OBSERVATION_COUNT += item.OBSERVATION_COUNT;
        acc[year].SPECIES_COUNT += item.SPECIES_COUNT;
        acc[year].count++;
      }
      return acc;
    }, {});

    const chartData = [
      [
        'Year',
        'Average Temperature',
        'Precipitation',
        'Observation Count',
        'Species Count',
      ],
      ...Object.values(aggregatedData).map((item) => [
        item.YEAR.toString(),
        item.AVG_TEMPERATURE / item.count,
        item.PRECIPITATION / item.count,
        item.OBSERVATION_COUNT,
        item.SPECIES_COUNT,
      ]),
    ];

    setDisplayData(chartData);
  };

  const handleRangeChange = (event) => {
    const newRange = event.target.value;
    setSelectedRange(newRange);
    updateChartData(newRange, allData);
  };

  return (
    <div>
      <label>
        Select Year Range:
        <select value={selectedRange} onChange={handleRangeChange}>
          {yearRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </label>
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="ComboChart"
        loader={<div>Loading Chart</div>}
        data={displayData}
        options={{
          title: 'Climate Data and Bird Observations for Selected Years',
          vAxis: {
            title: 'Temperature (°C) and Precipitation (mm)',
            viewWindow: { min: 0 },
          },
          hAxis: { title: 'Year', showTextEvery: 1, slantedText: true },
          seriesType: 'bars',
          series: {
            0: { type: 'line', targetAxisIndex: 0 },
            1: { type: 'line', targetAxisIndex: 1 },
            2: { type: 'bars', targetAxisIndex: 1 },
            3: { type: 'bars', targetAxisIndex: 1 },
          },
          colors: ['#ff1100', '#0040ff', '#ffab91', '#80cbc4'],
          legend: { position: 'top', maxLines: 3 },
        }}
      />
    </div>
  );
};

export default ClimateBirdsComboChart;
