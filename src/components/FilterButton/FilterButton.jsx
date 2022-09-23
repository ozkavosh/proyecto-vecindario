import React from "react";
import { FaChevronDown } from "react-icons/fa";

const FilterButton = ({ text, onClick }) => {
  return (
    <button className="searchFilters" onClick={onClick}>
      {text} <FaChevronDown />
    </button>
  );
};

export default FilterButton;
