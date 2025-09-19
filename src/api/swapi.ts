const simpleCache = new Map<string, any>();

export async function fetchJson<T>(url: string): Promise<T> {
  if (simpleCache.has(url)) return simpleCache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: T = await res.json();
  simpleCache.set(url, data);
  return data;
}

export function clearCache() {
  simpleCache.clear();
}
