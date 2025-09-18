import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJson } from '../api/swapi';
import type { Planet, Character, Film } from '../types';

export default function PlanetDetails() {
    const [planet, setPlanet] = useState<Planet | null>(null);
    const [loading, setLoading] = useState(true);
    const [residentsData, setResidentsData] = useState<(Character | { error: true })[]>([]);
    const [filmsData, setFilmsData] = useState<(Film | { error: true })[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const { id } = useParams();
    const planetUrl = `https://swapi.py4e.com/api/planets/${id}/`;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPlanetDetails() {
            try {
                setLoading(true);
                const response = await fetch(planetUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setPlanet(json);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        }
        fetchPlanetDetails();
    }, []);

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
            {residentsData.length === 0 ? <div>Loading Residents…</div> :
                <ul>
                    {residentsData.map((resident, i) =>
                        "error" in resident ? (
                        <li key={i}>Error loading resident</li>
                        ) : (
                        <li key={i}>{resident.name}</li>
                        )
                    )}
                </ul>}
        </div>
    );
}
