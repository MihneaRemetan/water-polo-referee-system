import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { syncPendingMatches } from "./services/syncService";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LiveMatch from "./pages/LiveMatch";
import MatchSetup from "./pages/MatchSetup";
import AdminPage from "./pages/AdminPage";
import MatchHistory from "./pages/MatchHistory";
import MatchDetails from "./pages/MatchDetails";
import PlayerStatistics from "./pages/PlayerStatistics";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayersPage from "./pages/PlayersPage";
import Coaches from "./pages/Coaches";
import PendingSync from "./pages/PendingSync";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.onLine) {
      console.log("Initial sync...");
      syncPendingMatches(navigate);
    }

    const handleOnline = () => {
      const pending = JSON.parse(localStorage.getItem("offlineMatches") || "[]")
        .filter((m) => m.syncStatus === "PENDING").length;

      console.log(`🌐 Back online → syncing ${pending} matches...`);

      syncPendingMatches(navigate);
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/live-match"
        element={
          <ProtectedRoute>
            <LiveMatch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/match-setup"
        element={
          <ProtectedRoute>
            <MatchSetup />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <MatchHistory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history/:id"
        element={
          <ProtectedRoute>
            <MatchDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/statistics"
        element={
          <ProtectedRoute>
            <PlayerStatistics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/players"
        element={
          <ProtectedRoute>
            <PlayersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/coaches"
        element={
          <ProtectedRoute>
            <Coaches />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pending-sync"
        element={
          <ProtectedRoute>
            <PendingSync />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default App;