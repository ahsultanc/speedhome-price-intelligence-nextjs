/** The 21 supported Malaysian areas — mirrors scraper.AREAS. */
export const AREAS: string[] = [
  "Mont Kiara",
  "Bangsar",
  "KLCC",
  "Petaling Jaya",
  "Chow Kit",
  "Ampang",
  "Sri Hartamas",
  "Damansara",
  "Subang Jaya",
  "Shah Alam",
  "Cyberjaya",
  "Bukit Jalil",
  "Puchong",
  "Kepong",
  "Setapak",
  "Wangsa Maju",
  "Cheras",
  "Desa ParkCity",
  "Sunway",
  "Ara Damansara",
  "Tropicana",
];

/** Areas with bundled listing data — the ones that always work, incl. on Vercel
 *  where live scraping is blocked and the app serves src/data/demoResponses.json. */
export const DEMO_AREAS = ["Mont Kiara", "KLCC", "Bangsar", "Petaling Jaya"];

export const SOURCE_REPO =
  "https://github.com/ahsultanc/speedhome-price-intelligence";

/** Unit-type display order. */
export const UNIT_TYPE_ORDER = ["Studio", "1BR", "2BR", "3BR", "4BR+"];
