//protejeaza paginile, nu ma lasa sa intru doar daca sunt logat
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userId = localStorage.getItem("userId"); //cauta in browser sa vada daca exista userId

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return children; //pagina normala
}

export default ProtectedRoute;