import { useEffect } from "react";
import { TbFaceIdError } from "react-icons/tb";
import { Link } from "react-router-dom";

const NotFound = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true }));

    return () => setDismount({ header: false, footer: false, tabBar: false });
  }, [setDismount]);

  return (
    <div className="auth-route">
      <div className="message">
        <TbFaceIdError />
        <p>
          Lo sentimos, esta sección <strong>todavía</strong> no existe.
        </p>
        <Link to="/" replace>
          <button>Ir al inicio</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
