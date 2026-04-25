import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../layout/Topbar";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "User";
  const userId = localStorage.getItem("userId") || "OFFICIAL-000";
  const userRole = localStorage.getItem("userRole") || "Referee";

  const [teamsCount, setTeamsCount] = useState(0);
  const [officialsCount, setOfficialsCount] = useState(0);
  const [matchesCount, setMatchesCount] = useState(0);
  const [playersCount, setPlayersCount] = useState(0);
  const [recentMatches, setRecentMatches] = useState([]);

  const quickActions = [
    {
      title: "Start New Match",
      description: "Configure teams, officials, players, and match details.",
      buttonText: "Go to Match Setup",
      path: "/match-setup",
    },
    {
      title: "Live Match",
      description: "Track goals, fouls, cards, and match events in real time.",
      buttonText: "Open Live Match",
      path: "/live-match",
    },
    {
      title: "Statistics",
      description: "Review player performance and match-related statistics.",
      buttonText: "View Statistics",
      path: "/statistics",
    },
    {
      title: "Match History",
      description: "See finished matches and review detailed match reports.",
      buttonText: "Open History",
      path: "/history",
    },
  ];

  useEffect(() => {
    const fetchJson = async (url) => {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }

      return response.json();
    };

    const loadHomeData = async () => {
      try {
        const teamsPromise = fetchJson("http://localhost:8080/api/teams")
          .then((data) => setTeamsCount(Array.isArray(data) ? data.length : 0))
          .catch((err) => {
            console.error("Failed to fetch teams:", err);
            setTeamsCount(0);
          });

        const matchesPromise = fetchJson("http://localhost:8080/api/matches")
          .then((data) => {
            const safeMatches = Array.isArray(data) ? data : [];
            setMatchesCount(safeMatches.length);
            setRecentMatches(safeMatches.slice(0, 3));
          })
          .catch((err) => {
            console.error("Failed to fetch matches:", err);
            setMatchesCount(0);
            setRecentMatches([]);
          });

        const officialsPromise = Promise.all([
          fetchJson("http://localhost:8080/api/admin/referees"),
          fetchJson("http://localhost:8080/api/admin/observers"),
        ])
          .then(([referees, observers]) => {
            const refereesCount = Array.isArray(referees) ? referees.length : 0;
            const observersCount = Array.isArray(observers) ? observers.length : 0;
            setOfficialsCount(refereesCount + observersCount);
          })
          .catch((err) => {
            console.error("Failed to fetch officials:", err);
            setOfficialsCount(0);
          });

        const playersPromise = fetchJson("http://localhost:8080/statistics/players")
          .then((data) => setPlayersCount(Array.isArray(data) ? data.length : 0))
          .catch((err) => {
            console.error("Failed to fetch players:", err);
            setPlayersCount(0);
          });

        await Promise.all([
          teamsPromise,
          matchesPromise,
          officialsPromise,
          playersPromise,
        ]);
      } catch (err) {
        console.error("Error loading home page data:", err);
      }
    };

    loadHomeData();
  }, []);

  const formatMatchDate = (dateValue) => {
    if (!dateValue) return "No date available";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "No date available";

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="home-page">
      <Topbar />

      <main className="home-container">
        <section className="home-hero panel">
          <div className="home-hero-text">
            <p className="home-kicker">Federatia Romana de Polo</p>
            <h1>Welcome back, {userName}</h1>
            <p className="home-subtitle">
              Manage matches, monitor live events, access statistics, and keep
              federation activity organized from one place.
            </p>

            <div className="home-badges">
              <span className="home-badge">{userRole}</span>
              <span className="home-badge">ID: {userId}</span>
            </div>
          </div>

          <div className="home-hero-side">
            <div className="status-card">
              <p className="status-label">Current Status</p>
              <h3>No active match</h3>
              <p>
                Start a new match setup or continue working from the available
                modules below.
              </p>
              <button
                className="primary-btn"
                onClick={() => navigate("/match-setup")}
              >
                Start Match Setup
              </button>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
            <p>Jump directly to the most important areas of the platform.</p>
          </div>

          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div className="quick-card panel" key={action.title}>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
                <button
                  className="secondary-btn"
                  onClick={() => navigate(action.path)}
                >
                  {action.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="home-info-grid">
            <div className="panel info-card">
              <div className="section-header small">
                <h2>System Overview</h2>
                <p>Quick federation and platform summary.</p>
              </div>

              <div className="stats-grid">
                <div className="mini-stat">
                  <span className="mini-stat-value">{teamsCount}</span>
                  <span className="mini-stat-label">Teams</span>
                </div>

                <div className="mini-stat">
                  <span className="mini-stat-value">{officialsCount}</span>
                  <span className="mini-stat-label">Officials</span>
                </div>

                <div className="mini-stat">
                  <span className="mini-stat-value">{matchesCount}</span>
                  <span className="mini-stat-label">Matches</span>
                </div>

                <div className="mini-stat">
                  <span className="mini-stat-value">{playersCount}</span>
                  <span className="mini-stat-label">Players</span>
                </div>
              </div>
            </div>

            <div className="panel info-card">
              <div className="section-header small">
                <h2>Your Access</h2>
                <p>Current role and available area of responsibility.</p>
              </div>

              <div className="access-box">
                <span className="access-role">{userRole}</span>
                <p>
                  {userRole.toLowerCase() === "admin"
                    ? "You can manage administration data, oversee platform access, and review all operational sections."
                    : "You can access match setup, live match tools, statistics, and match history based on your account permissions."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="section-header">
            <h2>Recent Matches</h2>
            <p>Latest recorded match results.</p>
          </div>

          <div className="panel recent-matches-card">
            <div className="recent-matches-list">
              {recentMatches.length > 0 ? (
                recentMatches.map((match) => (
                  <div className="recent-match-row" key={match.id}>
                    <div>
                      <h3>
                        {match.teamAName} vs {match.teamBName}
                      </h3>
                      <p>{formatMatchDate(match.endedAt || match.startedAt)}</p>
                    </div>

                    <div className="recent-match-score">
                      {match.scoreA} - {match.scoreB}
                    </div>
                  </div>
                ))
              ) : (
                <div className="recent-match-row">
                  <div>
                    <h3>No matches available</h3>
                    <p>Finished matches will appear here once they are saved.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="recent-actions">
              <button
                className="secondary-btn"
                onClick={() => navigate("/history")}
              >
                View Full Match History
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;