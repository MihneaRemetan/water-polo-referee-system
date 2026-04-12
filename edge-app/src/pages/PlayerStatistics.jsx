import { useEffect, useMemo, useState } from "react";
import AppLayout from "../layout/AppLayout";
import "../styles/PlayerStatistics.css";

function PlayerStatistics() {
  const [players, setPlayers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [searchPlayerNumber, setSearchPlayerNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStatistics = async (name = "", team = "", playerNumber = "") => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (name.trim()) {
        params.append("name", name.trim());
      }

      if (team.trim()) {
        params.append("team", team.trim());
      }

      if (playerNumber.toString().trim()) {
        params.append("playerNumber", playerNumber.toString().trim());
      }

      const url = `http://localhost:8080/statistics/players${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Could not load player statistics.");
      }

      const data = await response.json();
      setPlayers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError("Could not load statistics.");
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStatistics(searchName, searchTeam, searchPlayerNumber);
  };

  const handleResetFilters = () => {
    setSearchName("");
    setSearchTeam("");
    setSearchPlayerNumber("");
    fetchStatistics();
  };

  const topScorers = useMemo(() => {
    return [...players]
      .sort((a, b) => b.totalGoals - a.totalGoals)
      .slice(0, 5);
  }, [players]);

  return (
    <AppLayout>
      <div className="statistics-page">
        <div className="statistics-hero panel live-card">
          <div className="live-card-header">
            <div>
              <h1 className="live-card-title">Player Statistics</h1>
              <p className="live-card-subtitle">
                View cumulative player performance across all saved matches.
              </p>
            </div>
            <span className="info-chip">
              {players.length} player{players.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        <div className="statistics-grid">
          <div className="panel live-card">
            <div className="live-card-header">
              <div>
                <h2 className="live-card-title">Search Filters</h2>
                <p className="live-card-subtitle">
                  Search players by name, team, or number.
                </p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="statistics-filter-form">
              <div className="statistics-filter-row">
                <div className="statistics-field">
                  <label htmlFor="searchName">Player Name</label>
                  <input
                    id="searchName"
                    type="text"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    placeholder="e.g. Popescu"
                    className="app-input"
                  />
                </div>

                <div className="statistics-field">
                  <label htmlFor="searchTeam">Team</label>
                  <input
                    id="searchTeam"
                    type="text"
                    value={searchTeam}
                    onChange={(e) => setSearchTeam(e.target.value)}
                    placeholder="e.g. Dinamo"
                    className="app-input"
                  />
                </div>
              </div>

              <div className="statistics-filter-row">
                <div className="statistics-field">
                  <label htmlFor="searchPlayerNumber">Player Number</label>
                  <input
                    id="searchPlayerNumber"
                    type="number"
                    min="1"
                    max="15"
                    value={searchPlayerNumber}
                    onChange={(e) => setSearchPlayerNumber(e.target.value)}
                    placeholder="e.g. 7"
                    className="app-input"
                  />
                </div>
              </div>

              <div className="statistics-actions">
                <button type="submit" className="app-button primary">
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="app-button secondary"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="panel live-card">
            <div className="live-card-header">
              <div>
                <h2 className="live-card-title">Top Scorers</h2>
                <p className="live-card-subtitle">
                  Best goalscorers from saved matches.
                </p>
              </div>
            </div>

            {topScorers.length === 0 ? (
              <div className="statistics-empty">No statistics available yet.</div>
            ) : (
              <div className="top-scorers-list">
                {topScorers.map((player, index) => (
                  <div
                    className="top-scorer-card"
                    key={`${player.playerName}-${player.team}-${player.playerNumber}-${index}`}
                  >
                    <div className="top-scorer-rank">#{index + 1}</div>
                    <div className="top-scorer-content">
                      <div className="top-scorer-name">
                        {player.playerName || "Unknown Player"}
                      </div>
                      <div className="top-scorer-meta">
                        Team: {player.team || "-"} · No: {player.playerNumber ?? "-"}
                      </div>
                    </div>
                    <div className="top-scorer-goals">{player.totalGoals} G</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="panel live-card" style={{ marginTop: "20px" }}>
          <div className="live-card-header">
            <div>
              <h2 className="live-card-title">All Player Statistics</h2>
              <p className="live-card-subtitle">
                Complete overview of all aggregated player statistics.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="statistics-empty">Loading statistics...</div>
          ) : error ? (
            <div className="statistics-error">{error}</div>
          ) : players.length === 0 ? (
            <div className="statistics-empty">No player statistics found.</div>
          ) : (
            <div className="statistics-table-wrapper">
              <table className="statistics-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>No.</th>
                    <th>Matches</th>
                    <th>Goals</th>
                    <th>Fouls</th>
                    <th>Yellow</th>
                    <th>Red</th>
                    <th>Exclusions</th>
                    <th>Goals / Match</th>
                    <th>Fouls / Match</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player, index) => (
                    <tr
                      key={`${player.playerName}-${player.team}-${player.playerNumber}-${index}`}
                    >
                      <td>{player.playerName || "-"}</td>
                      <td>{player.team || "-"}</td>
                      <td>{player.playerNumber ?? "-"}</td>
                      <td>{player.matchesPlayed ?? 0}</td>
                      <td>{player.totalGoals ?? 0}</td>
                      <td>{player.totalFouls ?? 0}</td>
                      <td>{player.totalYellowCards ?? 0}</td>
                      <td>{player.totalRedCards ?? 0}</td>
                      <td>{player.totalExclusions ?? 0}</td>
                      <td>{Number(player.goalsPerMatch ?? 0).toFixed(2)}</td>
                      <td>{Number(player.foulsPerMatch ?? 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default PlayerStatistics;