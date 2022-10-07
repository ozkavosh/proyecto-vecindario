import "./NotificationList.css";
import { useState } from "react";
import Notification from "../Notification/Notification";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([
    { type: "msg", sender: "Darío Peretti" },
    { type: "like", sender: "María Amenta" },
    { type: "msg", sender: "Facundo Ruiz" },
    { type: "like", sender: "Leandro Díaz" },
    { type: "msg", sender: "Juana Silvera" },
    { type: "like", sender: "Germán Lizz" },
    { type: "msg", sender: "María Spositto" },
  ]);

  return (
    <div className="notification-list">
      {notifications.map((noti, i) => (
        <Notification type={noti.type} sender={noti.sender} key={noti[i]} />
      ))}
    </div>
  );
};

export default NotificationList;
