import { useEffect } from "react";
import { FaHeart, FaRegCommentDots, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./AuthRoute.css";

const AuthRoute = ({ children, route, setDismount }) => {
  const { currentUser } = useAuthContext();

  const types = {
    chat: { message: "mensajes", icon: <FaRegCommentDots /> },
    favorites: { message: "favoritos", icon: <FaHeart /> },
    profile: { message: "datos", icon: <FaRegUserCircle /> },
  };

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, header: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, header: false }));
  }, [currentUser?.uid, setDismount]);

  return currentUser?.uid ? (
    children
  ) : (
    <div className="auth-route">
      <div className="message">
        {types[route].icon}
        <p>
          Para ver sus <strong>{types[route].message}</strong> inicie sesión.
        </p>
        <Link to="/login">
          <button>Iniciar sesión</button>
        </Link>
      </div>
    </div>
  );
};

export default AuthRoute;
