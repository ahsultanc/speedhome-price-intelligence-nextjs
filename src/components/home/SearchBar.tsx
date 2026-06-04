"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AREAS } from "@/lib/constants";
import { LANDMARKS } from "@/lib/landmarks";
import { cn, slugifyArea } from "@/lib/utils";

const SLUG_TO_NAME: Record<string, string> = Object.fromEntries(
  AREAS.map((a) => [slugifyArea(a), a]),
);
function slugToName(slug: string): string {
  return (
    SLUG_TO_NAME[slug] ??
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}
const LANDMARK_NAMES = Object.keys(LANDMARKS);

interface Props {
  onSearch: (query: string, note?: string) => void;
  loading?: boolean;
  strict: boolean;
  onStrictChange: (v: boolean) => void;
}

export default function SearchBar({ onSearch, loading, strict, onStrictChange }: Props) {
  const [mode, setMode] = useState<"area" | "url" | "near">("area");
  const [area, setArea] = useState(AREAS[0]);
  const [url, setUrl] = useState("");
  const [landmark, setLandmark] = useState("");

  const suggestions =
    landmark.length >= 2
      ? LANDMARK_NAMES.filter((l) =>
          l.toLowerCase().includes(landmark.toLowerCase()),
        ).slice(0, 6)
      : [];
  const noMatch = mode === "near" && landmark.length >= 2 && suggestions.length === 0;

  function pickLandmark(l: string) {
    const slug = LANDMARKS[l];
    setLandmark(l);
    onSearch(slug, `Menampilkan area terdekat dari ${l}: ${slugToName(slug)}`);
  }

  function submit() {
    if (mode === "area") {
      if (area) onSearch(area);
      return;
    }
    if (mode === "url") {
      const q = url.trim();
      if (q) onSearch(q);
      return;
    }
    // near
    const exact = LANDMARKS[landmark];
    if (exact) {
      pickLandmark(landmark);
    } else if (suggestions.length >= 1) {
      pickLandmark(suggestions[0]);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-3 flex items-center justify-center gap-1 text-sm">
        {(
          [
            ["area", "Area name"],
            ["url", "Direct URL"],
            ["near", "Dekat dengan"],
          ] as const
        ).map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-full px-3 py-1 font-medium transition-colors",
              mode === m ? "bg-primary text-background" : "text-secondary hover:text-primary",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-card border border-border bg-card p-2 shadow-subtle sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 pl-2">
          <Search className="h-5 w-5 shrink-0 text-secondary" />
          {mode === "area" && (
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-transparent py-3 text-primary focus:outline-none"
            >
              {AREAS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          )}
          {mode === "url" && (
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="https://speedhome.com/rent/mont-kiara"
              className="w-full bg-transparent py-3 text-primary placeholder:text-secondary focus:outline-none"
            />
          )}
          {mode === "near" && (
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="contoh: Mid Valley, KLCC, Taylor's..."
              className="w-full bg-transparent py-3 text-primary placeholder:text-secondary focus:outline-none"
            />
          )}
        </div>
        <button
          onClick={submit}
          disabled={loading}
          className="rounded-lg bg-navy px-7 py-3 font-medium text-background transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Mencari…" : "Cari Harga Wajar"}
        </button>
      </div>

      {mode === "near" && suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {suggestions.map((l) => (
            <button
              key={l}
              onClick={() => pickLandmark(l)}
              className="rounded-full border border-border px-3 py-1 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            >
              {l}
            </button>
          ))}
        </div>
      )}
      {noMatch && (
        <p className="mt-2 text-center text-xs text-secondary">
          Landmark ini belum tersedia. Coba ketik nama areanya langsung.
        </p>
      )}

      <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 text-sm text-secondary">
        <input
          type="checkbox"
          checked={strict}
          onChange={(e) => onStrictChange(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        Only show listings in this area
      </label>
    </div>
  );
}
