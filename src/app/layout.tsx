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
  title: "SPEEDHOME Price Intelligence — Harga Sewa Wajar Malaysia",
  description:
    "Cari tahu harga sewa wajar di 21 area Malaysia. Data real-time dari SPEEDHOME. Gratis, tanpa daftar.",
  keywords: [
    "harga sewa Malaysia",
    "harga sewa KL",
    "sewa apartemen Malaysia",
    "price intelligence properti",
    "harga wajar sewa",
  ],
  authors: [{ name: "Ahmad Sultan Chaeruddin" }],
  openGraph: {
    title: "SPEEDHOME Price Intelligence",
    description: "Sewa rumah itu stressful. Harga wajarnya, tidak.",
    url: "https://speedhome-price-intelligence-nextjs.vercel.app",
    siteName: "SPEEDHOME Price Intelligence",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SPEEDHOME Price Intelligence",
    description: "Sewa rumah itu stressful. Harga wajarnya, tidak.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SPEEDHOME Price Intelligence",
  description:
    "Cari tahu harga sewa wajar di area Malaysia. Data real-time dari SPEEDHOME.",
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
