import { FaRegBell } from "react-icons/fa";
import NotificationList from "../NotificationList/NotificationList";
import "./ProfileNotifications.css";

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
