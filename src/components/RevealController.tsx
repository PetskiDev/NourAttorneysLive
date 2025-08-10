"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  selector?: string; // targets (headings + .accent-text)
  rootMargin?: string;
  threshold?: number;
  deadZonePx?: number;  // 100px by default
  fadeZonePx?: number;  // 100px by default
};

function isElement(n: Node): n is Element {
  return n.nodeType === 1;
}

type VirtualScrollDetail = { y: number };

type ElState = {
  enterY: number;         // where the element first entered the viewport
  fullRevealY: number;    // enterY + dead + fade (computed)
  hasReachedFull: boolean;
};

export default function RevealController({
  selector = "h1,h2,h3,h4,h5,h6,.accent-text",
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.01,
  deadZonePx = 100,
  fadeZonePx = 100,
}: Props) {
  const ioRef = useRef<IntersectionObserver | null>(null);
  const moRef = useRef<MutationObserver | null>(null);

  const lastYRef = useRef(0);
  const inViewRef = useRef(new Set<Element>());
  const stateRef = useRef(new WeakMap<Element, ElState>());

  const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

  const opacityForward = (y: number, st: ElState) => {
    const start = st.enterY + deadZonePx;
    const end = start + fadeZonePx;
    if (y <= start) return 0;
    if (y >= end) return 1;
    return clamp01((y - start) / fadeZonePx);
  };

  const opacityReverse = (y: number, st: ElState) => {
    // Only applies after full reveal
    const start = st.fullRevealY - deadZonePx;       // hold at 1 above this
    const end = start - fadeZonePx;                  // 0 below this
    if (y >= start) return 1;
    if (y <= end) return 0;
    // y in [end, start] → 0..1
    return clamp01((y - end) / fadeZonePx);
  };

  const applyOne = (el: Element, y: number, dirNow: 1 | -1 | 0) => {
    if (!inViewRef.current.has(el)) return;
    const st = stateRef.current.get(el);
    if (!st) return;

    // Choose curve based on direction and whether it ever fully revealed
    let opacity: number;
    if (dirNow < 0 && st.hasReachedFull) {
      opacity = opacityReverse(y, st);
    } else {
      opacity = opacityForward(y, st);
    }

    // If it reached full on this tick, record once
    if (!st.hasReachedFull && opacity >= 1) {
      st.hasReachedFull = true;
      st.fullRevealY = st.enterY + deadZonePx + fadeZonePx;
      stateRef.current.set(el, st);
    }

    (el as HTMLElement).style.opacity = String(opacity);
  };

  const updateAll = (y: number, dirNow: 1 | -1 | 0) => {
    inViewRef.current.forEach((el) => applyOne(el, y, dirNow));
  };

  useEffect(() => {
    const contentRoot = document.querySelector<HTMLElement>("[data-reveal-content]");
    if (!contentRoot) return;

    // Listen to virtual scroll from SmoothScrollProvider
    const onVirtualScroll = (evt: Event) => {
      const e = evt as CustomEvent<VirtualScrollDetail>;
      const y = e?.detail?.y ?? lastYRef.current;
      const dy = y - lastYRef.current;
      const dirNow: 1 | -1 | 0 = dy > 0 ? 1 : dy < 0 ? -1 : 0;
      lastYRef.current = y;
      updateAll(y, dirNow);
    };
    window.addEventListener("virtualscroll", onVirtualScroll as EventListener);

    // Intersection: mark enter/exit and set anchors
    ioRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (entry.isIntersecting) {
            inViewRef.current.add(el);
            // (Re)anchor on each entry
            const enterY = lastYRef.current;
            stateRef.current.set(el, {
              enterY,
              fullRevealY: enterY + deadZonePx + fadeZonePx,
              hasReachedFull: false,
            });
            // Ensure hidden on entry; scroll handler will drive from there
            (el as HTMLElement).style.opacity = "0";
          } else {
            inViewRef.current.delete(el);
            stateRef.current.delete(el);
            (el as HTMLElement).style.opacity = "0";
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    // Observe current targets
    contentRoot.querySelectorAll(selector).forEach((el) => ioRef.current?.observe(el));

    // Watch DOM changes (client-side routing)
    moRef.current = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!isElement(n)) return;
          if (n.matches(selector)) ioRef.current?.observe(n);
          n.querySelectorAll?.(selector).forEach((el) => ioRef.current?.observe(el));
        });
        m.removedNodes.forEach((n) => {
          if (!isElement(n)) return;
          if (n.matches(selector)) ioRef.current?.unobserve(n);
          n.querySelectorAll?.(selector).forEach((el) => ioRef.current?.unobserve(el));
        });
      }
    });
    moRef.current.observe(contentRoot, { childList: true, subtree: true });

    // Initial pass (dir=0 just keeps current opacity)
    updateAll(lastYRef.current, 0);

    return () => {
      window.removeEventListener("virtualscroll", onVirtualScroll as EventListener);
      ioRef.current?.disconnect();
      moRef.current?.disconnect();
      ioRef.current = null;
      moRef.current = null;
      inViewRef.current.clear();
    };
  }, [selector, rootMargin, threshold, deadZonePx, fadeZonePx]);

  return null;
}
