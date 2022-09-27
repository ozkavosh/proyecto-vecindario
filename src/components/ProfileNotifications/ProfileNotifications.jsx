import { useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import NotificationList from "../NotificationList/NotificationList";
import "./ProfileNotifications.css";

const ProfileNotifications = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  return (
    <section className="profile-notifications">
      <h1>
        <FaRegBell /> Notificaciones
      </h1>
      <hr />
      <NotificationList />
    </section>
  );
};

export default ProfileNotifications;
