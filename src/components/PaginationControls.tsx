import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PaginationButtonProps } from "../lib/types";

export default function PaginationControls({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="pagination">{children}</section>;
}

export function PagiationButton({
  direction,
  currentPage,
  totalPages,
  onChangePage,
}: PaginationButtonProps) {
  const nextPageNumber = currentPage + 1;
  const previousPageNumber = Math.max(currentPage - 1, 1);

  const isDisabled =
    (direction === "next" && currentPage >= totalPages) ||
    (direction === "previous" && currentPage <= 1);

  const className = `pagination__button ${
    isDisabled ? "pagination__button--hidden" : ""
  }`;

  return (
    <>
      <button
        className={className}
        onClick={(e) => {
          onChangePage(direction);
          e.currentTarget.blur();
        }}
      >
        {direction === "previous" ? (
          <>
            <ArrowLeftIcon /> Page {previousPageNumber}
          </>
        ) : (
          <>
            Page {nextPageNumber} <ArrowRightIcon />
          </>
        )}
      </button>
    </>
  );
}
