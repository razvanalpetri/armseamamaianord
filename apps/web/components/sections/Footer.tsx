import type { Dictionary } from "@/content/en";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { localePath, sectionHref, type Locale, type PageKey } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

type Props = { lang: Locale; page: PageKey; t: Dictionary };

export function Footer({ lang, page, t }: Props) {
  const productLinks = [
    { id: "how-it-works", label: t.nav.howItWorks },
    { id: "features", label: t.nav.features },
    { id: "pricing", label: t.nav.pricing },
    { id: "faq", label: t.nav.faq },
  ];
  const legalLinks = [
    { href: localePath(lang, "privacy"), label: t.footer.privacy },
    { href: localePath(lang, "terms"), label: t.footer.terms },
  ];
  const linkClass = "text-sm text-muted transition-colors hover:text-text";

  return (
    <footer className="defer-render relative border-t border-line">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={localePath(lang)} className="inline-block rounded-lg text-2xl text-text">
            <Logo />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.productHeading}>
          <h2 className="font-display text-sm font-semibold text-text">{t.footer.productHeading}</h2>
          <ul className="mt-4 space-y-3">
            {productLinks.map((link) => (
              <li key={link.id}>
                <a href={sectionHref(lang, page, link.id)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.legalHeading}>
          <h2 className="font-display text-sm font-semibold text-text">{t.footer.legalHeading}</h2>
          <ul className="mt-4 space-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-text">{t.footer.languageHeading}</h2>
          <LanguageSwitcher lang={lang} page={page} labels={t.common.language} className="mt-4 inline-block" />
        </div>
      </div>

      <div className="border-t border-line">
        <p className="container-page py-6 text-xs text-muted">
          © {new Date().getFullYear()} {BRAND}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
