import { FaChevronRight, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuthContext();

  return (
    <section className="profile">
          <h1>
            <img src="" alt="img" /> {currentUser.displayName}
          </h1>
          <hr />
          <section className="navigationList">
            <nav>
              <Link to="/perfil/datos">
                <FaUser />
                <p>Información personal</p>
                <FaChevronRight />
              </Link>
              <Link to="/perfil/r">
                <FaUser />
                <p>Reseñas</p>
                <FaChevronRight />
              </Link>
              <Link to="/perfil/notificaciones">
                <FaUser />
                <p>Notificaciones</p>
                <FaChevronRight />
              </Link>
              <Link to="/perfil">
                <FaUser />
                <p>Privacidad y datos</p>
                <FaChevronRight />
              </Link>
              <Link to="/perfil">
                <FaUser />
                <p>Ayuda</p>
                <FaChevronRight />
              </Link>
              <Link to="/">
                {/* TODO: cerrar sesión */}
                <FaUser />
                <p>Cerrar sesión</p>
                <FaChevronRight />
              </Link>
            </nav>
          </section>
    </section>
  );
};

export default Profile;
