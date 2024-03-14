import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@components/ui/alert-dialog";
import { Button } from "@components/ui/button";

export default function ConfirmDeleteDialog({
  open,
  onOpenChange,
  handleDelete,
  deleteId
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (id: string) => Promise<void>;
  deleteId: string | null;
}) {
  return (
    <div className="flex justify-end my-8 gap-4">
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        {/* <AlertDialogTrigger>
          <Button>Create</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to add this?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will add a new problem that can be selected by farm heads
              when submitting an report.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            {/* <Link to="/admin/farm/problems"> */}
            {/* <AlertDialogAction> */}
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleDelete(deleteId ?? "0")}
            >
              Confirm
            </Button>
            {/* </AlertDialogAction> */}
            {/* </Link> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}