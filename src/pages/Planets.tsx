import { Link, useSearchParams } from 'react-router-dom';

import { Pagination, SortAndSearch } from '../components';
import { usePlanets } from '../hooks';

import type { Planet } from '../types';


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
      <SortAndSearch
        placeholder="Search planets"
        sort={sort}
        setSort={setSort}
        search={search}
        setSearch={setSearch}
        sortOptions={[
          { value: "name", label: "Name" },
          { value: "population", label: "Population" },
        ]}
      />
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
      <Pagination
        page={page}
        hasPrev={!!data?.previous}
        hasNext={!!data?.next}
        onPageChange={goPage}
      />
    </div>
  );
}
