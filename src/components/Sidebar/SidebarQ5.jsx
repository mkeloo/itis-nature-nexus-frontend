// SidebarQ5.jsx
import React from 'react';
import SidebarComponent from '../PageComponents/SidebarComponent';

const SidebarQ5 = ({ query, onInputChange, onSubmit, displayQuery }) => {
  // Pass props to the generic SidebarComponent
  return (
    <SidebarComponent
      query={query}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
      displayQuery={displayQuery}
    />
  );
};

export default SidebarQ5;
