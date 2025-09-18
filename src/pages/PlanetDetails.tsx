import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Planet } from './types';

export default function PlanetDetails() {
    const [planet, setPlanet] = useState<Planet | null>(null);
    const [loading, setLoading] = useState(true);
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
            <ul>
                {planet.films.map((film, i) => <li key={i}>{film || 'Unknown'}</li>)}
            </ul>

            <h3>Residents</h3>
            <ul>
                {planet.residents.map((resident, i) => <li key={i}>{resident || 'Unknown'}</li>)}
            </ul>
        </div>
    );
}
