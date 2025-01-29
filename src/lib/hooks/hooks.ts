import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { BookmarksContext } from "../../contexts/BookmarksContextProvider";
import { BASE_URL, ITEMS_PER_PAGE } from "../constants";
import { JobData, JobItem, PaginateDirection, SortOptions } from "../types";
import { handleErrors } from "../utils";

const fetchJobItems = async (searchText: string) => {
  const response = await fetch(`${BASE_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data.jobItems as JobItem[];
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    async () => (searchText ? await fetchJobItems(searchText) : null),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: handleErrors,
    }
  );

  return { jobItems: data, isLoading: isInitialLoading } as const;
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
      onError: handleErrors,
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

export function usePagination() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (
    direction: PaginateDirection,
    totalPages: number
  ) => {
    setCurrentPage((prev) => {
      if (direction === "next" && prev < totalPages) {
        return prev + 1;
      } else if (direction === "previous" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return {
    currentPage,
    onChangePage: handleChangePage,
    setCurrentPage,
  } as const;
}

export function usePaginationInfo(
  jobItems: JobItem[] | null | undefined,
  totalItems: number,
  currentPage: number,
  jobItemsSorted: JobItem[] | null | undefined
) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const jobItemsSliced = jobItemsSorted
    ? jobItemsSorted?.slice(startIndex, endIndex) || []
    : [...(jobItems || [])].slice(startIndex, endIndex);

  return {
    totalPages,
    jobItemsSliced,
  };
}

export function useSortInfo(
  sortBy: SortOptions,
  setSortBy: React.Dispatch<React.SetStateAction<SortOptions>>,
  jobItems: JobItem[] | null | undefined,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) {
  const jobItemsSorted = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === "relevant") return b.relevanceScore - a.relevanceScore;
    else return a.daysAgo - b.daysAgo;
  });

  const handleChangeSortBy = (newSort: SortOptions) => {
    setCurrentPage(1);
    setSortBy(newSort);
  };

  return {
    jobItemsSorted,
    handleChangeSortBy,
  } as const;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);

  if (!context)
    throw new Error(
      "useBookmarks must be used within a BookmarksContextProvider"
    );

  return context;
}
