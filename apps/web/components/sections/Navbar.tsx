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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid
            ? "border-line bg-bg/75 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <a href={localePath(lang)} className="rounded-lg text-2xl text-text">
            <Logo />
          </a>

          <nav aria-label={nav.label} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={sectionHref(lang, page, link.id)}
                    className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
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
              className="inline-grid size-11 place-items-center rounded-full border border-line bg-white/[0.03] text-text lg:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
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
            className="border-b border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label={nav.label} className="container-page py-4">
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={sectionHref(lang, page, link.id)}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-3 text-base font-medium text-text hover:bg-white/[0.04]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-line pt-4">
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
