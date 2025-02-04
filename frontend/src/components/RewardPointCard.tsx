import React from "react";
// import styles from "./PaymentReceipt.module.css";
import "../styles/paymentReceipt.css"

import { AppliedDiscountTypes } from "../types/types";


export const RewardPointsCard: React.FC<{ data: AppliedDiscountTypes }> = ({ data }) => {
    return (
      <div className="rewardCard">
        {/* <div className="rewardHeader">
          <div className="quantity">Qty= {data.quantity}</div>
          <div className="pointValue">
            <div className="value">{data.pointValue}</div>
            <div className="infoIcon">i</div>
          </div>
        </div> */}
        <div className="rewardDetails">
          <div className="rewardInfo">
            <img
              loading="lazy"
              src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${data.logo}`}
              alt={`${data.legalName} icon`}
              className="rewardIcon"
            />
            <div className="rewardName">{data.legalName}</div>
          </div>
          <div className="rewardAmount">-₹{data.discount}</div>
        </div>
      </div>
    );
  };