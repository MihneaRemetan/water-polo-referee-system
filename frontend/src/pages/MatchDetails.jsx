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

  const formatDateTime = (value) => {
    if (!value) return "-";

    try {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return value;
      return date.toLocaleString();
    } catch {
      return value;
    }
  };

  const getTeamAName = (data) =>
    data.teamAName || data.teamA?.name || data.teamA || "Team A";

  const getTeamBName = (data) =>
    data.teamBName || data.teamB?.name || data.teamB || "Team B";

  const getScoreA = (data) =>
    data.scoreA ?? data.teamAScore ?? data.homeScore ?? 0;

  const getScoreB = (data) =>
    data.scoreB ?? data.teamBScore ?? data.awayScore ?? 0;

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

            <div className="match-officials">
              <h3>Officials</h3>

              <p>Referee C1: {match.refereeC1 || "N/A"}</p>
              <p>Referee C2: {match.refereeC2 || "N/A"}</p>
              <p>Secretary 1: {match.secretary1 || "N/A"}</p>
              <p>Secretary 2: {match.secretary2 || "N/A"}</p>
              <p>Timekeeper: {match.timekeeper || "N/A"}</p>
              <p>Referee P1: {match.refereeP1 || "N/A"}</p>
              <p>Referee P2: {match.refereeP2 || "N/A"}</p>
              <p>Observer: {match.observer || "N/A"}</p>
            </div>

            <div className="match-info-grid">
              <div className="info-item">
                <span className="label">Match ID</span>
                <span className="value">{match.id}</span>
              </div>

              <div className="info-item">
                <span className="label">Championship</span>
                <span className="value">{match.championship || "-"}</span>
              </div>

              <div className="info-item">
                <span className="label">Match Date</span>
                <span className="value">{match.matchDate || "-"}</span>
              </div>

              <div className="info-item">
                <span className="label">Match Number</span>
                <span className="value">{match.matchNumber || "-"}</span>
              </div>

              <div className="info-item">
                <span className="label">Location</span>
                <span className="value">{match.location || "-"}</span>
              </div>

              <div className="info-item">
                <span className="label">Started At</span>
                <span className="value">{formatDateTime(match.startedAt)}</span>
              </div>

              <div className="info-item">
                <span className="label">Ended At</span>
                <span className="value">{formatDateTime(match.endedAt)}</span>
              </div>

              <div className="info-item">
                <span className="label">Status</span>
                <span className="value">{match.status || "-"}</span>
              </div>

              <div className="info-item">
                <span className="label">Period</span>
                <span className="value">{match.period ?? "-"}</span>
              </div>

              <div className="info-item">
                <span className="label">Match Seconds</span>
                <span className="value">{match.matchSeconds ?? "-"}</span>
              </div>

              <div className="info-item">
                <span className="label">Shot Clock Seconds</span>
                <span className="value">{match.shotClockSeconds ?? "-"}</span>
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
                    <li key={event.id ?? index} className="event-item">
                      <strong>{event.team || "N/A"}</strong>
                      {" | "}#{event.playerNumber ?? "-"} {event.playerName || "Unknown"}

                      <span className="event-type">
                        {" "}→ {event.eventType || "MATCH_EVENT"}
                      </span>

                      <span className="event-time">
                        {" "} | P{event.period ?? "-"} | {event.eventTimeSeconds ?? 0}s
                      </span>

                      {event.details && (
                        <div className="event-details">
                          {event.details}
                        </div>
                      )}
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