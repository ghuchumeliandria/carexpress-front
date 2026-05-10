import type { FullReport } from '@/lib/api';

const FACTORS_FROM_SUMMARY = (s: FullReport['summary']) => {
  const out: string[] = [];
  if (!s) return out;
  if (s.oilChangesRegular) out.push('Regular Oil Changes');
  if (s.useType) out.push(`${s.useType} Vehicle`);
  if (s.salvage) out.push('Salvage Brand');
  if (s.openRecalls && s.openRecalls > 0) out.push('Open Recall');
  return out;
};

export function ValueReport({ report }: { report: FullReport }) {
  if (!report.retailValue) return null;
  const factors = FACTORS_FROM_SUMMARY(report.summary);
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: report.retailValue.currency || 'USD',
    maximumFractionDigits: 0,
  }).format(report.retailValue.amount);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-lg bg-slate-50 p-6 text-center">
        <p className="text-4xl font-bold text-slate-900">{formatted}</p>
        <p className="mt-2 text-sm font-medium text-slate-600">Retail Value</p>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700">History events affecting this vehicle's value</p>
        <ul className="mt-3 space-y-2">
          {factors.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
