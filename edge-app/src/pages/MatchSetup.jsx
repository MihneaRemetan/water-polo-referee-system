import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

function MatchSetup() {
  const navigate = useNavigate();

  const createPlayers = () =>
    Array.from({ length: 15 }, (_, index) => ({
      number: index + 1,
      playerId: null,
      name: "",
    }));

  const [teams, setTeams] = useState([]);
  const [playersFromDb, setPlayersFromDb] = useState([]);

  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");

  const [teamAId, setTeamAId] = useState(null);
  const [teamBId, setTeamBId] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null);

  const teamARef = useRef(null);
  const teamBRef = useRef(null);

  const [playersA, setPlayersA] = useState(createPlayers());
  const [playersB, setPlayersB] = useState(createPlayers());

  const [coachesA, setCoachesA] = useState({
    hc: "",
    assistants: [""],
  });

  const [coachesB, setCoachesB] = useState({
    hc: "",
    assistants: [""],
  });

  const [matchDetails, setMatchDetails] = useState({
    championship: "",
    date: "",
    matchNumber: "",
    location: "",
  });

  const [officials, setOfficials] = useState({
    refereeC1: "",
    refereeC2: "",
    secretary1: "",
    secretary2: "",
    timekeeper: "",
    refereeP1: "",
    refereeP2: "",
    observer: "",
  });

  const getPlayerTeamId = (player) => {
    if (player?.teamId != null) return Number(player.teamId);
    if (player?.team?.id != null) return Number(player.team.id);
    return null;
  };

  const getPlayerName = (player) => {
    return player?.name ?? player?.fullName ?? "";
  };

  const getPlayerNumber = (player) => {
    return player?.number ?? player?.playerNumber ?? null;
  };

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/teams", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Could not load teams:", text);
          return;
        }

        const data = await res.json();
        setTeams(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FETCH TEAMS ERROR:", err);
      }
    };

    loadTeams();
  }, []);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/players", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Could not load players:", text);
          return;
        }

        const data = await res.json();
        setPlayersFromDb(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FETCH PLAYERS ERROR:", err);
      }
    };

    loadPlayers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideTeamA =
        teamARef.current && !teamARef.current.contains(event.target);
      const clickedOutsideTeamB =
        teamBRef.current && !teamBRef.current.contains(event.target);

      if (clickedOutsideTeamA && clickedOutsideTeamB) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTeamsA = useMemo(() => {
    if (!teams.length) return [];

    const query = teamAName.trim().toLowerCase();
    if (!query) return teams;

    return teams.filter((team) => {
      return (
        (team.name || "").toLowerCase().includes(query) ||
        (team.shortName || "").toLowerCase().includes(query) ||
        (team.city || "").toLowerCase().includes(query)
      );
    });
  }, [teams, teamAName]);

  const filteredTeamsB = useMemo(() => {
    if (!teams.length) return [];

    const query = teamBName.trim().toLowerCase();
    if (!query) return teams;

    return teams.filter((team) => {
      return (
        (team.name || "").toLowerCase().includes(query) ||
        (team.shortName || "").toLowerCase().includes(query) ||
        (team.city || "").toLowerCase().includes(query)
      );
    });
  }, [teams, teamBName]);

  const teamAPlayers = useMemo(() => {
    return playersFromDb.filter(
      (player) => getPlayerTeamId(player) === Number(teamAId)
    );
  }, [playersFromDb, teamAId]);

  const teamBPlayers = useMemo(() => {
    return playersFromDb.filter(
      (player) => getPlayerTeamId(player) === Number(teamBId)
    );
  }, [playersFromDb, teamBId]);

  const buildPlayersFromTeam = (teamId) => {
    const teamPlayers = playersFromDb.filter(
      (player) => getPlayerTeamId(player) === Number(teamId)
    );

    return Array.from({ length: 15 }, (_, index) => {
      const rosterNumber = index + 1;
      const matchedPlayer = teamPlayers.find(
        (player) => Number(getPlayerNumber(player)) === rosterNumber
      );

      return {
        number: rosterNumber,
        playerId: matchedPlayer?.id ?? null,
        name: getPlayerName(matchedPlayer) || "",
      };
    });
  };

  const getOptionsForRow = (teamPlayers, rosterNumber) => {
    const sameNumberPlayers = teamPlayers.filter(
      (player) => Number(getPlayerNumber(player)) === Number(rosterNumber)
    );

    return sameNumberPlayers.length > 0 ? sameNumberPlayers : teamPlayers;
  };

  const handleSelectTeamA = (team) => {
    setTeamAId(team.id);
    setTeamAName(team.name);
    setPlayersA(buildPlayersFromTeam(team.id));
    setOpenDropdown(null);
  };

  const handleSelectTeamB = (team) => {
    setTeamBId(team.id);
    setTeamBName(team.name);
    setPlayersB(buildPlayersFromTeam(team.id));
    setOpenDropdown(null);
  };

  const handleTeamAChange = (value) => {
    setTeamAName(value);

    const exactMatch = teams.find(
      (team) => team.name?.trim().toLowerCase() === value.trim().toLowerCase()
    );

    if (exactMatch) {
      setTeamAId(exactMatch.id);
      setPlayersA(buildPlayersFromTeam(exactMatch.id));
    } else {
      setTeamAId(null);
      setPlayersA(createPlayers());
    }
  };

  const handleTeamBChange = (value) => {
    setTeamBName(value);

    const exactMatch = teams.find(
      (team) => team.name?.trim().toLowerCase() === value.trim().toLowerCase()
    );

    if (exactMatch) {
      setTeamBId(exactMatch.id);
      setPlayersB(buildPlayersFromTeam(exactMatch.id));
    } else {
      setTeamBId(null);
      setPlayersB(createPlayers());
    }
  };

  const handlePlayerSelect = (team, rosterNumber, selectedPlayerId) => {
    const selectedId = selectedPlayerId ? Number(selectedPlayerId) : null;
    const selectedPlayer = playersFromDb.find(
      (player) => Number(player.id) === selectedId
    );

    const updatedValue = {
      number: rosterNumber,
      playerId: selectedPlayer?.id ?? null,
      name: getPlayerName(selectedPlayer) || "",
    };

    if (team === "A") {
      setPlayersA((prev) =>
        prev.map((player) =>
          player.number === rosterNumber ? updatedValue : player
        )
      );
    } else {
      setPlayersB((prev) =>
        prev.map((player) =>
          player.number === rosterNumber ? updatedValue : player
        )
      );
    }

    setOpenDropdown(null);
  };

  const handleCoachChange = (team, role, value) => {
    if (team === "A") {
      setCoachesA((prev) => ({
        ...prev,
        [role]: value,
      }));
    } else {
      setCoachesB((prev) => ({
        ...prev,
        [role]: value,
      }));
    }
  };

  const handleAssistantCoachChange = (team, index, value) => {
    if (team === "A") {
      setCoachesA((prev) => ({
        ...prev,
        assistants: prev.assistants.map((coach, i) =>
          i === index ? value : coach
        ),
      }));
    } else {
      setCoachesB((prev) => ({
        ...prev,
        assistants: prev.assistants.map((coach, i) =>
          i === index ? value : coach
        ),
      }));
    }
  };

  const handleAddAssistantCoach = (team) => {
    if (team === "A") {
      setCoachesA((prev) => ({
        ...prev,
        assistants: [...prev.assistants, ""],
      }));
    } else {
      setCoachesB((prev) => ({
        ...prev,
        assistants: [...prev.assistants, ""],
      }));
    }
  };

  const handleRemoveAssistantCoach = (team, index) => {
    if (team === "A") {
      setCoachesA((prev) => ({
        ...prev,
        assistants: prev.assistants.filter((_, i) => i !== index),
      }));
    } else {
      setCoachesB((prev) => ({
        ...prev,
        assistants: prev.assistants.filter((_, i) => i !== index),
      }));
    }
  };

  const handleMatchDetailsChange = (field, value) => {
    setMatchDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOfficialChange = (field, value) => {
    setOfficials((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!teamAId) {
      alert("Select Team A from the database.");
      return;
    }

    if (!teamBId) {
      alert("Select Team B from the database.");
      return;
    }

    if (teamAId === teamBId) {
      alert("Team A and Team B must be different.");
      return;
    }

    const selectedTeamA = teams.find(
      (team) => Number(team.id) === Number(teamAId)
    );
    const selectedTeamB = teams.find(
      (team) => Number(team.id) === Number(teamBId)
    );

    const formData = {
      teamAId,
      teamBId,
      teamA: {
        id: teamAId,
        name: selectedTeamA?.name || "Team A",
        players: playersA,
        coaches: coachesA,
      },
      teamB: {
        id: teamBId,
        name: selectedTeamB?.name || "Team B",
        players: playersB,
        coaches: coachesB,
      },
      matchDetails,
      officials,
    };

    localStorage.setItem("matchData", JSON.stringify(formData));
    navigate("/live-match", { state: formData });
  };

  const dropdownStyle = {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    right: 0,
    background: "rgba(18, 30, 58, 0.98)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "18px",
    boxShadow: "0 14px 30px rgba(0,0,0,0.35)",
    zIndex: 50,
    maxHeight: "260px",
    overflowY: "auto",
    backdropFilter: "blur(10px)",
  };

  const optionStyle = {
    padding: "14px 16px",
    cursor: "pointer",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  };

  const optionTitleStyle = {
    color: "#ffffff",
    fontWeight: 700,
    fontSize: "15px",
    marginBottom: "4px",
  };

  const optionMetaStyle = {
    color: "rgba(255,255,255,0.68)",
    fontSize: "13px",
  };

  const renderPlayerDropdown = (team, player, teamPlayers) => {
    const key = `${team}-player-${player.number}`;
    const isOpen = openDropdown === key;
    const options = getOptionsForRow(teamPlayers, player.number);
    const selectedPlayer = options.find(
      (option) => Number(option.id) === Number(player.playerId)
    );

    return (
      <div key={player.number} className="player-row">
        <div className="player-no">{player.number}</div>

        <div style={{ position: "relative" }}>
          <div
            className="app-input"
            onClick={() => setOpenDropdown(isOpen ? null : key)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              userSelect: "none",
            }}
          >
            <span
              style={{
                color: selectedPlayer ? "#f4f7fb" : "#7f91ab",
                fontWeight: selectedPlayer ? 600 : 500,
              }}
            >
              {selectedPlayer
                ? `${getPlayerName(selectedPlayer)}${
                    getPlayerNumber(selectedPlayer) != null
                      ? ` (#${getPlayerNumber(selectedPlayer)})`
                      : ""
                  }`
                : "Select player"}
            </span>

            <span
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "14px",
                transition: "transform 0.2s ease",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▼
            </span>
          </div>

          {isOpen && (
            <div style={dropdownStyle}>
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option.id}
                    style={optionStyle}
                    onMouseDown={() =>
                      handlePlayerSelect(team, player.number, option.id)
                    }
                  >
                    <div style={optionTitleStyle}>{getPlayerName(option)}</div>
                    <div style={optionMetaStyle}>
                      {getPlayerNumber(option) != null
                        ? `#${getPlayerNumber(option)}`
                        : "No number"}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "14px 16px",
                    color: "rgba(255,255,255,0.68)",
                  }}
                >
                  No players found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <form onSubmit={handleSubmit}>
        <div
          className="panel"
          style={{ padding: "22px", marginBottom: "20px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 className="section-title">Match Setup</h1>
              <p className="section-subtitle" style={{ marginBottom: 0 }}>
                Configure teams, players, officials, and match details before
                the game starts.
              </p>
            </div>

            <button
              type="button"
              className="app-button secondary"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="setup-layout">
          <div className="panel setup-card">
            <div className="team-header">
              <div>
                <h2
                  className="section-title"
                  style={{ fontSize: "22px", marginBottom: 6 }}
                >
                  Team A Roster
                </h2>
                <p className="section-subtitle">
                  Select the team and choose players from the database.
                </p>
              </div>
              <div className="team-badge a">A</div>
            </div>

            <div
              ref={teamARef}
              style={{ position: "relative", marginBottom: "16px" }}
            >
              <input
                type="text"
                value={teamAName}
                onChange={(e) => handleTeamAChange(e.target.value)}
                onFocus={() => setOpenDropdown("A")}
                placeholder="Search and select Team A"
                className="app-input"
                autoComplete="off"
              />

              {openDropdown === "A" && (
                <div style={dropdownStyle}>
                  {filteredTeamsA.length > 0 ? (
                    filteredTeamsA.map((team) => (
                      <div
                        key={team.id}
                        style={optionStyle}
                        onMouseDown={() => handleSelectTeamA(team)}
                      >
                        <div style={optionTitleStyle}>{team.name}</div>
                        <div style={optionMetaStyle}>
                          {team.shortName || "—"} • {team.city || "Unknown city"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "14px 16px",
                        color: "rgba(255,255,255,0.68)",
                      }}
                    >
                      No teams found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {playersA.map((player) =>
              renderPlayerDropdown("A", player, teamAPlayers)
            )}

            <div style={{ marginTop: "20px" }}>
              <h3 className="live-card-title" style={{ marginBottom: "12px" }}>
                Coaches
              </h3>

              <div className="player-row">
                <div className="player-no">HC</div>
                <input
                  type="text"
                  value={coachesA.hc}
                  onChange={(e) =>
                    handleCoachChange("A", "hc", e.target.value)
                  }
                  placeholder="Head Coach"
                  className="app-input"
                />
              </div>

              {coachesA.assistants.map((assistant, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr auto",
                    gap: "10px",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <div className="player-no">AC{index + 1}</div>

                  <input
                    type="text"
                    value={assistant}
                    onChange={(e) =>
                      handleAssistantCoachChange("A", index, e.target.value)
                    }
                    placeholder={`Assistant Coach ${index + 1}`}
                    className="app-input"
                  />

                  <button
                    type="button"
                    className="app-button danger"
                    onClick={() => handleRemoveAssistantCoach("A", index)}
                    style={{ padding: "12px 14px" }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="app-button secondary"
                onClick={() => handleAddAssistantCoach("A")}
                style={{ width: "100%", marginTop: "8px" }}
              >
                + Add Assistant Coach
              </button>
            </div>
          </div>

          <div className="panel setup-card">
            <div className="team-header">
              <div>
                <h2
                  className="section-title"
                  style={{ fontSize: "22px", marginBottom: 6 }}
                >
                  Team B Roster
                </h2>
                <p className="section-subtitle">
                  Select the team and choose players from the database.
                </p>
              </div>
              <div className="team-badge b">B</div>
            </div>

            <div
              ref={teamBRef}
              style={{ position: "relative", marginBottom: "16px" }}
            >
              <input
                type="text"
                value={teamBName}
                onChange={(e) => handleTeamBChange(e.target.value)}
                onFocus={() => setOpenDropdown("B")}
                placeholder="Search and select Team B"
                className="app-input"
                autoComplete="off"
              />

              {openDropdown === "B" && (
                <div style={dropdownStyle}>
                  {filteredTeamsB.length > 0 ? (
                    filteredTeamsB.map((team) => (
                      <div
                        key={team.id}
                        style={optionStyle}
                        onMouseDown={() => handleSelectTeamB(team)}
                      >
                        <div style={optionTitleStyle}>{team.name}</div>
                        <div style={optionMetaStyle}>
                          {team.shortName || "—"} • {team.city || "Unknown city"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        padding: "14px 16px",
                        color: "rgba(255,255,255,0.68)",
                      }}
                    >
                      No teams found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {playersB.map((player) =>
              renderPlayerDropdown("B", player, teamBPlayers)
            )}

            <div style={{ marginTop: "20px" }}>
              <h3 className="live-card-title" style={{ marginBottom: "12px" }}>
                Coaches
              </h3>

              <div className="player-row">
                <div className="player-no">HC</div>
                <input
                  type="text"
                  value={coachesB.hc}
                  onChange={(e) =>
                    handleCoachChange("B", "hc", e.target.value)
                  }
                  placeholder="Head Coach"
                  className="app-input"
                />
              </div>

              {coachesB.assistants.map((assistant, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 1fr auto",
                    gap: "10px",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                >
                  <div className="player-no">AC{index + 1}</div>

                  <input
                    type="text"
                    value={assistant}
                    onChange={(e) =>
                      handleAssistantCoachChange("B", index, e.target.value)
                    }
                    placeholder={`Assistant Coach ${index + 1}`}
                    className="app-input"
                  />

                  <button
                    type="button"
                    className="app-button danger"
                    onClick={() => handleRemoveAssistantCoach("B", index)}
                    style={{ padding: "12px 14px" }}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="app-button secondary"
                onClick={() => handleAddAssistantCoach("B")}
                style={{ width: "100%", marginTop: "8px" }}
              >
                + Add Assistant Coach
              </button>
            </div>
          </div>

          <div className="live-column">
            <div className="panel setup-card">
              <h2 className="section-title" style={{ fontSize: "22px" }}>
                Match Details
              </h2>
              <p className="section-subtitle">
                Information passed to the live match page.
              </p>

              <div className="stack-actions">
                <input
                  type="text"
                  value={matchDetails.championship}
                  onChange={(e) =>
                    handleMatchDetailsChange("championship", e.target.value)
                  }
                  placeholder="Championship"
                  className="app-input"
                />

                <input
                  type="date"
                  value={matchDetails.date}
                  onChange={(e) =>
                    handleMatchDetailsChange("date", e.target.value)
                  }
                  className="app-input"
                />

                <input
                  type="text"
                  value={matchDetails.matchNumber}
                  onChange={(e) =>
                    handleMatchDetailsChange("matchNumber", e.target.value)
                  }
                  placeholder="Match number"
                  className="app-input"
                />

                <input
                  type="text"
                  value={matchDetails.location}
                  onChange={(e) =>
                    handleMatchDetailsChange("location", e.target.value)
                  }
                  placeholder="Location"
                  className="app-input"
                />
              </div>
            </div>

            <div className="panel setup-card">
              <h2 className="section-title" style={{ fontSize: "22px" }}>
                Game Officials
              </h2>
              <p className="section-subtitle">
                Enter referees and table officials.
              </p>

              <div className="stack-actions">
                <input
                  type="text"
                  value={officials.refereeC1}
                  onChange={(e) =>
                    handleOfficialChange("refereeC1", e.target.value)
                  }
                  placeholder="Referee C1"
                  className="app-input"
                />
                <input
                  type="text"
                  value={officials.refereeC2}
                  onChange={(e) =>
                    handleOfficialChange("refereeC2", e.target.value)
                  }
                  placeholder="Referee C2"
                  className="app-input"
                />
                <input
                  type="text"
                  value={officials.secretary1}
                  onChange={(e) =>
                    handleOfficialChange("secretary1", e.target.value)
                  }
                  placeholder="Secretary 1"
                  className="app-input"
                />
                <input
                  type="text"
                  value={officials.secretary2}
                  onChange={(e) =>
                    handleOfficialChange("secretary2", e.target.value)
                  }
                  placeholder="Secretary 2"
                  className="app-input"
                />
                <input
                  type="text"
                  value={officials.timekeeper}
                  onChange={(e) =>
                    handleOfficialChange("timekeeper", e.target.value)
                  }
                  placeholder="Timekeeper"
                  className="app-input"
                />
                <input
                  type="text"
                  value={officials.refereeP1}
                  onChange={(e) =>
                    handleOfficialChange("refereeP1", e.target.value)
                  }
                  placeholder="Referee P1"
                  className="app-input"
                />
                <input
                  type="text"
                  value={officials.refereeP2}
                  onChange={(e) =>
                    handleOfficialChange("refereeP2", e.target.value)
                  }
                  placeholder="Referee P2"
                  className="app-input"
                />
                <input
                  type="text"
                  value={officials.observer}
                  onChange={(e) =>
                    handleOfficialChange("observer", e.target.value)
                  }
                  placeholder="Observer"
                  className="app-input"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            type="submit"
            className="app-button primary"
            style={{ width: "100%", padding: "18px", fontSize: "18px" }}
          >
            Start Match
          </button>
        </div>
      </form>
    </AppLayout>
  );
}

export default MatchSetup;