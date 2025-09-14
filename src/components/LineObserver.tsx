"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function LineObserver() {
  const pathname = usePathname();
  const observed = useRef<WeakSet<Element>>(new WeakSet());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("revealed");
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    const observeNodes = (selector: string) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (!observed.current.has(el)) {
          observed.current.add(el);
          observer.observe(el);
        }
      });
    };

    // 1) Observe ONLY .custom-line that are NOT .custom-linee at load
    observeNodes(".custom-line:not(.custom-linee)");

    // 2) On first scroll (your virtual scroll event), start observing .custom-linee
    const onFirstVirtualScroll = () => {
      observeNodes(".custom-line.custom-linee");
    };
    window.addEventListener("virtualscroll", onFirstVirtualScroll, { once: true });

    // (Optional) Fallback for environments without your provider
    const onFirstNativeScroll = () => {
      observeNodes(".custom-line.custom-linee");
      window.removeEventListener("scroll", onFirstNativeScroll);
    };
    window.addEventListener("scroll", onFirstNativeScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("virtualscroll", onFirstVirtualScroll);
      window.removeEventListener("scroll", onFirstNativeScroll);
    };
  }, [pathname]);

  return null;
}
