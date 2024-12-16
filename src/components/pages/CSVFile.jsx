import React from 'react';
import { useLocation } from 'react-router-dom';

const CSVFile = () => {
  const location = useLocation();
  const csvFile = location.state.csv; // Assumes the CSV data is passed as a string via React Router's state

  // Function to parse CSV string into an array of objects
  const parseCSV = (csvString) => {
    const rows = csvString.split('\n').filter(row => row.trim() !== ''); // Split by line and filter out empty rows
    const headers = rows[0].split(','); // Extract headers from the first row

    const data = rows.slice(1).map(row => {
      const values = row.split(','); // Split each row into values
      const rowObject = headers.reduce((acc, header, index) => {
        acc[header.trim()] = values[index]?.trim(); // Map headers to corresponding values
        return acc;
      }, {});
      return rowObject;
    });

    return data;
  };

  // Parse the CSV data
  const tableData = parseCSV(csvFile);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">CSV Data Table</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              {Object.keys(tableData[0] || {}).map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border-b ${
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                {Object.values(row).map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm text-gray-700"
                  >
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

export default CSVFile;
