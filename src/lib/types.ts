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

export type JobItemContentProps = {
  jobData: JobData | null;
  isJobDataLoading: boolean;
};

type JobDataProps = {
  jobData: JobData | null;
};

export type JobMetaInfoProps = JobDataProps;
export type JobSummaryProps = JobDataProps;
export type JobQualificationsProps = JobDataProps;
export type JobReviewsProps = JobDataProps;
export type JobImageProps = JobDataProps;

export type JobInfoProps = {
  children: React.ReactNode;
};
