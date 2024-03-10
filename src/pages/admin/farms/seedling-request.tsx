import React from "react";
import AdminOutletContainer from "@components/admin/layout/container/AdminOutletContainer";
import BreadCrumb from "../../../components/ui/custom/breadcrumb/breadcrumb";
import withAuthGuard from "@higher-order/account/withAuthGuard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { useParams } from "react-router-dom";
import TableSeedlingAccepted from "@components/admin/seedling-request/table-seedling-accepted/table-seedling-accepted";
import TableSeedlingPending from "@components/admin/seedling-request/table-seedling-pending/table-seedling-pending";
import TableSeedlingRejected from "@components/admin/seedling-request/table-seedling-rejected/table-seedling-rejected";

const breadcrumbItems = [
  { title: "Farm Management", link: "/admin/community" },
  { title: "Farms", link: "/admin/community/farms" },
  {
    title: "Pending Seedling Request",
    link: "/admin/community/seedling-request"
  }
];
const SeedlingRequestAdmin = () => {
  const { tab }: any = useParams();
  return (
    <AdminOutletContainer className="container mx-auto py-10 ">
      <BreadCrumb items={breadcrumbItems} />
      <h2 className="text-3xl font-bold tracking-tight">Seedling Request</h2>
      <p className="text-sm text-muted-foreground">
        Manage seedling request of farms.
      </p>
      <hr className="my-4" />
      <Tabs defaultValue={tab || "accepted"}>
        <TabsList>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="accepted">
          <TableSeedlingAccepted />
        </TabsContent>
        <TabsContent value="pending">
          <TableSeedlingPending />
        </TabsContent>
        <TabsContent value="rejected">
          <TableSeedlingRejected />
        </TabsContent>
      </Tabs>
    </AdminOutletContainer>
  );
};

export default withAuthGuard(
  SeedlingRequestAdmin,
  ["admin", "asst_admin"],
  "farms"
);