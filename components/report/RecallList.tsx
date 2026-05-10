import type { Recall } from '@/lib/api';

export function RecallList({ recalls }: { recalls?: Recall[] }) {
  if (!recalls || recalls.length === 0) {
    return <p className="text-sm text-slate-500">No manufacturer recalls reported.</p>;
  }
  return (
    <ul className="space-y-3">
      {recalls.map((r, i) => (
        <li key={i} className="rounded-md border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-amber-900">
                {r.description || 'Manufacturer safety recall'}
              </p>
              <p className="mt-1 text-xs text-amber-800">
                {r.nhtsaId && <span>NHTSA #{r.nhtsaId} · </span>}
                {r.recallNumber && <span>Recall #{r.recallNumber} · </span>}
                {r.source && <span>{r.source}</span>}
              </p>
            </div>
            {r.status && (
              <span className="whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                {r.status}
              </span>
            )}
          </div>
          {r.date && <p className="mt-2 text-xs text-amber-700">Issued {r.date}</p>}
        </li>
      ))}
    </ul>
  );
}
