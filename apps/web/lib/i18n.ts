import { en, type Dictionary } from "@/content/en";
import { ro } from "@/content/ro";

export const locales = ["en", "ro"] as const;
export type Locale = (typeof locales)[number];

export type PageKey = "home" | "privacy" | "terms";

const dictionaries: Record<Locale, Dictionary> = { en, ro };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

const pagePaths: Record<PageKey, string> = {
  home: "",
  privacy: "/privacy",
  terms: "/terms",
};

/** English lives at the root ("/"), every other locale under "/<lang>". */
export function localePath(lang: Locale, page: PageKey = "home"): string {
  const prefix = lang === "en" ? "" : `/${lang}`;
  return `${prefix}${pagePaths[page]}` || "/";
}

/** Link to a section of the home page, from any page. */
export function sectionHref(lang: Locale, page: PageKey, id: string): string {
  return page === "home" ? `#${id}` : `${localePath(lang)}#${id}`;
}
