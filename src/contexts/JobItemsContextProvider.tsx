import { createContext, useState } from "react";
import {
  usePagination,
  usePaginationInfo,
  useSearchQuery,
  useSearchTextContext,
  useSortInfo,
} from "../lib/hooks/hooks";
import { SortOptions, TJobItemsContext } from "../lib/types";

export const JobItemsContext = createContext<TJobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const { currentPage, onChangePage, setCurrentPage } = usePagination();
  const [sortBy, setSortBy] = useState<SortOptions>("relevant");

  const totalNumberOfResults = jobItems?.length || 0;

  const { jobItemsSorted, handleChangeSortBy } = useSortInfo(
    sortBy,
    setSortBy,
    jobItems,
    setCurrentPage
  );

  const { totalPages, jobItemsSliced } = usePaginationInfo(
    jobItems,
    totalNumberOfResults,
    currentPage,
    jobItemsSorted
  );

  return (
    <JobItemsContext.Provider
      value={{
        jobItems: jobItemsSliced,
        isLoading,
        totalNumberOfResults,
        currentPage,
        totalPages,
        sortBy,
        onChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
