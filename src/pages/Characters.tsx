import { Link, useSearchParams } from 'react-router-dom';

import { Pagination, SortAndSearch } from '../components';
import { useCharacters, useResourceNames } from '../hooks';

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
        <div className="space-y-3">
            <h1 className="text-xl font-semibold text-gray-800">Characters</h1>
            <SortAndSearch
                placeholder="Search characters"
                sort={sort}
                setSort={setSort}
                search={search}
                setSearch={setSearch}
                sortOptions={[
                    { value: "name", label: "Name" },
                    { value: "homeworld", label: "Homeworld" },
                ]}
            />
            {loading && (
                <div className="text-sm text-gray-600">Loading Characters…</div>
            )}
            {error && (
                <div className="text-sm text-red-600">
                    Error loading: {error.message}
                </div>
            )}
            <div className="space-y-2">
                {results.map(c => {
                    const id = c.url.split('/').filter(Boolean).pop();
                    const name = getName(c.homeworld);
                    return (
                        <div
                            key={c.name}
                            className="rounded-md border border-gray-200 p-2 hover:bg-gray-50">
                            <Link
                                to={`/characters/${id}`}
                                className="text-blue-600 hover:underline">
                                <strong>{c.name}</strong>
                            </Link>
                            <div className="text-sm text-gray-600">
                                <span className="font-medium">Homeworld:</span>
                                {!name
                                    ? "Loading…"
                                    : name === "Unknown"
                                        ? "Error loading planet"
                                        : (
                                            <Link
                                                to={`/planets/${c.homeworld.split("/").filter(Boolean).pop()}`}
                                                className="text-blue-600 hover:underline">
                                                {name}
                                            </Link>
                                        )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <Pagination
                page={page}
                hasPrev={!!data?.previous}
                hasNext={!!data?.next}
                onPageChange={goPage}
            />
        </div>
    );
}
