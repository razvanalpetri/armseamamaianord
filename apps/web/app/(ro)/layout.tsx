import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { siteUrl } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = { metadataBase: siteUrl };

export const viewport: Viewport = { themeColor: "#050507", colorScheme: "dark" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <RootShell lang="ro">{children}</RootShell>;
}
