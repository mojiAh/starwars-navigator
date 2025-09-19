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

export async function getPlanets() {
  return fetchJson<SwapiResponse<Planet>>('https://swapi.py4e.com/api/planets/');
}

export async function getCharacters() {
  return fetchJson<SwapiResponse<Character>>('https://swapi.py4e.com/api/people/');
}

export async function getStarships() {
  return fetchJson<SwapiResponse<Starship>>('https://swapi.py4e.com/api/starships/');
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
