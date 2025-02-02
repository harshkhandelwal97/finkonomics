// In HomePage.tsx
import React from "react";
import "../styles/homepage.css";
import { PointsSummaryProps } from "../components/types";
import Header1 from "../components/Header1";
import Footer1 from "../components/footer";
import CompanyCard from "../components/companycardHome";
export const Homepage: React.FC<PointsSummaryProps> = ({
  totalPoints,
  totalValue,
  savedAmount,
}) => {
  return (
    <div>
      <Header1 />
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

      <CompanyCard />
      
      <Footer1 />
    </div>
  );
};
