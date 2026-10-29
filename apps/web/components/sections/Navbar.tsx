"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/en";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { localePath, sectionHref, type Locale, type PageKey } from "@/lib/i18n";

type Props = {
  lang: Locale;
  page: PageKey;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
};

export function Navbar({ lang, page, nav, common }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links = [
    { id: "how-it-works", label: nav.howItWorks },
    { id: "features", label: nav.features },
    { id: "pricing", label: nav.pricing },
    { id: "faq", label: nav.faq },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        data-scrolled={solid ? "" : undefined}
        className="lg-nav mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full pl-5 pr-2 sm:h-16 sm:pl-6 sm:pr-2.5"
      >
        <a href={localePath(lang)} className="rounded-lg text-2xl text-text">
          <Logo />
        </a>

        <nav aria-label={nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={sectionHref(lang, page, link.id)}
                  className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/[0.07] hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} page={page} labels={common.language} />
          <a href={sectionHref(lang, page, "waitlist")} className="btn btn-primary hidden !min-h-10 !py-2 !text-sm md:inline-flex">
            {nav.cta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="glass-pill inline-grid size-10 place-items-center rounded-full text-text lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass lg-sheet mx-auto mt-2 max-w-6xl lg:hidden"
          >
            <nav aria-label={nav.label} className="p-3">
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={sectionHref(lang, page, link.id)}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-2xl px-4 text-base font-medium text-text hover:bg-white/[0.06]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-white/10 px-1 pt-3">
                <a
                  href={sectionHref(lang, page, "waitlist")}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  {nav.cta}
                </a>
              </div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
