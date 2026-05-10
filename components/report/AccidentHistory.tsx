import type { AccidentEvent } from '@/lib/api';
import { SeverityScale } from './SeverityScale';

export function AccidentHistory({ events }: { events?: AccidentEvent[] }) {
  if (!events || events.length === 0) {
    return <p className="text-sm text-slate-500">No accidents reported.</p>;
  }
  return (
    <div className="space-y-4">
      <p className="text-xs italic text-slate-500">Not all accidents / issues are reported.</p>
      {events.map((e) => (
        <div key={e.index} className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Event {e.index}</p>
              <p className="text-xs text-slate-500">{e.date}</p>
              <p className="mt-2 text-sm">{e.description ?? 'Damage reported'}</p>
            </div>
            <SeverityScale level={e.severity} />
          </div>
        </div>
      ))}
    </div>
  );
}
