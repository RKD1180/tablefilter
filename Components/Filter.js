// components/Filter.js
import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState({
    status: false,
    paymentStatus: false,
    deliveryMethod: false,
  });

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;
    onFilterChange(filterType, value);
  };

  return (
    <>
      {/* Order Status */}
      <div>
        <button
          className="w-full text-left p-2 bg-gray-200 rounded"
          onClick={() => toggleSection('status')}
        >
          Order Status
        </button>
        {isOpen.status && (
          <div className="border border-t-0 rounded rounded-t-none  p-4 ">
            <div className="space-y-2">
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value=""
                  onChange={(e) => handleFilterChange(e, 'status')}
                  className="mr-2"
                />
                All
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="Shipped"
                  onChange={(e) => handleFilterChange(e, 'status')}
                  className="mr-2"
                />
                Shipped
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  onChange={(e) => handleFilterChange(e, 'status')}
                  className="mr-2"
                />
                Pending
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="Delivered"
                  onChange={(e) => handleFilterChange(e, 'status')}
                  className="mr-2"
                />
                Delivered
              </label>
              {/* Add more statuses as needed */}
            </div>
          </div>
        )}
      </div>

      {/* Payment Status */}
      <div className="mt-4">
        <button
          className="w-full text-left p-2 bg-gray-200 rounded"
          onClick={() => toggleSection('paymentStatus')}
        >
          Payment Status
        </button>
        {isOpen.paymentStatus && (
          <div className="border border-t-0 rounded rounded-t-none  p-4 ">
            <div className="space-y-2">
              <label className="block">
                <input
                  type="radio"
                  name="paymentStatus"
                  value=""
                  onChange={(e) => handleFilterChange(e, 'paymentStatus')}
                  className="mr-2"
                />
                All
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Paid"
                  onChange={(e) => handleFilterChange(e, 'paymentStatus')}
                  className="mr-2"
                />
                Paid
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Pending"
                  onChange={(e) => handleFilterChange(e, 'paymentStatus')}
                  className="mr-2"
                />
                Pending
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="Refunded"
                  onChange={(e) => handleFilterChange(e, 'paymentStatus')}
                  className="mr-2"
                />
                Refunded
              </label>
              {/* Add more payment statuses as needed */}
            </div>
          </div>
        )}
      </div>

      {/* Delivery Method */}
      <div className="mt-4">
        <button
          className="w-full text-left p-2 bg-gray-200 rounded"
          onClick={() => toggleSection('deliveryMethod')}
        >
          Delivery Method
        </button>
        {isOpen.deliveryMethod && (
         <div className="border border-t-0 rounded rounded-t-none  p-4 ">
            <div className="space-y-2">
              <label className="block">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value=""
                  onChange={(e) => handleFilterChange(e, 'deliveryMethod')}
                  className="mr-2"
                />
                All
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="Standard"
                  onChange={(e) => handleFilterChange(e, 'deliveryMethod')}
                  className="mr-2"
                />
                Standard
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="Express"
                  onChange={(e) => handleFilterChange(e, 'deliveryMethod')}
                  className="mr-2"
                />
                Express
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
