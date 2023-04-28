import { useState } from "react";
import { z } from "zod";
import { Options } from "@/types";
import { createResponseSchema } from "@/schemas";
import { fetchUrl } from "@/consts";

interface CreateTodoVariables {
  activity_group_id: string;
  priority: string;
  title: string;
}

async function createTodo(values: CreateTodoVariables) {
  const response = await fetch(fetchUrl + "todo-items", {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...values }),
    method: "POST",
  });

  if (response.status === 201) {
    const data = await response.json();
    return data;
  }

  throw new Error(response.statusText);
}

export function useCreateTodo<TError = unknown>(
  options?: Options<z.infer<typeof createResponseSchema> | null, TError>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<z.infer<typeof createResponseSchema> | null>(
    null
  );

  const mutate = (variables: CreateTodoVariables) => {
    setLoading(true);

    createTodo(variables)
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
