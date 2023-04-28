import { todosSchema } from "@/schemas";
import { useState, useEffect } from "react";
import { z } from "zod";
import { fetchUrl } from "@/consts";

async function getActivity(id: string) {
  const response = await fetch(fetchUrl + "activity-groups/" + id);
  if (response.ok) {
    const data = await response.json();
    const parsedData = todosSchema.parse(data);
    return parsedData;
  }
  throw new Error(response.statusText);
}

export function useGetActivity<TError = unknown>({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<z.infer<typeof todosSchema> | null>(null);

  const refetch = async () => {
    setFetching(true);
    getActivity(id)
      .then((res) => {
        setData(res);
      })
      .catch((e) => setError(e))
      .finally(() => {
        setLoading(false);
        setFetching(false);
      });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { loading, error, data, refetch, fetching };
}
