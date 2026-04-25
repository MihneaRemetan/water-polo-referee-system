import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;