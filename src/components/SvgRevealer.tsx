"use client";

import { useEffect } from "react";

export default function SvgRevealer() {
  useEffect(() => {
    const svgs = document.querySelectorAll<SVGSVGElement>(".line-svg");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // run once
          }
        });
      },
      { threshold: 0.2 }
    );

    svgs.forEach((svg) => observer.observe(svg));

    return () => observer.disconnect();
  }, []);

  return null;
}
