export default function Spinner({ className }: { className?: string }) {
  return (
    <div className={`spinner ${className || "spinner--job-details"}`}></div>
  );
}
