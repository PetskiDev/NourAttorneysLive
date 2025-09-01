"use client";

import { useEffect } from "react";

export default function LineRevealer() {
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".line");

    // hide initially
    lines.forEach((el) => {
      el.style.overflow = "hidden";
      el.style.position = "relative";
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("line-visible");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.2 } // reveal when 20% visible
    );

    lines.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null; // renders no DOM, only behavior
}
