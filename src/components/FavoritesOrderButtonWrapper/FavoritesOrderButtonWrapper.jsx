import "./FavoritesOrderButtonWrapper.css";
import { FaList, FaChevronUp } from "react-icons/fa";
import { BiCheckbox } from "react-icons/bi";

const FavoritesOrderButtonWrapper = ({dispatch}) => {
  return (
    <div className="favoritesOrderButtonWrapper">
      <FaList />
      <p>
        Ordenar por <FaChevronUp />
      </p>
      <hr />
      <ul>
        <li onClick={() => dispatch({ type: "setOrderBy", payload: "older"})}>
          Más antiguos <BiCheckbox />
        </li>
        <li onClick={() => dispatch({ type: "setOrderBy", payload: "recent"})}>
          Más recientes <BiCheckbox />
        </li>
        <li onClick={() => dispatch({ type: "setOrderBy", payload: "rating"})}>
          Puntuación <BiCheckbox />
        </li>
      </ul>
    </div>
  );
};

export default FavoritesOrderButtonWrapper;
