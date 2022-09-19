import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="site-map">
        <ul>
          <h4>Vecindario</h4>
          <li>
            <Link to="/">Buscador</Link>
          </li>
          <li>
            <Link to="/">Reviews</Link>
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
            <Link to="/">Iniciar sesión</Link>
          </li>
          <li>
            <Link to="/">Registro</Link>
          </li>
          <li>
            <Link to="/">Perfil</Link>
          </li>
          <li>
            <Link to="/">Favoritos</Link>
          </li>
          <li>
            <Link to="/">Chat</Link>
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
          <li>
            <Link to="/">Chat</Link>
          </li>
        </ul>
      </div>
      <div className="links">
        <h4>Seguinos</h4>
        <div>
          <a href="https://twitter.com/">
            <FaTwitter />
          </a>
          <a href="https://twitter.com/">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com/">
            <FaInstagram />
          </a>
          <a href="https://twitter.com/">
            <FaYoutube />
          </a>
        </div>
      </div>
      <p className="copyright">©2022 Vecindario — Todos los derechos reservados</p>
    </footer>
  );
};

export default Footer;
