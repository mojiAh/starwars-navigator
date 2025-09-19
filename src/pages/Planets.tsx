import { Link, useSearchParams } from 'react-router-dom';
import { usePlanets } from '../hooks/useSwapi';

export default function Planets() {
  const [params, setParams] = useSearchParams();
  const page = parseInt(params.get("page") || "1", 10);

  const { data, loading, error } = usePlanets({ page });
  let results = data?.results || [];

  const goPage = (newPage: number) => {
    setParams({ page: String(newPage) });
  };

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
      <div style={{ marginTop: 12 }}>
        <button onClick={() => goPage(Math.max(1, page - 1))} disabled={!data?.previous}>
          Previous
        </button>
        <span style={{ margin: "0 8px" }}>Page {page}</span>
        <button onClick={() => goPage(page + 1)} disabled={!data?.next}>
          Next
        </button>
      </div>
    </div>
  );
}
