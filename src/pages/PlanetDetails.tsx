import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { usePlanetDetails } from '../hooks/useSwapi';
import { fetchJson } from '../api/swapi';
import type { Character, Film } from '../types';

export default function PlanetDetails() {
    const navigate = useNavigate();

    const [residentsData, setResidentsData] = useState<(Character | { error: true })[]>([]);
    const [filmsData, setFilmsData] = useState<(Film | { error: true })[]>([]);

    const { id } = useParams();
    const { data: planet, loading, error } = usePlanetDetails(id);


    useEffect(() => {
        let alive = true;
        if (!planet) return;

        Promise.all(
            planet.residents.map((url) =>
                (fetchJson(url).catch(() => ({ error: true })) as Promise<Character | { error: true }>)))
            .then((arr) => {
                if (alive) setResidentsData(arr);
            });

        Promise.all(
            planet.films.map((url) =>
                (fetchJson(url).catch(() => ({ error: true })) as Promise<Film | { error: true }>)))
            .then((arr) => {
                if (alive) setFilmsData(arr);
            });

        return () => {
            alive = false;
        };
    }, [planet]);

    if (loading) return <div>Loading planet…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!planet) return <div>No planet found</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
            <h2>{planet.name}</h2>
            <div><strong>Population:</strong> {planet.population}</div>
            <div><strong>Climate:</strong> {planet.climate}</div>

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

            <h3>Residents</h3>
            {
                planet.residents.length === 0 ? (
                    <div>No known residents</div>
                ) :
                    residentsData.length === 0 ? <div>Loading Residents…</div> :
                        <ul>
                            {residentsData.map((resident, i) =>
                                "error" in resident ? (
                                    <li key={i}>Error loading resident</li>
                                ) : (
                                    <li key={i}>
                                        <Link to={`/characters/${resident.url.split("/").filter(Boolean).pop()}`}>
                                            {resident.name}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
            }
        </div>
    );
}
