"use client";

import * as Tabs from "@radix-ui/react-tabs";
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
import type { OverallMetrics } from "@/lib/utils";
import { UNIT_TYPE_ORDER } from "@/lib/constants";

const rm = (v: number) => `RM ${Number(v).toLocaleString("en-MY")}`;
const kAxis = (v: number) => (v >= 1000 ? `RM${(v / 1000).toFixed(0)}k` : `RM${v}`);
const tipStyle = { borderRadius: 12, border: "1px solid #E5E0D8", fontSize: 13 } as const;

function Chart({ children, data }: { children: React.ReactNode; data: object[] }) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} margin={{ top: 12, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" vertical={false} />
        <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={kAxis} />
        <Tooltip formatter={(v) => rm(v as number)} contentStyle={tipStyle} cursor={{ fill: "#1C1C1E08" }} />
        <Legend />
        {children}
      </BarChart>
    </ResponsiveContainer>
  );
}

const TAB =
  "rounded-full px-4 py-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-background";

export default function CompareChart({
  nameA,
  nameB,
  mA,
  mB,
  sumA,
  sumB,
}: {
  nameA: string;
  nameB: string;
  mA: OverallMetrics;
  mB: OverallMetrics;
  sumA: SummaryRow[];
  sumB: SummaryRow[];
}) {
  const overall = [
    { metric: "Average", A: mA.avg, B: mB.avg },
    { metric: "Median", A: mA.median, B: mB.median },
    { metric: "Min", A: mA.min, B: mB.min },
    { metric: "Max", A: mA.max, B: mB.max },
  ];

  const units = UNIT_TYPE_ORDER.filter(
    (u) => sumA.some((r) => r["Unit Type"] === u) || sumB.some((r) => r["Unit Type"] === u),
  );
  const val = (sum: SummaryRow[], u: string, col: keyof SummaryRow) => {
    const r = sum.find((x) => x["Unit Type"] === u);
    return r ? (r[col] as number | null) : null;
  };
  const perUnit = units.map((u) => ({
    unit: u,
    Aavg: val(sumA, u, "Average (RM)"),
    Bavg: val(sumB, u, "Average (RM)"),
    Amed: val(sumA, u, "Median (RM)"),
    Bmed: val(sumB, u, "Median (RM)"),
  }));

  const range = [
    { metric: "Min", A: mA.min, B: mB.min },
    { metric: "Max", A: mA.max, B: mB.max },
  ];

  return (
    <Tabs.Root defaultValue="overall" className="rounded-card border border-border bg-card p-4 shadow-subtle">
      <Tabs.List className="mb-3 inline-flex gap-1 rounded-full border border-border p-1">
        <Tabs.Trigger value="overall" className={TAB}>
          Overall
        </Tabs.Trigger>
        <Tabs.Trigger value="unit" className={TAB}>
          Per Unit Type
        </Tabs.Trigger>
        <Tabs.Trigger value="range" className={TAB}>
          Range
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overall">
        <Chart data={overall}>
          <XAxis dataKey="metric" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <Bar dataKey="A" name={nameA} fill="#1B2A4A" radius={[4, 4, 0, 0]} animationDuration={700} />
          <Bar dataKey="B" name={nameB} fill="#C9A96E" radius={[4, 4, 0, 0]} animationDuration={700} />
        </Chart>
      </Tabs.Content>

      <Tabs.Content value="unit">
        <Chart data={perUnit}>
          <XAxis dataKey="unit" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <Bar dataKey="Aavg" name={`${nameA} Avg`} fill="#1B2A4A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Bavg" name={`${nameB} Avg`} fill="#C9A96E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Amed" name={`${nameA} Median`} fill="#A9C7F8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Bmed" name={`${nameB} Median`} fill="#FFB59B" radius={[4, 4, 0, 0]} />
        </Chart>
      </Tabs.Content>

      <Tabs.Content value="range">
        <Chart data={range}>
          <XAxis dataKey="metric" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <Bar dataKey="A" name={nameA} fill="#1B2A4A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="B" name={nameB} fill="#C9A96E" radius={[4, 4, 0, 0]} />
        </Chart>
      </Tabs.Content>
    </Tabs.Root>
  );
}
