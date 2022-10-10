import "./ReviewTagSelect.css";
import { useRef, useState, useEffect } from "react";
import { BiCheckbox } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { options } from "../../types/reviewTagSelect";

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

  return (
    <div
      className="tagSelect"
      ref={buttonRef}
      onClick={() => setOpen((prev) => !prev)}
    >
      <h4>Tipo de reseña <FaChevronDown /></h4>
      {open && (
        <ul className="tagSelectOptions">
          {options.map((option, id) => (
            <li
              key={id}
              className="tagSelectOption"
              onClick={() => dispatch({ type: "setTag", payload: option })}
            >
              {option} <BiCheckbox />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewTagSelect;
