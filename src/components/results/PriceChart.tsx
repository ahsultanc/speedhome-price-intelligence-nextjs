"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SummaryRow } from "@/lib/types";
import { cn } from "@/lib/utils";

const rm = (v: number) => `RM ${Number(v).toLocaleString("en-MY")}`;
const kAxis = (v: number) => (v >= 1000 ? `RM${(v / 1000).toFixed(0)}k` : `RM${v}`);
const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #E5E0D8",
  fontSize: 13,
} as const;

export default function PriceChart({ summary }: { summary: SummaryRow[] }) {
  const [open, setOpen] = useState(false);
  const data = summary.map((r) => ({
    unit: r["Unit Type"],
    Average: r["Average (RM)"],
    Median: r["Median (RM)"],
    Min: r["Min (RM)"],
    Max: r["Max (RM)"],
  }));
  if (!data.length) {
    return (
      <p className="rounded-card border border-border bg-card px-5 py-4 text-sm text-secondary">
        Belum cukup data untuk grafik.
      </p>
    );
  }

  return (
    <div className="rounded-card border border-border bg-card p-4 shadow-subtle">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
          <XAxis dataKey="unit" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={kAxis} />
          <Tooltip formatter={(v) => rm(v as number)} contentStyle={tooltipStyle} cursor={{ fill: "#1C1C1E08" }} />
          <Legend />
          <Bar dataKey="Average" fill="#1B2A4A" radius={[4, 4, 0, 0]} animationDuration={800} />
          <Bar dataKey="Median" fill="#C9A96E" radius={[4, 4, 0, 0]} animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-3 flex items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-primary"
      >
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        Advanced: Price range (min–max) per unit type
      </button>
      {open && (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 12, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
            <XAxis dataKey="unit" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={kAxis} />
            <Tooltip formatter={(v) => rm(v as number)} contentStyle={tooltipStyle} cursor={{ fill: "#1C1C1E08" }} />
            <Legend />
            <Bar dataKey="Min" fill="#4A7C59" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Max" fill="#C0392B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
