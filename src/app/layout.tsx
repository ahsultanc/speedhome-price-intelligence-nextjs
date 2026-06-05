import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://speedhome-price-intelligence-nextjs.vercel.app"),
  title: "Sewajar — Harga Sewa Wajar",
  description:
    "Stress soal harga sewa? Sewajar kasih tahu harga wajarnya. Data real-time dari SPEEDHOME. Gratis, tanpa daftar. by Jendela Group.",
  keywords: [
    "harga sewa Malaysia",
    "harga sewa KL",
    "sewa apartemen Malaysia",
    "harga wajar sewa",
    "Sewajar",
  ],
  authors: [{ name: "Ahmad Sultan Chaeruddin" }],
  openGraph: {
    title: "Sewajar — Harga Sewa Wajar",
    description: "Stress soal harga sewa? Kami kasih tahu harga wajarnya.",
    url: "https://speedhome-price-intelligence-nextjs.vercel.app",
    siteName: "Sewajar",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewajar",
    description: "Stress soal harga sewa? Kami kasih tahu harga wajarnya.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sewajar",
  description:
    "Harga sewa wajar untuk area di Malaysia. Data real-time dari SPEEDHOME.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "MYR",
  },
  inLanguage: "id-ID",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
