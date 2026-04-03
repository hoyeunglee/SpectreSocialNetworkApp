const API_BASE = import.meta.env.VITE_API_BASE as string;

let token: string | null = null;

export function setToken(t: string | null) {
  token = t;
}

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {})
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),

  createPost: (user_id: string, body: string, visibility: string) =>
    request("/posts/create", {
      method: "POST",
      body: JSON.stringify({ user_id, body, visibility })
    }),

  comment: (user_id: string, content_id: string, body: string) =>
    request("/comments/create", {
      method: "POST",
      body: JSON.stringify({ user_id, content_id, body })
    }),

  addFriend: (user_id: string, friend_id: string) =>
    request("/friends/add", {
      method: "POST",
      body: JSON.stringify({ user_id, friend_id })
    }),

  getAds: (region: string) =>
    request("/ads/list", {
      method: "POST",
      body: JSON.stringify({ region })
    })
};