"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/content/en";

type Billing = "monthly" | "yearly";

type Props = {
  labels: Dictionary["pricing"]["billing"];
  children: ReactNode;
};

/**
 * Monthly / Yearly toggle. The plan cards render both prices on the server;
 * this only flips `data-billing`, and CSS (.when-monthly / .when-yearly in
 * globals.css) shows the matching one.
 */
export function BillingSwitch({ labels, children }: Props) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const options: { value: Billing; label: string }[] = [
    { value: "monthly", label: labels.monthly },
    { value: "yearly", label: labels.yearly },
  ];

  return (
    <div data-billing={billing}>
      <div className="flex justify-center">
        <div role="group" aria-label={labels.label} className="lg-segment inline-flex items-center gap-1 rounded-full p-1">
          {options.map(({ value, label }) => {
            const active = billing === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setBilling(value)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                  active ? "lg-thumb" : "text-muted hover:text-text"
                }`}
              >
                {label}
                {value === "yearly" ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      active ? "bg-white/20 text-white" : "border border-emerald-300/25 bg-emerald-400/10 text-emerald-300"
                    }`}
                  >
                    {labels.yearlyBadge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}
