import { Link } from 'react-router-dom';
import { usePlanets } from '../hooks/useSwapi';


export default function Planets() {
  const { data, loading, error } = usePlanets();
  let results = data?.results || [];

  return (
    <div>
      <h1>Planets</h1>
      {loading && <div>Loading planets…</div>}
      {error && <div>Error loading: {error.message}</div>}
      {results.map(p => {
        const id = p.url.split('/').filter(Boolean).pop();
        return (
          <div key={p.name} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
            <Link to={`/planets/${id}`}><strong>{p.name}</strong></Link>
            <div>Population: {p.population}</div>
          </div>
        );
      })}
    </div>
  );
}
