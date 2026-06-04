"use client";

import { useMemo, useState } from "react";
import { ExternalLink, BadgeCheck } from "lucide-react";
import type { Listing, SummaryRow } from "@/lib/types";
import { cn, formatPrice, formatSqft, getGoodDealThreshold } from "@/lib/utils";
import ListingCompletenessBadge from "@/components/listing/ListingCompletenessBadge";
import FairDealContext from "@/components/listing/FairDealContext";
import AvailabilitySignal from "@/components/listing/AvailabilitySignal";

type Sort = "best" | "price-asc" | "price-desc" | "sqft-asc" | "sqft-desc";

export default function ListingsTable({
  listings,
  summary,
}: {
  listings: Listing[];
  summary: SummaryRow[];
}) {
  const roomTypes = useMemo(
    () => Array.from(new Set(listings.map((l) => l.room_type).filter(Boolean))).sort(),
    [listings],
  );
  const [rooms, setRooms] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("best");

  const fairOf = (l: Listing) => getGoodDealThreshold(summary, l.unit_type);
  const goodDeal = (l: Listing) => {
    const t = fairOf(l);
    return t != null && typeof l.monthly_price === "number" && l.monthly_price < t;
  };
  // "Best value" = how far below fair price (ratio). Lower = better deal.
  const valueScore = (l: Listing) => {
    const t = fairOf(l);
    if (t == null || typeof l.monthly_price !== "number") return Infinity;
    return (l.monthly_price - t) / t;
  };

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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
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
          <option value="best">Sort: Best Value</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="sqft-asc">sqft ↑</option>
          <option value="sqft-desc">sqft ↓</option>
        </select>
      </div>

      <p className="text-xs text-secondary">
        Menampilkan <strong>{rows.length}</strong> dari {listings.length} listing.
      </p>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-card border border-border bg-card shadow-subtle md:block">
        <table className="w-full min-w-[860px] text-sm">
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
              <tr key={l.link + i} className="border-b border-border/60 align-top">
                <td className="max-w-[300px] px-4 py-3">
                  <span className="block font-medium text-primary">{l.title}</span>
                  <span className="mt-0.5 block text-xs text-secondary line-clamp-1">
                    {l.address}
                  </span>
                  <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <ListingCompletenessBadge listing={l} fairPrice={fairOf(l)} />
                    {goodDeal(l) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                        <BadgeCheck className="h-3 w-3" /> Good deal
                      </span>
                    )}
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
                <td className="px-4 py-3">
                  <FairDealContext listing={l} fairPrice={fairOf(l)} />
                </td>
                <td className="px-4 py-3">
                  <a
                    href={l.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 whitespace-nowrap text-accent hover:underline"
                  >
                    Lihat di SPEEDHOME <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {rows.map((l, i) => (
          <a
            key={l.link + i}
            href={l.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-card border border-border bg-card p-4 shadow-subtle"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium text-primary">{l.title}</p>
              <span className="shrink-0 font-medium tabular-nums text-primary">
                {formatPrice(l.monthly_price)}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <ListingCompletenessBadge listing={l} fairPrice={fairOf(l)} />
              {goodDeal(l) && (
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                  <BadgeCheck className="h-3 w-3" /> Good deal
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-secondary">
              <span>{l.room_type}</span>
              <span>{formatSqft(l.sqft)}</span>
              <FairDealContext listing={l} fairPrice={fairOf(l)} />
            </div>
            <div className="mt-1">
              <AvailabilitySignal listing={l} fairPrice={fairOf(l)} />
            </div>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-accent">
              Lihat di SPEEDHOME <ExternalLink className="h-3 w-3" />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
