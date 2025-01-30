import { useJobItemsContext } from "../lib/hooks/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
  const { jobItems, isLoading } = useJobItemsContext();

  return <JobList jobItems={jobItems} isLoading={isLoading} />;
}
