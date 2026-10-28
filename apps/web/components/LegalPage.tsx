import { ArrowLeft, Info } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

type Props = { lang: Locale; page: "privacy" | "terms" };

/** Placeholder Privacy Policy / Terms page, built from the dictionaries. */
export function LegalPage({ lang, page }: Props) {
  const t = getDictionary(lang);
  const doc = t.legal[page];

  return (
    <>
      <Navbar lang={lang} page={page} nav={t.nav} common={t.common} />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
        <article className="container-page max-w-3xl pb-24 pt-32 sm:pt-40">
          <a
            href={localePath(lang)}
            className="inline-flex items-center gap-2 rounded-full text-sm text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.legal.backHome}
          </a>

          <h1 className="mt-8 text-4xl font-semibold text-text sm:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-sm text-muted">
            {t.legal.lastUpdatedLabel}: {t.legal.lastUpdated}
          </p>

          <p className="glass mt-8 flex gap-3 p-4 text-sm leading-relaxed text-accent-soft">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t.legal.placeholderNotice}
          </p>

          <p className="mt-10 text-lg leading-relaxed text-text">{doc.intro}</p>

          {doc.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-2xl font-semibold text-text">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
      </main>
      <Footer lang={lang} page={page} t={t} />
    </>
  );
}
