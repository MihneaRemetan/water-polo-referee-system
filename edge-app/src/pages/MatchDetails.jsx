import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import "../styles/MatchDetails.css";

function MatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:8080/api/matches/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to load match details.");
        }

        const data = await response.json();
        setMatch(data);
      } catch (err) {
        console.error("Error loading match details:", err);
        setError("Could not load match details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  const formatDate = (value) => {
    if (!value) return "-";

    try {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleString();
    } catch {
      return value;
    }
  };

  const getTeamAName = (match) =>
    match.teamAName || match.teamA || match.homeTeam || "Team A";

  const getTeamBName = (match) =>
    match.teamBName || match.teamB || match.awayTeam || "Team B";

  const getScoreA = (match) =>
    match.scoreA ?? match.teamAScore ?? match.homeScore ?? 0;

  const getScoreB = (match) =>
    match.scoreB ?? match.teamBScore ?? match.awayScore ?? 0;

  const getDateValue = (match) =>
    match.date || match.matchDate || match.createdAt || match.playedAt || "";

  return (
    <AppLayout>
      <div className="match-details-page">
        <div className="match-details-topbar">
          <button className="back-btn" onClick={() => navigate("/history")}>
            Back
          </button>
        </div>

        {loading && <p>Loading match details...</p>}
        {!loading && error && <p>{error}</p>}

        {!loading && !error && match && (
          <div className="match-details-card">
            <h1>Match Details</h1>

            <div className="match-score-box">
              <div className="team-block">
                <h2>{getTeamAName(match)}</h2>
              </div>

              <div className="score-block">
                <span>
                  {getScoreA(match)} - {getScoreB(match)}
                </span>
              </div>

              <div className="team-block">
                <h2>{getTeamBName(match)}</h2>
              </div>
            </div>

            <div className="match-info-grid">
              <div className="info-item">
                <span className="label">Match ID</span>
                <span className="value">{match.id}</span>
              </div>

              <div className="info-item">
                <span className="label">Date</span>
                <span className="value">{formatDate(getDateValue(match))}</span>
              </div>

              <div className="info-item">
                <span className="label">Team A</span>
                <span className="value">{getTeamAName(match)}</span>
              </div>

              <div className="info-item">
                <span className="label">Team B</span>
                <span className="value">{getTeamBName(match)}</span>
              </div>
            </div>

            {match.events && Array.isArray(match.events) && match.events.length > 0 && (
              <div className="match-events-section">
                <h3>Events</h3>
                <ul className="match-events-list">
                  {match.events.map((event, index) => (
                    <li key={index}>
                      {typeof event === "string"
                        ? event
                        : JSON.stringify(event)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default MatchDetails;