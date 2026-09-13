const API_BASE = 'http://localhost:5001/api';

export async function apiGet(path, fallback = []) {
  try {
    const r = await fetch(`${API_BASE}${path}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch (e) {
    console.error(`GET ${path} failed`, e);
    return fallback;
  }
}

export async function apiRequest(path, options = {}) {
  const r = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!r.ok) {
    throw new Error(await r.text() || `HTTP ${r.status}`);
  }

  return r.status === 204 ? null : r.json();
}
