import type { Investigation } from '@/lib/api';

const TYPE_LABEL: Record<string, string> = {
  PE: 'Preliminary Evaluation',
  EA: 'Engineering Analysis',
  RQ: 'Recall Query',
  DP: 'Defect Petition',
};

const STATUS_TONE = (s?: string) => {
  if (!s) return 'bg-slate-100 text-slate-700';
  const u = s.toUpperCase();
  if (u.includes('OPEN')) return 'bg-amber-100 text-amber-800';
  if (u.includes('CLOSED')) return 'bg-slate-100 text-slate-600';
  return 'bg-slate-100 text-slate-700';
};

export function InvestigationList({ investigations }: { investigations?: Investigation[] }) {
  if (!investigations || investigations.length === 0) {
    return <p className="text-sm text-slate-500">No federal investigations reported by NHTSA.</p>;
  }
  return (
    <ul className="space-y-3">
      {investigations.map((inv, i) => (
        <li key={i} className="rounded-md border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {inv.component || 'Investigation'}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {inv.campaignNumber && <span>{inv.campaignNumber} · </span>}
                {inv.type && <span>{TYPE_LABEL[inv.type] || inv.type} · </span>}
                {inv.date && <span>{inv.date}</span>}
              </p>
            </div>
            {inv.status && (
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_TONE(
                  inv.status,
                )}`}
              >
                {inv.status}
              </span>
            )}
          </div>
          {inv.summary && <p className="mt-2 text-sm text-slate-700">{inv.summary}</p>}
        </li>
      ))}
    </ul>
  );
}
