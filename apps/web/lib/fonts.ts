import { Inter, Space_Grotesk } from "next/font/google";

// latin-ext carries the Romanian diacritics (ă â î ș ț).
export const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const fontDisplay = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});
