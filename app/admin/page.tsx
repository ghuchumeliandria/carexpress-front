import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Stats = { users: number; searches: number; topVins: { _id: string; count: number }[] };
type Provider = { name: string; priority: number; enabled: boolean; capabilities: string[] };
type RecentSearch = { _id: string; vin: string; createdAt: string; userId: string | null };

export default async function AdminPage() {
  const token = getToken();
  if (!token) redirect('/login');

  const [stats, providers, recent] = await Promise.all([
    api<Stats>('/admin/stats', { token }).catch(() => null),
    api<Provider[]>('/admin/providers', { token }).catch(() => []),
    api<RecentSearch[]>('/admin/searches', { token }).catch(() => []),
  ]);

  if (!stats) {
    return <p className="rounded-xl bg-white p-6 text-slate-600 shadow-sm">Admin access required.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Users" value={stats.users} />
        <Stat label="Searches" value={stats.searches} />
        <Stat label="Providers" value={providers.filter((p) => p.enabled).length} />
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-semibold">VIN providers</h2>
        <table className="mt-4 w-full text-sm">
          <thead className="text-left text-slate-500">
            <tr><th className="py-2">Name</th><th>Priority</th><th>Capabilities</th><th>Enabled</th></tr>
          </thead>
          <tbody className="divide-y">
            {providers.map((p) => (
              <tr key={p.name}>
                <td className="py-2 font-mono">{p.name}</td>
                <td>{p.priority}</td>
                <td>{p.capabilities.join(', ')}</td>
                <td>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    {p.enabled ? 'on' : 'off'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-semibold">Top VINs</h2>
        <ul className="mt-3 divide-y">
          {stats.topVins.map((t) => (
            <li key={t._id} className="flex justify-between py-2">
              <span className="font-mono">{t._id}</span>
              <span className="text-slate-500">{t.count}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-semibold">Recent searches</h2>
        <ul className="mt-3 divide-y">
          {recent.slice(0, 25).map((s) => (
            <li key={s._id} className="flex justify-between py-2 text-sm">
              <span className="font-mono">{s.vin}</span>
              <span className="text-slate-500">{new Date(s.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
