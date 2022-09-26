import "./TabBar.css";
import { CgHome, CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

//TODO: Replace with actual app icons

const TabBar = () => {
  return (
    <div className="tabBar">
      <ul className="tabBarTabContainer">
        <NavLink to="/" className="tab">
          <CgHome />
          <p>Home</p>
        </NavLink>

        <NavLink to="/favoritos" className="tab">
          <AiOutlineHeart />
          <p>Favoritos</p>
        </NavLink>

        <NavLink to="/buscador" className="tab">
          <FaSearch />
          <p>Reseñas</p>
        </NavLink>

        <NavLink to="/chat" className="tab">
          <BsChatDots />
          <p>Chat</p>
        </NavLink>

        <NavLink to="/perfil" className="tab">
          <CgProfile />
          <p>Perfil</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default TabBar;
