"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const scrollPositions = new Map<string, number>();

export function useScrollRestoration<T extends HTMLElement>() {
  const pathname = usePathname();
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Restore scroll when mounted
    const saved = scrollPositions.get(pathname);
    if (saved !== undefined) {
      el.scrollTop = saved;
    }

    const onScroll = () => {
      scrollPositions.set(pathname, el.scrollTop);
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [pathname, ref]);

  return ref;
}
