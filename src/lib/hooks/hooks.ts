import { useEffect, useState } from "react";
import { BASE_URL } from "../constants";
import { JobData, JobItem } from "../types";

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

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

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

  return { jobItems: jobItemsSliced, isLoading, totalNumberOfResults } as const;
}

export function useJobData(activeId: number | null) {
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!activeId) return;

      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/${activeId}`);

      const data = await response.json();

      setIsLoading(false);

      setJobData(data.jobItem);
    };

    fetchData();
  }, [activeId]);

  return { jobData, isJobDataLoading: isLoading } as const;
}

export function useActiveJobData() {
  const activeId = useActiveId();
  const { jobData, isJobDataLoading } = useJobData(activeId);

  return { jobData, isJobDataLoading } as const;
}
