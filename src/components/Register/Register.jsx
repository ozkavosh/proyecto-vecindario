import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password, isOwner } = e.target;

    try {
      await axios.post("https://vecindario-backend.herokuapp.com/auth/new", {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        isOwner: isOwner.value === 'on'
      });
      Swal.fire({ title: "Éxito", text: "Cuenta creada con éxito ahora puede ingresar", icon: 'success' });
      navigate('/login', { replace: true });
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: 'error' });
    }
  }

  return (
    <Container fluid>
      <Container as="form" className="py-5" onSubmit={(e) => createAccount(e)}>
        <Row className="justify-content-center">
          <Col xs={"auto"}>
            <label htmlFor="firstname" className="form-label">
              Nombres
            </label>
            <input type="text" name="firstname" className="form-control" />
          </Col>

          <Col xs={"auto"}>
            <label htmlFor="lastname" className="form-label">
              Apellidos
            </label>
            <input type="text" name="lastname" className="form-control" />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={4}>
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input type="email" name="email" className="form-control" />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={4}>
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input type="password" name="password" className="form-control" />
          </Col>
        </Row>

        <Row className="justify-content-center mt-2">
          <Col xs={4}>
            <label htmlFor="isOwner" className="form-check-label">
              ¿Posee propiedades?
            </label>
            <input
              type="checkbox"
              name="isOwner"
              className="form-check-input ms-2"
            />
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col xs={"auto"} className="text-primary">
            <Link to="/login">
              Ya tengo una cuenta
            </Link>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col xs={"auto"}>
            <input type="submit" value="Registrarme" className="btn btn-dark" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Register;
