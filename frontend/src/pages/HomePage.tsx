// In HomePage.tsx
import React from "react";
import "../styles/homepage.css";
import { PointsSummaryProps } from "../types/types";
import CompanyCard from "../components/companycardHome";
import FilterSortButtons from "../components/FilterSortButtons";
export const Homepage: React.FC<PointsSummaryProps> = ({
  totalPoints,
  totalValue,
  savedAmount,
}) => {
  return (
    <div className="home-main-page">
      <div className="pointinfo-sort">
        <div className="summary">
          <div className="summaryContent">
            <div className="savedAmount">You saved {savedAmount} in total</div>
            <div className="pointsValueContainer">
              <div className="pointsContainer">
                <div className="totalPoints">
                  <span>{totalPoints}</span> Points
                </div>
                <div className="pointsLabel">
                  <span>Available Points</span>
                  <span className="infoIcon">i</span>
                </div>
              </div>
              <div className="separator" />
              <div className="valueContainer">
                <div className="totalValue">{totalValue}</div>
                <div className="valueLabel">
                  <span>In Rupees</span>
                  <span className="infoIcon">i</span>
                </div>
              </div>
            </div>
            <div className="actionButtons">
              <button className="storeButton">Use in store</button>
              <button className="exchangeButton">Exchange</button>
            </div>
          </div>
        </div>
        <FilterSortButtons />
      </div>

      <CompanyCard />
    </div>
  );
};
