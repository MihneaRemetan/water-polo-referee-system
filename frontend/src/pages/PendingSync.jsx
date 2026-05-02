import { useEffect, useState } from "react";
import AppLayout from "../layout/AppLayout";
import { getOfflineMatches } from "../services/offlineMatchStore";
import { syncPendingMatches } from "../services/syncService";

function PendingSync() {
  const [pendingMatches, setPendingMatches] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [message, setMessage] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [cachedTeams, setCachedTeams] = useState([]);

  const loadCachedTeams = () => {
    try {
      const rawTeams = localStorage.getItem("offlineTeams");

      if (!rawTeams) {
        setCachedTeams([]);
        return;
      }

      const parsedTeams = JSON.parse(rawTeams);

      if (Array.isArray(parsedTeams)) {
        setCachedTeams(parsedTeams);
      } else {
        setCachedTeams([]);
      }
    } catch (error) {
      console.error("Could not load cached teams:", error);
      setCachedTeams([]);
    }
  };

  const getTeamNameById = (teamId, fallbackName) => {
    if (fallbackName) {
      return fallbackName;
    }

    const team = cachedTeams.find((cachedTeam) => {
      const cachedTeamId =
        cachedTeam.id ??
        cachedTeam.teamId ??
        cachedTeam.team_id;

      return String(cachedTeamId) === String(teamId);
    });

    return team?.name || team?.teamName || team?.shortName || "Unknown Team";
  };

  const loadPendingMatches = () => {
    const matches = getOfflineMatches().filter(
      (match) => match.syncStatus === "PENDING"
    );

    setPendingMatches(matches);
  };

  useEffect(() => {
    loadCachedTeams();
    loadPendingMatches();

    const handleOnline = () => {
      setIsOnline(true);
      loadCachedTeams();
      loadPendingMatches();
      setMessage("You are online. Press Sync Now to synchronize pending matches.");
    };

    const handleOffline = () => {
      setIsOnline(false);
      loadCachedTeams();
      loadPendingMatches();
      setMessage("You are offline. Pending matches cannot be synchronized yet.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleSyncNow = async () => {
    if (!navigator.onLine) {
      setMessage("You are offline. Please reconnect before syncing.");
      return;
    }

    const pendingBeforeSync = getOfflineMatches().filter(
      (match) => match.syncStatus === "PENDING"
    );

    if (pendingBeforeSync.length === 0) {
      setMessage("There are no pending offline matches to sync.");
      return;
    }

    try {
      setIsSyncing(true);
      setMessage("");

      const result = await syncPendingMatches();

      loadPendingMatches();

      if (result.syncedCount > 0) {
        setMessage(`${result.syncedCount} offline match(es) synced successfully.`);
      } else if (result.failedCount > 0) {
        setMessage("Sync failed. Please make sure the backend is running.");
      } else {
        setMessage("There are no pending offline matches to sync.");
      }
    } catch (error) {
      console.error("Sync error:", error);
      setMessage("Sync failed. Please make sure the backend is running.");
    } finally {
      setIsSyncing(false);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    try {
      return new Date(dateValue).toLocaleString();
    } catch {
      return "-";
    }
  };

  return (
    <AppLayout>
      <div className="panel" style={{ padding: "22px", marginBottom: "20px" }}>
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
            <h1 className="section-title">Pending Sync</h1>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Offline matches saved locally. They will be synchronized with the
              database only when you press Sync Now.
            </p>
          </div>

          <button
            type="button"
            className="app-button"
            onClick={handleSyncNow}
            disabled={!isOnline || isSyncing}
          >
            {isSyncing ? "Syncing..." : "Sync Now"}
          </button>
        </div>

        <div
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            borderRadius: "14px",
            background: isOnline
              ? "rgba(60, 180, 120, 0.14)"
              : "rgba(255, 190, 80, 0.14)",
            color: isOnline ? "#b9ffd8" : "#ffe1a8",
            fontWeight: 700,
          }}
        >
          Status: {isOnline ? "Online" : "Offline"} · Pending matches:{" "}
          {pendingMatches.length}
        </div>

        {message && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px 14px",
              borderRadius: "14px",
              background: "rgba(80, 170, 255, 0.14)",
              color: "#bfe4ff",
              fontWeight: 700,
            }}
          >
            {message}
          </div>
        )}
      </div>

      {pendingMatches.length === 0 ? (
        <div className="panel" style={{ padding: "22px" }}>
          <h2 style={{ marginTop: 0 }}>No pending offline matches</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            All offline matches have already been synchronized.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {pendingMatches.map((match) => (
            <div
              key={match.localId}
              className="panel"
              style={{ padding: "18px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0 }}>
                  {getTeamNameById(match.teamAId, match.teamAName)} vs{" "}
                  {getTeamNameById(match.teamBId, match.teamBName)}
                </h3>

                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background: "rgba(255, 190, 80, 0.15)",
                    color: "#ffe1a8",
                    fontWeight: 800,
                    fontSize: "13px",
                  }}
                >
                  {match.syncStatus}
                </span>
              </div>

              <div style={{ marginTop: "14px", lineHeight: 1.8 }}>
                <div>
                  <strong>Score:</strong> {match.scoreA ?? 0} -{" "}
                  {match.scoreB ?? 0}
                </div>

                <div>
                  <strong>Status:</strong> {match.status || "-"}
                </div>

                <div>
                  <strong>Saved locally:</strong>{" "}
                  {formatDate(match.endedAt || match.startedAt || match.localId)}
                </div>

                <div>
                  <strong>Events:</strong>{" "}
                  {Array.isArray(match.events) ? match.events.length : 0}
                </div>

                <div>
                  <strong>Local ID:</strong> {match.localId}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}

export default PendingSync;