import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Planet } from './types';

export default function Planets() {
    
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
        const id = p.url.split('/').filter(Boolean).pop();
        return (
          <div key={p.name} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <Link to={`/planets/${id}`}><strong>{p.name}</strong></Link>
            <div>Population: {p.population}</div>
          </div>
        );
      })}  
    </div>
  );
}
