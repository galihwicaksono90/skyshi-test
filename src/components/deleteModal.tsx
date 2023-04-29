import { Dialog } from "@headlessui/react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

interface DeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  type?: "activity" | "todo";
}

export default function DeleteModal({
  open,
  setOpen,
  onConfirm,
  title = "",
  type = "activity",
}: DeleteModalProps) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        data-cy="modal-delete"
      >
        <Dialog.Panel className="w-full max-w-sm rounded bg-white flex flex-col items-center p-4">
          <AlertTriangle
            className="h-14 w-14 text-destructive mb-10"
            data-cy="modal-delete-icon"
          />
          <Dialog.Title
            className="flex flex-col items-center"
            data-cy="modal-delete-title"
          ></Dialog.Title>
          <Dialog.Description className="text-center mb-4">
            Apakah anda yakin menghapus {type} <br />
            <b>&quot;{title}&quot;</b>?
          </Dialog.Description>
          <div className="flex justify-around w-full">
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
              data-cy="modal-delete-confirm-button"
            >
              Hapus
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
