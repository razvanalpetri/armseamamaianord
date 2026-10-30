import type { Plan } from "@/content/pricing";
import type { Locale } from "@/lib/i18n";

const localeTag: Record<Locale, string> = { en: "en-IE", ro: "ro-RO" };

/** Plural templates: `one` / `few` / `other` follow Intl.PluralRules (Romanian
 *  uses all three: "1 credit", "3 credite", "20 de credite"). `{n}` is replaced. */
export type PluralForms = { one: string; few: string; other: string };

/** €97 (en) / 97 € (ro), no decimals. */
export function formatMoney(amount: number, lang: Locale): string {
  return new Intl.NumberFormat(localeTag[lang], {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** 1,000 (en) / 1.000 (ro). */
export function formatNumber(n: number, lang: Locale): string {
  return new Intl.NumberFormat(localeTag[lang]).format(n);
}

/** Replaces `{name}` placeholders. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}

export function plural(forms: PluralForms, n: number, lang: Locale): string {
  const category = new Intl.PluralRules(localeTag[lang]).select(n);
  const template = category === "one" ? forms.one : category === "few" ? forms.few : forms.other;
  return fill(template, { n: formatNumber(n, lang) });
}

/** Yearly price spread over 12 months, rounded to whole euros. */
export function yearlyPerMonth(plan: Pick<Plan, "yearly">): number {
  return Math.round(plan.yearly / 12);
}

/** How much cheaper a pack is per credit than the base (first) pack, in %. */
export function packSavings(pack: { credits: number; price: number }, base: { credits: number; price: number }): number {
  const atBaseRate = (base.price / base.credits) * pack.credits;
  return Math.round((1 - pack.price / atBaseRate) * 100);
}
