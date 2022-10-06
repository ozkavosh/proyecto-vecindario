import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="site-map">
        <ul>
          <h4>Vecindario</h4>
          <li>
            <Link to="/buscador">Buscador</Link>
          </li>
          <li>
            <Link to="/">¿Cómo funciona?</Link>
          </li>
          <li>
            <Link to="/">Ayuda</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
        </ul>
        <ul>
          <h4>Usuarios</h4>
          <li>
            <Link to="/login">Iniciar sesión</Link>
          </li>
          <li>
            <Link to="/registro">Registro</Link>
          </li>
          <li>
            <Link to="/perfil">Perfil</Link>
          </li>
          <li>
            <Link to="/favoritos">Favoritos</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
        </ul>
        <ul>
          <h4>Propietarios</h4>
          <li>
            <Link to="/">Información</Link>
          </li>
          <li>
            <Link to="/">Contáctenos</Link>
          </li>
          <li>
            <Link to="/">Publicar</Link>
          </li>
          <li>
            <Link to="/">Mis propiedades</Link>
          </li>
        </ul>
      </div>
      <div className="links">
        <h4>Seguinos</h4>
        <div>
          <a href="https://twitter.com/">
            <FaTwitter />
          </a>
          <a href="https://facebook.com/">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com/">
            <FaInstagram />
          </a>
          <a href="https://youtube.com/">
            <FaYoutube />
          </a>
        </div>
      </div>
      <p className="copyright">©2022 Vecindario — Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
