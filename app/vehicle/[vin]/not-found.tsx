import Link from 'next/link';

export const VIN_NOT_FOUND_MESSAGE =
  "We couldn't find any data for this VIN. Please double-check that it contains 17 characters and try again.";

export default function NotFound() {
  return (
    <div className="rounded-xl bg-white p-10 text-center shadow-sm">
      <h1 className="text-2xl font-bold">No data found</h1>
      <p className="mt-3 text-slate-600">{VIN_NOT_FOUND_MESSAGE}</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 text-white">
        Back to search
      </Link>
    </div>
  );
}
