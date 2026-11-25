"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { footer } from "@/data/content";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-wordmark]", { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 100,
          stagger: 0.04,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-wordmark]", start: "top 98%" },
        });
        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-dark text-ink-on-dark">
      <div className="container-editorial pt-28 pb-10 md:pt-40">
        <div className="grid grid-cols-12 gap-x-6">
          <p className="col-span-12 label-mono text-ink-on-dark/50 lg:col-span-3">{footer.ctaEyebrow}</p>
          <div className="col-span-12 mt-6 lg:col-span-9 lg:mt-0">
            <h2 className="text-display max-w-3xl text-[clamp(2.75rem,5.4vw,6rem)]">{footer.ctaTitle}</h2>
            <a
              href={footer.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink-on-dark px-7 py-4 text-sm font-medium text-dark"
            >
              {footer.ctaLabel}
              <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 border-t border-hairline-dark pt-8">
          <ul className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 md:col-span-6">
            {footer.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline font-mono text-[13px]">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="col-span-12 mt-6 max-w-md text-[12px] leading-relaxed text-ink-on-dark/55 md:col-span-6 md:mt-0 md:justify-self-end md:text-right">
            {footer.legal}
          </p>
        </div>

        <p
          data-wordmark
          aria-hidden
          className="mt-16 -ml-[0.04em] font-serif text-[min(24.5vw,23rem)] leading-[1] font-light tracking-[-0.06em] whitespace-nowrap"
        >
          Go Smart
        </p>
        <div className="mt-6 flex justify-between label-mono text-[10px] text-ink-on-dark/40">
          <span>© Go Functional Smart</span>
          <span>{footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
