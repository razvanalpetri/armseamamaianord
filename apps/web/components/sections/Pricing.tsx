import { Check, Gift } from "lucide-react";
import type { Dictionary } from "@/content/en";
import { pricing, type CompareRow, type FeatureKey, type Plan } from "@/content/pricing";
import { BillingSwitch } from "@/components/pricing/BillingSwitch";
import { CompareCollapse } from "@/components/pricing/CompareCollapse";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/lib/i18n";
import { fill, formatMoney, formatNumber, packSavings, plural, yearlyPerMonth } from "@/lib/pricing";

type Props = { lang: Locale; t: Dictionary["pricing"] };

function ComingSoon({ label }: { label: string }) {
  return (
    <span className="glass-pill ml-2 inline-flex translate-y-[-1px] rounded-full px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-accent-soft">
      {label}
    </span>
  );
}

export function Pricing({ lang, t }: Props) {
  const { plans, packs, comparison, trial, highlighted } = pricing;
  const trialVars = {
    days: trial.days,
    replies: plural(t.replyCount, trial.replies, lang),
    cancelDay: trial.days + 1,
  };

  const featureLabel = (key: FeatureKey, plan: Plan): string => {
    switch (key) {
      case "replies":
        return plural(t.features.replies, plan.credits, lang);
      case "setters":
        return plan.setters === "unlimited" ? t.features.settersUnlimited : plural(t.features.setters, plan.setters, lang);
      case "users":
        return plural(t.features.users, plan.users, lang);
      default:
        return t.features[key];
    }
  };

  const compareCell = (row: CompareRow, plan: Plan, index: number) => {
    if (row.cells === "credits") return formatNumber(plan.credits, lang);
    if (row.cells === "setters") return plan.setters === "unlimited" ? t.compare.values.unlimited : formatNumber(plan.setters, lang);
    if (row.cells === "channels") return plan.channels === "all" ? t.compare.values.allChannels : t.compare.values.oneChannel;
    if (row.cells === "users") return formatNumber(plan.users, lang);
    const cell = row.cells[index];
    if (cell === true) {
      return (
        <>
          <Check className="mx-auto size-4 text-accent-soft" aria-hidden="true" />
          <span className="sr-only">{t.compare.included}</span>
        </>
      );
    }
    if (cell === false) {
      return (
        <>
          <span aria-hidden="true" className="text-muted">
            –
          </span>
          <span className="sr-only">{t.compare.notIncluded}</span>
        </>
      );
    }
    return t.compare.values[cell];
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="defer-render relative py-20 [contain-intrinsic-height:auto_3200px] sm:py-28"
    >
      <div className="container-page">
        <SectionHeading id="pricing-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-10">
          <BillingSwitch labels={t.billing}>
            <p className="glass-pill mx-auto mt-5 flex max-w-2xl items-start justify-center gap-2.5 rounded-2xl px-4 py-2.5 text-left text-sm text-muted sm:items-center sm:text-center">
              <Gift className="mt-0.5 size-4 shrink-0 text-accent-soft sm:mt-0" aria-hidden="true" />
              {fill(t.trial, trialVars)}
            </p>

            {/* Plan cards. Growth comes first on mobile. */}
            <ul className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
              {plans.map((plan, index) => {
                const lead = plan.id === highlighted;
                const name = t.plans[plan.id].name;
                return (
                  <li key={plan.id} className={lead ? "order-first lg:order-none" : ""}>
                    <Reveal delay={index * 0.08} className="h-full">
                      <article className={`glass relative flex h-full flex-col p-6 sm:p-8 ${lead ? "glass-tint" : ""}`}>
                        {lead ? (
                          <p className="lg-badge absolute -top-3 left-6 z-10 rounded-full px-3 py-1 text-xs font-semibold">
                            {t.mostPopular}
                          </p>
                        ) : null}
                        <h3 className="text-xl font-semibold text-text">{name}</h3>
                        <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted">{t.plans[plan.id].description}</p>

                        <div className="mt-6">
                          <p className="when-monthly flex items-baseline gap-1.5">
                            <span className={`font-display text-4xl font-semibold ${lead ? "glow-text" : "text-text"}`}>
                              {formatMoney(plan.monthly, lang)}
                            </span>
                            <span className="text-sm text-muted">{t.perMonth}</span>
                          </p>
                          <p className="when-yearly flex items-baseline gap-1.5">
                            <span className={`font-display text-4xl font-semibold ${lead ? "glow-text" : "text-text"}`}>
                              {formatMoney(plan.yearly, lang)}
                            </span>
                            <span className="text-sm text-muted">{t.perYear}</span>
                          </p>
                          <p className="when-monthly mt-1.5 text-sm text-muted">{t.billedMonthly}</p>
                          <p className="when-yearly mt-1.5 text-sm font-medium text-emerald-300">
                            {fill(t.billedYearly, { price: formatMoney(yearlyPerMonth(plan), lang) })}
                          </p>
                        </div>

                        <a href="#waitlist" className={`btn mt-6 w-full ${lead ? "btn-primary" : "btn-secondary"}`}>
                          {fill(t.cta, { days: trial.days })}
                          <span className="sr-only">: {name}</span>
                        </a>

                        <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
                          {plan.features.map((feature, featureIndex) =>
                            "everythingIn" in feature ? (
                              <li key={featureIndex} className="pt-1 text-sm font-semibold text-accent-soft">
                                {fill(t.features.everythingIn, { plan: t.plans[feature.everythingIn].name })}
                              </li>
                            ) : (
                              <li key={featureIndex} className="flex items-start gap-3 text-sm text-text">
                                <Check className="mt-0.5 size-4 shrink-0 text-accent-soft" aria-hidden="true" />
                                <span>
                                  {featureLabel(feature.key, plan)}
                                  {feature.comingSoon ? <ComingSoon label={t.comingSoon} /> : null}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </BillingSwitch>
        </div>

        <div className="mt-8 space-y-1 text-center text-sm text-muted">
          <p>{t.vatNote}</p>
          <p>{t.creditsNote}</p>
        </div>

        {/* Extra credit packs */}
        <Reveal className="mt-16">
          <div className="glass grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-12 lg:p-10">
            <div>
              <h3 className="text-2xl font-semibold text-text sm:text-3xl">{t.packs.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{t.packs.subtitle}</p>
            </div>
            <div>
              <ul className="grid gap-3 sm:grid-cols-3">
                {packs.items.map((pack, index) => {
                  const save = index > 0 ? packSavings(pack, packs.items[0]) : 0;
                  return (
                    <li key={pack.credits} className="glass-pill flex flex-col rounded-[1.4rem] p-5">
                      <p className="text-sm font-medium text-muted">{plural(t.packs.credits, pack.credits, lang)}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                        <p className="font-display text-3xl font-semibold text-text">{formatMoney(pack.price, lang)}</p>
                        {save > 0 ? (
                          <span className="lg-badge rounded-full px-2 py-0.5 text-[11px] font-semibold">
                            {fill(t.packs.save, { pct: save })}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">{fill(t.packs.note, { months: packs.validMonths })}</p>
            </div>
          </div>
        </Reveal>

        {/* Comparison table */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-semibold text-text sm:text-3xl">{t.compare.title}</h3>
          <CompareCollapse showLabel={t.compare.show} hideLabel={t.compare.hide}>
            <div className="glass p-2 sm:p-4">
              <table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm">
                <caption className="sr-only">{t.compare.title}</caption>
                <colgroup>
                  <col className="w-[37%] sm:w-[34%]" />
                  {plans.map((plan) => (
                    <col key={plan.id} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col" className="px-2 py-3 text-[11px] font-medium uppercase tracking-wider text-muted sm:px-4">
                      {t.compare.featureColumn}
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        scope="col"
                        className={`px-2 py-3 text-center font-display text-sm font-semibold sm:px-4 sm:text-base ${
                          plan.id === highlighted ? "rounded-t-2xl bg-primary/[0.12] text-accent-soft" : "text-text"
                        }`}
                      >
                        {t.plans[plan.id].name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.row} className="border-t border-white/[0.07]">
                      <th scope="row" className="px-2 py-3 font-medium text-text sm:px-4">
                        {t.compare.rows[row.row]}
                        {row.comingSoon ? <ComingSoon label={t.comingSoon} /> : null}
                      </th>
                      {plans.map((plan, index) => (
                        <td
                          key={plan.id}
                          className={`px-2 py-3 text-center text-muted sm:px-4 ${plan.id === highlighted ? "bg-primary/[0.12] text-text" : ""}`}
                        >
                          {compareCell(row, plan, index)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CompareCollapse>
        </div>

        {/* Pricing FAQ */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="mb-6 text-center text-2xl font-semibold text-text sm:text-3xl">{t.faq.title}</h3>
          <FaqAccordion
            headingLevel={4}
            defaultOpen={null}
            items={t.faq.items.map((item) => ({ q: item.q, a: fill(item.a, trialVars) }))}
          />
        </div>
      </div>
    </section>
  );
}
