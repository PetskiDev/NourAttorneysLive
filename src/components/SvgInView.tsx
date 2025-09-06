"use client";

import { useEffect } from "react";

export default function SvgInView() {
  useEffect(() => {
    const init = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const anims = entry.target.querySelectorAll<SVGAnimateElement>("animate");

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

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 } // more forgiving than 1
      );

      document
        .querySelectorAll<SVGElement>(
          ".index-module__ifV0vq__line4, .index-module__ifV0vq__line5"
        )
        .forEach((svg) => observer.observe(svg));
    };

    // delay init so DOM is fully rendered
    const timer = setTimeout(init, 200);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
