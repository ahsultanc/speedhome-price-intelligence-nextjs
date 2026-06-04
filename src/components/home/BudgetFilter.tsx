"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import type { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function BudgetFilter({ listings }: { listings: Listing[] }) {
  const [budget, setBudget] = useState("");
  const n = parseInt(budget.replace(/[^0-9]/g, ""), 10);
  const valid = !Number.isNaN(n) && n > 0;

  let inBudget = 0;
  let near = 0;
  let out = 0;
  if (valid) {
    for (const l of listings) {
      const p = l.monthly_price;
      if (typeof p !== "number") continue;
      if (p <= n) inBudget++;
      else if (p <= n * 1.15) near++;
      else out++;
    }
  }

  return (
    <div className="rounded-card border border-border bg-card p-5 shadow-subtle">
      <label className="flex items-center gap-2 text-sm font-medium text-primary">
        <Wallet className="h-4 w-4 text-accent" /> Budget sewa per bulan (RM)
      </label>
      <input
        inputMode="numeric"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        placeholder="contoh: 1500"
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-primary placeholder:text-secondary focus:outline-none"
      />
      {valid && (
        <div className="mt-3 space-y-1 text-sm">
          <p className="text-secondary">
            Berdasarkan budget <strong className="text-primary">{formatPrice(n)}</strong>/bulan:
          </p>
          <p className="text-success">✅ {inBudget} listing dalam budget</p>
          <p className="text-accent">⚠️ {near} listing sedikit di atas budget</p>
          <p className="text-secondary">❌ {out} listing di luar budget</p>
        </div>
      )}
      <p className="mt-3 text-xs text-secondary">
        Budget bersifat privat — tidak disimpan atau dikirim ke server.
      </p>
    </div>
  );
}
