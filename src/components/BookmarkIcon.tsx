import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks/hooks";
import { BookmarkIconProps } from "../lib/types";

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  return (
    <button
      onClick={(e) => {
        handleToggleBookmark(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`
          ${bookmarkedIds.includes(id) ? "filled" : ""}
        `}
      />
    </button>
  );
}
