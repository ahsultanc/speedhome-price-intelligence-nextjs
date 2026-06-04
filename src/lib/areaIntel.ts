/**
 * Area intelligence — verified general facts only (decision: 17 accurate areas,
 * no fabricated entries). Areas in scraper.AREAS without an entry here simply
 * don't render an AreaIntelCard. Areas covered: the 17 that have researched copy.
 */

export type Confidence = "HIGH" | "MEDIUM" | "LOW";

export interface AreaIntel {
  karakter: string;
  cocok: string;
  lifestyleDesc: string;
  highlight: string;
  character: string[];
  confidence: Confidence;
  lastUpdated: string;
}

export const AREA_INTEL: Record<string, AreaIntel> = {
  "Mont Kiara": {
    karakter: "Ekspatriat · Established",
    cocok: "Ekspatriat, keluarga, profesional",
    lifestyleDesc:
      "Tinggal di Mont Kiara artinya dikelilingi komunitas internasional dan sekolah terbaik KL.",
    highlight: "Dekat sekolah internasional, akses ke Hartamas & 1 Utama",
    character: ["premium", "tenang", "family"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  KLCC: {
    karakter: "CBD · Urban · Prestisius",
    cocok: "Profesional, ekspatriat",
    lifestyleDesc:
      "KLCC menempatkan kamu di jantung KL — dekat kantor CBD, KLCC Park, dan MRT.",
    highlight: "Akses MRT, pusat bisnis KL",
    character: ["urban", "premium"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  Bangsar: {
    karakter: "Vibrant · F&B · Creative",
    cocok: "Young professional, creative",
    lifestyleDesc:
      "Bangsar adalah rumah komunitas kreatif KL — cafe terbaik dan F&B scene ada di sini.",
    highlight: "F&B scene, komunitas expat",
    character: ["vibrant"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  "Petaling Jaya": {
    karakter: "Suburban · Family · Mature",
    cocok: "Keluarga, profesional",
    lifestyleDesc:
      "PJ menawarkan keseimbangan suburban dan akses kota — infrastruktur matang.",
    highlight: "Infrastruktur matang, banyak pilihan sekolah",
    character: ["family", "tenang"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  "Chow Kit": {
    karakter: "Urban · Diverse · Central",
    cocok: "Budget conscious, pekerja urban",
    lifestyleDesc:
      "Chow Kit menawarkan lokasi central dengan harga terjangkau dan akses LRT mudah.",
    highlight: "Akses LRT, harga terjangkau",
    character: ["urban"],
    confidence: "MEDIUM",
    lastUpdated: "Juni 2026",
  },
  "Sri Hartamas": {
    karakter: "Upscale · Quiet · Residential",
    cocok: "Keluarga, profesional senior",
    lifestyleDesc:
      "Sri Hartamas menawarkan ketenangan residential upscale dekat Mont Kiara.",
    highlight: "Quiet, dekat Mont Kiara",
    character: ["premium", "tenang"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  "Desa ParkCity": {
    karakter: "Premium · Family · Green",
    cocok: "Keluarga, ekspatriat",
    lifestyleDesc:
      "Desa ParkCity adalah township premium dengan taman dan komunitas keluarga.",
    highlight: "Central Park, komunitas premium, pet-friendly",
    character: ["premium", "family", "tenang"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  Kepong: {
    karakter: "Suburban · Affordable · Local",
    cocok: "Keluarga lokal, budget conscious",
    lifestyleDesc:
      "Kepong menawarkan kehidupan suburban terjangkau dengan komunitas lokal yang kuat.",
    highlight: "Harga terjangkau, komunitas lokal",
    character: ["family", "tenang"],
    confidence: "MEDIUM",
    lastUpdated: "Juni 2026",
  },
  "Wangsa Maju": {
    karakter: "Residential · Accessible",
    cocok: "Profesional, keluarga muda",
    lifestyleDesc:
      "Wangsa Maju adalah area residential accessible dengan LRT ke city center.",
    highlight: "Akses LRT, harga moderate",
    character: ["urban", "family"],
    confidence: "MEDIUM",
    lastUpdated: "Juni 2026",
  },
  Setapak: {
    karakter: "Affordable · Student · Urban",
    cocok: "Mahasiswa, young professional",
    lifestyleDesc:
      "Setapak menawarkan pilihan terjangkau dekat universitas dan akses ke kota.",
    highlight: "Harga terjangkau, dekat universitas",
    character: ["urban"],
    confidence: "MEDIUM",
    lastUpdated: "Juni 2026",
  },
  "Subang Jaya": {
    karakter: "Suburban · Established · F&B",
    cocok: "Keluarga, profesional",
    lifestyleDesc:
      "Subang Jaya adalah suburban matang dengan F&B scene dan mall lengkap.",
    highlight: "SS15 F&B, Sunway Pyramid, komunitas established",
    character: ["family", "vibrant"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  "Shah Alam": {
    karakter: "Administrative · Suburban",
    cocok: "Keluarga, pekerja pemerintah",
    lifestyleDesc:
      "Shah Alam adalah ibu kota Selangor yang tenang dengan infrastruktur lengkap.",
    highlight: "Harga terjangkau, akses highway baik",
    character: ["family", "tenang"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  Puchong: {
    karakter: "Suburban · Growing · Affordable",
    cocok: "Keluarga muda, first-time renter",
    lifestyleDesc:
      "Puchong adalah kawasan berkembang pesat dengan harga yang masih terjangkau.",
    highlight: "Harga terjangkau, banyak development baru",
    character: ["family"],
    confidence: "MEDIUM",
    lastUpdated: "Juni 2026",
  },
  Damansara: {
    karakter: "Upscale · Business · Central",
    cocok: "Profesional, ekspatriat",
    lifestyleDesc:
      "Damansara adalah kawasan bisnis upscale dengan akses ke semua penjuru KL.",
    highlight: "Pusat bisnis, akses highway, dining premium",
    character: ["premium", "urban"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  "Ara Damansara": {
    karakter: "Quiet · Residential · Premium",
    cocok: "Keluarga, profesional senior",
    lifestyleDesc:
      "Ara Damansara menawarkan ketenangan premium dengan akses ke Subang dan Damansara.",
    highlight: "Quiet, dekat SACC Mall, akses LRT",
    character: ["premium", "tenang", "family"],
    confidence: "MEDIUM",
    lastUpdated: "Juni 2026",
  },
  "Bukit Jalil": {
    karakter: "Sports · Growing · Accessible",
    cocok: "Young professional, keluarga muda",
    lifestyleDesc:
      "Bukit Jalil berkembang pesat di sekitar stadium nasional dan Pavilion Bukit Jalil.",
    highlight: "Pavilion Bukit Jalil, LRT, harga moderate",
    character: ["urban", "family"],
    confidence: "HIGH",
    lastUpdated: "Juni 2026",
  },
  Tropicana: {
    karakter: "Golf · Premium · Suburban",
    cocok: "Keluarga premium, ekspatriat",
    lifestyleDesc:
      "Tropicana menawarkan kehidupan premium di sekitar golf course eksklusif.",
    highlight: "Golf course, premium township, tenang",
    character: ["premium", "tenang", "family"],
    confidence: "MEDIUM",
    lastUpdated: "Juni 2026",
  },
};

export function getAreaIntel(area?: string | null): AreaIntel | null {
  if (!area) return null;
  return AREA_INTEL[area] ?? null;
}

/** Areas (by name) sharing >= 2 character tags with the given area. Max 2. */
export function similarAreas(area?: string | null): string[] {
  const base = getAreaIntel(area);
  if (!base) return [];
  const out: { name: string; overlap: number }[] = [];
  for (const [name, intel] of Object.entries(AREA_INTEL)) {
    if (name === area) continue;
    const overlap = intel.character.filter((c) => base.character.includes(c)).length;
    if (overlap >= 2) out.push({ name, overlap });
  }
  return out
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)
    .map((x) => x.name);
}
