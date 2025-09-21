import { useParams, useNavigate } from 'react-router-dom';

import { useStarshipDetails, useResourceNames } from '../hooks';

export default function StarshipDetails() {
    const navigate = useNavigate();

    const { id } = useParams();
    const { data: starship, loading, error } = useStarshipDetails(id);

    const filmUrls = starship ? starship.films : [];
    const { getName: getFilmTitle, loading: filmsLoading } = useResourceNames(filmUrls);


    if (loading) return <div>Loading starship…</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!starship) return <div>No Starship found</div>;

    return (
        <div>
            <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
            <h2>{starship.name}</h2>
            <div><strong>Model:</strong> {starship.model}</div>
            <div><strong>Crew:</strong> {starship.crew}</div>

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
        </div>
    );
}
