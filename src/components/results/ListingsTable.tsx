"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import type { Listing } from "@/lib/types";
import { formatPrice, formatSqft, slugifyArea } from "@/lib/utils";
import type { UTMStage } from "@/lib/utm";
import ListingCompletenessBadge from "@/components/listing/ListingCompletenessBadge";
import FairDealContext from "@/components/listing/FairDealContext";
import AvailabilitySignal from "@/components/listing/AvailabilitySignal";
import DemandSignal from "@/components/listing/DemandSignal";
import NegotiationToolkit from "@/components/listing/NegotiationToolkit";

type Sort = "closest" | "best" | "price-asc" | "price-desc" | "sqft-asc" | "sqft-desc";

// How many listings to show before the "Lihat lainnya" toggle.
const LIMIT = 3;

const listingIdOf = (l: Listing) =>
  l.link.split("?")[0].split("/").filter(Boolean).pop() || l.link;

// Building/area name only — avoid dumping the full multi-line address into the row.
const buildingName = (l: Listing) => {
  const pn = (l.property_name || "").trim();
  if (pn && pn !== "—" && pn.length > 2) return pn;
  return (l.address || "").split(/[\n,]/)[0].trim();
};

// Honest amenity tags pulled from the listing description. Defensive: a tag only
// shows when its keyword is actually present, so two listings with otherwise
// identical fields but different descriptions read differently — and we never
// invent an attribute the landlord didn't write.
const AMENITY_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /zero deposit/i, label: "Zero Deposit" },
  { re: /car ?park|parking/i, label: "Parking" },
  { re: /\b(lrt|mrt)\b/i, label: "Near LRT/MRT" },
  { re: /pet[- ]?friendly|pets?\s+allowed/i, label: "Pet Friendly" },
  { re: /renovat/i, label: "Renovated" },
];

const amenityTags = (description?: string): string[] => {
  if (!description) return [];
  return AMENITY_PATTERNS.filter((p) => p.re.test(description))
    .map((p) => p.label)
    .slice(0, 3);
};

function AmenityTags({ description }: { description?: string }) {
  const tags = amenityTags(description);
  if (!tags.length) return null;
  return (
    <div className="mt-1.5 flex flex-wrap gap-1">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-secondary"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ctaUrl(link: string, stage: UTMStage, listingId: string) {
  const sep = link.includes("?") ? "&" : "?";
  return `${link}${sep}utm_source=price-intelligence&utm_medium=cta&utm_campaign=${stage}&utm_content=${encodeURIComponent(listingId)}`;
}

export default function ListingsTable({
  listings,
  fairByType,
  area,
  unitType,
}: {
  listings: Listing[];
  fairByType: Record<string, number | null>;
  area?: string;
  unitType?: string | null;
}) {
  const areaName = area ?? "";
  const areaSlug = slugifyArea(areaName);

  // Titles arrive as "<building>, <locality>" where the locality is inconsistent
  // for the same building (e.g. "Mont Kiara" vs "Kuala Lumpur"). Pin it to the
  // searched area so one results page reads consistently; skip if the building
  // already names the area to avoid "...(Mont Kiara), Mont Kiara" stutter.
  const displayTitle = (l: Listing) => {
    const i = l.title.lastIndexOf(",");
    const building = i > 0 ? l.title.slice(0, i).trim() : l.title;
    if (!areaName) return building;
    return building.includes(areaName) ? building : `${building}, ${areaName}`;
  };

  const [sort, setSort] = useState<Sort>("closest");
  const [expanded, setExpanded] = useState(false);

  const fairOf = (l: Listing) => fairByType[l.unit_type] ?? null;
  const isAbove = (l: Listing) => {
    const t = fairOf(l);
    return t != null && typeof l.monthly_price === "number" && l.monthly_price > t * 1.2;
  };
  const stageOf = (l: Listing): UTMStage => {
    const t = fairOf(l);
    if (t != null && typeof l.monthly_price === "number") {
      if (l.monthly_price < t * 0.8) return "good-deal-listing";
      if (l.monthly_price > t * 1.2) return "above-market-listing";
    }
    return "fair-market-listing";
  };
  const valueScore = (l: Listing) => {
    const t = fairOf(l);
    if (t == null || typeof l.monthly_price !== "number") return Infinity;
    return (l.monthly_price - t) / t;
  };
  // Absolute distance from the unit-type Fair Price (median) — display order only.
  const closeness = (l: Listing) => {
    const t = fairOf(l);
    if (t == null || typeof l.monthly_price !== "number") return Infinity;
    return Math.abs(l.monthly_price - t);
  };
  const belowFair = listings.filter((l) => {
    const t = fairOf(l);
    return t != null && typeof l.monthly_price === "number" && l.monthly_price < t;
  }).length;

  const rows = useMemo(() => {
    const r = [...listings];
    const n = (v: number | null, dir: number) => v ?? dir * Infinity;
    if (sort === "closest") r.sort((a, b) => closeness(a) - closeness(b));
    if (sort === "best") r.sort((a, b) => valueScore(a) - valueScore(b));
    if (sort === "price-asc") r.sort((a, b) => n(a.monthly_price, 1) - n(b.monthly_price, 1));
    if (sort === "price-desc") r.sort((a, b) => n(b.monthly_price, -1) - n(a.monthly_price, -1));
    if (sort === "sqft-asc") r.sort((a, b) => n(a.sqft, 1) - n(b.sqft, 1));
    if (sort === "sqft-desc") r.sort((a, b) => n(b.sqft, -1) - n(a.sqft, -1));
    return r;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, sort, fairByType]);

  const visibleRows = expanded ? rows : rows.slice(0, LIMIT);
  const hiddenCount = rows.length - LIMIT;

  function ListingExtras({ l }: { l: Listing }) {
    if (!isAbove(l)) return null;
    const fair = fairOf(l);
    if (fair == null) return null;
    const id = listingIdOf(l);
    return (
      <>
        <DemandSignal listingId={id} areaSlug={areaSlug} fairPrice={fair} />
        <NegotiationToolkit area={areaName} areaSlug={areaSlug} listingId={id} fairPrice={fair} />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-secondary">
        Menampilkan listing {unitType ?? "semua tipe"}, diurutkan dari yang paling
        dekat harga wajar.
      </p>
      {listings.length > 0 && (
        <p className="text-xs text-secondary">
          <strong className="text-primary">{belowFair}</strong> dari {listings.length}{" "}
          listing {unitType ?? ""} di bawah harga wajar
        </p>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary focus:outline-none"
        >
          <option value="closest">Urut: Terdekat ke harga wajar</option>
          <option value="best">Urut: Paling Worth It</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="sqft-asc">sqft ↑</option>
          <option value="sqft-desc">sqft ↓</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-card border border-border bg-card px-5 py-4 text-sm text-secondary">
          Tidak ada listing {unitType ?? "tipe ini"} hari ini. Coba tipe lain
          atau area sekitarnya.
        </p>
      ) : (
        <div>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-card border border-border bg-card shadow-elev1 md:block">
            <table className="w-full min-w-[920px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-secondary">
                  {["Listing", "Room", "Price", "sqft", "Furnishing", "Context", ""].map((h) => (
                    <th key={h} className="whitespace-nowrap px-4 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((l, i) => (
                  <motion.tr
                    key={l.link + i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 9) * 0.06, ease: "easeOut" }}
                    className="border-b border-border/60 align-top"
                  >
                    <td className="max-w-[300px] px-4 py-3">
                      <span className="block font-medium text-primary">{displayTitle(l)}</span>
                      <span className="mt-0.5 block text-xs text-secondary line-clamp-1">
                        {buildingName(l)}
                      </span>
                      <AmenityTags description={l.description} />
                      <span className="mt-1.5 block">
                        <ListingCompletenessBadge listing={l} fairPrice={fairOf(l)} />
                      </span>
                      <span className="mt-1 block">
                        <AvailabilitySignal listing={l} fairPrice={fairOf(l)} />
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-secondary">{l.room_type}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium tabular-nums text-primary">
                      {formatPrice(l.monthly_price)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-secondary">
                      {formatSqft(l.sqft)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-secondary">{l.furnishing}</td>
                    <td className="min-w-[220px] px-4 py-3">
                      <FairDealContext listing={l} fairPrice={fairOf(l)} count={listings.length} area={areaName} />
                      <ListingExtras l={l} />
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={ctaUrl(l.link, stageOf(l), listingIdOf(l))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 whitespace-nowrap text-accent hover:underline"
                      >
                        Lihat di SPEEDHOME <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {visibleRows.map((l, i) => (
              <motion.div
                key={l.link + i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i, 9) * 0.06, ease: "easeOut" }}
                className="rounded-card border border-border bg-card p-4 shadow-subtle"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-primary">{displayTitle(l)}</p>
                  <span className="shrink-0 font-medium tabular-nums text-primary">
                    {formatPrice(l.monthly_price)}
                  </span>
                </div>
                <div className="mt-2">
                  <ListingCompletenessBadge listing={l} fairPrice={fairOf(l)} />
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-secondary">
                  <span>{l.room_type}</span>
                  <span>{formatSqft(l.sqft)}</span>
                </div>
                <AmenityTags description={l.description} />
                <div className="mt-1">
                  <FairDealContext listing={l} fairPrice={fairOf(l)} count={listings.length} area={areaName} />
                </div>
                <ListingExtras l={l} />
                <a
                  href={ctaUrl(l.link, stageOf(l), listingIdOf(l))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent"
                >
                  Lihat di SPEEDHOME <ExternalLink className="h-3 w-3" />
                </a>
              </motion.div>
            ))}
          </div>

          {hiddenCount > 0 && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {expanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" /> Tampilkan lebih sedikit
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" /> Lihat {hiddenCount} listing lainnya
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
