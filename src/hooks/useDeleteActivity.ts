import { Options } from "@/types";
import { useState } from "react";
import { fetchUrl } from "@/consts";

export async function deleteActivity(id: number) {
  const response = await fetch(fetchUrl + "activity-groups/" + id, {
    method: "DELETE",
  });
  if (response.ok) {
    await response.json();
    return id;
  }

  throw new Error(response.statusText);
}

export function useDeleteActivity<TError = unknown>(
  options?: Options<number | null, TError>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<number | null>(null);

  const mutate = (id: number) => {
    setLoading(true);
    deleteActivity(id)
      .then((res) => {
        setData(res);
        options?.onSuccess?.(res);
      })
      .catch((e: TError) => {
        setError(e);
        options?.onError?.(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { data, mutate, loading, error };
}
