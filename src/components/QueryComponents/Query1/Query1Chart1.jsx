import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const AustriaBirdsGeoChart = () => {
  const [data, setData] = useState([
    ['Province', 'Observations', { role: 'tooltip', p: { html: true } }],
  ]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/query1');
        const uniqueYears = Array.from(
          new Set(response.data.map((d) => d.YEAR))
        );
        setYears(uniqueYears);
        if (uniqueYears.includes(selectedYear)) {
          setSelectedYear(selectedYear); // keep the selected year if it's in the new data
        } else {
          setSelectedYear(Math.max(...uniqueYears)); // update to the most recent year
        }

        const observationsForYear = response.data
          .filter((item) => item.YEAR === selectedYear)
          .map((item) => [
            item.STATEPROVINCE,
            item.OBSERVATION_COUNT,
            `<strong>Observation Count:</strong> ${item.OBSERVATION_COUNT}<br /><strong>Species Count:</strong> ${item.SPECIES_COUNT}`,
          ]);

        setData([
          ['Province', 'Observations', { role: 'tooltip', p: { html: true } }],
          ...observationsForYear,
        ]);
      } catch (error) {
        console.error('Error fetching geo chart data', error);
      }
    }

    fetchData();
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  return (
    <div>
      <label>
        Select Year:
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="GeoChart"
        data={data}
        options={{
          region: 'AT', // Austria
          resolution: 'provinces',
          colorAxis: { colors: ['#e6f2ff', '#0040ff'] },
          defaultColor: '#f5f5f5',
          tooltip: { isHtml: true },
        }}
        mapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default AustriaBirdsGeoChart;
