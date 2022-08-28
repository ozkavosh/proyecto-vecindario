import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const { avatar } = e.target;
    const data = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      isOwner: e.target.isOwner.value === "on"
    }

    formData.append('avatar', avatar.files[0] );
    formData.append('data', JSON.stringify(data));

    try {
      await axios.post("https://vecindario-backend.glitch.me/auth/new", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire({
        title: "Éxito",
        text: "Cuenta creada con éxito ahora puede ingresar",
        icon: "success",
      });
      navigate("/login", { replace: true });
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: "error" });
    }
  };

  return (
    <Container fluid>
      <Container as="form" className="py-5" onSubmit={(e) => createAccount(e)}>
        <Row className="justify-content-center">
          <Col xs={"auto"}>
            <label htmlFor="firstname" className="form-label">
              Nombres
            </label>
            <input type="text" name="firstname" className="form-control" required/>
          </Col>

          <Col xs={"auto"}>
            <label htmlFor="lastname" className="form-label">
              Apellidos
            </label>
            <input type="text" name="lastname" className="form-control" required/>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={4}>
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input type="email" name="email" className="form-control" required/>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={4}>
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input type="password" name="password" className="form-control" required/>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col xs={4}>
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              className="form-control"
              accept="image/png, image/jpeg"
              required
            />
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
            <Link to="/login">Ya tengo una cuenta</Link>
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
