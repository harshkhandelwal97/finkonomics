import React from "react";
import { ActionButton } from "./ActionButton";
import "../styles/emptyCart.css"

import EmptyImage from "../assets/Locker.svg"

export const EmptyCart: React.FC = () => {
  return (
    <div className="rewardsPage">
      {/* Homepage Component */}
      {/* <Homepage totalPoints={9875} totalValue="₹6325" savedAmount="₹5467" /> */}

      {/* Rewards Card Section */}
       {/* <div className="rewardsCard">
        <p className="rewardsPrompt">
          Would you like to redeem all your reward points?
        </p>
      </div>  */}

      {/* Permissions Section */}
      <div className="permissionsSection">
        <p className="permissionsText">
          Allow us to combine all your reward points
        </p>
        <span className="permissionsLink">Permissions</span>
      </div>

      {/* SVG Image */}
      <img
        src={EmptyImage}
        alt="Reward Icon"
        className="svgImage"
      />

      {/* Info Section */}
      <div className="infoSection">
        <h2 className="infoTitle">Unlock Your Rewards – Safely Stored!</h2>
        <p className="infoDescription">
          Grant us permission to fetch your points—we'll guard them like
          treasure! Still unsure? Check user feedback or chat with us.
        </p>

        {/* Action Button */}
        <div className="accessButton">
          <ActionButton label="Give Access & Claim Rewards" variant="secondary" />
        </div>
      </div>
    </div>
  );
};
