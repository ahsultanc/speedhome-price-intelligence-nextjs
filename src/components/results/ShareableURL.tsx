"use client";

import { useState } from "react";
import { Users, Link as LinkIcon, Check } from "lucide-react";
import type { RentalType } from "@/lib/types";
import { slugifyArea } from "@/lib/utils";
import { useLocalStorage } from "@/lib/useLocalStorage";

interface Saved {
  area: string;
  type: RentalType;
}
const KEY = "speedhome_saved_searches";

export default function ShareableURL({
  area,
  rental,
  onSelect,
}: {
  area: string;
  rental: RentalType;
  onSelect?: (area: string, rental: RentalType) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useLocalStorage<Saved[]>(KEY, []);

  function share() {
    const slug = slugifyArea(area);
    const url = `${window.location.origin}/?area=${slug}&ref=share`;
    navigator.clipboard?.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    const next = [
      { area, type: rental },
      ...saved.filter((s) => !(s.area === area && s.type === rental)),
    ].slice(0, 5);
    setSaved(next);
  }

  return (
    <div className="rounded-card border border-border bg-card p-5 shadow-elev1">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Users className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">
            Sewa rumah sering diputuskan bareng
          </h3>
          <p className="mt-1 text-sm text-secondary">
            Bagikan data ini ke pasangan, keluarga, atau calon teman sekamar, biar
            semua sepakat dengan angka yang sama.
          </p>
        </div>
      </div>

      <button
        onClick={share}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <LinkIcon className="h-4 w-4 text-accent" />
        )}
        {copied ? "Link disalin! Tinggal kirim ke mereka." : "Salin link untuk dibagikan"}
      </button>

      {saved.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-secondary">Pencarian tersimpan (di browser ini):</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {saved.map((s) => (
              <button
                key={`${s.area}-${s.type}`}
                onClick={() => onSelect?.(s.area, s.type)}
                className="rounded-full border border-border px-3 py-1 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
              >
                {s.area} · {s.type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
