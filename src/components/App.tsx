import { useState } from "react";
import { useDebounce, useJobItems } from "../lib/hooks/hooks";
import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import { Header, HeaderTop } from "./Header";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import Logo from "./Logo";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SearchForm from "./SearchForm";
import { Sidebar, SidebarTop } from "./Sidebar";
import SortingControls from "./SortingControls";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);

  const totalNumberOfResults = jobItems?.length || 0;
  const jobItemsSliced = jobItems?.slice(0, 7) || [];

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
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>

        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
