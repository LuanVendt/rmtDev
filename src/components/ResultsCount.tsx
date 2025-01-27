export default function ResultsCount({ count = 0 }: { count: number }) {
  return <p className="count">{count} results</p>;
}
