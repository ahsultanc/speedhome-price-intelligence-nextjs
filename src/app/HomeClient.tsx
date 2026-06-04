"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HeroSection, { heroContainer, heroItem } from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import TrustSignals from "@/components/home/TrustSignals";
import PopularAreas from "@/components/home/PopularAreas";
import BudgetFilter from "@/components/home/BudgetFilter";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorState from "@/components/shared/ErrorState";
import EmptyState from "@/components/shared/EmptyState";
import Timestamp from "@/components/shared/Timestamp";
import GlobalDisclaimer from "@/components/shared/GlobalDisclaimer";
import FeedbackWidget from "@/components/shared/FeedbackWidget";
import Collapsible from "@/components/shared/Collapsible";
import MetricCards from "@/components/results/MetricCards";
import SoWhatBox from "@/components/results/SoWhatBox";
import AreaIntelCard from "@/components/results/AreaIntelCard";
import SupplyIndicator from "@/components/results/SupplyIndicator";
import PriceSummaryTable from "@/components/results/PriceSummaryTable";
import RentalTypeTabs from "@/components/results/RentalTypeTabs";
import PriceChart from "@/components/results/PriceChart";
import ListingsTable from "@/components/results/ListingsTable";
import ExcelExport from "@/components/results/ExcelExport";
import ROICalculator from "@/components/results/ROICalculator";
import ShareableURL from "@/components/results/ShareableURL";
import SimilarAreas from "@/components/results/SimilarAreas";
import CTASection from "@/components/results/CTASection";
import PreSurveyChecklist from "@/components/listing/PreSurveyChecklist";
import PostDealChecklist from "@/components/listing/PostDealChecklist";
import { computeMetrics, filterByRentalType } from "@/lib/utils";
import type { RentalType, ScrapeResult } from "@/lib/types";

type Status = "idle" | "loading" | "done" | "error";

export default function HomeClient() {
  const [strict, setStrict] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const [rental, setRental] = useState<RentalType>("monthly");
  const [lastQuery, setLastQuery] = useState("");
  const [note, setNote] = useState<string | undefined>();
  const resultsRef = useRef<HTMLDivElement>(null);

  async function search(query: string, strictArg = strict, searchNote?: string) {
    setStatus("loading");
    setResult(null);
    setErrMsg("");
    setRental("monthly");
    setLastQuery(query);
    setNote(searchNote);
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

  const didDeepLink = useRef(false);
  useEffect(() => {
    if (didDeepLink.current) return;
    didDeepLink.current = true;
    const sp = new URLSearchParams(window.location.search);
    const a = sp.get("area");
    if (a) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time URL deep-link on mount
      if (sp.get("type") === "yearly") setRental("yearly");
      search(a);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth scroll to results once loaded.
  useEffect(() => {
    if (status === "done" && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status, result]);

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
  const inAreaCount = result?.meta?.in_area_count ?? listings.length;
  const noData = status === "done" && listings.length === 0;
  const topRow = summary.length
    ? [...summary].sort((a, b) => b.Count - a.Count)[0]
    : undefined;
  const heroUnit = topRow?.["Unit Type"];
  const heroFair = topRow?.["Fair Price (RM)"] ?? metrics.fairPrice;

  return (
    <main className="flex-1">
      <motion.div variants={heroContainer} initial="hidden" animate="visible">
        <HeroSection />
        <section className="px-6">
          <motion.div variants={heroItem}>
            <TrustSignals />
          </motion.div>
          <motion.div variants={heroItem}>
            <PopularAreas onSelect={selectSaved} />
          </motion.div>
          <motion.div variants={heroItem} className="mt-8">
            <SearchBar
              onSearch={(q, n) => search(q, strict, n)}
              loading={status === "loading"}
              strict={strict}
              onStrictChange={setStrict}
            />
          </motion.div>
        </section>
      </motion.div>

      <div ref={resultsRef} className="mx-auto max-w-5xl px-6 py-12">
        {note && status === "done" && (
          <p className="mb-6 rounded-lg border border-border bg-card px-4 py-2 text-sm text-secondary">
            📍 {note}
          </p>
        )}

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
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center gap-3">
              {result?.is_demo && (
                <div className="rounded-card border border-accent/30 bg-[#FEF3C7] px-4 py-2 text-xs font-medium text-primary">
                  ⚠️ Menampilkan data sampel — scraping live sedang tidak tersedia.
                  Data akurat per {result?.meta?.scraped_at ?? "—"} MYT.
                </div>
              )}
              <Timestamp time={result?.meta?.scraped_at} count={inAreaCount} />
              <SupplyIndicator count={inAreaCount} />
            </div>

            <GlobalDisclaimer />
            <AreaIntelCard area={area} />
            <p className="text-center text-sm text-secondary">
              Ini gambaran areanya. Sekarang, lihat berapa yang orang lain bayar di sini.
            </p>

            <SoWhatBox listings={monthlyListings} summary={summaryMonthly} area={area} />
            <MetricCards metrics={metrics} area={area} heroUnit={heroUnit} heroFair={heroFair} />
            <p className="text-center text-sm text-secondary">
              Ini harga wajarnya berdasarkan {inAreaCount.toLocaleString("en-MY")} listing
              aktif hari ini. Sekarang lihat listing mana yang worth it.
            </p>

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

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-primary">
                Price Summary by Unit Type
              </h2>
              <PriceSummaryTable summary={summary} />
            </section>

            <ROICalculator fairPrice={heroFair} />

            <Collapsible label="📊 Lihat visualisasi harga →">
              <PriceChart summary={summary} />
            </Collapsible>

            <section className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-primary">
                Unit Listings
              </h2>
              <ListingsTable
                listings={shown}
                summary={summary}
                count={inAreaCount}
                area={area}
              />
            </section>

            <CTASection area={area} />

            <div className="grid gap-4 md:grid-cols-2">
              <PreSurveyChecklist />
              <PostDealChecklist />
            </div>

            <SimilarAreas area={area} />
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
