import { useState } from "react";
import { BrutalistTable } from "../BrutalistTable";
import { searchTableData } from "./../utils/search";
import { _view } from "../../../store/useData";

const columns = [
  { header: "View Id", accessor: "id" as const },
  {
    header: "Viewed At",
    accessor: "date" as const,
    render: (value: string) => new Date(parseInt(value)).toLocaleString(),
  },
  { header: "Browser", accessor: "browser" as const },
  { header: "OS", accessor: "os" as const },
  { header: "Timezone", accessor: "timezone" as const },
  {
    header: "Page Load Time",
    accessor: "loadtime" as const,
    render: (value: string) => JSON.stringify(parseInt(value) / 1000),
  },
  {
    header: "Web3 Wallets",
    accessor: "wallet" as const,
    render: (value: string) =>
      value && value.length
        ? value
            .split(",")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "None",
  },
  { header: "IP Address", accessor: "ip" as const },
];

interface LinkViewsTableProps {
  data: _view[];
}

export function LinkViewsTable({ data }: LinkViewsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = searchTableData(data, searchTerm);

  return (
    <BrutalistTable
      title="Page Views"
      description="Detailed information about Page views and user metrics"
      columns={columns}
      data={filteredData}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      itemsPerPage={5}
    />
  );
}
