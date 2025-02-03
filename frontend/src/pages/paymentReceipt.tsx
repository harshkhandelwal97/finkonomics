import React from "react";
import "../styles/paymentReceipt.css";
import { PaymentDetails } from "../components/payment_Details";
import { RewardPointsCard } from "../components/RewardPointCard";
import { RewardPointsData } from "../types/types";
import Header1 from "../components/Header1";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";

const rewardPointsData: RewardPointsData[] = [
  {
    quantity: 4545,
    pointValue: "1point=₹0.33",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/34eb88e8412cfe808901ef201e52cfcc12a7d9c0d712df17b85886c22aed579d?placeholderIfAbsent=true&apiKey=ffa2ba72f3c54c39a01fe9ece16213e9",
    name: "Amazon Points",
    amount: "₹915",
  },
  {
    quantity: 989,
    pointValue: "1point=₹0.56",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1aacc32eca3c18d04dd6bbb6664ec8060f47ad4c8fdc4325dec8d07a9a0aee0e?placeholderIfAbsent=true&apiKey=ffa2ba72f3c54c39a01fe9ece16213e9",
    name: "Flipkart Coins",
    amount: "₹553",
  },
  {
    quantity: 989,
    pointValue: "1point=₹0.56",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/57412ed617548790948b340fc6e2105914d843614718d09c7fa71bc08791b885?placeholderIfAbsent=true&apiKey=ffa2ba72f3c54c39a01fe9ece16213e9",
    name: "TATA Neu Coins",
    amount: "₹553",
  },
];

export const PaymentReceipt: React.FC = () => {
  return (
    <div>
      <Header1 />
      <div className="container">
        {/* <header className="header">
        <h1 className="greeting">Good Evening, Gatikrushna Mohapatra</h1>
        <div className="uid">UID- 01932401JFNJ9V</div>
        </header> */}

        <main className="main">
          <PaymentDetails
            amount="₹2000"
            discount="-₹324"
            finalAmount="₹1676"
            time="9:25"
            merchant="Amazon"
          />

          <section className="transactionSection">
            <div className="sectionHeader">
              <div>
                <h2 className="sectionTitle">Transaction details</h2>
                <div className="sectionSubtitle">Used Reward points</div>
              </div>
              <div className="actionButtons">
                <GetAppIcon
                  className="actionButton"
                  aria-label="Download"
                  color="disabled"
                />
                <ShareIcon
                  className="actionButton"
                  aria-label="Download"
                  color="disabled"
                />
              </div>
            </div>

            <div className="rewardsList">
              {rewardPointsData.map((data, index) => (
                <RewardPointsCard key={index} data={data} />
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <button className="paymentButton">Payment</button>
        </footer>

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1adb2f11d9948db454589a799ed366b0d8d055afb865267d70297374d7cc8651?placeholderIfAbsent=true&apiKey=ffa2ba72f3c54c39a01fe9ece16213e9"
          alt=""
          className="footerImage"
          loading="lazy"
        />
      </div>
    </div>
  );
};
