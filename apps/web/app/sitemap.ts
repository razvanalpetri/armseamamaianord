import type { MetadataRoute } from "next";
import { localePath, locales, type PageKey } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

const pages: { key: PageKey; priority: number }[] = [
  { key: "home", priority: 1 },
  { key: "privacy", priority: 0.3 },
  { key: "terms", priority: 0.3 },
];

const absolute = (path: string) => new URL(path, siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ key, priority }) =>
    locales.map((lang) => ({
      url: absolute(localePath(lang, key)),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((other) => [other, absolute(localePath(other, key))])),
      },
    })),
  );
}
