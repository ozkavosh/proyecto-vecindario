import { FaHeart } from "react-icons/fa";
import "./Favorites.css";

const Favorites = () => {
  return (
    <section className="favorites">
          <h1>
            <FaHeart /> Tus favoritos
          </h1>
          <div className="favorite-list">
            <article className="favorite-item">Favorito</article>
          </div>
    </section>
  );
};

export default Favorites;
