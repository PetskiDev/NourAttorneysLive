"use client";

import { useEffect } from "react";

const SELECTOR = '[data-anim="line4"],[data-anim="line5"]';
// Fallback if you haven't added data-anim yet (less robust):
const FALLBACK = 'svg[class*="line4"], svg[class*="line5"]';

export default function SvgInView() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let started = false;

    const triggerAnimates = (svg: Element) => {
      const anims = svg.querySelectorAll<SVGAnimateElement>("animate");
      anims.forEach((anim) => {
        const attr = anim.getAttribute("data-delay");
        const delay = attr ? parseFloat(attr) * 1000 : 0;
        setTimeout(() => {
          try {
            anim.beginElement();
          } catch (e) {
            console.warn("Could not trigger animation", e);
          }
        }, delay);
      });
    };

    const attach = () => {
      const targets = [
        ...document.querySelectorAll<SVGElement>(SELECTOR),
        ...document.querySelectorAll<SVGElement>(FALLBACK),
      ];
      if (targets.length === 0) return false;

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            // avoid double-trigger
            if ((entry.target as HTMLElement).dataset.animated === "1") return;

            triggerAnimates(entry.target);
            (entry.target as HTMLElement).dataset.animated = "1";
            io?.unobserve(entry.target);
          });
        },
        { threshold: 1 } // easier to hit than 1.0
      );

      targets.forEach((svg) => io!.observe(svg));
      return true;
    };

    const init = () => {
      if (started) return;
      if (attach()) {
        started = true;
        return;
      }
      // Watch for late DOM/hydration
      mo = new MutationObserver(() => {
        if (attach()) {
          started = true;
          mo?.disconnect();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    };

    // Small delay lets DOM/hydration settle in prod
    const timer = setTimeout(init, 200);

    return () => {
      clearTimeout(timer);
      io?.disconnect();
      mo?.disconnect();
    };
  }, []);

  return null;
}
