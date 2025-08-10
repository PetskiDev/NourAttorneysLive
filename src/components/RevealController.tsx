"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Targets (headings + .accent-text by default) */
  selector?: string;
  /** IntersectionObserver config */
  rootMargin?: string;
  threshold?: number;

  /** Pixels after the anchor where opacity is held (no change) */
  deadZonePx?: number; // default 100
  /** Pixels over which opacity interpolates 0→1 (or 1→0 on reverse) */
  fadeZonePx?: number; // default 100
};

function isElement(n: Node): n is Element {
  return n.nodeType === 1;
}

type VirtualScrollDetail = { y: number };

type ElState = {
  /** Scroll Y when the element entered the viewport (forward anchor) */
  enterY: number;
  /** enterY + dead + fade; used for reverse hysteresis */
  fullRevealY: number;
  /** Has ever reached full opacity (1) since entering */
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
  /** Elements visible on mount → force opacity 1 forever (no animation) */
  const lockedRef = useRef(new WeakSet<Element>());

  const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

  // Forward (scrolling down): 0 until enterY+dead, then ramp to 1 over fadeZonePx
  const opacityForward = (y: number, st: ElState) => {
    const start = st.enterY + deadZonePx;
    const end = start + fadeZonePx;
    if (y <= start) return 0;
    if (y >= end) return 1;
    return clamp01((y - start) / fadeZonePx);
  };

  // Reverse (scrolling up) AFTER fully revealed:
  // hold at 1 until (fullRevealY - dead), then ramp to 0 over fadeZonePx
  const opacityReverse = (y: number, st: ElState) => {
    const start = st.fullRevealY - deadZonePx; // >= this ⇒ keep 1
    const end = start - fadeZonePx;            // <= this ⇒ 0
    if (y >= start) return 1;
    if (y <= end) return 0;
    // Map y ∈ [end, start] → 0..1
    return clamp01((y - end) / fadeZonePx);
  };

  const applyOne = (el: Element, y: number, dirNow: 1 | -1 | 0) => {
    if (!inViewRef.current.has(el)) return;
    if (lockedRef.current.has(el)) {
      (el as HTMLElement).style.opacity = "1";
      return;
    }
    const st = stateRef.current.get(el);
    if (!st) return;

    let opacity: number;
    if (dirNow < 0 && st.hasReachedFull) {
      // Upward fade (only if it previously reached full)
      opacity = opacityReverse(y, st);
    } else {
      // Downward fade
      opacity = opacityForward(y, st);
    }

    // Latch when it reaches full for the first time
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
            if (lockedRef.current.has(el)) {
              // Never animate locked elements
              (el as HTMLElement).style.opacity = "1";
              continue;
            }
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
            if (lockedRef.current.has(el)) {
              // Do not hide or clear locked elements
              continue;
            }
            stateRef.current.delete(el);
            (el as HTMLElement).style.opacity = "0";
          }
        }
      },
      { root: null, rootMargin, threshold }
    );

    // Observe current targets
    const targets = Array.from(contentRoot.querySelectorAll(selector));
    targets.forEach((el) => ioRef.current?.observe(el));

    // One-time initial reveal for items already in view on first paint → lock them at 1 forever
    const vh = window.innerHeight;
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      const inView = r.top < vh && r.bottom > 0 && r.width > 0 && r.height > 0;
      if (!inView) return;

      lockedRef.current.add(el);         // mark as locked
      inViewRef.current.add(el);         // track as visible (optional)
      (el as HTMLElement).style.opacity = "1";
    });

    // Watch DOM changes (client-side routing, lazy loads)
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

    // Initial pass (dir=0 keeps current opacity)
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
