"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { buildSpeedhomeURL } from "@/lib/utm";
import { slugifyArea } from "@/lib/utils";

export default function CTASection({ area }: { area: string }) {
  const slug = slugifyArea(area);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="rounded-card bg-navy p-8 text-center text-white"
    >
      <h3 className="font-display text-2xl font-semibold sm:text-3xl">
        Kamu sudah tahu harga wajarnya.
      </h3>
      <p className="mx-auto mt-2 max-w-md text-white/80">
        Sekarang tinggal satu langkah — temukan unit yang cocok untuk kamu.
      </p>
      <a
        href={buildSpeedhomeURL(slug, "cta-section")}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-lg bg-accent px-7 py-3 font-medium text-primary transition-colors hover:bg-white"
      >
        Cari di SPEEDHOME →
      </a>
      <p className="mt-2 text-xs text-white/60">Listing {area} tersedia sekarang</p>
      <div className="mt-4">
        <Link href="/compare" className="text-sm text-white/70 underline transition-colors hover:text-white">
          Atau bandingkan dengan area lain →
        </Link>
      </div>
    </motion.div>
  );
}
