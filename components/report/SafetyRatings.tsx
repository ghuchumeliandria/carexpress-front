import type { SafetyRating } from '@/lib/api';

function Stars({ value }: { value?: number | string }) {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return <span className="text-slate-400">Not rated</span>;
  return (
    <span className="text-amber-500" aria-label={`${n} out of 5`}>
      {'★'.repeat(Math.round(n))}
      <span className="text-slate-200">{'★'.repeat(5 - Math.round(n))}</span>
    </span>
  );
}

const ROWS: Array<{ key: keyof SafetyRating; label: string }> = [
  { key: 'overallRating', label: 'Overall' },
  { key: 'overallFrontCrashRating', label: 'Frontal crash (overall)' },
  { key: 'frontCrashDriversideRating', label: 'Frontal — driver' },
  { key: 'frontCrashPassengersideRating', label: 'Frontal — passenger' },
  { key: 'overallSideCrashRating', label: 'Side crash (overall)' },
  { key: 'sideCrashDriversideRating', label: 'Side — driver' },
  { key: 'sideCrashPassengersideRating', label: 'Side — passenger' },
  { key: 'sidePoleCrashRating', label: 'Side pole' },
  { key: 'rolloverRating', label: 'Rollover' },
];

export function SafetyRatings({ ratings }: { ratings?: SafetyRating[] }) {
  if (!ratings || ratings.length === 0) {
    return <p className="text-sm text-slate-500">No NHTSA crash test ratings available for this vehicle.</p>;
  }
  return (
    <div className="space-y-6">
      {ratings.map((r, idx) => (
        <div key={idx} className="rounded-lg border bg-white p-4">
          {r.vehicleDescription && (
            <p className="mb-3 text-sm font-semibold text-slate-900">{r.vehicleDescription}</p>
          )}
          <dl className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {ROWS.map((row) => (
              <div
                key={row.key as string}
                className="flex items-center justify-between border-b border-slate-100 py-1.5 text-sm"
              >
                <dt className="text-slate-600">{row.label}</dt>
                <dd className="font-medium">
                  <Stars value={r[row.key] as number | string | undefined} />
                </dd>
              </div>
            ))}
            {r.rolloverRiskPercent !== undefined && (
              <div className="flex items-center justify-between border-b border-slate-100 py-1.5 text-sm sm:col-span-2">
                <dt className="text-slate-600">Rollover risk</dt>
                <dd className="font-medium text-slate-900">{r.rolloverRiskPercent}%</dd>
              </div>
            )}
          </dl>
        </div>
      ))}
    </div>
  );
}
