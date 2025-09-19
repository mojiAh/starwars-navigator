import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { fetchJson } from '../api/swapi';
import { useCharacters } from '../hooks/useSwapi';

import type { Planet } from '../types';

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
    const [params, setParams] = useSearchParams();
    const page = parseInt(params.get("page") || "1", 10);

    const { data, loading, error } = useCharacters({ page });
    let results = data?.results || [];

    const goPage = (newPage: number) => {
        setParams({ page: String(newPage) });
    };

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
            <div style={{ marginTop: 12 }}>
                <button onClick={() => goPage(Math.max(1, page - 1))} disabled={!data?.previous}>
                    Previous
                </button>
                <span style={{ margin: "0 8px" }}>Page {page}</span>
                <button onClick={() => goPage(page + 1)} disabled={!data?.next}>
                    Next
                </button>
            </div>
        </div>
    );
}
