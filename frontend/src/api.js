export const apiFetch = async (url, options = {}, navigate) => {
  const response = await fetch(url, {
    credentials: "include",
    ...options,
  });

  if (response.status === 403) {
    navigate("/login");
    throw new Error("Unauthorized");
  }

  return response;
};