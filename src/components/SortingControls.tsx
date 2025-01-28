import { SortingControlsProps } from "../lib/types";

export default function SortingControls({
  onChangeSortBy,
  sortBy,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        onClick={() => onChangeSortBy("relevant")}
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" ? "sorting__button--active" : ""
        }`}
      >
        Relevant
      </button>

      <button
        onClick={() => onChangeSortBy("recent")}
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" ? "sorting__button--active" : ""
        }`}
      >
        Recent
      </button>
    </section>
  );
}
