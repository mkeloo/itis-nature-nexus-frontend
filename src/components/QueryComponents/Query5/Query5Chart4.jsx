import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const AustriaConservationGeoChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query5');
        // Initialize a Map to keep track of province data
        const provinceDataMap = new Map();

        response.data.forEach((record) => {
          if (!provinceDataMap.has(record.STATEPROVINCE)) {
            provinceDataMap.set(record.STATEPROVINCE, {
              threatenedSpecies: 0,
              numberOfSpecies: 0,
              uniqueFamilies: new Set(),
              uniqueGenera: new Set(),
            });
          }
          const provinceData = provinceDataMap.get(record.STATEPROVINCE);
          provinceData.threatenedSpecies += record.THREATENEDSPECIES;
          provinceData.numberOfSpecies += record.NUMBEROFSPECIES;
          provinceData.uniqueFamilies.add(record.FAMILY);
          provinceData.uniqueGenera.add(record.GENUS);
        });

        // Convert Map data to array format for the chart
        const chartData = [
          [
            'Province',
            'Threatened Species Percentage',
            { role: 'tooltip', p: { html: true } },
          ],
        ];
        provinceDataMap.forEach((value, key) => {
          const threatenedPercentage =
            (value.threatenedSpecies / value.numberOfSpecies) * 100;
          // Create tooltip content
          const tooltipContent = `<div style="margin: 0; padding: 0;">
                                  <strong>${key}</strong><br>
                                  Threatened Species: <strong>${value.threatenedSpecies}</strong><br>
                                  Number of Species: <strong>${value.numberOfSpecies}</strong><br>
                                  Unique Families: <strong>${value.uniqueFamilies.size}</strong><br>
                                  Unique Genera: <strong>${value.uniqueGenera.size}</strong></div>`;
          chartData.push([key, threatenedPercentage, tooltipContent]);
        });

        setData(chartData);
      } catch (error) {
        console.error('Error fetching geo chart data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      width={'100%'}
      height={'500px'}
      chartType="GeoChart"
      data={data}
      options={{
        region: 'AT', // Austria
        resolution: 'provinces',
        colorAxis: { colors: ['#f8bbd0', '#e91e63'] },
        defaultColor: '#f5f5f5',
        tooltip: { isHtml: true },
      }}
      mapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY} // Replace with your actual API key
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default AustriaConservationGeoChart;
