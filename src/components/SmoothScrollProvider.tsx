"use client";

import React, { useEffect, useRef, useCallback } from "react";

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
 * SmoothScrollProvider (slower-response tuning + mobile-only sensitivity)
 * - Locks native page scroll; uses virtual scroll with transform3d.
 * - Time-corrected easing so 20/90 feels consistent across refresh rates.
 * - Input is throttled and low-passed for a slower, cinematic feel.
 */
export default function SmoothScrollProvider({
  children,
  headerOffset = 0,

  // Spec constants (motion layer)
  easing = 20 / 90, // ≈0.2222 per 60fps frame
  framesHint = 45,

  // Extra silkiness
  microSteps = 4, // split alpha across small passes

  // Slowness & control (gentle defaults)
  inputScale = 0.28,
  maxDeltaPerEvent = 60,
  keyStepPx = 20,
  pageStepFactor = 0.6,

  // Low-pass the target intent (input), not the motion
  inputSmoothing = 0.2,

  // NEW: touch-only sensitivity
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

  // Lock page scroll
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

  // Helper: broadcast virtual scroll
  const dispatchVirtualScroll = useCallback((y: number) => {
    // Optional: expose CSS var for debugging or other consumers
    rootRef.current?.style.setProperty("--virtual-scroll-y", String(y));
    // Fire a window-level event so any controller can listen
    const evt = new CustomEvent("virtualscroll", { detail: { y } });
    window.dispatchEvent(evt);
  }, []);

  const applyTransform = useCallback(
    (y: number) => {
      if (!contentRef.current) return;
      // No rounding: preserves smooth sub-pixel motion
      contentRef.current.style.transform = `translate3d(0, ${-y}px, 0)`;
      // Notify listeners (RevealController, etc.)
      dispatchVirtualScroll(y);
    },
    [dispatchVirtualScroll]
  );

  const computeBounds = useCallback(() => {
    if (!contentRef.current) return;
    const contentHeight = contentRef.current.getBoundingClientRect().height;
    const viewport = window.innerHeight;
    const maxScroll = Math.max(0, contentHeight - (viewport - headerOffset));
    maxScrollRef.current = maxScroll;

    // Clamp all positions against new bounds
    desiredTargetRef.current = clamp(desiredTargetRef.current, 0, maxScrollRef.current);
    targetRef.current = clamp(targetRef.current, 0, maxScrollRef.current);
    currentRef.current = clamp(currentRef.current, 0, maxScrollRef.current);

    applyTransform(currentRef.current);
  }, [headerOffset, applyTransform]);

  // Convert per-60fps alpha (a60) to time-corrected alpha for dt seconds
  // alpha(dt) = 1 - (1 - a60)^(dt * 60)
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
        // Smaller snap threshold to avoid “instant” completion
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
      e.preventDefault();
      const raw = normalizeDelta(e);
      let delta = raw * inputScale; // desktop sensitivity unchanged
      delta = clamp(delta, -maxDeltaPerEvent, maxDeltaPerEvent);
      setDesiredTarget(desiredTargetRef.current + delta * 2);
    },
    [inputScale, maxDeltaPerEvent, setDesiredTarget]
  );

  // Keyboard
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
    if (e.touches.length > 0) {
      const firstTouch = e.touches.item(0);
      if (!firstTouch) return;
      touchStartYRef.current = firstTouch.clientY;
    }
  }, []);

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (touchStartYRef.current == null) return;
      if (e.touches.length === 0) return;
      e.preventDefault();
      const firstTouch = e.touches.item(0);
      if (!firstTouch) return;
      const y = firstTouch.clientY;
      const dy = touchStartYRef.current - y;
      touchStartYRef.current = y;

      // Apply extra sensitivity only on touch-capable devices
      const multiplier = isTouchDeviceRef.current ? touchSensitivityMultiplier : 1;
      let delta = dy * inputScale * multiplier;
      delta = clamp(delta, -maxDeltaPerEvent, maxDeltaPerEvent);
      setDesiredTarget(desiredTargetRef.current + delta);
    },
    [inputScale, maxDeltaPerEvent, touchSensitivityMultiplier, setDesiredTarget]
  );

  const onTouchEnd = useCallback(() => {
    touchStartYRef.current = null;
  }, []);

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

    // Wrap handlers to satisfy EventListener typing for add/remove symmetry
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
      data-reveal-root=""             // ← expose a stable root for RevealController
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
