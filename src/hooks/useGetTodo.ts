import { updateTodoSchema } from "@/schemas";
import { Options } from "@/types";
import { useState, useEffect } from "react";
import { z } from "zod";
import { fetchUrl } from "@/consts";

async function getTodo(id: string) {
  const response = await fetch(fetchUrl + "todo-items/" + id);
  if (response.ok) {
    const data = await response.json();
    const parsedData = updateTodoSchema.parse(data);
    return parsedData;
  }
  // const parsedData = activitiesSchema.safeParse(data);
  throw new Error(response.statusText);
}

export function useGetTodo<TError = unknown>(
  { id }: { id: string },
  options?: Options<any | null>
) {
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<z.infer<typeof updateTodoSchema> | null>(
    null
  );

  const refetch = async () => {
    setFetching(true);
    getTodo(id)
      .then((res) => {
        setData(res);
        options?.onSuccess?.(res);
      })
      .catch((e) => {
        setError(e);
        options?.onError?.(e);
      })
      .finally(() => {
        setLoading(false);
        setFetching(false);
      });
  };

  useEffect(() => {
    refetch();
  }, [id]);

  return { loading, error, data, refetch, fetching };
}
