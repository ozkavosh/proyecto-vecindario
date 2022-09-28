import {useEffect, useState, useRef} from "react";
import {
  FaChevronUp,
  FaChevronDown,
  FaRegStar,
  FaStar,
  FaList,
} from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import "./FilterButton.css";
import FilterButtonWrapper from "../FilterButtonWrapper/FilterButtonWrapper";

const FilterButton = ({ type }) => {
  const [ open, setOpen ] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    const clickEvent = (e) => {
      if(open && buttonRef.current && !buttonRef.current.contains(e.target)) setOpen(false);
    }

    document.addEventListener("click", clickEvent);

    return () => document.removeEventListener("click", clickEvent);
  }, [open])

  const types = {
    location: { text: "Región", icon: <HiOutlineLocationMarker /> },
    propertyType: { text: "Inmueble", icon: <BiBuildingHouse /> },
    score: {
      text: "Puntuación",
      icon: (
        <>
          <FaStar />
          <FaRegStar />
        </>
      ),
    },
    orderBy: { text: "Ordenar por", icon: <FaList /> },
  };

  return (
    <button className="filter-button" ref={buttonRef} onClick={() => setOpen(prev => !prev)}>
      {types[type].icon}
      <div className="filter-pill">
        {types[type].text} {open ? <FaChevronDown/>:<FaChevronUp />}
      </div>

      { open && <FilterButtonWrapper type={type}/> }
    </button>
  );
};

export default FilterButton;
