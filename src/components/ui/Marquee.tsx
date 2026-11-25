"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current!.querySelector<HTMLElement>("[data-track]")!;
        const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 38, repeat: -1 });
        const speed = { v: 1 };
        const apply = () => loop.timeScale(speed.v);
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const dir = self.direction;
            const boost = Math.min(Math.abs(self.getVelocity()) / 220, 6);
            gsap.killTweensOf(speed);
            gsap
              .timeline()
              .to(speed, { v: dir * (1 + boost), duration: 0.2, ease: "power1.out", onUpdate: apply })
              .to(speed, { v: dir, duration: 1.2, ease: "power2.out", onUpdate: apply });
          },
        });
        return () => {
          st.kill();
          loop.kill();
        };
      });
    },
    { scope: root },
  );

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="px-6 md:px-10">{item}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={root} className={`overflow-hidden ${className ?? ""}`}>
      <div data-track className="flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
