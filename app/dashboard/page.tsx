import Link from 'next/link';
import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';

type Search = { _id: string; vin: string; createdAt: string };
type Me = { id: string; email: string; name: string; role: 'user' | 'admin' };

export default async function DashboardPage() {
  const token = getToken();
  if (!token) redirect('/login');

  const [me, history] = await Promise.all([
    api<Me>('/auth/me', { token }).catch(() => null),
    api<Search[]>('/search-history', { token }).catch(() => []),
  ]);

  if (!me) redirect('/login');

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {me.name || me.email}</h1>
          <p className="text-sm text-slate-500">{me.email} · {me.role}</p>
        </div>
        {me.role === 'admin' && (
          <Link href="/admin" className="rounded-lg border px-3 py-1.5 text-sm hover:bg-slate-50">
            Admin
          </Link>
        )}
      </header>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Search history</h2>
        {history.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">No searches yet.</p>
        ) : (
          <ul className="mt-4 divide-y">
            {history.map((s) => (
              <li key={s._id} className="flex items-center justify-between py-3">
                <Link href={`/vehicle/${s.vin}`} className="font-mono text-brand-600 hover:underline">
                  {s.vin}
                </Link>
                <span className="text-xs text-slate-500">
                  {new Date(s.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
