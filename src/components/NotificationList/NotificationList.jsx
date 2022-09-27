import { useState } from "react";
import Notification from "../Notification/Notification";
import "./NotificationList.css";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([0, 1]);
  return (
    <div className="notification-list">
      {notifications.map((noti) => (
        <Notification version={noti} />
      ))}
    </div>
  );
};

export default NotificationList;
