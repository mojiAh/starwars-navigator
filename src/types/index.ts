export interface Planet {
    name: string;
    population: string;
    climate: string;
    films: string[];
    residents: string[];
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    created: string;
    edited: string;
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