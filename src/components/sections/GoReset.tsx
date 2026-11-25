"use client";

import Image from "next/image";
import { useRef } from "react";
import { goReset } from "@/data/content";
import { media } from "@/data/media";
import { gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export function GoReset() {
  const root = useRef<HTMLElement>(null);
  const asset = media.goReset;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-frame]",
          { clipPath: "inset(18% 14% 18% 14% round 24px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            ease: "none",
            scrollTrigger: { trigger: "[data-frame]", start: "top 95%", end: "center 55%", scrub: true },
          },
        );
        gsap.fromTo(
          "[data-frame] img",
          { scale: 1.3, yPercent: -6 },
          { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: "[data-frame]", start: "top bottom", end: "bottom top", scrub: true } },
        );

        const split = SplitText.create("[data-title]", { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.lines, { yPercent: 110, stagger: 0.08, duration: 1.3, scrollTrigger: { trigger: "[data-title]", start: "top 85%" } });

        gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
          tl.from(el.querySelector("[data-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1.4 })
            .from(el.querySelectorAll("[data-reveal]"), { y: 24, autoAlpha: 0, stagger: 0.06, duration: 1 }, 0.15);
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="go-reset" className="relative bg-canvas py-28 md:py-40">
      <div className="container-editorial grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="label-mono text-ink-secondary">{goReset.eyebrow}</p>
            <h2 data-title className="text-display mt-6 text-[clamp(2.75rem,4.8vw,5.25rem)]">
              {goReset.title}
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-secondary">{goReset.body}</p>
            <p className="mt-8 flex items-baseline gap-3">
              <span className="font-serif text-2xl italic">{goReset.author}</span>
              <span className="label-mono text-ink-secondary">{goReset.authorRole}</span>
            </p>
          </div>
        </div>

        <div className="col-span-12 mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
          {asset.src && (
            <div data-frame className="relative aspect-square overflow-hidden rounded-3xl bg-surface">
              <Image src={asset.src} alt={asset.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          )}

          <ol className="mt-16">
            {goReset.pillars.map((p) => (
              <li key={p.index} data-pillar className="relative grid grid-cols-12 gap-x-6 py-8">
                <span data-rule className="absolute inset-x-0 top-0 h-px bg-hairline" />
                <span data-reveal className="col-span-2 font-mono text-[13px] text-ink-secondary">
                  {p.index}
                </span>
                <div className="col-span-10">
                  <h3 data-reveal className="font-serif text-[clamp(1.6rem,2.4vw,2.25rem)] leading-tight font-light">
                    {p.title}
                  </h3>
                  <p data-reveal className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-secondary">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
