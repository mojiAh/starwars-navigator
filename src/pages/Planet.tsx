import { useState, useEffect } from 'react';

export default function Planets() {
    interface Planet {
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

    const [data, setData] = useState<{ results: Planet[], count: number, next: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchPlanets() {
            try {
                setLoading(true);
                const response = await fetch('https://swapi.py4e.com/api/planets/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchPlanets();
    }, []);
  let results = data?.results || [];

  return (
    <div>
      <h1>Planets</h1>
      {loading && <div>Loading planets…</div>}
      {error && <div>Error loading: {error.message}</div>}
      {results.map(p => {
        return (
          <div key={p.name} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <div>{p.name}</div>
            <div>Population: {p.population}</div>
          </div>
        );
      })}  
    </div>
  );
}
