import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { setTokenCookie } from '@/lib/auth';

async function login(formData: FormData) {
  'use server';
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const res = await api<{ accessToken: string }>(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setTokenCookie(res.accessToken);
  redirect('/dashboard');
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form action={login} className="mt-6 space-y-4">
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none"
        />
        <button className="w-full rounded-lg bg-brand-600 py-2.5 font-semibold text-white hover:bg-brand-700">
          Sign in
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-600">
        No account? <a href="/register" className="text-brand-600 hover:underline">Register</a>
      </p>
    </div>
  );
}
