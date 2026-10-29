"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/en";
import type { Locale } from "@/lib/i18n";
import {
  BUSINESS_NAME_MAX_LENGTH,
  CHANNELS,
  EMAIL_MAX_LENGTH,
  HONEYPOT_FIELD,
  validateBusinessName,
  validateChannel,
  validateEmail,
  type Channel,
  type FieldError,
  type WaitlistResponse,
} from "@/lib/waitlist";

type Props = {
  lang: Locale;
  t: Dictionary["waitlist"];
  privacyHref: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; result: "created" | "exists" }
  | { kind: "error"; message: string };

type Errors = Partial<Record<"email" | "businessName" | "channel", string>>;

export function WaitlistForm({ lang, t, privacyHref }: Props) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [channel, setChannel] = useState<Channel | "">("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const fieldMessage = (error: FieldError): string =>
    ({
      email_required: t.errors.emailRequired,
      email_invalid: t.errors.emailInvalid,
      business_too_long: t.errors.businessTooLong,
      channel_required: t.errors.channelRequired,
    })[error];

  const validate = (): Errors => {
    const next: Errors = {};
    const emailError = validateEmail(email);
    const businessError = validateBusinessName(businessName);
    const channelError = validateChannel(channel);
    if (emailError) next.email = fieldMessage(emailError);
    if (businessError) next.businessName = fieldMessage(businessError);
    if (channelError) next.channel = fieldMessage(channelError);
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = nextErrors.email ? "email" : nextErrors.businessName ? "business" : "channel-0";
      document.getElementById(`${id}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, businessName, channel, language: lang, [HONEYPOT_FIELD]: honeypot }),
      });
      const data = (await response.json().catch(() => ({ error: "server" }))) as WaitlistResponse;

      if ("status" in data) {
        setStatus({ kind: "success", result: data.status });
        return;
      }
      switch (data.error) {
        case "email_required":
        case "email_invalid":
        case "business_too_long":
        case "channel_required": {
          const field = data.error === "business_too_long" ? "businessName" : data.error.startsWith("email") ? "email" : "channel";
          setErrors({ [field]: fieldMessage(data.error) });
          setStatus({ kind: "idle" });
          return;
        }
        case "not_configured":
          setStatus({ kind: "error", message: t.errors.notConfigured });
          return;
        default:
          setStatus({ kind: "error", message: t.errors.server });
      }
    } catch {
      setStatus({ kind: "error", message: t.errors.network });
    }
  };

  const submitting = status.kind === "submitting";
  const inputClass =
    "glass-field mt-2 block w-full rounded-2xl px-4 py-3 text-base text-text placeholder:text-zinc-500 focus:border-accent-soft focus:outline-none";

  return (
    <div className="relative">
      {/* Persistent live region so the success message is announced. */}
      <p aria-live="polite" className="sr-only">
        {status.kind === "success"
          ? status.result === "created"
            ? t.success.createdTitle
            : t.success.existsTitle
          : ""}
      </p>
      <AnimatePresence mode="wait" initial={false}>
        {status.kind === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex min-h-[22rem] flex-col items-center justify-center text-center"
          >
            <span className="grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-400 shadow-[0_0_40px_-8px_rgb(52_211_153/0.7)]">
              <CheckCircle2 className="size-8" aria-hidden="true" />
            </span>
            <h3 ref={(heading) => heading?.focus()} tabIndex={-1} className="mt-6 text-2xl font-semibold text-text">
              {status.result === "created" ? t.success.createdTitle : t.success.existsTitle}
            </h3>
            <p className="mt-3 max-w-sm text-muted">
              {status.result === "created" ? t.success.createdBody : t.success.existsBody}
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div>
              <label htmlFor={`${id}-email`} className="text-sm font-medium text-text">
                {t.form.emailLabel}
              </label>
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                maxLength={EMAIL_MAX_LENGTH}
                placeholder={t.form.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? `${id}-email-error` : undefined}
                className={`${inputClass} ${errors.email ? "border-red-400/70" : "border-white/10"}`}
              />
              {errors.email ? (
                <p id={`${id}-email-error`} className="mt-2 text-sm text-red-300">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${id}-business`} className="text-sm font-medium text-text">
                {t.form.businessLabel} <span className="font-normal text-muted">({t.form.optional})</span>
              </label>
              <input
                id={`${id}-business`}
                name="businessName"
                type="text"
                autoComplete="organization"
                maxLength={BUSINESS_NAME_MAX_LENGTH}
                placeholder={t.form.businessPlaceholder}
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                aria-invalid={errors.businessName ? true : undefined}
                aria-describedby={errors.businessName ? `${id}-business-error` : undefined}
                className={`${inputClass} ${errors.businessName ? "border-red-400/70" : "border-white/10"}`}
              />
              {errors.businessName ? (
                <p id={`${id}-business-error`} className="mt-2 text-sm text-red-300">
                  {errors.businessName}
                </p>
              ) : null}
            </div>

            <fieldset aria-describedby={errors.channel ? `${id}-channel-error` : undefined}>
              <legend className="text-sm font-medium text-text">{t.form.channelLabel}</legend>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {CHANNELS.map((value, index) => (
                  <label
                    key={value}
                    className="glass-chip relative flex min-h-11 cursor-pointer items-center justify-center rounded-2xl px-3 text-sm font-medium text-muted hover:text-text has-[:checked]:text-white"
                  >
                    <input
                      id={`${id}-channel-${index}`}
                      type="radio"
                      name="channel"
                      value={value}
                      checked={channel === value}
                      onChange={() => setChannel(value)}
                      className="sr-only"
                    />
                    {t.form.channels[value]}
                  </label>
                ))}
              </div>
              {errors.channel ? (
                <p id={`${id}-channel-error`} className="mt-2 text-sm text-red-300">
                  {errors.channel}
                </p>
              ) : null}
            </fieldset>

            {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor={`${id}-${HONEYPOT_FIELD}`}>{t.form.honeypotLabel}</label>
              <input
                id={`${id}-${HONEYPOT_FIELD}`}
                name={HONEYPOT_FIELD}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn btn-primary w-full !py-3.5 text-base disabled:cursor-wait disabled:opacity-80">
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  {t.form.submitting}
                </>
              ) : (
                <>
                  {t.form.submit}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>

            {status.kind === "error" ? (
              <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {status.message}
              </p>
            ) : null}

            <p className="text-center text-xs leading-relaxed text-muted">
              {t.form.consentBefore}{" "}
              <a href={privacyHref} className="text-accent-soft underline underline-offset-2 hover:text-text">
                {t.form.consentLink}
              </a>
              {t.form.consentAfter}
            </p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
