// DataTableComponent.js
import React from 'react';

const DataTableComponent = ({ tableData }) => {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="font-bold mb-2 text-lg">Data Table</h3>
      <table className="table-fixed w-full">{/* Table content */}</table>
    </div>
  );
};

export default DataTableComponent;
