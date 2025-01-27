export default function ResultsCount({ count = 0 }: { count: number }) {
  return (
    <p className="count">
      <span className="u-bold">{count}</span> results
    </p>
  );
}
