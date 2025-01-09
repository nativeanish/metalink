export function searchTableData<T extends object>(
  data: T[],
  searchTerm: string,
  searchableColumns?: (keyof T)[]
): T[] {
  if (!searchTerm) return data;
  
  const term = searchTerm.toLowerCase();
  
  return data.filter((item) => {
    return Object.entries(item).some(([key, value]) => {
      if (searchableColumns && !searchableColumns.includes(key as keyof T)) {
        return false;
      }
      
      if (Array.isArray(value)) {
        return value.some(v => 
          v?.toString().toLowerCase().includes(term)
        );
      }
      
      return value?.toString().toLowerCase().includes(term);
    });
  });
}