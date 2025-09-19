import { Link, useSearchParams } from 'react-router-dom';

import { usePlanets } from '../hooks/useSwapi';

import type { Planet } from '../types';

function SortAndSearch({
  sort,
  setSort,
  search,
  setSearch
}: {
  sort?: string,
  setSort: (s: string) => void,
  search: string,
  setSearch: (s: string) => void
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        placeholder="Search planets"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <span>Sort By:</span>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="name">Name</option>
        <option value="population">Population (numeric)</option>
      </select>
    </div>
  );
}

export default function Planets() {
  const [params, setParams] = useSearchParams();
  const page = parseInt(params.get("page") || "1", 10);
  const sort = params.get("sort") || undefined;
  const search = params.get("search") || "";

  const { data, loading, error } = usePlanets({ page, search });

  const setSearch = (s: string) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      if (s) p.set("search", s);
      else p.delete("search");
      p.set("page", "1");
      return p;
    });
  };

  const setSort = (newSort: string) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("sort", newSort);
      return p;
    });
  };

  const goPage = (newPage: number) => {
    setParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", newPage.toString());
      return p;
    });
  };

  let results: Planet[] = data?.results || [];
  if (sort === "name") results = [...results].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "population")
    results = [...results].sort((a, b) => {
      const pa = isNaN(Number(a.population)) ? -1 : Number(a.population);
      const pb = isNaN(Number(b.population)) ? -1 : Number(b.population);
      return pb - pa;
    });

  return (
    <div>
      <h1>Planets</h1>
      <SortAndSearch sort={sort} setSort={setSort} search={search} setSearch={setSearch} />
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
