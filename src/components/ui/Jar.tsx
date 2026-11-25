import Image from "next/image";
import type { Product } from "@/types/catalog";

interface JarProps {
  product: Product;
  className?: string;
  sizes?: string;
  preload?: boolean;
}

export function Jar({ product, className, sizes = "(min-width: 1024px) 22vw, 45vw", preload }: JarProps) {
  if (!product.cutout) return null;
  const { src, width, height } = product.cutout;
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={`${product.name}${product.coBrand ? ` ${product.coBrand}` : ""}`}
      sizes={sizes}
      preload={preload}
      draggable={false}
      className={`pointer-events-none h-auto w-full select-none ${className ?? ""}`}
    />
  );
}
