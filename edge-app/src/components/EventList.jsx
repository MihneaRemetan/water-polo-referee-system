function EventList({ events }) {
  return (
    <div className="panel live-card">
      <div className="live-card-header">
        <div>
          <h2 className="live-card-title">Event List</h2>
          <p className="live-card-subtitle">
            Match actions are logged here in chronological order.
          </p>
        </div>

        <span className="info-chip">{events.length} events</span>
      </div>

      {events.length === 0 ? (
        <div className="event-item">No events yet.</div>
      ) : (
        <div className="event-list">
          {events.map((event, index) => (
            <div key={index} className="event-item">
              {index + 1}. {event}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;