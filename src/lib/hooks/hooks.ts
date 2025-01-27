import { useEffect, useState } from "react";
import { JobItem } from "../types";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!searchText) return;

      setIsLoading(true);

      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );

      const data = await response.json();

      setIsLoading(false);

      setJobItems(data.jobItems);
    }

    fetchData();
  }, [searchText]);

  return { jobItems, isLoading };
}
