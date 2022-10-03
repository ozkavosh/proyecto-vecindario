import { useRef, useState, useEffect } from "react";
import { BiCheckbox } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import "./ReviewTagSelect.css";

const ReviewTagSelect = ({ dispatch }) => {
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

  const options = ["Vecinos", "Barrio", "Inmueble", "Propietario", "Otros"];

  return (
    <div
      className="tagSelect"
      ref={buttonRef}
      onClick={() => setOpen((prev) => !prev)}
    >
      Tema de reseña <FaChevronDown />
      {open && (
        <ul className="tagSelectOptions">
          {options.map((option, id) => (
            <li key={id} className="tagSelectOption" onClick={() => dispatch({ type: "setTag", payload: option })}>
              {option} <BiCheckbox />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewTagSelect;