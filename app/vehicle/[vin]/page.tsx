import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api, type FullReport } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { SearchBar } from '@/components/SearchBar';
import { ReportSection } from '@/components/ReportSection';
import { ReportHeader } from '@/components/report/ReportHeader';
import { QuickFacts } from '@/components/report/QuickFacts';
import { AccidentHistory } from '@/components/report/AccidentHistory';
import { ServiceHighlights } from '@/components/report/ServiceHighlights';
import { ValueReport } from '@/components/report/ValueReport';
import { AdditionalHistory } from '@/components/report/AdditionalHistory';
import { TitleHistory } from '@/components/report/TitleHistory';
import { OwnershipHistory } from '@/components/report/OwnershipHistory';
import { DetailedHistory } from '@/components/report/DetailedHistory';
import { RecallList } from '@/components/report/RecallList';
import { ComplaintList } from '@/components/report/ComplaintList';
import { Glossary } from '@/components/report/Glossary';

export const revalidate = 3600;

type Props = { params: { vin: string } };

async function fetchReport(vin: string): Promise<FullReport | null> {
  try {
    return await api<FullReport>(`/vin/${vin.toUpperCase()}/full`, { token: getToken() });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await fetchReport(params.vin);
  if (!r) return { title: 'Vehicle not found' };
  const d = r.decoded;
  const name = [d.year, d.make, d.model, d.trim].filter(Boolean).join(' ');
  return {
    title: `${name || 'Vehicle'} (${r.vin}) — Report`,
    description: `Full vehicle history report for VIN ${r.vin}.`,
    alternates: { canonical: `/vehicle/${r.vin}` },
  };
}

const DISCLAIMER = (fetchedAt: string) =>
  `This Vehicle History Report is based only on information supplied to us and available as of ${new Date(
    fetchedAt,
  ).toLocaleString()}. Other information about this vehicle, including problems, may not have been reported. Use this report as one important tool — along with a vehicle inspection and test drive — to make a better decision about your next used car.`;

export default async function VehiclePage({ params }: Props) {
  const r = await fetchReport(params.vin);
  if (!r) notFound();

  return (
    <div className="space-y-6">
      <SearchBar initial={r.vin} />

      <ReportHeader report={r} />

      <ReportSection title="At a glance">
        <QuickFacts summary={r.summary} />
        <p className="mt-4 text-xs italic text-slate-500">{DISCLAIMER(r.fetchedAt)}</p>
      </ReportSection>

      <ReportSection title="Accident / Damage History" badge={`${r.accidentEvents?.length ?? 0} events`}>
        <AccidentHistory events={r.accidentEvents} />
      </ReportSection>

      <ReportSection title="Recent Service Highlights">
        <ServiceHighlights items={r.serviceHighlights} />
      </ReportSection>

      <ReportSection title="History-Based Value Report">
        <ValueReport report={r} />
      </ReportSection>

      <ReportSection title="Additional History">
        <AdditionalHistory owners={r.owners} />
      </ReportSection>

      <ReportSection title="Title History">
        <TitleHistory owners={r.owners} />
      </ReportSection>

      <ReportSection title="Ownership History">
        <OwnershipHistory owners={r.owners} />
      </ReportSection>

      <ReportSection title="Manufacturer Recalls" badge={`${r.recalls?.length ?? 0}`}>
        <RecallList recalls={r.recalls} />
      </ReportSection>

      <ReportSection title="Owner Complaints (NHTSA)" badge={`${r.complaints?.length ?? 0}`}>
        <ComplaintList complaints={r.complaints} />
      </ReportSection>

      <ReportSection title="Detailed History">
        <DetailedHistory owners={r.owners} />
      </ReportSection>

      <ReportSection title="Glossary">
        <Glossary />
      </ReportSection>

      <footer className="rounded-xl border bg-white p-6 text-xs leading-relaxed text-slate-500 shadow-sm">
        <p>{DISCLAIMER(r.fetchedAt)}</p>
        <p className="mt-3">
          Sources: {r.providers.join(', ') || 'none'} · {r.cached ? 'cached' : 'live'} ·
          retrieved {new Date(r.fetchedAt).toLocaleString()}
        </p>
      </footer>
    </div>
  );
}
