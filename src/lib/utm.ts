export type UTMStage =
  | "fair-price-insight"
  | "good-deal-listing"
  | "above-market-listing"
  | "fair-market-listing"
  | "compare-verdict"
  | "similar-area"
  | "cta-section"
  | "negotiation-platform"
  | "negotiation-data-share"
  | "shared-referral";

/**
 * Returns the referral source for this session, if any.
 * Captures `?ref=...` from the URL into sessionStorage so it persists across
 * navigation within the same browsing session.
 */
export function getReferralSource(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref) {
    try {
      sessionStorage.setItem("referral_source", ref);
    } catch {
      /* ignore storage errors */
    }
    return ref;
  }
  try {
    return sessionStorage.getItem("referral_source");
  } catch {
    return null;
  }
}

export function buildSpeedhomeURL(
  areaSlug: string,
  stage: UTMStage,
  listingId?: string,
): string {
  const base = `https://speedhome.com/rent/${areaSlug}`;
  // Visitors arriving from a shared link get every CTA tagged as referral
  // traffic so we can measure its quality.
  const finalStage: UTMStage = getReferralSource() === "share" ? "shared-referral" : stage;
  const params = new URLSearchParams({
    utm_source: "price-intelligence",
    utm_medium: "cta",
    utm_campaign: finalStage,
  });
  if (listingId) params.set("utm_content", listingId);
  return `${base}?${params.toString()}`;
}
