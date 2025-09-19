import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Character, Planet } from '../types';
import { fetchJson } from '../api/swapi';

const PlanetData = ({ homeworld }: { homeworld: string }) => {
    const [planet, setPlanet] = useState<Planet | { error: true } | null>(null);
    useEffect(() => {
        if (!homeworld) return;

        fetchJson(homeworld)
            .then((data) => {
                setPlanet(data as Planet);
            })
            .catch(() => {
                setPlanet({ error: true });
            });
    }, []);
    return <div><strong>Homeworld:</strong>
        {!planet ? "Loading…" : "error" in planet ? "Error loading planet" :
            (<Link to={`/planets/${planet.url.split("/").filter(Boolean).pop()}`}>
                {planet.name}
            </Link>)
        }
    </div>
}

export default function Characters() {

    const [data, setData] = useState<{ results: Character[], count: number, next: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchCharacters() {
            try {
                setLoading(true);
                const response = await fetch('https://swapi.py4e.com/api/people/');
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
        fetchCharacters();
    }, []);
    let results = data?.results || [];

    return (
        <div>
            <h1>Characters</h1>
            {loading && <div>Loading Characters…</div>}
            {error && <div>Error loading: {error.message}</div>}
            {results.map(c => {
                const id = c.url.split('/').filter(Boolean).pop();
                return (
                    <div key={c.name} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
                        <Link to={`/characters/${id}`}><strong>{c.name}</strong></Link>
                        <PlanetData homeworld={c.homeworld} />
                    </div>
                );
            })}
        </div>
    );
}
