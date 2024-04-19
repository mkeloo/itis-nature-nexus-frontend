import React from 'react';

const SidebarComponent = ({ query, onInputChange, onSubmit, displayQuery }) => {
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

  const orderByOptions = [
    { value: 'ThreatenedPercentage DESC', text: 'Threatened - Descending' },
    { value: 'ThreatenedPercentage ASC', text: 'Threatened - Ascending' },
  ];

  return (
    <aside className="w-1/6 bg-blue-100 p-4">
      <h2 className="font-bold mb-4">Refine Query</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        {Object.keys(query).map((key) =>
          key === 'stateProvince' ? (
            <label key={key} className="block">
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
          ) : key === 'orderBy' ? (
            <label key={key} className="block">
              <span className="text-gray-700">Order By:</span>
              <select
                name="orderBy"
                value={query.orderBy}
                onChange={onInputChange}
                className="block w-full mt-1 rounded border-gray-300"
              >
                {orderByOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label key={key} className="block">
              <span className="text-gray-700">
                {key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </span>
              <input
                type="text"
                name={key}
                value={query[key]}
                onChange={onInputChange}
                className="block w-full mt-1 rounded border-gray-300"
              />
            </label>
          )
        )}
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

export default SidebarComponent;
