"use client";
import { FormEvent, useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Input } from "./ui/input";
import { useUpdateActivity } from "@/hooks/useUpdateActivity";

export interface ActivityTitleProps {
  title?: string;
  id: string;
  onSuccess?: () => void;
}

export default function ActivityTitle({
  title = "",
  id,
  onSuccess,
}: ActivityTitleProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const { mutate } = useUpdateActivity({
    onSuccess: () => {
      setIsEditing(false);
      onSuccess?.();
    },
  });

  useEffect(() => {
    setCurrentTitle(title);
  }, []);

  useEffect(() => {
    if (!!ref.current && isEditing) {
      ref.current.focus();
    }
  }, [ref, isEditing]);

  const onEdit = () => {
    setIsEditing((o) => !o);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      title: currentTitle,
      id: id,
    });
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <Input
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            className="border-b-slate-500 border-t-0 border-r-0 border-l-0 rounded-none text-4xl font-bold"
            ref={ref}
          />
        </form>
      ) : (
        <h1 className="scroll-m-20 text-4xl font-bold lg:text-4xl">
          {currentTitle}
        </h1>
      )}
      <Button
        className="rounded-full w-5 p-0 text-muted-foreground"
        variant="ghost"
        onClick={onEdit}
      >
        <Pencil />
      </Button>
    </>
  );
}
