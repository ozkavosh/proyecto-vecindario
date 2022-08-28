import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    try {
      const response = await axios.post("https://vecindario-backend.glitch.me/auth/login", {
        email: email.value,
        password: password.value,
      });
      Swal.fire({ title: "Éxito", text: `Bienvenido ${response.data.user.data.firstname}!`, icon: "success"});

      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      navigate("/", { replace: true });
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: 'error' });
    }
  };

  return (
    <Container fluid>
      <Container as="form" className="py-5" onSubmit={(e) => login(e)}>
        <Row className="justify-content-center">
          <Col xs={4}>
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={4}>
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
            />
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col xs={"auto"} className="text-primary">
            <Link to="/nuevo">Crear nueva cuenta</Link>
          </Col>
        </Row>

        <Row className="justify-content-center mt-3">
          <Col xs={"auto"}>
            <input type="submit" value="Ingresar" className="btn btn-dark" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
