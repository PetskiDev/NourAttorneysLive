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

const isSafari = () => {
  if (typeof navigator === "undefined") return false;
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
};

export default function FontScaler() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isSafari()) return;

    const applySizes = () => {
      const width = window.innerWidth;

      const heroH2 = document.querySelector<HTMLElement>(
        ".thehtwob"
      );
      if (heroH2 && width < 768) {
        const pxSize = (width * 16) / 100;
        heroH2.style.fontSize = `${pxSize}px`;
      } else if (heroH2) {
        heroH2.style.fontSize = "";
      }

      const heroH1 = document.querySelectorAll<HTMLElement>(
        ".hones"
      );
      const absText = document.querySelectorAll<HTMLElement>(
        ".thehgourr"
      );
      if (width >= 768 && width < 1024) {
        heroH1.forEach((el) => {
          const pxSize = (width * 9) / 100;
          el.style.fontSize = `${pxSize}px`;
        });
        absText.forEach((el) => {
          const pxSize = (width * 1.8) / 100;
          el.style.fontSize = `${pxSize}px`;
        });
      } else {
        heroH1.forEach((el) => {
          el.style.fontSize = "";
        });
      }

      if (width >= 1024 && width <= 1930) {
        Object.entries(fontMap).forEach(([className, vwValue]) => {
          const pxSize = (width * vwValue) / 100;
          const elements =
            document.querySelectorAll<HTMLElement>(`.${className}`);
          elements.forEach((el) => {
            el.style.fontSize = `${pxSize}px`;
          });
        });

        const frameworksP = document.querySelectorAll<HTMLElement>(
          ".theonepp"
        );
        frameworksP.forEach((el) => {
          const pxSize = (width * 1.05) / 100;
          el.style.fontSize = `${pxSize}px`;
        });

        // Safari-only absText h4 fix (1.25vw)
        const absTextH4s = document.querySelectorAll<HTMLElement>(
          ".thehgourr"
        );
        absTextH4s.forEach((el) => {
          const pxSize = (width * 1.25) / 100;
          el.style.fontSize = `${pxSize}px`;
        });
      } else {
        Object.keys(fontMap).forEach((className) => {
          const elements =
            document.querySelectorAll<HTMLElement>(`.${className}`);
          elements.forEach((el) => {
            el.style.fontSize = "";
          });
        });

        const frameworksP = document.querySelectorAll<HTMLElement>(
          ".theonepp"
        );
        frameworksP.forEach((el) => {
          el.style.fontSize = "";
        });

        const absTextH4s = document.querySelectorAll<HTMLElement>(
          ".thehgourr"
        );
        absTextH4s.forEach((el) => {
          el.style.fontSize = "";
        });
      }
    };

    applySizes();
    window.addEventListener("resize", applySizes);
    return () => window.removeEventListener("resize", applySizes);
  }, [pathname]);

  return null;
}
