"use client";

import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { founder, hero } from "@/data/content";
import { agusPhotos } from "@/data/media";
import { DESKTOP, gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

const DRIFT = [-3, 2, -1.5];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const portrait = agusPhotos[0];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-line]", { type: "words", mask: "words" });
        gsap
          .timeline({ defaults: { ease: "expo.out" }, delay: 0.1 })
          .fromTo("[data-frame]", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
          .from("[data-frame] img", { scale: 1.45, duration: 2.2 }, 0.2)
          .from(split.words, { yPercent: 110, stagger: 0.04, duration: 1.4 }, 0.5)
          .from("[data-hero-fade]", { y: 16, autoAlpha: 0, stagger: 0.07, duration: 1.1 }, 0.9)
          .from("[data-hero-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.4 }, 0.9);
        return () => split.revert();
      });

      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-frame]", { yPercent: 14, ease: "none", scrollTrigger: st });
        gsap.fromTo("[data-frame] [data-parallax]", { yPercent: -6 }, { yPercent: 8, ease: "none", scrollTrigger: { ...st } });
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((line, i) => {
          gsap.to(line, { xPercent: DRIFT[i] * 4, ease: "none", scrollTrigger: { ...st } });
        });
        gsap.to("[data-hero-copy]", { yPercent: -40, autoAlpha: 0, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative overflow-hidden bg-canvas">
      <div className="container-editorial grid min-h-svh grid-cols-12 gap-x-6 pt-28 pb-10 md:pt-32">
        <div className="col-span-12 flex flex-col lg:col-span-8">
          <p data-hero-fade className="label-mono text-ink-secondary">
            {hero.eyebrow}
          </p>
          <h1 className="text-display relative z-10 mt-6 text-[clamp(3.25rem,min(7.6vw,15vh),9rem)]">
            {hero.titleLines.map((line, i) => (
              <span key={line} data-line className="block whitespace-nowrap">
                {i === 1 ? <em className="font-light">{line}</em> : line}
              </span>
            ))}
          </h1>

          <div data-hero-copy className="mt-12 grid gap-10 lg:mt-auto lg:grid-cols-[1.1fr_1fr] lg:pt-10">
            <div>
              <p data-hero-fade className="max-w-md text-[15px] leading-relaxed text-ink-secondary">
                {hero.body}
              </p>
              <div data-hero-fade className="mt-8 flex flex-wrap items-center gap-6">
                <AnchorLink
                  href={hero.primaryCta.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-ink py-3.5 pr-5 pl-6 text-sm font-medium text-canvas"
                >
                  {hero.primaryCta.label}
                  <ArrowDownRight size={16} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:rotate-[-45deg]" />
                </AnchorLink>
                <AnchorLink href={hero.secondaryCta.href} className="link-underline text-sm">
                  {hero.secondaryCta.label}
                </AnchorLink>
              </div>
            </div>
            <div className="self-end">
              <div data-hero-rule className="h-px w-full bg-hairline" />
              <dl data-hero-fade className="mt-5 grid grid-cols-2 gap-y-4">
                {hero.specs.map((s) => (
                  <div key={s.label} className="pr-4">
                    <dt className="font-mono text-[13px] tabular-nums">{s.value}</dt>
                    <dd className="mt-1 text-[11px] leading-snug text-ink-secondary">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <figure className="col-span-12 mt-14 lg:col-span-4 lg:mt-0 lg:self-stretch">
          <div
            data-frame
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface lg:aspect-auto lg:h-[calc(100svh-15.5rem)] lg:min-h-[420px]"
          >
            <div data-parallax className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                preload
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
          <figcaption data-hero-fade className="mt-4 flex items-baseline justify-between gap-4">
            <span className="font-serif text-lg whitespace-nowrap italic">by {founder.name}</span>
            <span className="label-mono text-right text-[10px] text-ink-secondary">{portrait.label}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
