import React from "react";
import AdminOutletContainer from "@components/admin/layout/container/AdminOutletContainer";
import BreadCrumb from "../../../components/ui/custom/breadcrumb/breadcrumb";
import withAuthGuard from "@higher-order/account/withAuthGuard";
import { data, columns } from "./table/columns-farm";
import { DataTable } from "@components/ui/custom/data-table/data-table";
import { Input } from "@components/ui/input";

const breadcrumbItems = [
  { title: "Farm Management", link: "/admin/farm" },
  { title: "Farms", link: "/admin/farm/farm-approved" }
];
const FarmsAdmin = () => {
  return (
    <AdminOutletContainer className="container mx-auto py-10 ">
      <BreadCrumb items={breadcrumbItems} />
      <h2 className="text-3xl font-bold tracking-tight">Farms</h2>
      <p className="text-sm text-muted-foreground">
        Manage all farms within the community.
      </p>
      <hr className="my-4" />
      <Input placeholder="Search title..." className="max-w-sm my-4" />
      <DataTable columns={columns} data={data} />
    </AdminOutletContainer>
  );
};

export default withAuthGuard(FarmsAdmin, ["admin", "asst_admin"]);
