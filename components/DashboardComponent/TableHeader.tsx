interface TableHeaderProps {
  title: string;
  description?: string;
}

export function TableHeader({ title, description }: TableHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
