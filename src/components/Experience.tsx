"use client";

import { useCallback, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Faq } from "@/components/sections/Faq";
import { GoReset } from "@/components/sections/GoReset";
import { Hero } from "@/components/sections/Hero";
import { Horizon } from "@/components/sections/Horizon";
import { Manifesto } from "@/components/sections/Manifesto";
import { ProductTheater } from "@/components/sections/ProductTheater";
import { Protocols } from "@/components/sections/Protocols";
import { ProductSheet } from "@/components/ui/ProductSheet";
import type { ProductId } from "@/types/catalog";

export function Experience() {
  const [active, setActive] = useState<ProductId | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <ProductTheater onOpenProduct={setActive} />
        <Protocols />
        <GoReset />
        <Horizon />
        <Faq />
      </main>
      <Footer />
      <ProductSheet productId={active} onClose={close} onSelect={setActive} />
    </>
  );
}
