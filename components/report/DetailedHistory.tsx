import type { OwnerEvent, OwnerRecord } from '@/lib/api';
import { DamageLocation, SeverityScale } from './SeverityScale';

function EventRow({ ev }: { ev: OwnerEvent }) {
  const isDamage = !!ev.damage;
  return (
    <tr className="border-b align-top last:border-0">
      <td className="w-32 py-4 pr-4 text-sm font-medium text-slate-700">{ev.date ?? 'Not Reported'}</td>
      <td className="w-28 py-4 pr-4 text-sm text-slate-700">
        {ev.mileage !== undefined ? ev.mileage.toLocaleString() : <span className="text-slate-400">—</span>}
      </td>
      <td className="py-4 pr-4">
        {ev.source && <p className="text-sm font-semibold text-slate-900">{ev.source}</p>}
        {ev.sourceLocation && <p className="text-xs text-slate-500">{ev.sourceLocation}</p>}
        {ev.sourceContact && <p className="text-xs text-slate-500">{ev.sourceContact}</p>}
        {ev.rating?.stars !== undefined && (
          <p className="mt-1 text-xs text-amber-600">
            ★ {ev.rating.stars.toFixed(1)} / 5.0
            {ev.rating.count ? ` · ${ev.rating.count} reviews` : ''}
          </p>
        )}
      </td>
      <td className="py-4">
        {isDamage ? (
          <div className="space-y-2">
            <p className="font-semibold text-red-700">Damage Report</p>
            <p className="text-sm">{ev.damage?.description}</p>
            <SeverityScale level={ev.damage?.severity} />
            <DamageLocation location={ev.damage?.location} />
          </div>
        ) : (
          <ul className="space-y-1 text-sm text-slate-700">
            {(ev.comments ?? []).map((c, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-slate-400" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        )}
      </td>
    </tr>
  );
}

function OwnerBlock({ owner }: { owner: OwnerRecord }) {
  return (
    <div className="space-y-3">
      <header className="rounded-md bg-slate-100 px-4 py-3">
        <p className="text-base font-semibold text-slate-900">Owner {owner.index}</p>
        <p className="text-xs text-slate-600">
          {owner.yearPurchased ? `Purchased: ${owner.yearPurchased}` : ''}
          {owner.type ? ` · ${owner.type} Vehicle` : ''}
          {owner.milesPerYear ? ` · ${owner.milesPerYear.toLocaleString()} mi/yr` : ''}
        </p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Mileage</th>
              <th className="py-2 pr-4">Source</th>
              <th className="py-2">Comments</th>
            </tr>
          </thead>
          <tbody>
            {(owner.events ?? []).map((ev, i) => (
              <EventRow key={i} ev={ev} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DetailedHistory({ owners }: { owners?: OwnerRecord[] }) {
  if (!owners || owners.length === 0) {
    return <p className="text-sm text-slate-500">No detailed history available.</p>;
  }
  return (
    <div className="space-y-8">
      {owners.map((o) => (
        <OwnerBlock key={o.index} owner={o} />
      ))}
    </div>
  );
}
