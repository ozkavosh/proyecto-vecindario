import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import "./Login.css";

const Login = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: true }));

    return () =>
      setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  return (
    <section className="login">
      <div className="container">
        <h2 className="loginHeading">Iniciar sesión</h2>
        <p>¡Hola! Tu espacio ideal te está esperando.</p>
        <form>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>

          <Link to="/" className="recoverPasswordLink">
            ¿Has olvidado la contraseña?
          </Link>

          <button className="btn" type="submit">
            Continuar
          </button>
        </form>

        <p className="snText"></p>

        <div className="snLinks">
          <FaGoogle />
          <FaFacebook />
          <FaApple />
        </div>

        <div className="newUser">
          <p className="newText">¿Aún no tienes cuenta?</p>
          <Link to="/registro">
            <button className="btn">Registrate</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
