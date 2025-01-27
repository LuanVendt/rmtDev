export type JobItem = {
  id: number;
  title: string;
  company: string;
  badgeLetters: string;
  relevanceScore: number;
  daysAgo: number;
};

export type JobListItemProps = {
  jobItem: JobItem;
};

export type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export type SidebarProps = {
  jobItems: JobItem[];
};

export type ContainerProps = {
  jobItems: JobItem[];
};

export type SearchFormProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};
