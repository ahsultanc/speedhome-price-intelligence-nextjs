# CLAUDE.md — Standing Instructions
# Produk: Sewajar (by Jendela Group)
# Last updated: 7 Juni 2026

---

## WHO YOU ARE

Kamu adalah Lead PM + Senior Developer yang
bertanggung jawab penuh atas product ini.
Standar kerja: Google, Airbnb, Stripe level.
Setiap keputusan bisa dipertanggungjawabkan ke CEO.

Project : Sewajar (sewa + wajar = sewajarnya)
          "by Jendela Group"
Builder : Ahmad Sultan Chaeruddin
Deadline: 9 Juni 2026
Tujuan  : Assessment PM/CEO Office — Jendela Group
Audiens : CEO, CFO, COO Jendela Group Indonesia
Standar : Awwwards + Dribbble award-winning level
Referensi: Redfin · Wise · Airbnb · Notion ·
           linear.app · stripe.com · ft.com

Tagline  : "Sewa yang wajar."
Hero app : "Stress soal harga sewa?
            Kami kasih tahu harga wajarnya."

Build it like your name is on it. Because it is.

---

## NORTH STAR — SATU PERTANYAAN

Sewajar menjawab SATU pertanyaan penyewa:
"Harga sewa ini wajar atau tidak?"

Produk ini TENANT-FOCUSED. Semua keputusan
desain mengurangi satu lapisan keraguan
penyewa, bukan melayani investor/landlord.

### 5 keresahan penyewa yang dijawab:
1. "Apakah harga ini wajar?"
   → Fair Price (median) sebagai hero metric
2. "Apakah ini dalam kemampuan saya?"
   → Kalkulator Kemampuan Sewa
3. "Harus tawaran berapa?"
   → NegotiationToolkit (data, bukan verdict)
4. "Area mana yang cocok?"
   → AreaIntelCard + SoWhatBox emotional copy
5. "Apakah unit ini worth harganya?"
   → ListingCompletenessBadge + FairDealContext

CATATAN: produk ini SUDAH BUKAN investor tool.
TIDAK ADA ROI Calculator. TIDAK ADA persona
Investor. Jangan tambahkan kembali.

---

## PROGRESS TRACKER

- [x] Phase 1 — Scaffolding + scrape bridge
- [x] Phase 2 — Single Search core pages
- [x] Phase 3 — Compare Mode
- [x] Phase 2.5 — Expanded Single-Search features
- [x] Phase 4 — Polish & Deploy
- [x] Rebrand → Sewajar by Jendela Group
- [x] Tenant-focused refactor (hapus ROI/investor)
- [x] DemandSignal + NegotiationToolkit
- [x] Referral tracking + ShareableURL
- [x] SEO (sitemap, robots, JSON-LD, canonical)

LIVE: speedhome-price-intelligence-nextjs.vercel.app
GitHub: github.com/ahsultanc/speedhome-price-intelligence-nextjs

Update tracker setiap milestone selesai.

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
- Menilai output visual setiap milestone
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
→ Log di laporan

### Rules:
npm install [package]                    → langsung
npm install -D [package]                 → langsung
pip install [p] --break-system-packages  → langsung
npx [tool]                               → langsung

### Sudah ada — jangan install ulang:
Next.js · TypeScript · Tailwind · Framer Motion
Recharts · shadcn/ui · lucide-react · next-themes
xlsx · clsx · tailwind-merge · @upstash/redis

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

### IF scraping backend gagal / Cloudflare block:
→ Backend demo-only by design di production
  (Cloudflare blok datacenter IP Vercel —
   masalah TEKNIS deployment, BUKAN legal)
→ Load src/data/demoResponses.json
→ Banner: "Menampilkan data sampel —
   data akurat per [timestamp MYT]"
→ VERIFY: semua fitur jalan dengan demo
→ TIDAK perlu lapor — by design

### IF Upstash Redis (DemandSignal) gagal:
→ Graceful degrade: fallback localStorage
→ Komponen tetap render, count boleh kosong
→ TIDAK boleh crash UI

### IF Vercel timeout:
→ Auto-buat/extend vercel.json maxDuration
  untuk route api/scrape & api/scrape-compare
→ VERIFY: scraping > 10 detik jalan
→ TIDAK perlu lapor

### IF Framer Motion conflict:
→ Ganti CSS transitions murni
→ Maintain timing dan easing
→ Tandai TODO post-deploy

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
- [ ] ListingCompleteness badge?
- [ ] GlobalDisclaimer tampil?
- [ ] Fair Deal framing netral (tanpa verdict)?
- [ ] Kalkulator Kemampuan Sewa jalan?
- [ ] Area Intel + confidence?
- [ ] Timestamp prominent + refresh?
- [ ] Similar Areas max 2?
- [ ] Excel lengkap + branding Sewajar?
- [ ] Compare limitation note?
- [ ] Feedback Widget sentiment only?
- [ ] Availability signal?
- [ ] Emotional copy SoWhatBox?
- [ ] DemandSignal render + graceful degrade?
- [ ] NegotiationToolkit (platform-first)?
- [ ] Platform CTA lewat platform?
- [ ] ShareableURL generate + referral (?ref)?
- [ ] Deep link ke listing/area page?
- [ ] Saved searches localStorage?

### Quality Gate:
Satu item belum pass → STOP, fix dulu.

### Regression setiap fix:
Fix A → test semua yang berinteraksi
Update types → type-check ulang
Update API → test semua consumer

---

## PM FRAMEWORK

### North Star:
"Harga sewa ini wajar atau tidak?"
(tenant-focused, lihat bagian NORTH STAR)

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

### Prinsip klaim — defensible only:
- JANGAN klaim "real-time". Data adalah scrape
  berkala, bukan real-time. Bahasa yang benar:
  "diambil langsung dari SPEEDHOME".
- Jangan klaim absolut "tidak ada di platform
  mana pun" (tak mungkin diverifikasi).
- Bicara POSISI bisnis, bukan KEPEMILIKAN data
  internal pihak lain.
- Jangan "pamer istilah lalu jelaskan" —
  pakai penjelasan langsung; istilah untuk lisan.

---

## PLATFORM VALUE CAPTURE — NON-NEGOTIABLE

### CTA Rules — WAJIB:
SEMUA tombol action lewat platform:
✅ "Lihat di SPEEDHOME →"
✅ "Buat Penawaran di SPEEDHOME →"
Link via lib/utm.ts → buildSpeedhomeURL():
Ada listing-id → speedhome.com/rent/[slug]
Tidak ada → speedhome.com/rent/[area-slug]
UTM otomatis tertanam per stage.

### Referral tracking:
?ref=share ditangkap getReferralSource()
→ sessionStorage → semua CTA jadi
  utm_campaign=shared-referral
Sumber kebenaran: src/lib/utm.ts

### Branding Subtle:
Di results section footer:
"Sewajar by Jendela Group" (subtle, muted)

Di Excel footer row terakhir:
"Generated by Sewajar by Jendela Group
 [URL] · [timestamp]"
BUKAN watermark per cell.

### ShareableURL:
"Simpan pencarian ini"
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
Filosofi     : "Trusted friend with expertise"

### Colors:
Off-white/bg : #F8F6F1 (alt #FAF8F5)
Primary      : #1C1C1E
Accent/Gold  : #C9A96E
Navy         : #1B2A4A
Secondary    : #6B7280
Border       : #E5E0D8
Muted        : #9B9589
Good         : #4A7C59
Card bg      : #FFFFFF
Sage light   : #E8F0E9
Warning bg   : #FEF3C7

ZERO merah untuk price judgment.
Merah HANYA untuk error state.
ZERO gradients. ZERO heavy shadows.
Clean flat surfaces only.

### Rules:
Spacing: 4px base · generous whitespace
Radius: 8px default · 12px cards
Shadow: 0 1px 3px rgba(0,0,0,0.08)
Tone: Luxury Property Editorial
Icon: Lucide (no emoji kecuali 🏠 di
      FeedbackWidget closing)
Referensi: Redfin · Wise · Airbnb Luxe ·
           Notion · FT · linear.app · stripe.com

---

## COPYWRITING

- TIDAK ada em dash di seluruh APP
  (PPT boleh em dash hemat untuk struktur)
- Statement bukan narasi; angka di depan
- Bahasa dominan Indonesia; istilah bisnis
  English yang lazim boleh (supply, moat, roadmap)
- Satu contoh konkret > daftar jargon
- Kontras > klaim datar
- Confidence > permohonan
- Trust signal hanya kalau ada distrust nyata
- Format angka: koma (RM 2,180), toLocaleString()

### Bahasa WAJIB:
❌ "scraped"       → ✅ "diambil langsung"
❌ "real-time"     → ✅ "diambil langsung" /
                       "data per [timestamp]"
❌ "trimmed mean"  → ✅ tooltip explain
❌ "error 404"     → ✅ "Data tidak ditemukan"
❌ "overpriced"    → ✅ "di atas rata-rata"
❌ "NaN/undefined" → ✅ "—"

---

## TECH STACK
Next.js 14 App Router + TypeScript strict
Tailwind CSS + design system extended
Framer Motion (CSS fallback kalau conflict)
Recharts · shadcn/ui · lucide-react
next-themes · xlsx · @upstash/redis

---

## ARCHITECTURE (aktual)
src/
  app/
    page.tsx · HomeClient.tsx
    layout.tsx · globals.css
    sitemap.ts · robots.ts          (SEO)
    compare/page.tsx · CompareClient.tsx
    api/
      scrape/route.ts
      scrape-compare/route.ts
      demand/route.ts               (Upstash)
  components/
    layout/
      Navbar.tsx · Footer.tsx
    home/
      HeroSection.tsx
      SearchBar.tsx
      BudgetFilter.tsx              (Kalkulator
                                     Kemampuan Sewa)
      TrustSignals.tsx
      PopularAreas.tsx
    results/
      MetricCards.tsx               (Fair Price hero)
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
      CTASection.tsx
    listing/
      ListingCompletenessBadge.tsx
      FairDealContext.tsx
      DemandSignal.tsx
      NegotiationToolkit.tsx
      AvailabilitySignal.tsx
      PreSurveyChecklist.tsx
      PostDealChecklist.tsx
      CollapsibleChecklist.tsx
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
      Collapsible.tsx
      StatusDot.tsx
  lib/
    types.ts · utils.ts · constants.ts
    areaIntel.ts                    (21 area)
    listingCompleteness.ts
    landmarks.ts
    scrape.ts
    redis.ts                        (Upstash)
    utm.ts                          (CTA + referral)
    useLocalStorage.ts
  data/
    demoResponses.json              (fallback)

CATATAN: TIDAK ADA lib/roiCalculator.ts atau
ROICalculator.tsx — fitur itu sudah dihapus
saat refactor tenant-focused. Jangan buat ulang.

---

## SCRAPE BACKEND & DATA

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
Response: { area_a: ScrapeResult,
            area_b: ScrapeResult }

GET/POST /api/demand
DemandSignal counter via Upstash Redis.
Graceful degrade ke localStorage kalau gagal.

### Demo fallback:
Production backend demo-only (Cloudflare blok
datacenter IP — TEKNIS, bukan legal/credential).
Data demo: src/data/demoResponses.json
(Mont Kiara, KLCC, Bangsar, Petaling Jaya).

### Python (legacy, JANGAN diubah):
python/scraper.py · python/utils.py ·
python/demo_data.json

### Infrastruktur:
- Upstash Redis (DemandSignal): Singapore
  ap-southeast-1, Free plan.
- Vercel: Hobby plan, auto-deploy on push.

### Backup terpisah (JANGAN disentuh):
Streamlit app di D:\speedhome-app\ —
repo berbeda, bukan tanggung jawab sesi ini.

---

## FITUR WAJIB

### A. HERO & SEARCH

#### HeroSection.tsx
H1 Cormorant Garamond bold:
"Stress soal harga sewa?"
Line 2 italic gold:
"Kami kasih tahu harga wajarnya."
Subtitle: "Ketik area yang kamu incar.
           Biar kami yang hitung."

#### SearchBar.tsx
Dropdown 21 area Malaysia
Toggle: Area name / Direct URL
Tombol Search navy #1B2A4A

#### BudgetFilter.tsx — KALKULATOR KEMAMPUAN SEWA
Input: Penghasilan bulanan (RM) + Harga sewa
       (pre-filled Fair Price area)
Output instan, client-side only:
- Rasio sewa/penghasilan (hero):
  < 30% sehat · 30–40% ketat · > 40% berisiko
- Sisa untuk kebutuhan lain (RM/bulan)
- Perlu disiapkan di awal (deposit 2bln +
  advance 1bln + utility) → upfront cost
- Berapa listing cocok / sedikit di atas /
  di luar budget
Disclaimer: "Ini panduan umum, bukan saran
finansial." Zero data ke server.
Kalau input kosong → sembunyikan output.

#### TrustSignals.tsx
Pill badges di bawah search bar.

---

### B. GLOBAL DISCLAIMER — SATU, PROMINENT

#### GlobalDisclaimer.tsx
Posisi: tepat di atas results, selalu visible.
SATU disclaimer cover semua concern:
data diambil langsung dari SPEEDHOME;
Listing Completeness mengukur kelengkapan info
listing bukan kondisi fisik; ketersediaan perlu
dikonfirmasi ke landlord sebelum survei.
HAPUS disclaimer individual yang redundant.

---

### C. HASIL SEARCH — SINGLE MODE

#### Timestamp.tsx — PROMINENT DI ATAS
"Berdasarkan [N] listing aktif — diambil
 langsung dari SPEEDHOME hari ini pukul
 [HH:MM MYT]". BUKAN "scraped", BUKAN "real-time".
Cache > 2 jam → warning + Refresh button.

#### AreaIntelCard.tsx
Data dari lib/areaIntel.ts (21 area).
Struktur per area: name, karakter, cocok,
lifestyleDesc, highlight, priceRange,
supplyLevel, character[], confidence,
lastUpdated.
Hanya fakta terverifikasi (dekat MRT/LRT, CBD,
F&B). Hindari subjektif ("tenang") sebagai klaim.
Confidence MEDIUM/LOW → tampilkan disclaimer
"lakukan riset mandiri".

#### SupplyIndicator.tsx
> 100 → HIGH · 50–100 → MEDIUM · < 50 → LOW
Copy sesuai level supply.

#### SoWhatBox.tsx — DATA + EMOTIONAL
Background sage #E8F0E9.
lifestyleDesc area + rentang harga mayoritas
(P25–P75) untuk unit type terbanyak.

#### MetricCards.tsx — FAIR PRICE HERO
Fair Price = MEDIAN (tahan outlier), bukan
average. Tampil sebagai hero metric:
"Harga wajar [unit type] di [area]:
 RM [median]/bulan"
3 cards: Avg · Median · Price/sqft.
Counter animation 0 → nilai, 0.8s.
Tabs: Monthly / Yearly (Daily hidden jika kosong).

#### PriceSummaryTable.tsx
Fair Price tooltip jelaskan median/trimmed
secara human (tanpa istilah teknis telanjang).

#### PriceChart.tsx
Bar chart Average vs Median per unit type.
Warna: #1B2A4A (avg) · #C9A96E (median).
Box plot dalam Collapsible.

#### ListingsTable.tsx
Default sort: Best Value.
Kolom: Completeness Badge · Title · Property ·
Address · Room type · Price · sqft · Furnishing ·
FairDealContext · AvailabilitySignal ·
DemandSignal · NegotiationToolkit · Tips survei ·
"Lihat di SPEEDHOME →".
Mobile < 768px → card layout.
Pagination: > 50 listing.

#### ListingCompletenessBadge.tsx
Label WAJIB: "Listing Completeness".
🟢 lengkap · 🟡 kurang lengkap · 🔴 sangat minim.
Tooltip: "Mengukur kelengkapan informasi dari
landlord — bukan jaminan kondisi unit fisik."
Logic: lib/listingCompleteness.ts.

#### FairDealContext.tsx
FILOSOFI: DATA bukan VERDICT.
ZERO merah. Warna netral #6B7280.
> Fair+20% → "Rata-rata area ini: RM [fair]"
  + dua perspektif (penyewa & landlord).
±20% → "Sesuai rata-rata pasar".
< Fair-20% → "Di bawah rata-rata pasar".
Disclaimer: "bukan penilaian terhadap landlord".

#### DemandSignal.tsx — ASET DATA
Tombol "Saya juga tertarik di harga itu" →
catat minat di Fair Price via /api/demand
(Upstash). Tampilkan agregat ("N orang tertarik").
Graceful degrade ke localStorage kalau Redis gagal.
Mencatat minat user pada Fair Price; agregatnya
jadi sinyal permintaan.

#### NegotiationToolkit.tsx — DATA UNTUK NEGOSIASI
Collapsible "Punya data untuk negosiasi →".
3 jalur, platform-first:
1. "Buat Penawaran di SPEEDHOME →" (navy,
   direkomendasikan — komunikasi tercatat)
2. Script negosiasi siap-salin (pakai Fair Price)
3. Salin link data area untuk dibagikan ke landlord
Disclaimer: referensi pasar, bukan garansi harga.

#### AvailabilitySignal.tsx
Berdasarkan timestamp listing kalau tersedia.
CATATAN INTEGRITAS: signal ">30 hari" TIDAK
diimplementasi kalau scraper tak punya tanggal
posting — nol data palsu. CTA tetap lewat platform.

#### PreSurveyChecklist / PostDealChecklist
Default collapsed (CollapsibleChecklist).
Dismiss via localStorage. Tips survei & checklist
setelah deal. Posisi subtle di bawah listing card.

#### SimilarAreas.tsx
Tampil HANYA kalau ≥ 2 character match.
Maksimal 2 suggestion. Disclaimer riset mandiri.

#### ShareableURL.tsx
"Simpan pencarian ini" → generate query URL →
copy clipboard → toast. Saved searches
localStorage maks 5, disclaimer browser-only.
Referral: link share menambah ?ref untuk
tracking shared-referral (lihat lib/utm.ts).

#### ExcelExport.tsx
Filename: Sewajar_[Area]_[YYYYMMDD].xlsx
Sheet "Listings": Completeness label + score,
Fair Deal status, Availability, Timestamp.
Sheet "Summary": Area Intel, Supply, Timestamp.
Footer row: "Generated by Sewajar by Jendela
Group · [URL] · [timestamp]".

#### Demo Fallback Banner
Background #FEF3C7. "Menampilkan data sampel —
data akurat per [timestamp MYT]."

---

### D. COMPARE MODE

#### Layout
Desktop: Area A kiri · Area B kanan.
Mobile: stack vertical.

#### Controls
Dropdown A · Dropdown B · Radio Monthly/Yearly ·
Checkbox "Only show in area" · Compare button.

#### HeadToHead.tsx
Metrics: Listings · Avg · Median · Min · Max ·
Price/sqft. Highlight hijau #4A7C59 lebih murah.

#### CompareChart.tsx
Tab grouped bar · per unit type · box plot.

#### VerdictBox.tsx
Background navy, text putih. Selisih harga
bulanan & tahunan, value per sqft, supply.
Compare limitation note: "> 2 area? Gunakan
Single Search masing-masing." (multi-area =
versi berikutnya). Timestamp A & B (MYT).

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

---

### F. ANIMASI — Framer Motion

Results     : fade in + slide up 0.3s
Cards       : staggered 0.1s delay
Hero        : stagger children 0.2s
Fair Price  : counter 0→nilai 0.8s
Tab switch  : crossfade 0.2s
Chart       : animate on mount
Badge       : scale 0→1, 0.2s spring
Skeleton    : pulse animation

---

### G. FEEDBACK WIDGET

#### FeedbackWidget.tsx
Posisi: bawah results setelah scroll.
"Apakah data ini membantu?" [👍][👎]
Aggregate "Berguna bagi [X]% pengguna".
localStorage · anonymous · zero detail form.

---

## LAPORAN FORMAT — PYRAMID PRINCIPLE

Setiap milestone selesai:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HEADLINE: [satu kalimat]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ VERIFIED: [fitur] → [bukti konkret]
📦 INSTALLED: [package] → [alasan]
⚠️ KEPUTUSAN: [keputusan] → [alasan]
🔧 ERROR: [error]→[fix]→[verified]
⚡ FALLBACK: [problem]→[solusi]
🔴 BUTUH SULTAN: [item/"Tidak ada"]
👉 NEXT: [langkah berikutnya]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

---

## EXECUTION RULES

→ Sesi dimulai: auto-approve semua teknikal
→ Install apapun dibutuhkan — langsung
→ Quality gate pass sebelum lanjut
→ Sultan hanya menilai output visual
→ Semua keputusan teknikal: putuskan sendiri
→ Semua error: solve sendiri, tidak ada batas
→ Semua fallback: execute otomatis
→ Update Progress Tracker tiap milestone
→ North Star: "Harga sewa ini wajar atau tidak?"
→ TENANT-FOCUSED — tidak ada ROI/investor
→ Klaim harus defensible — tidak ada "real-time"
→ Platform Value Capture WAJIB dipatuhi
→ CTA SELALU lewat platform, bukan direct
→ GlobalDisclaimer SATU, prominent
→ Konfirmasi ke Sultan HANYA untuk:
  Vercel login · GitHub push ·
  Keputusan bisnis/produk
