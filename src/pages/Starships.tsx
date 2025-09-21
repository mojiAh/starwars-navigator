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
        <div className="space-y-3">
            <h1 className="text-xl font-semibold text-gray-800">Starships</h1>
            {loading && (
                <div className="text-sm text-gray-600">Loading Straships…</div>
            )}
            {error && (
                <div className="text-sm text-red-600">
                    Error loading: {error.message}
                </div>
            )}
            <div className="space-y-2">
                {results.map(s => {
                    const id = s.url.split('/').filter(Boolean).pop();
                    return (
                        <div
                            key={s.name}
                            className="rounded-md border border-gray-200 p-2 hover:bg-gray-50">
                            <Link
                                to={`/starships/${id}`}
                                className="text-blue-600 hover:underline">
                                <strong>{s.name}</strong>
                            </Link>
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Model:</span>
                                {s.model}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination
                page={page}
                hasPrev={!!data?.previous}
                hasNext={!!data?.next}
                onPageChange={goPage}
            />
        </div>
    );
}
