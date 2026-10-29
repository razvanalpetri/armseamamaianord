"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

type Item = { q: string; a: string };

export function FaqAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="glass divide-y divide-white/[0.07] overflow-hidden">
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-semibold text-text transition-colors hover:bg-white/[0.03] sm:px-7 sm:text-lg"
              >
                <span>{item.q}</span>
                <span
                  className={`glass-pill grid size-8 shrink-0 place-items-center rounded-full text-accent-soft transition-transform duration-300 ${
                    expanded ? "rotate-45 bg-primary/15" : ""
                  }`}
                >
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!expanded}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 leading-relaxed text-muted sm:px-7">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
