import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import "./Favorites.css";

const Favorites = ({ setDismount }) => {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: false }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  return (
    <section className="favorites">
      {!currentUser ? (
        <div className="not-logged">
          <FaHeart />
          <p>
            Para ver sus <strong>favoritos</strong> inicie sesión.
          </p>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>
            <FaHeart /> Tus favoritos
          </h1>
          <div className="favorite-list">
            <article className="favorite-item">Favorito</article>
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
