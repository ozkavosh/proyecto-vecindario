import { useEffect } from "react";
import { RiChatQuoteLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const AddReviewAuth = ({ setDismount }) => {
  useEffect(() => {
    setDismount((prev) => ({ ...prev, footer: true }));

    return () => setDismount({ header: false, footer: false, tabBar: false });
  }, [setDismount]);

  return (
    <div className="auth-route">
      <div className="message">
        <RiChatQuoteLine />
        <p>
          Para realizar una <strong>reseña</strong> debe iniciar sesión.
        </p>
        <Link to="/login">
          <button>iniciar sesión</button>
        </Link>
      </div>
    </div>
  );
};

export default AddReviewAuth;
