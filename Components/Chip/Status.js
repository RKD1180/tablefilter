import React from 'react';

const Status = ({ status }) => {

  const getStatusStyles = (status) => {
    let styles = {
      color: '',
      backgroundColor: ''
    };
    const s = status?.toLowerCase();
    
    if (s === 'paid') {
      styles = {
        color: '#0D894F',
        backgroundColor: "#E5F5EB"
      };
    } else if (s === 'refunded') {
      styles = {
        color: '#4698AF',
        backgroundColor: "#E2F9FF"
      };
    } else if (s === 'inprogress') {
      styles = {
        color: '#DF9934',
        backgroundColor: "#FFF6EA"
      };
    }else if (s === 'cancelled') {
      styles = {
        color: '#FC0000',
        backgroundColor: "#F9F0F0"
      };
    }
    return styles;
  }

  const { color, backgroundColor } = getStatusStyles(status);

  return (
    <div
      className="rounded-lg w-fit p-2"
      style={{ backgroundColor }}
    >
      <h2
        className="text-sm font-semibold"
        style={{ color }}
      >
        {status}
      </h2>
    </div>
  );
}

export default Status;
