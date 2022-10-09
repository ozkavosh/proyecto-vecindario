import "./FilterButtonWrapper.css";
import { BiCheckbox } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { types } from "../../types/filterButtonWrapper";

const FilterButtonWrapper = ({ type, dispatch }) => {
  const handleFilterClick = (filter) => {
    if (filter.type === "orderBy") {
      const orderType = filter.option === 1 ? "desc" : "asc";
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
    <div className={`filter-button-wrapper ${type}`}>
      <ul className="filter-button-options">
        {type === "rating" ? (
          <li className="score-filter">
            {types[type].map((_, id) => (
              <FaRegStar
                key={id}
                onClick={() => handleFilterClick({ type, option: id })}
              />
            ))}
          </li>
        ) : (
          types[type].map((option, id) => (
            <li
              key={option}
              onClick={() => handleFilterClick({ type, option: id })}
            >
              <span>{option}</span>
              <BiCheckbox />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FilterButtonWrapper;
