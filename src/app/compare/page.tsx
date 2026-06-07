import type { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Bandingkan Harga Sewa 2 Area | Sewajar",
  description:
    "Bandingkan harga sewa dua area. Fair Price, value per sqft, dan auto verdict.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return <CompareClient />;
}
