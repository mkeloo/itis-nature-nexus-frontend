import React, { useState } from 'react';
import TitleComponent5 from '../components/QueryComponents/Query5/TitleComponent5';
import SidebarQ5 from '../components/Sidebar/SidebarQ5';
import ChartComponent from '../components/QueryComponents/Query5/ChartComponent';
import DataTableComponent from '../components/QueryComponents/Query5/DataTableComponent';

const Page5 = () => {
  const [query, setQuery] = useState({
    stateProvince: '',
    family: '',
    genus: '',
    orderBy: 'ThreatenedPercentage DESC',
  });
  const [displayQuery, setDisplayQuery] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayQuery(JSON.stringify(query));
    // No need to trigger fetching here if DataTableComponent uses useEffect to listen to query changes
  };

  return (
    <>
      <TitleComponent5 />
      <div className="flex flex-row min-h-screen bg-gray-100">
        <SidebarQ5
          query={query}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          displayQuery={displayQuery}
        />
        <div className="flex flex-col w-5/6 p-4">
          <ChartComponent query={query} />
          <DataTableComponent
            query={query}
            queryEndpoint="http://localhost:3000/api/query5"
          />
        </div>
      </div>
    </>
  );
};

export default Page5;
