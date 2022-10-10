import { FaChevronUp, FaList } from "react-icons/fa";
import "./FavoritesOrderButtonWrapper.css";

const FavoritesOrderButtonWrapper = ({ dispatch, open }) => {
  return (
    <div className={`favoritesOrderButtonWrapper ${open ? "open" : "closed"}`}>
      <FaList />
      <p>
        Ordenar por <FaChevronUp />
      </p>
      <fieldset>
        <label>
          <span>Más antiguos</span>
          <input
            type="radio"
            className="radiobutton"
            name="order-option"
            onChange={() => dispatch({ type: "setOrderBy", payload: "older" })}
          />
        </label>
        <label>
          <span>Más recientes</span>
          <input
            type="radio"
            className="radiobutton"
            name="order-option"
            onChange={() => dispatch({ type: "setOrderBy", payload: "recent" })}
          />
        </label>
        <label>
          <span>Puntuación</span>
          <input
            type="radio"
            className="radiobutton"
            name="order-option"
            onChange={() => dispatch({ type: "setOrderBy", payload: "rating" })}
          />
        </label>
      </fieldset>
    </div>
  );
};

export default FavoritesOrderButtonWrapper;
