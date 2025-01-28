import { useActiveJobData } from "../lib/hooks/hooks";
import {
  JobImageProps,
  JobMetaInfoProps,
  JobQualificationsProps,
  JobReviewsProps,
  JobSummaryProps,
} from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

export default function JobItemContent() {
  const { jobData, isJobDataLoading } = useActiveJobData();

  if (isJobDataLoading) return <LoadingJobContent />;

  if (!jobData) return <EmptyJobContent />;

  return (
    <JobDetails>
      <JobImage jobData={jobData} />

      <ApplyButton />

      <JobInfo>
        <JobMetaInfo jobData={jobData} />
        <JobSummary jobData={jobData} />
      </JobInfo>

      <JobDetailsOder>
        <JobQualifications jobData={jobData} />
        <JobReviews jobData={jobData} />
      </JobDetailsOder>

      <JobFooter />
    </JobDetails>
  );
}

function LoadingJobContent() {
  return (
    <section className="job-details">
      <div>
        <Spinner />
      </div>
    </section>
  );
}

function EmptyJobContent() {
  return (
    <section className="job-details">
      <div>
        <div className="job-details__start-view">
          <p>What are you looking for?</p>
          <p>
            Start by searching for any technology your ideal job is working with
          </p>
        </div>
      </div>
    </section>
  );
}

function JobDetails({ children }: { children: React.ReactNode }) {
  return <section className="job-details">{children}</section>;
}

function JobImage({ jobData }: JobImageProps) {
  return <img src={jobData?.coverImgURL} alt="Job Cover" />;
}

function ApplyButton() {
  return (
    <a
      className="apply-btn"
      href="https://fictional9thtechwebsite.com/"
      target="_blank"
    >
      Apply
    </a>
  );
}

function JobInfo({ children }: { children: React.ReactNode }) {
  return <section className="job-info">{children}</section>;
}

function JobMetaInfo({ jobData }: JobMetaInfoProps) {
  return (
    <div className="job-info__left">
      <div className="job-info__badge">{jobData?.badgeLetters}</div>
      <div className="job-info__below-badge">
        <time className="job-info__time">{jobData?.daysAgo}d</time>

        <BookmarkIcon />
      </div>
    </div>
  );
}

function JobSummary({ jobData }: JobSummaryProps) {
  return (
    <div className="job-info__right">
      <h2 className="second-heading">{jobData?.title}</h2>
      <p className="job-info__company">{jobData?.company}</p>
      <p className="job-info__description">{jobData?.description}</p>
      <div className="job-info__extras">
        <p className="job-info__extra">
          <i className="fa-solid fa-clock job-info__extra-icon"></i>
          {jobData?.duration}
        </p>
        <p className="job-info__extra">
          <i className="fa-solid fa-money-bill job-info__extra-icon"></i>
          {jobData?.salary}
        </p>
        <p className="job-info__extra">
          <i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
          {jobData?.location}
        </p>
      </div>
    </div>
  );
}

function JobDetailsOder({ children }: { children: React.ReactNode }) {
  return <div className="job-details__other">{children}</div>;
}

function JobQualifications({ jobData }: JobQualificationsProps) {
  return (
    <section className="qualifications">
      <div className="qualifications__left">
        <h4 className="fourth-heading">Qualifications</h4>
        <p className="qualifications__sub-text">
          Other qualifications may apply
        </p>
      </div>
      <ul className="qualifications__list">
        {jobData?.qualifications.map((qualification, index) => (
          <li key={index} className="qualifications__item">
            {qualification}
          </li>
        ))}
      </ul>
    </section>
  );
}

function JobReviews({ jobData }: JobReviewsProps) {
  return (
    <section className="reviews">
      <div className="reviews__left">
        <h4 className="fourth-heading">Company reviews</h4>
        <p className="reviews__sub-text">Recent things people are saying</p>
      </div>
      <ul className="reviews__list">
        {jobData?.reviews.map((review, index) => (
          <li key={index} className="reviews__item">
            {review}
          </li>
        ))}
      </ul>
    </section>
  );
}

function JobFooter() {
  return (
    <footer className="job-details__footer">
      <p className="job-details__footer-text">
        If possible, please reference that you found the job on{" "}
        <span className="u-bold">rmtDev</span>, we would really appreciate it!
      </p>
    </footer>
  );
}
