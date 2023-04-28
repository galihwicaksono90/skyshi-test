import { useState } from "react";
import { Options } from "@/types";
import { fetchUrl } from "@/consts";

interface DeleteTodoVariables {
  id: number;
}

async function deleteTodo(values: DeleteTodoVariables) {
  const response = await fetch(fetchUrl + "todo-items/" + values.id, {
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...values }),
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw new Error(response.statusText);
}

export function useDeleteTodo<TError = unknown>(
  options?: Options<void, TError>
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError | null>(null);

  const mutate = (variables: DeleteTodoVariables) => {
    setLoading(true);

    deleteTodo(variables)
      .then(() => {
        options?.onSuccess?.();
      })
      .catch((e: TError) => {
        setError(e);
        options?.onError?.(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { mutate, loading, error };
}
