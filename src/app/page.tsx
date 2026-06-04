"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import TrustSignals from "@/components/home/TrustSignals";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import Timestamp from "@/components/shared/Timestamp";
import GlobalDisclaimer from "@/components/shared/GlobalDisclaimer";
import MetricCards from "@/components/results/MetricCards";
import SoWhatBox from "@/components/results/SoWhatBox";
import AreaIntelCard from "@/components/results/AreaIntelCard";
import SupplyIndicator from "@/components/results/SupplyIndicator";
import BudgetFilter from "@/components/home/BudgetFilter";
import PriceSummaryTable from "@/components/results/PriceSummaryTable";
import RentalTypeTabs from "@/components/results/RentalTypeTabs";
import PriceChart from "@/components/results/PriceChart";
import ListingsTable from "@/components/results/ListingsTable";
import ExcelExport from "@/components/results/ExcelExport";
import ROICalculator from "@/components/results/ROICalculator";
import ShareableURL from "@/components/results/ShareableURL";
import SimilarAreas from "@/components/results/SimilarAreas";
import FeedbackWidget from "@/components/shared/FeedbackWidget";
import PreSurveyChecklist from "@/components/listing/PreSurveyChecklist";
import PostDealChecklist from "@/components/listing/PostDealChecklist";
import { computeMetrics, filterByRentalType } from "@/lib/utils";
import type { RentalType, ScrapeResult } from "@/lib/types";

type Status = "idle" | "loading" | "done" | "error";

export default function Home() {
  const [strict, setStrict] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const [rental, setRental] = useState<RentalType>("monthly");
  const [lastQuery, setLastQuery] = useState("");

  async function search(query: string, strictArg = strict) {
    setStatus("loading");
    setResult(null);
    setErrMsg("");
    setRental("monthly");
    setLastQuery(query);
    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, strict: strictArg }),
      });
      const data: ScrapeResult = await res.json();
      if (!data.ok) {
        setErrMsg(data.error || "Gagal mengambil data.");
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

  // Deep link: /?area=mont-kiara&type=monthly → auto-search on first load.
  const didDeepLink = useRef(false);
  useEffect(() => {
    if (didDeepLink.current) return;
    didDeepLink.current = true;
    const sp = new URLSearchParams(window.location.search);
    const a = sp.get("area");
    if (a) {
      const t = sp.get("type");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time URL deep-link on mount
      if (t === "yearly") setRental("yearly");
      search(a);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectSaved(a: string, r: RentalType) {
    setRental(r);
    search(a);
  }

  const listings = result?.listings ?? [];
  const summaryMonthly = result?.summary_monthly ?? [];
  const summaryYearly = result?.summary_yearly ?? [];
  const summary = rental === "monthly" ? summaryMonthly : summaryYearly;
  const shown = filterByRentalType(listings, rental);
  const monthlyListings = filterByRentalType(listings, "monthly");
  const metrics = computeMetrics(shown);
  const hasYearly = filterByRentalType(listings, "yearly").length > 0;
  const area = result?.meta?.area ?? lastQuery;
  const noData = status === "done" && listings.length === 0;
  const topRow = summary.length
    ? [...summary].sort((a, b) => b.Count - a.Count)[0]
    : undefined;
  const heroUnit = topRow?.["Unit Type"];
  const heroFair = topRow?.["Fair Price (RM)"] ?? metrics.fairPrice;

  return (
    <main className="flex-1">
      <HeroSection />
      <section className="px-6">
        <SearchBar
          onSearch={(q) => search(q)}
          loading={status === "loading"}
          strict={strict}
          onStrictChange={setStrict}
        />
        <TrustSignals />
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12">
        {status === "loading" && <LoadingSpinner />}
        {status === "error" && (
          <ErrorState message={errMsg} onRetry={() => lastQuery && search(lastQuery)} />
        )}
        {noData && (
          <EmptyState
            area={area}
            onDisableStrict={() => {
              setStrict(false);
              search(lastQuery, false);
            }}
          />
        )}

        {status === "done" && listings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-3">
              {result?.is_demo && (
                <div className="rounded-card border border-accent/30 bg-[#FEF3C7] px-4 py-2 text-xs font-medium text-primary">
                  ⚠️ Menampilkan data sampel — scraping live sedang tidak tersedia.
                  Data akurat per {result?.meta?.scraped_at ?? "—"} MYT.
                </div>
              )}
              <Timestamp time={result?.meta?.scraped_at} count={result?.meta?.in_area_count} />
              <SupplyIndicator count={result?.meta?.in_area_count ?? listings.length} />
            </div>

            <GlobalDisclaimer />
            <AreaIntelCard area={area} />
            <SoWhatBox listings={monthlyListings} summary={summaryMonthly} area={area} />
            <MetricCards metrics={metrics} area={area} heroUnit={heroUnit} heroFair={heroFair} />
            <BudgetFilter listings={shown} />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <RentalTypeTabs value={rental} onChange={setRental} hasYearly={hasYearly} />
              <ExcelExport
                area={area}
                summary={summary}
                listings={shown}
                scrapedAt={result?.meta?.scraped_at}
              />
            </div>
            <p className="-mt-4 text-xs text-secondary">
              Semua harga per bulan (RM/bulan). “Yearly” = sewa minimum 12 bulan,
              bukan total tahunan.
            </p>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-primary">
                Price Summary by Unit Type
              </h2>
              <PriceSummaryTable summary={summary} />
            </section>

            <ROICalculator fairPrice={heroFair} />

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-primary">
                Average vs Median per Unit Type
              </h2>
              <PriceChart summary={summary} />
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-primary">
                Unit Listings
              </h2>
              <ListingsTable listings={shown} summary={summary} />
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <PreSurveyChecklist />
              <PostDealChecklist />
            </div>

            <SimilarAreas area={area} onSelect={selectSaved} />
            <ShareableURL area={area} rental={rental} onSelect={selectSaved} />
            <FeedbackWidget />

            <p className="pt-2 text-center text-[10px] uppercase tracking-[0.2em] text-border">
              SPEEDHOME Price Intelligence
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
