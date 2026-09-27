import { getAccessToken, getRefreshToken, saveTokens, clearCurrentUser } from '../lib/auth';

const API_URL = 'https://stagelink-lq6s.onrender.com';

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    const data = await response.json();
    if (!response.ok) return false;

    saveTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

async function doFetch(endpoint: string, options: RequestInit) {
  const token = getAccessToken();
  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };
  return fetch(`${API_URL}${endpoint}`, { ...options, headers });
}

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  let response = await doFetch(endpoint, options);

  // Ne tente le rafraîchissement que sur les routes protégées, jamais sur /auth/login ou /auth/refresh-token lui-même
  const isAuthRoute = endpoint.startsWith('/auth/login') || endpoint.startsWith('/auth/refresh-token');

  if (response.status === 401 && !isAuthRoute) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = tryRefreshToken().finally(() => {
        isRefreshing = false;
      });
    }

    const refreshed = await refreshPromise;

    if (refreshed) {
      response = await doFetch(endpoint, options);
    } else {
      clearCurrentUser();
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
}