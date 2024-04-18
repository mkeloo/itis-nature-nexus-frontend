import React, { useState } from 'react';
import TitleComponent4 from '../components/QueryComponents/Query4/TitleComponent4';
import SidebarQ4 from '../components/Sidebar/SidebarQ4';
import ChartComponent from '../components/QueryComponents/Query4/ChartComponent';
import DataTableComponent from '../components/QueryComponents/Query4/DataTableComponent';

const Page4 = () => {
  // Default values can be adjusted to suit the typical needs of Query 4
  const [query, setQuery] = useState({
    stateProvince: '', // Default province
    startYear: 2015, // Default start year
    endYear: new Date().getFullYear(), // Default to the current year
    orderBy: 'year ASC', // Default sorting
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // The submission here could trigger further actions, like explicitly fetching data if not using useEffect
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
