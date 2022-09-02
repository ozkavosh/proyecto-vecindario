import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import axios from "axios";
import Swal from "sweetalert2";
import Avatar from "react-avatar-edit";

const Register = () => {
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCrop = (preview) => {
    setAvatarPreview(preview);
  };

  const onClose = () => {
    setAvatarPreview(null);
  };

  const onBeforeFileLoad = (e) => {
    if (e.target.files[0].size > 1024 * 1024 * 2) {
      Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Tamaño de imagen supera el permitido.",
      });
      e.target.value = "";
    }
  };

  const createAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (!avatarPreview)
      return Swal.fire({
        title: "Error!",
        icon: "error",
        text: "Debe ingresar un avatar!",
      });

    const fetchAvatar = await fetch(avatarPreview);
    const avatarBlob = await fetchAvatar.blob();

    const data = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      isOwner: e.target.isOwner.checked,
    };

    formData.append("avatar", avatarBlob);
    formData.append("data", JSON.stringify(data));

    try {
      setLoading(true);
      await axios.post(
        "https://vecindario-backend.glitch.me/auth/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire({
        title: "Éxito",
        text: "Cuenta creada con éxito ahora puede ingresar",
        icon: "success",
      });
      navigate("/login", { replace: true });
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Container as="form" className="py-5" onSubmit={(e) => createAccount(e)}>
        <Row className="justify-content-center">
          <Col auto xl={4}>
            <label htmlFor="firstname" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              required
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col auto xl={4}>
            <label htmlFor="lastname" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              required
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col auto xl={4}>
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
          <Col auto xl={4}>
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

        <Row className="justify-content-center">
          <Col auto xl={4}>
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <Avatar
              onCrop={onCrop}
              onClose={onClose}
              width={250}
              height={250}
              imageHeight={250}
              imageWidth={250}
              minCropRadius={60}
              exportSize={250}
              onBeforeFileLoad={onBeforeFileLoad}
              label={"Elegir una imagen"}
              src={avatarSrc}
            />
          </Col>
        </Row>

        <Row className="justify-content-center mt-2">
          <Col auto xl={4}>
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
            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? (
                <SyncLoader
                  color="#fff"
                  size={7}
                  margin={2}
                  speedMultiplier={0.6}
                />
              ) : (
                "Registrarme"
              )}
            </button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Register;
