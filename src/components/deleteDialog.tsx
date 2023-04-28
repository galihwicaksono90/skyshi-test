import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { buttonVariants } from "./ui/button";

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  type?: "activity" | "todo";
}

export default function DeleteDialog({
  open,
  setOpen,
  onConfirm,
  title = "",
  type = "activity",
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent data-cy="modal-delete">
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertTriangle
            className="h-14 w-14 text-destructive mb-10"
            data-cy="modal-delete-icon"
          />
          <AlertDialogTitle data-cy="modal-delete-title"></AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg">
            Apakah anda yakin menghapus {type} <br />
            <b>&quot;{title}&quot;</b>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-around">
          <AlertDialogCancel
            className={buttonVariants({ variant: "secondary", size: "lg" })}
            data-cy="modal-delete-cancel-button"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={buttonVariants({ variant: "destructive", size: "lg" })}
            data-cy="modal-delete-confirm-button"
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
