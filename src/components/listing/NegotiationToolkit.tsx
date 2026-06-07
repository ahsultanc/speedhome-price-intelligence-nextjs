"use client";

import { useState } from "react";
import { ChevronDown, Home, MessageSquare, BarChart3, Copy, Check } from "lucide-react";
import { buildSpeedhomeURL } from "@/lib/utm";
import { cn } from "@/lib/utils";

const fmt = (n: number) => `RM ${Math.round(n).toLocaleString("en-MY")}`;

export default function NegotiationToolkit({
  area,
  areaSlug,
  listingId,
  fairPrice,
}: {
  area: string;
  areaSlug: string;
  listingId: string;
  fairPrice: number;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const script = `Saya tertarik dengan unit ini. Berdasarkan data pasar area ${area}, rata-rata unit serupa ${fmt(fairPrice)}/bulan. Apakah ada fleksibilitas harga?`;

  function copy(text: string, id: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }
  function shareLink() {
    const url = `${window.location.origin}/?area=${encodeURIComponent(area)}&type=monthly&utm_source=price-intelligence&utm_medium=cta&utm_campaign=negotiation-data-share`;
    copy(url, "share");
  }

  return (
    <div className="mt-2 rounded-lg border border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-primary"
      >
        <span>Punya data untuk negosiasi →</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-secondary transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="space-y-3 border-t border-border p-3 text-xs">
          <div>
            <p className="flex items-center gap-1.5 font-medium text-primary">
              <Home className="h-3.5 w-3.5 text-navy" /> Via SPEEDHOME (direkomendasikan)
            </p>
            <p className="text-secondary">Semua komunikasi tercatat dan terlindungi</p>
            <a
              href={buildSpeedhomeURL(areaSlug, "negotiation-platform", listingId)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1.5 inline-block rounded-md bg-navy px-3 py-1.5 font-medium text-white transition-colors hover:bg-accent hover:text-primary"
            >
              Buat Penawaran di SPEEDHOME →
            </a>
          </div>
          <div>
            <p className="flex items-center gap-1.5 font-medium text-primary">
              <MessageSquare className="h-3.5 w-3.5 text-navy" /> Script negosiasi
            </p>
            <p className="text-secondary">Gunakan di channel manapun</p>
            <textarea
              readOnly
              value={script}
              rows={3}
              className="mt-1.5 w-full resize-none rounded-md border border-border bg-background p-2 text-[11px] text-primary"
            />
            <button
              onClick={() => copy(script, "script")}
              className="mt-1 inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 font-medium text-primary transition-colors hover:border-accent"
            >
              {copied === "script" ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              Salin teks ini
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1.5 font-medium text-primary">
              <BarChart3 className="h-3.5 w-3.5 text-navy" /> Bagikan data pasar ke landlord
            </p>
            <p className="text-secondary">Tunjukkan sebagai referensi objektif</p>
            <button
              onClick={shareLink}
              className="mt-1.5 inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 font-medium text-primary transition-colors hover:border-accent"
            >
              {copied === "share" ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              Salin link data area ini →
            </button>
          </div>
          <p className="text-[11px] italic text-secondary">
            Data ini adalah referensi pasar, bukan garansi harga. Hasil negosiasi
            bergantung pada kondisi masing-masing.
          </p>
        </div>
      )}
    </div>
  );
}
