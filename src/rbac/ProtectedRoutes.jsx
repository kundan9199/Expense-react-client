import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ roles = [], children }) {
  const user = useSelector(state => state.userDetails);

  if (!user || !user.roles) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = roles.some(role => user.roles.includes(role));

  return hasAccess
    ? children
    : <Navigate to="/unauthorized-access" replace />;
}

export default ProtectedRoutes;
