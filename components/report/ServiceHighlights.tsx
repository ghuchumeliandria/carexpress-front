import type { ServiceHighlight } from '@/lib/api';

export function ServiceHighlights({ items }: { items?: ServiceHighlight[] }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-slate-500">No recent service reported.</p>;
  }
  return (
    <div>
      <p className="mb-3 text-xs italic text-slate-500">Key services performed in the last 12 months.</p>
      <table className="w-full text-sm">
        <thead className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Service</th>
            <th className="py-2">Comments</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-3 pr-4 text-slate-700">{s.date}</td>
              <td className="py-3 pr-4 font-medium">{s.service}</td>
              <td className="py-3 text-slate-700">{s.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-emerald-700">This car has been recently serviced. That's a good thing!</p>
    </div>
  );
}
