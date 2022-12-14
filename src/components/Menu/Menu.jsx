import { signOut } from "firebase/auth";
import { useEffect, useRef } from "react";
import {
  FaFileAlt,
  FaHouseUser,
  FaInfoCircle,
  FaRegListAlt,
  FaRegQuestionCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { auth } from "../../firebase/config";
import "./Menu.css";

const Menu = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  let logo = "https://i.postimg.cc/fytWH5zH/logo-menu.png";

  const handleAccount = () => {
    if (!currentUser) return navigate("/login", { replace: true });

    return signOut(auth);
  };

  const navMenu = useRef(null);
  const handleClick = () => {
    menuWidget.current.classList.remove("is-active");
    navMenu.current.classList.remove("slide-in");
    navMenu.current.classList.add("slide-out");
    setTimeout(() => {
      navMenu.current.style.display = "none";
    }, 500);
  };

  const menuWidget = useRef(null);
  const hamburgerAction = () => {
    menuWidget.current.classList.toggle("is-active");
    if (menuWidget.current.classList.contains("is-active")) {
      navMenu.current.classList.add("slide-in");
      navMenu.current.classList.remove("slide-out");
      setTimeout(() => {
        navMenu.current.style.display = "flex";
      }, 0);
    } else {
      navMenu.current.classList.remove("slide-in");
      navMenu.current.classList.add("slide-out");
      setTimeout(() => {
        navMenu.current.style.display = "none";
      }, 500);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (evt) => {
      if (navMenu.current != null) {
        let onNav = navMenu.current.contains(evt.target);
        let onMenuWidget = menuWidget.current.contains(evt.target);

        if (!onNav && !onMenuWidget && menuWidget.current.classList.contains("is-active")) {
          menuWidget.current.classList.remove("is-active");
          navMenu.current.classList.remove("slide-in");
          navMenu.current.classList.add("slide-out");
          setTimeout(() => {
            navMenu.current.style.display = "none";
          }, 500);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="menu">
      <button
        title="Men??"
        ref={menuWidget}
        className="header-item hamburger--collapse nav-toggle hamburger"
        onClick={hamburgerAction}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>
      <nav className="menu-links" ref={navMenu}>
        <div>
          <img src={logo} alt="" />
          <Link to="/login" id="login">
            <button onClick={handleClick}>
              <FaSignInAlt /> Reg??strate / Inicia sesi??n
            </button>
          </Link>
          <Link to="/404">
            <button onClick={handleClick}>
              <FaRegListAlt /> ??C??mo funciona?
            </button>
          </Link>
          <Link to="/404">
            <button onClick={handleClick}>
              <FaRegQuestionCircle /> Preguntas frecuentes
            </button>
          </Link>
          <Link to="/404">
            <button onClick={handleClick}>
              <FaHouseUser /> Soy propietario
            </button>
          </Link>
          <Link to="/404">
            <button onClick={handleClick}>
              <FaInfoCircle /> Ayuda
            </button>
          </Link>
          <Link to="/404">
            <button onClick={handleClick}>
              <FaUsers /> Cont??ctanos
            </button>
          </Link>
          <Link to="/404">
            <button onClick={handleClick}>
              <FaFileAlt /> T??rminos y Condiciones
            </button>
          </Link>

          <button
            id="sign-out"
            onClick={() => {
              handleClick();
              handleAccount();
            }}
          >
            {currentUser ? <FaSignOutAlt /> : <FaSignInAlt />}{" "}
            {currentUser ? "Cerrar Sesi??n" : "Iniciar Sesi??n"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
