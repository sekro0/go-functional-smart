"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollControl } from "@/components/providers/SmoothScroll";
import { sheet } from "@/data/content";
import { media } from "@/data/media";
import { products } from "@/data/products";
import { formatARS } from "@/lib/format";
import { EASE_KOSEK } from "@/lib/motion";
import type { Product, ProductId } from "@/types/catalog";

type Tab = "nutrition" | "protocol" | "synergy";

interface ProductSheetProps {
  productId: ProductId | null;
  onClose: () => void;
  onSelect: (id: ProductId) => void;
}

export function ProductSheet({ productId, onClose, onSelect }: ProductSheetProps) {
  const { pauseScroll, resumeScroll } = useScrollControl();
  const product = productId ? products[productId] : null;
  const open = Boolean(product);

  useEffect(() => {
    if (!open) return;
    pauseScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      resumeScroll();
    };
  }, [open, onClose, pauseScroll, resumeScroll]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div key="sheet" className="fixed inset-0 z-[60]" initial="closed" animate="open" exit="closed">
          <motion.button
            type="button"
            aria-label={sheet.close}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40"
            variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
            transition={{ duration: 0.5 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col bg-card"
            variants={{ open: { x: 0 }, closed: { x: "100%" } }}
            transition={{ duration: 0.8, ease: EASE_KOSEK }}
          >
            <SheetBody key={product.id} product={product} onClose={onClose} onSelect={onSelect} />
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SheetBody({ product, onClose, onSelect }: { product: Product; onClose: () => void; onSelect: (id: ProductId) => void }) {
  const [tab, setTab] = useState<Tab>("nutrition");
  const [img, setImg] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const gallery = media[product.mediaKey].gallery ?? [];
  const current = gallery[img];

  useEffect(() => closeRef.current?.focus(), []);

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: "nutrition", label: sheet.tabs.nutrition, show: true },
    { id: "protocol", label: sheet.tabs.protocol, show: Boolean(product.protocol) },
    { id: "synergy", label: sheet.tabs.synergy, show: Boolean(product.synergy || product.faqs.length) },
  ];

  return (
    <>
      <div className="flex items-center justify-between border-b border-hairline px-6 py-4 md:px-8">
        <span className="label-mono text-ink-secondary">
          {product.index} — {product.code}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} aria-label={sheet.close} className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition-colors hover:bg-ink hover:text-canvas">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
        {current && (
          <div className="px-6 pt-6 md:px-8">
            <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ backgroundColor: product.theme?.bg ?? "var(--bg-surface)" }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.src}
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(0 0 0 100%)" }}
                  animate={{ clipPath: "inset(0 0 0 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE_KOSEK }}
                >
                  <Image src={current.src} alt={current.alt} fill sizes="(min-width: 640px) 36rem, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2" role="tablist" aria-label={sheet.galleryLabel}>
                {gallery.map((g, i) => (
                  <button
                    key={g.src}
                    type="button"
                    role="tab"
                    aria-selected={i === img}
                    onClick={() => setImg(i)}
                    className={`label-mono rounded-full border px-3 py-1.5 text-[10px] transition-colors ${i === img ? "border-ink bg-ink text-canvas" : "border-hairline text-ink-secondary hover:text-ink"}`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="px-6 pt-8 md:px-8">
          <h2 className="text-display text-5xl">{product.name}</h2>
          {product.coBrand && <p className="mt-2 font-serif text-lg italic text-ink-secondary">{product.coBrand}</p>}
          <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">{product.tagline}</p>
          {product.format && <p className="mt-4 font-mono text-[12px]">{product.format}</p>}
        </div>

        <div className="sticky top-0 z-10 mt-8 border-y border-hairline bg-card px-6 md:px-8">
          <div className="flex gap-6" role="tablist">
            {tabs
              .filter((t) => t.show)
              .map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative py-4 text-[13px] transition-colors ${tab === t.id ? "text-ink" : "text-ink-secondary hover:text-ink"}`}
                >
                  {t.label}
                  {tab === t.id && <motion.span layoutId="sheet-tab" className="absolute inset-x-0 -bottom-px h-px bg-ink" transition={{ duration: 0.5, ease: EASE_KOSEK }} />}
                </button>
              ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className="px-6 py-8 md:px-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_KOSEK }}
          >
            {tab === "nutrition" && (
              <>
                <p className="label-mono text-ink-secondary">{sheet.composition}</p>
                <p className="mt-3 text-[15px] leading-relaxed">{product.ingredients}</p>
                {product.nutrition && (
                  <table className="mt-8 w-full border-collapse">
                    <caption className="label-mono pb-3 text-left text-ink-secondary">{product.nutrition.serving}</caption>
                    <tbody>
                      {product.nutrition.rows.map((r) => (
                        <tr key={r.label} className="border-t border-hairline">
                          <th className="py-3.5 pr-4 text-left align-top text-[14px] font-normal">
                            {r.label}
                            {r.detail && <span className="mt-1 block text-[12px] text-ink-secondary">{r.detail}</span>}
                          </th>
                          <td className="py-3.5 text-right align-top font-mono text-[14px] tabular-nums">{r.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <p className="mt-6 label-mono text-[10px] text-ink-secondary">{sheet.certifications}</p>
              </>
            )}

            {tab === "protocol" && product.protocol && (
              <>
                <p className="label-mono text-ink-secondary">{sheet.protocolMoment}</p>
                <p className="mt-3 font-serif text-2xl">{product.protocol.moment}</p>
                <dl className="mt-8">
                  {product.protocol.steps.map((s) => (
                    <div key={s.label} className="grid grid-cols-3 gap-4 border-t border-hairline py-4">
                      <dt className="font-mono text-[12px] text-ink-secondary">{s.label}</dt>
                      <dd className="col-span-2 text-[14px] leading-relaxed">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                {product.protocol.rules.map((r) => (
                  <p key={r} className="mt-6 border-l border-accent-amber pl-4 text-[14px] leading-relaxed">
                    <span className="label-mono block pb-1 text-accent-amber">{sheet.rules}</span>
                    {r}
                  </p>
                ))}
              </>
            )}

            {tab === "synergy" && (
              <>
                {product.synergy && (
                  <>
                    <p className="label-mono text-ink-secondary">{sheet.pairsWith}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.synergy.pairsWith.map((id) => (
                        <button key={id} type="button" onClick={() => onSelect(id)} className="link-underline font-serif text-xl">
                          {products[id].name}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-[14px] leading-relaxed text-ink-secondary">{product.synergy.note}</p>
                  </>
                )}
                {product.faqs.length > 0 && (
                  <>
                    <p className="mt-10 label-mono text-ink-secondary">{sheet.faqs}</p>
                    <dl className="mt-3">
                      {product.faqs.map((f) => (
                        <div key={f.question} className="border-t border-hairline py-5">
                          <dt className="font-serif text-lg">{f.question}</dt>
                          <dd className="mt-2 text-[14px] leading-relaxed text-ink-secondary">{f.answer}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-hairline bg-card px-6 py-4 md:px-8">
        <div>
          <p className="font-mono text-lg tabular-nums">{formatARS(product.price.list)}</p>
          <p className="font-mono text-[11px] text-ink-secondary tabular-nums">
            {formatARS(product.price.transfer)} · {sheet.transferLabel}
          </p>
        </div>
        <a href={product.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas">
          {sheet.buyCta}
          <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </>
  );
}
