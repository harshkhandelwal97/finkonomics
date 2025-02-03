import React from "react";
// import styles from "./PaymentReceipt.module.css";
import "../styles/paymentReceipt.css"

import { RewardPointsData } from "../types/types";

interface RewardPointsCardProps {
  data: RewardPointsData;
}

export const RewardPointsCard: React.FC<{ data: RewardPointsData }> = ({ data }) => {
    return (
      <div className="rewardCard">
        <div className="rewardHeader">
          <div className="quantity">Qty= {data.quantity}</div>
          <div className="pointValue">
            <div className="value">{data.pointValue}</div>
            <div className="infoIcon">i</div>
          </div>
        </div>
        <div className="rewardDetails">
          <div className="rewardInfo">
            <img
              loading="lazy"
              src={data.icon}
              alt={`${data.name} icon`}
              className="rewardIcon"
            />
            <div className="rewardName">{data.name}</div>
          </div>
          <div className="rewardAmount">{data.amount}</div>
        </div>
      </div>
    );
  };