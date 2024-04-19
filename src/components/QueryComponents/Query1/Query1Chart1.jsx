import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const AustriaBirdsGeoChart = ({ query }) => {
  const [data, setData] = useState([
    ['Province', 'Observations', { role: 'tooltip', p: { html: true } }],
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams({
          stateProvince: query.stateProvince,
          startYear: query.startYear,
          endYear: query.endYear,
        });
        const response = await axios.get(
          `http://localhost:3000/api/query1?${params}`
        );

        const observationsData = response.data.map((item) => [
          item.STATEPROVINCE,
          item.OBSERVATION_COUNT,
          `<strong>Observation Count:</strong> ${item.OBSERVATION_COUNT}<br /><strong>Species Count:</strong> ${item.SPECIES_COUNT}`,
        ]);

        setData([
          ['Province', 'Observations', { role: 'tooltip', p: { html: true } }],
          ...observationsData,
        ]);
      } catch (error) {
        console.error('Error fetching geo chart data', error);
      }
    }

    fetchData();
  }, [query]);

  return (
    <div>
      <Chart
        width={'100%'}
        height={'500px'}
        chartType="GeoChart"
        data={data}
        options={{
          region: 'AT',
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
