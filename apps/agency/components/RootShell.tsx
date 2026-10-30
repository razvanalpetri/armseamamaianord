import type { ReactNode } from "react";
import { Ambient } from "@/components/Ambient";
import { GlassLight } from "@/components/GlassLight";
import { MotionProvider } from "@/components/MotionProvider";
import { RevealObserver } from "@/components/RevealObserver";
import { fontDisplay, fontSans } from "@/lib/fonts";
import { getDictionary, type Locale } from "@/lib/i18n";

/** The <html>/<body> shell shared by the (en) and (ro) root layouts. */
export function RootShell({ lang, children }: { lang: Locale; children: ReactNode }) {
  const t = getDictionary(lang);

  return (
    <html lang={lang} className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {t.common.skipToContent}
        </a>
        <Ambient />
        <MotionProvider>{children}</MotionProvider>
        <RevealObserver />
        <GlassLight />
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </body>
    </html>
  );
}
