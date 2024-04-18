import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTableComponent = ({ query, queryEndpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const queryString = Object.keys(query)
        .filter((key) => query[key] !== '') // Filter out empty params
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');

      try {
        const response = await axios.get(`${queryEndpoint}?${queryString}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query, queryEndpoint]); // Re-fetch when query or endpoint changes

  const totalTuples = data.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold mb-2 text-lg">
        Data Table ({totalTuples} Tuples pulled)
      </h3>
      <div className="overflow-auto" style={{ maxHeight: '500px' }}>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 sticky top-0">
              <th className="px-4 py-2 text-sm">#</th>
              {data.length > 0 ? (
                Object.keys(data[0]).map((key, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-sm sticky top-0 bg-gray-200"
                  >
                    {key}
                  </th>
                ))
              ) : (
                <th>No data</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-sm">{index + 1}</td>
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="border px-4 py-2 text-sm">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableComponent;
