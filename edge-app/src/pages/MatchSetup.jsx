import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

function MatchSetup() {
  const navigate = useNavigate();

  const createPlayers = () =>
    Array.from({ length: 15 }, (_, index) => ({
      number: index + 1,
      name: "",
    }));

  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");

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

    const formData = {
      teamA: {
        name: teamAName.trim() || "Team A",
        players: playersA,
        coaches: coachesA,
      },
      teamB: {
        name: teamBName.trim() || "Team B",
        players: playersB,
        coaches: coachesB,
      },
      matchDetails,
      officials,
    };

    navigate("/live-match", { state: formData });
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

            <input
              type="text"
              value={teamAName}
              onChange={(e) => setTeamAName(e.target.value)}
              placeholder="Team A name"
              className="app-input"
              style={{ marginBottom: "16px" }}
            />

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

            <input
              type="text"
              value={teamBName}
              onChange={(e) => setTeamBName(e.target.value)}
              placeholder="Team B name"
              className="app-input"
              style={{ marginBottom: "16px" }}
            />

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