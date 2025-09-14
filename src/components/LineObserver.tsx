"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LineObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // --- IO for regular lines ---
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("revealed");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    document
      .querySelectorAll<HTMLElement>(".custom-line:not(.custom-linee)")
      .forEach((el) => io.observe(el));

    // --- Scroll-gated reveal for .custom-linee ---
    const specials = Array.from(
      document.querySelectorAll<HTMLElement>(".custom-line.custom-linee")
    );
    const revealed = new WeakSet<Element>();

    const isVisible20 = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      if (r.bottom <= 0 || r.top >= vh || r.right <= 0 || r.left >= vw) return false;
      const visibleY = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      const ratioY = visibleY / Math.min(r.height || 1, vh);
      return ratioY >= 0.2;
    };

    let initialY: number | null = null;
    let hasUserScrolled = false;

    const tryReveal = () => {
      if (!hasUserScrolled) return;
      specials.forEach((el) => {
        if (revealed.has(el)) return;
        if (isVisible20(el)) {
          el.classList.add("revealed");
          revealed.add(el);
        }
      });
    };

    const onVirtual = (e: Event) => {
      const y = (e as CustomEvent).detail?.y ?? 0;
      if (initialY == null) {
        // Ignore the initial programmatic dispatch at mount
        initialY = y;
        return;
      }
      if (!hasUserScrolled && Math.abs(y - initialY) > 0.5) {
        hasUserScrolled = true;
      }
      tryReveal();
    };

    const onNativeScroll = () => {
      hasUserScrolled = true;
      tryReveal();
    };

    window.addEventListener("virtualscroll", onVirtual);
    window.addEventListener("scroll", onNativeScroll, { passive: true });

    // Also attempt once after mount (in case user already scrolled before effect attached)
    setTimeout(tryReveal, 0);

    return () => {
      io.disconnect();
      window.removeEventListener("virtualscroll", onVirtual);
      window.removeEventListener("scroll", onNativeScroll);
    };
  }, [pathname]);

  return null;
}
