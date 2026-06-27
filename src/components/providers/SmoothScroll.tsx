"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Fallback nativo: sem Lenis quando o usuário prefere menos movimento.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    // Resolve um href em um seletor de âncora same-page ("#id"), ou null.
    function resolveHash(href: string | null): string | null {
      if (!href) return null;
      let hash = "";
      if (href.startsWith("#")) {
        hash = href;
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        hash = href.slice(1);
      }
      if (!hash || hash === "#") return null;
      return hash;
    }

    // Handler global: intercepta cliques em âncoras same-page e usa o Lenis.
    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const hash = resolveHash(anchor.getAttribute("href"));
      if (!hash) return;
      let el: Element | null = null;
      try {
        el = document.querySelector(hash);
      } catch {
        return;
      }
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement);
      window.history.pushState(null, "", hash);
    }

    document.addEventListener("click", onClick);

    // Hash no carregamento inicial: rola suavemente até o alvo.
    if (window.location.hash) {
      const hash = window.location.hash;
      requestAnimationFrame(() => {
        let el: Element | null = null;
        try {
          el = document.querySelector(hash);
        } catch {
          el = null;
        }
        if (el) lenis.scrollTo(el as HTMLElement, { immediate: true });
      });
    }

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
