"use client";
import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-[#F9FAFB] border-t border-b border-[textColor]">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.Header}
                className="px-4 py-4 text-left bg-gray-200 text-[textColor]"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-300">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2"
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(row)
                      : row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
