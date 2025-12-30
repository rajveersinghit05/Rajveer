import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return <h3>Checking authentication...</h3>;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
