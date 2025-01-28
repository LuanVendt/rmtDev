import toast from "react-hot-toast";
import { ITEMS_PER_PAGE } from "./constants";
import { JobItem, SortOptions } from "./types";

export function handleErrors(error: unknown) {
  if (error instanceof Error) toast.error(error.message);
  else if (typeof error === "string") toast.error(error);
  else toast.error("An error occurred");
}

export function getPaginationInfo(
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

export function getSortInfo(
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
