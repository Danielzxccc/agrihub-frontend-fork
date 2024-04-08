import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@components/ui/dialog";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Badge } from "@components/ui/badge";
import DialogToolAccept from "../dialog-tool-request/dialog-tool-accept";
import { formatDate } from "@components/lib/utils";
import { ToolRequest } from "../../../../api/openapi";
import { format } from "date-fns";

export const columns: ColumnDef<ToolRequest>[] = [
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) =>
      format(new Date(row.original.updatedat || ""), "MMM dd, yyyy")
  },
  {
    accessorKey: "tool_requested",
    header: "Tool",
    cell: ({ row }) => <div>{row.getValue("tool_requested")}</div>
  },
  {
    accessorKey: "farm_name",
    header: "Requested by",
    cell: ({ row }) => <div>{row.getValue("farm_name")}</div>
  },
  {
    accessorKey: "quantity_requested",
    header: "Quantity Requested",
    cell: ({ row }) => <div>{row.getValue("quantity_requested")}</div>
  },
  {
    accessorKey: "forwarded_to",
    header: "Forwarded to",
    cell: ({ row }) => (
      <div className=" line-clamp-1">{row.getValue("forwarded_to")}</div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className=" capitalize">{row.getValue("status")}</div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const request = row.original;
      const status = request.status;
      const request_date = request.createdat;
      const farm = request.farm_name;
      const contact = request.contact;
      const qty = request.quantity_requested;
      const rqstr_note = request.requester_note;
      const requested = request.tool_requested;
      const forward = request.forwarded_to;

      return (
        <Dialog>
          <DialogTrigger className="ml-2 px-2">
            <Button variant="outline" className="rounded-full">
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className="flex justify-between gap-4 items-start pt-4">
                <div>
                  <DialogTitle>Tool Request</DialogTitle>
                  <DialogDescription>
                    Requested:{" "}
                    {format(new Date(request_date || ""), "MMM dd, yyyy")}
                  </DialogDescription>
                </div>
                <Badge className="text-white bg-orange-500 hover:bg-orange-400">
                  {status}
                </Badge>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="w-full">
                  <Label>Farm Name</Label>
                  <Input type="text" defaultValue={farm} disabled />
                </div>
                <div className="w-full">
                  <Label>Contact</Label>
                  <Input type="text" defaultValue={contact} disabled />
                </div>
              </div>

              <div className="flex w-full gap-4 mb-4">
                <div className="w-full">
                  <Label>Requested</Label>
                  <Input type="text" defaultValue={requested} disabled />
                </div>

                <div className="w-1/3">
                  <Label>Quantity</Label>
                  <Input type="number" defaultValue={qty} disabled />
                </div>
              </div>

              <div className="mb-4">
                <Label>Requester Note</Label>
                <div className="w-full">
                  <Textarea defaultValue={rqstr_note} disabled />
                </div>
              </div>

              <div className="w-full">
                <Label>Forwarded to:</Label>
                <Input type="text" defaultValue={forward} disabled />
              </div>

              <div className="flex justify-end gap-4 mt-4">
                {/* <Button variant="ghost" onClick={handleToggleEdit}>
                  {isEditing ? "Save" : "Edit"}
                </Button> */}
                <Button variant="destructive">Rejected</Button>
                <DialogToolAccept />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    }
  }
];
