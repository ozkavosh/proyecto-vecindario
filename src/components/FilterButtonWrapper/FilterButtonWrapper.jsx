import "./FilterButtonWrapper.css";
import { FaRegStar } from "react-icons/fa";
import { types } from "../../types/filterButtonWrapper";

const FilterButtonWrapper = ({ type, dispatch, open }) => {
  const handleFilterChange = (filter) => {
    if (filter.type === "orderBy") {
      const orderType = filter.option === 1 ? "asc" : "desc";
      dispatch({
        type: "setOrder",
        payload: {
          field: filter.option < 2 ? "rating" : "createdAt",
          type: orderType,
        },
      });
    } else {
      const equalTo =
        filter.type === "type"
          ? types[filter.type][filter.option].toLowerCase()
          : types[filter.type][filter.option];
      dispatch({ type: "setFilter", payload: { field: filter.type, equalTo } });
    }
  };

  return (
    <div className={`filter-button-wrapper ${type} ${open ? "open" : "closed"}`}>
      {type === "rating" ? (
        <ul className="filter-button-options">
          <li className="score-filter">
            {types[type].map((_, id) => (
              <FaRegStar key={id} onClick={() => handleFilterChange({ type, option: id })} />
            ))}
          </li>
        </ul>
      ) : (
        <fieldset className="filter-button-options">
          {types[type].map((option, id) => (
            <label key={option}>
              <span>{option}</span>
              <input
                type="radio"
                className="radiobutton"
                name="filter-option"
                onChange={() => handleFilterChange({ type, option: id })}
              />
            </label>
          ))}
        </fieldset>
      )}
    </div>
  );
};

export default FilterButtonWrapper;
