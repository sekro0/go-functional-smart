"use client";

import type { ComponentProps } from "react";
import { useScrollControl } from "@/components/providers/SmoothScroll";

type AnchorLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: `#${string}`;
  onNavigate?: () => void;
};

export function AnchorLink({ href, onNavigate, onClick, ...props }: AnchorLinkProps) {
  const { scrollTo } = useScrollControl();

  return (
    <a
      {...props}
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onNavigate?.();
        scrollTo(href, 0);
      }}
    />
  );
}
