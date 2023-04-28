import { Priority } from "@/types";
import { useState } from "react";
import { z } from "zod";
import { Options } from "@/types";
import { todoSchema } from "@/schemas";
import { fetchUrl } from "@/consts";

interface UpdateTodoVariables {
  id: number;
  title?: string;
  priority?: Priority;
  is_active?: 0 | 1;
}

async function updateTodo(values: UpdateTodoVariables) {
  const response = await fetch(fetchUrl + "todo-items/" + values.id, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...values }),
    method: "PATCH",
  });

  if (response.ok) {
    const data = await response.json();
    const parsedData = todoSchema.parse(data);
    return parsedData;
  }

  throw new Error(response.statusText);
}

export function useUpdateTodo<TError = unknown>(
  options?: Options<z.infer<typeof todoSchema> | null, TError>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError | null>(null);
  const [data, setData] = useState<z.infer<typeof todoSchema> | null>(null);

  const mutate = (variables: UpdateTodoVariables) => {
    setLoading(true);

    updateTodo(variables)
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
