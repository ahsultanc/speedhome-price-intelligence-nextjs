"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, BarChart2, Users, ArrowLeft } from "lucide-react";
import HeroSection, { heroContainer, heroItem } from "@/components/home/HeroSection";
import SearchBar from "@/components/home/SearchBar";
import TrustSignals from "@/components/home/TrustSignals";
import PopularAreas from "@/components/home/PopularAreas";
import BudgetFilter from "@/components/home/BudgetFilter";
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
import ShareableURL from "@/components/results/ShareableURL";
import SimilarAreas from "@/components/results/SimilarAreas";
import CTASection from "@/components/results/CTASection";
import PreSurveyChecklist from "@/components/listing/PreSurveyChecklist";
import PostDealChecklist from "@/components/listing/PostDealChecklist";
import { computeMetrics, filterByRentalType } from "@/lib/utils";
import { getReferralSource } from "@/lib/utm";
import type { RentalType, ScrapeResult } from "@/lib/types";

type Status = "idle" | "loading" | "done" | "error";

// Fixed demo snapshot date for the subtle production disclaimer.
const DEMO_SNAPSHOT_DATE = "04-06-2026";

export default function HomeClient() {
  const [strict, setStrict] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ScrapeResult | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const [rental, setRental] = useState<RentalType>("monthly");
  const [lastQuery, setLastQuery] = useState("");
  const [note, setNote] = useState<string | undefined>();
  const [isReferral, setIsReferral] = useState(false);
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
    /* eslint-disable react-hooks/set-state-in-effect -- one-time URL deep-link / referral capture on mount */
    if (didDeepLink.current) return;
    didDeepLink.current = true;
    const sp = new URLSearchParams(window.location.search);
    // Capture referral source into sessionStorage so downstream CTAs are tagged.
    if (getReferralSource() === "share") {
      setIsReferral(true);
    }
    const a = sp.get("area");
    if (a) {
      if (sp.get("type") === "yearly") setRental("yearly");
      search(a);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Results replace the hero, so bring the viewport to the top — the Fair Price
  // becomes the first thing visible without scrolling.
  useEffect(() => {
    if (status === "done") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [status, result]);

  function selectSaved(a: string, r: RentalType) {
    setRental(r);
    search(a);
  }

  // Return to the hero/search view so the user is never trapped in results.
  function resetToSearch() {
    setStatus("idle");
    setResult(null);
    setErrMsg("");
    setLastQuery("");
    setNote(undefined);
    setRental("monthly");
    // Drop ?area/?ref from the URL so a later refresh stays on the search view.
    if (typeof window !== "undefined" && window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo({ top: 0 });
  }

  // Hero stays through loading (the search button shows its own spinner) and is
  // replaced only once results arrive — or on an error/empty result.
  const showHero = status === "idle" || status === "loading";

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
      {showHero && (
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
      )}

      {!showHero && (
        <div ref={resultsRef} className="mx-auto max-w-5xl px-6 py-8">
          {/* Always available so the user can return to search — never trapped. */}
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={resetToSearch}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Cari area lain
            </button>
            {status === "done" && area && (
              <span className="font-display text-lg font-semibold text-primary">{area}</span>
            )}
          </div>

          {isReferral && status === "done" && (
            <p className="mb-4 flex items-center justify-center gap-1.5 text-center text-sm text-accent">
              <Users className="h-4 w-4 shrink-0" /> Seseorang membagikan data area ini untuk
              kamu.
            </p>
          )}
          {note && status === "done" && (
            <p className="mb-6 flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm text-secondary">
              <MapPin className="h-4 w-4 shrink-0 text-navy" /> {note}
            </p>
          )}

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
            {/* Fair Price first — the answer is above the fold, no scrolling. */}
            <MetricCards metrics={metrics} area={area} heroUnit={heroUnit} heroFair={heroFair} />

            <div className="flex flex-col items-center gap-3">
              <Timestamp time={result?.meta?.scraped_at} count={inAreaCount} />
              {result?.is_demo && (
                <p className="text-center text-xs italic text-gray-400">
                  Data sampel per {DEMO_SNAPSHOT_DATE} · Live scraping tidak tersedia di
                  production
                </p>
              )}
              <SupplyIndicator count={inAreaCount} />
            </div>

            <GlobalDisclaimer />
            <AreaIntelCard area={area} />
            <p className="text-center text-sm text-secondary">
              Ini gambaran areanya. Sekarang, lihat berapa yang orang lain bayar di sini.
            </p>

            <SoWhatBox listings={monthlyListings} summary={summaryMonthly} area={area} />
            <p className="text-center text-sm text-secondary">
              Ini harga wajarnya berdasarkan {inAreaCount.toLocaleString("en-MY")} listing
              aktif hari ini. Sekarang lihat listing mana yang worth it.
            </p>

            <BudgetFilter key={area} listings={shown} fairPrice={heroFair} area={area} />

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

            <Collapsible
              label={
                <span className="flex items-center gap-1.5">
                  <BarChart2 className="h-4 w-4 text-navy" /> Lihat visualisasi harga →
                </span>
              }
            >
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
              SEWAJAR
            </p>
          </motion.div>
          )}
        </div>
      )}
    </main>
  );
}
