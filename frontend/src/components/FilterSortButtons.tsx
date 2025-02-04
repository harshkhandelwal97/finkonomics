import React, { useState } from "react";
import "../styles/FileterSortButtons.css";
import TuneIcon from '@mui/icons-material/Tune';

const FilterSortButtons: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const handleSortClick = (sortType: string) => {
    setSelectedSort(sortType);
  };

  return (
    <div className="filter-sort-container">
      <button className="filter-btn">
        <span className="icon"><TuneIcon sx = {{fontSize : 15}} /></span> Sort by
      </button>

      <div className="coins-value">
        <button
          className={`sort-btn ${selectedSort === "max-coins" ? "active" : "disabled"}`}
          onClick={() => handleSortClick("max-coins")}
          disabled={selectedSort !== null && selectedSort !== "max-coins"}
        >
          Max Coins
        </button>
        <button
          className={`sort-btn ${selectedSort === "max-value" ? "active" : "disabled"}`}
          onClick={() => handleSortClick("max-value")}
          disabled={selectedSort !== null && selectedSort !== "max-value"}
        >
          Max Value
        </button>
      </div>
    </div>
  );
};

export default FilterSortButtons;
