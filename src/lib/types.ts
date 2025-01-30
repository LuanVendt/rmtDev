export type JobItem = {
  id: number;
  title: string;
  company: string;
  badgeLetters: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobData = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  companyURL: string;
  coverImgURL: string;
  duration: string;
  location: string;
  salary: string;
};

export type JobListItemProps = {
  jobItem: JobItem;
  isActive: boolean;
};

export type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

type JobDataProps = {
  jobData: JobData | null;
};

export type JobMetaInfoProps = { jobData: JobData };

export type JobSummaryProps = JobDataProps;
export type JobQualificationsProps = JobDataProps;
export type JobReviewsProps = JobDataProps;
export type JobImageProps = JobDataProps;

export type PaginateDirection = "next" | "previous";

export type PaginationButtonProps = {
  direction: PaginateDirection;
  currentPage: number;
  onChangePage: () => void;
};

export type SortOptions = "relevant" | "recent";

export type SortingButtonProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export type BookmarkIconProps = {
  id: number;
};

export type TBookmarksContext = {
  bookmarkedIds: number[];
  bookmarkedJobItems: JobData[];
  isLoading: boolean;
  handleToggleBookmark: (id: number) => void;
};

export type TActiveIdContext = {
  activeId: number | null;
};

export type TSearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export type TJobItemsContext = {
  jobItems: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  currentPage: number;
  totalPages: number;
  sortBy: SortOptions;
  onChangePage: (direction: PaginateDirection, totalPages: number) => void;
  handleChangeSortBy: (newSort: SortOptions) => void;
};
