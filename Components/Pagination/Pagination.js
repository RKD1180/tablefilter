import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start);

    if (totalPages <= 10) {
      setPageNumbers(range(1, totalPages));
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      const pages = [];

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }

      setPageNumbers(pages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
