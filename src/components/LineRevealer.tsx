"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LineRevealer() {
  const pathname = usePathname(); // updates on client-side navigation

  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".line:not(.antiline)");

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
      { threshold: 0.2 }
    );

    lines.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]); // 👈 runs again every time route changes

  return null;
}
