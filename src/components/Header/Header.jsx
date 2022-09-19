import "./Header.css";
import { FaChevronLeft, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-cont">
        <button title="" className="header-item">
          <FaChevronLeft />
        </button>
        <Link to="/" className="header-item">
          {/* TODO: add logo image */}
          <img src="" alt="Vecindario" />
        </Link>
        <button title="Menú" className="header-item">
          <FaBars />
        </button>
      </div>
    </header>
  );
};

export default Header;
