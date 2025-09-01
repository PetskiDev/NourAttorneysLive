"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Safari can be quirky with isIntersecting; also check ratio
        if (entry && (entry.isIntersecting || entry.intersectionRatio > 0)) {
          setIsVisible(true);
          observer.unobserve(node); // animate once
        }
      },
      {
        threshold: 0.15,
        root: null,
        rootMargin: "0px 0px -10% 0px",
        ...options,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
