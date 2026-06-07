import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Listing, SummaryRow } from "@/lib/types";

/** Tailwind-aware className merge. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const DASH = "—";

/** "Mont Kiara" → "mont-kiara" (matches the scraper's slug format). */
export function slugifyArea(area: string): string {
  return (area || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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

/** Leading bedroom count of a unit type ("3BR" → 3, "4BR+" → 4, "Studio" → 0). */
function unitTypeRank(unitType: string): number {
  const m = unitType.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

/**
 * The default unit type for an area: the one with the most listings. Ties break
 * deterministically toward the smallest unit (fewest bedrooms), so the same area
 * always lands on the same default. Returns null when there is no summary data.
 */
export function defaultUnitType(summary: SummaryRow[] | undefined): string | null {
  if (!summary || !summary.length) return null;
  return [...summary].sort(
    (a, b) =>
      b.Count - a.Count ||
      unitTypeRank(a["Unit Type"]) - unitTypeRank(b["Unit Type"]),
  )[0]["Unit Type"];
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

/**
 * Fair Price (Option B) — the single source of truth for "harga wajar".
 *
 * Small samples use the MEDIAN, which is immune to a single extreme listing.
 * Once there are enough listings for trimming to actually remove something
 * (n >= 10, where Math.floor(n * 0.1) >= 1) we switch to a 10% trimmed mean.
 * The two regimes join at n = 10. Below 10 a trimmed mean would collapse to the
 * plain mean (k = 0) and get dragged by outliers — exactly what we avoid here.
 */
export function fairPrice(values: number[]): number | null {
  const nums = positives(values).sort((a, b) => a - b);
  const n = nums.length;
  if (!n) return null;
  if (n < 10) return median(nums);
  const k = Math.floor(n * 0.1);
  return mean(nums.slice(k, n - k));
}

/**
 * Fair Price per unit type, computed at runtime from raw monthly prices. This
 * is the canonical per-type Fair Price the whole results view reads from, so it
 * stays consistent across the headline, the summary table, the listing sort,
 * and the negotiation thresholds.
 */
export function fairPriceByUnitType(
  listings: Listing[],
): Record<string, number | null> {
  const groups: Record<string, number[]> = {};
  for (const l of listings) {
    if (typeof l.monthly_price === "number" && l.monthly_price > 0) {
      (groups[l.unit_type] ??= []).push(l.monthly_price);
    }
  }
  const out: Record<string, number | null> = {};
  for (const type of Object.keys(groups)) out[type] = fairPrice(groups[type]);
  return out;
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
    fairPrice: fairPrice(prices),
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
