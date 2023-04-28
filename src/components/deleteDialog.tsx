import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent data-cy="modal-delete">
        <DialogHeader className="flex flex-col items-center">
          <AlertTriangle
            className="h-14 w-14 text-destructive mb-10"
            data-cy="modal-delete-icon"
          />
          <DialogTitle data-cy="modal-delete-title"></DialogTitle>
          <DialogDescription className="text-center text-lg">
            Apakah anda yakin menghapus {type} <br />
            <b>&quot;{title}&quot;</b>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-around">
          <Button
            variant="secondary"
            size="lg"
            data-cy="modal-delete-cancel-button"
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={onConfirm}
            // className={buttonVariants({ variant: "destructive", size: "lg" })}
            data-cy="modal-delete-confirm-button"
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
{
  /* <AlertDialog open={open} onOpenChange={setOpen}> */
}
{
  /*       <AlertDialogContent data-cy="modal-delete"> */
}
{
  /*         <AlertDialogHeader className="flex flex-col items-center"> */
}
{
  /*           <AlertTriangle */
}
{
  /*             className="h-14 w-14 text-destructive mb-10" */
}
{
  /*             data-cy="modal-delete-icon" */
}
{
  /*           /> */
}
{
  /*           <AlertDialogTitle data-cy="modal-delete-title"></AlertDialogTitle> */
}
{
  /*           <AlertDialogDescription className="text-center text-lg"> */
}
{
  /*             Apakah anda yakin menghapus {type} <br /> */
}
{
  /*             <b>&quot;{title}&quot;</b>? */
}
{
  /*           </AlertDialogDescription> */
}
{
  /*         </AlertDialogHeader> */
}
{
  /*         <AlertDialogFooter className="justify-around"> */
}
{
  /*           <AlertDialogCancel */
}
{
  /*             className={buttonVariants({ variant: "secondary", size: "lg" })} */
}
{
  /*             data-cy="modal-delete-cancel-button" */
}
{
  /*           > */
}
{
  /*             Batal */
}
{
  /*           </AlertDialogCancel> */
}
{
  /*           <AlertDialogAction */
}
{
  /*             onClick={onConfirm} */
}
{
  /*             className={buttonVariants({ variant: "destructive", size: "lg" })} */
}
{
  /*             data-cy="modal-delete-confirm-button" */
}
{
  /*           > */
}
{
  /*             Hapus */
}
{
  /*           </AlertDialogAction> */
}
{
  /*         </AlertDialogFooter> */
}
{
  /*       </AlertDialogContent> */
}
{
  /*     </AlertDialog> */
}
