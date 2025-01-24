import { JobListProps } from "../lib/types";
import JobListItem from "./JobListItem";

export function JobList({ jobItems }: JobListProps) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem key={jobItem.id} jobItem={jobItem} />
      ))}
    </ul>
  );
}
export default JobList;
