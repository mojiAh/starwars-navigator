import { Link, useSearchParams } from 'react-router-dom';

import { Pagination } from '../components';
import { useStarships } from '../hooks';

export default function Starships() {
    const [params, setParams] = useSearchParams();
    const page = parseInt(params.get("page") || "1", 10);

    const { data, loading, error } = useStarships({ page });
    let results = data?.results || [];

    const goPage = (newPage: number) => {
        setParams({ page: String(newPage) });
    };

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
            <Pagination
                page={page}
                hasPrev={!!data?.previous}
                hasNext={!!data?.next}
                onPageChange={goPage}
            />
        </div>
    );
}
