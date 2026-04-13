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

  const createCoachesState = () => ({
    hc: "",
    assistants: [""],
  });

  const [teams, setTeams] = useState([]);
  const [playersFromDb, setPlayersFromDb] = useState([]);
  const [coachesFromDb, setCoachesFromDb] = useState([]);
  const [refereesFromDb, setRefereesFromDb] = useState([]);
  const [observersFromDb, setObserversFromDb] = useState([]);

  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");

  const [teamAId, setTeamAId] = useState(null);
  const [teamBId, setTeamBId] = useState(null);

  const [openDropdown, setOpenDropdown] = useState(null);

  const teamARef = useRef(null);
  const teamBRef = useRef(null);

  const [playersA, setPlayersA] = useState(createPlayers());
  const [playersB, setPlayersB] = useState(createPlayers());

  const [coachesA, setCoachesA] = useState(createCoachesState());
  const [coachesB, setCoachesB] = useState(createCoachesState());

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
    observerId: "",
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

  const getCoachTeamId = (coach) => {
    if (coach?.teamId != null) return Number(coach.teamId);
    if (coach?.team?.id != null) return Number(coach.team.id);
    return null;
  };

  const getCoachNameById = (coachId) => {
    const coach = coachesFromDb.find(
      (item) => Number(item.id) === Number(coachId)
    );
    return coach?.name ?? "";
  };

  const getRefereeName = (referee) => {
    return referee?.name ?? referee?.fullName ?? "";
  };

  const getObserverName = (observer) => {
    return observer?.name ?? observer?.fullName ?? "";
  };

  const getObserverNameById = (observerId) => {
    const observer = observersFromDb.find(
      (item) => Number(item.id) === Number(observerId)
    );
    return observer ? getObserverName(observer) : "";
  };

  const isPlayerAlreadySelected = (team, rosterNumber, playerId) => {
    const selectedId = Number(playerId);
    if (!selectedId) return false;

    const roster = team === "A" ? playersA : playersB;

    return roster.some(
      (player) =>
        player.number !== rosterNumber && Number(player.playerId) === selectedId
    );
  };

  const getSelectedCoachIds = (
    team,
    excludeType = null,
    excludeIndex = null
  ) => {
    const coachState = team === "A" ? coachesA : coachesB;
    const ids = [];

    if (!(excludeType === "hc") && coachState.hc) {
      ids.push(Number(coachState.hc));
    }

    coachState.assistants.forEach((assistantId, index) => {
      if (excludeType === "assistant" && excludeIndex === index) {
        return;
      }

      if (assistantId) {
        ids.push(Number(assistantId));
      }
    });

    return ids.filter((id) => !Number.isNaN(id) && id > 0);
  };

  const isCoachAlreadySelected = (
    team,
    coachId,
    excludeType = null,
    excludeIndex = null
  ) => {
    const selectedId = Number(coachId);
    if (!selectedId) return false;

    return getSelectedCoachIds(team, excludeType, excludeIndex).includes(
      selectedId
    );
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
    const loadCoaches = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/coaches", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Could not load coaches:", text);
          return;
        }

        const data = await res.json();
        setCoachesFromDb(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FETCH COACHES ERROR:", err);
      }
    };

    loadCoaches();
  }, []);

  useEffect(() => {
    const loadReferees = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/referees", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Could not load referees:", text);
          return;
        }

        const data = await res.json();
        setRefereesFromDb(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FETCH REFEREES ERROR:", err);
      }
    };

    loadReferees();
  }, []);

  useEffect(() => {
    const loadObservers = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/admin/observers", {
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Could not load observers:", text);
          return;
        }

        const data = await res.json();
        setObserversFromDb(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("FETCH OBSERVERS ERROR:", err);
      }
    };

    loadObservers();
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

  const teamACoaches = useMemo(() => {
    return coachesFromDb.filter(
      (coach) => getCoachTeamId(coach) === Number(teamAId)
    );
  }, [coachesFromDb, teamAId]);

  const teamBCoaches = useMemo(() => {
    return coachesFromDb.filter(
      (coach) => getCoachTeamId(coach) === Number(teamBId)
    );
  }, [coachesFromDb, teamBId]);

  const nonObserverOfficials = useMemo(() => {
    return refereesFromDb;
  }, [refereesFromDb]);

  const getAvailablePlayersForRow = (team, currentPlayerId, teamPlayers) => {
    const roster = team === "A" ? playersA : playersB;

    const selectedIdsInOtherRows = roster
      .filter((player) => Number(player.playerId) > 0)
      .filter((player) => Number(player.playerId) !== Number(currentPlayerId))
      .map((player) => Number(player.playerId));

    return teamPlayers.filter((player) => {
      const playerId = Number(player.id);
      return !selectedIdsInOtherRows.includes(playerId);
    });
  };

  const resetTeamRosterAndCoaches = (team) => {
    if (team === "A") {
      setPlayersA(createPlayers());
      setCoachesA(createCoachesState());
    } else {
      setPlayersB(createPlayers());
      setCoachesB(createCoachesState());
    }
  };

  const handleSelectTeamA = (team) => {
    setTeamAId(team.id);
    setTeamAName(team.name);
    resetTeamRosterAndCoaches("A");
    setOpenDropdown(null);
  };

  const handleSelectTeamB = (team) => {
    setTeamBId(team.id);
    setTeamBName(team.name);
    resetTeamRosterAndCoaches("B");
    setOpenDropdown(null);
  };

  const handleTeamAChange = (value) => {
    setTeamAName(value);

    const exactMatch = teams.find(
      (team) => team.name?.trim().toLowerCase() === value.trim().toLowerCase()
    );

    if (exactMatch) {
      setTeamAId(exactMatch.id);
      resetTeamRosterAndCoaches("A");
    } else {
      setTeamAId(null);
      resetTeamRosterAndCoaches("A");
    }
  };

  const handleTeamBChange = (value) => {
    setTeamBName(value);

    const exactMatch = teams.find(
      (team) => team.name?.trim().toLowerCase() === value.trim().toLowerCase()
    );

    if (exactMatch) {
      setTeamBId(exactMatch.id);
      resetTeamRosterAndCoaches("B");
    } else {
      setTeamBId(null);
      resetTeamRosterAndCoaches("B");
    }
  };

  const handlePlayerSelect = (team, rosterNumber, selectedPlayerId) => {
    const selectedId = selectedPlayerId ? Number(selectedPlayerId) : null;

    if (selectedId && isPlayerAlreadySelected(team, rosterNumber, selectedId)) {
      alert("This player is already selected in this team.");
      return;
    }

    const sourcePlayers = team === "A" ? teamAPlayers : teamBPlayers;

    const selectedPlayer = sourcePlayers.find(
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
    if (value && isCoachAlreadySelected(team, value, "hc", null)) {
      alert("This coach is already selected for this team.");
      return;
    }

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
    if (value && isCoachAlreadySelected(team, value, "assistant", index)) {
      alert("This coach is already selected for this team.");
      return;
    }

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
        assistants:
          prev.assistants.length > 1
            ? prev.assistants.filter((_, i) => i !== index)
            : [""],
      }));
    } else {
      setCoachesB((prev) => ({
        ...prev,
        assistants:
          prev.assistants.length > 1
            ? prev.assistants.filter((_, i) => i !== index)
            : [""],
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

  const handleObserverChange = (value) => {
    const selectedId = value ? Number(value) : null;
    const selectedObserver = observersFromDb.find(
      (observer) => Number(observer.id) === selectedId
    );

    setOfficials((prev) => ({
      ...prev,
      observerId: value,
      observer: selectedObserver ? getObserverName(selectedObserver) : "",
    }));
  };

  const buildCoachesPayload = (coachesState) => {
    const hcId = coachesState.hc ? Number(coachesState.hc) : null;
    const assistantIds = coachesState.assistants
      .filter((item) => item !== "")
      .map((item) => Number(item));

    return {
      hcId,
      hc: hcId ? getCoachNameById(hcId) : "",
      assistantIds,
      assistants: assistantIds.map((id) => getCoachNameById(id)).filter(Boolean),
    };
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

    const teamAPlayerIds = playersA
      .map((player) => Number(player.playerId))
      .filter((id) => !Number.isNaN(id) && id > 0);

    const teamBPlayerIds = playersB
      .map((player) => Number(player.playerId))
      .filter((id) => !Number.isNaN(id) && id > 0);

    if (new Set(teamAPlayerIds).size !== teamAPlayerIds.length) {
      alert("Team A contains duplicate players.");
      return;
    }

    if (new Set(teamBPlayerIds).size !== teamBPlayerIds.length) {
      alert("Team B contains duplicate players.");
      return;
    }

    const teamACoachIds = [
      coachesA.hc ? Number(coachesA.hc) : null,
      ...coachesA.assistants.map((id) => (id ? Number(id) : null)),
    ].filter((id) => !Number.isNaN(id) && id && id > 0);

    const teamBCoachIds = [
      coachesB.hc ? Number(coachesB.hc) : null,
      ...coachesB.assistants.map((id) => (id ? Number(id) : null)),
    ].filter((id) => !Number.isNaN(id) && id && id > 0);

    if (new Set(teamACoachIds).size !== teamACoachIds.length) {
      alert("Team A contains duplicate coaches.");
      return;
    }

    if (new Set(teamBCoachIds).size !== teamBCoachIds.length) {
      alert("Team B contains duplicate coaches.");
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
        coaches: buildCoachesPayload(coachesA),
      },
      teamB: {
        id: teamBId,
        name: selectedTeamB?.name || "Team B",
        players: playersB,
        coaches: buildCoachesPayload(coachesB),
      },
      matchDetails,
      officials: {
        ...officials,
        observer: officials.observerId
          ? getObserverNameById(officials.observerId)
          : "",
      },
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

    const availableOptions = getAvailablePlayersForRow(
      team,
      player.playerId,
      teamPlayers
    );

    const selectedPlayer = teamPlayers.find(
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
              {selectedPlayer ? getPlayerName(selectedPlayer) : "Select player"}
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
              {availableOptions.length > 0 ? (
                availableOptions.map((option) => (
                  <div
                    key={option.id}
                    style={optionStyle}
                    onMouseDown={() =>
                      handlePlayerSelect(team, player.number, option.id)
                    }
                  >
                    <div style={optionTitleStyle}>{getPlayerName(option)}</div>
                    <div style={optionMetaStyle}>
                      {option.playerCode || `Player #${option.number ?? "-"}`}
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
                  No players available.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOfficialSelect = (field, placeholder) => {
    return (
      <select
        className="app-select"
        value={officials[field]}
        onChange={(e) => handleOfficialChange(field, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {nonObserverOfficials.map((official) => (
          <option key={official.id} value={getRefereeName(official)}>
            {getRefereeName(official)}
          </option>
        ))}
      </select>
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
                  Select the team and choose players manually from the database.
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
                <select
                  className="app-select"
                  value={coachesA.hc}
                  onChange={(e) => handleCoachChange("A", "hc", e.target.value)}
                >
                  <option value="">Select Head Coach</option>
                  {teamACoaches
                    .filter((coach) => {
                      const coachId = Number(coach.id);
                      const usedIds = getSelectedCoachIds("A", "hc", null);
                      return (
                        coachId === Number(coachesA.hc) ||
                        !usedIds.includes(coachId)
                      );
                    })
                    .map((coach) => (
                      <option key={coach.id} value={coach.id}>
                        {coach.name}
                      </option>
                    ))}
                </select>
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

                  <select
                    className="app-select"
                    value={assistant}
                    onChange={(e) =>
                      handleAssistantCoachChange("A", index, e.target.value)
                    }
                  >
                    <option value="">Select Assistant Coach</option>
                    {teamACoaches
                      .filter((coach) => {
                        const coachId = Number(coach.id);
                        const usedIds = getSelectedCoachIds(
                          "A",
                          "assistant",
                          index
                        );
                        return (
                          coachId === Number(assistant) ||
                          !usedIds.includes(coachId)
                        );
                      })
                      .map((coach) => (
                        <option key={coach.id} value={coach.id}>
                          {coach.name}
                        </option>
                      ))}
                  </select>

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
                  Select the team and choose players manually from the database.
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
                <select
                  className="app-select"
                  value={coachesB.hc}
                  onChange={(e) => handleCoachChange("B", "hc", e.target.value)}
                >
                  <option value="">Select Head Coach</option>
                  {teamBCoaches
                    .filter((coach) => {
                      const coachId = Number(coach.id);
                      const usedIds = getSelectedCoachIds("B", "hc", null);
                      return (
                        coachId === Number(coachesB.hc) ||
                        !usedIds.includes(coachId)
                      );
                    })
                    .map((coach) => (
                      <option key={coach.id} value={coach.id}>
                        {coach.name}
                      </option>
                    ))}
                </select>
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

                  <select
                    className="app-select"
                    value={assistant}
                    onChange={(e) =>
                      handleAssistantCoachChange("B", index, e.target.value)
                    }
                  >
                    <option value="">Select Assistant Coach</option>
                    {teamBCoaches
                      .filter((coach) => {
                        const coachId = Number(coach.id);
                        const usedIds = getSelectedCoachIds(
                          "B",
                          "assistant",
                          index
                        );
                        return (
                          coachId === Number(assistant) ||
                          !usedIds.includes(coachId)
                        );
                      })
                      .map((coach) => (
                        <option key={coach.id} value={coach.id}>
                          {coach.name}
                        </option>
                      ))}
                  </select>

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
                Select referees and table officials.
              </p>

              <div className="stack-actions">
                {renderOfficialSelect("refereeC1", "Referee C1")}
                {renderOfficialSelect("refereeC2", "Referee C2")}
                {renderOfficialSelect("secretary1", "Secretary 1")}
                {renderOfficialSelect("secretary2", "Secretary 2")}
                {renderOfficialSelect("timekeeper", "Timekeeper")}
                {renderOfficialSelect("refereeP1", "Referee P1")}
                {renderOfficialSelect("refereeP2", "Referee P2")}

                <select
                  className="app-select"
                  value={officials.observerId}
                  onChange={(e) => handleObserverChange(e.target.value)}
                >
                  <option value="">Observer</option>
                  {observersFromDb.map((observer) => (
                    <option key={observer.id} value={observer.id}>
                      {getObserverName(observer)}
                    </option>
                  ))}
                </select>
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