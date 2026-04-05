function ScoreBoard({
  teamA,
  teamB,
  scoreA,
  scoreB,
  period,
  timeoutsA,
  timeoutsB,
  isMatchRunning,
  firstPossession,
  matchSeconds,
}) {
  const formatMiniTime = () => {
    const minutes = Math.floor(matchSeconds / 60);
    const remainingSeconds = matchSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="panel scoreboard-shell">
      <div className="scoreboard-top">
        <div className="team-panel red">
          <div className="team-name">{teamA}</div>
          <div className="team-to">
            TO <span className="timeout-pill">{timeoutsA}</span>
          </div>
        </div>

        <div className="score-center">
          <div>
            <div className="score-period">Period {period}</div>
            <div className="score-main">
              {scoreA} : {scoreB}
            </div>
            <div className="score-mini">
              {firstPossession ? `First possession: ${firstPossession}` : "( no possession selected )"}
            </div>
            <div className="score-status">
              {formatMiniTime()} - {isMatchRunning ? "RUNNING" : "PAUSED"}
            </div>
          </div>
        </div>

        <div className="team-panel blue">
          <div className="team-name">{teamB}</div>
          <div className="team-to">
            TO <span className="timeout-pill">{timeoutsB}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;