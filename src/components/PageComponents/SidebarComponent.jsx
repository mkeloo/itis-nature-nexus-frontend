// SidebarComponent.js
import React from 'react';

const SidebarComponent = ({ query, onInputChange, onSubmit, displayQuery }) => {
  return (
    <aside className="w-1/6 bg-blue-100 p-4">
      <h2 className="font-bold mb-4">Refine Query</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Form inputs */}
      </form>
      {displayQuery && <p className="m-4">{displayQuery}</p>}
    </aside>
  );
};

export default SidebarComponent;
