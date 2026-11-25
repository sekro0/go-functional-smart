"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { catalog } from "@/data/content";
import { media } from "@/data/media";
import { complementProducts } from "@/data/products";
import { formatARS } from "@/lib/format";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { ProductId } from "@/types/catalog";

export function Complement({ onOpenProduct }: { onOpenProduct: (id: ProductId) => void }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from("[data-row]", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-canvas py-16 md:py-20">
      <div className="container-editorial">
        {complementProducts.map((p) => {
          const asset = media[p.mediaKey];
          return (
            <div key={p.id} data-row className="grid grid-cols-12 items-center gap-6 border-y border-hairline py-6">
              <p className="col-span-12 label-mono text-ink-secondary md:col-span-2">{catalog.complementLabel}</p>
              {asset.src && (
                <div className="relative col-span-3 aspect-square overflow-hidden rounded-xl bg-white md:col-span-1">
                  <Image src={asset.src} alt={asset.alt} fill sizes="120px" className="object-contain mix-blend-multiply" />
                </div>
              )}
              <div className="col-span-9 md:col-span-4">
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <p className="mt-1 text-[14px] text-ink-secondary">
                  {p.tagline} {p.format}
                </p>
              </div>
              <p className="col-span-6 font-mono text-lg tabular-nums md:col-span-2 md:text-right">{formatARS(p.price.list)}</p>
              <div className="col-span-6 flex justify-end gap-4 md:col-span-3">
                <button type="button" onClick={() => onOpenProduct(p.id)} className="link-underline text-sm">
                  {catalog.detailCta}
                </button>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium">
                  {catalog.buyShort}
                  <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-500 ease-kosek group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
