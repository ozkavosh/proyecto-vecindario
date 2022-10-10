import { BiCheckbox } from "react-icons/bi";
import { FaChevronUp, FaList } from "react-icons/fa";
import "./FavoritesOrderButtonWrapper.css";

const FavoritesOrderButtonWrapper = ({ dispatch }) => {
  return (
    <div className="favoritesOrderButtonWrapper">
      <FaList />
      <p>
        Ordenar por <FaChevronUp />
      </p>
      <hr />
      {/* TODO: change this for radiobuttons */}
      <ul>
        <li onClick={() => dispatch({ type: "setOrderBy", payload: "older" })}>
          Más antiguos <BiCheckbox />
        </li>
        <li onClick={() => dispatch({ type: "setOrderBy", payload: "recent" })}>
          Más recientes <BiCheckbox />
        </li>
        <li onClick={() => dispatch({ type: "setOrderBy", payload: "rating" })}>
          Puntuación <BiCheckbox />
        </li>
      </ul>
    </div>
  );
};

export default FavoritesOrderButtonWrapper;
