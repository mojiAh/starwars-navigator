import { Link } from 'react-router-dom';

import { useStarships } from '../hooks/useSwapi';

export default function Starships() {
    const { data, loading, error } = useStarships();
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
