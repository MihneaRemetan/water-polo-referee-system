import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");

  const isOffline = !navigator.onLine;
  const path = location.pathname;

  const liveMatchLocked = localStorage.getItem("liveMatchLocked");

  if (path.includes("/live-match") && liveMatchLocked === "true") {
    return <Navigate to="/match-setup" replace />;
  }

  console.log("ProtectedRoute:", {
    userName,
    userId,
    isOffline,
    path,
  });

  const offlineRestricted = ["/admin", "/history", "/statistics"];

  if (isOffline && offlineRestricted.includes(path)) {
    return <Navigate to="/match-setup" replace />;
  }

  if (!userName || !userId) {
    return <Navigate to="/" replace />;
  }

  return children;
}
export default ProtectedRoute;