import { Dialog } from "@headlessui/react";
import { AlertTriangle } from "lucide-react";
import { Button, LoadingButton } from "./ui/button";
import { Separator } from "./ui/separator";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import PrioritySelector from "./prioritySelector";
import { Priority } from "@/types";
import { X } from "lucide-react";

interface CreateTodoModalProps {
  onConfirm: (values: { priority: string; title: string }) => void;
  loading?: boolean;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateTodoModal({
  loading,
  onConfirm,
  open,
  setOpen,
}: CreateTodoModalProps) {
  const [priority, setPriority] = useState<string>("very-high");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle("");
    return () => {
      setTitle("");
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirm({ priority, title });
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50 sm:max-w-[800px] w-[800px]"
    >
      <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        data-cy="modal-delete"
      >
        <Dialog.Panel className="w-full max-w-[830px] rounded bg-white flex flex-col items-center p-4">
          <Dialog.Title
            data-cy="modal-delete-title"
            className="text-lg font-semibold leading-none tracking-tight py-4 flex justify-between w-full"
          >
            Tambah List Item
            <Button
              className="rouded-full h-4 p-0"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </Dialog.Title>
          <Separator />
          <form onSubmit={handleSubmit} className="w-full">
            <div className="px-6 flex flex-col space-y-8 mb-6 w-full">
              <div>
                <Label htmlFor="title">Nama List Item</Label>
                <Input
                  data-cy="modal-add-name-input"
                  id="title"
                  value={title}
                  name="title"
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="w-60">
                <Label htmlFor="name">Priority</Label>
                <PrioritySelector
                  value={priority as Priority}
                  onChange={(value: Priority) => setPriority(value as Priority)}
                />
              </div>
            </div>

            <Separator className="mb-6" />
            <div className="flex justify-end px-6">
              <LoadingButton
                type="submit"
                loading={loading}
                disabled={title === ""}
                data-cy="modal-add-save-button"
              >
                Simpan
              </LoadingButton>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
