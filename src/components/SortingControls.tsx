import { SortingByttonProps } from "../lib/types";
import { capitalizeWords } from "../lib/utils";

export default function SortingControls({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="sorting">{children}</section>;
}

export function SortingButton({
  sortBy,
  currentSortBy,
  onChangeSortBy,
}: SortingByttonProps) {
  const formatedSortBy = capitalizeWords(sortBy);

  const className = `sorting__button ${
    sortBy === currentSortBy ? "sorting__button--active" : ""
  }`;
  return (
    <button onClick={() => onChangeSortBy(sortBy)} className={className}>
      {formatedSortBy}
    </button>
  );
}
