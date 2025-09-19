import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Starship } from '../types';


export default function Starships() {

    const [data, setData] = useState<{ results: Starship[], count: number, next: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchStarships() {
            try {
                setLoading(true);
                const response = await fetch('https://swapi.py4e.com/api/starships/');
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
        fetchStarships();
    }, []);
    let results = data?.results || [];

    return (
        <div>
            <h1>Starships</h1>
            {loading && <div>Loading Straships…</div>}
            {error && <div>Error loading: {error.message}</div>}
            {results.map(s => {
                const id = s.url.split('/').filter(Boolean).pop();
                return (
                    <div key={s.name} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
                        <Link to={`/starships/${id}`}><strong>{s.name}</strong></Link>
                        <div>Model: {s.model}</div>
                    </div>
                );
            })}
        </div>
    );
}
