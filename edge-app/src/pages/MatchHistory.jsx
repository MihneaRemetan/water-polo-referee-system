import { useEffect, useState } from "react";
import "../styles/MatchHistory.css";

function MatchHistory() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:8080/api/matches/history");

        if (!response.ok) {
          throw new Error("Failed to fetch match history");
        }

        const data = await response.json();
        setMatches(data);
      } catch (err) {
        console.error("Error loading match history:", err);
        setError("Could not load match history.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "-";

    const date = new Date(dateTime);
    if (Number.isNaN(date.getTime())) return dateTime;

    return date.toLocaleString("ro-RO");
  };

  const formatSeconds = (totalSeconds) => {
    if (totalSeconds === null || totalSeconds === undefined) return "-";

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="match-history-page">
      <div className="match-history-header">
        <h1>Match History</h1>
        <p>All saved matches</p>
      </div>

      {loading && (
        <div className="match-history-message">
          Loading matches...
        </div>
      )}

      {!loading && error && (
        <div className="match-history-message error">
          {error}
        </div>
      )}

      {!loading && !error && matches.length === 0 && (
        <div className="match-history-message">
          No saved matches found.
        </div>
      )}

      {!loading && !error && matches.length > 0 && (
        <div className="match-history-table-wrapper">
          <table className="match-history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>Score</th>
                <th>Status</th>
                <th>Period</th>
                <th>Match Time</th>
                <th>Shot Clock</th>
                <th>Started At</th>
                <th>Ended At</th>
                <th>Official ID</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match) => (
                <tr key={match.id}>
                  <td>{match.id}</td>
                  <td>{match.teamAName}</td>
                  <td>{match.teamBName}</td>
                  <td>
                    {(match.scoreA ?? 0)} - {(match.scoreB ?? 0)}
                  </td>
                  <td>{match.status || "-"}</td>
                  <td>{match.period ?? "-"}</td>
                  <td>{formatSeconds(match.matchSeconds)}</td>
                  <td>{formatSeconds(match.shotClockSeconds)}</td>
                  <td>{formatDateTime(match.startedAt)}</td>
                  <td>{formatDateTime(match.endedAt)}</td>
                  <td>{match.createdByOfficialId ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MatchHistory;