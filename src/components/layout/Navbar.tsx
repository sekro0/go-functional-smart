"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollControl } from "@/components/providers/SmoothScroll";
import { AnchorLink } from "@/components/ui/AnchorLink";
import { menuLabels, navLinks, site, storeCta, topBar } from "@/data/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { EASE_KOSEK } from "@/lib/motion";

export function Navbar() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { pauseScroll, resumeScroll } = useScrollControl();

  useGSAP(
    () => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
      });

      const header = root.current!;
      ScrollTrigger.create({
        start: 80,
        end: "max",
        onUpdate: (self) => {
          header.dataset.scrolled = "true";
          header.dataset.hidden = self.direction === 1 && self.scroll() > 600 ? "true" : "false";
        },
        onLeaveBack: () => {
          header.dataset.scrolled = "false";
          header.dataset.hidden = "false";
        },
      });
    },
    { scope: root },
  );

  const close = useCallback(() => {
    setOpen(false);
    resumeScroll();
  }, [resumeScroll]);

  const toggle = () => {
    if (open) return close();
    setOpen(true);
    pauseScroll();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <header
        ref={root}
        data-scrolled="false"
        data-hidden="false"
        className="group/nav fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-kosek data-[hidden=true]:-translate-y-full"
      >
        <div className="hidden overflow-hidden border-b border-hairline bg-ink text-ink-on-dark transition-[height] duration-500 group-data-[scrolled=true]/nav:h-0 md:block md:h-8">
          <div className="container-editorial flex h-8 items-center justify-between label-mono text-[10px]">
            <span className="flex gap-6">
              {topBar.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
            <span className="text-ink-on-dark/60">{topBar.suffix}</span>
          </div>
        </div>

        <div className="relative border-b border-transparent transition-colors duration-500 group-data-[scrolled=true]/nav:border-hairline group-data-[scrolled=true]/nav:bg-canvas/85 group-data-[scrolled=true]/nav:backdrop-blur-md">
          <nav className="container-editorial flex h-16 items-center justify-between">
            <AnchorLink href="#top" className="font-mono text-[12px] font-medium tracking-[0.22em]" aria-label={site.name}>
              {site.wordmark}
            </AnchorLink>

            <ul className="hidden items-center gap-9 lg:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <AnchorLink href={link.href} className="link-underline text-[13px] text-ink-secondary hover:text-ink">
                    {link.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={storeCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-canvas sm:inline-flex"
              >
                {storeCta.label}
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-label={open ? menuLabels.close : menuLabels.open}
                className="relative flex h-10 w-10 items-center justify-center lg:hidden"
              >
                <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-kosek ${open ? "rotate-45" : "-translate-y-1"}`} />
                <span className={`absolute h-px w-5 bg-ink transition-transform duration-500 ease-kosek ${open ? "-rotate-45" : "translate-y-1"}`} />
              </button>
            </div>
          </nav>
          <div ref={bar} className="absolute inset-x-0 -bottom-px h-[1.5px] origin-left scale-x-0 bg-ink" />
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-canvas pt-24 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE_KOSEK }}
            data-lenis-prevent
          >
            <ul className="container-editorial flex flex-1 flex-col">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden border-b border-hairline">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease: EASE_KOSEK }}
                  >
                    <AnchorLink href={link.href} onNavigate={close} className="flex items-baseline gap-4 py-5">
                      <span className="label-mono text-ink-secondary">0{i + 1}</span>
                      <span className="font-serif text-4xl">{link.label}</span>
                    </AnchorLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="container-editorial pb-10">
              <a href={storeCta.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-full bg-ink px-6 py-4 text-canvas">
                {storeCta.label}
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
