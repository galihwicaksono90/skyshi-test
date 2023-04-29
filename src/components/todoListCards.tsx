"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetActivity } from "@/hooks/queries";
import { Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { useUpdateTodo, useDeleteTodo } from "@/hooks/mutations";
import PriorityDot from "@/components/priorityDot";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import UpdateTodoDialog from "@/components/updateTodoDialog";
import { Priority } from "@/types";
import TodoEmptyState from "@/components/emptyTodo";
import TodoPageHeader from "./todoPageHeader";
import { useToast } from "./ui/use-toast";
import Loading from "./loading";
import { SortOption, sortTodo } from "./sortSelect";
import DeleteModal from "./deleteModal";
import UpdateTodoModal from "./updateTodoModal";

export default function TodoListCards({ id }: { id: string }) {
  const { toast } = useToast();
  const [toDelete, setToDelete] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [sort, setSort] = useState<SortOption>("terbaru");
  const [updateId, setUpdateId] = useState<number | null>(null);
  const { data, refetch, loading } = useGetActivity({ id });

  const { mutate: updateTodo, loading: updating } = useUpdateTodo({
    onSuccess: () => {
      refetch();
      setUpdateId(null);
      toast({
        description: "Berhasil mengupdate to do",
      });
    },
  });

  const { mutate: deleteTodo } = useDeleteTodo({
    onSuccess: () => {
      refetch();
      setToDelete(null);
      toast({
        description: "Berhasil menghapus to do",
      });
    },
  });

  const onChangeActive = (value: boolean, id: number) => {
    updateTodo({
      id,
      is_active: !value ? 1 : 0,
    });
  };

  const onOpenDeleteDialog = (open: boolean) => {
    if (!open) {
      setToDelete(null);
    }
  };

  const onDeleteTodo = async () => {
    if (!!toDelete?.id) {
      deleteTodo({ id: toDelete.id });
    }
  };

  const onUpdateTodo = (values: { title: string; priority: string }) => {
    if (!!updateId) {
      updateTodo({
        id: updateId,
        title: values.title,
        priority: values.priority as Priority,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TodoPageHeader
        sort={sort}
        setSort={setSort}
        className="mb-8"
        onAddTodo={() => {
          refetch();
        }}
        id={id}
        activityTitleProps={{
          onSuccess: () => {
            refetch();
          },
          title: data?.title,
          id,
        }}
      />
      {data?.todo_items?.length === 0 ? (
        <TodoEmptyState />
      ) : (
        <ul className="flex flex-col space-y-4 w-full">
          {sortTodo(data?.todo_items ?? [], sort).map((item) => (
            <li key={item.id}>
              <Card className="p-8 w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Checkbox
                      className="h-[20px] w-[20px] mr-[20px]"
                      checked={item.is_active !== 1}
                      onCheckedChange={(value) => {
                        onChangeActive(value === true, item.id);
                      }}
                    />
                    <PriorityDot priority={item.priority as Priority} />
                    <p
                      className={cn(
                        item.is_active === 1 ? "" : "line-through",
                        "text-lg"
                      )}
                    >
                      {item.title}
                    </p>
                    <Button
                      className="rounded-full w-3 p-0 ml-2 text-muted-foreground "
                      variant="ghost"
                      onClick={() => setUpdateId(item.id)}
                    >
                      <Pencil />
                    </Button>
                  </div>
                  <Button
                    data-cy="todo-item-delete-button"
                    className="rounded-full w-10 p-0"
                    variant="ghost"
                    onClick={() =>
                      setToDelete({ id: item.id, title: item.title })
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
      <UpdateTodoModal
        id={updateId}
        open={!!updateId}
        onConfirm={onUpdateTodo}
        loading={updating}
        setOpen={() => setUpdateId(null)}
      />
      {/* <UpdateTodoDialog */}
      {/*   id={updateId} */}
      {/*   open={!!updateId} */}
      {/*   onUpdate={onUpdateTodo} */}
      {/*   onOpenChange={(value) => { */}
      {/*     if (!value) { */}
      {/*       setUpdateId(null); */}
      {/*     } */}
      {/*   }} */}
      {/*   loading={updating} */}
      {/* /> */}
      {/* <DeleteDialog */}
      {/*   title={toDelete?.title ?? ""} */}
      {/*   open={!!toDelete?.id} */}
      {/*   setOpen={onOpenDeleteDialog} */}
      {/*   onConfirm={onDeleteTodo} */}
      {/* /> */}
      <DeleteModal
        title={toDelete?.title ?? ""}
        open={!!toDelete?.id}
        setOpen={onOpenDeleteDialog}
        onConfirm={onDeleteTodo}
      />
    </>
  );
}
