"use client";

import { useRef } from "react";
import { timeline } from "@/data/content";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export function Horizon() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-stages]", start: "top 80%", end: "bottom 55%", scrub: 1 },
        });
        tl.fromTo("[data-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 3 }, 0);
        gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((el, i) => {
          tl.from(el.querySelectorAll("[data-reveal]"), { y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.8 }, i * 0.9)
            .from(el.querySelector("[data-dot]"), { scale: 0, duration: 0.3 }, i * 0.9);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative border-t border-hairline bg-canvas py-28 md:py-36">
      <div className="container-editorial grid grid-cols-12 gap-x-6">
        <p className="col-span-12 label-mono text-ink-secondary lg:col-span-3">{timeline.eyebrow}</p>
        <div className="col-span-12 mt-6 lg:col-span-9 lg:mt-0">
          <h2 className="text-display text-[clamp(2.75rem,5vw,5.5rem)]">{timeline.title}</h2>
          <p className="mt-6 text-[15px] text-ink-secondary">{timeline.body}</p>
        </div>
      </div>

      <div data-stages className="container-editorial relative mt-20">
        <div className="relative h-px bg-hairline">
          <div data-line className="absolute inset-0 origin-left bg-ink" />
        </div>
        <ol className="grid gap-12 md:grid-cols-3 md:gap-6">
          {timeline.stages.map((s) => (
            <li key={s.index} data-stage className="relative pt-10">
              <span data-dot className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-ink" />
              <p data-reveal className="label-mono text-ink-secondary">
                {s.index}
              </p>
              <h3 data-reveal className="mt-4 font-serif text-[clamp(2rem,3.2vw,3.25rem)] leading-none font-light">
                {s.title}
              </h3>
              <p data-reveal className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink-secondary">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
