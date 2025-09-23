import { useParams, useNavigate, Link } from 'react-router-dom';

import { usePlanetDetails, useResourceNames } from '../hooks';
import { ResourceList } from '../components';

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

            <ResourceList
                title="Movies"
                urls={filmUrls}
                getName={getFilmTitle}
                loading={filmsLoading}
                emptyMessage="No movies found"
            />

            <ResourceList
                title="Residents"
                urls={residentUrls}
                getName={getResidentName}
                loading={residentsLoading}
                linkBase="/characters"
                emptyMessage="No know residents"
            />
        </div>
    );
}


