import type { ReportSummary } from '@/lib/api';

export function QuickFacts({ summary }: { summary?: ReportSummary }) {
  if (!summary) return null;
  const items: Array<{ label: string; tone: 'good' | 'warn' }> = [];
  if (summary.oilChangesRegular) items.push({ label: 'Regular oil changes', tone: 'good' });
  if (summary.openRecalls && summary.openRecalls > 0)
    items.push({
      label: `At least ${summary.openRecalls} open recall${summary.openRecalls > 1 ? 's' : ''}`,
      tone: 'warn',
    });
  if (summary.previousOwners !== undefined)
    items.push({ label: `${summary.previousOwners} Previous owner${summary.previousOwners !== 1 ? 's' : ''}`, tone: 'good' });
  if (summary.useType) items.push({ label: `${summary.useType} vehicle`, tone: 'good' });
  if (summary.lastOwnedState) items.push({ label: `Last owned in ${summary.lastOwnedState}`, tone: 'good' });

  if (items.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((it) => (
        <li
          key={it.label}
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            it.tone === 'warn'
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {it.label}
        </li>
      ))}
    </ul>
  );
}
