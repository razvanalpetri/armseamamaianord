import { Check } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Pricing({ t }: { t: Dictionary["pricing"] }) {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading id="pricing-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <ul className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {t.tiers.map((tier, index) => (
            <li key={tier.name}>
              <Reveal delay={index * 0.08} className="h-full">
                <article
                  className={`glass relative flex h-full flex-col p-6 sm:p-8 ${
                    tier.highlighted
                      ? "!border-accent-soft/60 shadow-[0_0_0_1px_rgb(192_132_252/0.15),0_30px_80px_-30px_rgb(139_92_246/0.7)]"
                      : ""
                  }`}
                >
                  {tier.highlighted ? (
                    <p className="absolute -top-3 left-6 rounded-full bg-primary-strong px-3 py-1 text-xs font-semibold text-white shadow-[0_0_20px_-4px_rgb(168_85_247/0.9)]">
                      {t.recommended}
                    </p>
                  ) : null}
                  <h3 className="text-xl font-semibold text-text">{tier.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted">{tier.description}</p>
                  <p className="mt-6 flex items-baseline gap-1.5">
                    <span className={`font-display text-4xl font-semibold ${tier.highlighted ? "glow-text" : "text-text"}`}>
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted">{tier.period}</span>
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-line pt-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-text">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent-soft" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#waitlist"
                    className={`btn mt-8 w-full ${tier.highlighted ? "btn-primary" : "btn-secondary"}`}
                  >
                    {t.cta}
                  </a>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-muted">{t.note}</p>
      </div>
    </section>
  );
}
