/**
 * Thin server-side fetch wrapper. Used by RSCs and route handlers.
 * Frontend never calls a provider directly — only the NestJS API.
 */
const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function api<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, ...rest } = init;
  const res = await fetch(`${BASE}/api${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(rest.headers || {}),
    },
    cache: rest.cache ?? 'no-store',
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export type StatusFlag =
  | 'no_issues'
  | 'damage_reported'
  | 'severe_damage'
  | 'recall_reported'
  | 'no_recalls'
  | 'warranty_active'
  | 'warranty_voided';

export type BrandStatus = 'no_problem' | 'alert' | 'problem';

export type OwnerEvent = {
  date?: string;
  mileage?: number;
  source?: string;
  sourceLocation?: string;
  sourceContact?: string;
  rating?: { stars?: number; count?: number };
  comments?: string[];
  damage?: {
    severity?: 'minor' | 'moderate' | 'severe';
    location?: 'front' | 'rear' | 'left' | 'right';
    description?: string;
  };
};

export type OwnerRecord = {
  index: number;
  yearPurchased?: number;
  type?: 'Personal' | 'Commercial' | 'Lease' | 'Rental';
  lengthMonths?: number;
  states?: string[];
  milesPerYear?: number;
  lastOdometer?: number;
  events?: OwnerEvent[];
  damageBrands?: BrandStatus;
  odometerBrands?: BrandStatus;
  additional?: {
    totalLoss?: StatusFlag;
    structuralDamage?: StatusFlag;
    airbagDeployment?: StatusFlag;
    odometerCheck?: StatusFlag;
    accidentDamage?: StatusFlag;
    manufacturerRecall?: StatusFlag;
    basicWarranty?: StatusFlag;
  };
};

export type Recall = {
  date?: string;
  nhtsaId?: string;
  recallNumber?: string;
  description?: string;
  status?: string;
  source?: string;
};

export type ServiceHighlight = { date: string; service: string; comments?: string };

export type AccidentEvent = {
  index: number;
  date: string;
  severity?: 'minor' | 'moderate' | 'severe';
  description?: string;
};

export type ReportSummary = {
  oilChangesRegular?: boolean;
  openRecalls?: number;
  previousOwners?: number;
  useType?: 'Personal' | 'Commercial' | 'Lease' | 'Rental';
  lastOwnedState?: string;
  brandedTitle?: boolean;
  salvage?: boolean;
};

export type FullReport = {
  vin: string;
  decoded: {
    vin: string;
    make?: string;
    model?: string;
    year?: number;
    trim?: string;
    bodyClass?: string;
    vehicleType?: string;
    driveType?: string;
    transmission?: string;
    manufacturer?: string;
    plantCountry?: string;
    plantCity?: string;
    doors?: number;
    series?: string;
    engine?: { cylinders?: number; displacementL?: number; fuelType?: string; horsepower?: number };
  };
  history: Array<{ date: string; type: string; source: string; location?: string; mileage?: number; description?: string }>;
  salvage: Array<{ source: string; auction?: string; saleDate?: string; finalBid?: number; damage?: string; odometer?: number; status?: string; images?: string[] }>;
  images: Array<{ url: string; source: string; caption?: string }>;
  providers: string[];
  fetchedAt: string;
  cached: boolean;

  mileage?: number;
  windowStickerUrl?: string;
  retailValue?: { amount: number; currency: string };
  summary?: ReportSummary;
  owners?: OwnerRecord[];
  accidentEvents?: AccidentEvent[];
  recalls?: Recall[];
  serviceHighlights?: ServiceHighlight[];
};
