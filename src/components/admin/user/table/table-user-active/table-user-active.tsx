import React, { useMemo, useState } from "react";
import { Input } from "@components/ui/input";
import { columns } from "./columns";
import useDebounce from "@hooks/utils/useDebounce";
import { DataTable } from "../../../../ui/custom/data-table/data-table";
import useGetUserActiveList from "../../../../../hooks/api/get/useGetUserActiveList";
import StatePagination from "../../../../user/community/state-pagination/state-pagination";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../../../ui/custom";

const TableUserActive = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return {
      currentPage: Number(searchParams.get("page")) ?? 1,
      search: searchParams.get("search") ?? undefined
    };
  }, [searchParams]);
  const { data: userData, isLoading } = useGetUserActiveList({
    perpage: "20",
    page: String(params.currentPage),
    search: params.search,
    filter: undefined
  });
  const debouncedSearch = useDebounce((value: string) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  }, 100);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search name..."
          className="max-w-sm"
          value={params.search}
          onChange={e => debouncedSearch(e.target.value)}
        />
      </div>
      <DataTable columns={columns} data={userData?.users || []} />
      {userData?.pagination?.total_pages !== 1 && (
        <div className="mt-4">
          <Pagination
            totalPages={Number(userData?.pagination?.total_pages)}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default TableUserActive;