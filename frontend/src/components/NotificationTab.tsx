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
