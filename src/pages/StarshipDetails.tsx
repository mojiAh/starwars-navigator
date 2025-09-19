import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useStarshipDetails } from '../hooks/useSwapi';
import { fetchJson } from '../api/swapi';
import type { Film } from '../types';

export default function StarshipDetails() {
    const navigate = useNavigate();

    const [filmsData, setFilmsData] = useState<(Film | { error: true })[]>([]);

    const { id } = useParams();
    const { data: starship, loading, error } = useStarshipDetails(id);


    useEffect(() => {
        let alive = true;
        if (!starship) return;

        Promise.all(
            starship.films.map((url) =>
                (fetchJson(url).catch(() => ({ error: true })) as Promise<Film | { error: true }>)))
            .then((arr) => {
                if (alive) setFilmsData(arr);
            });

        return () => {
            alive = false;
        };
    }, [starship]);

    if (loading) return <div>Loading starship…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!starship) return <div>No Starship found</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
            <h2>{starship.name}</h2>
            <div><strong>Model:</strong> {starship.model}</div>
            <div><strong>Crew:</strong> {starship.crew}</div>

            <h3>Movies</h3>
            {filmsData.length === 0 ? <div>Loading movies…</div> :
                <ul>
                    {filmsData.map((film, i) =>
                        "error" in film ? (
                            <li key={i}>Error loading movie</li>
                        ) : (
                            <li key={i}>{film.title}</li>
                        )
                    )}
                </ul>}
        </div>
    );
}
