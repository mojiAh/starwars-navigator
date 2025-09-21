type SortOption = { value: string; label: string };

type SortAndSearchProps = {
    placeholder?: string;
    sort?: string;
    setSort: (s: string) => void;
    search: string;
    setSearch: (s: string) => void;
    sortOptions: SortOption[];
};

export function SortAndSearch({
    placeholder,
    sort,
    setSort,
    search,
    setSearch,
    sortOptions,
}: SortAndSearchProps) {
    const field =
        "h-9 rounded-md border border-gray-200 px-3 text-sm text-gray-700 placeholder:text-gray-400 hover:border-gray-300 focus:outline-none focus:border-blue-500 shadow-sm focus:shadow";
    return (
        <div className="flex items-center gap-3 mb-3">
            <input
                className={field + " w-56"}
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label={placeholder}
            />

            <label className="text-sm text-gray-600">Sort By:</label>

            <select
                className={field + " pr-8"}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort by"
            >
                {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}