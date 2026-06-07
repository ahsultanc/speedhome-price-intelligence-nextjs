import { Info } from "lucide-react";
import type { SummaryRow } from "@/lib/types";
import { formatPrice, formatDecimal, formatSqft, cn } from "@/lib/utils";

type Kind = "text" | "count" | "price" | "sqft" | "perSqft";

const COLUMNS: { key: keyof SummaryRow; label: string; kind: Kind; tip?: string }[] = [
  { key: "Unit Type", label: "Unit Type", kind: "text" },
  { key: "Count", label: "Count", kind: "count" },
  { key: "Average (RM)", label: "Average", kind: "price" },
  { key: "Median (RM)", label: "Median", kind: "price" },
  { key: "Mode (RM)", label: "Mode", kind: "price" },
  {
    key: "Fair Price (RM)",
    label: "Fair Price",
    kind: "price",
    tip: "Trimmed mean: buang 10% data termurah & termahal, lalu rata-rata. Mengurangi pengaruh outlier.",
  },
  { key: "Min (RM)", label: "Min", kind: "price" },
  { key: "Max (RM)", label: "Max", kind: "price" },
  { key: "Avg sqft", label: "Avg sqft", kind: "sqft" },
  { key: "Price/sqft (RM)", label: "Price/sqft", kind: "perSqft" },
];

function render(row: SummaryRow, key: keyof SummaryRow, kind: Kind) {
  const v = row[key];
  if (kind === "text") {
    return (
      <span className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
        {String(v)}
      </span>
    );
  }
  if (kind === "count") return <span className="tabular-nums">{String(v)}</span>;
  if (kind === "sqft") return formatSqft(v as number | null);
  if (kind === "perSqft") return formatDecimal(v as number | null);
  return formatPrice(v as number | null);
}

export default function PriceSummaryTable({
  summary,
  highlight,
}: {
  summary: SummaryRow[];
  highlight?: string | null;
}) {
  if (!summary.length) {
    return (
      <p className="rounded-card border border-border bg-card px-5 py-4 text-sm text-secondary">
        Belum cukup data harga untuk membuat ringkasan.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card shadow-elev1">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            {COLUMNS.map((c) => (
              <th
                key={String(c.key)}
                className="whitespace-nowrap px-4 py-3 font-medium text-secondary"
              >
                <span className="inline-flex items-center gap-1">
                  {c.label}
                  {c.tip && (
                    <span title={c.tip} className="cursor-help text-accent">
                      <Info className="h-3.5 w-3.5" />
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summary.map((row, i) => {
            const isSelected = highlight != null && row["Unit Type"] === highlight;
            return (
            <tr
              key={String(row["Unit Type"])}
              className={cn(
                "border-b border-border/60",
                i % 2 === 1 && "bg-background/40",
                isSelected && "bg-accent/10 ring-1 ring-inset ring-accent/40",
              )}
            >
              {COLUMNS.map((c) => (
                <td
                  key={String(c.key)}
                  className="whitespace-nowrap px-4 py-3 tabular-nums text-primary"
                >
                  {render(row, c.key, c.kind)}
                </td>
              ))}
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
