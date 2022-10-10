import { useEffect, useRef, useState } from "react";
import { FaList } from "react-icons/fa";
import FavoritesOrderButtonWrapper from "../FavoritesOrderButtonWrapper/FavoritesOrderButtonWrapper";
import "./FavoritesOrderButton.css";

const FavoritesOrderButton = ({ dispatch }) => {
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
    <div className="favoritesOrderButton" ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
      <button>
        <FaList />
      </button>

      {open && <FavoritesOrderButtonWrapper dispatch={dispatch} />}
    </div>
  );
};

export default FavoritesOrderButton;
