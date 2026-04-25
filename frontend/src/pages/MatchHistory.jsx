import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import "../styles/MatchHistory.css";

function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:8080/api/matches", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setMatches(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading match history:", err);
        setError("Could not load match history.");
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, []);

  const formatDateTime = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  return (
    <AppLayout>
      <div className="match-history-container">
        <div className="panel">
          <h1 className="match-history-title">Match History</h1>
          <p className="match-history-subtitle">All saved matches</p>

          {loading && (
            <p className="match-history-loading">Loading match history...</p>
          )}

          {!loading && error && (
            <div className="match-error">
              {error}
            </div>
          )}

          {!loading && !error && matches.length === 0 && (
            <div className="match-empty">
              No saved matches yet.
            </div>
          )}

          {!loading && !error && matches.length > 0 && (
            <div className="match-history-list">
              {matches.map((match) => (
                <Link
                  key={match.id}
                  to={`/history/${match.id}`}
                  className="match-history-link"
                >
                  <div className="match-card">
                    <h2 className="match-card-title">
                      {match.teamAName} vs {match.teamBName}
                    </h2>

                    <p className="match-card-text">
                      <strong>Score:</strong> {match.scoreA} - {match.scoreB}
                    </p>

                    <p className="match-card-text">
                      <strong>Period:</strong> {match.period ?? "N/A"}
                    </p>

                    <p className="match-card-text">
                      <strong>Status:</strong> {match.status || "N/A"}
                    </p>

                    <p className="match-card-text">
                      <strong>Started:</strong> {formatDateTime(match.startedAt)}
                    </p>

                    <p className="match-card-text">
                      <strong>Ended:</strong> {formatDateTime(match.endedAt)}
                    </p>

                    <p className="match-card-text">
                      <strong>Referee 1:</strong> {match.referee1 || "N/A"}
                    </p>

                    <p className="match-card-text">
                      <strong>Referee 2:</strong> {match.referee2 || "N/A"}
                    </p>

                    <p className="match-card-text">
                      <strong>Observer:</strong> {match.observer || "N/A"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default MatchHistory;