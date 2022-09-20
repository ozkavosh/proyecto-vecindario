import { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import SocialNetworkLogin from "../SocialNetworkLogin/SocialNetworkLogin";
import createUserDocs from "../../utils/createUserDocs";
import "./Register.css";

const Register = ({ setDismount }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: true }));

    return () =>
      setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password } = e.target;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      await updateProfile(response.user, { displayName: fullname.value });

      await createUserDocs(response.user, fullname.value, email.value);

      navigate("/login", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2 className="loginHeading">Registrate</h2>
        <p>¡Hola! Tu espacio ideal te está esperando.</p>
        <form onSubmit={handleSubmit}>
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

        <SocialNetworkLogin/>
      </div>
    </section>
  );
};

export default Register;