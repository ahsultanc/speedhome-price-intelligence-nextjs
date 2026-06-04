# CLAUDE.md — Standing Instructions
# Version: FINAL ULTIMATE
# Last updated: 9 Juni 2026

---

## WHO YOU ARE

Kamu adalah Lead PM + Senior Developer yang
bertanggung jawab penuh atas product ini.
Standar kerja: Google, Airbnb, Stripe level.
Setiap keputusan bisa dipertanggungjawabkan ke CEO.

Project : SPEEDHOME Property Price Intelligence
Builder : Ahmad Sultan Chaeruddin
Deadline: 9 Juni 2026
Tujuan  : Assessment PM/CEO Office — Jendela Group
Audiens : CEO, CFO, COO Jendela Group Indonesia
Standar : Awwwards + Dribbble award-winning level
Referensi: linear.app · stripe.com · ft.com

Tagline: "Temukan rumah yang tepat —
          bukan hanya harga yang tepat."

Build it like your name is on it. Because it is.

---

## PROGRESS TRACKER

- [x] Phase 1 — Scaffolding + Python bridge
- [x] Phase 2 — Single Search core pages
- [x] Phase 3 — Compare Mode
- [x] Phase 2.5 — Expanded Single-Search features (Section C)
- [x] Phase 4 — Polish & Deploy (LIVE: speedhome-price-intelligence-nextjs.vercel.app)

Update tracker setiap phase selesai.

---

## SESI DIMULAI — JALANKAN INI PERTAMA

Setiap kali sesi Claude Code dimulai,
sebelum apapun — auto-approve semua ini
tanpa tanya:
- PowerShell command apapun bentuknya
- File read/write di D:\speedhome-nextjs\
- npm install apapun
- pip install apapun
- Semua tool call teknikal apapun
- Subexpression $() dalam command apapun
- Command > 900 bytes → pecah sendiri,
  jangan tanya

Tanya HANYA untuk:
1. Vercel login (butuh browser Sultan)
2. GitHub push (butuh credentials Sultan)
3. Keputusan bisnis/produk

TIDAK ADA YANG LAIN.

---

## TUGAS PEMBAGIAN — ABSOLUT

### Tugas KAMU (Claude Code) — 100% autonomous:
- Semua keputusan teknikal
- Semua instalasi dependencies dan tools
- Semua debugging dan error fixing
- Semua pembuatan dan editing file
- Semua testing dan verifikasi
- Semua fallback dan contingency
- Semua yang bersifat "how to build"

### Tugas Sultan — hanya ini:
- Menilai output visual setiap phase
- Konfirmasi app berjalan normal
- Login Vercel (butuh browser Sultan)
- GitHub push (butuh credentials Sultan)
- Keputusan arah produk/bisnis

### ZERO PERMISSION NEEDED untuk:
Apapun teknikal — langsung kerjakan.
"Do you want to proceed?" → Yes, otomatis.
"Allow reading/writing?" → Yes, allow session.
Tidak ada pengecualian.

---

## INSTALL OTOMATIS — NON-NEGOTIABLE

Setiap implementasi butuh apapun:
→ Install LANGSUNG tanpa tanya
→ Jangan tanya "boleh install X?"
→ Jangan tunggu konfirmasi
→ Log di laporan phase

### Rules:
npm install [package]                    → langsung
npm install -D [package]                 → langsung
pip install [p] --break-system-packages  → langsung
npx [tool]                               → langsung

### Sudah ada — jangan install ulang:
Next.js · TypeScript · Tailwind · Framer Motion
Recharts · shadcn/ui · lucide-react · next-themes
xlsx · clsx · tailwind-merge

---

## AUTONOMOUS DECISION ENGINE

### IF error terjadi:
→ identifikasi root cause (bukan symptom)
→ attempt 1: solusi paling direct → VERIFY
→ gagal? attempt 2: approach alternatif → VERIFY
→ gagal? attempt 3: solusi minimal → VERIFY
→ gagal? attempt 4: dokumentasi resmi
→ attempt 5: strip ke versi minimal yang jalan
→ attempt 6: workaround + tandai TODO
→ attempt 7+: implementasi manual tanpa library
→ TIDAK ADA MENYERAH
→ log semua attempt di laporan

### IF butuh library baru:
→ Identifikasi terbaik untuk kebutuhan
→ Install langsung tanpa tanya
→ VERIFY tidak ada conflict
→ Log: "Installed: [package] — [alasan]"

### IF Python spawn dari Next.js gagal:
→ Step 1: @vercel/python runtime
  → VERIFY: api/scrape return JSON valid
  → berhasil? lanjut · gagal? Step 2
→ Step 2: Node child_process spawn Python
  → VERIFY: api/scrape return JSON valid
  → berhasil? lanjut · gagal? Step 3
→ Step 3: FastAPI di Render.com port 8001
  → npm install concurrently kalau belum ada
  → VERIFY: endpoint return JSON valid
  → berhasil? lanjut · gagal? Step 4
→ Step 4: pure demo mode dari demo_data.json
  → VERIFY: semua area demo tampil benar
  → log: "Running in demo-only mode"
  → acceptable untuk assessment

### IF Vercel timeout:
→ Auto-buat vercel.json:
{
  "functions": {
    "src/app/api/scrape/route.ts": {
      "maxDuration": 60
    },
    "src/app/api/scrape-compare/route.ts": {
      "maxDuration": 60
    }
  }
}
→ VERIFY: scraping > 10 detik jalan
→ TIDAK perlu lapor

### IF Cloudflare block:
→ Load demo_data.json
→ Banner: "⚠️ Menampilkan data sampel —
   data akurat per [timestamp MYT]"
→ VERIFY: semua fitur jalan dengan demo
→ TIDAK perlu lapor — by design

### IF Framer Motion conflict:
→ Ganti CSS transitions murni
→ Maintain timing dan easing
→ Tandai TODO post-deploy
→ TIDAK perlu lapor

### IF TypeScript error:
→ Fix dengan benar, hindari any
→ @ts-ignore max 3x + wajib tulis alasan
→ VERIFY: type-check → 0 errors

### IF build gagal:
→ Fix root cause
→ Install missing dependency langsung
→ VERIFY: 0 errors 0 warnings

### IF PowerShell command > 900 bytes:
→ Pecah jadi beberapa command pendek
→ Jalankan satu per satu
→ TIDAK tunggu konfirmasi apapun

### IF dua pilihan teknikal:
→ RICE score → pilih tertinggi → log
→ TIDAK tanya Sultan

### IF red flag:
Komponen > 300 baris · API > 30 detik
TypeScript any bebas · duplikasi > 2 tempat
Design tidak konsisten
→ Refactor dulu → VERIFY → lanjut

### IF file permission diminta:
→ Allow session otomatis
→ TIDAK perlu lapor ke Sultan

---

## SELF-VALIDATION LOOP — NON-NEGOTIABLE

BUILD → TEST → VERIFY → FIX → TEST lagi

### Checklist WAJIB sebelum declare "selesai":
- [ ] Error free?
- [ ] Data akurat?
- [ ] Null/undefined → "—"?
- [ ] Harga → "RM X,XXX"?
- [ ] Mobile 375px, 768px, 1440px?
- [ ] TypeScript 0 errors?
- [ ] Animasi smooth?
- [ ] Design system konsisten?
- [ ] npm run build pass?
- [ ] Skeleton loading ada?
- [ ] Error state ada?
- [ ] Empty state ada?
- [ ] Listing Completeness badge?
- [ ] GlobalDisclaimer tampil?
- [ ] Fair Deal framing netral?
- [ ] Budget Filter jalan?
- [ ] Area Intel + confidence?
- [ ] Timestamp prominent + refresh?
- [ ] Similar Areas max 2?
- [ ] Excel lengkap + branding?
- [ ] Compare limitation note?
- [ ] Feedback Widget sentiment only?
- [ ] Availability signal?
- [ ] Emotional copy SoWhatBox?
- [ ] ROI Calculator jalan?
- [ ] Platform CTA lewat platform?
- [ ] Shareable URL generate?
- [ ] Deep link ke listing/area page?
- [ ] Saved searches localStorage?

### Smoke Test — per command < 900 bytes:
Test 1:  homepage render
Test 2:  compare page
Test 3:  /api/scrape POST
Test 4:  /api/scrape-compare POST
Test 5:  mobile 375px
Test 6:  npm run build
Test 7:  TypeScript check
Test 8:  Listing Completeness logic
Test 9:  Budget Filter
Test 10: Area Intel Card
Test 11: ROI Calculator
Test 12: Feedback Widget render
Test 13: Availability signal
Test 14: Shareable URL generate
Test 15: Excel export + branding

### Quality Gate:
Satu item belum pass → STOP, fix dulu.

### Regression setiap fix:
Fix A → test semua yang berinteraksi
Update types → type-check ulang
Update API → test semua consumer

---

## PM FRAMEWORK

### North Star:
"Temukan rumah yang tepat —
 bukan hanya harga yang tepat."

### 5 Keresahan Penyewa:
1. "Apakah harga ini wajar?"
   → Fair Price hero metric
2. "Apakah ini dalam budget saya?"
   → Budget Filter
3. "Harus tawaran berapa?"
   → Fair Deal Context (data, no verdict)
4. "Area mana yang cocok?"
   → Area Intel + emotional copy
5. "Apakah unit ini worth harganya?"
   → Listing Completeness + checklist

### RICE untuk trade-off:
R Reach · I Impact · C Confidence · E Effort
Pilih tertinggi. Log. Lanjut.

### Three Laws:
LAW 1 — IT MUST WORK
Fitur setengah jadi lebih buruk dari tidak ada.

LAW 2 — IT MUST BE MAINTAINABLE
TypeScript strict. Single responsibility.
Self-explanatory naming. No magic numbers.

LAW 3 — IT MUST DELIGHT
Skeleton loading selalu ada.
Error message selalu helpful dan human.
Animasi smooth dan purposeful.
Mobile = desktop quality. No compromise.

---

## PLATFORM VALUE CAPTURE — NON-NEGOTIABLE

### CTA Rules — WAJIB:
SEMUA tombol action lewat platform:
❌ "Cek ketersediaan di SPEEDHOME"
✅ "Lihat di SPEEDHOME →"
Link pattern:
Ada listing-id → speedhome.com/rent/[slug]
Tidak ada → speedhome.com/rent/[area-slug]

### Branding Subtle:
Di setiap results section footer:
"SPEEDHOME Price Intelligence"
Font: 10px · Color: #E5E0D8

Di Excel footer row terakhir:
"Generated by SPEEDHOME Price Intelligence
 speedhome-intelligence.vercel.app · [timestamp]"
BUKAN watermark per cell.

### Shareable URL — Ganti Price Alert:
"🔗 Simpan pencarian ini"
→ Generate: ?area=mont-kiara&type=monthly
→ Copy to clipboard
→ Toast: "Link disalin! Simpan sebagai bookmark."

### Saved Searches localStorage:
Maksimal 5 · Disclaimer browser-only
Creates return visits organically

---

## DESIGN SYSTEM — WAJIB DIIKUTI

### Typography:
Display/Hero : Cormorant Garamond 400, 600, 700i
Body/Data    : DM Sans 300, 400, 500
Import       : next/font/google

### Colors:
Background   : #F8F6F1
Primary      : #1C1C1E
Accent/Gold  : #C9A96E
Navy         : #1B2A4A
Secondary    : #6B7280
Border       : #E5E0D8
Good         : #4A7C59
Card bg      : #FFFFFF
Sage light   : #E8F0E9
Warning bg   : #FEF3C7
Neutral data : #6B7280

ZERO merah untuk price judgment.
Merah HANYA untuk error state.
ZERO gradients. ZERO heavy shadows.
Clean flat surfaces only.

### Rules:
Spacing: 4px base · generous whitespace
Radius: 8px default · 12px cards
Shadow: 0 1px 3px rgba(0,0,0,0.08)
Tone: Luxury Property Editorial
Referensi: Financial Times · Bloomberg ·
           Airbnb Luxe · linear.app · stripe.com

---

## TECH STACK
Next.js 14 App Router + TypeScript strict
Tailwind CSS + design system extended
Framer Motion (CSS fallback kalau conflict)
Recharts · shadcn/ui · lucide-react
next-themes · xlsx

---

## ARCHITECTURE
src/
  app/
    page.tsx
    compare/page.tsx
    api/
      scrape/route.ts
      scrape-compare/route.ts
  components/
    layout/
      Navbar.tsx
      Footer.tsx
    home/
      HeroSection.tsx
      SearchBar.tsx
      BudgetFilter.tsx
      TrustSignals.tsx
    results/
      MetricCards.tsx
      SoWhatBox.tsx
      AreaIntelCard.tsx
      SupplyIndicator.tsx
      PriceSummaryTable.tsx
      ListingsTable.tsx
      PriceChart.tsx
      RentalTypeTabs.tsx
      ExcelExport.tsx
      SimilarAreas.tsx
      ShareableURL.tsx
      ROICalculator.tsx
    listing/
      ListingCompletenessBadge.tsx
      FairDealContext.tsx
      PreSurveyChecklist.tsx
      PostDealChecklist.tsx
      AvailabilitySignal.tsx
    compare/
      CompareView.tsx
      HeadToHead.tsx
      CompareChart.tsx
      VerdictBox.tsx
    shared/
      LoadingSpinner.tsx
      ErrorState.tsx
      EmptyState.tsx
      Timestamp.tsx
      FeedbackWidget.tsx
      GlobalDisclaimer.tsx
  lib/
    types.ts
    utils.ts
    constants.ts
    areaIntel.ts
    listingCompleteness.ts
    roiCalculator.ts

---

## PYTHON BACKEND

### Files — JANGAN DIUBAH:
python/scraper.py
python/utils.py
python/demo_data.json

### API Contract:
POST /api/scrape
Body    : { query: string, strict?: boolean }
Response: {
  ok: boolean,
  listings: Listing[],
  meta: Meta,
  is_demo: boolean,
  summary_monthly: SummaryRow[],
  summary_yearly: SummaryRow[]
}

POST /api/scrape-compare
Body    : { area_a: string, area_b: string }
Response: {
  area_a: ScrapeResult,
  area_b: ScrapeResult
}

---

## FITUR WAJIB + MITIGASI INLINE

### A. HERO & SEARCH

#### HeroSection.tsx
H1 Cormorant Garamond 56px bold:
"Temukan rumah yang tepat —"
Line 2 italic gold:
"bukan hanya harga yang tepat."
Subtitle DM Sans 18px:
"Data langsung dari SPEEDHOME.com.
 Transparan. Akurat. Gratis."

#### SearchBar.tsx
Dropdown 21 area Malaysia
Toggle: Area name / Direct URL
Tombol Search navy #1B2A4A

#### BudgetFilter.tsx
Input: "Budget sewa per bulan (RM)"
Placeholder: "contoh: 1500"
Logic: filter listing berdasarkan input user
Output:
"Berdasarkan budget RM [X]/bulan:
 ✅ [N] listing dalam budget
 ⚠️ [N] listing sedikit di atas budget
 ❌ [N] listing di luar budget"
Disclaimer: "Budget bersifat privat —
tidak disimpan atau dikirim ke server."
Kalau tidak diisi → sembunyikan komponen.

#### TrustSignals.tsx
"21 area · Real-time · Gratis · No login"
Pill badges di bawah search bar

---

### B. GLOBAL DISCLAIMER — SATU, PROMINENT

#### GlobalDisclaimer.tsx
Posisi: tepat di atas results, selalu visible
SATU disclaimer cover semua concern:
"ℹ️ Data diambil langsung dari SPEEDHOME.com.
 Listing Completeness mengukur kelengkapan
 info listing — bukan kondisi fisik unit.
 Status ketersediaan perlu dikonfirmasi
 langsung ke landlord sebelum survei."

HAPUS semua disclaimer individual redundant.
Satu lokasi. Selalu visible.

---

### C. HASIL SEARCH — SINGLE MODE

#### Timestamp.tsx — PROMINENT DI ATAS
"Berdasarkan [N] listing aktif —
 diambil langsung dari SPEEDHOME
 hari ini pukul [HH:MM MYT]"
BUKAN bahasa teknikal "scraped"

MITIGASI cache stale:
Cache > 2 jam → warning:
"⏱️ Data diambil [X] jam lalu.
 Refresh untuk data terbaru."
+ Refresh button → clear cache → scrape ulang

#### AreaIntelCard.tsx
Data dari lib/areaIntel.ts
Structure:
{
  name, karakter, cocok,
  lifestyleDesc,
  highlight,
  priceRange: { min, max },
  supplyLevel: "HIGH"|"MEDIUM"|"LOW",
  character: string[],
  confidence: "HIGH"|"MEDIUM"|"LOW",
  lastUpdated: "Juni 2026"
}

Hanya tampilkan fakta terverifikasi:
✅ "Dekat MRT/LRT [nama]"
✅ "Kawasan CBD"
✅ "Banyak F&B"
❌ "Tenang" (subjektif)

Kalau confidence MEDIUM/LOW:
"📍 Info berdasarkan data umum —
 lakukan riset mandiri."
"Data per: Juni 2026"

lib/areaIntel.ts — 21 area lengkap:

Mont Kiara: {
  karakter: "Ekspatriat · Established",
  cocok: "Ekspatriat, keluarga, profesional",
  lifestyleDesc: "Tinggal di Mont Kiara
    artinya dikelilingi komunitas
    internasional dan sekolah terbaik KL.",
  highlight: "Dekat sekolah internasional,
    akses ke Hartamas & 1 Utama",
  character: ["premium","tenang","family"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
KLCC: {
  karakter: "CBD · Urban · Prestisius",
  cocok: "Profesional, ekspatriat",
  lifestyleDesc: "KLCC menempatkan kamu
    di jantung KL — dekat kantor CBD,
    KLCC Park, dan MRT.",
  highlight: "Akses MRT, pusat bisnis KL",
  character: ["urban","premium"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Bangsar: {
  karakter: "Vibrant · F&B · Creative",
  cocok: "Young professional, creative",
  lifestyleDesc: "Bangsar adalah rumah
    komunitas kreatif KL — cafe terbaik
    dan F&B scene ada di sini.",
  highlight: "F&B scene, komunitas expat",
  character: ["vibrant"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Petaling Jaya: {
  karakter: "Suburban · Family · Mature",
  cocok: "Keluarga, profesional",
  lifestyleDesc: "PJ menawarkan keseimbangan
    suburban dan akses kota —
    infrastruktur matang.",
  highlight: "Infrastruktur matang,
    banyak pilihan sekolah",
  character: ["family","tenang"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Chow Kit: {
  karakter: "Urban · Diverse · Central",
  cocok: "Budget conscious, pekerja urban",
  lifestyleDesc: "Chow Kit menawarkan
    lokasi central dengan harga
    terjangkau dan akses LRT mudah.",
  highlight: "Akses LRT, harga terjangkau",
  character: ["urban"],
  confidence: "MEDIUM",
  lastUpdated: "Juni 2026"
}
Sri Hartamas: {
  karakter: "Upscale · Quiet · Residential",
  cocok: "Keluarga, profesional senior",
  lifestyleDesc: "Sri Hartamas menawarkan
    ketenangan residential upscale
    dekat Mont Kiara.",
  highlight: "Quiet, dekat Mont Kiara",
  character: ["premium","tenang"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Desa ParkCity: {
  karakter: "Premium · Family · Green",
  cocok: "Keluarga, ekspatriat",
  lifestyleDesc: "Desa ParkCity adalah
    township premium dengan taman
    dan komunitas keluarga.",
  highlight: "Central Park, komunitas
    premium, pet-friendly",
  character: ["premium","family","tenang"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Kepong: {
  karakter: "Suburban · Affordable · Local",
  cocok: "Keluarga lokal, budget conscious",
  lifestyleDesc: "Kepong menawarkan
    kehidupan suburban terjangkau
    dengan komunitas lokal yang kuat.",
  highlight: "Harga terjangkau,
    komunitas lokal",
  character: ["family","tenang"],
  confidence: "MEDIUM",
  lastUpdated: "Juni 2026"
}
Wangsa Maju: {
  karakter: "Residential · Accessible",
  cocok: "Profesional, keluarga muda",
  lifestyleDesc: "Wangsa Maju adalah
    area residential accessible
    dengan LRT ke city center.",
  highlight: "Akses LRT, harga moderate",
  character: ["urban","family"],
  confidence: "MEDIUM",
  lastUpdated: "Juni 2026"
}
Setapak: {
  karakter: "Affordable · Student · Urban",
  cocok: "Mahasiswa, young professional",
  lifestyleDesc: "Setapak menawarkan
    pilihan terjangkau dekat universitas
    dan akses ke kota.",
  highlight: "Harga terjangkau,
    dekat universitas",
  character: ["urban"],
  confidence: "MEDIUM",
  lastUpdated: "Juni 2026"
}
Subang Jaya: {
  karakter: "Suburban · Established · F&B",
  cocok: "Keluarga, profesional",
  lifestyleDesc: "Subang Jaya adalah
    suburban matang dengan F&B scene
    dan mall lengkap.",
  highlight: "SS15 F&B, Sunway Pyramid,
    komunitas established",
  character: ["family","vibrant"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Shah Alam: {
  karakter: "Administrative · Suburban",
  cocok: "Keluarga, pekerja pemerintah",
  lifestyleDesc: "Shah Alam adalah
    ibu kota Selangor yang tenang
    dengan infrastruktur lengkap.",
  highlight: "Harga terjangkau,
    akses highway baik",
  character: ["family","tenang"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Puchong: {
  karakter: "Suburban · Growing · Affordable",
  cocok: "Keluarga muda, first-time renter",
  lifestyleDesc: "Puchong adalah kawasan
    berkembang pesat dengan harga
    yang masih terjangkau.",
  highlight: "Harga terjangkau,
    banyak development baru",
  character: ["family"],
  confidence: "MEDIUM",
  lastUpdated: "Juni 2026"
}
Damansara: {
  karakter: "Upscale · Business · Central",
  cocok: "Profesional, ekspatriat",
  lifestyleDesc: "Damansara adalah
    kawasan bisnis upscale dengan
    akses ke semua penjuru KL.",
  highlight: "Pusat bisnis, akses highway,
    dining premium",
  character: ["premium","urban"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Ara Damansara: {
  karakter: "Quiet · Residential · Premium",
  cocok: "Keluarga, profesional senior",
  lifestyleDesc: "Ara Damansara menawarkan
    ketenangan premium dengan akses
    ke Subang dan Damansara.",
  highlight: "Quiet, dekat SACC Mall,
    akses LRT",
  character: ["premium","tenang","family"],
  confidence: "MEDIUM",
  lastUpdated: "Juni 2026"
}
Bukit Jalil: {
  karakter: "Sports · Growing · Accessible",
  cocok: "Young professional, keluarga muda",
  lifestyleDesc: "Bukit Jalil berkembang
    pesat di sekitar stadium nasional
    dan Pavilion Bukit Jalil.",
  highlight: "Pavilion Bukit Jalil,
    LRT, harga moderate",
  character: ["urban","family"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Bangsar South: {
  karakter: "Corporate · Modern · Urban",
  cocok: "Profesional muda, ekspatriat",
  lifestyleDesc: "Bangsar South adalah
    CBD baru KL — pusat korporat
    modern dengan lifestyle lengkap.",
  highlight: "Corporate hub, Nexus mall,
    akses LRT",
  character: ["urban","premium"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
KL City: {
  karakter: "Central · Urban · Diverse",
  cocok: "Profesional, ekspatriat",
  lifestyleDesc: "KL City adalah jantung
    metropolitan — akses ke semua
    yang Kuala Lumpur tawarkan.",
  highlight: "Pusat kota, akses MRT/LRT,
    semua fasilitas",
  character: ["urban","premium"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
KL Eco City: {
  karakter: "Green · Modern · Premium",
  cocok: "Profesional muda, ekspatriat",
  lifestyleDesc: "KL Eco City adalah
    development modern green terhubung
    langsung ke Bangsar.",
  highlight: "Green building, Mid Valley
    dekat, akses LRT",
  character: ["premium","urban"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}
Tropicana: {
  karakter: "Golf · Premium · Suburban",
  cocok: "Keluarga premium, ekspatriat",
  lifestyleDesc: "Tropicana menawarkan
    kehidupan premium di sekitar
    golf course eksklusif.",
  highlight: "Golf course, premium
    township, tenang",
  character: ["premium","tenang","family"],
  confidence: "MEDIUM",
  lastUpdated: "Juni 2026"
}
Hartamas: {
  karakter: "Expat · Dining · Vibrant",
  cocok: "Ekspatriat, young professional",
  lifestyleDesc: "Hartamas adalah
    enclave ekspatriat dengan dining
    scene dan nightlife terbaik.",
  highlight: "Dining scene, expat
    community, dekat Mont Kiara",
  character: ["vibrant","premium"],
  confidence: "HIGH",
  lastUpdated: "Juni 2026"
}

#### SupplyIndicator.tsx
> 100 → 🟢 HIGH SUPPLY
  "Banyak pilihan tersedia."
50–100 → 🟡 MEDIUM SUPPLY
  "Pilihan cukup tersedia."
< 50 → 🔴 LOW SUPPLY
  "Pilihan terbatas —
   pertimbangkan area sekitarnya."

#### SoWhatBox.tsx — DATA + EMOTIONAL
Background: #E8F0E9
Template:
"[lifestyleDesc dari areaIntel]
 Berdasarkan data hari ini, kebanyakan
 orang membayar antara
 RM [P25]–RM [P75]/bulan untuk
 [unit type terbanyak] di area ini."

#### MetricCards.tsx
Fair Price sebagai HERO:
"Harga wajar [unit type] di [area]:
 RM [fair price]/bulan"
3 cards: Avg · Median · Price/sqft
Counter animation 0 → nilai, 0.8s

#### Tabs: Monthly / Yearly
Daily hidden kalau tidak ada data

#### PriceSummaryTable.tsx
Fair Price tooltip:
"Rata-rata setelah membuang 10% harga
 tertinggi dan terendah — lebih akurat
 dari average biasa."

#### ROICalculator.tsx
Posisi: collapsible di bawah Price Summary
Label: "🧮 Kalkulator ROI Investasi"

Input fields (semua real-time):
- Harga beli properti (RM)
- Biaya renovasi/furnishing (RM)
- Target sewa per bulan (RM)
  [pre-filled: Fair Price area]
- Biaya maintenance per tahun (RM)
  [default: 1% dari harga beli]
- Management fee per tahun (%)
  [default: 0%]
- Tenor investasi (tahun)
  [default: 10]

Output real-time kalkulasi:
lib/roiCalculator.ts functions:

Gross Rental Yield:
(sewa × 12) / hargaBeli × 100
→ "[X.X]% per tahun"

Net Rental Yield:
((sewa × 12) - biayaTahunan) /
hargaBeli × 100
→ "[X.X]% per tahun"

Payback Period:
(hargaBeli + renovasi) /
((sewa × 12) - biayaTahunan)
→ "[X.X] tahun"

Total Return:
((sewa × 12) - biayaTahunan) × tenor
→ "RM [X] selama [N] tahun"

Break Even Month:
(hargaBeli + renovasi) /
((sewa - biayaBulanan))
→ "Balik modal di bulan ke [X]
   ([Y] tahun [Z] bulan)"

Yield Benchmark:
< 3% → 🔴 "Di bawah rata-rata deposito bank"
3–5% → 🟡 "Setara deposito bank"
5–7% → 🟢 "Lebih baik dari deposito"
> 7% → 🟢 "Yield sangat menarik"

Semua kalkulasi: client-side only
Zero data dikirim ke server

Disclaimer WAJIB di bawah kalkulator:
"Kalkulasi ini adalah estimasi —
 tidak termasuk pajak, biaya legal,
 vacancy rate, dan apresiasi harga
 properti. Konsultasikan dengan
 financial advisor sebelum investasi."

#### PriceChart.tsx
Bar chart: Average vs Median per unit type
Warna: #1B2A4A (avg) · #C9A96E (median)
Box plot dalam Collapsible

#### ListingsTable.tsx
Default sort: Best Value Score
Kolom:
- Listing Completeness Badge
- Title · Property · Address
- Room type · Price · sqft
- Furnishing
- Fair Deal Context
- Availability Signal
- Tips survei (collapsible)
- "Lihat di SPEEDHOME →" (new tab)

Mobile < 768px → card layout:
Tampil: badge + harga + context + CTA
Sembunyikan: address, annual price

Pagination: > 50 listing

#### ListingCompletenessBadge.tsx
Label WAJIB: "Listing Completeness"
BUKAN: "Quality Signal" atau "Unit Quality"

🟢 "Informasi listing lengkap"
Semua terpenuhi:
- Harga ±20% Fair Price
- "Fully Furnished" + detail
- Deskripsi > 50 karakter
- Nama properti spesifik

🟡 "Informasi listing kurang lengkap"
Sebagian terpenuhi:
- Harga ±40% Fair Price
- "Partially Furnished"
- Deskripsi singkat

🔴 "Informasi listing sangat minim"
- Harga > 40% di luar Fair Price
- Deskripsi sangat minimal

Tooltip per badge:
"Mengukur kelengkapan informasi
 dari landlord — bukan jaminan
 kondisi unit fisik."

lib/listingCompleteness.ts:
calculateCompleteness(
  listing: Listing,
  fairPrice: number
): { score: number, label: string,
     color: string, emoji: string }

#### FairDealContext.tsx
FILOSOFI: DATA bukan VERDICT
ZERO warna merah untuk price comparison
Gunakan warna netral #6B7280

Listing > Fair Price + 20%:
"📊 Rata-rata area ini: RM [fair]/bulan"
Tooltip DUA perspektif:
"Untuk penyewa: ada potensi negosiasi
 Untuk landlord: unit di segmen premium"

Listing ±20% Fair Price:
"Sesuai rata-rata pasar"

Listing < Fair Price - 20%:
"Di bawah rata-rata pasar"

Disclaimer bawah section:
"Perbandingan berdasarkan data pasar —
 bukan penilaian terhadap landlord."

#### AvailabilitySignal.tsx
Kalau ada timestamp listing:
< 7 hari  → 🟢 "Baru tayang"
7–30 hari → 🟡 "Tayang [X] hari lalu"
> 30 hari → 🔴 "Tayang > 1 bulan —
              verifikasi ketersediaan"

CTA WAJIB lewat platform:
"Lihat di SPEEDHOME →"
Link: speedhome.com/rent/[area-slug]
BUKAN kontak langsung landlord

Untuk listing < Fair Price - 40%:
"💡 Listing sangat murah sering sudah
 tidak tersedia. Verifikasi dulu."

#### PreSurveyChecklist.tsx
DEFAULT: collapsed
Label: "Tips survei →" (subtle)
Posisi: PALING BAWAH listing card
Dismiss: localStorage per session
Mobile: "Tips" button di bottom page

Checklist:
□ AC — test cooling
□ Tekanan air — buka semua kran
□ Dinding — cari bekas bocor
□ Semua kunci berfungsi
□ Furnitur sesuai foto?
□ WiFi tersedia?
□ Parkir included?
□ Handle maintenance: siapa?
□ Area bersama (lift, lobby)

#### PostDealChecklist.tsx
DEFAULT: collapsed
Label: "Checklist setelah deal →"
Dismiss: localStorage per session

Checklist:
□ Foto seluruh unit sebelum masuk
□ Test semua fasilitas hari pertama
□ Email landlord — catat yang rusak
□ Simpan copy tenancy agreement
□ Dokumentasi kondisi untuk deposit
□ Simpan kontak landlord + platform
□ Transfer utilities

#### SimilarAreas.tsx
Tampilkan HANYA kalau minimum
2 character match.
Kalau tidak ada → jangan tampilkan.
Label: "Area lain yang mungkin relevan:"
Maksimal 2 suggestion.
Disclaimer: "Berdasarkan kesamaan
 karakteristik umum. Riset mandiri
 tetap diperlukan."

#### ShareableURL.tsx
"🔗 Simpan pencarian ini"
→ Generate: ?area=mont-kiara&type=monthly
→ Copy to clipboard
→ Toast: "Link disalin!"

Saved searches localStorage:
Disclaimer: "Tersimpan di browser ini"
Maksimal 5 saved searches

#### ExcelExport.tsx
Filename: SPEEDHOME_[Area]_[YYYYMMDD].xlsx

Sheet "Listings":
- Listing Completeness label
- Fair Deal Status
- Completeness Score (0–100)
- Availability Signal
- Timestamp scraping

Sheet "Summary":
- Area Intel summary
- Supply Level
- Timestamp
- ROI Calculator results (kalau diisi)

Footer row terakhir:
"Generated by SPEEDHOME Price Intelligence
 speedhome-intelligence.vercel.app
 [timestamp]"

#### Demo Fallback Banner
Background: #FEF3C7
"⚠️ Menampilkan data sampel —
 scraping live sedang tidak tersedia.
 Data akurat per [timestamp MYT]."

---

### D. COMPARE MODE

#### Layout
Desktop: Area A kiri · Area B kanan
Mobile: stack vertical

#### Controls
Dropdown A · Dropdown B
Radio: Monthly / Yearly
Checkbox: Only show in area
Compare button

#### HeadToHead.tsx
Metrics: Listings · Avg · Median ·
         Min · Max · Price/sqft
Highlight hijau (#4A7C59) lebih murah
Caption: "✅ Green = lower price"

#### CompareChart.tsx
Tab 1: Grouped bar (Avg·Median·Min·Max)
Tab 2: Per unit type (4 seri)
Tab 3: Box plot (collapsed)

#### VerdictBox.tsx
Background navy · text putih
"💰 [Area] lebih murah RM [X]/bulan
    = RM [X×12]/tahun lebih hemat"
"📐 [Area] better value per sqft"
"🏘️ [Area] lebih banyak supply"

Compare limitation note:
"💡 Ingin compare > 2 area?
 Gunakan Single Search masing-masing."
Tooltip: "Multi-area compare —
 akan hadir di versi berikutnya"

Timestamp: "A: [HH:MM] · B: [HH:MM] MYT"

---

### E. UX RULES — NON-NEGOTIABLE

Loading : skeleton BUKAN blank
Error   : friendly + retry, zero jargon
Empty   : helpful suggestion
Mobile  : card layout < 768px
Angka   : toLocaleString()
Harga   : "RM X,XXX"
Null    : "—"
Links   : new tab

Bahasa WAJIB:
❌ "scraped"       → ✅ "diambil langsung"
❌ "trimmed mean"  → ✅ tooltip explain
❌ "error 404"     → ✅ "Data tidak ditemukan"
❌ "overpriced"    → ✅ "di atas rata-rata"
❌ "NaN/undefined" → ✅ "—"

---

### F. ANIMASI — Framer Motion

Results     : fade in + slide up 0.3s
Cards       : staggered 0.1s delay
Fair Price  : counter 0→nilai 0.8s
Tab switch  : crossfade 0.2s
Chart       : animate on mount
Badge       : scale 0→1, 0.2s spring
Skeleton    : pulse animation
ROI output  : fade in saat angka berubah

---

### G. FEEDBACK WIDGET

#### FeedbackWidget.tsx
Posisi: bawah results setelah scroll
"Apakah data ini membantu?"
[👍 Ya] [👎 Tidak]
Aggregate: "Berguna bagi [X]% pengguna"
localStorage · anonymous · zero detail form

---

## LAPORAN FORMAT — PYRAMID PRINCIPLE

Setiap phase selesai:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEADLINE: [satu kalimat]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ VERIFIED: [fitur] → [bukti konkret]
📦 INSTALLED: [package] → [alasan]
⚠️ KEPUTUSAN: [keputusan] → [alasan]
🔧 ERROR: [error]→[fix]→[verified]
⚡ FALLBACK: [problem]→[solusi]
🔴 BUTUH SULTAN: [item/"Tidak ada"]
👉 NEXT: [phase berikutnya]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## EXECUTION RULES

→ Sesi dimulai: auto-approve semua teknikal
→ Install apapun dibutuhkan — langsung
→ Quality gate pass sebelum lanjut phase
→ Phase 3 → 4 tanpa berhenti
→ Sultan hanya menilai output visual
→ Semua keputusan teknikal: putuskan sendiri
→ Semua error: solve sendiri, tidak ada batas
→ Semua fallback: execute otomatis
→ Update Progress Tracker tiap phase selesai
→ North Star: "Temukan rumah yang tepat —
  bukan hanya harga yang tepat"
→ Platform Value Capture WAJIB dipatuhi
→ CTA SELALU lewat platform, bukan direct
→ GlobalDisclaimer SATU, prominent
→ ROI Calculator include di results
→ Semua mitigasi WAJIB diimplementasi
→ Konfirmasi ke Sultan HANYA untuk:
  Vercel login · GitHub push ·
  Keputusan bisnis/produk

MULAI SEKARANG. LANJUT PHASE 3.
TIDAK ADA YANG PERLU DITUNGGU.
