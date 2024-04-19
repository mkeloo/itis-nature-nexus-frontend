import React from 'react';

const SidebarQ3 = ({ query, onInputChange, onSubmit }) => {
  const years = Array.from(
    { length: new Date().getFullYear() - 2000 + 1 },
    (_, index) => 2000 + index
  );

  return (
    <aside className="w-1/6 bg-blue-100 p-4">
      <h2 className="font-bold mb-4">Refine Query</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-gray-700">Start Year:</span>
          <select
            name="startYear"
            value={query.startYear}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          >
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
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Growth Rate Threshold (%):</span>
          <input
            type="number"
            step="0.1"
            name="growthRateThreshold"
            value={query.growthRateThreshold}
            onChange={onInputChange}
            className="block w-full mt-1 rounded border-gray-300"
          />
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

export default SidebarQ3;
