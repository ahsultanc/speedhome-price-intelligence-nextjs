import "server-only";
import { spawn } from "node:child_process";
import path from "node:path";
import type { ScrapeResult } from "@/lib/types";
import demoResponses from "@/data/demoResponses.json";

const DEMO = demoResponses as unknown as Record<string, ScrapeResult>;

/** Normalised demo key — matches python demo_key (area name or /rent/<slug>). */
function deriveKey(query: string): string {
  let area = query;
  const m = query.match(/\/rent\/([^/?#]+)/i);
  if (m) area = m[1].replace(/-/g, " ");
  return area.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/** Bundled demo response (used in production / when Python is unavailable). */
function demoFor(query: string): ScrapeResult {
  const r = DEMO[deriveKey(query)];
  if (r) return r;
  return {
    ok: true,
    is_demo: true,
    meta: {
      area: query,
      area_term: query,
      source: "demo",
      scraped_at: null,
      pages_scraped: null,
      first_url: null,
      radius_count: 0,
      in_area_count: 0,
    },
    listings: [],
    summary_monthly: [],
    summary_yearly: [],
  };
}

/**
 * Spawn the Python scraper bridge and parse its JSON stdout.
 *
 * DEMO-ONLY in production: Vercel's Node runtime has no Python, so when running
 * on Vercel (or DEMO_ONLY=1) we serve bundled demo data directly. Locally we run
 * the real scraper and fall back to demo data only if the spawn fails.
 */
export function runScraper(query: string, strict = true): Promise<ScrapeResult> {
  if (process.env.VERCEL || process.env.DEMO_ONLY === "1") {
    return Promise.resolve(demoFor(query));
  }

  return new Promise((resolve) => {
    const script = path.join(process.cwd(), "python", "scraper_api.py");
    const pyBin = process.env.PYTHON_BIN || "python";

    let stdout = "";
    let stderr = "";

    let child;
    try {
      child = spawn(pyBin, [script, query, strict ? "strict" : "all"], {
        cwd: process.cwd(),
      });
    } catch {
      resolve(demoFor(query));
      return;
    }

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));
    child.on("error", () => resolve(demoFor(query)));
    child.on("close", () => {
      const text = stdout.trim();
      try {
        const parsed = JSON.parse(text) as ScrapeResult;
        if (!parsed.ok) {
          resolve(demoFor(query));
          return;
        }
        resolve(parsed);
      } catch {
        // Bad/empty output (e.g. no Python) → fall back to demo.
        void stderr;
        resolve(demoFor(query));
      }
    });
  });
}
