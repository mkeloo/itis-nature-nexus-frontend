import React, { useState } from 'react';
import TitleComponent4 from '../components/QueryComponents/Query4/TitleComponent4';
import SidebarQ4 from '../components/Sidebar/SidebarQ4';
import ChartComponent from '../components/QueryComponents/Query4/ChartComponent';
import DataTableComponent from '../components/QueryComponents/Query4/DataTableComponent';

const Page4 = () => {
  const [query, setQuery] = useState({
    stateProvince: '',
    startYear: 2015,
    endYear: new Date().getFullYear(),
    orderBy: 'year ASC',
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
      <TitleComponent4 />
      <div className="flex flex-row min-h-screen bg-gray-100">
        <SidebarQ4
          query={query}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <div className="flex flex-col w-5/6 p-4">
          <ChartComponent query={query} />
          <DataTableComponent
            query={query}
            queryEndpoint="http://localhost:3000/api/query4"
          />
        </div>
      </div>
    </>
  );
};

export default Page4;
