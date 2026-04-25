function ShotClock({
  seconds,
  onIncrease,
  onDecrease,
  onResetShotClock,
  onSetTo18,
}) {
  return (
    <div className="panel live-card">
      <div className="live-card-header">
        <div>
          <h2 className="live-card-title">Shot Clock</h2>
          <p className="live-card-subtitle">
            Reset to 28 or set directly to 18 seconds.
          </p>
        </div>
      </div>

      <div className="shotclock-shell">
        <div className="shotclock-readout-row">
          <div className="big-readout">
            {seconds.toString().padStart(2, "0")}
          </div>

          <div className="readout-side">
            <button type="button" onClick={onIncrease}>
              ▲
            </button>
            <div>SC</div>
            <button type="button" onClick={onDecrease}>
              ▼
            </button>
          </div>
        </div>

        <div className="control-row">
          <button
            type="button"
            onClick={onResetShotClock}
            className="app-button primary"
          >
            Reset to 28
          </button>

          <button
            type="button"
            onClick={onSetTo18}
            className="app-button secondary"
          >
            Set to 18
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShotClock;