import ActivityTitle, { ActivityTitleProps } from "@/components/activityTitle";
import SortSelect from "@/components/sortSelect";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import CreateTodoDialog from "./createTodoDialog";
import { useState } from "react";
import { useCreateTodo } from "@/hooks/useCreateTodo";
import { useToast } from "./ui/use-toast";

interface TodoPageHeaderProps {
  id: string;
  activityTitleProps: ActivityTitleProps;
  onAddTodo: () => void;
  className?: string;
}

export default function TodoPageHeader({
  id,
  className,
  onAddTodo,
  activityTitleProps,
}: TodoPageHeaderProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { mutate, loading } = useCreateTodo({
    onSuccess: () => {
      onAddTodo();
      setOpen(false);
      toast({
        description: "Berhasil membuat to do",
      });
    },
  });

  const handleConfirm = (values: { title: string; priority: string }) => {
    mutate({
      activity_group_id: id,
      title: values.title,
      priority: values.priority,
    });
  };

  return (
    <div className={cn("flex justify-between items-center w-full", className)}>
      <div className="flex items-center space-x-8">
        <Link href="/" passHref legacyBehavior>
          <Button className="rounded-full p-0" variant="ghost">
            <ChevronLeft size={40} strokeWidth={4} />
          </Button>
        </Link>
        <ActivityTitle {...activityTitleProps} />
      </div>
      <div className="flex space-x-2">
        <SortSelect />
        <Button onClick={() => setOpen(true)} data-cy="todo-add-button">
          <Plus />
          Tambah
        </Button>
      </div>
      <CreateTodoDialog
        open={open}
        onOpenChange={(value) => setOpen(value)}
        onConfirm={handleConfirm}
        loading={loading}
      />
    </div>
  );
}
