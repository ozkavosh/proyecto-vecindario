import "./Header.css";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/svg/logo_tmp.svg";
import Menu from "../Menu/Menu";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-cont">
        <button title="" className="header-item" onClick={()=>navigate(-1)}>
          <FaChevronLeft />
        </button>
        <Link to="/" className="header-item">
          <Logo/>
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
