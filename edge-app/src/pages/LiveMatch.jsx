import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import EventList from "../components/EventList";
import ShotClock from "../components/ShotClock";
import PlayerFouls from "../components/PlayerFouls";
import AppLayout from "../layout/AppLayout";

function LiveMatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const storedMatchData = localStorage.getItem("matchData");
  const matchData =
    location.state || (storedMatchData ? JSON.parse(storedMatchData) : {});

  const resolvedTeamAId = matchData.teamA?.id ?? matchData.teamAId ?? null;
  const resolvedTeamBId = matchData.teamB?.id ?? matchData.teamBId ?? null;

  const toLocalDateTimeString = (date) => {
    const pad = (value) => String(value).padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const createDefaultPlayers = () =>
    Array.from({ length: 15 }, (_, index) => ({
      number: index + 1,
      fouls: 0,
      goals: 0,
      yellowCards: 0,
      redCards: 0,
      out: false,
      name: "",
    }));

  const createPlayersFromSetup = (teamPlayers) => {
    if (!teamPlayers || teamPlayers.length === 0) {
      return createDefaultPlayers();
    }

    return teamPlayers.map((player, index) => ({
      number: player.number ?? index + 1,
      fouls: 0,
      goals: 0,
      yellowCards: 0,
      redCards: 0,
      out: false,
      name: player.name || "",
    }));
  };

  const [teamA] = useState(matchData.teamA?.name || "Team A");
  const [teamB] = useState(matchData.teamB?.name || "Team B");

  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const [timeoutsA, setTimeoutsA] = useState(0);
  const [timeoutsB, setTimeoutsB] = useState(0);

  const [events, setEvents] = useState([]);

  const [isMatchRunning, setIsMatchRunning] = useState(false);
  const [periodMinutes, setPeriodMinutes] = useState(8);
  const [matchSeconds, setMatchSeconds] = useState(8 * 60);
  const [shotClockSeconds, setShotClockSeconds] = useState(28);
  const [period, setPeriod] = useState(1);
  const [firstPossession, setFirstPossession] = useState("");
  const [startedAt] = useState(toLocalDateTimeString(new Date()));

  const [playersA, setPlayersA] = useState(
    createPlayersFromSetup(matchData.teamA?.players)
  );

  const [playersB, setPlayersB] = useState(
    createPlayersFromSetup(matchData.teamB?.players)
  );

  const MAX_TIME = periodMinutes * 60;

  const formatEventTime = (secondsValue = matchSeconds) => {
    const safeSeconds = Math.max(0, Number(secondsValue) || 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const addEvent = ({
    team = null,
    playerNumber = null,
    playerName = null,
    eventType = "MATCH_EVENT",
    details,
    customSeconds = matchSeconds,
    customPeriod = period,
  }) => {
    setEvents((prev) => [
      ...prev,
      {
        team,
        playerNumber,
        playerName,
        eventType,
        eventTimeSeconds: customSeconds,
        period: customPeriod,
        details,
      },
    ]);
  };

  const eventListItems = useMemo(
    () =>
      events.map(
        (event) => `[${formatEventTime(event.eventTimeSeconds)}] ${event.details}`
      ),
    [events]
  );

  const getPlayerLabel = (player) => {
    const cleanName = player?.name?.trim();
    return cleanName ? `#${player.number} ${cleanName}` : `#${player.number}`;
  };

  const buildMatchPayload = () => {
    const mapPlayerStats = (players, teamLabel) =>
      players.map((player) => ({
        team: teamLabel,
        playerNumber: player.number ?? null,
        playerName: player.name ?? "",
        goals: player.goals ?? 0,
        fouls: player.fouls ?? 0,
        yellowCards: player.yellowCards ?? 0,
        redCards: player.redCards ?? 0,
        excluded: player.out ?? false,
      }));

    const mapEvents = (eventsList) =>
      eventsList.map((event) => ({
        team: event.team,
        playerNumber: event.playerNumber,
        playerName: event.playerName,
        eventType: event.eventType,
        eventTimeSeconds: event.eventTimeSeconds,
        period: event.period,
        details: event.details,
      }));

    return {
      teamAId: resolvedTeamAId,
      teamBId: resolvedTeamBId,
      scoreA,
      scoreB,
      period,
      matchSeconds,
      shotClockSeconds,
      status: "FINISHED",
      startedAt,
      endedAt: toLocalDateTimeString(new Date()),
      events: mapEvents(events),
      playerStats: [
        ...mapPlayerStats(playersA, "A"),
        ...mapPlayerStats(playersB, "B"),
      ],
    };
  };

  const handleEndMatch = async () => {
    try {
      const payload = buildMatchPayload();
      console.log("Saving match payload:", payload);

      if (!resolvedTeamAId) {
        alert("Could not save match.\nTeam A ID is missing.");
        return;
      }

      if (!resolvedTeamBId) {
        alert("Could not save match.\nTeam B ID is missing.");
        return;
      }

      const response = await fetch("http://localhost:8080/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      console.log("Save response:", response.status, text);

      if (!response.ok) {
        alert(`Could not save match.\n${text}`);
        return;
      }

      alert("Match saved successfully!");
    } catch (error) {
      console.error("Error saving match:", error);
      alert("Could not save match.\nCheck browser console.");
    }
  };

  useEffect(() => {
    if (!resolvedTeamAId || !resolvedTeamBId) {
      alert("You must setup a match first.");
      navigate("/match-setup");
    }
  }, [resolvedTeamAId, resolvedTeamBId, navigate]);

  useEffect(() => {
    if (!isMatchRunning) return;

    const interval = setInterval(() => {
      setMatchSeconds((prev) => {
        if (prev <= 1) {
          setIsMatchRunning(false);
          addEvent({
            eventType: "PERIOD_END",
            details: `End of period ${period}`,
            customSeconds: 0,
          });
          return 0;
        }
        return prev - 1;
      });

      setShotClockSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isMatchRunning, period]);

  const handleStartMatch = () => {
    if (matchSeconds > 0) {
      setIsMatchRunning(true);
    }
  };

  const handlePauseMatch = () => {
    setIsMatchRunning(false);
  };

  const handleResetMatch = () => {
    setIsMatchRunning(false);
    setMatchSeconds(periodMinutes * 60);
    setShotClockSeconds(28);
    setPeriod(1);
    setScoreA(0);
    setScoreB(0);
    setTimeoutsA(0);
    setTimeoutsB(0);
    setEvents([]);
    setFirstPossession("");

    setPlayersA(createPlayersFromSetup(matchData.teamA?.players));
    setPlayersB(createPlayersFromSetup(matchData.teamB?.players));
  };

  const handleIncreaseMatchTime = () => {
    setMatchSeconds((prev) => Math.min(MAX_TIME, prev + 1));
  };

  const handleDecreaseMatchTime = () => {
    setMatchSeconds((prev) => Math.max(0, prev - 1));
  };

  const handleResetShotClock = () => {
    setShotClockSeconds(28);
  };

  const handleSetShotClock18 = () => {
    setShotClockSeconds(18);
  };

  const handleIncreaseShotClock = () => {
    setShotClockSeconds((prev) => Math.min(28, prev + 1));
  };

  const handleDecreaseShotClock = () => {
    setShotClockSeconds((prev) => Math.max(0, prev - 1));
  };

  const handlePeriodMinutesChange = (value) => {
    const safeMinutes = Math.max(1, Number(value) || 1);
    setPeriodMinutes(safeMinutes);
    setIsMatchRunning(false);
    setMatchSeconds(safeMinutes * 60);
    addEvent({
      eventType: "PERIOD_DURATION_CHANGE",
      details: `Period duration set to ${safeMinutes} minutes`,
    });
  };

  const handleIncreasePeriod = () => {
    if (period >= 4) {
      addEvent({
        eventType: "SYSTEM_WARNING",
        details: "Cannot go beyond period 4",
      });
      return;
    }

    const nextPeriod = period + 1;
    setPeriod(nextPeriod);
    setIsMatchRunning(false);
    setMatchSeconds(periodMinutes * 60);
    setShotClockSeconds(28);
    setFirstPossession("");
    addEvent({
      eventType: "PERIOD_CHANGE",
      details: `Moved to period ${nextPeriod}`,
    });
  };

  const handleDecreasePeriod = () => {
    if (period <= 1) {
      addEvent({
        eventType: "SYSTEM_WARNING",
        details: "Cannot go below period 1",
      });
      return;
    }

    const nextPeriod = period - 1;
    setPeriod(nextPeriod);
    setIsMatchRunning(false);
    setMatchSeconds(periodMinutes * 60);
    setShotClockSeconds(28);
    setFirstPossession("");
    addEvent({
      eventType: "PERIOD_CHANGE",
      details: `Moved back to period ${nextPeriod}`,
    });
  };

  const handleTimeoutA = () => {
    if (timeoutsA >= 2) {
      addEvent({
        team: "A",
        eventType: "TIMEOUT_DENIED",
        details: `${teamA} cannot request more than 2 timeouts`,
      });
      return;
    }

    setTimeoutsA((prev) => prev + 1);
    addEvent({
      team: "A",
      eventType: "TIMEOUT",
      details: `Timeout ${teamA}`,
    });
    setIsMatchRunning(false);
  };

  const handleTimeoutB = () => {
    if (timeoutsB >= 2) {
      addEvent({
        team: "B",
        eventType: "TIMEOUT_DENIED",
        details: `${teamB} cannot request more than 2 timeouts`,
      });
      return;
    }

    setTimeoutsB((prev) => prev + 1);
    addEvent({
      team: "B",
      eventType: "TIMEOUT",
      details: `Timeout ${teamB}`,
    });
    setIsMatchRunning(false);
  };

  const handleFirstPossessionA = () => {
    if (firstPossession) return;
    setFirstPossession(teamA);
    addEvent({
      team: "A",
      eventType: "SPRINT_WIN",
      details: `Period ${period} - Sprint won by ${teamA}`,
    });
  };

  const handleFirstPossessionB = () => {
    if (firstPossession) return;
    setFirstPossession(teamB);
    addEvent({
      team: "B",
      eventType: "SPRINT_WIN",
      details: `Period ${period} - Sprint won by ${teamB}`,
    });
  };

  const handlePlayerFoulA = (playerNumber) => {
    const updatedPlayers = playersA.map((player) => {
      if (player.number === playerNumber) {
        const newFouls = player.fouls + 1;
        return {
          ...player,
          fouls: newFouls,
          out: newFouls >= 3 || player.redCards === 1,
        };
      }
      return player;
    });

    setPlayersA(updatedPlayers);

    const player = updatedPlayers.find((p) => p.number === playerNumber);
    if (!player) return;

    if (player.fouls >= 3) {
      addEvent({
        team: "A",
        playerNumber: player.number,
        playerName: player.name || null,
        eventType: "FOUL_OUT",
        details: `${teamA} - Player ${getPlayerLabel(
          player
        )} received 3 personal fouls and is out`,
      });
    } else {
      addEvent({
        team: "A",
        playerNumber: player.number,
        playerName: player.name || null,
        eventType: "FOUL",
        details: `${teamA} - Player ${getPlayerLabel(player)} elimination (${player.fouls}/3)`,
      });
    }
  };

  const handlePlayerFoulB = (playerNumber) => {
    const updatedPlayers = playersB.map((player) => {
      if (player.number === playerNumber) {
        const newFouls = player.fouls + 1;
        return {
          ...player,
          fouls: newFouls,
          out: newFouls >= 3 || player.redCards === 1,
        };
      }
      return player;
    });

    setPlayersB(updatedPlayers);

    const player = updatedPlayers.find((p) => p.number === playerNumber);
    if (!player) return;

    if (player.fouls >= 3) {
      addEvent({
        team: "B",
        playerNumber: player.number,
        playerName: player.name || null,
        eventType: "FOUL_OUT",
        details: `${teamB} - Player ${getPlayerLabel(
          player
        )} received 3 personal fouls and is out`,
      });
    } else {
      addEvent({
        team: "B",
        playerNumber: player.number,
        playerName: player.name || null,
        eventType: "FOUL",
        details: `${teamB} - Player ${getPlayerLabel(player)} elimination (${player.fouls}/3)`,
      });
    }
  };

  const handleRemoveFoulA = (playerNumber) => {
    const updatedPlayers = playersA.map((player) => {
      if (player.number === playerNumber) {
        const newFouls = Math.max(0, player.fouls - 1);
        return {
          ...player,
          fouls: newFouls,
          out: newFouls >= 3 || player.redCards === 1,
        };
      }
      return player;
    });

    setPlayersA(updatedPlayers);

    const player = updatedPlayers.find((p) => p.number === playerNumber);
    if (!player) return;

    addEvent({
      team: "A",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "FOUL_REMOVED",
      details: `${teamA} - Player ${getPlayerLabel(player)} elimination removed`,
    });
  };

  const handleRemoveFoulB = (playerNumber) => {
    const updatedPlayers = playersB.map((player) => {
      if (player.number === playerNumber) {
        const newFouls = Math.max(0, player.fouls - 1);
        return {
          ...player,
          fouls: newFouls,
          out: newFouls >= 3 || player.redCards === 1,
        };
      }
      return player;
    });

    setPlayersB(updatedPlayers);

    const player = updatedPlayers.find((p) => p.number === playerNumber);
    if (!player) return;

    addEvent({
      team: "B",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "FOUL_REMOVED",
      details: `${teamB} - Player ${getPlayerLabel(player)} elimination removed`,
    });
  };

  const handleAddGoalA = (playerNumber) => {
    const player = playersA.find((p) => p.number === playerNumber);

    if (!player || player.out || player.fouls >= 3 || player.redCards === 1) {
      return;
    }

    let scorer = null;

    const updatedPlayers = playersA.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        scorer = { ...currentPlayer, goals: currentPlayer.goals + 1 };
        return scorer;
      }
      return currentPlayer;
    });

    if (!scorer) return;

    setPlayersA(updatedPlayers);
    setScoreA((prev) => prev + 1);
    setShotClockSeconds(28);
    addEvent({
      team: "A",
      playerNumber: scorer.number,
      playerName: scorer.name || null,
      eventType: "GOAL",
      details: `${teamA} - Goal scored by ${getPlayerLabel(scorer)}`,
    });
  };

  const handleAddGoalB = (playerNumber) => {
    const player = playersB.find((p) => p.number === playerNumber);

    if (!player || player.out || player.fouls >= 3 || player.redCards === 1) {
      return;
    }

    let scorer = null;

    const updatedPlayers = playersB.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        scorer = { ...currentPlayer, goals: currentPlayer.goals + 1 };
        return scorer;
      }
      return currentPlayer;
    });

    if (!scorer) return;

    setPlayersB(updatedPlayers);
    setScoreB((prev) => prev + 1);
    setShotClockSeconds(28);
    addEvent({
      team: "B",
      playerNumber: scorer.number,
      playerName: scorer.name || null,
      eventType: "GOAL",
      details: `${teamB} - Goal scored by ${getPlayerLabel(scorer)}`,
    });
  };

  const handleRemoveGoalA = (playerNumber) => {
    const player = playersA.find((p) => p.number === playerNumber);

    if (!player || player.goals === 0) return;

    const updatedPlayers = playersA.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          goals: currentPlayer.goals - 1,
        };
      }
      return currentPlayer;
    });

    setPlayersA(updatedPlayers);
    setScoreA((prev) => Math.max(0, prev - 1));
    addEvent({
      team: "A",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "GOAL_REMOVED",
      details: `${teamA} - Goal removed from ${getPlayerLabel(player)}`,
    });
  };

  const handleRemoveGoalB = (playerNumber) => {
    const player = playersB.find((p) => p.number === playerNumber);

    if (!player || player.goals === 0) return;

    const updatedPlayers = playersB.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          goals: currentPlayer.goals - 1,
        };
      }
      return currentPlayer;
    });

    setPlayersB(updatedPlayers);
    setScoreB((prev) => Math.max(0, prev - 1));
    addEvent({
      team: "B",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "GOAL_REMOVED",
      details: `${teamB} - Goal removed from ${getPlayerLabel(player)}`,
    });
  };

  const handleAddYellowA = (playerNumber) => {
    const player = playersA.find((p) => p.number === playerNumber);

    if (
      !player ||
      player.yellowCards === 1 ||
      player.out ||
      player.fouls >= 3 ||
      player.redCards === 1
    ) {
      return;
    }

    const updatedPlayers = playersA.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          yellowCards: 1,
        };
      }
      return currentPlayer;
    });

    setPlayersA(updatedPlayers);
    addEvent({
      team: "A",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "YELLOW_CARD",
      details: `${teamA} - Yellow card for ${getPlayerLabel(player)}`,
    });
  };

  const handleAddYellowB = (playerNumber) => {
    const player = playersB.find((p) => p.number === playerNumber);

    if (
      !player ||
      player.yellowCards === 1 ||
      player.out ||
      player.fouls >= 3 ||
      player.redCards === 1
    ) {
      return;
    }

    const updatedPlayers = playersB.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          yellowCards: 1,
        };
      }
      return currentPlayer;
    });

    setPlayersB(updatedPlayers);
    addEvent({
      team: "B",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "YELLOW_CARD",
      details: `${teamB} - Yellow card for ${getPlayerLabel(player)}`,
    });
  };

  const handleRemoveYellowA = (playerNumber) => {
    const player = playersA.find((p) => p.number === playerNumber);
    if (!player || player.yellowCards === 0) return;

    const updatedPlayers = playersA.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          yellowCards: 0,
        };
      }
      return currentPlayer;
    });

    setPlayersA(updatedPlayers);
    addEvent({
      team: "A",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "YELLOW_CARD_REMOVED",
      details: `${teamA} - Yellow card removed from ${getPlayerLabel(player)}`,
    });
  };

  const handleRemoveYellowB = (playerNumber) => {
    const player = playersB.find((p) => p.number === playerNumber);
    if (!player || player.yellowCards === 0) return;

    const updatedPlayers = playersB.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          yellowCards: 0,
        };
      }
      return currentPlayer;
    });

    setPlayersB(updatedPlayers);
    addEvent({
      team: "B",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "YELLOW_CARD_REMOVED",
      details: `${teamB} - Yellow card removed from ${getPlayerLabel(player)}`,
    });
  };

  const handleAddRedA = (playerNumber) => {
    const player = playersA.find((p) => p.number === playerNumber);
    if (!player || player.redCards === 1) return;

    const updatedPlayers = playersA.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          redCards: 1,
          out: true,
        };
      }
      return currentPlayer;
    });

    setPlayersA(updatedPlayers);
    addEvent({
      team: "A",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "RED_CARD",
      details: `${teamA} - Red card for ${getPlayerLabel(player)}`,
    });
  };

  const handleAddRedB = (playerNumber) => {
    const player = playersB.find((p) => p.number === playerNumber);
    if (!player || player.redCards === 1) return;

    const updatedPlayers = playersB.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          redCards: 1,
          out: true,
        };
      }
      return currentPlayer;
    });

    setPlayersB(updatedPlayers);
    addEvent({
      team: "B",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "RED_CARD",
      details: `${teamB} - Red card for ${getPlayerLabel(player)}`,
    });
  };

  const handleRemoveRedA = (playerNumber) => {
    const player = playersA.find((p) => p.number === playerNumber);
    if (!player || player.redCards === 0) return;

    const updatedPlayers = playersA.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          redCards: 0,
          out: currentPlayer.fouls >= 3,
        };
      }
      return currentPlayer;
    });

    setPlayersA(updatedPlayers);
    addEvent({
      team: "A",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "RED_CARD_REMOVED",
      details: `${teamA} - Red card removed from ${getPlayerLabel(player)}`,
    });
  };

  const handleRemoveRedB = (playerNumber) => {
    const player = playersB.find((p) => p.number === playerNumber);
    if (!player || player.redCards === 0) return;

    const updatedPlayers = playersB.map((currentPlayer) => {
      if (currentPlayer.number === playerNumber) {
        return {
          ...currentPlayer,
          redCards: 0,
          out: currentPlayer.fouls >= 3,
        };
      }
      return currentPlayer;
    });

    setPlayersB(updatedPlayers);
    addEvent({
      team: "B",
      playerNumber: player.number,
      playerName: player.name || null,
      eventType: "RED_CARD_REMOVED",
      details: `${teamB} - Red card removed from ${getPlayerLabel(player)}`,
    });
  };

  return (
    <AppLayout>
      <div className="live-match-layout">
        <div className="live-side-column">
          <PlayerFouls
            teamName={teamA}
            players={playersA}
            onAddFoul={handlePlayerFoulA}
            onRemoveFoul={handleRemoveFoulA}
            onAddGoal={handleAddGoalA}
            onRemoveGoal={handleRemoveGoalA}
            onAddYellow={handleAddYellowA}
            onRemoveYellow={handleRemoveYellowA}
            onAddRed={handleAddRedA}
            onRemoveRed={handleRemoveRedA}
            variant="red"
          />
        </div>

        <div className="live-center">
          <ScoreBoard
            teamA={teamA}
            teamB={teamB}
            scoreA={scoreA}
            scoreB={scoreB}
            period={period}
            timeoutsA={timeoutsA}
            timeoutsB={timeoutsB}
            isMatchRunning={isMatchRunning}
            firstPossession={firstPossession}
            matchSeconds={matchSeconds}
          />

          <div className="panel live-card">
            <div className="live-card-header">
              <div>
                <h2 className="live-card-title">Match Timer & Period Control</h2>
                <p className="live-card-subtitle">
                  Control match flow without changing the current functionality.
                </p>
              </div>

              <span className="info-chip">Period {period}</span>
            </div>

            <Timer
              seconds={matchSeconds}
              onIncrease={handleIncreaseMatchTime}
              onDecrease={handleDecreaseMatchTime}
              onStartMatch={handleStartMatch}
              onPauseMatch={handlePauseMatch}
              onResetMatch={handleResetMatch}
            />

            <div style={{ marginTop: "18px" }}>
              <div className="period-controls">
                <button
                  onClick={handleDecreasePeriod}
                  disabled={period === 1}
                  type="button"
                  className="app-button secondary"
                >
                  −1 Period
                </button>

                <button
                  onClick={handleIncreasePeriod}
                  disabled={period === 4}
                  type="button"
                  className="app-button secondary"
                >
                  +1 Period
                </button>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span className="info-chip">Minutes / period</span>
                  <input
                    type="number"
                    min="1"
                    value={periodMinutes}
                    onChange={(e) => handlePeriodMinutesChange(e.target.value)}
                    className="app-input"
                    style={{ maxWidth: "110px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <ShotClock
            seconds={shotClockSeconds}
            onIncrease={handleIncreaseShotClock}
            onDecrease={handleDecreaseShotClock}
            onResetShotClock={handleResetShotClock}
            onSetTo18={handleSetShotClock18}
          />

          <div className="center-bottom-row">
            <div className="panel live-card">
              <div className="live-card-header">
                <div>
                  <h2 className="live-card-title">Quick Actions</h2>
                  <p className="live-card-subtitle">
                    Timeouts for both teams. Goals and cards are assigned
                    directly to players.
                  </p>
                </div>
              </div>

              <div className="split-actions">
                <button
                  type="button"
                  onClick={handleTimeoutA}
                  className="app-button secondary"
                >
                  Timeout {teamA}
                </button>
                <button
                  type="button"
                  onClick={handleTimeoutB}
                  className="app-button secondary"
                >
                  Timeout {teamB}
                </button>
              </div>

              <div
                style={{
                  marginTop: "18px",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <span className="info-chip">{teamA} TO: {timeoutsA}</span>
                <span className="info-chip">{teamB} TO: {timeoutsB}</span>
              </div>
            </div>

            <div className="panel live-card">
              <div className="live-card-header">
                <div>
                  <h2 className="live-card-title">Sprint Start</h2>
                  <p className="live-card-subtitle">
                    Select which team wins the first possession.
                  </p>
                </div>
              </div>

              <div className="possession-grid">
                <div className="possession-card">
                  <div className="possession-team">{teamA}</div>
                  <button
                    type="button"
                    onClick={handleFirstPossessionA}
                    disabled={!!firstPossession}
                    className="app-button primary"
                    style={{ width: "100%" }}
                  >
                    Select Team
                  </button>
                </div>

                <div className="possession-card">
                  <div className="possession-team">{teamB}</div>
                  <button
                    type="button"
                    onClick={handleFirstPossessionB}
                    disabled={!!firstPossession}
                    className="app-button primary"
                    style={{ width: "100%" }}
                  >
                    Select Team
                  </button>
                </div>
              </div>

              {firstPossession && (
                <div className="possession-winner">
                  First possession: {firstPossession}
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={handleEndMatch}
              className="app-button primary"
            >
              End Match & Save
            </button>
          </div>

          <EventList events={eventListItems} />
        </div>

        <div className="live-side-column">
          <PlayerFouls
            teamName={teamB}
            players={playersB}
            onAddFoul={handlePlayerFoulB}
            onRemoveFoul={handleRemoveFoulB}
            onAddGoal={handleAddGoalB}
            onRemoveGoal={handleRemoveGoalB}
            onAddYellow={handleAddYellowB}
            onRemoveYellow={handleRemoveYellowB}
            onAddRed={handleAddRedB}
            onRemoveRed={handleRemoveRedB}
            variant="blue"
          />
        </div>
      </div>
    </AppLayout>
  );
}

export default LiveMatch;