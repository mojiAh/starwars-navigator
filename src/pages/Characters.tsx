import { Link, useSearchParams } from 'react-router-dom';

import { useCharacters, useResourceNames } from '../hooks';

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
                placeholder="Search characters"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginRight: 8 }}
            />
            <span>Sort By:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="name">Name</option>
                <option value="homeworld">Homeworld</option>
            </select>
        </div>
    );
}

export default function Characters() {
    const [params, setParams] = useSearchParams();
    const page = parseInt(params.get("page") || "1", 10);
    const sort = params.get("sort") || "name";
    const search = params.get("search") || "";

    const { data, loading, error } = useCharacters({ page, search });

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
        setParams({ page: String(newPage) });
    };

    let results = data?.results || [];
    const homeworlds = results.map(c => c.homeworld).filter(Boolean) as string[];
    const { getName } = useResourceNames(homeworlds);

    if (sort === "name") results = [...results].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "homeworld") {
        results = [...results].sort((a, b) => {
            const nameA = getName(a.homeworld) || "zzz";
            const nameB = getName(b.homeworld) || "zzz";
            return nameA.localeCompare(nameB);
        });
    }

    return (
        <div>
            <h1>Characters</h1>
            <SortAndSearch sort={sort} setSort={setSort} search={search} setSearch={setSearch} />
            {loading && <div>Loading Characters…</div>}
            {error && <div>Error loading: {error.message}</div>}
            {results.map(c => {
                const id = c.url.split('/').filter(Boolean).pop();
                const name = getName(c.homeworld);
                return (
                    <div key={c.name} style={{ border: '1px solid #eee', padding: 8, marginBottom: 8 }}>
                        <Link to={`/characters/${id}`}><strong>{c.name}</strong></Link>
                        <div><strong>Homeworld:</strong>
                            {!name
                                ? "Loading…"
                                : name === "Unknown"
                                    ? "Error loading planet"
                                    : (
                                        <Link to={`/planets/${c.homeworld.split("/").filter(Boolean).pop()}`}>
                                            {name}
                                        </Link>
                                    )}
                        </div>
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
