import React from "react";
import { BiCheckbox } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import "./FilterButtonWrapper.css";

const FilterButtonWrapper = ({ type, dispatch }) => {
  const typeOptions = {
    location: ["10 km", "+10 km", "+20 km"],
    type: ["Casa", "Departamento", "Hotel"],
    rating: [1, 2, 3, 4, 5],
    orderBy: ["Reseñas positivas", "Reseñas negativas", "Más reciente"],
  };

  const handleFilterClick = (filter) => {
    if(filter.type === "orderBy"){
      const orderType = filter.option === 1 ? "desc" : "asc";
      dispatch({ type: "setOrder", payload: { field: filter.option < 2 ? "rating" : "createdAt", type: orderType } })
    }else{
      const equalTo = filter.type === "type" ? typeOptions[filter.type][filter.option].toLowerCase() : typeOptions[filter.type][filter.option]; 
      dispatch({ type: "setFilter", payload: { field: filter.type, equalTo } })
    }
    console.log(`Option ${typeOptions[filter.type][filter.option]} of filter ${filter.type} has ben checked!`);
  }

  return (
    <div className={`filter-button-wrapper ${type}`}>
      <hr />
      <ul className="filter-button-options">
        {type === "rating" ? (
          <li className="score-filter">
            { typeOptions[type].map((_, id) => <FaRegStar key={id} onClick={() => handleFilterClick({ type, option: id })}/>) }
          </li>
        ) : (
          <>
            {typeOptions[type].map((option, id) => (
              //Working with option index instead of string is probably the best approach
              //Maybe split into sub components ? (It could handle state to switch icon checked/unchecked)
              <li key={option} onClick={() => handleFilterClick({ type, option: id })}>
                <span>{option}</span> <BiCheckbox />
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default FilterButtonWrapper;
