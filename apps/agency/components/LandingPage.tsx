import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Navbar } from "@/components/sections/Navbar";
import { Outcomes } from "@/components/sections/Outcomes";
import { Principles } from "@/components/sections/Principles";
import { Problem } from "@/components/sections/Problem";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { getDictionary, type Locale } from "@/lib/i18n";

export function LandingPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} page="home" nav={t.nav} common={t.common} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero t={t} />
        <Problem t={t.problem} />
        <Outcomes t={t.outcomes} />
        <Services t={t.services} />
        <Process t={t.process} />
        <Principles t={t.principles} />
        <Industries t={t.industries} />
        <Faq t={t.faq} />
        <FinalCta t={t.finalCta} common={t.common} />
      </main>
      <Footer lang={lang} page="home" t={t} />
    </>
  );
}
