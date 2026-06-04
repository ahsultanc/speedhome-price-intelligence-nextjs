/** Shared TypeScript interfaces — mirror the JSON shape from scraper_api.py. */

export type RentalType = "monthly" | "yearly";

export interface Listing {
  title: string;
  property_name: string;
  address: string;
  room_type: string;
  unit_type: string;
  monthly_price: number | null;
  annual_price: number | null;
  sqft: number | null;
  furnishing: string;
  min_duration: number | null;
  description?: string;
  link: string;
}

/** One row of the price summary (keys match utils.build_summary output). */
export interface SummaryRow {
  "Unit Type": string;
  Count: number;
  "Average (RM)": number | null;
  "Median (RM)": number | null;
  "Mode (RM)": number | null;
  "Fair Price (RM)": number | null;
  "Min (RM)": number | null;
  "Max (RM)": number | null;
  "Avg sqft": number | null;
  "Price/sqft (RM)": number | null;
}

export interface Meta {
  area: string | null;
  area_term: string | null;
  source: string | null;
  scraped_at: string | null;
  pages_scraped: number | null;
  first_url: string | null;
  radius_count: number;
  in_area_count: number;
}

export interface ScrapeResult {
  ok: boolean;
  is_demo: boolean;
  error?: string;
  meta?: Meta;
  listings?: Listing[];
  summary_monthly?: SummaryRow[];
  summary_yearly?: SummaryRow[];
}

export interface CompareResult {
  ok: boolean;
  error?: string;
  area_a?: ScrapeResult;
  area_b?: ScrapeResult;
}
