import React from "react";
import { BiCheckbox } from "react-icons/bi";
import Stars from "../Stars/Stars";
import "./FilterButtonWrapper.css";

const FilterButtonWrapper = ({ type }) => {
  return (
    <div className={`filter-button-wrapper ${type}`}>
      <hr />
      <ul className="filter-button-options">
        {type === "score" ? (
          <li className="score-filter">
            <Stars amount={0} />
          </li>
        ) : (
          <>
            <li>
              Option <BiCheckbox />
            </li>
            <li>
              Option <BiCheckbox />
            </li>
            <li>
              Option <BiCheckbox />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default FilterButtonWrapper;
