export type UTMStage =
  | "fair-price-insight"
  | "good-deal-listing"
  | "above-market-listing"
  | "fair-market-listing"
  | "compare-verdict"
  | "similar-area"
  | "cta-section"
  | "negotiation-platform"
  | "negotiation-data-share";

export function buildSpeedhomeURL(
  areaSlug: string,
  stage: UTMStage,
  listingId?: string,
): string {
  const base = `https://speedhome.com/rent/${areaSlug}`;
  const params = new URLSearchParams({
    utm_source: "price-intelligence",
    utm_medium: "cta",
    utm_campaign: stage,
  });
  if (listingId) params.set("utm_content", listingId);
  return `${base}?${params.toString()}`;
}
