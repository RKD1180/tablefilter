// components/Drawer.js
import React, { useState } from 'react';

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-96 z-50`}
    >
      {/* <button
        className="absolute top-4 left-4 text-xl"
        onClick={onClose}
      >
        &times;
      </button> */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Drawer;
