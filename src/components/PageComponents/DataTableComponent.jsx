import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTableComponent = ({ query, queryNumber }) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = Object.keys(query)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
          )
          .join('&');
        const response = await axios.get(
          `http://localhost:3000/api/query${queryNumber}?${queryString}`
        );
        setTableData(response.data); // Assuming response.data is an array of objects
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [query, queryNumber]);

  // Calculate totalTuples inside the component before return statement
  const totalTuples = tableData.length;

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold mb-2 text-lg">
        Data Table ({totalTuples} Tuples pulled)
      </h3>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div
          className="overflow-auto"
          style={{ maxWidth: '100%', maxHeight: '500px' }}
        >
          <table className="table-fixed w-full">
            <thead>
              <tr>
                <th className="sticky top-0 bg-white z-10 px-4 py-2 text-sm">
                  #
                </th>
                {tableData.length > 0 &&
                  Object.keys(tableData[0]).map((key) => (
                    <th
                      key={key}
                      className="sticky top-0 bg-white z-10 px-4 py-2 text-sm"
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((rowData, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-sm">{index + 1}</td>
                  {Object.values(rowData).map((value, index) => (
                    <td key={index} className="border px-4 py-2 text-sm">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTableComponent;
