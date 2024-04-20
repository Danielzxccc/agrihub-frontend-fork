import React, { useMemo } from "react";
import { Input } from "@components/ui/input";
import { columns } from "./columns";
import useDebounce from "@hooks/utils/useDebounce";
import { DataTable } from "../../../ui/custom/data-table/data-table";
import useGetRequestSeedlingListAll from "../../../../hooks/api/get/useGetRequestSeedlingListAll";
import { Pagination } from "../../../ui/custom";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../ui/select";
import { district } from "../../../../constants/data";
import useGetFarmArchiveListQuery from "../../../../hooks/api/get/useGetFarmArchiveListQuery";
import useGetReportInactiveFarmList from "../../../../hooks/api/get/useGetReportInactiveFarmList";
type SortValues =
  | "All"
  | "District 1"
  | "District 2"
  | "District 3"
  | "District 4"
  | "District 5"
  | "District 6"
  | undefined;
const TableCommunityFarmInactive = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return {
      currentPage: Number(searchParams.get("page")) ?? 1,
      search: searchParams.get("search") ?? undefined,
      sortBy: searchParams.get("sortBy") as SortValues
    };
  }, [searchParams]);
  const { data: farmData, isLoading } = useGetReportInactiveFarmList();
  console.log(farmData, "asdasd");

  const debouncedSearch = useDebounce((value: string) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
  }, 100);

  const handleFilterChange = (value: string) => {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search farm..."
          className="max-w-sm"
          value={params.search}
          onChange={e => debouncedSearch(e.target.value)}
        />
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter District..." />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem value="All">All</SelectItem>
            {district.map((id, i) => (
              <SelectItem key={i} value={id}>
                {id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DataTable columns={columns} data={farmData || []} />
      {/* {farmData?.pagination?.total_pages !== 1 && (
        <div className="mt-4">
          <Pagination
            totalPages={Number(farmData?.pagination?.total_pages)}
            isLoading={isLoading}
          />
        </div>
      )} */}
    </div>
  );
};

export default TableCommunityFarmInactive;