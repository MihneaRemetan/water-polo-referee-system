import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

function MatchSetup() {
  const navigate = useNavigate();

  const createPlayers = () =>
    Array.from({ length: 15 }, (_, index) => ({
      number: index + 1,
      name: "",
    }));

  const [teams, setTeams] = useState([]);

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

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/teams");
  
        console.log("STATUS:", res.status);
  
        if (!res.ok) {
          const text = await res.text();
          console.error("ERROR RESPONSE:", text);
          return;
        }
  
        const data = await res.json();
        console.log("TEAMS:", data);
  
        setTeams(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };
  
    loadTeams();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        teamARef.current &&
        !teamARef.current.contains(event.target) &&
        teamBRef.current &&
        !teamBRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTeamsA = useMemo(() => {
    if (!teams || teams.length === 0) return [];
  
    const query = teamAName.trim().toLowerCase();
  
    if (query === "") return teams;
  
    return teams.filter((team) => {
      return (
        (team.name || "").toLowerCase().includes(query) ||
        (team.shortName || "").toLowerCase().includes(query) ||
        (team.city || "").toLowerCase().includes(query)
      );
    });
  }, [teams, teamAName]);

  const filteredTeamsB = useMemo(() => {
    if (!teams || teams.length === 0) return [];

    const query = teamAName.trim().toLowerCase();

    if (query === "") return teams;

    return teams.filter((team) => {
      return (
        (team.name || "").toLowerCase().includes(query) ||
        (team.shortName || "").toLowerCase().includes(query) ||
        (team.city || "").toLowerCase().includes(query)
      );
    });
  }, [teams, teamBName]);

  const handleSelectTeamA = (team) => {
    setTeamAId(team.id);
    setTeamAName(team.name);
    setOpenDropdown(null);
  };

  const handleSelectTeamB = (team) => {
    setTeamBId(team.id);
    setTeamBName(team.name);
    setOpenDropdown(null);
  };

  const handleTeamAChange = (value) => {
    setTeamAName(value);

    const exactMatch = teams.find(
      (team) => team.name?.trim().toLowerCase() === value.trim().toLowerCase()
    );

    setTeamAId(exactMatch ? exactMatch.id : null);
  };

  const handleTeamBChange = (value) => {
    setTeamBName(value);

    const exactMatch = teams.find(
      (team) => team.name?.trim().toLowerCase() === value.trim().toLowerCase()
    );

    setTeamBId(exactMatch ? exactMatch.id : null);
  };

  const handlePlayerChange = (team, number, value) => {
    if (team === "A") {
      setPlayersA((prev) =>
        prev.map((player) =>
          player.number === number ? { ...player, name: value } : player
        )
      );
    } else {
      setPlayersB((prev) =>
        prev.map((player) =>
          player.number === number ? { ...player, name: value } : player
        )
      );
    }
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

    const selectedTeamA = teams.find((team) => team.id === teamAId);
    const selectedTeamB = teams.find((team) => team.id === teamBId);

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
                  Enter team name, players, and coaching staff.
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

            {playersA.map((player) => (
              <div key={player.number} className="player-row">
                <div className="player-no">{player.number}</div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerChange("A", player.number, e.target.value)
                  }
                  placeholder={`Player ${player.number} name`}
                  className="app-input"
                />
              </div>
            ))}

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
                  Enter team name, players, and coaching staff.
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

            {playersB.map((player) => (
              <div key={player.number} className="player-row">
                <div className="player-no">{player.number}</div>
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) =>
                    handlePlayerChange("B", player.number, e.target.value)
                  }
                  placeholder={`Player ${player.number} name`}
                  className="app-input"
                />
              </div>
            ))}

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