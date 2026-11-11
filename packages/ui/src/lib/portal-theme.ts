"use client";

import { useLayoutEffect, useRef, useState } from "react";

export type PortalTheme = {
  accent?: string;
  mode?: string;
};

function themeAt(anchor: HTMLElement | null): PortalTheme {
  let current = anchor?.parentElement ?? null;
  let accent: string | undefined;
  let mode: string | undefined;

  while (current && (!accent || !mode)) {
    accent ??= current.getAttribute("data-marisma-accent") ?? undefined;
    mode ??= current.getAttribute("data-marisma-mode") ?? undefined;
    current = current.parentElement;
  }

  return { accent, mode };
}

/** Mirrors the nearest Marisma theme onto content moved to document.body. */
export function usePortalTheme() {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const [theme, setTheme] = useState<PortalTheme>({});

  useLayoutEffect(() => {
    const update = () => setTheme(themeAt(anchorRef.current));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributeFilter: ["data-marisma-accent", "data-marisma-mode"],
      attributes: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, []);

  return { anchorRef, theme };
}
