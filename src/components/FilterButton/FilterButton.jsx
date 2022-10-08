import "./FilterButton.css";
import { useEffect, useState, useRef } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { types } from "../../types/filterButton";
import FilterButtonWrapper from "../FilterButtonWrapper/FilterButtonWrapper";

const FilterButton = ({ type, dispatch }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    const clickEvent = (e) => {
      if (open && buttonRef.current && !buttonRef.current.contains(e.target))
        setOpen(false);
    };

    document.addEventListener("click", clickEvent);

    return () => document.removeEventListener("click", clickEvent);
  }, [open]);

  return (
    <button
      className={open ? "filter-button open" : "filter-button"}
      ref={buttonRef}
      onClick={() => setOpen((prev) => !prev)}
    >
      {types[type].icon}
      <div className="filter-pill">
        {types[type].text} {open ? <FaChevronDown /> : <FaChevronUp />}
      </div>
      {open && <FilterButtonWrapper type={type} dispatch={dispatch} />}
    </button>
  );
};

export default FilterButton;
