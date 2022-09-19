import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  return false ? children : <Navigate to={"/login"} />;
  //TODO: replace with actual account status
};

export default AuthRoute;