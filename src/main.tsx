import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import ActiveIdContextProvider from "./contexts/ActiveIdContextProvider.tsx";
import BookmarksContextProvider from "./contexts/BookmarksContextProvider.tsx";
import JobItemsContextProvider from "./contexts/JobItemsContextProvider.tsx";
import SearchTextContextProvider from "./contexts/SearchTextContextProvider.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchTextContextProvider>
        <JobItemsContextProvider>
          <BookmarksContextProvider>
            <ActiveIdContextProvider>
              <App />
            </ActiveIdContextProvider>
          </BookmarksContextProvider>
        </JobItemsContextProvider>
      </SearchTextContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
