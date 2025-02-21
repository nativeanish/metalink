import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
        <span className="hidden sm:inline">Previous</span>
        <FaArrowLeft className="sm:hidden" />
      </button>
      <div className="flex items-center gap-2">
        {totalPages <= 3 ? (
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
          ))
        ) : (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`w-8 h-8 flex items-center justify-center border-2 border-gray-800 ${
                currentPage === 1
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              1
            </button>
            {currentPage > 2 && <span>..</span>}
            {currentPage > 1 && currentPage < totalPages && (
              <button
                onClick={() => onPageChange(currentPage)}
                className="w-8 h-8 flex items-center justify-center border-2 border-gray-800 bg-gray-800 text-white"
              >
                {currentPage}
              </button>
            )}
            {currentPage < totalPages - 1 && <span>..</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-8 h-8 flex items-center justify-center border-2 border-gray-800 ${
                currentPage === totalPages
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-1 border-2 border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <span className="hidden sm:inline">Next</span>
        <FaArrowRight className="sm:hidden" />
      </button>
    </div>
  );
}
