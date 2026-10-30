import type { Metadata } from "next";
import { BRAND_FULL } from "@/lib/brand";
import { getDictionary, localePath, locales, type Locale, type PageKey } from "@/lib/i18n";

function resolveSiteUrl(): URL {
  if (process.env.NEXT_PUBLIC_SITE_URL) return new URL(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  return new URL("http://localhost:3001");
}

export const siteUrl = resolveSiteUrl();

export function languageAlternates(page: PageKey): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((lang) => [lang, localePath(lang, page)])),
    "x-default": localePath("en", page),
  };
}

export function pageMetadata(lang: Locale, page: PageKey): Metadata {
  const t = getDictionary(lang).meta;
  const { title, description } = t[page];
  const url = localePath(lang, page);

  return {
    metadataBase: siteUrl,
    title,
    description,
    applicationName: BRAND_FULL,
    alternates: { canonical: url, languages: languageAlternates(page) },
    openGraph: {
      type: "website",
      siteName: BRAND_FULL,
      title,
      description,
      url,
      locale: t.ogLocale,
      alternateLocale: locales.filter((other) => other !== lang).map((other) => getDictionary(other).meta.ogLocale),
    },
    twitter: { card: "summary", title, description },
  };
}
