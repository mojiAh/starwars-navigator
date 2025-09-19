import type { Planet, Character, Starship, SwapiResponse } from '../types';

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

export async function getPlanets({ page = 1, search = "" }: { page?: number; search?: string }) {
  const q = new URLSearchParams();
  if (search) q.set("search", search);
  q.set("page", page.toString());
  return fetchJson<SwapiResponse<Planet>>(`https://swapi.py4e.com/api/planets/?${q.toString()}`);
}

export async function getCharacters({ page = 1, search = "" }: { page?: number; search?: string }) {
  const q = new URLSearchParams();
  if (search) q.set("search", search);
  q.set("page", page.toString());
  return fetchJson<SwapiResponse<Character>>(`https://swapi.py4e.com/api/people/?${q.toString()}`);
}

export async function getStarships({ page = 1 }: { page?: number }) {
  return fetchJson<SwapiResponse<Starship>>(`https://swapi.py4e.com/api/starships/${page > 1 ? `?page=${page}` : ''}`);
}

export async function getPlanetByUrl(url: string) {
  return fetchJson<Planet>(url);
}

export async function getCharacterByUrl(url: string) {
  return fetchJson<Character>(url);
}

export async function getStarshipByUrl(url: string) {
  return fetchJson<Starship>(url);
}
