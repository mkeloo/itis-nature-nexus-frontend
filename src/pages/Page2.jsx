import React, { useState } from 'react';
import TitleComponent2 from '../components/QueryComponents/Query2/TitleComponent2';
import SidebarQ2 from '../components/Sidebar/SidebarQ2';
import ChartComponent from '../components/QueryComponents/Query2/ChartComponent';
import DataTableComponent from '../components/QueryComponents/Query2/DataTableComponent';

const Page2 = () => {
  const [query, setQuery] = useState({
    startYear: '',
    endYear: '',
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
      <TitleComponent2 />{' '}
      <div className="flex flex-row min-h-screen bg-gray-100">
        <SidebarQ2
          query={query}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        <div className="flex flex-col w-5/6 p-4">
          <ChartComponent query={query} />
          <DataTableComponent
            query={query}
            queryEndpoint="http://localhost:3000/api/query2"
          />
        </div>
      </div>
    </>
  );
};

export default Page2;
