"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { AREAS } from "@/lib/constants";
import type { CompareResult, RentalType } from "@/lib/types";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorState from "@/components/shared/ErrorState";
import CompareView from "@/components/compare/CompareView";

type Status = "idle" | "loading" | "done" | "error";

function AreaSelect({
  label,
  value,
  onChange,
  accent,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  accent: "navy" | "accent";
}) {
  return (
    <div className="flex-1">
      <label
        className={cn(
          "mb-1.5 block text-xs font-semibold uppercase tracking-wider",
          accent === "navy" ? "text-navy" : "text-accent",
        )}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-4 py-3 text-primary shadow-subtle focus:outline-none"
      >
        {AREAS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ComparePage() {
  const [areaA, setAreaA] = useState(AREAS[0]);
  const [areaB, setAreaB] = useState(AREAS[1]);
  const [strict, setStrict] = useState(true);
  const [rental, setRental] = useState<RentalType>("monthly");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<CompareResult | null>(null);
  const [errMsg, setErrMsg] = useState("");

  async function compare() {
    if (areaA === areaB) {
      setErrMsg("Pilih dua area yang berbeda untuk dibandingkan.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setResult(null);
    setErrMsg("");
    try {
      const res = await fetch("/api/scrape-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area_a: areaA, area_b: areaB, strict }),
      });
      const data: CompareResult = await res.json();
      if (!data.ok) {
        setErrMsg(
          data.error ||
            data.area_a?.error ||
            data.area_b?.error ||
            "Gagal mengambil data perbandingan.",
        );
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("done");
    } catch (e) {
      setErrMsg(String(e));
      setStatus("error");
    }
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-20">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-secondary">
          Compare Areas
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-primary sm:text-5xl">
          Bandingkan dua area <span className="italic text-accent">berdampingan.</span>
        </h1>
      </section>

      <section className="mx-auto mt-8 max-w-3xl px-6">
        <div className="rounded-card border border-border bg-card p-5 shadow-subtle">
          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-end">
            <AreaSelect label="Area A" value={areaA} onChange={setAreaA} accent="navy" />
            <div className="hidden items-center justify-center pb-3 text-secondary sm:flex">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            <AreaSelect label="Area B" value={areaB} onChange={setAreaB} accent="accent" />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex gap-1 rounded-full border border-border p-1">
              {(["monthly", "yearly"] as RentalType[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRental(r)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    rental === r
                      ? "bg-primary text-background"
                      : "text-secondary hover:text-primary",
                  )}
                >
                  {r === "monthly" ? "Monthly" : "Yearly"}
                </button>
              ))}
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-secondary">
              <input
                type="checkbox"
                checked={strict}
                onChange={(e) => setStrict(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-accent"
              />
              Only show listings in each area
            </label>
          </div>

          <button
            onClick={compare}
            disabled={status === "loading"}
            className="mt-5 w-full rounded-lg bg-navy py-3 font-medium text-background transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Membandingkan…" : "Compare"}
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {status === "loading" && <LoadingSpinner label="Membandingkan area…" />}
        {status === "error" && <ErrorState message={errMsg} onRetry={compare} />}
        {status === "done" && result && <CompareView result={result} rental={rental} />}
      </div>
    </main>
  );
}
