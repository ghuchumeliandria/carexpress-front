import { SearchBar } from '@/components/SearchBar';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-16 text-white shadow-lg">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Decode any VIN. Know the full story.</h1>
          <p className="mt-4 text-lg text-white/85">
            Specs, history, auction & salvage records, and photos — pulled from multiple data
            sources and merged into a single report.
          </p>
          <div className="mt-8 rounded-xl bg-white/10 p-3 backdrop-blur">
            <SearchBar />
          </div>
          <p className="mt-3 text-xs text-white/70">
            Try a sample VIN: <span className="font-mono">1HGBH41JXMN109186</span>
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-3">
        {[
          { t: 'Full vehicle specs', d: 'Make, model, year, trim, engine, drivetrain, body, plant.' },
          { t: 'History timeline', d: 'Sales, registrations, mileage, accidents — when available.' },
          { t: 'Auction & salvage', d: 'Damage, sale prices, photos from auction listings.' },
        ].map((c) => (
          <div key={c.t} className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">{c.t}</h3>
            <p className="mt-2 text-sm text-slate-600">{c.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
