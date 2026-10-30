// Every number and plan rule on the pricing section lives here, so a price or
// limit changes in one place for both languages. The words (plan
// descriptions, feature labels, FAQ) live in en.ts / ro.ts under `pricing`,
// keyed by the ids used below.
//
// Prices are in EUR, excluding VAT. Yearly = 10 months charged (2 months free).

export type PlanId = "starter" | "growth" | "scale";

/** Keys of `pricing.features` in the dictionaries. */
export type FeatureKey =
  | "replies"
  | "setters"
  | "channelOne"
  | "channelsAllNamed"
  | "channelsAll"
  | "users"
  | "leadScore"
  | "takeover"
  | "pipeline"
  | "basicStats"
  | "emailSupport"
  | "followUps"
  | "netSales"
  | "fullAnalytics"
  | "calendar"
  | "prioritySupport"
  | "voiceNotes"
  | "onboarding"
  | "whatsappSupport";

export type PlanFeature =
  | { key: FeatureKey; comingSoon?: boolean }
  /** "Everything in <plan>, plus:" divider. */
  | { everythingIn: PlanId };

export type Plan = {
  id: PlanId;
  monthly: number;
  yearly: number;
  /** AI replies per month (1 credit = 1 AI reply sent to a lead). */
  credits: number;
  setters: number | "unlimited";
  channels: 1 | "all";
  users: number;
  features: PlanFeature[];
};

/** Keys of `pricing.compare.values` in the dictionaries. */
export type CompareValueKey = "basic" | "full" | "doneWithYou" | "email" | "priority" | "whatsapp";

export type CompareRow = {
  /** Key of `pricing.compare.rows` in the dictionaries. */
  row:
    | "replies"
    | "setters"
    | "channels"
    | "users"
    | "leadScore"
    | "takeover"
    | "followUps"
    | "netSales"
    | "analytics"
    | "calendar"
    | "voiceNotes"
    | "onboarding"
    | "support";
  comingSoon?: boolean;
  /** A plan field to read the value from, or one cell per plan (same order as
   *  `plans`): true = ✓, false = –, or a label key. */
  cells: "credits" | "setters" | "channels" | "users" | Array<boolean | CompareValueKey>;
};

const plans: Plan[] = [
  {
    id: "starter",
    monthly: 97,
    yearly: 970,
    credits: 1000,
    setters: 1,
    channels: 1,
    users: 1,
    features: [
      { key: "replies" },
      { key: "setters" },
      { key: "channelOne" },
      { key: "users" },
      { key: "leadScore" },
      { key: "takeover" },
      { key: "pipeline" },
      { key: "basicStats" },
      { key: "emailSupport" },
    ],
  },
  {
    id: "growth",
    monthly: 297,
    yearly: 2970,
    credits: 5000,
    setters: 3,
    channels: "all",
    users: 3,
    features: [
      { key: "replies" },
      { key: "setters" },
      { key: "channelsAllNamed" },
      { key: "users" },
      { everythingIn: "starter" },
      { key: "followUps" },
      { key: "netSales" },
      { key: "fullAnalytics" },
      { key: "calendar", comingSoon: true },
      { key: "prioritySupport" },
    ],
  },
  {
    id: "scale",
    monthly: 597,
    yearly: 5970,
    credits: 15000,
    setters: "unlimited",
    channels: "all",
    users: 10,
    features: [
      { key: "replies" },
      { key: "setters" },
      { key: "channelsAll" },
      { key: "users" },
      { everythingIn: "growth" },
      { key: "voiceNotes", comingSoon: true },
      { key: "onboarding" },
      { key: "whatsappSupport" },
    ],
  },
];

const comparison: CompareRow[] = [
  { row: "replies", cells: "credits" },
  { row: "setters", cells: "setters" },
  { row: "channels", cells: "channels" },
  { row: "users", cells: "users" },
  { row: "leadScore", cells: [true, true, true] },
  { row: "takeover", cells: [true, true, true] },
  { row: "followUps", cells: [false, true, true] },
  { row: "netSales", cells: [false, true, true] },
  { row: "analytics", cells: ["basic", "full", "full"] },
  { row: "calendar", comingSoon: true, cells: [false, true, true] },
  { row: "voiceNotes", comingSoon: true, cells: [false, false, true] },
  { row: "onboarding", cells: [false, false, "doneWithYou"] },
  { row: "support", cells: ["email", "priority", "whatsapp"] },
];

export const pricing = {
  currency: "EUR",
  trial: {
    days: 7,
    replies: 200,
  },
  highlighted: "growth" as PlanId,

  plans,

  /** Extra credit packs: used after the monthly credits, valid for `validMonths`. */
  packs: {
    validMonths: 12,
    items: [
      { credits: 1000, price: 29 },
      { credits: 5000, price: 129 },
      { credits: 15000, price: 349 },
    ],
  },

  comparison,
};
