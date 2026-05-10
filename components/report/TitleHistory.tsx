import type { OwnerRecord } from '@/lib/api';
import { BrandCell } from './StatusCell';

export function TitleHistory({ owners }: { owners?: OwnerRecord[] }) {
  if (!owners || owners.length === 0) {
    return <p className="text-sm text-slate-500">No title history available.</p>;
  }

  const hasAlert = owners.some((o) => o.damageBrands === 'alert' || o.damageBrands === 'problem');

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="py-2 pr-4">Brand check</th>
            {owners.map((o) => (
              <th key={o.index} className="py-2 pr-4">
                Owner {o.index}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b align-top">
            <td className="py-3 pr-4">
              <p className="font-medium text-slate-900">Damage Brands</p>
              <p className="mt-1 text-xs text-slate-500">
                Salvage · Junk · Rebuilt · Fire · Flood · Hail · Lemon
              </p>
            </td>
            {owners.map((o) => (
              <td key={o.index} className="py-3 pr-4">
                <BrandCell value={o.damageBrands} />
              </td>
            ))}
          </tr>
          <tr className="align-top">
            <td className="py-3 pr-4">
              <p className="font-medium text-slate-900">Odometer Brands</p>
              <p className="mt-1 text-xs text-slate-500">
                Not Actual Mileage · Exceeds Mechanical Limits
              </p>
            </td>
            {owners.map((o) => (
              <td key={o.index} className="py-3 pr-4">
                <BrandCell value={o.odometerBrands} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {hasAlert && (
        <p className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <strong>Alert!</strong> Severe problems were reported by a state Department of Motor Vehicles
          (DMV). This vehicle does not qualify for the Buyback Guarantee.
        </p>
      )}
    </div>
  );
}
