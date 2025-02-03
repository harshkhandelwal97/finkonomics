import React from "react";
import "../styles/notification.css";
import { TabProps } from "../types/types";

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`tab ${isActive ? "activeTab" : ""}`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
    >
      {label}
    </button>
  );
};

export const NotificationCard: React.FC<{ notification: NotificationCardProps }> = ({ notification }) => {
  return (
    <div className="notificationCard">
      <div className="cardHeader">
        <div className="headerInfo">
          <span className="notificationType">{notification.type}</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83258b89c2198ccec2dcb0e02c47a7c8bc7a17a91603ddae854cd3a80824ad24?placeholderIfAbsent=true&apiKey=ffa2ba72f3c54c39a01fe9ece16213e9"
            alt=""
            className="divider"
          />
          <span className="notificationTitle">{notification.title}</span>
        </div>
        <span className="timestamp">{notification.time}</span>
      </div>
      <p className="message">{notification.message}</p>
      <div className="cardFooter">
        <div className="expiryInfo">{notification.expiryDate}</div>
        <button className="actionButton">
          {notification.actionText}
        </button>
      </div>
    </div>
  );
};
