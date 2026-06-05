import type { Config } from "tailwindcss";

/**
 * Design system for SPEEDHOME Price Intelligence — "Luxury Property Editorial".
 * Loaded by Tailwind v4 via `@config "../../tailwind.config.ts";` in globals.css.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#F8F6F1", // warm off-white
        foreground: "#1C1C1E",
        primary: "#1C1C1E", // deep charcoal
        accent: "#C9A96E", // muted gold
        secondary: "#6B7280", // secondary text
        border: "#E5E0D8",
        success: "#4A7C59", // good deal
        danger: "#C0392B", // expensive
        card: "#FFFFFF",
        navy: "#1B2A4A", // sidebar / verdict
        sage: "#E8F0E9", // so-what box bg
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        card: "12px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0,0,0,0.08)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        // Elevation system — differentiate card importance.
        elev1: "0 1px 3px rgba(0,0,0,0.06)", // ordinary cards
        elev2: "0 4px 12px rgba(0,0,0,0.08)", // hero / important cards
      },
    },
  },
  plugins: [],
};

export default config;
