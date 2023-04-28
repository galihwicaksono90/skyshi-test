import { updateActivitySchema } from "@/schemas";
import { Options } from "@/types";
import { useState } from "react";
import { z } from "zod";
import { fetchUrl } from "@/consts";

interface UpdateActivityVariables {
  id: string;
  title?: string;
  is_active?: 0 | 1;
}

async function updateActivity(values: UpdateActivityVariables) {
  const response = await fetch(fetchUrl + "activity-groups/" + values.id, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...values }),
    method: "PATCH",
  });

  if (response.ok) {
    const data = await response.json();
    const parsedData = updateActivitySchema.parse(data);
    return parsedData;
  }

  throw new Error(response.statusText);
}

export function useUpdateActivity<TError>(
  options?: Options<z.infer<typeof updateActivitySchema> | null>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<z.infer<typeof updateActivitySchema> | null>(
    null
  );

  const mutate = (variables: UpdateActivityVariables) => {
    setLoading(true);

    updateActivity(variables)
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
