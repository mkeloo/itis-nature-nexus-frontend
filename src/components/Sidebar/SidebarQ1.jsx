import React from 'react';

const SidebarQ1 = ({ query, onInputChange, onSubmit }) => {
  const stateProvinces = [
    'Wien',
    'Niederösterreich',
    'Tirol',
    'Kärnten',
    'Salzburg',
    'Burgenland',
    'Oberösterreich',
    'Vorarlberg',
    'Steiermark',
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);

  return (
    <aside className="w-1/6 bg-blue-100 p-4">
      <h2 className="font-bold mb-4">Refine Query</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-gray-700">State Province:</span>
          <select
            name="stateProvince"
            value={query.stateProvince}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          >
            <option value="">Select a province</option>
            {stateProvinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Start Year:</span>
          <select
            name="startYear"
            value={query.startYear}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          >
            <option value="">Select Start Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">End Year:</span>
          <select
            name="endYear"
            value={query.endYear}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          >
            <option value="">Select End Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Run Query
        </button>
      </form>
    </aside>
  );
};

export default SidebarQ1;
