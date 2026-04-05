import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LiveMatch from "./pages/LiveMatch";
import MatchSetup from "./pages/MatchSetup";
import AdminPage from "./pages/AdminPage";
import MatchHistory from "./pages/MatchHistory";
import MatchDetails from "./pages/MatchDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/live-match" element={<LiveMatch />} />
      <Route path="/match-setup" element={<MatchSetup />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/history" element={<MatchHistory />} />
      <Route path="/history/:id" element={<MatchDetails />} />
    </Routes>
  );
}

export default App;