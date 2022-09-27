import {  FaRegEdit } from "react-icons/fa";
import ProfileReview from "../ProfileReview/ProfileReview";
import "./Profile.css";

const Profile = () => {
  return (
    <section className="profile">
      <h1>
        <img src="" alt="img" /> Bienvenido/a Usuario
      </h1>
      <hr />
      <section className="user-info">
        <h2>Mis Datos</h2>
        <div className="input">
          <input className="editable" type="text" value="Pedro Gonzalez" disabled readOnly />
          <FaRegEdit className="icon" />
        </div>
        <div className="input">
          <input type="email" value="ejemplo@gmail.com" disabled readOnly />
        </div>
        <div className="input">
          <input type="password" value="abc12345678" disabled readOnly />
        </div>
      </section>
      <section className="user-reviews">
        <h2>Mis Reseñas</h2>
        <div className="reviews-container">
          <ProfileReview />
          <ProfileReview />
        </div>
      </section>
    </section>
  );
};

export default Profile;
