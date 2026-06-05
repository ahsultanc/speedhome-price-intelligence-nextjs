"use client";

import { useState } from "react";
import { Wallet, CheckCircle2, AlertTriangle, AlertCircle, Check, X } from "lucide-react";
import type { Listing } from "@/lib/types";

export default function BudgetFilter({
  listings,
  fairPrice,
  area,
}: {
  listings: Listing[];
  fairPrice: number | null;
  area?: string;
}) {
  const [income, setIncome] = useState("");
  const [rent, setRent] = useState(fairPrice ? String(Math.round(fairPrice)) : "");

  const incomeN = parseInt(income.replace(/[^0-9]/g, ""), 10);
  const rentN = parseInt(rent.replace(/[^0-9]/g, ""), 10);
  const hasIncome = !Number.isNaN(incomeN) && incomeN > 0;
  const hasRent = !Number.isNaN(rentN) && rentN > 0;
  const show = hasIncome && hasRent;

  const ratio = show ? Math.round((rentN / incomeN) * 100) : 0;
  const status =
    ratio < 30
      ? {
          bg: "#F0F5F1",
          fg: "#3B6D11",
          Icon: CheckCircle2,
          msg: "Sehat dan sustainable — di bawah panduan umum 30%",
        }
      : ratio <= 40
        ? {
            bg: "#FDF6E8",
            fg: "#854F0B",
            Icon: AlertTriangle,
            msg: "Agak ketat, tapi masih manageable",
          }
        : {
            bg: "#FBEFEF",
            fg: "#A32D2D",
            Icon: AlertCircle,
            msg: "Berisiko — pertimbangkan area atau unit lain",
          };
  const StatusIcon = status.Icon;

  const remaining = incomeN - rentN;
  // deposit 2 bulan + advance 1 bulan + utility deposit (asumsi RM 200)
  const upfront = rentN * 2 + rentN + 200;

  let inBudget = 0;
  let near = 0;
  let out = 0;
  if (show) {
    for (const l of listings) {
      const p = l.monthly_price;
      if (typeof p !== "number") continue;
      if (p <= rentN) inBudget++;
      else if (p <= rentN * 1.15) near++;
      else out++;
    }
  }

  const rm = (n: number) => `RM ${Math.round(n).toLocaleString("en-MY")}`;

  return (
    <div className="rounded-card border border-border bg-card p-5 shadow-elev1">
      <label className="flex items-center gap-2 text-sm font-medium text-primary">
        <Wallet className="h-4 w-4 text-accent" /> Cek kemampuan sewa kamu
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-secondary">Penghasilan bulanan (RM)</span>
          <input
            inputMode="numeric"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="contoh: 8000"
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-primary placeholder:text-secondary focus:border-accent focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="flex items-center gap-1.5 text-secondary">
            Harga sewa (RM)
            {fairPrice ? <span className="text-xs text-accent">· Fair Price</span> : null}
          </span>
          <input
            inputMode="numeric"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="contoh: 2500"
            className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-primary placeholder:text-secondary focus:border-accent focus:outline-none"
          />
        </label>
      </div>

      {show && (
        <div className="mt-4 space-y-4">
          {/* Output 1 — Rasio kesehatan (hero) */}
          <div className="rounded-[10px] p-4" style={{ backgroundColor: status.bg }}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-primary">Sewa ini dari penghasilan kamu</span>
              <span
                className="text-xl font-medium tabular-nums"
                style={{ color: status.fg }}
              >
                {ratio}%
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "#E5E0D8" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(ratio, 100)}%`, backgroundColor: status.fg }}
              />
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm" style={{ color: status.fg }}>
              <StatusIcon className="h-4 w-4 shrink-0" /> {status.msg}
            </p>
          </div>

          {/* Output 2 — Dua metric cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div
              className="rounded-lg border border-border p-3"
              style={{ backgroundColor: "#F8F6F1" }}
            >
              <p className="text-xs uppercase tracking-wider text-secondary">
                Sisa untuk kebutuhan lain
              </p>
              <p className="mt-1 font-medium tabular-nums text-primary">
                {rm(remaining)}/bulan
              </p>
            </div>
            <div
              className="rounded-lg border border-border p-3"
              style={{ backgroundColor: "#F8F6F1" }}
            >
              <p className="text-xs uppercase tracking-wider text-secondary">
                Perlu disiapkan di awal
              </p>
              <p className="mt-1 font-medium tabular-nums text-primary">{rm(upfront)}</p>
              <p className="mt-0.5 text-[11px] text-secondary">
                deposit 2bln + advance 1bln + utility
              </p>
            </div>
          </div>

          {/* Output 3 — Listing dalam budget */}
          <div className="border-t border-border pt-3">
            <p className="text-sm text-secondary">
              Dengan budget ini di <strong className="text-primary">{area}</strong>:
            </p>
            <div className="mt-2 space-y-1 text-sm">
              <p className="flex items-center gap-1.5" style={{ color: "#3B6D11" }}>
                <Check className="h-4 w-4" /> {inBudget} listing cocok
              </p>
              <p className="flex items-center gap-1.5" style={{ color: "#854F0B" }}>
                <AlertTriangle className="h-4 w-4" /> {near} sedikit di atas
              </p>
              <p className="flex items-center gap-1.5 text-secondary">
                <X className="h-4 w-4" /> {out} di luar budget
              </p>
            </div>
            {inBudget > 0 && (
              <p className="mt-2 text-sm text-primary">
                Ini yang paling worth it:{" "}
                <span className="text-secondary">lihat di tabel listing bawah.</span>
              </p>
            )}
          </div>

          <p className="text-xs italic text-secondary">
            Ini panduan umum, bukan saran finansial. Sesuaikan dengan kondisi pribadimu.
          </p>
        </div>
      )}
    </div>
  );
}
