import { localePath, locales, type Locale, type PageKey } from "@/lib/i18n";
import type { Dictionary } from "@/content/en";

type Props = {
  lang: Locale;
  page: PageKey;
  labels: Dictionary["common"]["language"];
  className?: string;
};

/**
 * EN | RO toggle that links to the same page in the other language. The two
 * languages use separate root layouts, so this is a plain <a> (full load).
 */
export function LanguageSwitcher({ lang, page, labels, className = "" }: Props) {
  const names: Record<Locale, string> = { en: labels.enName, ro: labels.roName };
  const short: Record<Locale, string> = { en: labels.en, ro: labels.ro };

  return (
    <div role="group" aria-label={labels.label} className={className}>
      <ul className="lg-segment flex items-center rounded-full p-1 text-xs font-semibold">
        {locales.map((code) => {
          const active = code === lang;
          return (
            <li key={code}>
              <a
                href={localePath(code, page)}
                hrefLang={code}
                lang={code}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-8 min-w-10 items-center justify-center rounded-full px-2.5 transition-colors ${
                  active
                    ? "lg-thumb"
                    : "text-muted hover:text-text"
                }`}
              >
                {short[code]}
                <span className="sr-only"> {names[code]}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
