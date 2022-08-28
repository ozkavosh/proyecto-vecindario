import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire({ text: "Debes iniciar sesión primero", icon: "info" });
      navigate("/nuevo", { replace: true });
    }
  }, [navigate]);

  const { firstname, lastname, email, isOwner, avatar } =
    JSON.parse(sessionStorage.getItem("user"))?.data ?? [];

  const logout = () => {
    sessionStorage.clear();
  };

  return (
    <Container fluid>
      <Container className="my-5 p-4 bg-light">
        <Row>
          <h2>Perfil</h2>
        </Row>
        <Row>
          <Row>
            <Col xs={"2"}>
              <img src={avatar} alt="Imágen de avatar" className="img-fluid" />
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <h4>Nombre</h4>
              <p>{firstname}</p>
            </Col>

            <Col xs={"auto"}>
              <h4>Apellido</h4>
              <p>{lastname}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <h4>Correo</h4>
              <p>{email}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <h4>Tipo de cuenta</h4>
              <p>{isOwner ? "Propietario" : "Común"}</p>
            </Col>
          </Row>

          <Row>
            <Col xs={"auto"}>
              <Link to="/login" onClick={logout}>
                Cerrar sesión
              </Link>
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>
  );
};

export default Profile;
