import React, { useState } from 'react';
import TitleComponent1 from '../components/QueryComponents/Query1/TitleComponent1'; // Assume similar to TitleComponent5
import SidebarQ1 from '../components/Sidebar/SidebarQ1';
import ChartComponent from '../components/QueryComponents/Query1/ChartComponent';
import DataTableComponent from '../components/QueryComponents/Query1/DataTableComponent'; // Assume it's reusable from Query5

const Page1 = () => {
  const [query, setQuery] = useState({
    stateProvince: '',
    startYear: '',
    endYear: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Possibly update display or trigger data fetching
  };

  return (
    <>
      <TitleComponent1 />
      <div className="flex flex-row min-h-screen bg-gray-100">
        <SidebarQ1
          query={query}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <div className="flex flex-col w-5/6 p-4">
          <ChartComponent query={query} />
          <DataTableComponent
            query={query}
            queryEndpoint="http://localhost:3000/api/query1"
          />
        </div>
      </div>
    </>
  );
};

export default Page1;
