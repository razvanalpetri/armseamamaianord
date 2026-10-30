import type { Metadata } from "next";
import { Ambient } from "@/components/Ambient";
import { Logo } from "@/components/ui/Logo";
import { en } from "@/content/en";
import { ro } from "@/content/ro";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { localePath } from "@/lib/i18n";
import { BRAND_FULL } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: `${en.notFound.title} | ${BRAND_FULL}`,
  description: en.notFound.body,
};

// Unmatched URLs could be in either language, so show both.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body>
        <Ambient />
        <main className="relative grid min-h-dvh place-items-center px-4 py-16 text-center">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
          <div>
            <a href={localePath("en")} className="inline-block rounded-lg text-3xl text-text">
              <Logo />
            </a>
            <p className="glow-text mt-10 font-display text-7xl font-semibold">404</p>
            <h1 className="mt-6 text-3xl font-semibold text-text">{en.notFound.title}</h1>
            <p className="mt-3 text-muted">{en.notFound.body}</p>
            <p lang="ro" className="mt-1 text-sm text-muted">
              {ro.notFound.body}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={localePath("en")} className="btn btn-primary">
                {en.notFound.cta}
              </a>
              <a href={localePath("ro")} hrefLang="ro" lang="ro" className="btn btn-secondary">
                {ro.notFound.cta}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
