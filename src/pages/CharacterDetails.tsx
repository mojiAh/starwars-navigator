import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useCharacterDetails } from '../hooks/useSwapi';
import { fetchJson } from '../api/swapi';
import type { Starship, Film, Planet } from '../types';

export default function CharacterDetails() {
    const navigate = useNavigate();

    const [starshipsData, setStarshipssData] = useState<(Starship | { error: true })[]>([]);
    const [filmsData, setFilmsData] = useState<(Film | { error: true })[]>([]);
    const [planetData, setPlanetData] = useState<Planet | { error: true } | null>(null);

    const { id } = useParams();
    const { data: character, loading, error } = useCharacterDetails(id);


    useEffect(() => {
        let alive = true;
        if (!character) return;

        if (character.homeworld) {
            fetchJson(character.homeworld)
                .then((data) => {
                    if (alive) setPlanetData(data as Planet);
                })
                .catch(() => {
                    if (alive) setPlanetData({ error: true });
                });
        }

        Promise.all(
            character.starships.map((url) =>
                (fetchJson(url).catch(() => ({ error: true })) as Promise<Starship | { error: true }>)))
            .then((arr) => {
                if (alive) setStarshipssData(arr);
            });

        Promise.all(
            character.films.map((url) =>
                (fetchJson(url).catch(() => ({ error: true })) as Promise<Film | { error: true }>)))
            .then((arr) => {
                if (alive) setFilmsData(arr);
            });

        return () => {
            alive = false;
        };
    }, [character]);

    if (loading) return <div>Loading character…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!character) return <div>No character found</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
            <h2>{character.name}</h2>

            <div><strong>Homeworld:</strong>
                {!planetData ? "Loading…" : "error" in planetData ? "Error loading planet" :
                    (<Link to={`/planets/${planetData.url.split("/").filter(Boolean).pop()}`}>
                        {planetData.name}
                    </Link>)
                }
            </div>

            <h3>Starships</h3>
            {
                character.starships.length === 0 ? (
                    <div>No known starships</div>
                ) :
                    starshipsData.length === 0 ? <div>Loading Starships…</div> :
                        <ul>
                            {starshipsData.map((starship, i) =>
                                "error" in starship ? (
                                    <li key={i}>Error loading starship</li>
                                ) : (
                                    <li key={i}>
                                        <Link to={`/starships/${starship.url.split("/").filter(Boolean).pop()}`}>
                                            {starship.name}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
            }

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
