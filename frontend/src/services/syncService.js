import { getOfflineMatches, clearOfflineMatch } from "./offlineMatchStore";

export const syncPendingMatches = async () => {
  if (!navigator.onLine) {
    return {
      syncedCount: 0,
      failedCount: 0,
      pendingCount: getOfflineMatches().filter(
        (match) => match.syncStatus === "PENDING"
      ).length,
    };
  }

  const matches = getOfflineMatches();

  if (!matches || matches.length === 0) {
    return {
      syncedCount: 0,
      failedCount: 0,
      pendingCount: 0,
    };
  }

  const pendingMatches = matches.filter(
    (match) => match.syncStatus === "PENDING"
  );

  let syncedCount = 0;
  let failedCount = 0;

  for (const match of pendingMatches) {
    try {
      const { localId, syncStatus, ...payload } = match;

      const response = await fetch("http://localhost:8080/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Sync failed:", response.status, text);
        failedCount++;
        continue;
      }

      clearOfflineMatch(localId);
      syncedCount++;
      console.log("Synced match:", localId);
    } catch (error) {
      console.error("Backend unavailable or sync error:", error);
      failedCount++;
      break;
    }
  }

  const remainingPendingCount = getOfflineMatches().filter(
    (match) => match.syncStatus === "PENDING"
  ).length;

  return {
    syncedCount,
    failedCount,
    pendingCount: remainingPendingCount,
  };
};