import type { Planet, Character, Starship, SwapiResponse } from '../types';

const SWAPI_BASE_URL = 'https://swapi.py4e.com/api';

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
  return fetchJson<SwapiResponse<Planet>>(`${SWAPI_BASE_URL}/planets/?${q.toString()}`);
}

export async function getCharacters({ page = 1, search = "" }: { page?: number; search?: string }) {
  const q = new URLSearchParams();
  if (search) q.set("search", search);
  q.set("page", page.toString());
  return fetchJson<SwapiResponse<Character>>(`${SWAPI_BASE_URL}/people/?${q.toString()}`);
}

export async function getStarships({ page = 1 }: { page?: number }) {
  return fetchJson<SwapiResponse<Starship>>(`${SWAPI_BASE_URL}/starships/${page > 1 ? `?page=${page}` : ''}`);
}

export async function getPlanetById(id: string) {
  const url = `${SWAPI_BASE_URL}/planets/${id}/`;
  return fetchJson<Planet>(url);
}

export async function getCharacterById(id: string) {
  const url = `${SWAPI_BASE_URL}/people/${id}/`;
  return fetchJson<Character>(url);
}

export async function getStarshipById(id: string) {
  const url = `${SWAPI_BASE_URL}/starships/${id}/`;
  return fetchJson<Starship>(url);
}
