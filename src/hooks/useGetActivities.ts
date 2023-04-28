import { useState, useEffect } from "react";
import { z } from "zod";
import { activitiesSchema } from "@/schemas";
import { fetchUrl } from "@/consts";
import { email } from "@/consts";

async function getActivities() {
  const response = await fetch(
    fetchUrl +
    "activity-groups?" +
    new URLSearchParams({
      email: email ?? "",
    })
  );
  const data = await response.json();
  const parsedData = activitiesSchema.safeParse(data);
  if (parsedData.success) {
    return parsedData.data;
  }
  return null;
}

export function useGetActivities() {
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<z.infer<typeof activitiesSchema> | null>(
    null
  );

  const refetch = async () => {
    setFetching(true);
    try {
      const res = await getActivities();
      setData(res);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { loading, error, data, refetch, fetching };
}
