import { useParams, useNavigate, Link } from 'react-router-dom';

import { useCharacterDetails, useResourceNames } from '../hooks';

export default function CharacterDetails() {
    const navigate = useNavigate();

    const { id } = useParams();
    const { data: character, loading, error } = useCharacterDetails(id);

    const homeworldUrl = character ? [character.homeworld] : [];
    const { getName: getPlaneName, loading: planetLoading } = useResourceNames(homeworldUrl);

    const starshipUrls = character ? character.starships : [];
    const { getName: getStarshipName, loading: starshipsLoading } = useResourceNames(starshipUrls);

    const filmUrls = character ? character.films : [];
    const { getName: getFilmTitle, loading: filmsLoading } = useResourceNames(filmUrls);

    if (loading) return <div>Loading character…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!character) return <div>No character found</div>;

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
                {character.name}
            </h2>

            <div className="text-sm text-gray-700">
                <span className="font-medium">Homeworld:</span>{" "}
                {!character.homeworld ? (
                    <span className="text-gray-600">No known Planet</span>
                ) : planetLoading ? (
                    <span className="text-gray-600">Loading Planet…</span>
                ) : (() => {
                    const id = homeworldUrl[0].split("/").filter(Boolean).pop();
                    const title = getPlaneName(homeworldUrl[0]);
                    return (
                        <Link to={`/planets/${id}`} className="text-blue-600 hover:underline">
                            {title || "Unknown"}
                        </Link>
                    );
                })()}
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Starships</h3>
                {starshipUrls.length === 0 ? (
                    <div className="text-sm text-gray-600">No known starships</div>
                ) : starshipsLoading ? (
                    <div className="text-sm text-gray-600">Loading Starships…</div>
                ) : (
                    <ul className="pl-5 space-y-1 text-sm text-gray-700">
                        {starshipUrls.map((url) => {
                            const id = url.split("/").filter(Boolean).pop();
                            const title = getStarshipName(url);
                            return (
                                <li key={id}>
                                    <Link to={`/starships/${id}`} className="text-blue-600 hover:underline">
                                        {title || "Unknown"}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
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
        </div>
    );
}
