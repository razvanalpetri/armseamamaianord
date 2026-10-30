import { contact } from "@/content/contact";
import type { Dictionary } from "@/content/en";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { BRAND_FULL } from "@/lib/brand";
import { localePath, sectionHref, type Locale, type PageKey } from "@/lib/i18n";

type Props = { lang: Locale; page: PageKey; t: Dictionary };

export function Footer({ lang, page, t }: Props) {
  const links = [
    { id: "services", label: t.nav.services },
    { id: "process", label: t.nav.process },
    { id: "faq", label: t.nav.faq },
    { id: "contact", label: t.nav.cta },
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

        <nav aria-label={t.footer.sectionsHeading}>
          <h2 className="font-display text-sm font-semibold text-text">{t.footer.sectionsHeading}</h2>
          <ul className="mt-4 space-y-3">
            {links.map((link) => (
              <li key={link.id}>
                <a href={sectionHref(lang, page, link.id)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold text-text">{t.footer.contactHeading}</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={contact.instagramProfile} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t.footer.instagram}: @{contact.instagramHandle}
                <span className="sr-only"> {t.common.opensInNewTab}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold text-text">{t.footer.languageHeading}</h2>
          <LanguageSwitcher lang={lang} page={page} labels={t.common.language} className="mt-4 inline-block" />
        </div>
      </div>

      <div className="border-t border-line">
        <p className="container-page py-6 text-xs text-muted">
          © {new Date().getFullYear()} {BRAND_FULL}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
