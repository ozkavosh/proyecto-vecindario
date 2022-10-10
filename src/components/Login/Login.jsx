import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import SocialNetworkLogin from "../SocialNetworkLogin/SocialNetworkLogin";
import "./Login.css";

const Login = ({ setDismount }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true, tabBar: true }));

    return () => setDismount((prev) => ({ ...prev, footer: false, tabBar: false }));
  }, [setDismount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = e.target;

    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      navigate("/", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2 className="loginHeading">Iniciar sesión</h2>
        <p>¡Hola! Tu espacio ideal te está esperando.</p>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="ejemplo@gmail.com" />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" placeholder="***********" />
          </div>

          <Link to="/" className="recoverPasswordLink">
            ¿Has olvidado la contraseña?
          </Link>

          <button className="btn" type="submit">
            Continuar
          </button>
        </form>

        <SocialNetworkLogin />

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
