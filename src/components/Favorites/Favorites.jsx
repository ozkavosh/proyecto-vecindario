import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Favorites = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      Swal.fire({ text: "Debes iniciar sesión primero", icon: "info" });
      navigate("/nuevo", { replace: true });
    }
  }, [navigate]);


  return (
    <div>Favorites</div>
  )
}

export default Favorites