import { JobListProps } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }: JobListProps) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}

      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem key={jobItem.id} jobItem={jobItem} />
        ))}
    </ul>
  );
}
export default JobList;
