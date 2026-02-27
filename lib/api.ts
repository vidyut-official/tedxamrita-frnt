const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access");
}

function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh");
}

async function refreshAccessToken(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    localStorage.setItem("access", data.access);
    return data.access;
  } catch {
    return null;
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  let accessToken = getAccessToken();

  const makeRequest = async (token?: string) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  let res = await makeRequest(accessToken || undefined);

  // 🔁 If access token expired → refresh once
  if (res.status === 401 && getRefreshToken()) {
    const newAccess = await refreshAccessToken();

    if (newAccess) {
      res = await makeRequest(newAccess);
    } else {
      // refresh failed → logout
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (data?.error) throw new Error(data.error);
    if (data?.detail) throw new Error(data.detail);

    if (typeof data === "object") {
      const firstError = Object.values(data)[0];
      if (Array.isArray(firstError)) {
        throw new Error(firstError[0] as string);
      }
    }

    throw new Error(`API Error: ${res.status}`);
  }

  return data;
}