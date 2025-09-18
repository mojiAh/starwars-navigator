export interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[]; // array of People resource URLs
    films: string[];     // array of Film resource URLs
    created: string;     // ISO 8601 date-time
    edited: string;      // ISO 8601 date-time
    url: string;         // resource URI
}