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
  metadataBase: new URL("https://speedhome-intelligence.vercel.app"),
  title: {
    default: "SPEEDHOME Price Intelligence — Pasar Sewa Malaysia",
    template: "%s · SPEEDHOME Price Intelligence",
  },
  description:
    "Temukan rumah yang tepat — bukan hanya harga yang tepat. Data sewa real-time dari SPEEDHOME.com, analisis harga wajar, dan perbandingan area untuk pasar Malaysia.",
  keywords: [
    "sewa malaysia",
    "harga sewa",
    "rental price",
    "property intelligence",
    "SPEEDHOME",
    "Mont Kiara",
    "KLCC",
  ],
  authors: [{ name: "Ahmad Sultan Chaeruddin" }],
  openGraph: {
    title: "SPEEDHOME Price Intelligence",
    description:
      "Tahu harga sewa yang wajar — sebelum tanda tangan. Data real-time pasar sewa Malaysia.",
    type: "website",
    locale: "id_ID",
    siteName: "SPEEDHOME Price Intelligence",
  },
  robots: { index: true, follow: true },
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
