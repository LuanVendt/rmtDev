import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../lib/hooks/hooks";
import { PaginationButtonProps } from "../lib/types";

export default function PaginationControls() {
  const {
    currentPage,
    totalPages,
    onChangePage: onClick,
  } = useJobItemsContext();

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onChangePage={() => onClick("previous", totalPages)}
        />
      )}
      {currentPage < totalPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onChangePage={() => onClick("next", totalPages)}
        />
      )}
    </section>
  );
}

function PaginationButton({
  direction,
  currentPage,
  onChangePage,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onChangePage();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
