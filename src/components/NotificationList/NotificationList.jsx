import "./NotificationList.css";
import { useState } from "react";
import Notification from "../Notification/Notification";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([0, 1, 1, 0, 1, 1, 0, 0, 1]);
  return (
    <div className="notification-list">
      {notifications.map((noti, i) => (
        <Notification version={noti} key={noti[i]} />
      ))}
    </div>
  );
};

export default NotificationList;
