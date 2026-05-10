import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { setTokenCookie } from '@/lib/auth';

async function register(formData: FormData) {
  'use server';
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const name = String(formData.get('name') || '');
  const res = await api<{ accessToken: string }>(`/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  });
  setTokenCookie(res.accessToken);
  redirect('/dashboard');
}

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form action={register} className="mt-6 space-y-4">
        <input name="name" placeholder="Name (optional)" className="w-full rounded-lg border border-slate-300 px-4 py-2.5" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-lg border border-slate-300 px-4 py-2.5" />
        <input name="password" type="password" required minLength={8} placeholder="Password (8+ chars)" className="w-full rounded-lg border border-slate-300 px-4 py-2.5" />
        <button className="w-full rounded-lg bg-brand-600 py-2.5 font-semibold text-white hover:bg-brand-700">
          Create account
        </button>
      </form>
    </div>
  );
}
