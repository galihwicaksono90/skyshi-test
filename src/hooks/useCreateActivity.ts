import { createResponseSchema } from "@/schemas";
import { Options } from "@/types";
import { useState } from "react";
import { z } from "zod";
import { fetchUrl } from "@/consts";
import { email } from "@/consts";

async function createActivity() {
  const response = await fetch(fetchUrl + "activity-groups/", {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: "New Activity",
      email: email ?? "",
    }),
    method: "POST",
  });

  if (response.status === 201) {
    const data = await response.json();
    const parsedData = createResponseSchema.parse(data);
    return parsedData;
  }

  throw new Error(response.statusText);
}

export function useCreateActivity<TError = unknown>(
  options?: Options<z.infer<typeof createResponseSchema> | null, TError>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<z.infer<typeof createResponseSchema> | null>(
    null
  );

  const mutate = () => {
    setLoading(true);

    createActivity()
      .then((res) => {
        if (!res) {
          return;
        }
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
