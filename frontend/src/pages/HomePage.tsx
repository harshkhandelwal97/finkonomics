import React, { useEffect, useState } from "react";
import "../styles/homepage.css";
import { PointsSummaryProps, UserPortfolio } from "../types/types";
import CompanyCardHome from "../components/companycardHome";
import FilterSortButtons from "../components/FilterSortButtons";
import { getUserPortfolio } from "../service/authService";
import SwipeableEdgeDrawer from "../components/Drawer";
import {EmptyCart} from "../components/EmptyCart";
// import "../styles/emptyCart.css"
import { ActionButton } from "../components/ActionButton";
import Header1 from "../components/Header1";

export const Homepage = () => {
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchUserPortfolio = async () => {
    try {
      const res = await getUserPortfolio();
      setUserPortfolio(res.sellers);
    } catch (error) {
      console.error("Error fetching user portfolio:", error);
    }
  };

  useEffect(() => {
    fetchUserPortfolio();
  }, []);

  const handleStoreButtonClick = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="home-main-page">
      <div className="pointinfo-sort">
        <div className="summary">
          <div className="savedAmount">You saved {"savedAmount"} in total</div>
          <div className="summary-content">
            <div className="points">
              <div className="total-points">{"totalPoints"} <span>Points</span></div>
              <div className="point-label">
                <span>Available Points</span>
                <span className="info-icon">i</span>
              </div>
              <button className="action-button store-button" onClick={handleStoreButtonClick}>
                Use in store
              </button>
            </div>

            <div className="money">
              <div className="total-value">{"totalValue"}</div>
              <div className="value-label">
                <span>In Rupees</span>
                <span className="info-icon">i</span>
              </div>

              <button className=" action-button exchange-button">Exchange</button>
            </div>
          </div>
        </div>
      </div>
      <SwipeableEdgeDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
      {/* {totalPoints === 0 && Number(totalValue) === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <FilterSortButtons />
          <CompanyCardHome userPortfolio={userPortfolio} />
        </>
        
      )} */}
    </div>
  );
};
