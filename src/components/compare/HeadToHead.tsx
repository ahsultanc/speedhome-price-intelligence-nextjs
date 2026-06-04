import type { OverallMetrics } from "@/lib/utils";
import { cn, formatDecimal, formatPrice } from "@/lib/utils";

interface Row {
  key: string;
  label: string;
  a: number | null;
  b: number | null;
  fmt: (n: number | null) => string;
  lowerBetter: boolean;
}

const intFmt = (n: number | null) =>
  n == null ? "—" : n.toLocaleString("en-MY");

export default function HeadToHead({
  nameA,
  nameB,
  a,
  b,
}: {
  nameA: string;
  nameB: string;
  a: OverallMetrics;
  b: OverallMetrics;
}) {
  const rows: Row[] = [
    { key: "listings", label: "Listings", a: a.count, b: b.count, fmt: intFmt, lowerBetter: false },
    { key: "avg", label: "Average", a: a.avg, b: b.avg, fmt: formatPrice, lowerBetter: true },
    { key: "median", label: "Median", a: a.median, b: b.median, fmt: formatPrice, lowerBetter: true },
    { key: "min", label: "Min", a: a.min, b: b.min, fmt: formatPrice, lowerBetter: true },
    { key: "max", label: "Max", a: a.max, b: b.max, fmt: formatPrice, lowerBetter: true },
    { key: "psf", label: "Price/sqft", a: a.perSqft, b: b.perSqft, fmt: formatDecimal, lowerBetter: true },
  ];

  const winner = (r: Row): "a" | "b" | null => {
    if (r.a == null || r.b == null || r.a === r.b) return null;
    const aWins = r.lowerBetter ? r.a < r.b : r.a > r.b;
    return aWins ? "a" : "b";
  };

  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card shadow-subtle">
      <table className="w-full min-w-[460px] text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-3 font-medium text-secondary">Metric</th>
            <th className="px-4 py-3 font-medium text-navy">🔵 {nameA}</th>
            <th className="px-4 py-3 font-medium text-accent">🟠 {nameB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const w = winner(r);
            return (
              <tr key={r.key} className="border-b border-border/60">
                <td className="px-4 py-3 font-medium text-secondary">{r.label}</td>
                <td
                  className={cn(
                    "px-4 py-3 tabular-nums",
                    w === "a" ? "font-semibold text-success" : "text-primary",
                  )}
                >
                  {w === "a" && "✅ "}
                  {r.fmt(r.a)}
                </td>
                <td
                  className={cn(
                    "px-4 py-3 tabular-nums",
                    w === "b" ? "font-semibold text-success" : "text-primary",
                  )}
                >
                  {w === "b" && "✅ "}
                  {r.fmt(r.b)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="px-4 py-2 text-xs text-secondary">
        ✅ Hijau = lebih murah (better value). Untuk Listings, lebih banyak = supply
        lebih tinggi.
      </p>
    </div>
  );
}
