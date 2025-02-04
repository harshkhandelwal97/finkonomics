import React, { useState } from "react";
import "../styles/notification.css";
import { NotificationCard } from "../components/NotificatonCard";
import { Tab } from "../components/NotificationTab";
import { NotificationItem } from "../types/types";
import Header1 from "../components/Header1";
import Navbar from "../components/Navbar";
// import Footer1 from "../components/footer";

const notifications: NotificationItem[] = [
  {
    type: "Expires",
    title: "Amazon coins",
    time: "11:35 AM",
    message:
      "Last day to redeem your Amazon point. Make sure to Exchange these or Use in store",
    expiryDate: "Expires on 2024, Oct 31\n@ 05:30am IST",
    actionText: "Exchange now!",
  },
  {
    type: "Expires",
    title: "Amazon coins",
    time: "3 days ago",
    message:
      "Last day to redeem your Amazon point. Make sure to Exchange these or Use in store",
    expiryDate: "Expires on 2024, Oct 31\n@ 05:30am IST",
    actionText: "Exchange now!",
  },
  {
    type: "Expires",
    title: "Amazon coins",
    time: "3 days ago",
    message:
      "Last day to redeem your Amazon point. Make sure to Exchange these or Use in store",
    expiryDate: "Expires on 2024, Oct 31\n@ 05:30am IST",
    actionText: "Exchange now!",
  },
];

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Recent");

  return (
    <div className="notificationPage">
      <Header1 />

      <main className="mainContent">
        <h2 className="pageTitle">Notifications</h2>

        <div className="tabContainer">
          <div className="tabs">
            {["Recent", "All", "Read"].map((tab) => (
              <Tab
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
          <button className="filterButton" aria-label="Filter notifications">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7631e2de58041ada00f3a33c9f556ebe5a40b07721b3ae5713d2f08af3ac2fae?placeholderIfAbsent=true&apiKey=ffa2ba72f3c54c39a01fe9ece16213e9"
              alt=""
              className="filterIcon"
            />
          </button>
        </div>

        <div className="notificationsList">
          {notifications.map((notification, index) => (
            <NotificationCard key={index} notification={notification} />
          ))}
        </div>
      </main>

      {/* <nav className="bottomNav">
        <div className="navItems">
          <button className="navItem">Home</button>
          <button className="navItem">History</button>
          <button className="navItem">Permissions</button>
          <button className="navItem">Profile</button>
        </div>
      </nav> */}

      
      {/* <Footer1 /> */}

    </div>
  );
};
