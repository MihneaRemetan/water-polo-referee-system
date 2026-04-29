const STORAGE_KEY = "offlineMatches";

export const saveMatchOffline = (match) => {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  existing.push({
    ...match,
    localId: Date.now(),
    syncStatus: "PENDING",
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const syncOfflineMatches = async () => {
  const matches = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (!matches.length) return;

  let changed = false;

  for (const match of matches) {
    if (match.syncStatus !== "PENDING") continue;

    try {
      const { localId, syncStatus, ...payload } = match;

      const res = await fetch("http://localhost:8080/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        match.syncStatus = "SYNCED";
        changed = true;
      }
    } catch (err) {
      console.error("Sync failed:", err);
      return;
    }
  }

  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  }
};

export const getOfflineMatches = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const clearOfflineMatch = (localId) => {
  const existing = getOfflineMatches().filter(m => m.localId !== localId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};