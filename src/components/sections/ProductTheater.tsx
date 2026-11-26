"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { Jar } from "@/components/ui/Jar";
import { catalog, theater } from "@/data/content";
import { coreProducts } from "@/data/products";
import { formatARS } from "@/lib/format";
import { ANCHOR_EVENT } from "@/components/ui/AnchorLink";
import { DESKTOP, gsap, MOTION_OK, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import type { ProductId, ProductTheme } from "@/types/catalog";

const WORDS: Record<string, string> = {
  "colageno-puro": "Colágeno",
  "vitamina-c-pura": "Vitamina C",
  "citrato-magnesio-500": "Magnesio",
};

const fmtSpec = (n: number) => Math.round(n).toLocaleString("es-AR");

export function ProductTheater({ onOpenProduct }: { onOpenProduct: (id: ProductId) => void }) {
  const root = useRef<HTMLElement>(null);
  const total = coreProducts.length;

  useGSAP(
    () => {
      const section = root.current!;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]", section);
      const part = (i: number, key: string) => slides[i].querySelector<HTMLElement>(`[data-${key}]`)!;
      const counters = slides.map((s) => s.querySelector<HTMLElement>("[data-count]")!);
      const zero = () => counters.forEach((c) => (c.textContent = "0"));
      const mm = gsap.matchMedia();

      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        section.dataset.pinned = "true";
        zero();

        const splits = slides.map((s) => SplitText.create(s.querySelector("[data-name]"), { type: "lines", mask: "lines", linesClass: "split-line" }));
        const paint = (a: ProductTheme, b: ProductTheme, p: number) => {
          section.style.setProperty("--bg", gsap.utils.interpolate(a.bg, b.bg, p));
          section.style.setProperty("--fg", gsap.utils.interpolate(a.fg, b.fg, p));
          section.style.setProperty("--accent", gsap.utils.interpolate(a.accent, b.accent, p));
        };
        paint(coreProducts[0].theme!, coreProducts[0].theme!, 0);
        const values = coreProducts.map(() => ({ v: 0 }));
        const render = (i: number) => () => (counters[i].textContent = fmtSpec(values[i].v));

        slides.forEach((_, i) => {
          if (i === 0) return;
          gsap.set([part(i, "info"), part(i, "spec")], { autoAlpha: 0 });
          gsap.set(part(i, "jar"), { yPercent: 110, rotate: 10, autoAlpha: 0 });
          gsap.set(part(i, "word"), { autoAlpha: 0 });
          gsap.set(part(i, "fill"), { clipPath: "circle(0% at 50% 100%)" });
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * (total + 0.4)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const intro = gsap
          .timeline({ paused: true })
          .fromTo(part(0, "jar"), { yPercent: 18, scale: 0.9, autoAlpha: 0 }, { yPercent: 0, scale: 1, autoAlpha: 1, duration: 1.4, ease: "expo.out" })
          .to(values[0], { v: coreProducts[0].keySpec!.value, duration: 1.4, ease: "power3.out", onUpdate: render(0) }, 0.1);
        const introTrigger = ScrollTrigger.create({ trigger: section, start: "top 70%", once: true, onEnter: () => intro.play() });
        const onArrive = (e: Event) => {
          if ((e as CustomEvent<string>).detail === "#formulas") intro.progress(1);
        };
        window.addEventListener(ANCHOR_EVENT, onArrive);

        slides.forEach((_, i) => {
          tl.fromTo(part(i, "word"), { xPercent: 18 }, { xPercent: -18, duration: 1.6 }, Math.max(0, i - 0.6));
          if (i === 0) return;
          const at = i - 0.25;
          const theme = coreProducts[i].theme!;
          const from = coreProducts[i - 1].theme!;
          const prev = i - 1;

          tl.fromTo(part(prev, "jar"), { yPercent: 0, rotate: 0, scale: 1, autoAlpha: 1 }, { yPercent: -95, rotate: -9, autoAlpha: 0, duration: 0.5, ease: "power2.in", immediateRender: false }, at)
            .to([part(prev, "info"), part(prev, "spec")], { yPercent: -12, autoAlpha: 0, duration: 0.3 }, at)
            .to(part(prev, "word"), { autoAlpha: 0, duration: 0.3 }, at + 0.1)
            .to(part(i, "fill"), { clipPath: "circle(150% at 50% 100%)", duration: 0.6, ease: "power2.in" }, at + 0.05)
            .to({ p: 0 }, { p: 1, duration: 0.55, onUpdate() { paint(from, theme, this.progress() > 0.5 ? 1 : 0); } }, at + 0.05)
            .to("[data-digits]", { yPercent: (-100 / total) * i, duration: 0.45, ease: "power2.inOut" }, at + 0.1)
            .to(part(i, "jar"), { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.55, ease: "power2.out" }, at + 0.3)
            .to(part(i, "word"), { autoAlpha: 1, duration: 0.3 }, at + 0.3)
            .fromTo(part(i, "info"), { yPercent: 12, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.35 }, at + 0.4)
            .from(splits[i].lines, { yPercent: 110, stagger: 0.05, duration: 0.35 }, at + 0.4)
            .fromTo(part(i, "spec"), { yPercent: 12, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.35 }, at + 0.45)
            .to(values[i], { v: coreProducts[i].keySpec!.value, duration: 0.4, onUpdate: render(i) }, at + 0.45);
        });

        tl.to("[data-progress]", { scaleX: 1, duration: tl.duration() }, 0);

        return () => {
          window.removeEventListener(ANCHOR_EVENT, onArrive);
          introTrigger.kill();
          splits.forEach((s) => s.revert());
          delete section.dataset.pinned;
        };
      });

      mm.add(`(max-width: 1023px) and ${MOTION_OK}`, () => {
        zero();
        let first: gsap.core.Timeline | undefined;
        slides.forEach((slide, i) => {
          const value = { v: 0 };
          const t = gsap
            .timeline({ scrollTrigger: { trigger: slide, start: "top 70%" } })
            .from(part(i, "jar"), { yPercent: 30, rotate: 6, autoAlpha: 0, duration: 1.4 })
            .to(value, { v: coreProducts[i].keySpec!.value, duration: 1.4, ease: "power3.out", onUpdate: () => (counters[i].textContent = fmtSpec(value.v)) }, 0.1)
            .from(part(i, "info"), { y: 30, autoAlpha: 0, duration: 1.2 }, 0.2);
          if (i === 0) first = t;
          gsap.fromTo(part(i, "word"), { xPercent: 8 }, { xPercent: -14, ease: "none", scrollTrigger: { trigger: slide, start: "top bottom", end: "bottom top", scrub: true } });
        });
        const onArrive = (e: Event) => {
          if ((e as CustomEvent<string>).detail === "#formulas") first?.progress(1);
        };
        window.addEventListener(ANCHOR_EVENT, onArrive);
        return () => window.removeEventListener(ANCHOR_EVENT, onArrive);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        counters.forEach((c, i) => (c.textContent = fmtSpec(coreProducts[i].keySpec!.value)));
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="formulas"
      style={{ "--bg": coreProducts[0].theme!.bg, "--fg": coreProducts[0].theme!.fg, "--accent": coreProducts[0].theme!.accent } as CSSProperties}
      className="group/t relative overflow-hidden bg-[var(--bg,transparent)] text-[var(--fg,inherit)] data-[pinned=true]:h-svh"
    >
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden pt-24 group-data-[pinned=true]/t:block">
        <div className="container-editorial flex items-center justify-between">
          <span className="label-mono">{theater.eyebrow}</span>
          <span className="flex items-center gap-2 font-mono text-[13px] tabular-nums">
            <span className="relative inline-block h-[1.2em] overflow-hidden">
              <span data-digits className="flex flex-col leading-[1.2em]">
                {coreProducts.map((p) => (
                  <span key={p.id}>{p.index}</span>
                ))}
              </span>
            </span>
            <span className="opacity-50">/ 0{total}</span>
          </span>
        </div>
      </header>

      <div className="absolute inset-x-0 bottom-0 z-30 hidden h-px bg-[var(--fg)]/15 group-data-[pinned=true]/t:block">
        <div data-progress className="h-full origin-left scale-x-0 bg-[var(--fg)]" />
      </div>

      {coreProducts.map((product) => {
        const theme = product.theme!;
        const spec = product.keySpec!;
        return (
          <article
            key={product.id}
            data-slide
            aria-label={product.name}
            style={{ "--own-bg": theme.bg, "--own-fg": theme.fg, "--own-accent": theme.accent } as CSSProperties}
            className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[var(--sbg)] text-[var(--sfg)] [--sacc:var(--own-accent)] [--sbg:var(--own-bg)] [--sfg:var(--own-fg)] group-data-[pinned=true]/t:absolute group-data-[pinned=true]/t:inset-0 group-data-[pinned=true]/t:bg-transparent"
          >
            <div data-fill aria-hidden className="absolute inset-0 hidden bg-[var(--own-bg)] group-data-[pinned=true]/t:block" />
            <p
              data-word
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[16%] text-center font-serif text-[clamp(7rem,24vw,26rem)] leading-none font-light tracking-[-0.05em] whitespace-nowrap text-[var(--sacc)] group-data-[pinned=true]/t:top-1/2 group-data-[pinned=true]/t:-translate-y-1/2"
            >
              <em className="opacity-45">{WORDS[product.id]}</em>
            </p>

            <div className="container-editorial relative z-10 grid flex-1 grid-cols-12 items-end gap-x-6 pt-28 pb-14 lg:items-center lg:pt-24 lg:pb-16">
              <div
                data-jar
                className={`order-1 col-span-12 mx-auto lg:order-2 lg:col-span-4 lg:self-center ${product.id === "citrato-magnesio-500" ? "w-[40%] max-w-[230px] sm:w-[30%] lg:w-[54%] lg:max-w-[260px]" : "w-[58%] max-w-[340px] sm:w-[42%] lg:w-[78%] lg:max-w-[380px]"}`}
              >
                <Jar product={product} sizes="(min-width: 1024px) 26vw, 60vw" />
              </div>

              <div data-info className="order-2 col-span-12 mt-10 lg:order-1 lg:col-span-4 lg:mt-0 lg:self-end">
                <p className="label-mono opacity-70">
                  {product.index} — {product.code}
                </p>
                <h2 data-name className="text-display mt-4 text-[clamp(2.6rem,4.6vw,4.75rem)]">
                  {product.name}
                </h2>
                {product.coBrand && <p className="mt-2 font-serif text-xl italic opacity-80">{product.coBrand}</p>}
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed opacity-80">{product.tagline}</p>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
                  {product.attributes.map((a) => (
                    <li key={a} className="label-mono text-[10px] opacity-70">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-spec className="order-3 col-span-12 mt-10 lg:col-span-4 lg:mt-0 lg:self-end lg:justify-self-end lg:text-right">
                <p className="label-mono opacity-70">{theater.specLabel}</p>
                <p className="mt-2 flex items-baseline gap-2 lg:justify-end">
                  <span data-count className="font-mono text-[clamp(3.5rem,6vw,6rem)] leading-none font-light tracking-tight tabular-nums">
                    {fmtSpec(spec.value)}
                  </span>
                  <span className="font-mono text-2xl">{spec.unit}</span>
                </p>
                <p className="mt-2 text-[13px] opacity-75">{spec.label}</p>

                <div className="mt-8 border-t border-current/20 pt-5">
                  <p className="flex items-baseline justify-between gap-6 lg:justify-end">
                    <span className="label-mono text-[10px] opacity-60">{catalog.listLabel}</span>
                    <span className="font-mono text-lg tabular-nums">{formatARS(product.price.list)}</span>
                  </p>
                  <p className="mt-1 flex items-baseline justify-between gap-6 lg:justify-end">
                    <span className="label-mono text-[10px] opacity-60">{catalog.transferLabel}</span>
                    <span className="font-mono text-lg tabular-nums">{formatARS(product.price.transfer)}</span>
                  </p>
                </div>

                <div className="mt-6 flex gap-3 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product.id)}
                    className="group inline-flex items-center gap-2 rounded-full border border-current/30 px-5 py-3 text-sm transition-colors duration-500 hover:bg-[var(--sfg)] hover:text-[var(--sbg)]"
                  >
                    <Plus size={14} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:rotate-90" />
                    {theater.detailCta}
                  </button>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--sfg)] px-5 py-3 text-sm font-medium text-[var(--sbg)]"
                  >
                    {theater.buyCta}
                    <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
