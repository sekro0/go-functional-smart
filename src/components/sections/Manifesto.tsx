"use client";

import { useRef } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { marquee, philosophy } from "@/data/content";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-shell]",
          { scale: 0.92, borderRadius: 40 },
          {
            scale: 1,
            borderRadius: 0,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 15%", scrub: true },
          },
        );

        const split = SplitText.create("[data-quote]", { type: "words" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: "[data-quote]", start: "top 78%", end: "bottom 42%", scrub: true },
          },
        );

        gsap.from("[data-attr]", {
          y: 20,
          opacity: 0,
          duration: 1.2,
          scrollTrigger: { trigger: "[data-attr]", start: "top 90%" },
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sinergia" className="relative bg-canvas">
      <div data-shell className="origin-top overflow-hidden bg-dark text-ink-on-dark">
        <Marquee items={marquee} className="border-b border-hairline-dark py-5 label-mono text-ink-on-dark/70" />

        <div className="container-editorial grid grid-cols-12 gap-x-6 py-28 md:py-40">
          <p className="col-span-12 label-mono text-ink-on-dark/50 lg:col-span-3">{philosophy.eyebrow}</p>
          <blockquote className="col-span-12 mt-8 lg:col-span-9 lg:mt-0">
            <p data-quote className="font-serif text-[clamp(2rem,4.4vw,4.6rem)] leading-[1.06] font-light tracking-[-0.02em]">
              &ldquo;{philosophy.quote}&rdquo;
            </p>
            <footer data-attr className="mt-12 flex items-center gap-4">
              <span className="h-px w-12 bg-hairline-dark" />
              <span className="label-mono text-ink-on-dark/60">{philosophy.attribution}</span>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
