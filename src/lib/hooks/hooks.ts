import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { JobData, JobItem } from "../types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!searchText) return;

      setIsLoading(true);

      const response = await fetch(`${BASE_URL}?search=${searchText}`);

      const data = await response.json();

      setIsLoading(false);

      setJobItems(data.jobItems);
    }

    fetchData();
  }, [searchText]);

  return { jobItems, isLoading } as const;
}

const fetchJobData = async (activeId: number) => {
  const response = await fetch(`${BASE_URL}/${activeId}`);
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data.jobItem as JobData;
};

export function useJobData(activeId: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", activeId],
    async () => (activeId ? await fetchJobData(activeId) : null),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!activeId,
      onError: (error) => {
        console.error("Error fetching job data:", error);
      },
    }
  );

  return { jobData: data, isJobDataLoading: isInitialLoading } as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);

      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeId;
}

export function useActiveJobData() {
  const activeId = useActiveId();
  const { jobData, isJobDataLoading } = useJobData(activeId);

  return { jobData, isJobDataLoading } as const;
}

export function useDebounce<T>(value: T, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}
