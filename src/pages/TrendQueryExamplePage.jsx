import React, { useState } from 'react';

const TrendQueryExamplePage = () => {
  const [query, setQuery] = useState({
    trend: 'Species Discoveries Over Time',
    taxonomicRank: 'Phylum',
    region: 'North America',
    startYear: '2000',
    endYear: '2020',
  });
  const [displayQuery, setDisplayQuery] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryText = `Show ${query.trend} for ${query.taxonomicRank} in ${query.region} from ${query.startYear} to ${query.endYear}.`;
    setDisplayQuery(queryText);
  };

  const tableData = [
    { year: '2000', discoveries: '120' },
    { year: '2001', discoveries: '134' },
  ];

  return (
    <>
      <header className=" text-black bg-blue-100 font-bold text-3xl p-4 text-center">
        Species Discoveries Over Time
      </header>
      <div className="flex flex-row min-h-screen bg-gray-100 ">
        <aside className="w-1/6 bg-blue-100 p-4">
          <h2 className="font-bold mb-4">Refine Query</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <p className="m-4">
              Show terrestrial species reclassifications in North America from
              2000 to 2020.
            </p>
            <label className="block">
              <span className="text-gray-700">Trend:</span>
              <select className="block w-full mt-1 rounded">
                <option>Species Discoveries Over Time</option>
                <option>Geographical Distribution Trends</option>
                <option>Distribution Patterns by Taxonomic Rank</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700">Taxonomic Rank:</span>
              <select className="block w-full mt-1 rounded">
                <option>Kingdom</option>
                <option>Phylum</option>
                <option>Class</option>
                <option>Order</option>
                <option>Family</option>
                <option>Genus</option>
                <option>Species</option>
              </select>
            </label>

            <label className="block">
              <span className="text-gray-700">Region:</span>
              <select className="block w-full mt-1 rounded">
                <option>Global</option>
                <option>North America</option>
                <option>South America</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>Australia</option>
              </select>
            </label>

            <div className="flex justify-between">
              <label className="block">
                <span className="text-gray-700">Start Year:</span>
                <input
                  type="number"
                  className="block w-full mt-1 rounded"
                  placeholder="e.g., 2000"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">End Year:</span>
                <input
                  type="number"
                  className="block w-full mt-1 rounded"
                  placeholder="e.g., 2020"
                />
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Run Query
            </button>
          </form>
          {displayQuery && <p className="m-4">{displayQuery}</p>}
        </aside>

        <div className="flex flex-col w-5/6 p-4 justify-center items-center">
          <div
            className="bg-white p-4 shadow rounded mb-4 flex flex-row items-center"
            style={{ height: '500px' }}
          >
            <img
              src="https://static01.nyt.com/images/2022/03/03/us/at-risk-biodiversity-map-promo-1646284314657/at-risk-biodiversity-map-promo-1646284314657-superJumbo-v2.jpg"
              alt="Biodiversity Map"
              className="max-w-full h-auto max-h-full rounded shadow"
            />
            <div className="flex flex-col space-y-2 p-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Toggle Legend
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                View Details
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Highlight Areas
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                Filter Data
              </button>
            </div>
          </div>

          <div className="bg-white p-4 shadow rounded">
            <h3 className="font-bold mb-2 text-lg">Data Table</h3>
            <table className="table-fixed w-full">
              <thead>
                <tr className="bg-blue-200">
                  <th className="w-1/2 px-4 py-2">Year</th>
                  <th className="w-1/2 px-4 py-2">Discoveries</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}
                  >
                    <td className="border px-4 py-2 text-center">
                      {data.year}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {data.discoveries}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendQueryExamplePage;
