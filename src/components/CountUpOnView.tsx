'use client';
import { useEffect, useRef, useState } from "react";

type CountUpOnViewProps = {
  end: number;
  duration?: number;
  suffix?: string;
};

export default function CountUpOnView({ end, duration = 2000, suffix = "" }: CountUpOnViewProps) {
  const ref = useRef<HTMLHeadingElement | null>(null); // ← use HTMLHeadingElement
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated) {
          let start = 0;
          const stepTime = 16; // roughly 60fps
          const totalSteps = duration / stepTime;
          const increment = end / totalSteps;

          const animate = () => {
            start += increment;
            if (start < end) {
              setCount(Math.floor(start));
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          animate();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 } // trigger when 30% visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <h4 style={{ opacity: 1 }} className="headline_5" ref={ref}>{count}{suffix}</h4>;
}
