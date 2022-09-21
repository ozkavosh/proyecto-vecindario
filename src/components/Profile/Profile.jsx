import { useEffect } from "react";
import "./Profile.css";

const Profile = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: true, tabBar: true }));
  }, [setDismount]);
  return (
    <section className="profile">
      <h1>
        <img src="" alt="" /> Bienvenido/a Usuario
      </h1>
      <hr />
      <section className="user-info"></section>
      <section className="user-reviews"></section>
    </section>
  );
};

export default Profile;
