"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faq } from "@/data/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section className="relative border-t border-hairline bg-canvas py-28 md:py-36">
      <div className="container-editorial grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="label-mono text-ink-secondary">{faq.eyebrow}</p>
            <h2 className="text-display mt-6 text-[clamp(2.5rem,4vw,4.25rem)]">{faq.title}</h2>
          </div>
        </div>
        <ul className="col-span-12 mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {faq.items.map((item, i) => {
            const expanded = open === i;
            return (
              <li key={item.question} className="border-b border-hairline first:border-t">
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${id}-${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex gap-5">
                      <span className="pt-1 font-mono text-[12px] text-ink-secondary">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-serif text-[clamp(1.25rem,1.8vw,1.6rem)] leading-snug">{item.question}</span>
                    </span>
                    <Plus
                      size={18}
                      strokeWidth={1.25}
                      className={`mt-1.5 shrink-0 transition-transform duration-700 ease-kosek ${expanded ? "rotate-45" : "group-hover:rotate-90"}`}
                    />
                  </button>
                </h3>
                <div
                  id={`${id}-${i}`}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-700 ease-kosek ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 pl-10 text-[15px] leading-relaxed text-ink-secondary">{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
