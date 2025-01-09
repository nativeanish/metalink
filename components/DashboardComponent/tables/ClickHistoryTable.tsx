import { useState } from "react";
import { BrutalistTable } from "../BrutalistTable";
import { searchTableData } from "./../utils/search";
import { _click } from "../../../store/useData";

const columns = [
  { header: "Link", accessor: "name" as const },

  { header: "View Id", accessor: "viewId" as const },
  {
    header: "Clicked At",
    accessor: "date" as const,
    render: (value: string) => new Date(parseInt(value)).toLocaleString(),
  },
];
interface click extends _click {
  viewId: string;
}
interface ClickHistoryTableProps {
  data: click[];
}

export function ClickHistoryTable({ data }: ClickHistoryTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = searchTableData(data, searchTerm);

  return (
    <BrutalistTable
      title="Recent Link Clicks"
      description="Track when your links were clicked"
      columns={columns}
      data={filteredData}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      itemsPerPage={5}
    />
  );
}
