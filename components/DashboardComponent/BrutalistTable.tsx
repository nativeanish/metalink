import React, { useState } from 'react';
import { TableHeader } from './TableHeader';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any) => React.ReactNode;
}

interface BrutalistTableProps<T> {
  title: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  itemsPerPage?: number;
}

export function BrutalistTable<T extends object>({
  title,
  description,
  columns,
  data,
  searchTerm,
  onSearchChange,
  itemsPerPage = 10,
}: BrutalistTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-white border-4 border-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
      <TableHeader title={title} description={description} />
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={`Search ${title.toLowerCase()}...`}
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="p-2 text-left border-2 border-gray-800 font-bold"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b-2 border-l-2 border-r-2 border-gray-800 hover:bg-gray-50"
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-2">
                    {column.render
                      ? column.render(item[column.accessor])
                      : String(item[column.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}