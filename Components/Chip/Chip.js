import React from "react";

const Chip = ({ title, count, type }) => {
  return (
    <div className="flex gap-1 items-center">
      <p className={`${type ? "selectedChipFont"  : 'fontColor'}`}>{title}</p>
      <div className={`${type ? 'selectedChipCount' : 'unselctChip'}`}>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default Chip;
