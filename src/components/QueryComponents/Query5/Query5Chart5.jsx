import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-google-charts';

// Define showFullTooltip outside the component as it does not rely on component's state or props
function showFullTooltip(data) {
  return function (row, size, value) {
    return (
      '<div style="background:#fd9; padding:10px; border-style:solid">' +
      '<span><b>' +
      data[row][0] +
      '</b>:</span>' +
      '<div>Number of Species: ' +
      data[row][2] +
      '</div>' +
      '<div>Threatened Species: ' +
      data[row][3] +
      '%</div>' +
      '</div>'
    );
  };
}

const TreeMapConservationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/query5');
        const processedData = [
          ['ID', 'Parent', 'Number of Species', 'Threatened Percentage'],
        ];

        // Add a root node for the entire dataset
        processedData.push(['Austria', null, 0, 0]);

        // Create a map to track unique stateProvinces
        const stateProvincesMap = new Map();

        // Process the data from API
        response.data.forEach((item) => {
          const {
            STATEPROVINCE,
            FAMILY,
            GENUS,
            NUMBEROFSPECIES,
            THREATENEDSPECIES,
            THREATENEDPERCENTAGE,
          } = item;

          // Create unique ID for each stateProvince, if not already added
          if (!stateProvincesMap.has(STATEPROVINCE)) {
            processedData.push([STATEPROVINCE, 'Austria', null, null]);
            stateProvincesMap.set(STATEPROVINCE, true);
          }

          // Create unique ID for each family-genus combination
          const uniqueId = `${FAMILY} | ${GENUS} (${STATEPROVINCE})`;

          // Add the family-genus node to the data array
          processedData.push([
            uniqueId,
            STATEPROVINCE,
            NUMBEROFSPECIES,
            THREATENEDPERCENTAGE,
          ]);
        });

        setData(processedData);
      } catch (error) {
        console.error('Error fetching data for TreeMap', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      width={'100%'}
      height={'500px'}
      chartType="TreeMap"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        minColor: '#f00',
        midColor: '#ddd',
        maxColor: '#0d0',
        headerHeight: 15,
        showScale: true,
        useWeightedAverageForAggregation: true,
        generateTooltip: showFullTooltip(data),
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
};

export default TreeMapConservationChart;
