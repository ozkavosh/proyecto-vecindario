import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import "./ProfileInformation.css";

const ProfileInformation = () => {
  const { currentUser } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="profile-info">
      <h1>
        <FaUserCircle /> Información Personal
      </h1>
      <hr />
      <section className="form">
        <form>
          <div className="input">
            <label htmlFor="name">Nombre</label>
            <input
              className="editable"
              id="name"
              type="text"
              defaultValue={currentUser.displayName}
            />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" defaultValue={currentUser.email} disabled readOnly />
          </div>
          <div className="input">
            <label htmlFor="pass">Contraseña</label>
            <input id="pass" type="password" defaultValue="abc12345678" disabled readOnly />
          </div>
          <div className="input-grid">
            <div className="input">
              <label htmlFor="province">Provincia</label>
              <input id="province" className="editable" type="text" defaultValue="Barcelona" />
            </div>
            <div className="input">
              <label htmlFor="location">Localidad</label>
              <input id="location" className="editable" type="text" defaultValue="Cataluña" />
            </div>
            <div className="input">
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" className="editable" type="text" defaultValue="+34-115364589" />
            </div>
            <div className="input">
              <label htmlFor="dni">DNI</label>
              <input id="dni" className="editable" type="text" defaultValue="33896036" />
            </div>
          </div>
          <input
            className="submitButton"
            type="submit"
            onClick={handleSubmit}
            value="Guardar Cambios"
          />
        </form>
      </section>
    </section>
  );
};

export default ProfileInformation;
