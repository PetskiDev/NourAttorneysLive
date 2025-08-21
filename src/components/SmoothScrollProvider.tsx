"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  children: React.ReactNode;
  headerOffset?: number;

  /** Easing per 60fps frame. Spec: 20/90 ≈ 0.2222 (motion layer, unchanged) */
  easing?: number;
  /** Visual “settling” horizon (reference only). Spec: ~45 frames */
  framesHint?: number;
  /** Internal lerp passes per RAF tick for extra silkiness (>=1). */
  microSteps?: number;

  /** Scale for all incoming scroll deltas (smaller = slower). */
  inputScale?: number;
  /** Hard cap per wheel/touch event after scaling (px). */
  maxDeltaPerEvent?: number;

  /** Keyboard step sizes (px). */
  keyStepPx?: number;
  pageStepFactor?: number; // % of viewport for PageUp/Down & Space

  /**
   * Input smoothing (time-corrected alpha at 60fps) for target changes.
   * This does NOT change the motion easing (20/90) — it only softens jumps in desired target.
   */
  inputSmoothing?: number; // 0..1 per-60fps alpha, e.g. 0.15–0.25

  /** Touch-only sensitivity multiplier (mobile devices). 1 = same as desktop; >1 = more sensitive. */
  touchSensitivityMultiplier?: number;
};

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/**
 * SmoothScrollProvider
 * - Virtual smooth scroll with time-corrected easing.
 * - Can be *locked* to ignore inputs (used by NavBar mobile menu).
 * - Resets to top on route change; honors #hash anchors.
 */
export default function SmoothScrollProvider({
  children,
  headerOffset = 0,

  easing = 20 / 90,
  framesHint = 45,

  microSteps = 4,

  inputScale = 0.28,
  maxDeltaPerEvent = 60,
  keyStepPx = 20,
  pageStepFactor = 0.6,

  inputSmoothing = 0.2,

  touchSensitivityMultiplier = 10.5,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // desiredTarget = raw intent; target follows it smoothly; current animates toward target.
  const desiredTargetRef = useRef(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  const maxScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const touchStartYRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isTouchDeviceRef = useRef(false);

  // NEW: gate inputs while something (e.g., mobile menu) wants scroll locked
  const inputLockedRef = useRef(false); // ← ADDED

  const pathname = usePathname();
  const search = useSearchParams();

  // Touch/mobile detection (robust)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const hasTouchPoints =
      typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;
    const onTouchCapable = "ontouchstart" in window;
    const uaMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone|Kindle|Silk/i.test(ua);
    isTouchDeviceRef.current = hasTouchPoints || onTouchCapable || uaMobile;
  }, []);

  // Lock page scroll (native)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyHeight = document.body.style.height;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.height = prevBodyHeight;
    };
  }, []);

  // Disable native scroll restoration so it doesn’t fight virtual scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prev = window.history.scrollRestoration;
    try {
      window.history.scrollRestoration = "manual";
    } catch {}
    return () => {
      try {
        window.history.scrollRestoration = prev;
      } catch {}
    };
  }, []);

  // Listen for external lock/unlock events (from NavBar)
  useEffect(() => {
    const onLock = (e: Event) => {
      const detail = (e as CustomEvent).detail as { locked?: boolean } | undefined;
      inputLockedRef.current = !!detail?.locked;
      if (inputLockedRef.current && rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    window.addEventListener("virtualscroll:lock", onLock as EventListener);
    return () => window.removeEventListener("virtualscroll:lock", onLock as EventListener);
  }, []);

  // Helper: broadcast virtual scroll
  const dispatchVirtualScroll = useCallback((y: number) => {
    rootRef.current?.style.setProperty("--virtual-scroll-y", String(y));
    const evt = new CustomEvent("virtualscroll", { detail: { y } });
    window.dispatchEvent(evt);
  }, []);

  const applyTransform = useCallback(
    (y: number) => {
      if (!contentRef.current) return;
      contentRef.current.style.transform = `translate3d(0, ${-y}px, 0)`;
      dispatchVirtualScroll(y);
    },
    [dispatchVirtualScroll]
  );

  const computeBounds = useCallback(() => {
    if (!contentRef.current) return;
    const contentRect = contentRef.current.getBoundingClientRect();
    const contentHeight = contentRect.height;
    const viewport = window.innerHeight;
    const maxScroll = Math.max(0, contentHeight - (viewport - headerOffset));
    maxScrollRef.current = maxScroll;

    desiredTargetRef.current = clamp(desiredTargetRef.current, 0, maxScrollRef.current);
    targetRef.current = clamp(targetRef.current, 0, maxScrollRef.current);
    currentRef.current = clamp(currentRef.current, 0, maxScrollRef.current);

    applyTransform(currentRef.current);
  }, [headerOffset, applyTransform]);

  // Convert per-60fps alpha (a60) to time-corrected alpha for dt seconds
  const alphaTimeCorrected = useCallback((a60: number, dtSeconds: number) => {
    const base = Math.max(0, Math.min(1, a60));
    const frames = dtSeconds * 60;
    return 1 - Math.pow(1 - base, frames);
  }, []);

  const tick = useCallback(
    (now: number) => {
      lastTimeRef.current ??= now;
      const dt = Math.max(0.000_001, (now - lastTimeRef.current) / 1000);
      lastTimeRef.current = now;

      // 1) Low-pass target towards desired target (input smoothing)
      const aInput = alphaTimeCorrected(inputSmoothing, dt);
      targetRef.current =
        targetRef.current + (desiredTargetRef.current - targetRef.current) * aInput;

      // 2) Animate current towards target using the spec easing (20/90)
      const aMotion = alphaTimeCorrected(easing, dt);

      // Micro-steps split the alpha for silkiness without changing overall curve
      const steps = Math.max(1, Math.floor(microSteps));
      const stepAlpha = 1 - Math.pow(1 - aMotion, 1 / steps);

      for (let i = 0; i < steps; i++) {
        const current = currentRef.current;
        const target = targetRef.current;
        const next = current + (target - current) * stepAlpha;
        currentRef.current = Math.abs(target - next) < 0.01 ? target : next;
      }

      applyTransform(currentRef.current);

      if (
        Math.abs(targetRef.current - currentRef.current) > 0.01 ||
        Math.abs(desiredTargetRef.current - targetRef.current) > 0.01
      ) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    },
    [alphaTimeCorrected, easing, inputSmoothing, microSteps, applyTransform]
  );

  const requestTick = useCallback(() => {
    rafRef.current ??= window.requestAnimationFrame(tick);
  }, [tick]);

  const setDesiredTarget = useCallback(
    (next: number) => {
      desiredTargetRef.current = clamp(next, 0, maxScrollRef.current);
      requestTick();
    },
    [requestTick]
  );

  // Immediate hard jump to Y (used on navigation/hash)
  const hardSetY = useCallback(
    (y: number) => {
      const yy = clamp(y, 0, maxScrollRef.current);
      desiredTargetRef.current = yy;
      targetRef.current = yy;
      currentRef.current = yy;
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      applyTransform(yy);
      dispatchVirtualScroll(yy);
    },
    [applyTransform, dispatchVirtualScroll]
  );

  // Normalize wheel delta to px
  function normalizeDelta(e: WheelEvent) {
    const lineHeight = 16;
    const pageHeight = window.innerHeight;
    let deltaY = e.deltaY;
    if (e.deltaMode === 1) deltaY *= lineHeight; // lines -> px
    if (e.deltaMode === 2) deltaY *= pageHeight; // pages -> px
    return deltaY;
  }

  // Wheel (desktop/mouse)
  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (inputLockedRef.current) return; // ← guard
      e.preventDefault();
      const raw = normalizeDelta(e);
      let delta = raw * inputScale;
      delta = clamp(delta, -maxDeltaPerEvent, maxDeltaPerEvent);
      setDesiredTarget(desiredTargetRef.current + delta * 2);
    },
    [inputScale, maxDeltaPerEvent, setDesiredTarget]
  );

  // Keyboard
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (inputLockedRef.current) return; // ← guard

      const targetEl = e.target as HTMLElement | null;
      const tag = (targetEl?.tagName ?? "").toLowerCase();
      if (tag === "input" || tag === "textarea" || targetEl?.isContentEditable) return;

      const viewport = window.innerHeight;
      let handled = true;
      let next = desiredTargetRef.current;

      switch (e.key) {
        case "ArrowDown":
          next += keyStepPx;
          break;
        case "ArrowUp":
          next -= keyStepPx;
          break;
        case "PageDown":
          next += viewport * pageStepFactor;
          break;
        case "PageUp":
          next -= viewport * pageStepFactor;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = maxScrollRef.current;
          break;
        case " ":
          next += viewport * (e.shiftKey ? -pageStepFactor : pageStepFactor);
          break;
        default:
          handled = false;
      }
      if (handled) {
        e.preventDefault();
        setDesiredTarget(next);
      }
    },
    [keyStepPx, pageStepFactor, setDesiredTarget]
  );

  // Touch
  const onTouchStart = useCallback((e: TouchEvent) => {
    if (inputLockedRef.current) return; // ← guard
    if (e.touches.length > 0) {
      const firstTouch = e.touches.item(0);
      if (!firstTouch) return;
      touchStartYRef.current = firstTouch.clientY;
    }
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (inputLockedRef.current) return; // ← guard
      if (touchStartYRef.current == null) return;
      if (e.touches.length === 0) return;
      e.preventDefault();
      const firstTouch = e.touches.item(0);
      if (!firstTouch) return;
      const y = firstTouch.clientY;
      const dy = touchStartYRef.current - y;
      touchStartYRef.current = y;

      const multiplier = isTouchDeviceRef.current ? touchSensitivityMultiplier : 1;
      let delta = dy * inputScale * multiplier;
      delta = clamp(delta, -maxDeltaPerEvent, maxDeltaPerEvent);
      setDesiredTarget(desiredTargetRef.current + delta);
    },
    [inputScale, maxDeltaPerEvent, touchSensitivityMultiplier, setDesiredTarget]
  );

  const onTouchEnd = useCallback(() => {
    if (inputLockedRef.current) return; // ← guard
    touchStartYRef.current = null;
  }, []);

  // If URL has #hash, jump to that element within virtual space
  const scrollToHashIfAny = useCallback(() => {
    if (!contentRef.current) return false;
    const hash = (typeof window !== "undefined" ? window.location.hash : "").slice(1);
    if (!hash) return false;
    const sel = `#${(window as any).CSS?.escape ? (window as any).CSS.escape(hash) : hash}`;
    const el = contentRef.current.querySelector(sel) as HTMLElement | null;
    if (!el) return false;
    const y = Math.max(0, el.offsetTop - headerOffset);
    hardSetY(y);
    return true;
  }, [hardSetY, headerOffset]);

  // Mount / teardown
  useEffect(() => {
    if (typeof window === "undefined") return;

    const resizeObserver =
      "ResizeObserver" in window ? new ResizeObserver(() => computeBounds()) : null;

    const contentElement = contentRef.current;
    if (contentElement && resizeObserver) {
      resizeObserver.observe(contentElement);
    }

    const recalc = () => computeBounds();
    computeBounds();
    window.addEventListener("resize", recalc);

    const wheelHandler: EventListener = (evt) => onWheel(evt as WheelEvent);
    const keydownHandler: EventListener = (evt) => onKeyDown(evt as KeyboardEvent);
    const touchStartHandler: EventListener = (evt) => onTouchStart(evt as TouchEvent);
    const touchMoveHandler: EventListener = (evt) => onTouchMove(evt as TouchEvent);
    const touchEndHandler: EventListener = () => onTouchEnd();

    window.addEventListener("wheel", wheelHandler, { passive: false });
    window.addEventListener("keydown", keydownHandler, { passive: false });
    window.addEventListener("touchstart", touchStartHandler, { passive: false });
    window.addEventListener("touchmove", touchMoveHandler, { passive: false });
    window.addEventListener("touchend", touchEndHandler, { passive: false });

    // Kick off animation loop
    requestTick();

    // Also emit an initial virtual scroll value for listeners
    dispatchVirtualScroll(currentRef.current);

    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("touchstart", touchStartHandler);
      window.removeEventListener("touchmove", touchMoveHandler);
      window.removeEventListener("touchend", touchEndHandler);

      if (resizeObserver && contentElement) {
        resizeObserver.unobserve(contentElement);
        resizeObserver.disconnect();
      }
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [computeBounds, onWheel, onKeyDown, onTouchStart, onTouchMove, onTouchEnd, requestTick, dispatchVirtualScroll]);

  // Reset virtual scroll on route (and query) change
  useEffect(() => {
    if (typeof window === "undefined") return;
    requestAnimationFrame(() => {
      computeBounds();
      if (!scrollToHashIfAny()) {
        hardSetY(0); // top of page if no hash
      }
      requestTick();
    });
  }, [pathname, search, computeBounds, scrollToHashIfAny, hardSetY, requestTick]);

  const contentStyle: React.CSSProperties = {
    willChange: "transform",
    transition: "transform 0s",
    paddingTop: headerOffset ? `${headerOffset}px` : undefined,
  };

  const rootStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  };

  return (
    <div
      ref={rootRef}
      style={rootStyle}
      data-reveal-root=""
      aria-description={`Virtual smooth scroll (~${framesHint} frames, easing ${easing.toFixed(
        4
      )}, micro-steps ${microSteps}, inputScale ${inputScale}, inputSmoothing ${inputSmoothing}, touch x${touchSensitivityMultiplier})`}
    >
      <div ref={contentRef} style={contentStyle} data-reveal-content="">
        {children}
      </div>
    </div>
  );
}
