import { config } from "@api/common";
import { useEffect, useState } from "react";

export const useFetch = ({ enabled = true, options, query }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await query({ config, ...options });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, JSON.stringify(options)]);

  if (!enabled) {
    return { data: null, error: null, isLoading: null };
  }

  return { data, error, isLoading };
};
