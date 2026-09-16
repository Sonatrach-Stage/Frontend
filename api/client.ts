import { getAccessToken } from '../lib/auth';

const API_URL = 'https://stagelink-lq6s.onrender.com';

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = getAccessToken();

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}), // un header passé explicitement écrase le token auto
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
}