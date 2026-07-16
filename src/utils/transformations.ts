import { LeadApplication, MarketSegment, SegmentReport, ServiceInterest } from "../types/models";
import { groupBy } from "./collections";

export function countByCategory<T, K extends string | number>(
  items: readonly T[],
  categorySelector: (item: T) => K
): Record<string, number> {
  return items.reduce<Record<string, number>>((accumulator, item) => {
    const key = String(categorySelector(item));
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});
}

export function sumBy<T>(items: readonly T[], valueSelector: (item: T) => number): number {
  return items.reduce((total, item) => total + valueSelector(item), 0);
}

export function averageBy<T>(
  items: readonly T[],
  valueSelector: (item: T) => number
): number {
  if (items.length === 0) {
    return 0;
  }
  return sumBy(items, valueSelector) / items.length;
}

export function minBy<T>(items: readonly T[], valueSelector: (item: T) => number): number | null {
  if (items.length === 0) {
    return null;
  }
  return Math.min(...items.map(valueSelector));
}

export function maxBy<T>(items: readonly T[], valueSelector: (item: T) => number): number | null {
  if (items.length === 0) {
    return null;
  }
  return Math.max(...items.map(valueSelector));
}

export function buildSegmentReports(leads: readonly LeadApplication[]): SegmentReport[] {
  const groups = groupBy(leads, (lead) => lead.marketSegment);
  const segments: MarketSegment[] = ["pyme_latam", "startup_usd", "venezuela"];

  return segments.map((segment) => {
    const segmentLeads = groups[segment] ?? [];
    return {
      marketSegment: segment,
      count: segmentLeads.length,
      totalBudget: sumBy(segmentLeads, (lead) => lead.budget),
      averageBudget: averageBy(segmentLeads, (lead) => lead.budget),
      minBudget: minBy(segmentLeads, (lead) => lead.budget),
      maxBudget: maxBy(segmentLeads, (lead) => lead.budget)
    };
  });
}

export function countInterestedServices(leads: readonly LeadApplication[]): Record<ServiceInterest, number> {
  return leads.reduce<Record<ServiceInterest, number>>(
    (accumulator, lead) => {
      lead.services.forEach((service) => {
        accumulator[service] += 1;
      });
      return accumulator;
    },
    {
      template_website: 0,
      admin_dashboard: 0,
      alphadev_360: 0,
      automation: 0
    }
  );
}
