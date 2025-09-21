type PaginationProps = {
    page: number;
    hasNext: boolean;
    hasPrev: boolean;
    onPageChange: (page: number) => void;
};

export function Pagination({ page, hasNext, hasPrev, onPageChange }: PaginationProps) {
    const btn =
        "px-3 py-1 rounded border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed";
    return (
        <div className="flex items-center justify-center gap-2 mt-3">
            <button
                className={btn}
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrev}
                aria-label="Previous page"
            >
                Previous
            </button>

            <span className="text-sm text-yellow-600">Page {page}</span>

            <button
                className={btn}
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNext}
                aria-label="Next page"
            >
                Next
            </button>
        </div>
    );
}