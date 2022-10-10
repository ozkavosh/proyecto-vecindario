import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { options } from "../../types/reviewTagSelect";
import "./ReviewTagSelect.css";

const ReviewTagSelect = ({ dispatch }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    const clickEvent = (e) => {
      if (open && buttonRef.current && !buttonRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("click", clickEvent);

    return () => document.removeEventListener("click", clickEvent);
  }, [open]);

  return (
    <div className="tagSelect" ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
      Tema de reseña <FaChevronDown className="reviewTopic" />
      {
        <fieldset className={`tagSelectOptions ${open ? "open" : "closed"}`}>
          {options.map((option, id) => (
            <label key={id} className="tagSelectOption">
              <span>{option}</span>
              <input
                type="radio"
                className="radiobutton"
                name="tag-option"
                onChange={() => dispatch({ type: "setTag", payload: option })}
              />
            </label>
          ))}
        </fieldset>
      }
    </div>
  );
};

export default ReviewTagSelect;
