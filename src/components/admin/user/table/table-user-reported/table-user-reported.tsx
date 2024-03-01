import React, { useState } from "react";
import { Input } from "@components/ui/input";
import { columns } from "./columns";
import useDebounce from "@hooks/utils/useDebounce";
import { DataTable } from "../../../../ui/custom/data-table/data-table";
import useGetUserReportList from "../../../../../hooks/api/get/useGetUserReportList";

const TableUserReported = () => {
  const [search, setSearch] = useState<string | undefined>("");
  const { data: userData } = useGetUserReportList({
    perpage: "20",
    page: "1",
    search: search,
    filter: undefined
  });

  const debouncedSearch = useDebounce((value: string) => {
    setSearch(value);
  }, 100);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search title..."
          className="max-w-sm"
          value={search}
          onChange={e => debouncedSearch(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={userData?.users || []} />
    </div>
  );
};

export default TableUserReported;
