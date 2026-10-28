// Shared by the waitlist form (client) and the /api/waitlist route (server),
// so both sides apply exactly the same rules.

export const CHANNELS = ["whatsapp", "instagram", "telegram", "all"] as const;
export type Channel = (typeof CHANNELS)[number];

export const LANGUAGES = ["en", "ro"] as const;
export type WaitlistLanguage = (typeof LANGUAGES)[number];

export const EMAIL_MAX_LENGTH = 254;
export const BUSINESS_NAME_MAX_LENGTH = 120;

/** Name of the hidden field bots tend to fill in. Humans never see it. */
export const HONEYPOT_FIELD = "website";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;

export type FieldError = "email_required" | "email_invalid" | "business_too_long" | "channel_required";

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validateEmail(value: string): FieldError | null {
  const email = normalizeEmail(value);
  if (!email) return "email_required";
  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) return "email_invalid";
  return null;
}

export function validateBusinessName(value: string): FieldError | null {
  return value.trim().length > BUSINESS_NAME_MAX_LENGTH ? "business_too_long" : null;
}

export function isChannel(value: unknown): value is Channel {
  return typeof value === "string" && (CHANNELS as readonly string[]).includes(value);
}

export function validateChannel(value: unknown): FieldError | null {
  return isChannel(value) ? null : "channel_required";
}

export type WaitlistEntry = {
  email: string;
  business_name: string | null;
  channel: Channel;
  language: WaitlistLanguage;
};

export type ParseResult =
  | { kind: "ok"; entry: WaitlistEntry }
  | { kind: "spam" }
  | { kind: "invalid"; error: FieldError };

export function parseWaitlistInput(input: unknown): ParseResult {
  const body = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof body[key] === "string" ? (body[key] as string) : "");

  if (text(HONEYPOT_FIELD).trim() !== "") return { kind: "spam" };

  const error =
    validateEmail(text("email")) ??
    validateBusinessName(text("businessName")) ??
    validateChannel(body.channel);
  if (error) return { kind: "invalid", error };

  const language = text("language");
  const businessName = text("businessName").trim();

  return {
    kind: "ok",
    entry: {
      email: normalizeEmail(text("email")),
      business_name: businessName || null,
      channel: body.channel as Channel,
      language: (LANGUAGES as readonly string[]).includes(language) ? (language as WaitlistLanguage) : "en",
    },
  };
}

/** What /api/waitlist answers with. */
export type WaitlistResponse =
  | { status: "created" | "exists" }
  | { error: FieldError | "invalid_request" | "not_configured" | "server" };
