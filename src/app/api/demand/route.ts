import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { listingId, areaSlug, fairPrice } = await req.json();

    if (!listingId || !areaSlug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const key = `demand:${areaSlug}:${listingId}`;
    const count = await redis.incr(key);

    await redis.hset(`listing:${listingId}`, {
      areaSlug,
      fairPrice: fairPrice ?? 0,
      lastUpdated: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, count });
  } catch {
    return NextResponse.json(
      { error: "Failed to record signal" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("listingId");
    const areaSlug = searchParams.get("areaSlug");

    if (!listingId || !areaSlug) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const key = `demand:${areaSlug}:${listingId}`;
    const count = await redis.get<number>(key);

    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json(
      { error: "Failed to get signal" },
      { status: 500 },
    );
  }
}
