export interface Planet {
  name: string;
  population: string;
  climate: string;
  films: string[];
  residents: string[];
  url: string;
}

export interface Character {
  name: string;
  homeworld: string;
  starships: string[];
  films: string[];
  url: string;
}

export interface Film {
  title: string;
  url: string;
}

export interface Starship {
  name: string;
  model: string;
  crew: string;
  films: string[];
  url: string;
}

export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}