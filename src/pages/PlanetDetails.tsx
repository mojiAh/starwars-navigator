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
        <div>
            <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
            <h2>{planet.name}</h2>
            <div><strong>Population:</strong> {planet.population}</div>
            <div><strong>Climate:</strong> {planet.climate}</div>

            <h3>Movies</h3>
            {filmUrls.length === 0 ? (<div>No movies found</div>) :
                filmsLoading ? (<div>Loading movies…</div>) :
                    <ul>
                        {filmUrls.map((url) => {
                            const id = url.split("/").filter(Boolean).pop();
                            const title = getFilmTitle(url);
                            return <li key={id}>{title || 'Unknown'}</li>;
                        })}
                    </ul>}

            <h3>Residents</h3>
            {residentUrls.length === 0 ? (<div>No known residents</div>) :
                residentsLoading ? (<div>Loading residents…</div>) :
                    <ul>
                        {residentUrls.map((url) => {
                            const id = url.split("/").filter(Boolean).pop();
                            const resident = getResidentName(url);
                            return <li key={id}>
                                <Link to={`/characters/${id}`}>{resident || 'Uknown'}</Link>
                            </li>;
                        })}
                    </ul>
            }
        </div>
    );
}
