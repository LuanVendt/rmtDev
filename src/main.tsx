import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import BookmarksContextProvider from "./contexts/BookMarksContextProvider.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarksContextProvider>
        <App />
      </BookmarksContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
