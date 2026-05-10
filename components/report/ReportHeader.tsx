import type { FullReport } from '@/lib/api';

export function ReportHeader({ report }: { report: FullReport }) {
  const d = report.decoded;
  const title = [d.year, d.make, d.model, d.trim].filter(Boolean).join(' ') || 'Vehicle';
  const formattedValue = report.retailValue
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: report.retailValue.currency || 'USD',
        maximumFractionDigits: 0,
      }).format(report.retailValue.amount)
    : null;

  return (
    <header className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b bg-slate-50 px-6 py-3 text-xs uppercase tracking-wide text-slate-500">
        Vehicle History Report
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
            {report.mileage !== undefined && (
              <span>{report.mileage.toLocaleString()} mi</span>
            )}
            <span className="font-mono text-xs">VIN: {report.vin}</span>
            {report.windowStickerUrl && (
              <a
                href={report.windowStickerUrl}
                className="text-brand-600 underline-offset-2 hover:underline"
              >
                Original Window Sticker
              </a>
            )}
          </div>
          <dl className="mt-4 grid gap-x-6 gap-y-1 text-sm text-slate-600 sm:grid-cols-2">
            {d.bodyClass && <Stat label="Body" value={d.bodyClass} />}
            {d.engine?.displacementL && (
              <Stat
                label="Engine"
                value={`${d.engine.displacementL}L${d.engine.cylinders ? ` I${d.engine.cylinders}` : ''}`}
              />
            )}
            {d.engine?.fuelType && <Stat label="Fuel" value={d.engine.fuelType} />}
            {d.driveType && <Stat label="Drive" value={d.driveType} />}
          </dl>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          {report.summary?.brandedTitle && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
              Branded title
            </span>
          )}
          {report.summary?.salvage && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              Salvage
            </span>
          )}
          {formattedValue && (
            <div className="rounded-md border border-slate-200 px-3 py-2 text-right">
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Retail value</p>
              <p className="text-xl font-bold text-slate-900">{formattedValue}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-800">{value}</dd>
    </div>
  );
}
