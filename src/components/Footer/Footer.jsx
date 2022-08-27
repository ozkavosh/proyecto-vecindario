import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const pages = ["Inicio", "Favoritos", "Chat", "Ayuda", "Perfil"];
  const appTitle = "Vecindario".toUpperCase();

  return (
    <Container fluid className="bg-dark text-light">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs={12} className="text-center">
            <h2>{appTitle}</h2>
          </Col>
          <Col xs={"4"} className="footerDescription">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quos
              repudiandae sunt omnis, rem quae reiciendis non officiis? Aliquam
              excepturi quo iure ex voluptatem blanditiis impedit corporis quis
              expedita consequatur.
            </p>
          </Col>
          <Col xs={"auto"}>
            <ul className="footerLinks">
              {pages.map((pageTitle, id) => (
                <Link key={id} to={`/${pageTitle === "Inicio" ? "" : pageTitle.toLowerCase()}`} className="text-light">
                  <li className="footerLink">
                    {pageTitle}
                  </li>
                </Link>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Footer;
