import React, { useState } from 'react';
import TitleComponent3 from '../components/QueryComponents/Query3/TitleComponent3';
import SidebarQ3 from '../components/Sidebar/SidebarQ3';
import ChartComponent from '../components/QueryComponents/Query3/ChartComponent';
import DataTableComponent from '../components/QueryComponents/Query3/DataTableComponent';

const Page3 = () => {
  const [query, setQuery] = useState({
    startYear: '',
    endYear: '',
    growthRateThreshold: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <TitleComponent3 />
      <div className="flex flex-row min-h-screen bg-gray-100">
        <SidebarQ3
          query={query}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <div className="flex flex-col w-5/6 p-4">
          <ChartComponent query={query} />
          <DataTableComponent
            query={query}
            queryEndpoint="http://localhost:3000/api/query3"
          />
        </div>
      </div>
    </>
  );
};

export default Page3;
