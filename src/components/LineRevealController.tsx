"use client";

import { useEffect, useRef } from "react";

type Props = {
  selector?: string; // default ".line"
  durationMs?: number;
  offsetPx?: number;
  threshold?: number;
};

export default function LineRevealController({
  selector = ".line",
  durationMs = 600,
  offsetPx = -10,
  threshold = 1, // 20% visible required
}: Props) {
  const elementsRef = useRef<Set<Element>>(new Set());

  const isInViewport = (el: Element) => {
    const r = el.getBoundingClientRect();
    const elementHeight = r.height;
    if (elementHeight <= 0) return false;

    const visiblePart = Math.max(
      0,
      Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0),
    );
    const visibleRatio = visiblePart / elementHeight;

    return visibleRatio >= threshold;
  };

  const applyInitialStyles = () => {
    elementsRef.current.forEach((el) => {
      setTimeout(() => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.opacity = "0";
        htmlEl.style.transform = `translateY(${offsetPx}px)`;
        htmlEl.style.transition = `opacity ${durationMs}ms ease, transform ${durationMs}ms ease`;
      }, 200);
    });
  };

  const updateOnVirtualScroll = () => {
    elementsRef.current.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.isConnected) return;

      if (isInViewport(htmlEl)) {
        // existing JS animation
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";

        // add class
        htmlEl.classList.add("revealed");
      }
    });
  };

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => elementsRef.current.add(el));

    applyInitialStyles();
    updateOnVirtualScroll();

    // 🔑 listen to SmoothScrollProvider's virtualscroll event
    window.addEventListener("virtualscroll", updateOnVirtualScroll);
    window.addEventListener("resize", updateOnVirtualScroll);

    return () => {
      window.removeEventListener("virtualscroll", updateOnVirtualScroll);
      window.removeEventListener("resize", updateOnVirtualScroll);
      elementsRef.current.clear();
    };
  }, [selector, durationMs, offsetPx, threshold]);

  return null;
}
