"use client";

import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
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

// Fair Price hero counter: starts at the area average and counts DOWN to the
// fair price — visually showing "this is cheaper than average" without words.
function FairPriceCounter({
  averagePrice,
  fairPrice,
}: {
  averagePrice: number | null;
  fairPrice: number | null;
}) {
  const start = averagePrice ?? fairPrice ?? 0;
  const [displayValue, setDisplayValue] = useState(start);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    if (fairPrice === null || Number.isNaN(fairPrice)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no value to animate to
      setAnimating(false);
      return;
    }
    const startVal = averagePrice ?? fairPrice;
    const endVal = fairPrice;
    setDisplayValue(startVal);
    setAnimating(true);

    let raf = 0;
    const timer = setTimeout(() => {
      const startTime = performance.now();
      const duration = 1500;
      const step = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOut cubic
        setDisplayValue(Math.round(startVal + (endVal - startVal) * eased));
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setAnimating(false);
        }
      };
      raf = requestAnimationFrame(step);
    }, 500);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [averagePrice, fairPrice]);

  const showLabel = animating && averagePrice !== null && averagePrice !== fairPrice;

  return (
    <>
      <span
        className="block min-h-[1.1rem] text-xs text-secondary transition-opacity duration-500"
        style={{ opacity: showLabel ? 0.6 : 0 }}
        aria-hidden={!showLabel}
      >
        dari rata-rata {formatPrice(averagePrice)}
      </span>
      <p className="mt-1 font-display text-5xl font-bold tabular-nums text-primary">
        {formatPrice(displayValue)}
        <span className="text-2xl font-semibold text-secondary">/bulan</span>
      </p>
    </>
  );
}

export default function MetricCards({
  metrics,
  area,
  heroUnit,
  heroFair,
  sampleCount,
}: {
  metrics: OverallMetrics;
  area: string;
  heroUnit?: string;
  heroFair?: number | null;
  sampleCount?: number;
}) {
  const cards = [
    { label: "Average", value: metrics.avg, format: formatPrice, delay: 0, note: "(termasuk unit premium)" },
    { label: "Median", value: metrics.median, format: formatPrice, delay: 0.15, note: "" },
    { label: "Per sqft", value: metrics.perSqft, format: formatDecimal, delay: 0.3, note: "" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: c.delay }}
            className="rounded-card border border-border bg-card p-5 shadow-elev1"
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
        className="rounded-card border-[1.5px] border-accent bg-card p-8 shadow-elev2"
      >
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          Harga wajar{heroUnit ? ` ${heroUnit}` : ""} di {area}
        </p>
        <FairPriceCounter
          averagePrice={metrics.avg}
          fairPrice={heroFair ?? metrics.fairPrice}
        />
        {typeof sampleCount === "number" && sampleCount > 0 && (
          <p className="mt-2 text-xs text-secondary">
            berdasarkan {sampleCount.toLocaleString("en-MY")} listing
            {heroUnit ? ` ${heroUnit}` : ""}
            {sampleCount < 3 ? " · sampel kecil, anggap sebagai indikasi awal" : ""}
          </p>
        )}
      </motion.div>
    </div>
  );
}
