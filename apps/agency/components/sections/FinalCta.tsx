import { AtSign, Check, MessageCircle } from "lucide-react";
import { contact } from "@/content/contact";
import type { Dictionary } from "@/content/en";
import { Reveal } from "@/components/ui/Reveal";
import { fill } from "@/lib/text";

type Props = { t: Dictionary["finalCta"]; common: Dictionary["common"] };

export function FinalCta({ t, common }: Props) {
  const minutes = { minutes: contact.auditMinutes };

  return (
    <section id="contact" aria-labelledby="contact-title" className="defer-render relative py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="glass relative overflow-hidden !rounded-[2rem] p-6 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-40 -top-40 size-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(139_92_246/0.3),transparent)]" />
              <div className="absolute -bottom-48 -right-32 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.22),transparent)]" />
              <div className="bg-grid absolute inset-0 opacity-60" />
            </div>

            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              <div>
                <p className="eyebrow">{t.eyebrow}</p>
                <h2 id="contact-title" className="mt-4 text-3xl font-semibold text-text sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                  {t.title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{fill(t.body, minutes)}</p>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {t.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3 text-text">
                      <span className="glass-pill grid size-6 place-items-center rounded-full text-accent-soft">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {fill(perk, minutes)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg-inset flex flex-col items-center gap-6 rounded-[1.5rem] p-6 text-center sm:p-8">
                <span className="lg-icon grid size-16 place-items-center rounded-[1.4rem]">
                  <MessageCircle className="size-7" aria-hidden="true" />
                </span>
                <a
                  href={contact.instagramDm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full !py-3.5 text-base"
                >
                  {t.button}
                  <span className="sr-only"> {common.opensInNewTab}</span>
                </a>
                <a
                  href={contact.instagramProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-text"
                >
                  <AtSign className="size-4 text-accent-soft" aria-hidden="true" />
                  <span>
                    {t.handleLabel}: <span className="select-all font-medium text-text">@{contact.instagramHandle}</span>
                  </span>
                  <span className="sr-only"> {common.opensInNewTab}</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
