const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;

export async function api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
        ...options.headers,
      },
    }
  );

  const data = await response.json();
  console.log(response.status)
  if (
    (response.status === 401 || response.status === 500) &&
    endpoint !== "/auth/refresh"
  ) {
    if (token && !isRefreshing) {
      try {
        isRefreshing = true;

        const refreshResponse =
          await fetch(
            `${API_URL}/auth/refresh`,
            {
              method: "POST",
              headers: {
                Accept:
                  "application/json",
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                refreshToken: token,
              }),
            }
          );

        const refreshData =
          await refreshResponse.json();

        if (
          refreshResponse.ok &&
          refreshData.success
        ) {
          localStorage.setItem(
            "token",
            refreshData.data.token
          );

          // retry original request
          return api<T>(
            endpoint,
            options
          );
        }
      } catch (error) {
        console.error(
          "Refresh failed",
          error
        );
      } finally {
        isRefreshing = false;
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  }

  if (!response.ok) {
    throw data;
  }

  return data;
}