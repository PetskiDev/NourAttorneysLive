"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Props = {
  /** CSS selector for targets to reveal */
  selector?: string;
  /** Intersection threshold */
  threshold?: number;
  /** Animation duration (ms) */
  durationMs?: number;
  /** Offset margin for earlier/later reveal */
  rootMargin?: string;
};

function isElement(n: Node): n is HTMLElement {
  return n.nodeType === 1;
}

export default function RevealController({
  selector = "h1,h2,h3,h4,h5,h6,.accent-text,.animated,.body_text,.title_1,.title_2,.title_3,.title_4,.title_5,.subtitle_2,.subheadline_1,p,.animselector",
  threshold = 0.15,
  durationMs = 600,
  rootMargin = "0px 0px -10% 0px",
}: Props) {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-reveal-content]");
    if (!root) return;

    // Reset any old observer
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.style.transition = `opacity ${durationMs}ms ease-out, transform ${durationMs}ms ease-out`;
            observer.unobserve(el); // animate once
          }
        });
      },
      { threshold, rootMargin }
    );

    // Classes to skip animation
    const antiClasses = ["antiselector"];

    // Apply initial hidden state to all matches
    root.querySelectorAll(selector).forEach((n) => {
      if (!isElement(n)) return;

      if (antiClasses.some((cls) => n.classList.contains(cls))) {
        // Always visible for anti-classes
        n.style.opacity = "1";
        n.style.transform = "none";
        n.style.transition = "none";
        return;
      }

      // Animate these normally
      n.style.opacity = "0";
      n.style.transform = "translateY(30px)";
      n.style.willChange = "opacity, transform";
      observer.observe(n);
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [pathname, selector, threshold, rootMargin, durationMs]);

  return null;
}
