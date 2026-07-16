export type MarketSegment = "pyme_latam" | "startup_usd" | "venezuela";

export type ServiceInterest =
  | "template_website"
  | "admin_dashboard"
  | "alphadev_360"
  | "automation";

export interface LeadApplication {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  companyName: string;
  businessNiche: string;
  marketSegment: MarketSegment;
  teamSize: number;
  services: ServiceInterest[];
  budget: number;
  timelineWeeks: number;
  painPoints: string;
  projectVision: string;
  terms: boolean;
}

export interface BudgetRange {
  min: number;
  max: number;
  currency: "MXN" | "USD";
}

export interface ValidationIssue {
  field: keyof LeadApplication;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationIssue[];
}

export interface SegmentReport {
  marketSegment: MarketSegment;
  count: number;
  totalBudget: number;
  averageBudget: number;
  minBudget: number | null;
  maxBudget: number | null;
}

export const SEGMENT_BUDGET_RANGES: Record<MarketSegment, BudgetRange> = {
  pyme_latam: { min: 15000, max: 250000, currency: "MXN" },
  startup_usd: { min: 3000, max: 120000, currency: "USD" },
  venezuela: { min: 500, max: 25000, currency: "USD" }
};

export const ALLOWED_SERVICES: ServiceInterest[] = [
  "template_website",
  "admin_dashboard",
  "alphadev_360",
  "automation"
];

export const ALLOWED_SEGMENTS: MarketSegment[] = [
  "pyme_latam",
  "startup_usd",
  "venezuela"
];
