import React, { useMemo } from "react";
import { Input } from "@components/ui/input";
import { columns } from "./columns";
import useDebounce from "@hooks/utils/useDebounce";
import { DataTable } from "../../../ui/custom/data-table/data-table";
import { Pagination } from "../../../ui/custom";
import { useSearchParams } from "react-router-dom";
import useGetFarmListQuery from "../../../../hooks/api/get/useGetFarmListQuery";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../ui/select";
import { district } from "../../../../constants/data";
import { Button } from "@components/ui/button";
import { CSVLink } from "react-csv";
import { PiFileCsvFill } from "react-icons/pi";
type SortValues =
  | "All"
  | "District 1"
  | "District 2"
  | "District 3"
  | "District 4"
  | "District 5"
  | "District 6"
  | undefined;

const TableCommunityFarmActive = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useMemo(() => {
    return {
      currentPage: Number(searchParams.get("page")) ?? 1,
      search: searchParams.get("search") ?? undefined,
      sortBy: searchParams.get("sortBy") as SortValues
    };
  }, [searchParams]);
  const { data: farmData, isLoading } = useGetFarmListQuery({
    perpage: "10",
    page: String(params.currentPage),
    search: params.search,
    filter: params.sortBy === "All" ? undefined : params.sortBy
  });

  const communityHeaders = [
    {
      label: "Date Created",
      key: "created"
    },
    {
      label: "Farm",
      key: "farm"
    },
    {
      label: "District",
      key: "district"
    },
    {
      label: "Location",
      key: "location"
    }
  ];

  const communityData = useMemo(() => {
    return (
      farmData?.farms?.map(item => ({
        created: item.createdat || "",
        farm: item.farm_name || "",
        district: item.district || "",
        location: item.location || ""
      })) || []
    );
  }, [farmData]);

  const debouncedSearch = useDebounce((value: string) => {
    searchParams.set("search", value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  }, 400);

  const handleFilterChange = (value: string) => {
    searchParams.set("sortBy", value);
    searchParams.delete("page");
    setSearchParams(searchParams);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search..."
          className="max-w-sm"
          onChange={e => debouncedSearch(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <Button>
            <CSVLink
              className="flex items-center gap-1"
              data={communityData}
              headers={communityHeaders}
              filename={`fams-in-agrihub.csv`}
            >
              <PiFileCsvFill size={18} /> Export
            </CSVLink>
          </Button>
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
      </div>
      <DataTable columns={columns} data={farmData?.farms || []} />
      {farmData?.pagination?.total_pages !== 1 && (
        <div className="mt-4">
          <Pagination
            totalPages={Number(farmData?.pagination?.total_pages)}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default TableCommunityFarmActive;
