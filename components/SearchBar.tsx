'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const VIN_NOT_FOUND_MESSAGE =
  "We couldn't find any data for this VIN. Please double-check that it contains 17 characters and try again.";

export function SearchBar({ initial = '' }: { initial?: string }) {
  const router = useRouter();
  const [vin, setVin] = useState(initial);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = vin.trim().toUpperCase();
    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(v)) {
      setError(VIN_NOT_FOUND_MESSAGE);
      return;
    }
    setError(null);
    router.push(`/vehicle/${v}`);
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          placeholder="Enter 17-character VIN"
          maxLength={17}
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 font-mono uppercase tracking-wider text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Get report
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
