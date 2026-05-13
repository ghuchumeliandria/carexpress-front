import type { Complaint } from '@/lib/api';

function summarizeByComponent(complaints: Complaint[]) {
  const map = new Map<string, number>();
  for (const c of complaints) {
    const key = c.component?.split(/[:|,]/)[0]?.trim() || 'Other';
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

export function ComplaintList({ complaints }: { complaints?: Complaint[] }) {
  if (!complaints || complaints.length === 0) {
    return <p className="text-sm text-slate-500">No owner complaints reported to NHTSA.</p>;
  }

  const grouped = summarizeByComponent(complaints);
  const totalCrash = complaints.filter((c) => c.crash).length;
  const totalFire = complaints.filter((c) => c.fire).length;
  const totalInjuries = complaints.reduce((s, c) => s + (c.injured ?? 0), 0);
  const totalDeaths = complaints.reduce((s, c) => s + (c.deaths ?? 0), 0);

  return (
    <div className="space-y-4">
      <p className="text-xs italic text-slate-500">
        Owner-reported issues submitted to the NHTSA. Source: api.nhtsa.gov
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total complaints" value={complaints.length} tone="warn" />
        <Stat label="Crash-related" value={totalCrash} tone={totalCrash > 0 ? 'bad' : 'good'} />
        <Stat label="Fire-related" value={totalFire} tone={totalFire > 0 ? 'bad' : 'good'} />
        <Stat
          label="Injuries / Deaths"
          value={`${totalInjuries} / ${totalDeaths}`}
          tone={totalInjuries + totalDeaths > 0 ? 'bad' : 'good'}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-slate-700">Issues by component</p>
        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {grouped.map(([component, count]) => (
            <li key={component} className="flex justify-between rounded border border-slate-200 px-3 py-1.5 text-sm">
              <span className="text-slate-700">{component}</span>
              <span className="font-mono text-slate-500">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      <details className="rounded-md border bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-900">
          View raw complaints ({complaints.length})
        </summary>
        <ul className="divide-y border-t">
          {complaints.map((c, i) => (
            <li key={i} className="space-y-1 px-4 py-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{c.date ?? 'Date unknown'}</span>
                <span className="font-medium">{c.component}</span>
              </div>
              <p className="text-sm text-slate-700">{c.summary}</p>
              {(c.crash || c.fire || c.injured || c.deaths) && (
                <p className="text-xs text-red-700">
                  {c.crash && 'Crash · '}
                  {c.fire && 'Fire · '}
                  {c.injured ? `${c.injured} injured · ` : ''}
                  {c.deaths ? `${c.deaths} deaths` : ''}
                </p>
              )}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: 'good' | 'warn' | 'bad';
}) {
  const cls = {
    good: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    warn: 'border-amber-200 bg-amber-50 text-amber-700',
    bad: 'border-red-200 bg-red-50 text-red-700',
  }[tone];
  return (
    <div className={`rounded-md border px-3 py-2 ${cls}`}>
      <p className="text-[10px] uppercase tracking-wide opacity-70">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
