// SidebarComponent.js
import React from 'react';

const SidebarComponent = ({ query, onInputChange, onSubmit, displayQuery }) => {
  return (
    <aside className="w-1/6 bg-blue-100 p-4">
      <h2 className="font-bold mb-4">Refine Query</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        {/* Form inputs */}
        <label className="block">
          <span className="text-gray-700">State Province:</span>
          <input
            type="text"
            name="stateProvince"
            value={query.stateProvince}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Family:</span>
          <input
            type="text"
            name="family"
            value={query.family}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Genus:</span>
          <input
            type="text"
            name="genus"
            value={query.genus}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          />
        </label>
        {/* Add more input fields for other query parameters */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Run Query
        </button>
      </form>
      {displayQuery && <p className="m-4">{displayQuery}</p>}
    </aside>
  );
};

export default SidebarComponent;
