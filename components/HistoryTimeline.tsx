import type { FullReport } from '@/lib/api';

export function HistoryTimeline({ events }: { events: FullReport['history'] }) {
  if (!events.length) {
    return <p className="text-sm text-slate-500">No history records available from current providers.</p>;
  }
  const sorted = [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <ol className="relative ml-3 border-l border-slate-200">
      {sorted.map((e, i) => (
        <li key={i} className="mb-6 ml-4">
          <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-brand-500" />
          <time className="text-xs font-medium text-slate-500">
            {new Date(e.date).toLocaleDateString()}
          </time>
          <h3 className="text-sm font-semibold capitalize">{e.type}</h3>
          {e.description && <p className="text-sm text-slate-600">{e.description}</p>}
          <p className="mt-1 text-xs text-slate-400">
            {e.source}
            {e.location ? ` · ${e.location}` : ''}
            {e.mileage ? ` · ${e.mileage.toLocaleString()} mi` : ''}
          </p>
        </li>
      ))}
    </ol>
  );
}
