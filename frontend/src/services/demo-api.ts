const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1/personal';

export type DemoSession = { access_token: string; user: { email: string; display_name: string } };

export async function signIn(email: string, password: string): Promise<DemoSession> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Those demo credentials did not match.');
  return response.json();
}

export async function api<T>(path: string, token: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.detail || 'The development service could not complete that request.');
  }
  return response.status === 204 ? (undefined as T) : response.json();
}
