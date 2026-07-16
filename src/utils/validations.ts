import {
  ALLOWED_SEGMENTS,
  ALLOWED_SERVICES,
  LeadApplication,
  MarketSegment,
  SEGMENT_BUDGET_RANGES,
  ValidationResult
} from "../types/models";

const BUSINESS_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[-()\s\d]{8,20}$/;
const FREE_EMAIL_DOMAINS = new Set(["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]);

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export function isValidBusinessEmail(email: string): boolean {
  if (!BUSINESS_EMAIL_REGEX.test(email)) {
    return false;
  }
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) {
    return false;
  }
  return !FREE_EMAIL_DOMAINS.has(domain);
}

export function isValidPhone(phone: string): boolean {
  return PHONE_REGEX.test(phone);
}

export function isValidMarketSegment(segment: string): segment is MarketSegment {
  return ALLOWED_SEGMENTS.includes(segment as MarketSegment);
}

export function validateBudgetBySegment(segment: MarketSegment, budget: number): boolean {
  const range = SEGMENT_BUDGET_RANGES[segment];
  return budget >= range.min && budget <= range.max;
}

export function validateLeadApplication(lead: LeadApplication): ValidationResult {
  const errors: ValidationResult["errors"] = [];

  if (lead.fullName.trim().length < 3 || countWords(lead.fullName) < 2) {
    errors.push({ field: "fullName", message: "fullName must include at least 2 words and 3 characters." });
  }

  if (!isValidBusinessEmail(lead.email)) {
    errors.push({ field: "email", message: "email must be a valid business email." });
  }

  if (!isValidPhone(lead.phone)) {
    errors.push({ field: "phone", message: "phone must be in valid international format (8 to 20 chars)." });
  }

  if (lead.role.trim().length < 2) {
    errors.push({ field: "role", message: "role must have at least 2 characters." });
  }

  if (lead.companyName.trim().length < 2) {
    errors.push({ field: "companyName", message: "companyName must have at least 2 characters." });
  }

  if (lead.businessNiche.trim().length < 3) {
    errors.push({ field: "businessNiche", message: "businessNiche must have at least 3 characters." });
  }

  if (!isValidMarketSegment(lead.marketSegment)) {
    errors.push({ field: "marketSegment", message: "marketSegment must match an allowed value." });
  }

  if (!Number.isInteger(lead.teamSize) || lead.teamSize < 1 || lead.teamSize > 500) {
    errors.push({ field: "teamSize", message: "teamSize must be an integer between 1 and 500." });
  }

  if (lead.budget <= 0) {
    errors.push({ field: "budget", message: "budget must be a positive number." });
  } else if (!validateBudgetBySegment(lead.marketSegment, lead.budget)) {
    errors.push({ field: "budget", message: "budget must fit the selected marketSegment range." });
  }

  if (!Number.isInteger(lead.timelineWeeks) || lead.timelineWeeks < 2 || lead.timelineWeeks > 24) {
    errors.push({ field: "timelineWeeks", message: "timelineWeeks must be an integer between 2 and 24." });
  }

  if (lead.painPoints.trim().length < 20) {
    errors.push({ field: "painPoints", message: "painPoints must have at least 20 characters." });
  }

  if (lead.projectVision.trim().length < 30) {
    errors.push({ field: "projectVision", message: "projectVision must have at least 30 characters." });
  }

  if (!lead.terms) {
    errors.push({ field: "terms", message: "terms must be accepted." });
  }

  if (lead.services.length < 1) {
    errors.push({ field: "services", message: "services must include at least one selected option." });
  } else {
    const invalidService = lead.services.find((service) => !ALLOWED_SERVICES.includes(service));
    if (invalidService) {
      errors.push({ field: "services", message: "services contains unsupported values." });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
