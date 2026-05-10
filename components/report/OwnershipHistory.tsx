import type { OwnerRecord } from '@/lib/api';

function formatLength(months?: number) {
  if (!months) return '—';
  const y = Math.floor(months / 12);
  const m = months % 12;
  const yLabel = y ? `${y} year${y > 1 ? 's' : ''}` : '';
  const mLabel = m ? `${m} month${m > 1 ? 's' : ''}` : '';
  return [yLabel, mLabel].filter(Boolean).join(' ') || '—';
}

const ROWS: Array<{ label: string; pick: (o: OwnerRecord) => string }> = [
  { label: 'Year purchased', pick: (o) => o.yearPurchased?.toString() ?? '—' },
  { label: 'Type of owner', pick: (o) => o.type ?? '—' },
  { label: 'Estimated length of ownership', pick: (o) => formatLength(o.lengthMonths) },
  { label: 'Owned in', pick: (o) => o.states?.join(', ') ?? '—' },
  {
    label: 'Estimated miles driven per year',
    pick: (o) => (o.milesPerYear ? `${o.milesPerYear.toLocaleString()} per year` : '—'),
  },
  {
    label: 'Last reported odometer reading',
    pick: (o) => (o.lastOdometer ? o.lastOdometer.toLocaleString() : '—'),
  },
];

export function OwnershipHistory({ owners }: { owners?: OwnerRecord[] }) {
  if (!owners || owners.length === 0) {
    return <p className="text-sm text-slate-500">Ownership data unavailable.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <p className="mb-3 text-xs italic text-slate-500">The number of owners is estimated.</p>
      <table className="w-full min-w-[600px] text-sm">
        <thead className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="py-2 pr-4"></th>
            {owners.map((o) => (
              <th key={o.index} className="py-2 pr-4">
                Owner {o.index}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-b last:border-0">
              <td className="py-3 pr-4 text-slate-500">{r.label}</td>
              {owners.map((o) => (
                <td key={o.index} className="py-3 pr-4 font-medium text-slate-900">
                  {r.pick(o)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
