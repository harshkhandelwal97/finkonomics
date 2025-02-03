import React from "react";
import "../styles/paymentReceipt.css"
import { PaymentDetailsProps } from "../types/types";

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
    amount,
    discount,
    finalAmount,
    time,
    merchant,
  }) => {
    return (
      <div className="paymentCard">
        <div className="paymentHeader">
          <div className="merchantInfo">
            Payment to <span className="merchantName">{merchant}</span>
          </div>
          <div className="paymentTime">{time}</div>
        </div>
        <div className="paymentBreakdown">
          <div className="amountRow">
            <div className="amountLabel">Amount to be paid</div>
            <div className="amount">{amount}</div>
          </div>
          <div className="discountRow">
            <div className="discountLabel">Total discount applied</div>
            <div className="discount">{discount}</div>
          </div>
          <div className="separator" />
          <div className="finalRow">
            <div className="finalLabel">Amount after discount</div>
            <div className="finalAmount">{finalAmount}</div>
          </div>
        </div>
      </div>
    );
  };
  