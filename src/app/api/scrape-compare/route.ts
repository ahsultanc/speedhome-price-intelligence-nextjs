import { NextRequest, NextResponse } from "next/server";
import { runScraper } from "@/lib/scrape";
import type { CompareResult } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function handle(areaA: string, areaB: string, strict: boolean) {
  if (!areaA.trim() || !areaB.trim()) {
    return NextResponse.json(
      { ok: false, error: "Both 'area_a' and 'area_b' are required." },
      { status: 400 },
    );
  }
  // Scrape both areas in parallel.
  const [a, b] = await Promise.all([
    runScraper(areaA.trim(), strict),
    runScraper(areaB.trim(), strict),
  ]);
  const result: CompareResult = { ok: a.ok && b.ok, area_a: a, area_b: b };
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}

/** POST /api/scrape-compare  body: { area_a, area_b, strict? } */
export async function POST(req: NextRequest) {
  let areaA = "";
  let areaB = "";
  let strict = true;
  try {
    const body = await req.json();
    areaA = String(body?.area_a ?? "");
    areaB = String(body?.area_b ?? "");
    if (typeof body?.strict === "boolean") strict = body.strict;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }
  return handle(areaA, areaB, strict);
}

/** GET /api/scrape-compare?a=klcc&b=bangsar&strict=true — convenience testing. */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  return handle(sp.get("a") ?? "", sp.get("b") ?? "", sp.get("strict") !== "false");
}
