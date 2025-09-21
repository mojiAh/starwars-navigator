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
        <div>
            <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
            <h2>{character.name}</h2>

            <strong>Homeworld:</strong>
            {!character.homeworld ? (<div>No known Planet</div>) :
                planetLoading ? <div>Loading Planet…</div> :
                    (() => {
                        const id = homeworldUrl[0].split("/").filter(Boolean).pop();
                        const title = getPlaneName(homeworldUrl[0]);
                        return (<Link to={`/planets/${id}`}>
                            {title || 'Unknown'}
                        </Link>)
                    })()

            }

            <h3>Starships</h3>
            {starshipUrls.length === 0 ? (<div>No known starships</div>) :
                starshipsLoading ? <div>Loading Starships…</div> :
                    <ul>
                        {starshipUrls.map((url) => {
                            const id = url.split("/").filter(Boolean).pop();
                            const title = getStarshipName(url);
                            return (
                                <li key={id}>
                                    <Link to={`/starships/${id}`}>
                                        {title || 'Unknown'}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>}

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
