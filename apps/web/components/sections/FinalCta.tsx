import { Check } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { Reveal } from "@/components/ui/Reveal";
import { localePath, type Locale } from "@/lib/i18n";

type Props = { lang: Locale; t: Dictionary["waitlist"] };

export function FinalCta({ lang, t }: Props) {
  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="glass relative overflow-hidden !rounded-[2rem] p-6 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-40 -top-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.3),transparent)]" />
              <div className="absolute -bottom-48 -right-32 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.22),transparent)]" />
              <div className="bg-grid absolute inset-0 opacity-60" />
            </div>

            <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
              <div>
                <p className="eyebrow">{t.eyebrow}</p>
                <h2 id="waitlist-title" className="mt-4 text-3xl font-semibold text-text sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                  {t.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">{t.subtitle}</p>
                <ul className="mt-8 space-y-3">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-text">
                      <span className="glass-pill grid size-6 place-items-center rounded-full text-accent-soft">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg-inset rounded-[1.5rem] p-5 sm:p-7">
                <WaitlistForm lang={lang} t={t} privacyHref={localePath(lang, "privacy")} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
