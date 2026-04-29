import { getOfflineMatches, clearOfflineMatch } from "./offlineMatchStore";

export const syncPendingMatches = async () => {
  const matches = getOfflineMatches();

  if (!matches || matches.length === 0) {
    return;
  }

  const pendingMatches = matches.filter(
    (match) => match.syncStatus === "PENDING"
  );

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

      if (response.ok) {
        clearOfflineMatch(localId);
        console.log("Synced match:", localId);
      } else {
        const text = await response.text();
        console.error("Sync failed:", response.status, text);
      }
    } catch (error) {
      console.log("Still offline or backend unavailable:", error);
      return;
    }
  }
};