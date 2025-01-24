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
};

export type SidebarProps = {
  jobItems: JobItem[];
};

export type ContainerProps = {
  jobItems: JobItem[];
};
