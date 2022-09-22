import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

const AuthRoute = ({ children }) => {
  const { currentUser } = useAuthContext();
  return currentUser ? children : <Navigate to={"/login"} />;
};

export default AuthRoute;