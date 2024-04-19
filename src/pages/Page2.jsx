import React, { useState } from 'react';
import TitleComponent2 from '../components/QueryComponents/Query2/TitleComponent2'; // This component will need to be created
import SidebarQ2 from '../components/Sidebar/SidebarQ2'; // This component will need to be created or adapted
import ChartComponent from '../components/QueryComponents/Query2/ChartComponent'; // Adapt this component to handle Query 2 charts
import DataTableComponent from '../components/QueryComponents/Query2/DataTableComponent'; // Adapt or reuse the DataTableComponent from Query 3 if it's generic enough

const Page2 = () => {
  // Initialize query state with default values or empty strings
  const [query, setQuery] = useState({
    startYear: '', // Default start year
    endYear: '', // Default end year
  });

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Possible actions to take on form submission, like triggering a data refresh
  };

  return (
    <>
      <TitleComponent2 />{' '}
      {/* This title should correspond to the topic of Query 2 */}
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
            queryEndpoint="http://localhost:3000/api/query2" // Adjust the endpoint as necessary
          />
        </div>
      </div>
    </>
  );
};

export default Page2;
