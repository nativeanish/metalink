interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-4 flex items-center justify-between border-2 border-gray-800 p-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-1 border-2 border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center border-2 border-gray-800 ${
              currentPage === page
                ? "bg-gray-800 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-1 border-2 border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
}
