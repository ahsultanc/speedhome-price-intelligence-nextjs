"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Listing, SummaryRow } from "@/lib/types";
import { cn, formatPrice, formatSqft, getGoodDealThreshold, slugifyArea } from "@/lib/utils";
import type { UTMStage } from "@/lib/utm";
import ListingCompletenessBadge from "@/components/listing/ListingCompletenessBadge";
import FairDealContext from "@/components/listing/FairDealContext";
import AvailabilitySignal from "@/components/listing/AvailabilitySignal";
import DemandSignal from "@/components/listing/DemandSignal";
import NegotiationToolkit from "@/components/listing/NegotiationToolkit";

type Sort = "best" | "price-asc" | "price-desc" | "sqft-asc" | "sqft-desc";

const listingIdOf = (l: Listing) =>
  l.link.split("?")[0].split("/").filter(Boolean).pop() || l.link;

// Building/area name only — avoid dumping the full multi-line address into the row.
const buildingName = (l: Listing) => {
  const pn = (l.property_name || "").trim();
  if (pn && pn !== "—" && pn.length > 2) return pn;
  return (l.address || "").split(/[\n,]/)[0].trim();
};

function ctaUrl(link: string, stage: UTMStage, listingId: string) {
  const sep = link.includes("?") ? "&" : "?";
  return `${link}${sep}utm_source=price-intelligence&utm_medium=cta&utm_campaign=${stage}&utm_content=${encodeURIComponent(listingId)}`;
}

export default function ListingsTable({
  listings,
  summary,
  count,
  area,
}: {
  listings: Listing[];
  summary: SummaryRow[];
  count?: number;
  area?: string;
}) {
  const areaName = area ?? "";
  const areaSlug = slugifyArea(areaName);
  const roomTypes = useMemo(
    () => Array.from(new Set(listings.map((l) => l.room_type).filter(Boolean))).sort(),
    [listings],
  );
  const [rooms, setRooms] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("best");

  const fairOf = (l: Listing) => getGoodDealThreshold(summary, l.unit_type);
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
  const belowFair = listings.filter((l) => {
    const t = fairOf(l);
    return t != null && typeof l.monthly_price === "number" && l.monthly_price < t;
  }).length;

  const rows = useMemo(() => {
    let r = rooms.length ? listings.filter((l) => rooms.includes(l.room_type)) : listings;
    r = [...r];
    const n = (v: number | null, dir: number) => v ?? dir * Infinity;
    if (sort === "best") r.sort((a, b) => valueScore(a) - valueScore(b));
    if (sort === "price-asc") r.sort((a, b) => n(a.monthly_price, 1) - n(b.monthly_price, 1));
    if (sort === "price-desc") r.sort((a, b) => n(b.monthly_price, -1) - n(a.monthly_price, -1));
    if (sort === "sqft-asc") r.sort((a, b) => n(a.sqft, 1) - n(b.sqft, 1));
    if (sort === "sqft-desc") r.sort((a, b) => n(b.sqft, -1) - n(a.sqft, -1));
    return r;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, rooms, sort, summary]);

  function toggleRoom(r: string) {
    setRooms((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  }

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
        Ini semua pilihannya — diurutkan dari yang paling worth it.
      </p>
      {listings.length > 0 && (
        <p className="text-xs text-secondary">
          <strong className="text-primary">{belowFair}</strong> dari {listings.length}{" "}
          listing di bawah harga wajar area ini
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-secondary">Tampilkan tipe:</span>
          {roomTypes.map((r) => (
            <button
              key={r}
              onClick={() => toggleRoom(r)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                rooms.includes(r)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary",
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-primary focus:outline-none"
        >
          <option value="best">Urut: Paling Worth It</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="sqft-asc">sqft ↑</option>
          <option value="sqft-desc">sqft ↓</option>
        </select>
      </div>

      {rows.length === 0 ? (
        <p className="rounded-card border border-border bg-card px-5 py-4 text-sm text-secondary">
          Tidak ada listing {rooms.join(", ") || "tipe ini"} hari ini. Coba tipe lain
          atau area sekitarnya.
        </p>
      ) : (
        <>
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
                {rows.map((l, i) => (
                  <motion.tr
                    key={l.link + i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 9) * 0.06, ease: "easeOut" }}
                    className="border-b border-border/60 align-top"
                  >
                    <td className="max-w-[300px] px-4 py-3">
                      <span className="block font-medium text-primary">{l.title}</span>
                      <span className="mt-0.5 block text-xs text-secondary line-clamp-1">
                        {buildingName(l)}
                      </span>
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
                      <FairDealContext listing={l} fairPrice={fairOf(l)} count={count} area={areaName} />
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
            {rows.map((l, i) => (
              <motion.div
                key={l.link + i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i, 9) * 0.06, ease: "easeOut" }}
                className="rounded-card border border-border bg-card p-4 shadow-subtle"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-primary">{l.title}</p>
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
                <div className="mt-1">
                  <FairDealContext listing={l} fairPrice={fairOf(l)} count={count} area={areaName} />
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
        </>
      )}
    </div>
  );
}
