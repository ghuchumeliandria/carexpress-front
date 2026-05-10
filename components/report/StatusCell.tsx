import type { BrandStatus, StatusFlag } from '@/lib/api';

const FLAG_LABEL: Record<StatusFlag, string> = {
  no_issues: 'No Issues Reported',
  damage_reported: 'Damage Reported',
  severe_damage: 'Severe Damage',
  recall_reported: 'Recall Reported',
  no_recalls: 'No Recalls Reported',
  warranty_active: 'Warranty Active',
  warranty_voided: 'Warranty Voided',
};

const FLAG_TONE: Record<StatusFlag, 'good' | 'warn' | 'bad'> = {
  no_issues: 'good',
  damage_reported: 'warn',
  severe_damage: 'bad',
  recall_reported: 'warn',
  no_recalls: 'good',
  warranty_active: 'good',
  warranty_voided: 'bad',
};

const BRAND_LABEL: Record<BrandStatus, string> = {
  no_problem: 'No Problem',
  alert: 'Alert!',
  problem: 'Problem Found',
};

const BRAND_TONE: Record<BrandStatus, 'good' | 'warn' | 'bad'> = {
  no_problem: 'good',
  alert: 'warn',
  problem: 'bad',
};

const TONE_CLS: Record<'good' | 'warn' | 'bad', string> = {
  good: 'text-emerald-700',
  warn: 'text-amber-700',
  bad: 'text-red-700 font-semibold',
};

export function FlagCell({ value }: { value?: StatusFlag }) {
  if (!value) return <span className="text-slate-400">—</span>;
  return <span className={TONE_CLS[FLAG_TONE[value]]}>{FLAG_LABEL[value]}</span>;
}

export function BrandCell({ value }: { value?: BrandStatus }) {
  if (!value) return <span className="text-slate-400">—</span>;
  return <span className={TONE_CLS[BRAND_TONE[value]]}>{BRAND_LABEL[value]}</span>;
}
