"use client";

import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import type { OverallMetrics } from "@/lib/utils";
import { formatPrice, formatDecimal } from "@/lib/utils";

function Counter({
  value,
  format,
  duration = 0.8,
}: {
  value: number | null;
  format: (n: number | null) => string;
  duration?: number;
}) {
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => format(value === null ? null : v));
  useEffect(() => {
    if (value === null || Number.isNaN(value)) return;
    const controls = animate(mv, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv, duration]);
  return <motion.span>{text}</motion.span>;
}

export default function MetricCards({
  metrics,
  area,
  heroUnit,
  heroFair,
}: {
  metrics: OverallMetrics;
  area: string;
  heroUnit?: string;
  heroFair?: number | null;
}) {
  const cards = [
    { label: "Average", value: metrics.avg, format: formatPrice, delay: 0, note: "(termasuk unit premium)" },
    { label: "Median", value: metrics.median, format: formatPrice, delay: 0.15, note: "" },
    { label: "Per sqft", value: metrics.perSqft, format: formatDecimal, delay: 0.3, note: "" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: c.delay }}
            className="rounded-card border border-border bg-card p-5 shadow-subtle"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-secondary">
              {c.label}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-primary">
              <Counter value={c.value} format={c.format} />
            </p>
            {c.note && <p className="mt-0.5 text-[11px] text-secondary">{c.note}</p>}
          </motion.div>
        ))}
      </div>

      {/* Fair Price — HERO, revealed last */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="rounded-card border-2 border-accent bg-card p-6 shadow-subtle"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          Harga wajar{heroUnit ? ` ${heroUnit}` : ""} di {area}
        </p>
        <p className="mt-1 font-display text-5xl font-bold tabular-nums text-primary">
          <Counter value={heroFair ?? metrics.fairPrice} format={formatPrice} duration={1.2} />
          <span className="text-2xl font-semibold text-secondary">/bulan</span>
        </p>
      </motion.div>
    </div>
  );
}
