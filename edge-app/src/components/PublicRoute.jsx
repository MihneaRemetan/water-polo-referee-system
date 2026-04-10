import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const userId = localStorage.getItem("userId");

  if (userId) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;