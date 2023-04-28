import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PrioritySelect from "@/components/prioritySelect";
import { FormEvent, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { Priority } from "@/types";

type TodoDialogProps = DialogProps & {
  onConfirm: (values: { priority: string; title: string }) => void;
  loading?: boolean;
};

export default function CreateTodoDialog({
  onConfirm,
  loading,
  ...props
}: TodoDialogProps) {
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
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="border-blue-100">
          <DialogTitle>Tambah List Item</DialogTitle>
        </DialogHeader>
        <Separator />
        <form onSubmit={handleSubmit}>
          <div className="px-6 flex flex-col space-y-8 mb-6">
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
              <PrioritySelect
                value={priority}
                onValueChange={(value) => setPriority(value as Priority)}
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
      </DialogContent>
    </Dialog>
  );
}
