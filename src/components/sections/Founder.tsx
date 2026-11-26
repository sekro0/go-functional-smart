"use client";

import Image from "next/image";
import { useRef } from "react";
import { founder } from "@/data/content";
import { agusPhotos } from "@/data/media";
import { DESKTOP, gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export function Founder() {
  const root = useRef<HTMLElement>(null);
  const photos = agusPhotos.slice(1);

  useGSAP(
    () => {
      if (!root.current) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-name]", {
          type: "chars",
          mask: "chars",
        });
        gsap.from(split.chars, {
          yPercent: 105,
          stagger: 0.03,
          duration: 1.3,
          scrollTrigger: { trigger: "[data-name]", start: "top 85%" },
        });
        gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(30% 0% 30% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "top 40%",
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            el.querySelector("img"),
            { scale: 1.25 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
        return () => split.revert();
      });
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((el, i) => {
          gsap.to(el, {
            yPercent: i % 2 ? -18 : 10,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  if (photos.length === 0) return null;

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-canvas py-28 md:py-40"
    >
      <div className="container-editorial">
        <p className="label-mono text-ink-secondary">{founder.eyebrow}</p>
        <h2
          data-name
          className="text-display mt-6 text-[clamp(4rem,15vw,16rem)] leading-[0.95] italic"
        >
          {founder.name}
        </h2>
        <div className="mt-10 grid grid-cols-12 gap-x-6">
          <p className="col-span-12 max-w-md text-[15px] leading-relaxed text-ink-secondary lg:col-span-4">
            {founder.body}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {photos.map((p, i) => {
            const wide = p.width > p.height;
            return (
              <figure
                key={p.src}
                className={
                  wide
                    ? "col-span-2 md:col-span-3"
                    : i % 3 === 1
                      ? "md:mt-24"
                      : ""
                }
              >
                <div
                  data-photo
                  className="relative overflow-hidden rounded-2xl bg-surface"
                  style={{
                    aspectRatio: wide ? `${p.width} / ${p.height}` : "3 / 4",
                  }}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes={
                      wide
                        ? "(min-width: 1440px) 1360px, 100vw"
                        : "(min-width: 768px) 30vw, 50vw"
                    }
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 label-mono text-[10px] text-ink-secondary">
                  {p.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
