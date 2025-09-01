"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LineObserver() {
  const pathname = usePathname(); // 👈 will update on every navigation

  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".custom-line");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    lines.forEach((line) => observer.observe(line));

    return () => observer.disconnect();
  }, [pathname]); // 👈 rerun whenever route changes

  return null;
}
