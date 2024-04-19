// SidebarQ5.jsx
import React from 'react';
import SidebarComponent from '../QueryComponents/Query5/SidebarComponent';

const SidebarQ5 = ({ query, onInputChange, onSubmit, displayQuery }) => {
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
