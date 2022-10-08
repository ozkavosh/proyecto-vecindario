import "./ProfileNotifications.css";
import { FaRegBell } from "react-icons/fa";
import NotificationList from "../NotificationList/NotificationList";

const ProfileNotifications = () => {
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
