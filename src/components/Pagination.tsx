type PaginationProps = {
    page: number;
    hasNext: boolean;
    hasPrev: boolean;
    onPageChange: (page: number) => void;
};

export function Pagination({ page, hasNext, hasPrev, onPageChange }: PaginationProps) {
    return (
        <div style={{ marginTop: 12 }}>
            <button onClick={() => onPageChange(page - 1)} disabled={!hasPrev}>
                Previous
            </button>
            <span style={{ margin: "0 8px" }}>Page {page}</span>
            <button onClick={() => onPageChange(page + 1)} disabled={!hasNext}>
                Next
            </button>
        </div>
    );
}