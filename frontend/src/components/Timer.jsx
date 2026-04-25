function Timer({
  seconds,
  onIncrease,
  onDecrease,
  onStartMatch,
  onPauseMatch,
  onResetMatch,
}) {
  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="timer-shell">
      <div className="timer-readout-row">
        <div className="big-readout">{formatTime()}</div>

        <div className="readout-side">
        <button
          type="button"
          onClick={onIncrease}
          disabled={seconds >= 8 * 60}
        >
          ▲
        </button>
          <div>T</div>
          <button type="button" onClick={onDecrease}>
            ▼
          </button>
        </div>
      </div>

      <div className="control-row">
        <button type="button" onClick={onStartMatch} className="app-button primary">
          Play
        </button>
        <button type="button" onClick={onPauseMatch} className="app-button secondary">
          Pause
        </button>
        <button type="button" onClick={onResetMatch} className="app-button secondary">
          Reset
        </button>
      </div>
    </div>
  );
}

export default Timer;