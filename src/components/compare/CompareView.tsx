"use client";

import { motion } from "framer-motion";
import type { CompareResult, RentalType } from "@/lib/types";
import { computeMetrics, filterByRentalType } from "@/lib/utils";
import HeadToHead from "./HeadToHead";
import CompareChart from "./CompareChart";
import VerdictBox from "./VerdictBox";
import PriceSummaryTable from "@/components/results/PriceSummaryTable";

export default function CompareView({
  result,
  rental,
}: {
  result: CompareResult;
  rental: RentalType;
}) {
  const A = result.area_a;
  const B = result.area_b;
  const nameA = A?.meta?.area ?? "Area A";
  const nameB = B?.meta?.area ?? "Area B";

  const listA = filterByRentalType(A?.listings ?? [], rental);
  const listB = filterByRentalType(B?.listings ?? [], rental);
  const mA = computeMetrics(listA);
  const mB = computeMetrics(listB);
  const sumA = (rental === "monthly" ? A?.summary_monthly : A?.summary_yearly) ?? [];
  const sumB = (rental === "monthly" ? B?.summary_monthly : B?.summary_yearly) ?? [];
  const isDemo = Boolean(A?.is_demo || B?.is_demo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {isDemo && (
        <div className="rounded-card border border-accent/30 bg-[#FEF3C7] px-4 py-3 text-sm text-primary">
          ⚠️ Menampilkan data sampel — scraping live sedang tidak tersedia. Data
          akurat per {A?.meta?.scraped_at ?? B?.meta?.scraped_at ?? "—"} MYT.
        </div>
      )}

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-primary">
          Head-to-Head ({rental === "monthly" ? "Monthly" : "Yearly"})
        </h2>
        <HeadToHead nameA={nameA} nameB={nameB} a={mA} b={mB} />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-primary">
          Price Comparison
        </h2>
        <CompareChart nameA={nameA} nameB={nameB} mA={mA} mB={mB} sumA={sumA} sumB={sumB} />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-primary">
          Price Summary by Unit Type
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <p className="font-medium text-navy">🔵 {nameA}</p>
            <PriceSummaryTable summary={sumA} />
          </div>
          <div className="space-y-2">
            <p className="font-medium text-accent">🟠 {nameB}</p>
            <PriceSummaryTable summary={sumB} />
          </div>
        </div>
      </section>

      <VerdictBox
        nameA={nameA}
        nameB={nameB}
        a={mA}
        b={mB}
        scrapedA={A?.meta?.scraped_at}
        scrapedB={B?.meta?.scraped_at}
      />
    </motion.div>
  );
}
