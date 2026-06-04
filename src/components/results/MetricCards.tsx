"use client";

import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import type { OverallMetrics } from "@/lib/utils";
import { formatPrice, formatDecimal } from "@/lib/utils";

function Counter({
  value,
  format,
}: {
  value: number | null;
  format: (n: number | null) => string;
}) {
  // Animate via a motion value (no React setState — avoids cascading renders).
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => format(value === null ? null : v));
  useEffect(() => {
    if (value === null || Number.isNaN(value)) return;
    const controls = animate(mv, value, { duration: 0.8, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv]);
  return <motion.span>{text}</motion.span>;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

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
    { label: "Average", value: metrics.avg, format: formatPrice },
    { label: "Median", value: metrics.median, format: formatPrice },
    { label: "Per sqft", value: metrics.perSqft, format: formatDecimal },
  ];

  return (
    <div className="space-y-4">
      {/* Fair Price — HERO */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-card border border-accent/40 bg-card p-6 shadow-subtle"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          Harga wajar{heroUnit ? ` ${heroUnit}` : ""} di {area}
        </p>
        <p className="mt-1 font-display text-4xl font-bold tabular-nums text-primary">
          <Counter value={heroFair ?? metrics.fairPrice} format={formatPrice} />
          <span className="text-2xl font-semibold text-secondary">/bulan</span>
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-4"
      >
        {cards.map((c) => (
          <motion.div
            key={c.label}
            variants={item}
            className="rounded-card border border-border bg-card p-5 shadow-subtle"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-secondary">
              {c.label}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums text-primary">
              <Counter value={c.value} format={c.format} />
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
