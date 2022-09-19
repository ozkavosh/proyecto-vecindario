import { useEffect } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import "./Register.css";

const Register = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: true }));

    return () =>
      setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  return (
    <section className="login">
      <div className="container">
        <h2 className="loginHeading">Registrate</h2>
        <p>¡Hola! Tu espacio ideal te está esperando.</p>
        <form>
          <div className="formGroup">
            <label htmlFor="fullname">Nombre y apellido</label>
            <input type="text" name="fullname" />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" />
          </div>

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
      </div>
    </section>
  );
};

export default Register;
