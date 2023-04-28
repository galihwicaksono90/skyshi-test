"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ActivityEmptyState from "@/components/activityEmptyState";
import ActivityCard from "@/components/activityCard";
import { useGetActivities } from "@/hooks/queries";
import { useCreateActivity, useDeleteActivity } from "@/hooks/mutations";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import DeleteDialog from "@/components/deleteDialog";
import Loading from "./loading";

export default function Activiti() {
  const [currentActivity, setCurrentActivity] = useState<{
    title: string;
    id: number;
  } | null>(null);
  const { toast } = useToast();
  const { data, loading, refetch } = useGetActivities();
  const { mutate: deleteActivity } = useDeleteActivity({
    onSuccess: async () => {
      setCurrentActivity(null);
      await refetch();
      toast({
        description: "Aktifitas berhasil dihapus",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: createActivity } = useCreateActivity({
    onSuccess: () => {
      refetch();
      toast({
        description: "Aktifitas berhasil dibuat",
      });
    },
    onError: (error: Error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onDelete = async () => {
    if (!!currentActivity?.id) {
      deleteActivity(currentActivity.id);
    }
  };

  const onCreate = async () => {
    createActivity();
  };

  const onOpen = async (open: boolean) => {
    if (!open) {
      setCurrentActivity(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-between w-full mb-[49px]">
        <h1
          className="scroll-m-20 text-4xl font-bold lg:text-4xl"
          data-cy="activity-title"
        >
          Activity
        </h1>
        <Button onClick={onCreate} size="lg" data-cy="activity-add-button">
          <Plus />
          Tambah
        </Button>
      </div>
      {data && data.data?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.data.map((item) => (
            <ActivityCard
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.created_at}
              onDelete={() =>
                setCurrentActivity({ id: item.id, title: item.title })
              }
            />
          ))}
        </div>
      ) : (
        <ActivityEmptyState />
      )}
      <DeleteDialog
        open={!!currentActivity?.id}
        setOpen={onOpen}
        onConfirm={onDelete}
        title={currentActivity?.title ?? ""}
      />
    </>
  );
}
