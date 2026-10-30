import { Channels } from "@/components/sections/Channels";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Navbar } from "@/components/sections/Navbar";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { getDictionary, type Locale } from "@/lib/i18n";

export function LandingPage({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <>
      <Navbar lang={lang} page="home" nav={t.nav} common={t.common} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero t={t} />
        <Problem t={t.problem} />
        <HowItWorks t={t.howItWorks} />
        <Channels t={t.channels} />
        <Features t={t.features} />
        <Pricing lang={lang} t={t.pricing} />
        <Faq t={t.faq} />
        <FinalCta lang={lang} t={t.waitlist} />
      </main>
      <Footer lang={lang} page="home" t={t} />
    </>
  );
}
