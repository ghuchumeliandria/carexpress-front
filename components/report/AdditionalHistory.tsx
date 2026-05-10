import type { OwnerRecord } from '@/lib/api';
import { FlagCell } from './StatusCell';

const ROWS: Array<{
  key: keyof NonNullable<OwnerRecord['additional']>;
  label: string;
  blurb: string;
}> = [
  { key: 'totalLoss', label: 'Total Loss', blurb: 'No total loss reported.' },
  {
    key: 'structuralDamage',
    label: 'Structural Damage',
    blurb: 'We recommend inspection by a collision repair specialist.',
  },
  { key: 'airbagDeployment', label: 'Airbag Deployment', blurb: 'No airbag deployment reported.' },
  { key: 'odometerCheck', label: 'Odometer Check', blurb: 'No indication of an odometer rollback.' },
  { key: 'accidentDamage', label: 'Accident / Damage', blurb: 'DMV title problems / damage history.' },
  { key: 'manufacturerRecall', label: 'Manufacturer Recall', blurb: 'Manufacturer recall status.' },
  { key: 'basicWarranty', label: 'Basic Warranty', blurb: 'Original manufacturer warranty status.' },
];

export function AdditionalHistory({ owners }: { owners?: OwnerRecord[] }) {
  if (!owners || owners.length === 0) {
    return <p className="text-sm text-slate-500">Not enough data to assemble the history matrix.</p>;
  }
  return (
    <div className="overflow-x-auto">
      <p className="mb-3 text-xs italic text-slate-500">Not all accidents / issues are reported.</p>
      <table className="w-full min-w-[600px] text-sm">
        <thead className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="py-2 pr-4">Category</th>
            {owners.map((o) => (
              <th key={o.index} className="py-2 pr-4">
                Owner {o.index}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.key} className="border-b last:border-0 align-top">
              <td className="py-3 pr-4">
                <p className="font-medium text-slate-900">{row.label}</p>
                <p className="mt-1 text-xs text-slate-500">{row.blurb}</p>
              </td>
              {owners.map((o) => (
                <td key={o.index} className="py-3 pr-4 text-sm">
                  <FlagCell value={o.additional?.[row.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
