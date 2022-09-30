import React from "react";
import { BiCheckbox } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import "./FilterButtonWrapper.css";

const FilterButtonWrapper = ({ type }) => {
  const typeOptions = {
    location: ["10 km", "+10 km", "+20 km"],
    propertyType: ["Casa", "Departamento", "Hotel"],
    score: [1, 2, 3, 4, 5],
    orderBy: ["Reseñas positivas", "Reseñas negativas", "Más reciente"],
  };

  const handleFilterClick = (filter) => {
    console.log(`Option ${typeOptions[filter.type][filter.option]} of filter ${filter.type} has ben checked!`);
  }

  return (
    <div className={`filter-button-wrapper ${type}`}>
      <hr />
      <ul className="filter-button-options">
        {type === "score" ? (
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
