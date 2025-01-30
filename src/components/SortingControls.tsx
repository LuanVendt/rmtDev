import { useJobItemsContext } from "../lib/hooks/hooks";
import { SortingButtonProps } from "../lib/types";

export default function SortingControls() {
  const { sortBy, handleChangeSortBy: onChangeSortBy } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => onChangeSortBy("relevant")}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>

      <SortingButton
        onClick={() => onChangeSortBy("recent")}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

export function SortingButton({
  children,
  onClick,
  isActive,
}: SortingButtonProps) {
  return (
    <button
      onClick={() => onClick()}
      className={`sorting__button ${isActive ? "sorting__button--active" : ""}`}
    >
      {children}
    </button>
  );
}
