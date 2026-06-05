import type { Metadata } from "next";
import HomeClient from "./HomeClient";

function toAreaName(area: string): string {
  return area
    .split("-")
    .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}): Promise<Metadata> {
  const { area } = await searchParams;
  if (!area) return {};

  const areaName = toAreaName(area);

  return {
    title: `Harga Sewa ${areaName} — Sewajar`,
    description: `Cek harga sewa wajar di ${areaName}. Data real-time dari SPEEDHOME. Gratis, tanpa daftar.`,
    alternates: { canonical: `/?area=${area}` },
    openGraph: {
      title: `Harga Sewa ${areaName} 2026`,
      description: `Fair Price, listing terbaik, dan perbandingan area di ${areaName} Malaysia.`,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const { area } = await searchParams;
  const areaName = area ? toAreaName(area) : null;

  // Dataset schema only when a specific area is requested. No hardcoded prices —
  // general description only, so it stays accurate as the underlying data changes.
  const datasetLd = areaName
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: `Data Harga Sewa ${areaName}`,
        description: `Data harga sewa properti di ${areaName} Malaysia, termasuk harga wajar dan analisis per tipe unit.`,
        creator: {
          "@type": "Organization",
          name: "Sewajar by Jendela Group",
        },
        inLanguage: "id-ID",
      }
    : null;

  return (
    <>
      {datasetLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
        />
      )}
      <HomeClient />
    </>
  );
}
