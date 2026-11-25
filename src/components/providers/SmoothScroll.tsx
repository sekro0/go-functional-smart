"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollContextValue {
  pauseScroll: () => void;
  resumeScroll: () => void;
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const pauseScroll = useCallback(() => {
    locks.current += 1;
    if (locks.current > 1) return;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const resumeScroll = useCallback(() => {
    if (locks.current === 0) return;
    locks.current -= 1;
    if (locks.current > 0) return;
    document.documentElement.style.overflow = "";
    lenisRef.current?.start();
  }, []);

  const scrollTo = useCallback<ScrollContextValue["scrollTo"]>((target, offset = 0) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.6 });
      return;
    }
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    const top = typeof el === "number" ? el : el ? el.getBoundingClientRect().top + window.scrollY : 0;
    window.scrollTo({ top: top + offset });
  }, []);

  const value = useMemo(() => ({ pauseScroll, resumeScroll, scrollTo }), [pauseScroll, resumeScroll, scrollTo]);

  return (
    <ScrollContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ScrollContext.Provider>
  );
}

export function useScrollControl() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollControl debe usarse dentro de <SmoothScroll>");
  return ctx;
}
