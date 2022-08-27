import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const pages = ["Inicio", "Favoritos", "Chat", "Ayuda", "Perfil"];

  const appTitle = "Vecindario".toUpperCase();

  return (
    <Container fluid className="header bg-dark text-light">
      <Container className="headerInner">
        <Row className="align-items-center justify-content-center flex-column">
          <Col xs={"auto"}>
            <h1>{appTitle}</h1>
          </Col>
          <Col xs={"auto"} className="navLinksContainer">
            <ul className="navLinks">
              {pages.map((pageTitle, id) => (
                <NavLink key={id} to={`/${pageTitle === "Inicio" ? "" : pageTitle.toLowerCase()}`} className="text-light">
                  <li className="navLink">
                    {pageTitle}
                  </li>
                </NavLink>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Header;
