import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Listing } from "@/lib/types";

/** Tailwind-aware className merge. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const DASH = "—";

/** "RM 2,500" — null/NaN → "—". */
export function formatPrice(value?: number | null): string {
  if (value === null || value === undefined || Number.isNaN(value)) return DASH;
  return `RM ${Math.round(value).toLocaleString("en-MY")}`;
}

/** "1,200 sqft" — null/NaN → "—". */
export function formatSqft(value?: number | null): string {
  if (value === null || value === undefined || Number.isNaN(value)) return DASH;
  return `${Math.round(value).toLocaleString("en-MY")} sqft`;
}

/** "12.5%" — null/NaN → "—". */
export function formatPercent(value?: number | null, digits = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) return DASH;
  return `${value.toFixed(digits)}%`;
}

/** "RM 3.55" per-sqft style — null/NaN → "—". */
export function formatDecimal(value?: number | null, digits = 2): string {
  if (value === null || value === undefined || Number.isNaN(value)) return DASH;
  return `RM ${value.toFixed(digits)}`;
}

/**
 * A listing is a "good deal" when it's priced below the fair price for its
 * unit type. Returns the threshold (Fair Price) for a unit type, or null.
 */
export function getGoodDealThreshold(
  summary: { "Unit Type": string; "Fair Price (RM)": number | null }[] | undefined,
  unitType: string,
): number | null {
  if (!summary) return null;
  const row = summary.find((r) => r["Unit Type"] === unitType);
  return row && typeof row["Fair Price (RM)"] === "number"
    ? row["Fair Price (RM)"]
    : null;
}

/* ----------------------------- stats helpers ----------------------------- */
function positives(values: (number | null | undefined)[]): number[] {
  return values.filter(
    (v): v is number => typeof v === "number" && !Number.isNaN(v) && v > 0,
  );
}

export function mean(values: number[]): number | null {
  if (!values.length) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** Trimmed mean — drop the top & bottom `trim` fraction, then average. */
export function trimmedMean(values: number[], trim = 0.1): number | null {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return null;
  const k = Math.floor(s.length * trim);
  const t = s.length - 2 * k > 0 ? s.slice(k, s.length - k) : s;
  return mean(t);
}

export interface OverallMetrics {
  count: number;
  avg: number | null;
  median: number | null;
  fairPrice: number | null;
  perSqft: number | null;
  min: number | null;
  max: number | null;
}

/** Headline metrics for the metric cards / head-to-head, from a listing set. */
export function computeMetrics(listings: Listing[]): OverallMetrics {
  const prices = positives(listings.map((l) => l.monthly_price));
  const perSqftVals = listings
    .filter(
      (l) =>
        typeof l.monthly_price === "number" &&
        typeof l.sqft === "number" &&
        l.sqft > 0,
    )
    .map((l) => (l.monthly_price as number) / (l.sqft as number));
  return {
    count: listings.length,
    avg: mean(prices),
    median: median(prices),
    fairPrice: trimmedMean(prices),
    perSqft: mean(perSqftVals),
    min: prices.length ? Math.min(...prices) : null,
    max: prices.length ? Math.max(...prices) : null,
  };
}

/** Filter listings by rental type (mirrors the Python logic). */
export function filterByRentalType(
  listings: Listing[],
  rental: "monthly" | "yearly",
): Listing[] {
  if (rental === "monthly") return listings;
  // yearly = minimum lease >= 12 months
  return listings.filter((l) => (l.min_duration ?? 0) >= 12);
}
