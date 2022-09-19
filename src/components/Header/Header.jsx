import "./Header.css";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";

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
        <Menu />
      </div>
    </header>
  );
};

export default Header;
