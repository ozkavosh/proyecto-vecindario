import "./Menu.css";
import { FaRegQuestionCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuthContext } from "../../context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

const Menu = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const handleAccount = () => {
    if (!currentUser) return navigate("/login", { replace: true });

    return signOut(auth);
  };

  //close menu when any link is clicked
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
    //close menu when clicked outside of it
    const handleOutsideClick = (evt) => {
      if (navMenu.current != null) {
        let onNav = navMenu.current.contains(evt.target);
        let onMenuWidget = menuWidget.current.contains(evt.target);

        if (
          !onNav &&
          !onMenuWidget &&
          menuWidget.current.classList.contains("is-active")
        ) {
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
        title="Menú"
        ref={menuWidget}
        className="header-item hamburger--collapse nav-toggle hamburger"
        onClick={hamburgerAction}
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
        {/* <FaBars /> */}
      </button>
      <nav className="menu-links" ref={navMenu}>
        {/* TODO: switch to NavLinks */}
        {/* TODO: add proper icons */}
        <Link to="/login">
          <button onClick={handleClick}>
            <FaSignInAlt /> Regístrate / Inicia sesión
          </button>
        </Link>
        <Link to="">
          <button onClick={handleClick}>
            <FaSignInAlt /> ¿Cómo funciona?
          </button>
        </Link>
        <Link to="">
          <button onClick={handleClick}>
            <FaRegQuestionCircle /> Preguntas frecuentes
          </button>
        </Link>
        <Link to="">
          <button onClick={handleClick}>
            <FaRegQuestionCircle /> Soy propietario
          </button>
        </Link>
        <Link to="">
          <button onClick={handleClick}>
            <FaRegQuestionCircle /> Ayuda
          </button>
        </Link>
        <Link to="">
          <button onClick={handleClick}>
            <FaRegQuestionCircle /> Contáctanos
          </button>
        </Link>
        <Link to="">
          <button onClick={handleClick}>
            <FaRegQuestionCircle /> Términos y Condiciones / Política de
            Privacidad
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
          {currentUser ? "Cerrar Sesión" : "Iniciar Sesión"}
        </button>
      </nav>
    </div>
  );
};

export default Menu;
