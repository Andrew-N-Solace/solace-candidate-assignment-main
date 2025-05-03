"use client";
export function Pager({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (n: number) => void;
}) {
  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        className="btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ◀ Prev
      </button>
      <span className="text-sm">
        Page <strong>{page}</strong>
      </span>
      <button
        className="btn"
        disabled={page * pageSize >= total}
        onClick={() => onPageChange(page + 1)}
      >
        Next ▶
      </button>
    </div>
  );
}
