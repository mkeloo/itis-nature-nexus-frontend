import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';

const ClimateBirdCorrelationPage1 = () => {
  const [sampleData, setSampleData] = useState(null); // Initialize sampleData as null

  useEffect(() => {
    fetchSampleFromGDP();
  }, []);

  const fetchSampleFromGDP = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/taxon');
      setSampleData(response.data); // Use response.data directly
      
      if (response.data) {
        console.log('this is what I got:', response.data);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <Fragment> 
      <div>ClimateBirdCorrelationPage1</div>
      <div> This is what was pulled: {JSON.stringify(sampleData)}</div> {/* Stringify sampleData */}
    </Fragment>
  );
};

export default ClimateBirdCorrelationPage1;
