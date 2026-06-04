"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Calculator } from "lucide-react";
import { calculateROI } from "@/lib/roiCalculator";
import { cn, formatPrice, formatPercent } from "@/lib/utils";

function Field({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  suffix?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="text-secondary">{label}</span>
      <span className="mt-1 flex items-center rounded-lg border border-border bg-background px-3 focus-within:border-accent">
        <input
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-2.5 text-primary placeholder:text-secondary focus:outline-none"
        />
        {suffix && <span className="pl-2 text-xs text-secondary">{suffix}</span>}
      </span>
    </label>
  );
}

const num = (s: string) => {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isNaN(n) ? 0 : n;
};

export default function ROICalculator({ fairPrice }: { fairPrice: number | null }) {
  const [open, setOpen] = useState(false);
  const [harga, setHarga] = useState("");
  const [renovasi, setRenovasi] = useState("");
  const [sewa, setSewa] = useState(fairPrice ? String(Math.round(fairPrice)) : "");
  const [maintenance, setMaintenance] = useState("");
  const [mgmt, setMgmt] = useState("");
  const [tenor, setTenor] = useState("10");

  const hargaBeli = num(harga);
  const r = useMemo(
    () =>
      calculateROI({
        hargaBeli,
        renovasi: num(renovasi),
        sewaBulan: num(sewa),
        maintenanceTahun: maintenance === "" ? hargaBeli * 0.01 : num(maintenance),
        mgmtFeePct: num(mgmt),
        tenor: num(tenor) || 10,
      }),
    [hargaBeli, renovasi, sewa, maintenance, mgmt, tenor],
  );

  const showResults = hargaBeli > 0 && num(sewa) > 0;

  return (
    <div className="rounded-card border border-border bg-card shadow-subtle">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2 font-medium text-primary">
          <Calculator className="h-4 w-4 text-accent" /> Mau tahu ini layak buat investasi?
        </span>
        <ChevronDown className={cn("h-5 w-5 text-secondary transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t border-border p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Harga beli properti (RM)" value={harga} onChange={setHarga} placeholder="contoh: 500000" />
            <Field label="Biaya renovasi/furnishing (RM)" value={renovasi} onChange={setRenovasi} placeholder="0" />
            <Field label="Target sewa per bulan (RM)" value={sewa} onChange={setSewa} placeholder="0" />
            <Field label="Maintenance per tahun (RM)" value={maintenance} onChange={setMaintenance} placeholder="default 1% harga beli" />
            <Field label="Management fee per tahun" value={mgmt} onChange={setMgmt} placeholder="0" suffix="%" />
            <Field label="Tenor investasi (tahun)" value={tenor} onChange={setTenor} placeholder="10" />
          </div>

          {showResults && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Gross Yield", value: formatPercent(r.grossYield) + " /tahun" },
                { label: "Net Yield", value: formatPercent(r.netYield) + " /tahun" },
                { label: "Payback Period", value: r.paybackYears != null ? `${r.paybackYears.toFixed(1)} tahun` : "—" },
                { label: "Total Return", value: r.totalReturn != null ? `${formatPrice(r.totalReturn)} / ${num(tenor) || 10} thn` : "—" },
                {
                  label: "Break Even",
                  value:
                    r.breakEvenMonth != null
                      ? `Bulan ke-${Math.ceil(r.breakEvenMonth)} (${Math.floor(r.breakEvenMonth / 12)}th ${Math.ceil(r.breakEvenMonth % 12)}bln)`
                      : "—",
                },
              ].map((c) => (
                <div key={c.label} className="rounded-lg border border-border bg-background p-3">
                  <p className="text-xs uppercase tracking-wider text-secondary">{c.label}</p>
                  <p className="mt-1 font-medium tabular-nums text-primary">{c.value}</p>
                </div>
              ))}
              {r.benchmark && (
                <div
                  className={cn(
                    "flex items-center rounded-lg border p-3 text-sm font-medium",
                    r.benchmark.tone === "good"
                      ? "border-success/30 bg-success/5 text-success"
                      : r.benchmark.tone === "medium"
                        ? "border-accent/30 bg-accent/5 text-accent"
                        : "border-border bg-background text-secondary",
                  )}
                >
                  {r.benchmark.emoji} {r.benchmark.label}
                </div>
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-secondary">
            Kalkulasi ini adalah estimasi — tidak termasuk pajak, biaya legal,
            vacancy rate, dan apresiasi harga properti. Konsultasikan dengan
            financial advisor sebelum investasi. Semua perhitungan dilakukan di
            browser Anda — nol data dikirim ke server.
          </p>
        </div>
      )}
    </div>
  );
}
