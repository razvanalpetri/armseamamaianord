import { en, type Dictionary } from "@/content/en";
import { ro } from "@/content/ro";

export const locales = ["en", "ro"] as const;
export type Locale = (typeof locales)[number];

/** The site is a single page per language. */
export type PageKey = "home";

const dictionaries: Record<Locale, Dictionary> = { en, ro };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

/** English lives at the root ("/"), Romanian under "/ro". */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function localePath(lang: Locale, _page: PageKey = "home"): string {
  return lang === "en" ? "/" : `/${lang}`;
}

/** Link to a section of the page. */
export function sectionHref(_lang: Locale, _page: PageKey, id: string): string {
  return `#${id}`;
}
