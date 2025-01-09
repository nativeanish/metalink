interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border-4 border-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4"
    />
  );
}
