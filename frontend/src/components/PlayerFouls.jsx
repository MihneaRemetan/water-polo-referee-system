function PlayerFouls({
  teamName,
  players,
  onAddFoul,
  onRemoveFoul,
  onAddGoal,
  onRemoveGoal,
  onAddYellow,
  onRemoveYellow,
  onAddRed,
  onRemoveRed,
  variant = "blue",
}) {
  const teamChipClass =
    variant === "red" ? "team-color-red" : "team-color-blue";

  return (
    <div className="panel live-card">
      <div className="live-card-header">
        <div>
          <h2 className="live-card-title">{teamName} Players</h2>
          <p className="live-card-subtitle">
            Track goals, eliminations, yellow cards, red cards, and player
            status.
          </p>
        </div>

        <span className={`info-chip ${teamChipClass}`}>
          {players.length} players
        </span>
      </div>

      <div className="players-table">
        {players.map((player) => {
          const isOut = player.out;
          const isBlocked =
            player.out || player.fouls >= 3 || player.redCards === 1;
          const playerName = player.name?.trim()
            ? player.name
            : "Unnamed player";

          return (
            <div
              key={player.number}
              className={`player-card ${isOut ? "player-card-out" : ""}`}
            >
              <div className="player-tag">
                <span className="player-number">#{player.number}</span>
                <span className="player-name">{playerName}</span>
              </div>

              <div className="foul-info">
                <div className="foul-dots">
                  {[1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className={`foul-dot ${
                        player.fouls >= dot ? "active" : ""
                      }`}
                    />
                  ))}
                </div>

                <span className="info-chip">Fouls: {player.fouls}</span>
                <span className="info-chip goal-chip">Goals: {player.goals}</span>
                <span className="info-chip yellow-chip">
                  Yellow: {player.yellowCards}
                </span>
                <span className="info-chip red-chip">Red: {player.redCards}</span>

                {isOut && <span className="out-badge">OUT</span>}
              </div>

              <div className="player-actions-stack">
                <div className="player-actions">
                  <button
                    type="button"
                    onClick={() => onAddFoul(player.number)}
                    disabled={isOut}
                    className="mini-btn add"
                    title="Add foul"
                  >
                    +F
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFoul(player.number)}
                    disabled={player.fouls === 0}
                    className="mini-btn remove"
                    title="Remove foul"
                  >
                    −F
                  </button>
                </div>

                <div className="player-actions">
                  <button
                    type="button"
                    onClick={() => onAddGoal(player.number)}
                    disabled={isBlocked}
                    className="mini-btn goal-add"
                    title="Add goal"
                  >
                    +G
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveGoal(player.number)}
                    disabled={player.goals === 0}
                    className="mini-btn goal-remove"
                    title="Remove goal"
                  >
                    −G
                  </button>
                </div>

                <div className="player-actions">
                  <button
                    type="button"
                    onClick={() => onAddYellow(player.number)}
                    disabled={player.yellowCards === 1 || isBlocked}
                    className="mini-btn yellow-add"
                    title="Add yellow card"
                  >
                    +Y
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveYellow(player.number)}
                    disabled={player.yellowCards === 0}
                    className="mini-btn yellow-remove"
                    title="Remove yellow card"
                  >
                    −Y
                  </button>
                </div>

                <div className="player-actions">
                  <button
                    type="button"
                    onClick={() => onAddRed(player.number)}
                    disabled={player.redCards === 1}
                    className="mini-btn red-add"
                    title="Add red card"
                  >
                    +R
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveRed(player.number)}
                    disabled={player.redCards === 0}
                    className="mini-btn red-remove"
                    title="Remove red card"
                  >
                    −R
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlayerFouls;