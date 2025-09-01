"use client";

import { useEffect } from "react";

export default function LineObserver() {
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".custom-line");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // play once
          }
        });
      },
      { threshold: 0.2 }
    );

    lines.forEach((line) => observer.observe(line));

    return () => observer.disconnect();
  }, []);

  return null;
}
