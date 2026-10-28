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
      <ul className="flex items-center rounded-full border border-line bg-white/[0.03] p-1 text-xs font-semibold">
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
                    ? "bg-primary-strong text-white shadow-[0_0_16px_-4px_rgb(168_85_247/0.9)]"
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
