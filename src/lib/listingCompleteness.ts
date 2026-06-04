import type { Listing } from "@/lib/types";

export interface Completeness {
  score: number; // 0–100
  label: string;
  emoji: string;
  tone: "good" | "medium" | "low";
}

/**
 * Listing Completeness — measures how COMPLETE the listing INFO is (not the
 * physical condition of the unit). Signals: price proximity to fair price,
 * furnishing detail, description length, and property-name specificity.
 */
export function calculateCompleteness(
  listing: Listing,
  fairPrice: number | null,
): Completeness {
  let score = 0;

  // Price within a sensible band of the area fair price (max 35).
  if (fairPrice && typeof listing.monthly_price === "number" && fairPrice > 0) {
    const dev = Math.abs(listing.monthly_price - fairPrice) / fairPrice;
    if (dev <= 0.2) score += 35;
    else if (dev <= 0.4) score += 20;
    else score += 5;
  } else {
    score += 10;
  }

  // Furnishing detail (max 25).
  const f = (listing.furnishing || "").toLowerCase();
  if (f.includes("fully")) score += 25;
  else if (f.includes("partial")) score += 15;
  else if (f && f !== "—") score += 8;

  // Description length (max 25).
  const desc = (listing.description || "").trim();
  if (desc.length > 120) score += 25;
  else if (desc.length > 50) score += 15;
  else if (desc.length > 0) score += 6;

  // Property-name specificity (max 15).
  const name = (listing.property_name || "").trim();
  if (name && name !== "—" && name.length > 3 && !/^kuala lumpur$/i.test(name)) {
    score += 15;
  }

  score = Math.max(0, Math.min(100, score));

  if (score >= 70)
    return { score, label: "Informasi listing lengkap", emoji: "🟢", tone: "good" };
  if (score >= 40)
    return {
      score,
      label: "Informasi listing kurang lengkap",
      emoji: "🟡",
      tone: "medium",
    };
  return { score, label: "Informasi listing sangat minim", emoji: "🔴", tone: "low" };
}
