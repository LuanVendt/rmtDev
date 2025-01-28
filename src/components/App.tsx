import { useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  useDebounce,
  useJobItems,
  usePagination,
  usePaginationInfo,
  useSortInfo,
} from "../lib/hooks/hooks";
import { SortOptions } from "../lib/types";
import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import { Header, HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Logo from "./Logo";
import PaginationControls, { PagiationButton } from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SearchForm from "./SearchForm";
import { Sidebar, SidebarTop } from "./Sidebar";
import SortingControls, { SortingButton } from "./SortingControls";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const { currentPage, onChangePage, setCurrentPage } = usePagination();
  const totalNumberOfResults = jobItems?.length || 0;

  const [sortBy, setSortBy] = useState<SortOptions>("relevant");

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
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={totalNumberOfResults} />

            <SortingControls>
              <SortingButton
                sortBy="relevant"
                currentSortBy={sortBy}
                onChangeSortBy={handleChangeSortBy}
              />
              <SortingButton
                sortBy="recent"
                currentSortBy={sortBy}
                onChangeSortBy={handleChangeSortBy}
              />
            </SortingControls>
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls>
            <PagiationButton
              direction="previous"
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={(direction) => onChangePage(direction, totalPages)}
            />

            <PagiationButton
              direction="next"
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={(direction) => onChangePage(direction, totalPages)}
            />
          </PaginationControls>
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
