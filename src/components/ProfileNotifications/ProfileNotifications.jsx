import { useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import NotificationList from "../NotificationList/NotificationList";
import "./ProfileNotifications.css";

const ProfileNotifications = ({ setDismount }) => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);
  if (!currentUser) {
    return navigate("/perfil");
  }
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
