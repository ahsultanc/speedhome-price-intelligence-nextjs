#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scraper_api.py — JSON bridge between the Next.js API routes and the existing
SPEEDHOME scraper. Reads an area name / URL from argv, scrapes it (with a demo
fallback when Cloudflare blocks), and prints a single JSON object to stdout.

Usage:
    python scraper_api.py "mont-kiara"
    python scraper_api.py "https://speedhome.com/rent/klcc"

Output (success):
    {"ok": true, "is_demo": false, "meta": {...},
     "listings": [...], "summary_monthly": [...], "summary_yearly": [...]}
Output (error):
    {"ok": false, "is_demo": false, "error": "message"}

NOTE: scraper.py / utils.py / demo_data.json are reused unchanged.
"""

import io
import json
import sys

# Force UTF-8 stdout/stderr (Windows consoles default to cp1252 and would choke
# on Malay addresses / emoji inside listing data).
try:
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")
except Exception:
    pass


def _err(message: str) -> None:
    print(json.dumps({"ok": False, "is_demo": False, "error": str(message)},
                     ensure_ascii=False))


def _clean(listing: dict) -> dict:
    """Drop internal-only fields before sending to the frontend."""
    return {k: v for k, v in listing.items() if not k.startswith("_")}


def _is_blocked(listings, meta) -> bool:
    """True when an empty scrape looks Cloudflare-blocked (not just empty area)."""
    dbg = (meta or {}).get("debug", {})
    return (not listings) and (
        dbg.get("challenge_detected")
        or dbg.get("http_status") not in (200, None)
        or not dbg.get("has_next_data")
    )


def main() -> None:
    if len(sys.argv) < 2 or not str(sys.argv[1]).strip():
        _err("Missing query argument. Usage: scraper_api.py <area-or-url>")
        return

    query = str(sys.argv[1]).strip()
    # Optional 2nd arg: "all" / "false" disables strict in-area filtering.
    strict = True
    if len(sys.argv) > 2 and str(sys.argv[2]).lower() in ("all", "false", "0", "nostrict"):
        strict = False

    try:
        import pandas as pd
        from scraper import (
            scrape_area,
            filter_by_area,
            filter_by_rental_type,
            load_demo_data,
        )
        from utils import build_summary
    except Exception as exc:  # import / dependency failure
        _err(f"Import error: {exc}")
        return

    try:
        listings, meta = scrape_area(query)
        is_demo = False

        # Cloudflare fallback → bundled sample data.
        if _is_blocked(listings, meta):
            demo_listings, demo_meta = load_demo_data(query)
            if demo_listings:
                listings, meta, is_demo = demo_listings, demo_meta, True

        area_term = meta.get("area_term", query)
        in_area = filter_by_area(listings, area_term)
        base = in_area if strict else listings  # listings shown depend on strict
        monthly = filter_by_rental_type(base, "monthly")
        yearly = filter_by_rental_type(base, "yearly")

        summary_monthly = build_summary(pd.DataFrame(monthly)) if monthly else pd.DataFrame()
        summary_yearly = build_summary(pd.DataFrame(yearly)) if yearly else pd.DataFrame()

        out = {
            "ok": True,
            "is_demo": bool(is_demo),
            "meta": {
                "area": meta.get("area"),
                "area_term": area_term,
                "source": "demo" if is_demo else meta.get("source"),
                "scraped_at": meta.get("scraped_at"),
                "pages_scraped": meta.get("pages_scraped"),
                "first_url": meta.get("first_url"),
                "radius_count": len(listings),
                "in_area_count": len(in_area),
            },
            "strict": strict,
            "listings": [_clean(l) for l in base],
            "summary_monthly": summary_monthly.to_dict(orient="records")
            if not summary_monthly.empty else [],
            "summary_yearly": summary_yearly.to_dict(orient="records")
            if not summary_yearly.empty else [],
        }
        print(json.dumps(out, ensure_ascii=False))
    except Exception as exc:  # any scrape/processing failure
        _err(f"Scrape failed: {exc}")


if __name__ == "__main__":
    main()
