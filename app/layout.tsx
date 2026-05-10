import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'CarExpress — VIN Decoder & Vehicle Reports', template: '%s · CarExpress' },
  description:
    'Decode any VIN and pull a full vehicle report: specs, history, auction & salvage records, images.',
  openGraph: { type: 'website', siteName: 'CarExpress' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold text-brand-600">CarExpress</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/dashboard" className="hover:text-brand-600">Dashboard</Link>
              <Link href="/login" className="rounded-md border px-3 py-1.5 hover:bg-slate-50">Sign in</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t bg-white py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} CarExpress
        </footer>
      </body>
    </html>
  );
}
