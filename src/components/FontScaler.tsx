"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const fontMap: Record<string, number> = {
  headline_1: 11.8,
  subheadline_2: 1.84,
  title_1: 1.05,
  subtitle_1: 1,
  accent_text_2: 1.33,
  headline_1_2: 15,
  headline_5: 6,
  body_text: 0.9,
  title_3: 1.5,
  subtitle_4: 1.51,
  headline_2: 1.6,
  accent_text_1: 1.91,
  title_2: 1,
  subtitle_2: 1,
  descriptor_2: 1,
  accent_text_3: 1.51,
  title_5: 1,
  headline_6: 3.6,
  headline_3_1: 1.5,
  headline_1_3: 5.5,
  headline_3: 1.4,
  button_link: 3.5,
  descriptor_1: 0.9,
  footnote_2: 0.8,
  headline_4: 3.4,
  headline_1_4: 3.4,
  headline_1_1: 9,
  subheadline_4: 1.4,
  subheadline_1: 2,
  subtitle_3: 1,
  title_4: 1,
  headline_1_5: 6,
};

// detect Safari
const isSafari = () => {
  if (typeof navigator === "undefined") return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export default function FontScaler() {
  const pathname = usePathname(); // 👈 reruns on navigation

  useEffect(() => {
    if (!isSafari()) return;

    const applySizes = () => {
      const width = window.innerWidth;

      // --- Safari fix for hero h2 on mobile (<768px) ---
      const heroH2 = document.querySelector<HTMLElement>(
        ".index-module__ifV0vq__hero h2"
      );
      if (heroH2 && width < 768) {
        const pxSize = (width * 16) / 100; // 16vw → px
        heroH2.style.fontSize = `${pxSize}px`;
      } else if (heroH2) {
        heroH2.style.fontSize = ""; // reset to CSS when not in range
      }

      // --- Safari fix for mapped classes (1024px–1930px) ---
      if (width >= 1024 && width <= 1930) {
        Object.entries(fontMap).forEach(([className, vwValue]) => {
          const pxSize = (width * vwValue) / 100;
          const elements =
            document.querySelectorAll<HTMLElement>(`.${className}`);
          elements.forEach((el) => {
            el.style.fontSize = `${pxSize}px`;
          });
        });
      } else {
        // reset outside range
        Object.keys(fontMap).forEach((className) => {
          const elements =
            document.querySelectorAll<HTMLElement>(`.${className}`);
          elements.forEach((el) => {
            el.style.fontSize = "";
          });
        });
      }
    };

    // apply immediately on mount + on navigation
    applySizes();

    // keep updating on resize
    window.addEventListener("resize", applySizes);
    return () => window.removeEventListener("resize", applySizes);
  }, [pathname]); // 👈 dependency ensures re-run after navigation

  return null; // invisible helper
}
