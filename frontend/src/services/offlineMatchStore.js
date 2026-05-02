const STORAGE_KEY = "offlineMatches";

export const saveMatchOffline = (match) => {
  const existing = getOfflineMatches();

  const offlineMatch = {
    ...match,
    localId: Date.now(),
    syncStatus: "PENDING",
  };

  const updatedMatches = [...existing, offlineMatch];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMatches));
};

export const getOfflineMatches = () => {
  try {
    const rawMatches = localStorage.getItem(STORAGE_KEY);

    if (!rawMatches) {
      return [];
    }

    const parsedMatches = JSON.parse(rawMatches);

    if (Array.isArray(parsedMatches)) {
      return parsedMatches;
    }

    return [];
  } catch (error) {
    console.error("Could not load offline matches:", error);
    return [];
  }
};

export const clearOfflineMatch = (localId) => {
  const existing = getOfflineMatches();

  const updatedMatches = existing.filter(
    (match) => String(match.localId) !== String(localId)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMatches));
};

export const clearAllOfflineMatches = () => {
  localStorage.removeItem(STORAGE_KEY);
};