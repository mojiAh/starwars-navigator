import { useParams, useNavigate, Link } from 'react-router-dom';

import { usePlanetDetails, useResourceNames } from '../hooks';

export default function PlanetDetails() {
    const navigate = useNavigate();


    const { id } = useParams();
    const { data: planet, loading, error } = usePlanetDetails(id);

    const filmUrls = planet ? planet.films : [];
    const { getName: getFilmTitle, loading: filmsLoading } = useResourceNames(filmUrls);

    const residentUrls = planet ? planet.residents : [];
    const { getName: getResidentName, loading: residentsLoading } = useResourceNames(residentUrls);


    if (loading) return <div>Loading planet…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!planet) return <div>No planet found</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-start gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1 px-3 mt-1 py-1.5 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50">
                    ← Back
                </button>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
                {planet.name}
            </h2>
            <div className="rounded-md border border-gray-200 p-4">
                <div className="text-sm text-gray-700">
                    <span className="font-medium">Population:</span> {planet.population}
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-medium">Climate:</span> {planet.climate}
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Movies</h3>
                {filmUrls.length === 0 ? (
                    <div className="text-sm text-gray-600">No movies found</div>
                ) : filmsLoading ? (
                    <div className="text-sm text-gray-600">Loading movies…</div>
                ) : (
                    <ul className="pl-5 space-y-1 text-sm text-gray-700">
                        {filmUrls.map((url) => {
                            const id = url.split("/").filter(Boolean).pop();
                            const title = getFilmTitle(url);
                            return <li key={id}>{title || "Unknown"}</li>;
                        })}
                    </ul>
                )}
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Residents</h3>
                {residentUrls.length === 0 ? (
                    <div className="text-sm text-gray-600">No known residents</div>
                ) : residentsLoading ? (
                    <div className="text-sm text-gray-600">Loading residents…</div>
                ) : (
                    <ul className="pl-5 space-y-1 text-sm text-gray-700">
                        {residentUrls.map((url) => {
                            const id = url.split("/").filter(Boolean).pop();
                            const resident = getResidentName(url);
                            return (
                                <li key={id}>
                                    <Link
                                        to={`/characters/${id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {resident || "Unknown"}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}


