import { useEffect } from "react";
import { FaChevronRight, FaEraser, FaRegCommentAlt, FaRegEdit, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import ProfileReview from "../ProfileReview/ProfileReview";
import "./Profile.css";

const Profile = ({ setDismount }) => {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  return (
    <section className="profile">
      {!currentUser ? (
        <div className="not-logged">
          <FaUser />
          <p>
            Para acceder a su <strong>perfil</strong> inicie sesión.
          </p>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>
            <img src="" alt="img" /> Camila Cassina
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
        </>
      )}
    </section>
  );
};

export default Profile;
