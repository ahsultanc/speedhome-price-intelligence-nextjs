import type { OverallMetrics } from "@/lib/utils";
import { formatPrice, slugifyArea } from "@/lib/utils";
import { buildSpeedhomeURL } from "@/lib/utm";

export default function VerdictBox({
  nameA,
  nameB,
  a,
  b,
  scrapedA,
  scrapedB,
}: {
  nameA: string;
  nameB: string;
  a: OverallMetrics;
  b: OverallMetrics;
  scrapedA?: string | null;
  scrapedB?: string | null;
}) {
  const lines: string[] = [];
  let cheaper = nameA;

  if (a.avg != null && b.avg != null && a.avg !== b.avg) {
    cheaper = a.avg < b.avg ? nameA : nameB;
    const diff = Math.abs(a.avg - b.avg);
    lines.push(
      `💰 ${cheaper} lebih murah ${formatPrice(diff)}/bulan = ${formatPrice(diff * 12)}/tahun lebih hemat.`,
    );
  }
  if (a.perSqft != null && b.perSqft != null && a.perSqft !== b.perSqft) {
    const better = a.perSqft < b.perSqft ? nameA : nameB;
    lines.push(`📐 ${better} menawarkan value per sqft lebih baik.`);
  }
  if (a.count && b.count && a.count !== b.count) {
    const more = a.count > b.count ? nameA : nameB;
    lines.push(
      `🏘️ ${more} punya lebih banyak pilihan (${Math.max(a.count, b.count)} vs ${Math.min(a.count, b.count)} listing).`,
    );
  }

  return (
    <div className="rounded-card bg-navy p-6 text-background">
      <h3 className="font-display text-2xl font-semibold">Verdict</h3>
      {lines.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-relaxed">
          {lines.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-background/80">
          Belum cukup data untuk menyimpulkan perbandingan.
        </p>
      )}

      <p className="mt-5 font-medium">
        Datanya sudah bicara. Sekarang tinggal cari unitnya.
      </p>
      <a
        href={buildSpeedhomeURL(slugifyArea(cheaper), "compare-verdict")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-white"
      >
        Cari Unit di {cheaper} di SPEEDHOME →
      </a>

      <p className="mt-5 border-t border-white/15 pt-3 text-xs text-background/70">
        Data — A: {scrapedA ?? "—"} · B: {scrapedB ?? "—"} MYT
      </p>
    </div>
  );
}
