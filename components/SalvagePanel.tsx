import type { FullReport } from '@/lib/api';

export function SalvagePanel({ records }: { records: FullReport['salvage'] }) {
  if (!records.length) {
    return <p className="text-sm text-slate-500">No salvage or auction records found.</p>;
  }
  return (
    <ul className="space-y-3">
      {records.map((r, i) => (
        <li key={i} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-amber-900">
              {r.auction || r.source}
            </span>
            {r.saleDate && (
              <span className="text-xs text-amber-700">
                {new Date(r.saleDate).toLocaleDateString()}
              </span>
            )}
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {r.damage && <><dt className="text-amber-700">Damage</dt><dd>{r.damage}</dd></>}
            {r.odometer != null && <><dt className="text-amber-700">Odometer</dt><dd>{r.odometer.toLocaleString()}</dd></>}
            {r.finalBid != null && <><dt className="text-amber-700">Final bid</dt><dd>${r.finalBid.toLocaleString()}</dd></>}
            {r.status && <><dt className="text-amber-700">Status</dt><dd>{r.status}</dd></>}
          </dl>
        </li>
      ))}
    </ul>
  );
}
