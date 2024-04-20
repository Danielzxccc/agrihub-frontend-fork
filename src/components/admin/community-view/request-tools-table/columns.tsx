import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import { ToolRequest } from "../../../../api/openapi";
import { Button } from "../../../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../../../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { format } from "date-fns";

export const columns: ColumnDef<ToolRequest>[] = [
  {
    accessorKey: "tool_requested",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tool
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.tool_requested}</div>;
    }
  },
  {
    accessorKey: "quantity_requested",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Request
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className=" capitalize">{row.original.status}</div>;
    }
  }

  // {
  //   header: "Actions",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const request = row.original;
  //     // const { mutateAsync: rejectSeedling, isLoading: isSeedlingLoad } =
  //     //   useDeleteRequestSeedlingCancel();
  //     // const handleDelete = async () => {
  //     //   try {
  //     //     await rejectSeedling(row.original.id || "");
  //     //     toast.success("Request Cancelled!");
  //     //   } catch (e: any) {
  //     //     toast.error(e.body.message);
  //     //   }
  //     // };
  //     return request.status === "pending" ? (
  //       <>
  //         <AlertDialog>
  //           <AlertDialogTrigger asChild>
  //             <Button variant={"destructive"} className="text-xs p-3 h-5">
  //               Cancel
  //             </Button>
  //           </AlertDialogTrigger>
  //           <AlertDialogContent>
  //             <AlertDialogHeader>
  //               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
  //               <AlertDialogDescription>
  //                 This action cannot be undone. This action will cancel your
  //                 seedling request.
  //               </AlertDialogDescription>
  //             </AlertDialogHeader>
  //             <AlertDialogFooter>
  //               <AlertDialogCancel>Cancel</AlertDialogCancel>
  //               <AlertDialogAction>Continue</AlertDialogAction>
  //             </AlertDialogFooter>
  //           </AlertDialogContent>
  //         </AlertDialog>
  //       </>
  //     ) : request.status === "accepted" ? (
  //       <>
  //         <Dialog>
  //           <DialogTrigger asChild>
  //             <Button variant={"outline"} className="text-xs p-3 h-5">
  //               Details
  //             </Button>
  //           </DialogTrigger>
  //           <DialogContent className="sm:max-w-[425px]">
  //             <DialogHeader>
  //               <DialogTitle>Request Details</DialogTitle>
  //             </DialogHeader>
  //             <div className="grid gap-4 py-4">
  //               <div className="grid grid-cols-4 items-center gap-1">
  //                 <Label className="col-span-4 font-poppins-medium">
  //                   Requested Date
  //                 </Label>
  //                 <Input
  //                   className="col-span-4 disabled:opacity-100"
  //                   value={format(new Date(request.createdat || ""), "PPP")}
  //                   disabled
  //                 />
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-1">
  //                 <Label className="col-span-4 font-poppins-medium">
  //                   Quantity Approve
  //                 </Label>
  //                 <Input
  //                   className="col-span-4 disabled:opacity-100"
  //                   value={request.quantity_requested}
  //                   disabled
  //                 />
  //               </div>
  //               <div className="grid grid-cols-4 items-center gap-1">
  //                 <Label className="col-span-4 font-poppins-medium">Note</Label>
  //                 <Textarea
  //                   className="col-span-4 disabled:opacity-100"
  //                   value={request.client_note}
  //                   disabled
  //                 />
  //               </div>
  //             </div>
  //           </DialogContent>
  //         </Dialog>
  //       </>
  //     ) : null;
  //   }
  // }
];