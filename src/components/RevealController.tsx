"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

type Props = {
  /** CSS selector for targets to reveal */
  selector?: string;
  /** Distance above the bottom of the viewport where fade begins (px) */
  bottomZoneStartPx?: number;
  /** Vertical size of the fade zone (px) going upward from start */
  fadeZonePx?: number;
  /** Duration for initial on-load fade for elements in viewport (ms) */
  initialFadeMs?: number;
};

// Note: SmoothScrollProvider dispatches a 'virtualscroll' event; we don't need the type here.

function isElement(n: Node): n is Element {
  return n.nodeType === 1;
}

export default function RevealController({
  selector = "h1,h2,h3,h4,h5,h6,.accent-text",
  bottomZoneStartPx = 100,
  fadeZonePx = 200,
  initialFadeMs = 600,
}: Props) {
  const pathname = usePathname();

  const contentRootRef = useRef<HTMLElement | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());
  const initiallyAnimatedRef = useRef<WeakSet<Element>>(new WeakSet());
  const isBootingRef = useRef<boolean>(true);

  const zoneParams = useMemo(() => ({ bottomZoneStartPx, fadeZonePx }), [bottomZoneStartPx, fadeZonePx]);

  // Map element top to opacity using only the bottom-of-screen zone
  const computeOpacityForTop = useCallback((elTop: number, viewportH: number, params: { bottomZoneStartPx: number; fadeZonePx: number }) => {
    const zoneStartY = viewportH - params.bottomZoneStartPx; // just above bottom
    const zoneEndY = zoneStartY - params.fadeZonePx;         // farther up from bottom

    if (elTop >= zoneStartY) return 0; // below/at zone start: invisible
    if (elTop <= zoneEndY) return 1;   // past end: fully visible
    const t = (zoneStartY - elTop) / (zoneStartY - zoneEndY); // 0..1
    return Math.max(0, Math.min(1, t));
  }, []);

  const ensureTargetsListed = useCallback(() => {
    const root = contentRootRef.current;
    if (!root) return;
    root.querySelectorAll(selector).forEach((el) => elementsRef.current.add(el));
  }, [selector]);

  const styleInitialStates = useCallback(() => {
    const vh = window.innerHeight;
    elementsRef.current.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const r = htmlEl.getBoundingClientRect();
      const visibleNow = r.top < vh && r.bottom > 0 && r.width > 0 && r.height > 0;

      // Start with opacity 0 for everyone
      htmlEl.style.opacity = "0";
      htmlEl.style.willChange = "opacity";
      htmlEl.style.transition = "opacity 0s";

      if (visibleNow) {
        // Fade in over initialFadeMs for elements on the initial viewport
        // Use a double RAF to guarantee transition applies
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            htmlEl.style.transition = `opacity ${initialFadeMs}ms ease`;
            htmlEl.style.opacity = "1";
            initiallyAnimatedRef.current.add(htmlEl);
            // After the initial fade, remove transition so scroll mapping is instant
            window.setTimeout(() => {
              if (htmlEl.isConnected) htmlEl.style.transition = "opacity 0s";
            }, initialFadeMs + 50);
          });
        });
      }
    });
  }, [initialFadeMs]);

  const updateOnScroll = useCallback(() => {
    if (isBootingRef.current) return;
    const vh = window.innerHeight;
    const params = zoneParams;
    elementsRef.current.forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (!htmlEl.isConnected) return;
      const r = htmlEl.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return;

      const top = r.top;
      const opacity = computeOpacityForTop(top, vh, params);
      htmlEl.style.opacity = String(opacity);
    });
  }, [zoneParams, computeOpacityForTop]);

  useEffect(() => {
    const contentRoot = document.querySelector<HTMLElement>("[data-reveal-content]");
    if (!contentRoot) return;
    contentRootRef.current = contentRoot;

    // Collect initial targets and set styles
    isBootingRef.current = true;
    ensureTargetsListed();
    styleInitialStates();
    // Defer the first mapping until after initial transitions are applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isBootingRef.current = false;
        updateOnScroll();
      });
    });

    // Listen to virtual scroll events from SmoothScrollProvider
    const onVirtualScroll = () => updateOnScroll();
    window.addEventListener("virtualscroll", onVirtualScroll as EventListener);

    // Resize should also re-map opacities
    const onResize = () => updateOnScroll();
    window.addEventListener("resize", onResize);

    // Track DOM changes inside content
    const mo = new MutationObserver((mutations) => {
      let needsStyle = false;
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (!isElement(n)) return;
          if (n.matches(selector)) {
            elementsRef.current.add(n);
            needsStyle = true;
          }
          n.querySelectorAll?.(selector).forEach((child) => {
            elementsRef.current.add(child);
            needsStyle = true;
          });
        });
        m.removedNodes.forEach((n) => {
          if (!isElement(n)) return;
          if (elementsRef.current.has(n)) elementsRef.current.delete(n);
          n.querySelectorAll?.(selector).forEach((child) => elementsRef.current.delete(child));
        });
      }
      if (needsStyle) {
        // Apply initial style to any newly added nodes
        styleInitialStates();
        // Defer mapping to let transitions attach
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            updateOnScroll();
          });
        });
      }
    });
    mo.observe(contentRoot, { childList: true, subtree: true });
    mutationObserverRef.current = mo;

    const elementsSet = elementsRef.current;
    return () => {
      window.removeEventListener("virtualscroll", onVirtualScroll as EventListener);
      window.removeEventListener("resize", onResize);
      mutationObserverRef.current?.disconnect();
      mutationObserverRef.current = null;
      elementsSet.clear();
      contentRootRef.current = null;
    };
  }, [selector, zoneParams, pathname, initialFadeMs, ensureTargetsListed, styleInitialStates, updateOnScroll]);

  return null;
}
