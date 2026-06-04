import { NextRequest, NextResponse } from "next/server";
import { runScraper } from "@/lib/scrape";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function handle(query: string, strict: boolean) {
  if (!query.trim()) {
    return NextResponse.json(
      { ok: false, is_demo: false, error: "Missing 'query'." },
      { status: 400 },
    );
  }
  const data = await runScraper(query.trim(), strict);
  return NextResponse.json(data, { status: data.ok ? 200 : 502 });
}

/** POST /api/scrape  body: { query: "mont-kiara", strict?: boolean } */
export async function POST(req: NextRequest) {
  let query = "";
  let strict = true;
  try {
    const body = await req.json();
    query = String(body?.query ?? "");
    if (typeof body?.strict === "boolean") strict = body.strict;
  } catch {
    return NextResponse.json(
      { ok: false, is_demo: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }
  return handle(query, strict);
}

/** GET /api/scrape?query=mont-kiara&strict=true — convenience for testing. */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const strict = sp.get("strict") !== "false";
  return handle(sp.get("query") ?? "", strict);
}
