import { signOut } from "firebase/auth";
import { BiInfoCircle, BiLock, BiLogOut, BiMessageEdit } from "react-icons/bi";
import { FaChevronRight, FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { auth } from "../../firebase/config";
import "./Profile.css";

const Profile = () => {
  const { currentUser } = useAuthContext();

  return (
    <section className="profile">
      <h1>
        {currentUser.photoURL ? (
          <img
            src={currentUser.photoURL}
            alt={currentUser?.displayName
              ?.toUpperCase()
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          />
        ) : (
          <div className="not-found">
            {currentUser.displayName
              ?.toUpperCase()
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
        {currentUser.displayName}
      </h1>
      <section className="navigationList">
        <nav>
          <Link to="/perfil/datos">
            <FaRegUserCircle />
            <p>Información personal</p>
            <FaChevronRight />
          </Link>
          <Link to="/perfil/r">
            <BiMessageEdit />
            <p>Reseñas</p>
            <FaChevronRight />
          </Link>
          <Link to="/perfil/notificaciones">
            <FaRegBell />
            <p>Notificaciones</p>
            <FaChevronRight />
          </Link>
          <Link to="/perfil">
            <BiLock />
            <p>Privacidad y datos</p>
            <FaChevronRight />
          </Link>
          <Link to="/perfil">
            <BiInfoCircle />
            <p>Ayuda</p>
            <FaChevronRight />
          </Link>
          <Link to="/" onClick={() => signOut(auth)}>
            <BiLogOut />
            <p>Cerrar sesión</p>
            <FaChevronRight />
          </Link>
        </nav>
      </section>
    </section>
  );
};

export default Profile;
