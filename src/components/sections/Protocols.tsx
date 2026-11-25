"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Jar } from "@/components/ui/Jar";
import { protocolBuilder, sheet } from "@/data/content";
import { comboList, products } from "@/data/products";
import { formatARS } from "@/lib/format";
import { DESKTOP, gsap, MOTION_OK, SplitText, useGSAP } from "@/lib/gsap";

export function Protocols() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = SplitText.create("[data-title]", { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 110,
          stagger: 0.08,
          duration: 1.3,
          scrollTrigger: { trigger: "[data-title]", start: "top 85%" },
        });

        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next && window.matchMedia(DESKTOP).matches) {
            const st = { trigger: next, start: "top bottom", end: "top 12%", scrub: true };
            gsap.to(card.querySelector("[data-card-inner]"), { scale: 0.9 + i * 0.02, ease: "none", scrollTrigger: st });
            gsap.to(card.querySelector("[data-shade]"), { opacity: 0.35, ease: "none", scrollTrigger: { ...st } });
          }
          gsap
            .timeline({ scrollTrigger: { trigger: card, start: "top 70%" } })
            .from(card.querySelectorAll("[data-combo-jar]"), { yPercent: 35, autoAlpha: 0, stagger: 0.12, duration: 1.4 })
            .from(card.querySelectorAll("[data-plus]"), { scale: 0, rotate: -90, stagger: 0.12, duration: 1 }, 0.3)
            .from(card.querySelectorAll("[data-syn]"), { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.4);
        });

        return () => split.revert();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="protocolo" className="relative bg-canvas pt-28 pb-24 md:pt-40 md:pb-40">
      <div className="container-editorial grid grid-cols-12 gap-x-6">
        <p className="col-span-12 label-mono text-ink-secondary lg:col-span-3">{protocolBuilder.eyebrow}</p>
        <div className="col-span-12 mt-6 lg:col-span-9 lg:mt-0">
          <h2 data-title className="text-display max-w-4xl text-[clamp(2.75rem,5.6vw,6rem)]">
            {protocolBuilder.title}
          </h2>
          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ink-secondary">{protocolBuilder.body}</p>
        </div>
      </div>

      <div className="container-editorial mt-20 md:mt-28">
        {comboList.map((combo, i) => {
          const dark = combo.id === "combo-go";
          const included = combo.includes.map((id) => products[id]);
          return (
            <div
              key={combo.id}
              data-card
              className="relative mb-8 last:mb-0 lg:sticky"
              style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
            >
              <div
                data-card-inner
                className={`relative origin-top overflow-hidden rounded-3xl border will-change-transform ${
                  dark ? "border-transparent bg-dark text-ink-on-dark" : "border-hairline bg-card text-ink"
                }`}
              >
                <div data-shade className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0" />
                <div className="grid lg:min-h-[78svh] lg:grid-cols-12">
                  <div className="flex flex-col p-6 md:p-10 lg:col-span-6 lg:p-12">
                    <div className="flex items-center justify-between">
                      <span className="label-mono opacity-60">PROTOCOLO 0{i + 1}</span>
                      {combo.price.discountLabel && (
                        <span className="label-mono text-accent-amber">{combo.price.discountLabel}</span>
                      )}
                    </div>
                    <h3 className="text-display mt-8 text-[clamp(2.25rem,3.8vw,4rem)]">{combo.name}</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-75">{combo.objective}</p>

                    <table className="mt-10 w-full border-collapse text-left">
                      <tbody>
                        {combo.schedule.map((slot) => (
                          <tr key={`${slot.moment}-${slot.productId}`} className={`border-t ${dark ? "border-hairline-dark" : "border-hairline"}`}>
                            <td className="w-20 py-3.5 align-top font-mono text-[12px]">{slot.moment}</td>
                            <td className="py-3.5 pr-4 align-top text-sm">{products[slot.productId].name}</td>
                            <td className="hidden py-3.5 align-top text-[13px] opacity-70 sm:table-cell">{slot.instruction}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className={`mt-auto border-t pt-6 ${dark ? "border-hairline-dark" : "border-hairline"}`}>
                      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                        <div>
                          <p className="flex items-baseline gap-3">
                            <span className="font-mono text-3xl tabular-nums">{formatARS(combo.price.list)}</span>
                            {combo.price.previous && (
                              <span className="font-mono text-sm tabular-nums line-through opacity-50">{formatARS(combo.price.previous)}</span>
                            )}
                          </p>
                          <p className="mt-2 font-mono text-[12px] opacity-70">
                            {sheet.installments(combo.installments.count, formatARS(combo.installments.amount))} ·{" "}
                            {formatARS(combo.price.transfer)} transferencia
                          </p>
                        </div>
                        <a
                          href={combo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium ${
                            dark ? "bg-ink-on-dark text-dark" : "bg-ink text-canvas"
                          }`}
                        >
                          {protocolBuilder.checkoutCta}
                          <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                      {combo.note && <p className="mt-4 text-[12px] leading-relaxed opacity-60">{combo.note}</p>}
                    </div>
                  </div>

                  <div className={`flex flex-col p-6 md:p-10 lg:col-span-6 lg:p-12 ${dark ? "bg-white/[0.04]" : "bg-surface"}`}>
                    <div className="flex flex-1 items-end justify-center gap-[3%] pt-4 pb-8">
                      {included.map((p, j) => (
                        <div key={p.id} className="contents">
                          {j > 0 && (
                            <span data-plus className="mb-[8%] self-end font-serif text-3xl font-light opacity-50">
                              +
                            </span>
                          )}
                          <div data-combo-jar className={p.id === "citrato-magnesio-500" ? "w-[19%] max-w-[140px]" : "w-[32%] max-w-[220px]"}>
                            <Jar product={p} sizes="(min-width: 1024px) 13vw, 28vw" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={`border-t pt-6 ${dark ? "border-hairline-dark" : "border-hairline"}`}>
                      <p data-syn className="label-mono opacity-60">{protocolBuilder.synergyLabel}</p>
                      <ul className="mt-5 space-y-6">
                        {combo.synergies.map((s) => (
                          <li key={s.title} data-syn className="grid gap-2 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-6">
                            <div>
                              <p className="font-mono text-[11px] tracking-wide uppercase opacity-60">
                                {s.label}
                              </p>
                              <p className="mt-1 font-serif text-xl leading-tight">{s.title}</p>
                            </div>
                            <p className="text-[13.5px] leading-relaxed opacity-75">{s.body}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
