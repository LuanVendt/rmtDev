import toast from "react-hot-toast";
import { ITEMS_PER_PAGE } from "./constants";
import { JobItem } from "./types";

export function handleErrors(error: unknown) {
  if (error instanceof Error) toast.error(error.message);
  else if (typeof error === "string") toast.error(error);
  else toast.error("An error occurred");
}

export function getPaginationInfo(
  jobItems: JobItem[] | null | undefined,
  totalItems: number,
  currentPage: number
) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const jobItemsSliced = jobItems?.slice(startIndex, endIndex) || [];

  return {
    totalPages,
    jobItemsSliced,
  };
}
