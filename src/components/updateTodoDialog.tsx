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
import { FormEvent, useState } from "react";
import { useGetTodo } from "@/hooks/queries";
import { Priority } from "@/types";
import { Separator } from "./ui/separator";

type TodoDialogProps = DialogProps & {
  loading?: boolean;
  id: number | null;
  onUpdate: ({
    title,
    priority,
  }: {
    title: string;
    priority: Priority;
  }) => void;
};

export default function UpdateTodoDialog({
  id,
  onUpdate,
  loading: updating,
  ...props
}: TodoDialogProps) {
  const [priority, setPriority] = useState<Priority>("very-high");
  const [title, setTitle] = useState<string>("");

  const { loading } = useGetTodo(
    { id: id?.toString() ?? "" },
    {
      onSuccess: (data) => {
        setPriority(data.priority);
        setTitle(data.title);
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({ priority, title });
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
              loading={loading || updating}
              disabled={title === ""}
            >
              Simpan
            </LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
