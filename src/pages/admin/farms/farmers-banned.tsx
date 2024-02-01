import React from "react";
import AdminOutletContainer from "@components/admin/layout/container/AdminOutletContainer";
import BreadCrumb from "../../../components/ui/custom/breadcrumb/breadcrumb";
import { TableFarmers } from "./table/table-farmer";
import withAuthGuard from "@higher-order/account/withAuthGuard";

const breadcrumbItems = [
  { title: "Farm Management", link: "/admin/farm" },
  { title: "Farmers", link: "/admin/farm/farmers" },
  { title: "Banned", link: "/admin/farm/accounts-banned" }
];
const FarmersBanned = () => {
  return (
    <AdminOutletContainer className="container mx-auto py-10 ">
      <BreadCrumb items={breadcrumbItems} />
      <h2 className="text-3xl font-bold tracking-tight">Banned Farmers</h2>
      <p className="text-sm text-muted-foreground">
        Manage banned farmers within the community.
      </p>
      <hr className="my-4" />
      <TableFarmers />
    </AdminOutletContainer>
  );
};

export default withAuthGuard(FarmersBanned, ["admin", "asst_admin"]);
