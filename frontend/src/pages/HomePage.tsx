import { useEffect, useState } from "react";
import "../styles/homepage.css";
import { UserPortfolio } from "../types/types";
import CompanyCardHome from "../components/companycardHome";
import FilterSortButtons from "../components/FilterSortButtons";
import { getUserPortfolio } from "../service/authService";
import { EmptyCart } from "../components/EmptyCart";
// import "../styles/emptyCart.css"
// import { ActionButton } from "../components/ActionButton";

export const Homepage = () => {
  const [userPortfolio, setUserPortfolio] = useState<UserPortfolio[]>([]);
  console.log(userPortfolio);

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


  const totalCoins = Math.round(
    userPortfolio.reduce(
      (total, portfolio) =>
        total + (parseInt(portfolio.coinsAvailable, 10) || 0),
      0
    )
  );
  const totalValue = Math.round(
    userPortfolio.reduce(
      (total, portfolio) =>
        total +
        (parseInt(portfolio.coinsAvailable, 10) || 0) *
          (parseFloat(portfolio.currentExchangeRatio) || 0),
      0
    )
  );

  return (
    <div className="home-main-page">
      <div className="pointinfo-sort">
        <div className="summary">
          <div className="savedAmount">You saved {"₹675"} in total</div>
          <div className="summary-content">
            <div className="points">
              <div className="total-points">
                {" "}
                {totalCoins} <span>Points</span>
              </div>
              <div className="point-label">
                <span>Available Points</span>
                <span className="info-icon">i</span>
              </div>
              <button
                className="action-button store-button"
                // onClick={handleStoreButtonClick}
              >
                Use in store
              </button>
            </div>

            <div className="money">
              <div className="total-value">₹{totalValue}</div>
              <div className="value-label">
                <span>In Rupees</span>
                <span className="info-icon">i</span>
              </div>

              <button className=" action-button exchange-button">
                Exchange
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <SwipeableEdgeDrawer open={isDrawerOpen} onClose={handleDrawerClose} /> */}
      {totalCoins === 0 && Number(totalValue) === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <FilterSortButtons />
          <div className="company-card-scroll-container1">
            <CompanyCardHome userPortfolio={userPortfolio} />
          </div>
        </>
      )}
    </div>
  );
};
